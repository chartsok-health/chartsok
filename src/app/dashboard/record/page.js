'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Chip,
  Fade,
  Grow,
  Grid,
  Card,
  CardContent,
  Alert,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import PersonIcon from '@mui/icons-material/Person';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { useAuth } from '@/lib/AuthContext';

const MotionBox = motion.create(Box);
const MotionPaper = motion.create(Paper);

export default function RecordPage() {
  const router = useRouter();
  const { userProfile } = useAuth();
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [liveTranscript, setLiveTranscript] = useState([]);
  const [currentText, setCurrentText] = useState('');
  const [currentSpeaker, setCurrentSpeaker] = useState('의사');
  const [audioLevels, setAudioLevels] = useState(Array(20).fill(20));
  const [error, setError] = useState(null);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [autoToggle, setAutoToggle] = useState(true); // Auto-toggle on by default

  // Refs
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const streamRef = useRef(null);
  const analyserRef = useRef(null);
  const audioContextRef = useRef(null);
  const transcriptionRef = useRef(null);
  const recognitionRef = useRef(null);
  const currentSpeakerRef = useRef('의사');
  const recordingTimeRef = useRef(0);
  const autoToggleRef = useRef(true);

  // Keep refs in sync with state
  useEffect(() => {
    currentSpeakerRef.current = currentSpeaker;
  }, [currentSpeaker]);

  useEffect(() => {
    recordingTimeRef.current = recordingTime;
  }, [recordingTime]);

  useEffect(() => {
    autoToggleRef.current = autoToggle;
  }, [autoToggle]);

  // Timer effect
  useEffect(() => {
    let interval;
    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording, isPaused]);

  // Auto-scroll transcription
  useEffect(() => {
    if (transcriptionRef.current) {
      transcriptionRef.current.scrollTop = transcriptionRef.current.scrollHeight;
    }
  }, [liveTranscript, currentText]);

  // Audio level visualization
  useEffect(() => {
    let animationFrame;
    const updateLevels = () => {
      if (analyserRef.current && isRecording && !isPaused) {
        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(dataArray);

        const bands = 20;
        const bandSize = Math.floor(dataArray.length / bands);
        const levels = [];
        for (let i = 0; i < bands; i++) {
          let sum = 0;
          for (let j = 0; j < bandSize; j++) {
            sum += dataArray[i * bandSize + j];
          }
          levels.push(20 + (sum / bandSize) * 0.4);
        }
        setAudioLevels(levels);
      }
      animationFrame = requestAnimationFrame(updateLevels);
    };

    if (isRecording && !isPaused) {
      updateLevels();
    } else {
      setAudioLevels(Array(20).fill(20));
    }

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [isRecording, isPaused]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Initialize Web Speech API
  const initSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError('이 브라우저는 음성 인식을 지원하지 않습니다. Chrome 브라우저를 사용해 주세요.');
      return null;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'ko-KR';

    recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      // Update current text being spoken (interim)
      setCurrentText(interimTranscript);

      // Add final transcript to live list with current speaker
      if (finalTranscript) {
        const timestamp = formatTime(recordingTimeRef.current);
        const speaker = currentSpeakerRef.current;

        setLiveTranscript((prev) => [
          ...prev,
          { text: finalTranscript.trim(), timestamp, speaker },
        ]);
        setCurrentText('');

        // Auto-toggle speaker after each utterance (conversation turn-taking)
        if (autoToggleRef.current) {
          setCurrentSpeaker((prev) => (prev === '의사' ? '환자' : '의사'));
        }
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      if (event.error === 'not-allowed') {
        setPermissionDenied(true);
        setError('마이크 접근 권한이 필요합니다.');
      }
    };

    recognition.onend = () => {
      // Restart if still recording
      if (recognitionRef.current && !isPaused) {
        try {
          recognitionRef.current.start();
        } catch (e) {
          // Already started
        }
      }
    };

    return recognition;
  };

  const handleStartRecording = async () => {
    setError(null);
    setPermissionDenied(false);

    try {
      // Get audio stream
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      streamRef.current = stream;

      // Setup audio analyser for visualization
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      audioContextRef.current = audioContext;
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyserRef.current = analyser;

      // Setup MediaRecorder for audio backup
      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? 'audio/webm;codecs=opus'
        : MediaRecorder.isTypeSupported('audio/webm')
          ? 'audio/webm'
          : MediaRecorder.isTypeSupported('audio/mp4')
            ? 'audio/mp4'
            : 'audio/wav';

      const mediaRecorder = new MediaRecorder(stream, { mimeType });

      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.start(1000);

      // Initialize and start speech recognition
      const recognition = initSpeechRecognition();
      if (recognition) {
        recognitionRef.current = recognition;
        recognition.start();
      }

      setIsRecording(true);
      setIsPaused(false);
      setRecordingTime(0);
      setLiveTranscript([]);
      setCurrentText('');
      setCurrentSpeaker('의사'); // Doctor starts first
    } catch (err) {
      console.error('Error starting recording:', err);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setPermissionDenied(true);
        setError('마이크 접근 권한이 필요합니다. 브라우저 설정에서 마이크를 허용해 주세요.');
      } else {
        setError('녹음을 시작할 수 없습니다: ' + err.message);
      }
    }
  };

  const handleStopRecording = async () => {
    const finalRecordingTime = recordingTime;

    // Stop speech recognition
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }

    // Stop media recorder
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }

    // Stop audio stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }

    // Close audio context
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }

    setIsRecording(false);
    setIsPaused(false);
    setCurrentText('');

    // Check if we have transcription
    if (liveTranscript.length === 0) {
      setError('녹음된 내용이 없습니다. 다시 시도해 주세요.');
      return;
    }

    // Save transcription directly - we already have speaker info from auto-toggle
    sessionStorage.setItem('transcription', JSON.stringify(liveTranscript));
    sessionStorage.setItem('recordingDuration', formatTime(finalRecordingTime));
    router.push('/dashboard/record/result');
  };

  const handlePauseResume = () => {
    if (isPaused) {
      // Resume
      mediaRecorderRef.current?.resume();
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch (e) {
          // Already started
        }
      }
    } else {
      // Pause
      mediaRecorderRef.current?.pause();
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    }
    setIsPaused(!isPaused);
  };

  // Manual speaker correction - tap on transcript item to change speaker
  const handleSpeakerCorrection = (index) => {
    setLiveTranscript((prev) =>
      prev.map((item, i) =>
        i === index
          ? { ...item, speaker: item.speaker === '의사' ? '환자' : '의사' }
          : item
      )
    );
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1400, mx: 'auto' }}>
      {/* Header */}
      <MotionBox
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{ mb: 4 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: 'secondary.main', mb: 0.5 }}>
              새 진료 녹음
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              대화가 끝나면 자동으로 화자가 전환됩니다 (의사 → 환자 → 의사)
            </Typography>
          </Box>
          <Chip
            icon={isRecording ? <FiberManualRecordIcon sx={{ animation: 'pulse 1s infinite' }} /> : <GraphicEqIcon />}
            label={isRecording ? (isPaused ? '일시정지' : 'REC') : '대기 중'}
            color={isRecording ? (isPaused ? 'warning' : 'error') : 'default'}
            sx={{ fontWeight: 700, px: 1 }}
          />
        </Box>
      </MotionBox>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Left: Recording Controls */}
        <Grid size={{ xs: 12, lg: 5 }}>
          <MotionPaper
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 4,
              border: '1px solid',
              borderColor: isRecording ? 'error.main' : 'grey.200',
              textAlign: 'center',
              bgcolor: isRecording ? 'rgba(239, 68, 68, 0.02)' : 'white',
              transition: 'all 0.3s ease',
            }}
          >
            {/* Timer */}
            <Typography
              variant="h1"
              sx={{
                fontWeight: 800,
                color: isRecording ? 'error.main' : 'grey.300',
                fontFamily: 'monospace',
                fontSize: { xs: '3rem', md: '4rem' },
                letterSpacing: 4,
                mb: 2,
              }}
            >
              {formatTime(recordingTime)}
            </Typography>

            {/* Audio Visualization */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 0.5,
                height: 80,
                mb: 3,
              }}
            >
              {audioLevels.map((level, index) => (
                <motion.div
                  key={index}
                  animate={{ height: level }}
                  transition={{ duration: 0.1 }}
                  style={{
                    width: 4,
                    backgroundColor: isRecording && !isPaused ? '#EF4444' : '#E2E8F0',
                    borderRadius: 2,
                  }}
                />
              ))}
            </Box>

            {/* Current Speaker Indicator */}
            {isRecording && (
              <MotionBox
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                sx={{ mb: 3 }}
              >
                <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1.5, display: 'block' }}>
                  현재 듣고 있는 화자
                </Typography>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSpeaker}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Chip
                      icon={currentSpeaker === '의사' ? <LocalHospitalIcon /> : <PersonIcon />}
                      label={currentSpeaker}
                      sx={{
                        py: 3,
                        px: 2,
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        bgcolor: currentSpeaker === '의사' ? 'primary.main' : 'grey.600',
                        color: 'white',
                        '& .MuiChip-icon': {
                          color: 'white',
                          fontSize: '1.5rem',
                        },
                        boxShadow: currentSpeaker === '의사'
                          ? '0 4px 20px rgba(75, 156, 211, 0.4)'
                          : '0 4px 20px rgba(100, 100, 100, 0.3)',
                      }}
                    />
                  </motion.div>
                </AnimatePresence>
                <Typography variant="caption" sx={{ color: 'grey.400', mt: 1.5, display: 'block' }}>
                  말이 끝나면 자동 전환
                </Typography>
              </MotionBox>
            )}

            {/* Recording Controls */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mb: 3 }}>
              {!isRecording ? (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <IconButton
                    onClick={handleStartRecording}
                    sx={{
                      width: 100,
                      height: 100,
                      bgcolor: 'error.main',
                      color: 'white',
                      boxShadow: '0 8px 32px rgba(239, 68, 68, 0.4)',
                      '&:hover': { bgcolor: 'error.dark' },
                    }}
                  >
                    <MicIcon sx={{ fontSize: 48 }} />
                  </IconButton>
                </motion.div>
              ) : (
                <>
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconButton
                      onClick={handlePauseResume}
                      sx={{
                        width: 64,
                        height: 64,
                        bgcolor: 'warning.main',
                        color: 'white',
                        '&:hover': { bgcolor: 'warning.dark' },
                      }}
                    >
                      {isPaused ? <PlayArrowIcon sx={{ fontSize: 32 }} /> : <PauseIcon sx={{ fontSize: 32 }} />}
                    </IconButton>
                  </motion.div>

                  <motion.div
                    animate={{ scale: isPaused ? 1 : [1, 1.05, 1] }}
                    transition={{ duration: 1, repeat: isPaused ? 0 : Infinity }}
                  >
                    <IconButton
                      sx={{
                        width: 100,
                        height: 100,
                        bgcolor: 'error.main',
                        color: 'white',
                        boxShadow: '0 8px 32px rgba(239, 68, 68, 0.4)',
                      }}
                      disabled
                    >
                      <MicIcon sx={{ fontSize: 48 }} />
                    </IconButton>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconButton
                      onClick={handleStopRecording}
                      sx={{
                        width: 64,
                        height: 64,
                        bgcolor: 'secondary.main',
                        color: 'white',
                        '&:hover': { bgcolor: 'secondary.dark' },
                      }}
                    >
                      <StopIcon sx={{ fontSize: 32 }} />
                    </IconButton>
                  </motion.div>
                </>
              )}
            </Box>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {!isRecording
                ? '녹음 버튼을 눌러 진료를 시작하세요'
                : isPaused
                  ? '일시정지 중... 재생 버튼을 눌러 계속하세요'
                  : '진료 중... 정지 버튼을 누르면 차트가 생성됩니다'}
            </Typography>

            {/* Auto-toggle switch */}
            <Box sx={{ mt: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={autoToggle}
                    onChange={(e) => setAutoToggle(e.target.checked)}
                    color="primary"
                    size="small"
                  />
                }
                label={
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    자동 화자 전환
                  </Typography>
                }
              />
            </Box>
          </MotionPaper>

          {/* Tips */}
          <MotionPaper
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              border: '1px solid',
              borderColor: 'grey.200',
              mt: 3,
            }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'secondary.main', mb: 2 }}>
              💡 사용 팁
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {[
                { icon: AutoAwesomeIcon, text: '말이 끝나면 자동으로 화자 전환' },
                { icon: SwapHorizIcon, text: '잘못된 화자는 탭하여 수정 가능' },
                { icon: VolumeUpIcon, text: '명확하게 말씀해 주세요' },
              ].map((tip, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <tip.icon sx={{ fontSize: 18, color: 'primary.main' }} />
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {tip.text}
                  </Typography>
                </Box>
              ))}
            </Box>
          </MotionPaper>
        </Grid>

        {/* Right: Real-time Transcription */}
        <Grid size={{ xs: 12, lg: 7 }}>
          <MotionPaper
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            elevation={0}
            sx={{
              borderRadius: 4,
              border: '1px solid',
              borderColor: 'grey.200',
              height: { lg: 'calc(100vh - 220px)' },
              minHeight: 400,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Header */}
            <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'grey.100' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'secondary.main' }}>
                    실시간 텍스트 변환
                  </Typography>
                  {isRecording && !isPaused && (
                    <Chip
                      label="LIVE"
                      size="small"
                      sx={{
                        bgcolor: 'error.main',
                        color: 'white',
                        fontWeight: 700,
                        fontSize: '0.65rem',
                        height: 20,
                        animation: 'pulse 1.5s infinite',
                      }}
                    />
                  )}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography variant="caption" sx={{ color: 'grey.400' }}>
                    화자 수정: 카드 탭
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {liveTranscript.length}개 발화
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Transcription Content */}
            <Box
              ref={transcriptionRef}
              sx={{
                flex: 1,
                overflowY: 'auto',
                p: 3,
                bgcolor: '#FAFBFC',
              }}
            >
              <AnimatePresence>
                {liveTranscript.length === 0 && !currentText ? (
                  <Fade in>
                    <Box
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                      }}
                    >
                      <GraphicEqIcon sx={{ fontSize: 64, color: 'grey.300', mb: 2 }} />
                      <Typography variant="subtitle1" sx={{ color: 'grey.400', mb: 1 }}>
                        대기 중
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'grey.400' }}>
                        녹음을 시작하면 실시간으로 텍스트가 표시됩니다
                      </Typography>
                    </Box>
                  </Fade>
                ) : (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {liveTranscript.map((item, index) => (
                      <Grow key={index} in timeout={300}>
                        <Card
                          elevation={0}
                          onClick={() => handleSpeakerCorrection(index)}
                          sx={{
                            p: 0,
                            bgcolor: item.speaker === '의사' ? 'primary.50' : 'white',
                            border: '1px solid',
                            borderColor: item.speaker === '의사' ? 'primary.100' : 'grey.200',
                            borderRadius: 3,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              transform: 'scale(1.01)',
                              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                            },
                            '&:active': {
                              transform: 'scale(0.99)',
                            },
                          }}
                        >
                          <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                              <Box
                                sx={{
                                  width: 36,
                                  height: 36,
                                  borderRadius: 2,
                                  bgcolor: item.speaker === '의사' ? 'primary.main' : 'grey.500',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  flexShrink: 0,
                                }}
                              >
                                {item.speaker === '의사' ? (
                                  <LocalHospitalIcon sx={{ fontSize: 18, color: 'white' }} />
                                ) : (
                                  <PersonIcon sx={{ fontSize: 18, color: 'white' }} />
                                )}
                              </Box>
                              <Box sx={{ flex: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                  <Typography
                                    variant="caption"
                                    sx={{
                                      fontWeight: 700,
                                      color: item.speaker === '의사' ? 'primary.main' : 'text.secondary',
                                    }}
                                  >
                                    {item.speaker}
                                  </Typography>
                                  {item.timestamp && (
                                    <Typography variant="caption" sx={{ color: 'grey.400' }}>
                                      {item.timestamp}
                                    </Typography>
                                  )}
                                  <SwapHorizIcon sx={{ fontSize: 14, color: 'grey.300', ml: 'auto' }} />
                                </Box>
                                <Typography variant="body2" sx={{ color: 'text.primary', lineHeight: 1.6 }}>
                                  {item.text}
                                </Typography>
                              </Box>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grow>
                    ))}

                    {/* Current text being spoken */}
                    {currentText && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <Card
                          elevation={0}
                          sx={{
                            p: 0,
                            bgcolor: currentSpeaker === '의사' ? 'primary.50' : 'grey.50',
                            border: '1px dashed',
                            borderColor: currentSpeaker === '의사' ? 'primary.200' : 'grey.300',
                            borderRadius: 3,
                          }}
                        >
                          <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                              <Box
                                sx={{
                                  width: 36,
                                  height: 36,
                                  borderRadius: 2,
                                  bgcolor: currentSpeaker === '의사' ? 'primary.main' : 'grey.500',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  flexShrink: 0,
                                }}
                              >
                                {currentSpeaker === '의사' ? (
                                  <LocalHospitalIcon sx={{ fontSize: 18, color: 'white' }} />
                                ) : (
                                  <PersonIcon sx={{ fontSize: 18, color: 'white' }} />
                                )}
                              </Box>
                              <Box sx={{ flex: 1 }}>
                                <Typography
                                  variant="caption"
                                  sx={{
                                    fontWeight: 700,
                                    color: currentSpeaker === '의사' ? 'primary.main' : 'text.secondary',
                                    mb: 0.5,
                                    display: 'block',
                                  }}
                                >
                                  {currentSpeaker} (말하는 중...)
                                </Typography>
                                <Typography
                                  variant="body2"
                                  sx={{ color: 'text.primary', lineHeight: 1.6, fontStyle: 'italic' }}
                                >
                                  {currentText}
                                </Typography>
                              </Box>
                            </Box>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )}
                  </Box>
                )}
              </AnimatePresence>

              {/* Listening indicator */}
              {isRecording && !isPaused && !currentText && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ marginTop: liveTranscript.length > 0 ? 16 : 0 }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            backgroundColor: currentSpeaker === '의사' ? '#4B9CD3' : '#6B7280',
                          }}
                          animate={{ y: [0, -6, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                        />
                      ))}
                    </Box>
                    <Typography variant="caption" sx={{ color: 'grey.500' }}>
                      {currentSpeaker} 듣는 중...
                    </Typography>
                  </Box>
                </motion.div>
              )}
            </Box>
          </MotionPaper>
        </Grid>
      </Grid>

      {/* Pulse animation keyframes */}
      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </Box>
  );
}
