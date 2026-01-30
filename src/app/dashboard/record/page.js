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
  LinearProgress,
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  InputAdornment,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemButton,
  Divider,
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
import SearchIcon from '@mui/icons-material/Search';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AirIcon from '@mui/icons-material/Air';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useAuth } from '@/lib/AuthContext';

const MotionBox = motion.create(Box);
const MotionPaper = motion.create(Paper);

// Sample patient data
const samplePatients = [
  { id: 1, name: '김영희', age: 45, gender: '여', lastVisit: '2025-01-15', chartNo: 'P-2024-001' },
  { id: 2, name: '박철수', age: 62, gender: '남', lastVisit: '2025-01-20', chartNo: 'P-2024-002' },
  { id: 3, name: '이민정', age: 33, gender: '여', lastVisit: '2025-01-22', chartNo: 'P-2024-003' },
  { id: 4, name: '정대현', age: 58, gender: '남', lastVisit: '2025-01-25', chartNo: 'P-2024-004' },
];

const steps = ['환자 선택', '사전 정보', '진료 녹음', 'AI 분석', '완료'];

export default function RecordPage() {
  const router = useRouter();
  const { userProfile } = useAuth();

  // Step management
  const [activeStep, setActiveStep] = useState(0);

  // Step 1: Patient selection
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Step 2: Vitals
  const [vitals, setVitals] = useState({
    systolic: '',
    diastolic: '',
    heartRate: '',
    temperature: '',
    spO2: '',
    chiefComplaint: '',
  });

  // Step 3: Recording
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [liveText, setLiveText] = useState('');
  const [liveHistory, setLiveHistory] = useState([]);
  const [audioLevels, setAudioLevels] = useState(Array(20).fill(20));
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState('');
  const [error, setError] = useState(null);

  // Refs
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const streamRef = useRef(null);
  const analyserRef = useRef(null);
  const audioContextRef = useRef(null);
  const transcriptionRef = useRef(null);
  const recognitionRef = useRef(null);
  const recordingTimeRef = useRef(0);
  const isRecordingRef = useRef(false);
  const isPausedRef = useRef(false);

  useEffect(() => {
    recordingTimeRef.current = recordingTime;
  }, [recordingTime]);

  useEffect(() => {
    isRecordingRef.current = isRecording;
  }, [isRecording]);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

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

  // Auto-scroll
  useEffect(() => {
    if (transcriptionRef.current) {
      transcriptionRef.current.scrollTop = transcriptionRef.current.scrollHeight;
    }
  }, [liveHistory, liveText]);

  // Audio visualization
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

  // Filter patients based on search
  const filteredPatients = samplePatients.filter(
    (patient) =>
      patient.name.includes(searchQuery) ||
      patient.chartNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Web Speech API for live preview only
  const initSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return null;

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

      setLiveText(interimTranscript);

      if (finalTranscript) {
        const timestamp = formatTime(recordingTimeRef.current);
        setLiveHistory((prev) => [...prev, { text: finalTranscript.trim(), timestamp }]);
        setLiveText('');
      }
    };

    recognition.onerror = (event) => {
      // Silently handle common non-critical errors
      if (event.error === 'no-speech' || event.error === 'aborted') {
        return; // Normal - no speech detected or recognition was stopped
      }
      // Only log actual errors
      if (event.error === 'network') {
        console.warn('Speech recognition: Network error, will retry');
      } else if (event.error === 'not-allowed') {
        console.warn('Speech recognition: Microphone permission denied');
      }
    };

    recognition.onend = () => {
      // Auto-restart if still recording (use refs to avoid stale closure)
      if (recognitionRef.current && !isPausedRef.current && isRecordingRef.current) {
        try {
          setTimeout(() => {
            if (recognitionRef.current && isRecordingRef.current) {
              recognitionRef.current.start();
            }
          }, 100); // Small delay before restart
        } catch (e) {}
      }
    };

    return recognition;
  };

  const handleStartRecording = async () => {
    setError(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 16000,
        },
      });

      streamRef.current = stream;

      // Audio analyser
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      audioContextRef.current = audioContext;
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyserRef.current = analyser;

      // MediaRecorder
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

      // Web Speech for live preview
      const recognition = initSpeechRecognition();
      if (recognition) {
        recognitionRef.current = recognition;
        recognition.start();
      }

      setIsRecording(true);
      setIsPaused(false);
      setRecordingTime(0);
      setLiveHistory([]);
      setLiveText('');
    } catch (err) {
      console.error('Error starting recording:', err);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
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
    setLiveText('');

    // Move to AI Analysis step
    setActiveStep(3);

    // Wait for MediaRecorder
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (audioChunksRef.current.length === 0) {
      setError('녹음된 오디오가 없습니다.');
      return;
    }

    // Process with AI for speaker diarization
    setIsProcessing(true);
    setProcessingStatus('오디오 분석 준비 중...');

    try {
      const mimeType = mediaRecorderRef.current?.mimeType || 'audio/webm';
      const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });

      const getExt = (mime) => {
        if (mime.includes('webm')) return 'webm';
        if (mime.includes('mp4')) return 'mp4';
        if (mime.includes('ogg')) return 'ogg';
        return 'wav';
      };

      const formData = new FormData();
      const audioFile = new File([audioBlob], `recording.${getExt(mimeType)}`, { type: mimeType });
      formData.append('audio', audioFile);

      // Try AssemblyAI first (real speaker diarization)
      setProcessingStatus('AI가 화자를 분석 중... (음성 특성 분석)');

      let response = await fetch('/api/transcribe-assembly', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        if (data.segments && data.segments.length > 0) {
          const transcription = data.segments.map((seg, idx) => ({
            speaker: seg.speaker,
            text: seg.text,
            timestamp: formatTime(Math.floor((seg.start || 0) / 1000)),
          }));

          // Store data for result page
          sessionStorage.setItem('transcription', JSON.stringify(transcription));
          sessionStorage.setItem('recordingDuration', formatTime(finalRecordingTime));
          sessionStorage.setItem('patientInfo', JSON.stringify(selectedPatient));
          sessionStorage.setItem('vitalsInfo', JSON.stringify(vitals));

          setIsProcessing(false);
          setActiveStep(4); // Move to completion step
          return;
        }
      }

      // Fallback to OpenAI
      setProcessingStatus('대체 AI로 분석 중...');

      const formData2 = new FormData();
      formData2.append('audio', audioFile);
      formData2.append('context', '');

      response = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData2,
      });

      if (response.ok) {
        const data = await response.json();
        if (data.segments && data.segments.length > 0) {
          const transcription = data.segments.map((seg, idx) => ({
            speaker: seg.speaker,
            text: seg.text,
            timestamp: idx === 0 ? '00:00' : '',
          }));

          sessionStorage.setItem('transcription', JSON.stringify(transcription));
          sessionStorage.setItem('recordingDuration', formatTime(finalRecordingTime));
          sessionStorage.setItem('patientInfo', JSON.stringify(selectedPatient));
          sessionStorage.setItem('vitalsInfo', JSON.stringify(vitals));

          setIsProcessing(false);
          setActiveStep(4);
          return;
        }
      }

      // Final fallback - use live history
      if (liveHistory.length > 0) {
        const transcription = liveHistory.map((item, idx) => ({
          speaker: idx % 2 === 0 ? '의사' : '환자',
          text: item.text,
          timestamp: item.timestamp,
        }));
        sessionStorage.setItem('transcription', JSON.stringify(transcription));
        sessionStorage.setItem('recordingDuration', formatTime(finalRecordingTime));
        sessionStorage.setItem('patientInfo', JSON.stringify(selectedPatient));
        sessionStorage.setItem('vitalsInfo', JSON.stringify(vitals));

        setIsProcessing(false);
        setActiveStep(4);
      } else {
        setError('녹음된 내용이 없습니다.');
        setIsProcessing(false);
        setActiveStep(2); // Go back to recording step
      }
    } catch (err) {
      console.error('Processing error:', err);
      if (liveHistory.length > 0) {
        const transcription = liveHistory.map((item, idx) => ({
          speaker: idx % 2 === 0 ? '의사' : '환자',
          text: item.text,
          timestamp: item.timestamp,
        }));
        sessionStorage.setItem('transcription', JSON.stringify(transcription));
        sessionStorage.setItem('recordingDuration', formatTime(finalRecordingTime));
        sessionStorage.setItem('patientInfo', JSON.stringify(selectedPatient));
        sessionStorage.setItem('vitalsInfo', JSON.stringify(vitals));

        setIsProcessing(false);
        setActiveStep(4);
      } else {
        setError('처리 중 오류: ' + err.message);
        setIsProcessing(false);
        setActiveStep(2);
      }
    }
  };

  const handlePauseResume = () => {
    if (isPaused) {
      mediaRecorderRef.current?.resume();
      if (recognitionRef.current) {
        try { recognitionRef.current.start(); } catch (e) {}
      }
    } else {
      mediaRecorderRef.current?.pause();
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    }
    setIsPaused(!isPaused);
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const canProceedStep1 = selectedPatient !== null;
  const canProceedStep2 = vitals.chiefComplaint.trim() !== '';

  // Render step content
  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return renderPatientSelection();
      case 1:
        return renderVitalsEntry();
      case 2:
        return renderRecording();
      case 3:
        return renderProcessing();
      case 4:
        return renderCompletion();
      default:
        return null;
    }
  };

  // Step 1: Patient Selection
  const renderPatientSelection = () => (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'grey.200' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'secondary.main', mb: 2 }}>
              환자 검색
            </Typography>
            <TextField
              fullWidth
              placeholder="환자 이름 또는 차트 번호로 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'grey.400' }} />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />

            <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 1 }}>
              최근 진료 환자
            </Typography>
            <List sx={{ bgcolor: 'grey.50', borderRadius: 2 }}>
              {filteredPatients.map((patient, index) => (
                <Box key={patient.id}>
                  <ListItemButton
                    selected={selectedPatient?.id === patient.id}
                    onClick={() => setSelectedPatient(patient)}
                    sx={{
                      borderRadius: 2,
                      mx: 1,
                      my: 0.5,
                      '&.Mui-selected': {
                        bgcolor: 'primary.50',
                        borderColor: 'primary.main',
                        border: '1px solid',
                      },
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: selectedPatient?.id === patient.id ? 'primary.main' : 'grey.300' }}>
                        <PersonIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {patient.name}
                          </Typography>
                          <Chip label={`${patient.age}세 ${patient.gender}`} size="small" sx={{ height: 20, fontSize: '0.7rem' }} />
                        </Box>
                      }
                      secondary={`${patient.chartNo} · 최근 방문: ${patient.lastVisit}`}
                    />
                    {selectedPatient?.id === patient.id && (
                      <CheckCircleIcon sx={{ color: 'primary.main' }} />
                    )}
                  </ListItemButton>
                  {index < filteredPatients.length - 1 && <Divider sx={{ mx: 2 }} />}
                </Box>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'grey.200', mb: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<PersonAddIcon />}
              sx={{ py: 1.5 }}
            >
              새 환자 등록
            </Button>
          </Paper>

          {selectedPatient && (
            <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'primary.200', bgcolor: 'primary.50' }}>
              <Typography variant="subtitle2" sx={{ color: 'primary.main', fontWeight: 700, mb: 2 }}>
                선택된 환자
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Avatar sx={{ width: 56, height: 56, bgcolor: 'primary.main' }}>
                  <PersonIcon sx={{ fontSize: 32 }} />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>{selectedPatient.name}</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {selectedPatient.age}세 · {selectedPatient.gender} · {selectedPatient.chartNo}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          )}
        </Grid>
      </Grid>
    </MotionBox>
  );

  // Step 2: Vitals Entry
  const renderVitalsEntry = () => (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'grey.200' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'secondary.main', mb: 3 }}>
              바이탈 사인
            </Typography>

            <Grid container spacing={2}>
              <Grid size={{ xs: 6, sm: 3 }}>
                <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2, textAlign: 'center' }}>
                  <MonitorHeartIcon sx={{ fontSize: 28, color: 'error.main', mb: 1 }} />
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1 }}>
                    혈압 (mmHg)
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <TextField
                      size="small"
                      placeholder="120"
                      value={vitals.systolic}
                      onChange={(e) => setVitals({ ...vitals, systolic: e.target.value })}
                      sx={{ width: '45%' }}
                      inputProps={{ style: { textAlign: 'center' } }}
                    />
                    <Typography>/</Typography>
                    <TextField
                      size="small"
                      placeholder="80"
                      value={vitals.diastolic}
                      onChange={(e) => setVitals({ ...vitals, diastolic: e.target.value })}
                      sx={{ width: '45%' }}
                      inputProps={{ style: { textAlign: 'center' } }}
                    />
                  </Box>
                </Paper>
              </Grid>

              <Grid size={{ xs: 6, sm: 3 }}>
                <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2, textAlign: 'center' }}>
                  <FavoriteIcon sx={{ fontSize: 28, color: 'pink.500', mb: 1 }} />
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1 }}>
                    심박수 (bpm)
                  </Typography>
                  <TextField
                    size="small"
                    placeholder="72"
                    value={vitals.heartRate}
                    onChange={(e) => setVitals({ ...vitals, heartRate: e.target.value })}
                    fullWidth
                    inputProps={{ style: { textAlign: 'center' } }}
                  />
                </Paper>
              </Grid>

              <Grid size={{ xs: 6, sm: 3 }}>
                <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2, textAlign: 'center' }}>
                  <ThermostatIcon sx={{ fontSize: 28, color: 'orange.500', mb: 1 }} />
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1 }}>
                    체온 (°C)
                  </Typography>
                  <TextField
                    size="small"
                    placeholder="36.5"
                    value={vitals.temperature}
                    onChange={(e) => setVitals({ ...vitals, temperature: e.target.value })}
                    fullWidth
                    inputProps={{ style: { textAlign: 'center' } }}
                  />
                </Paper>
              </Grid>

              <Grid size={{ xs: 6, sm: 3 }}>
                <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2, textAlign: 'center' }}>
                  <AirIcon sx={{ fontSize: 28, color: 'info.main', mb: 1 }} />
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1 }}>
                    SpO2 (%)
                  </Typography>
                  <TextField
                    size="small"
                    placeholder="98"
                    value={vitals.spO2}
                    onChange={(e) => setVitals({ ...vitals, spO2: e.target.value })}
                    fullWidth
                    inputProps={{ style: { textAlign: 'center' } }}
                  />
                </Paper>
              </Grid>
            </Grid>

            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                주호소 <span style={{ color: '#EF4444' }}>*</span>
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                placeholder="환자의 주요 증상을 입력하세요..."
                value={vitals.chiefComplaint}
                onChange={(e) => setVitals({ ...vitals, chiefComplaint: e.target.value })}
              />
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'primary.200', bgcolor: 'primary.50' }}>
            <Typography variant="subtitle2" sx={{ color: 'primary.main', fontWeight: 700, mb: 2 }}>
              환자 정보
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ width: 48, height: 48, bgcolor: 'primary.main' }}>
                <PersonIcon />
              </Avatar>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{selectedPatient?.name}</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {selectedPatient?.age}세 · {selectedPatient?.gender}
                </Typography>
              </Box>
            </Box>
          </Paper>

          <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'grey.200', mt: 2 }}>
            <Typography variant="subtitle2" sx={{ color: 'text.secondary', fontWeight: 600, mb: 2 }}>
              💡 팁
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
              • 바이탈 사인은 선택 사항입니다<br />
              • 주호소는 필수 입력입니다<br />
              • AI가 차트 생성 시 참고합니다
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </MotionBox>
  );

  // Step 3: Recording
  const renderRecording = () => (
    <Grid container spacing={3}>
      {/* Left: Controls */}
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
          }}
        >
          {/* Patient Info Badge */}
          <Chip
            avatar={<Avatar sx={{ bgcolor: 'primary.main' }}><PersonIcon sx={{ fontSize: 16 }} /></Avatar>}
            label={`${selectedPatient?.name} · ${vitals.chiefComplaint.slice(0, 20)}${vitals.chiefComplaint.length > 20 ? '...' : ''}`}
            sx={{ mb: 3 }}
          />

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

          {/* Visualization */}
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 0.5, height: 80, mb: 3 }}>
            {audioLevels.map((level, index) => (
              <motion.div
                key={index}
                animate={{ height: level }}
                transition={{ duration: 0.1 }}
                style={{ width: 4, backgroundColor: isRecording && !isPaused ? '#EF4444' : '#E2E8F0', borderRadius: 2 }}
              />
            ))}
          </Box>

          {/* Status */}
          {isRecording && (
            <MotionBox initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} sx={{ mb: 3 }}>
              <Chip
                icon={<AutoAwesomeIcon sx={{ fontSize: 16 }} />}
                label="녹음 중 - 종료 후 AI 화자 분석"
                color="primary"
                variant="outlined"
                sx={{ fontWeight: 600 }}
              />
            </MotionBox>
          )}

          {/* Controls */}
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
                <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <IconButton
                    onClick={handlePauseResume}
                    sx={{ width: 64, height: 64, bgcolor: 'warning.main', color: 'white', '&:hover': { bgcolor: 'warning.dark' } }}
                  >
                    {isPaused ? <PlayArrowIcon sx={{ fontSize: 32 }} /> : <PauseIcon sx={{ fontSize: 32 }} />}
                  </IconButton>
                </motion.div>

                <motion.div animate={{ scale: isPaused ? 1 : [1, 1.05, 1] }} transition={{ duration: 1, repeat: isPaused ? 0 : Infinity }}>
                  <IconButton
                    sx={{ width: 100, height: 100, bgcolor: 'error.main', color: 'white', boxShadow: '0 8px 32px rgba(239, 68, 68, 0.4)' }}
                    disabled
                  >
                    <MicIcon sx={{ fontSize: 48 }} />
                  </IconButton>
                </motion.div>

                <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <IconButton
                    onClick={handleStopRecording}
                    sx={{ width: 64, height: 64, bgcolor: 'secondary.main', color: 'white', '&:hover': { bgcolor: 'secondary.dark' } }}
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
                ? '일시정지 중...'
                : '진료 중... 정지하면 AI가 화자를 분석합니다'}
          </Typography>
        </MotionPaper>
      </Grid>

      {/* Right: Live Preview */}
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
            height: { lg: 'calc(100vh - 340px)' },
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
                  실시간 미리보기
                </Typography>
                {isRecording && !isPaused && (
                  <Chip label="LIVE" size="small" sx={{ bgcolor: 'error.main', color: 'white', fontWeight: 700, fontSize: '0.65rem', height: 20, animation: 'pulse 1.5s infinite' }} />
                )}
              </Box>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                화자 구분은 녹음 종료 후
              </Typography>
            </Box>
          </Box>

          {/* Content */}
          <Box ref={transcriptionRef} sx={{ flex: 1, overflowY: 'auto', p: 3, bgcolor: '#FAFBFC' }}>
            <AnimatePresence>
              {liveHistory.length === 0 && !liveText ? (
                <Fade in>
                  <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                    <GraphicEqIcon sx={{ fontSize: 64, color: 'grey.300', mb: 2 }} />
                    <Typography variant="subtitle1" sx={{ color: 'grey.400', mb: 1 }}>대기 중</Typography>
                    <Typography variant="body2" sx={{ color: 'grey.400' }}>녹음을 시작하면 실시간으로 텍스트가 표시됩니다</Typography>
                  </Box>
                </Fade>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {liveHistory.map((item, index) => (
                    <Grow key={index} in timeout={300}>
                      <Card elevation={0} sx={{ p: 0, bgcolor: 'white', border: '1px solid', borderColor: 'grey.200', borderRadius: 3 }}>
                        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                            <Box sx={{ width: 36, height: 36, borderRadius: 2, bgcolor: 'grey.200', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <SettingsVoiceIcon sx={{ fontSize: 18, color: 'grey.500' }} />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                <Chip label="화자 분석 대기" size="small" sx={{ height: 20, fontSize: '0.65rem', bgcolor: 'grey.100', color: 'grey.600' }} />
                                <Typography variant="caption" sx={{ color: 'grey.400' }}>{item.timestamp}</Typography>
                              </Box>
                              <Typography variant="body2" sx={{ color: 'text.primary', lineHeight: 1.6 }}>{item.text}</Typography>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grow>
                  ))}

                  {liveText && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                      <Card elevation={0} sx={{ p: 0, bgcolor: 'primary.50', border: '1px dashed', borderColor: 'primary.200', borderRadius: 3 }}>
                        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                            <Box sx={{ width: 36, height: 36, borderRadius: 2, bgcolor: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <MicIcon sx={{ fontSize: 18, color: 'white' }} />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                              <Typography variant="caption" sx={{ fontWeight: 700, color: 'primary.main', mb: 0.5, display: 'block' }}>말하는 중...</Typography>
                              <Typography variant="body2" sx={{ color: 'text.primary', lineHeight: 1.6, fontStyle: 'italic' }}>{liveText}</Typography>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </Box>
              )}
            </AnimatePresence>

            {isRecording && !isPaused && !liveText && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginTop: liveHistory.length > 0 ? 16 : 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#4B9CD3' }}
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </Box>
                  <Typography variant="caption" sx={{ color: 'grey.500' }}>듣는 중...</Typography>
                </Box>
              </motion.div>
            )}
          </Box>
        </MotionPaper>
      </Grid>
    </Grid>
  );

  // Step 4: Processing
  const renderProcessing = () => (
    <Box
      sx={{
        minHeight: 400,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      >
        <AutoAwesomeIcon sx={{ fontSize: 80, color: 'primary.main', mb: 4 }} />
      </motion.div>
      <Typography variant="h5" sx={{ fontWeight: 700, color: 'secondary.main', mb: 2 }}>
        AI가 화자를 분석 중입니다
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
        {processingStatus}
      </Typography>
      <Box sx={{ width: 300, mb: 3 }}>
        <LinearProgress sx={{ height: 8, borderRadius: 4 }} />
      </Box>
      <Box sx={{ display: 'flex', gap: 4, mt: 2 }}>
        <Box sx={{ textAlign: 'center' }}>
          <LocalHospitalIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
          <Typography variant="caption" sx={{ color: 'grey.600', display: 'block' }}>
            의사 음성
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <SwapHorizIcon sx={{ fontSize: 40, color: 'grey.400', mb: 1 }} />
          <Typography variant="caption" sx={{ color: 'grey.400', display: 'block' }}>
            자동 구분
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <PersonIcon sx={{ fontSize: 40, color: 'grey.600', mb: 1 }} />
          <Typography variant="caption" sx={{ color: 'grey.600', display: 'block' }}>
            환자 음성
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  // Step 5: Completion
  const renderCompletion = () => (
    <MotionBox
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      sx={{ textAlign: 'center', py: 6 }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
      >
        <CheckCircleIcon sx={{ fontSize: 100, color: 'success.main', mb: 3 }} />
      </motion.div>
      <Typography variant="h4" sx={{ fontWeight: 700, color: 'secondary.main', mb: 2 }}>
        분석 완료!
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
        AI가 의사와 환자의 대화를 성공적으로 분석했습니다.
      </Typography>

      <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'grey.200', maxWidth: 400, mx: 'auto', mb: 4 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 6 }}>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>환자</Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{selectedPatient?.name}</Typography>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>녹음 시간</Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{formatTime(recordingTime)}</Typography>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>주호소</Typography>
            <Typography variant="body2">{vitals.chiefComplaint}</Typography>
          </Grid>
        </Grid>
      </Paper>

      <Button
        variant="contained"
        size="large"
        onClick={() => router.push('/dashboard/record/result')}
        sx={{ px: 6, py: 1.5 }}
      >
        결과 보기 및 SOAP 생성
      </Button>
    </MotionBox>
  );

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1400, mx: 'auto' }}>
      {/* Header */}
      <MotionBox
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{ mb: 4 }}
      >
        <Typography variant="h5" sx={{ fontWeight: 800, color: 'secondary.main', mb: 0.5 }}>
          새 진료 녹음
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          5단계 스마트 워크플로우로 진료를 기록하세요
        </Typography>
      </MotionBox>

      {/* Stepper */}
      <Paper elevation={0} sx={{ p: 2, mb: 4, borderRadius: 3, border: '1px solid', borderColor: 'grey.200' }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>

      {/* Error */}
      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Step Content */}
      {renderStepContent()}

      {/* Navigation Buttons */}
      {activeStep < 3 && !isRecording && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            startIcon={<ArrowBackIcon />}
          >
            이전
          </Button>
          {activeStep < 2 && (
            <Button
              variant="contained"
              onClick={handleNext}
              endIcon={<ArrowForwardIcon />}
              disabled={
                (activeStep === 0 && !canProceedStep1) ||
                (activeStep === 1 && !canProceedStep2)
              }
            >
              다음
            </Button>
          )}
        </Box>
      )}

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </Box>
  );
}
