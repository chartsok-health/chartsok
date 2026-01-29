'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Paper,
  Button,
  IconButton,
  Chip,
  Fade,
  Grow,
  Grid,
  Card,
  CardContent,
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
import { useAuth } from '@/lib/AuthContext';

const MotionBox = motion.create(Box);
const MotionPaper = motion.create(Paper);

// Mock transcription that appears gradually
const mockTranscriptionParts = [
  { speaker: '의사', text: '안녕하세요, 어디가 불편하셔서 오셨나요?', timestamp: '00:03' },
  { speaker: '환자', text: '며칠 전부터 목이 아프고 기침이 나요.', timestamp: '00:08' },
  { speaker: '의사', text: '열은 있으셨나요?', timestamp: '00:15' },
  { speaker: '환자', text: '어제 밤에 37.8도까지 올랐어요.', timestamp: '00:20' },
  { speaker: '의사', text: '목 좀 볼게요. 아, 편도가 많이 부어있네요.', timestamp: '00:28' },
  { speaker: '환자', text: '삼킬 때 많이 아파요.', timestamp: '00:35' },
  { speaker: '의사', text: '급성 편도염으로 보입니다. 항생제와 진통제 처방해 드릴게요.', timestamp: '00:42' },
];

export default function RecordPage() {
  const router = useRouter();
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [transcription, setTranscription] = useState([]);
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [audioLevels, setAudioLevels] = useState(Array(20).fill(20));
  const transcriptionRef = useRef(null);

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

  // Mock transcription effect
  useEffect(() => {
    let interval;
    if (isRecording && !isPaused && currentPartIndex < mockTranscriptionParts.length) {
      interval = setInterval(() => {
        setTranscription((prev) => [...prev, mockTranscriptionParts[currentPartIndex]]);
        setCurrentPartIndex((prev) => prev + 1);
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isRecording, isPaused, currentPartIndex]);

  // Auto-scroll transcription
  useEffect(() => {
    if (transcriptionRef.current) {
      transcriptionRef.current.scrollTop = transcriptionRef.current.scrollHeight;
    }
  }, [transcription]);

  // Audio level animation
  useEffect(() => {
    let interval;
    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        setAudioLevels(Array(20).fill(0).map(() => 20 + Math.random() * 60));
      }, 100);
    } else {
      setAudioLevels(Array(20).fill(20));
    }
    return () => clearInterval(interval);
  }, [isRecording, isPaused]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setIsPaused(false);
    setRecordingTime(0);
    setTranscription([]);
    setCurrentPartIndex(0);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setIsPaused(false);
    router.push('/dashboard/record/result');
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
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
            <Typography variant="h4" sx={{ fontWeight: 800, color: 'secondary.main', mb: 0.5 }}>
              새 진료 녹음
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              환자와의 대화를 녹음하면 AI가 자동으로 차트를 생성합니다
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
                fontSize: { xs: '3rem', md: '4.5rem' },
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
                mb: 4,
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

            {/* Recording Controls */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mb: 4 }}>
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
              💡 녹음 팁
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {[
                { icon: VolumeUpIcon, text: '명확하게 말씀해 주세요' },
                { icon: PersonIcon, text: 'AI가 의사와 환자를 자동 구분합니다' },
                { icon: SettingsVoiceIcon, text: '의학 용어도 정확히 인식합니다' },
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
                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'secondary.main' }}>
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
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {transcription.length}개 발화
                </Typography>
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
                {transcription.length === 0 ? (
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
                      <Typography variant="h6" sx={{ color: 'grey.400', mb: 1 }}>
                        대기 중
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'grey.400' }}>
                        녹음을 시작하면 실시간으로 텍스트가 변환됩니다
                      </Typography>
                    </Box>
                  </Fade>
                ) : (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {transcription.map((item, index) => (
                      <Grow key={index} in timeout={400}>
                        <Card
                          elevation={0}
                          sx={{
                            p: 0,
                            bgcolor: item.speaker === '의사' ? 'primary.50' : 'white',
                            border: '1px solid',
                            borderColor: item.speaker === '의사' ? 'primary.100' : 'grey.200',
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
                                  bgcolor: item.speaker === '의사' ? 'primary.main' : 'grey.400',
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
                                  <Typography variant="caption" sx={{ fontWeight: 700, color: item.speaker === '의사' ? 'primary.main' : 'text.secondary' }}>
                                    {item.speaker}
                                  </Typography>
                                  <Typography variant="caption" sx={{ color: 'grey.400' }}>
                                    {item.timestamp}
                                  </Typography>
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
                  </Box>
                )}
              </AnimatePresence>

              {/* Typing indicator */}
              {isRecording && !isPaused && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ marginTop: 16 }}
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
                            backgroundColor: '#4B9CD3',
                          }}
                          animate={{ y: [0, -6, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                        />
                      ))}
                    </Box>
                    <Typography variant="caption" sx={{ color: 'grey.500' }}>
                      듣는 중...
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
