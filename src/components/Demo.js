'use client';

import { useState, useEffect, useRef } from 'react';
import { Box, Container, Typography, Paper, Stack, Button, TextField, Chip, Grid, Avatar, LinearProgress, IconButton, Checkbox } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import MicIcon from '@mui/icons-material/Mic';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import StopIcon from '@mui/icons-material/Stop';
import DescriptionIcon from '@mui/icons-material/Description';
import StarIcon from '@mui/icons-material/Star';
import CelebrationIcon from '@mui/icons-material/Celebration';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import ReplayIcon from '@mui/icons-material/Replay';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import BatteryFullIcon from '@mui/icons-material/BatteryFull';
import WifiIcon from '@mui/icons-material/Wifi';
import LoginIcon from '@mui/icons-material/Login';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PrintIcon from '@mui/icons-material/Print';
import { useI18n } from '@/lib/i18n';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';

const MotionBox = motion.create(Box);
const MotionPaper = motion.create(Paper);

const tabs = [
  { id: 'patient', icon: PersonSearchIcon, color: '#4B9CD3', label: '환자선택' },
  { id: 'vitals', icon: MonitorHeartIcon, color: '#10B981', label: '사전정보' },
  { id: 'recording', icon: MicIcon, color: '#EF4444', label: '녹음' },
  { id: 'soap', icon: AutoAwesomeIcon, color: '#8B5CF6', label: 'AI분석' },
  { id: 'actions', icon: AssignmentTurnedInIcon, color: '#F59E0B', label: '안내/액션' },
  { id: 'emr', icon: SendIcon, color: '#EC4899', label: 'EMR' },
];

const samplePatients = [
  { id: 1, name: '김영희', age: 45, gender: 'F', lastVisit: '2025-01-20', complaint: '두통' },
  { id: 2, name: '박철수', age: 62, gender: 'M', lastVisit: '2025-01-18', complaint: '혈압 체크' },
  { id: 3, name: '이지연', age: 35, gender: 'F', lastVisit: '2025-01-15', complaint: '감기 증상' },
];

const transcriptLines = [
  { speaker: '의사', text: '안녕하세요, 어디가 불편하세요?' },
  { speaker: '환자', text: '3일 전부터 머리가 아파요. 특히 오후에 더 심해져요.' },
  { speaker: '의사', text: '어떤 종류의 두통인가요? 찌릿찌릿한가요, 아니면 조이는 느낌인가요?' },
  { speaker: '환자', text: '조이는 느낌이에요. 목도 좀 뻣뻣하고요.' },
  { speaker: '의사', text: '평소 스트레스를 많이 받으시나요? 컴퓨터 작업을 오래 하시나요?' },
  { speaker: '환자', text: '네, 요즘 프로젝트 때문에 야근이 많아요. 모니터를 하루 10시간 넘게 봐요.' },
];

export default function Demo() {
  const { t, locale } = useI18n();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('patient');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState('soap');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [isSent, setIsSent] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [checkedActions, setCheckedActions] = useState([]);
  const [instructionsCopied, setInstructionsCopied] = useState(false);
  const autoPlayRef = useRef(null);

  const demo = t('demo');
  const isLoggedIn = !!user;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Recording timer
  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  // Typing animation for transcript - slower for readability
  useEffect(() => {
    if (!isRecording || currentLineIndex >= transcriptLines.length) return;

    const currentLine = transcriptLines[currentLineIndex];
    const fullText = `${currentLine.speaker}: ${currentLine.text}`;

    if (displayedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length + 1));
      }, 50); // Slower typing (was 30ms)
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
        setDisplayedText('');
      }, 1200); // Longer pause between lines (was 800ms)
      return () => clearTimeout(timeout);
    }
  }, [isRecording, currentLineIndex, displayedText]);

  // Processing animation
  useEffect(() => {
    if (isProcessing) {
      const interval = setInterval(() => {
        setProcessingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsProcessing(false);
            setActiveTab('soap');
            return 100;
          }
          return prev + 2;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isProcessing]);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) {
      if (autoPlayRef.current) clearTimeout(autoPlayRef.current);
      return;
    }

    const runAutoPlay = async () => {
      // Step 1: Select patient
      await new Promise(r => autoPlayRef.current = setTimeout(r, 1000));
      if (!isAutoPlaying) return;
      setSelectedPatient(samplePatients[0]);

      await new Promise(r => autoPlayRef.current = setTimeout(r, 1000));
      if (!isAutoPlaying) return;
      setActiveTab('vitals');

      // Step 2: Vitals - see vitals and template
      await new Promise(r => autoPlayRef.current = setTimeout(r, 2200));
      if (!isAutoPlaying) return;
      setActiveTab('recording');

      // Step 3: Recording
      await new Promise(r => autoPlayRef.current = setTimeout(r, 800));
      if (!isAutoPlaying) return;
      setIsRecording(true);
      setRecordingTime(0);
      setCurrentLineIndex(0);
      setDisplayedText('');

      // Let recording run
      await new Promise(r => autoPlayRef.current = setTimeout(r, 10000));
      if (!isAutoPlaying) return;
      setIsRecording(false);
      setIsProcessing(true);
      setProcessingProgress(0);

      // Wait for processing
      await new Promise(r => autoPlayRef.current = setTimeout(r, 3000));
      if (!isAutoPlaying) return;

      // Step 4: SOAP review
      await new Promise(r => autoPlayRef.current = setTimeout(r, 3000));
      if (!isAutoPlaying) return;
      setActiveTab('actions');

      // Step 5: Actions - check items one by one
      await new Promise(r => autoPlayRef.current = setTimeout(r, 1000));
      if (!isAutoPlaying) return;
      setInstructionsCopied(true);
      await new Promise(r => autoPlayRef.current = setTimeout(r, 800));
      setInstructionsCopied(false);

      await new Promise(r => autoPlayRef.current = setTimeout(r, 600));
      if (!isAutoPlaying) return;
      setCheckedActions(['recall']);
      await new Promise(r => autoPlayRef.current = setTimeout(r, 600));
      if (!isAutoPlaying) return;
      setCheckedActions(['recall', 'test']);
      await new Promise(r => autoPlayRef.current = setTimeout(r, 600));
      if (!isAutoPlaying) return;
      setCheckedActions(['recall', 'test', 'meds']);

      await new Promise(r => autoPlayRef.current = setTimeout(r, 1500));
      if (!isAutoPlaying) return;
      setActiveTab('emr');

      // Step 6: Send to EMR
      await new Promise(r => autoPlayRef.current = setTimeout(r, 1500));
      if (!isAutoPlaying) return;
      setIsSent(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3500);

      // Reset and stop auto-play
      await new Promise(r => autoPlayRef.current = setTimeout(r, 4000));
      setIsAutoPlaying(false);
    };

    runAutoPlay();

    return () => {
      if (autoPlayRef.current) clearTimeout(autoPlayRef.current);
    };
  }, [isAutoPlaying]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    setCurrentLineIndex(0);
    setDisplayedText('');
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setIsProcessing(true);
    setProcessingProgress(0);
  };

  const handleSendToEMR = () => {
    setIsSent(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const resetDemo = () => {
    setActiveTab('patient');
    setSelectedPatient(null);
    setSelectedTemplate('soap');
    setIsRecording(false);
    setRecordingTime(0);
    setCurrentLineIndex(0);
    setDisplayedText('');
    setIsProcessing(false);
    setProcessingProgress(0);
    setIsSent(false);
    setIsAutoPlaying(false);
    setCheckedActions([]);
    setInstructionsCopied(false);
  };

  const toggleAutoPlay = () => {
    if (isAutoPlaying) {
      setIsAutoPlaying(false);
      if (autoPlayRef.current) clearTimeout(autoPlayRef.current);
    } else {
      resetDemo();
      setTimeout(() => setIsAutoPlaying(true), 100);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'patient':
        return (
          <MotionBox
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {/* Search Bar */}
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <TextField
                placeholder={demo.patientSelect?.searchPlaceholder || '환자 검색...'}
                size="small"
                fullWidth
                InputProps={{
                  startAdornment: <SearchIcon sx={{ color: 'text.disabled', mr: 1, fontSize: 18 }} />,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: 'grey.50',
                    borderRadius: 2,
                    fontSize: '0.85rem',
                  },
                }}
              />
              <IconButton size="small" sx={{ bgcolor: 'primary.main', color: 'white', borderRadius: 2, '&:hover': { bgcolor: 'primary.dark' } }}>
                <AddIcon fontSize="small" />
              </IconButton>
            </Box>

            {/* Recent Patients */}
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, mb: 1.5, display: 'block', fontSize: { xs: '0.75rem', md: '0.85rem' } }}>
              {demo.patientSelect?.recentPatients || '최근 환자'}
            </Typography>
            <Stack spacing={1}>
              {samplePatients.map((patient, index) => (
                <MotionBox
                  key={patient.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Paper
                    elevation={0}
                    onClick={() => {
                      setSelectedPatient(patient);
                      if (!isAutoPlaying) setTimeout(() => setActiveTab('vitals'), 400);
                    }}
                    sx={{
                      p: { xs: 1.5, md: 2 },
                      cursor: 'pointer',
                      border: '2px solid',
                      borderColor: selectedPatient?.id === patient.id ? 'primary.main' : 'grey.100',
                      borderRadius: 2,
                      bgcolor: selectedPatient?.id === patient.id ? 'primary.50' : 'white',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        borderColor: 'primary.main',
                        bgcolor: 'primary.50',
                        transform: 'translateX(4px)',
                      },
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar sx={{ bgcolor: patient.gender === 'F' ? '#EC4899' : '#4B9CD3', width: { xs: 40, md: 44 }, height: { xs: 40, md: 44 } }}>
                        <PersonIcon sx={{ fontSize: { xs: 20, md: 22 } }} />
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                            {patient.name}
                          </Typography>
                          <Chip
                            label={patient.complaint}
                            size="small"
                            sx={{
                              height: 22,
                              fontSize: { xs: '0.7rem', md: '0.75rem' },
                              bgcolor: 'warning.50',
                              color: 'warning.main',
                            }}
                          />
                        </Stack>
                        <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: { xs: '0.8rem', md: '0.85rem' } }}>
                          {patient.age}세 · {patient.gender === 'M' ? '남' : '여'} · {patient.lastVisit}
                        </Typography>
                      </Box>
                      {selectedPatient?.id === patient.id && (
                        <MotionBox
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 500 }}
                        >
                          <CheckCircleIcon sx={{ color: 'primary.main', fontSize: 24 }} />
                        </MotionBox>
                      )}
                    </Stack>
                  </Paper>
                </MotionBox>
              ))}
            </Stack>
          </MotionBox>
        );

      case 'vitals':
        return (
          <MotionBox
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {/* Selected Patient */}
            {selectedPatient && (
              <Box sx={{ mb: 2, p: 1.5, bgcolor: 'primary.50', borderRadius: 2, border: '1px solid', borderColor: 'primary.100' }}>
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                    <PersonIcon sx={{ fontSize: 16 }} />
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: '0.85rem' }}>{selectedPatient.name}</Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>
                      {selectedPatient.age}세 · {selectedPatient.complaint}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            )}

            {/* Vitals Grid */}
            <Grid container spacing={{ xs: 1.5, md: 2 }}>
              {[
                { label: 'BP', value: '120/80', unit: 'mmHg', color: '#EF4444' },
                { label: 'HR', value: '72', unit: 'bpm', color: '#F59E0B' },
                { label: 'BT', value: '36.5', unit: '°C', color: '#10B981' },
                { label: 'SpO2', value: '98', unit: '%', color: '#4B9CD3' },
              ].map((vital, i) => (
                <Grid size={{ xs: 6 }} key={i}>
                  <MotionBox
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    sx={{
                      p: { xs: 1.5, md: 2 },
                      bgcolor: `${vital.color}08`,
                      borderRadius: 2,
                      textAlign: 'center',
                      border: '1px solid',
                      borderColor: `${vital.color}20`,
                    }}
                  >
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, fontSize: { xs: '0.75rem', md: '0.85rem' } }}>
                      {vital.label}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: vital.color, fontSize: { xs: '1.25rem', md: '1.4rem' } }}>
                      {vital.value}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: { xs: '0.7rem', md: '0.8rem' } }}>
                      {vital.unit}
                    </Typography>
                  </MotionBox>
                </Grid>
              ))}
            </Grid>

            {/* Template */}
            <Box sx={{ mt: 2.5 }}>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, mb: 1.5, display: 'block', fontSize: { xs: '0.8rem', md: '0.9rem' } }}>
                템플릿
              </Typography>
              <Stack direction="row" spacing={1.5}>
                {[
                  { id: 'soap', name: 'SOAP', icon: DescriptionIcon },
                  { id: 'custom', name: '나만의 템플릿', icon: StarIcon },
                ].map((template) => (
                  <Paper
                    key={template.id}
                    elevation={0}
                    onClick={() => setSelectedTemplate(template.id)}
                    sx={{
                      p: { xs: 1.25, md: 1.5 },
                      cursor: 'pointer',
                      border: '2px solid',
                      borderColor: selectedTemplate === template.id ? 'primary.main' : 'grey.200',
                      borderRadius: 2,
                      bgcolor: selectedTemplate === template.id ? 'primary.50' : 'white',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      flex: 1,
                      justifyContent: 'center',
                    }}
                  >
                    <template.icon sx={{ fontSize: { xs: 16, md: 18 }, color: selectedTemplate === template.id ? 'primary.main' : 'grey.500' }} />
                    <Typography variant="caption" sx={{ fontWeight: 600, fontSize: { xs: '0.8rem', md: '0.9rem' } }}>{template.name}</Typography>
                  </Paper>
                ))}
              </Stack>
            </Box>

            <Button
              variant="contained"
              fullWidth
              startIcon={<MicIcon />}
              onClick={() => setActiveTab('recording')}
              sx={{ mt: 2.5, py: { xs: 1.5, md: 1.75 }, borderRadius: 2.5, fontSize: { xs: '0.95rem', md: '1rem' } }}
            >
              녹음 시작
            </Button>
          </MotionBox>
        );

      case 'recording':
        return (
          <MotionBox
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {/* Recording Status */}
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
              {isRecording && (
                <MotionBox
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    bgcolor: '#EF4444',
                  }}
                />
              )}
              <Chip
                label={isRecording ? `REC · ${formatTime(recordingTime)}` : '준비됨'}
                size="small"
                sx={{
                  bgcolor: isRecording ? '#FEE2E2' : 'grey.100',
                  color: isRecording ? '#DC2626' : 'text.secondary',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  fontFamily: 'monospace',
                }}
              />
            </Stack>

            {/* Audio Waveform Visualization */}
            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '2px',
              height: 60,
              mb: 2,
              bgcolor: isRecording ? '#FEF2F2' : 'grey.50',
              borderRadius: 2,
              px: 2,
            }}>
              {isMounted && Array.from({ length: 50 }).map((_, i) => (
                <MotionBox
                  key={i}
                  animate={isRecording ? {
                    height: [8, 15 + Math.sin(i * 0.3) * 20 + Math.random() * 15, 8],
                  } : { height: 8 }}
                  transition={{
                    duration: 0.2 + Math.random() * 0.2,
                    repeat: isRecording ? Infinity : 0,
                    ease: 'easeInOut',
                    delay: i * 0.02,
                  }}
                  sx={{
                    width: 3,
                    bgcolor: isRecording ? '#EF4444' : 'grey.300',
                    borderRadius: 1,
                    opacity: isRecording ? 0.9 : 0.4,
                  }}
                />
              ))}
            </Box>

            {/* Live Transcript */}
            <Box
              sx={{
                bgcolor: '#1a1a2e',
                borderRadius: 2,
                p: 2,
                minHeight: 140,
                maxHeight: 140,
                overflow: 'auto',
                mb: 2,
                position: 'relative',
              }}
            >
              {/* Terminal Header */}
              <Box sx={{ position: 'absolute', top: 8, left: 12, display: 'flex', gap: 0.5 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#ff5f56' }} />
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#ffbd2e' }} />
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#27ca3f' }} />
              </Box>

              <Typography variant="caption" sx={{ color: '#666', display: 'block', mb: 1, mt: 1, fontSize: '0.65rem' }}>
                실시간 텍스트 변환
              </Typography>
              <Stack spacing={1}>
                {transcriptLines.slice(0, currentLineIndex).map((line, idx) => (
                  <MotionBox
                    key={idx}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Typography variant="body2" sx={{ fontSize: '0.75rem', lineHeight: 1.5 }}>
                      <Box component="span" sx={{
                        color: line.speaker === '의사' ? '#4B9CD3' : '#10B981',
                        fontWeight: 600,
                      }}>
                        [{line.speaker}]
                      </Box>{' '}
                      <Box component="span" sx={{ color: '#E5E7EB' }}>{line.text}</Box>
                    </Typography>
                  </MotionBox>
                ))}
                {isRecording && displayedText && (
                  <Typography variant="body2" sx={{ fontSize: '0.75rem', lineHeight: 1.5 }}>
                    <Box component="span" sx={{
                      color: transcriptLines[currentLineIndex]?.speaker === '의사' ? '#4B9CD3' : '#10B981',
                      fontWeight: 600,
                    }}>
                      [{transcriptLines[currentLineIndex]?.speaker}]
                    </Box>{' '}
                    <Box component="span" sx={{ color: '#E5E7EB' }}>{displayedText.split(': ')[1]}</Box>
                    <MotionBox
                      component="span"
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      sx={{ ml: 0.5, color: '#4B9CD3' }}
                    >
                      █
                    </MotionBox>
                  </Typography>
                )}
              </Stack>
            </Box>

            {/* Processing State */}
            {isProcessing ? (
              <MotionBox initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} sx={{ mb: 1.5 }}>
                  <MotionBox
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                  >
                    <AutoAwesomeIcon sx={{ color: '#8B5CF6', fontSize: 20 }} />
                  </MotionBox>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#8B5CF6', fontSize: '0.8rem' }}>
                    AI 분석 중...
                  </Typography>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={processingProgress}
                  sx={{
                    borderRadius: 2,
                    height: 6,
                    bgcolor: '#8B5CF620',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: '#8B5CF6',
                      borderRadius: 2,
                    },
                  }}
                />
                <Typography variant="caption" sx={{ color: 'text.secondary', mt: 0.5, display: 'block', textAlign: 'center', fontSize: '0.7rem' }}>
                  화자 분리 · 텍스트 정제 · 차트 생성 {processingProgress}%
                </Typography>
              </MotionBox>
            ) : (
              <Stack direction="row" spacing={1.5} justifyContent="center">
                {!isRecording ? (
                  <Button
                    variant="contained"
                    startIcon={<MicIcon />}
                    onClick={handleStartRecording}
                    sx={{
                      px: 4,
                      py: 1.25,
                      borderRadius: 2.5,
                      bgcolor: '#EF4444',
                      fontSize: '0.85rem',
                      '&:hover': { bgcolor: '#DC2626' },
                    }}
                  >
                    녹음 시작
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    startIcon={<StopIcon />}
                    onClick={handleStopRecording}
                    sx={{
                      px: 4,
                      py: 1.25,
                      borderRadius: 2.5,
                      bgcolor: '#8B5CF6',
                      fontSize: '0.85rem',
                      '&:hover': { bgcolor: '#7C3AED' },
                    }}
                  >
                    녹음 종료
                  </Button>
                )}
              </Stack>
            )}
          </MotionBox>
        );

      case 'soap':
        return (
          <MotionBox
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1.5 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: '0.85rem' }}>
                {demo.soapPreview?.title || 'SOAP 노트'}
              </Typography>
              <Chip
                icon={<AutoAwesomeIcon sx={{ fontSize: 12 }} />}
                label="AI 생성"
                size="small"
                sx={{ bgcolor: '#EDE9FE', color: '#7C3AED', fontSize: '0.65rem', height: 22 }}
              />
            </Stack>

            <Stack spacing={1}>
              {[
                { label: 'S', title: 'Subjective', content: demo.soapPreview?.s || '3일 전부터 두통, 오후에 심화, 조이는 양상, 목 뻣뻣함', color: '#4B9CD3' },
                { label: 'O', title: 'Objective', content: demo.soapPreview?.o || 'BP 120/80, HR 72, 경부 근육 긴장(+)', color: '#10B981' },
                { label: 'A', title: 'Assessment', content: demo.soapPreview?.a || '긴장성 두통 (R51)', color: '#F59E0B' },
                { label: 'P', title: 'Plan', content: demo.soapPreview?.p || 'NSAIDs 처방, 스트레칭 교육, 1주 후 f/u', color: '#8B5CF6' },
              ].map((item, index) => (
                <MotionBox
                  key={item.label}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  sx={{
                    display: 'flex',
                    gap: 1,
                    p: 1.25,
                    bgcolor: `${item.color}08`,
                    borderRadius: 1.5,
                    borderLeft: '3px solid',
                    borderLeftColor: item.color,
                  }}
                >
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: 1,
                      bgcolor: item.color,
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '0.7rem',
                      flexShrink: 0,
                    }}
                  >
                    {item.label}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="caption" sx={{ color: item.color, fontWeight: 700, fontSize: '0.65rem' }}>
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.primary', fontSize: '0.75rem', lineHeight: 1.5 }}
                    >
                      {item.content}
                    </Typography>
                  </Box>
                  <IconButton size="small" sx={{ opacity: 0.5, '&:hover': { opacity: 1 } }}>
                    <ContentCopyIcon sx={{ fontSize: 14 }} />
                  </IconButton>
                </MotionBox>
              ))}
            </Stack>

            <Button
              variant="contained"
              fullWidth
              endIcon={<AssignmentTurnedInIcon />}
              onClick={() => setActiveTab('actions')}
              sx={{ mt: 2, py: 1.25, borderRadius: 2, fontSize: '0.85rem', bgcolor: '#F59E0B', '&:hover': { bgcolor: '#D97706' } }}
            >
              {locale === 'ko' ? '안내문 · 후속관리 확인' : 'Review Instructions & Actions'}
            </Button>
          </MotionBox>
        );

      case 'actions':
        const actionItems = locale === 'ko'
          ? [
              { id: 'recall', label: '1주 후 재내원 리마인더 설정', icon: NotificationsActiveIcon },
              { id: 'test', label: '증상 지속 시 MRI 검사 예약', icon: AssignmentTurnedInIcon },
              { id: 'meds', label: '진통제 복용 경과 확인 (3일 후)', icon: CheckCircleIcon },
            ]
          : [
              { id: 'recall', label: 'Set 1-week return reminder', icon: NotificationsActiveIcon },
              { id: 'test', label: 'Schedule MRI if symptoms persist', icon: AssignmentTurnedInIcon },
              { id: 'meds', label: 'Check pain medication progress (3 days)', icon: CheckCircleIcon },
            ];

        const instructionText = locale === 'ko'
          ? '김영희 님께,\n\n1. 처방된 진통제(이부프로펜 400mg)를 식후 30분에 복용해주세요.\n2. 목과 어깨 스트레칭을 하루 3회, 10분씩 해주세요.\n3. 모니터 높이를 눈높이에 맞추고, 50분 작업 후 10분 휴식을 권합니다.\n4. 1주일 후 재내원하여 경과를 확인합니다.\n\n증상이 악화되면 즉시 내원해주세요.'
          : 'Dear Ms. Kim,\n\n1. Take prescribed ibuprofen 400mg 30 min after meals.\n2. Stretch neck & shoulders 3x daily, 10 min each.\n3. Adjust monitor to eye level, take 10-min breaks every 50 min.\n4. Return in 1 week for follow-up.\n\nVisit immediately if symptoms worsen.';

        return (
          <MotionBox
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {/* Patient Instructions Card */}
            <MotionBox
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              sx={{
                p: 1.5,
                bgcolor: '#FFFBEB',
                borderRadius: 2,
                border: '1.5px solid #FDE68A',
                mb: 2,
              }}
            >
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
                <Stack direction="row" alignItems="center" spacing={0.75}>
                  <DescriptionIcon sx={{ fontSize: 16, color: '#F59E0B' }} />
                  <Typography variant="caption" sx={{ color: '#92400E', fontWeight: 700, fontSize: '0.75rem' }}>
                    {locale === 'ko' ? '환자 안내문' : 'Patient Instructions'}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={0.5}>
                  <IconButton
                    size="small"
                    onClick={() => {
                      setInstructionsCopied(true);
                      setTimeout(() => setInstructionsCopied(false), 2000);
                    }}
                    sx={{
                      width: 26, height: 26,
                      bgcolor: instructionsCopied ? '#10B981' : '#FEF3C7',
                      '&:hover': { bgcolor: instructionsCopied ? '#10B981' : '#FDE68A' },
                    }}
                  >
                    {instructionsCopied
                      ? <CheckCircleIcon sx={{ fontSize: 14, color: 'white' }} />
                      : <ContentCopyIcon sx={{ fontSize: 13, color: '#92400E' }} />}
                  </IconButton>
                  <IconButton size="small" sx={{ width: 26, height: 26, bgcolor: '#FEF3C7', '&:hover': { bgcolor: '#FDE68A' } }}>
                    <PrintIcon sx={{ fontSize: 13, color: '#92400E' }} />
                  </IconButton>
                </Stack>
              </Stack>
              <Box
                sx={{
                  bgcolor: 'white',
                  borderRadius: 1.5,
                  p: 1.5,
                  maxHeight: 120,
                  overflow: 'auto',
                  border: '1px solid #FDE68A',
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: '#78350F',
                    fontSize: '0.7rem',
                    lineHeight: 1.6,
                    whiteSpace: 'pre-line',
                  }}
                >
                  {instructionText}
                </Typography>
              </Box>
            </MotionBox>

            {/* Follow-up Actions Checklist */}
            <MotionBox
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.25 }}
              sx={{
                p: 1.5,
                bgcolor: '#EDE9FE',
                borderRadius: 2,
                border: '1.5px solid #C4B5FD',
                mb: 2,
              }}
            >
              <Stack direction="row" alignItems="center" spacing={0.75} sx={{ mb: 1 }}>
                <AssignmentTurnedInIcon sx={{ fontSize: 16, color: '#7C3AED' }} />
                <Typography variant="caption" sx={{ color: '#5B21B6', fontWeight: 700, fontSize: '0.75rem' }}>
                  {locale === 'ko' ? 'Follow-up 액션' : 'Follow-up Actions'}
                </Typography>
                <Chip
                  label={`${checkedActions.length}/${actionItems.length}`}
                  size="small"
                  sx={{
                    height: 18,
                    fontSize: '0.6rem',
                    fontWeight: 700,
                    bgcolor: checkedActions.length === actionItems.length ? '#10B981' : '#7C3AED',
                    color: 'white',
                  }}
                />
              </Stack>
              <Stack spacing={0.5}>
                {actionItems.map((action, i) => {
                  const ActionIcon = action.icon;
                  const isChecked = checkedActions.includes(action.id);
                  return (
                    <MotionBox
                      key={action.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: 0.3 + i * 0.1 }}
                      onClick={() => {
                        setCheckedActions(prev =>
                          prev.includes(action.id)
                            ? prev.filter(id => id !== action.id)
                            : [...prev, action.id]
                        );
                      }}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        p: 0.75,
                        bgcolor: isChecked ? '#D1FAE5' : 'white',
                        borderRadius: 1.5,
                        cursor: 'pointer',
                        border: '1px solid',
                        borderColor: isChecked ? '#6EE7B7' : '#DDD6FE',
                        transition: 'all 0.2s ease',
                        '&:hover': { bgcolor: isChecked ? '#A7F3D0' : '#F5F3FF' },
                      }}
                    >
                      <Checkbox
                        checked={isChecked}
                        size="small"
                        sx={{
                          p: 0,
                          color: '#8B5CF6',
                          '&.Mui-checked': { color: '#10B981' },
                        }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: '0.72rem',
                          fontWeight: isChecked ? 600 : 400,
                          color: isChecked ? '#065F46' : '#4C1D95',
                          textDecoration: isChecked ? 'line-through' : 'none',
                          flex: 1,
                        }}
                      >
                        {action.label}
                      </Typography>
                      {isChecked && (
                        <MotionBox
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 500 }}
                        >
                          <CheckCircleIcon sx={{ fontSize: 14, color: '#10B981' }} />
                        </MotionBox>
                      )}
                    </MotionBox>
                  );
                })}
              </Stack>
            </MotionBox>

            <Button
              variant="contained"
              fullWidth
              endIcon={<SendIcon />}
              onClick={() => setActiveTab('emr')}
              sx={{ py: 1.25, borderRadius: 2, fontSize: '0.85rem' }}
            >
              {locale === 'ko' ? 'EMR로 전송' : 'Send to EMR'}
            </Button>
          </MotionBox>
        );

      case 'emr':
        return (
          <MotionBox
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            sx={{ textAlign: 'center', py: 2 }}
          >
            {!isSent ? (
              <>
                <MotionBox
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    bgcolor: '#EC489915',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                  }}
                >
                  <SendIcon sx={{ fontSize: 36, color: '#EC4899' }} />
                </MotionBox>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'secondary.main', mb: 0.5, fontSize: '0.95rem' }}>
                  EMR 전송 준비 완료
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, fontSize: '0.8rem' }}>
                  클립보드에 복사하여 붙여넣기
                </Typography>
                <MotionBox whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<ContentCopyIcon />}
                    onClick={handleSendToEMR}
                    sx={{
                      px: 4,
                      py: 1.5,
                      borderRadius: 2.5,
                      bgcolor: '#EC4899',
                      fontSize: '0.9rem',
                      '&:hover': { bgcolor: '#DB2777' },
                    }}
                  >
                    클립보드 복사
                  </Button>
                </MotionBox>
              </>
            ) : (
              <MotionBox
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                {/* Confetti */}
                {showConfetti && (
                  <Box sx={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
                    {Array.from({ length: 30 }).map((_, i) => (
                      <MotionBox
                        key={i}
                        initial={{
                          y: -20,
                          x: Math.random() * 300 - 150,
                          rotate: 0,
                          scale: Math.random() * 0.5 + 0.5,
                        }}
                        animate={{
                          y: 400,
                          rotate: Math.random() * 720 - 360,
                        }}
                        transition={{
                          duration: 2 + Math.random(),
                          delay: Math.random() * 0.5,
                        }}
                        sx={{
                          position: 'absolute',
                          width: 8,
                          height: 8,
                          borderRadius: Math.random() > 0.5 ? '50%' : 0,
                          bgcolor: ['#EC4899', '#8B5CF6', '#10B981', '#F59E0B', '#4B9CD3'][Math.floor(Math.random() * 5)],
                          left: '50%',
                        }}
                      />
                    ))}
                  </Box>
                )}

                <MotionBox
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.4 }}
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    bgcolor: '#10B981',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                    boxShadow: '0 0 30px rgba(16, 185, 129, 0.4)',
                  }}
                >
                  <CheckCircleIcon sx={{ fontSize: 40, color: 'white' }} />
                </MotionBox>
                <Stack direction="row" alignItems="center" justifyContent="center" spacing={0.5} sx={{ mb: 0.5 }}>
                  <CelebrationIcon sx={{ color: '#F59E0B', fontSize: 20 }} />
                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#10B981', fontSize: '1.1rem' }}>
                    복사 완료!
                  </Typography>
                  <CelebrationIcon sx={{ color: '#F59E0B', fontSize: 20 }} />
                </Stack>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, fontSize: '0.8rem' }}>
                  EMR에 붙여넣기 하세요
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<ReplayIcon />}
                  onClick={resetDemo}
                  sx={{ borderRadius: 2, px: 3, fontSize: '0.85rem' }}
                >
                  다시 체험하기
                </Button>
              </MotionBox>
            )}
          </MotionBox>
        );

      default:
        return null;
    }
  };

  return (
    <Box
      id="demo"
      sx={{
        py: { xs: 10, md: 14 },
        background: 'linear-gradient(180deg, #F8FAFC 0%, #EEF2FF 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.4,
          backgroundImage: `radial-gradient(circle at 1px 1px, #4B9CD3 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      <Container maxWidth="xl" sx={{ position: 'relative' }}>
        {/* Section Header */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          sx={{ textAlign: 'center', mb: { xs: 5, md: 6 } }}
        >
          <Chip
            label="INTERACTIVE DEMO"
            sx={{
              mb: 2,
              bgcolor: 'primary.main',
              color: 'white',
              fontWeight: 700,
              fontSize: '0.7rem',
              letterSpacing: 1,
            }}
          />
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '1.75rem', md: '2.5rem' },
              fontWeight: 800,
              color: 'secondary.main',
              mb: 1.5,
            }}
          >
            {demo.title || '직접 체험해보세요'}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              fontSize: { xs: '0.95rem', md: '1.1rem' },
              maxWidth: 500,
              mx: 'auto',
            }}
          >
            {demo.subtitle || '실제 워크플로우를 경험해보세요'}
          </Typography>
        </MotionBox>

        {/* Demo Device - Larger for better visibility */}
        <MotionBox
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          sx={{ maxWidth: { xs: 380, sm: 440, md: 500 }, mx: 'auto' }}
        >
          {/* Device Frame */}
          <Box
            sx={{
              position: 'relative',
              bgcolor: '#1F2937',
              borderRadius: { xs: '36px', md: '44px' },
              p: { xs: '14px', md: '18px' },
              boxShadow: '0 50px 100px -20px rgba(0, 0, 0, 0.25), 0 30px 60px -30px rgba(0, 0, 0, 0.3)',
            }}
          >
            {/* Device Notch */}
            <Box
              sx={{
                position: 'absolute',
                top: { xs: 12, md: 16 },
                left: '50%',
                transform: 'translateX(-50%)',
                width: 100,
                height: 24,
                bgcolor: '#1F2937',
                borderRadius: '0 0 16px 16px',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
              }}
            >
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#374151' }} />
            </Box>

            {/* Screen */}
            <Paper
              elevation={0}
              sx={{
                borderRadius: { xs: '24px', md: '28px' },
                overflow: 'hidden',
                bgcolor: 'white',
              }}
            >
              {/* Status Bar */}
              <Box
                sx={{
                  px: 2,
                  py: 0.75,
                  bgcolor: 'grey.100',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.7rem' }}>
                  9:41
                </Typography>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <SignalCellularAltIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                  <WifiIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                  <BatteryFullIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                </Stack>
              </Box>

              {/* App Header */}
              <Box
                sx={{
                  px: 2,
                  py: 1.5,
                  borderBottom: '1px solid',
                  borderColor: 'grey.100',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Box
                    sx={{
                      width: 28,
                      height: 28,
                      borderRadius: 1.5,
                      bgcolor: '#4B9CD3',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography sx={{ color: 'white', fontWeight: 800, fontSize: '0.75rem', lineHeight: 1 }}>쏙</Typography>
                  </Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: '0.9rem' }}>
                    chartsok
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={0.5}>
                  <IconButton
                    size="small"
                    onClick={toggleAutoPlay}
                    sx={{
                      bgcolor: isAutoPlaying ? '#EF4444' : 'primary.main',
                      color: 'white',
                      width: 28,
                      height: 28,
                      '&:hover': { bgcolor: isAutoPlaying ? '#DC2626' : 'primary.dark' },
                    }}
                  >
                    {isAutoPlaying ? <PauseIcon sx={{ fontSize: 16 }} /> : <PlayArrowIcon sx={{ fontSize: 16 }} />}
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={resetDemo}
                    sx={{
                      bgcolor: 'grey.200',
                      width: 28,
                      height: 28,
                      '&:hover': { bgcolor: 'grey.300' },
                    }}
                  >
                    <ReplayIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </Stack>
              </Box>

              {/* Progress Steps */}
              <Box sx={{ px: { xs: 2, md: 3 }, py: { xs: 1.5, md: 2 }, borderBottom: '1px solid', borderColor: 'grey.100' }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ position: 'relative' }}>
                  {/* Progress Line */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: { xs: 16, md: 18 },
                      left: { xs: 28, md: 32 },
                      right: { xs: 28, md: 32 },
                      height: 3,
                      bgcolor: 'grey.200',
                      borderRadius: 2,
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: { xs: 16, md: 18 },
                      left: { xs: 28, md: 32 },
                      height: 3,
                      bgcolor: 'primary.main',
                      width: `calc(${(tabs.findIndex(t => t.id === activeTab) / (tabs.length - 1)) * 100}% - 56px)`,
                      transition: 'width 0.4s ease',
                      borderRadius: 2,
                    }}
                  />

                  {tabs.map((tab, index) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    const isPast = tabs.findIndex(t => t.id === activeTab) > index;

                    return (
                      <Box
                        key={tab.id}
                        onClick={() => !isAutoPlaying && setActiveTab(tab.id)}
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          cursor: isAutoPlaying ? 'default' : 'pointer',
                          zIndex: 2,
                        }}
                      >
                        <MotionBox
                          animate={isActive ? { scale: [1, 1.15, 1] } : {}}
                          transition={{ duration: 0.3 }}
                          sx={{
                            width: { xs: 32, md: 36 },
                            height: { xs: 32, md: 36 },
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: isActive || isPast ? tab.color : 'white',
                            border: '2.5px solid',
                            borderColor: isActive || isPast ? tab.color : 'grey.300',
                            transition: 'all 0.2s ease',
                            boxShadow: isActive ? `0 4px 12px ${tab.color}40` : 'none',
                          }}
                        >
                          <Icon sx={{ fontSize: { xs: 16, md: 18 }, color: isActive || isPast ? 'white' : 'grey.400' }} />
                        </MotionBox>
                        <Typography
                          variant="caption"
                          sx={{
                            mt: 0.75,
                            fontWeight: isActive ? 700 : 500,
                            fontSize: { xs: '0.65rem', md: '0.75rem' },
                            color: isActive ? tab.color : 'text.secondary',
                          }}
                        >
                          {tab.label}
                        </Typography>
                      </Box>
                    );
                  })}
                </Stack>
              </Box>

              {/* Content Area */}
              <Box sx={{ p: { xs: 2, md: 2.5 }, minHeight: { xs: 400, md: 440 } }}>
                <AnimatePresence mode="wait">
                  {renderContent()}
                </AnimatePresence>
              </Box>
            </Paper>
          </Box>

          {/* Auto-play indicator */}
          {isAutoPlaying && (
            <MotionBox
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              sx={{ textAlign: 'center', mt: 3 }}
            >
              <Chip
                icon={<PlayArrowIcon sx={{ fontSize: 14 }} />}
                label="자동 재생 중..."
                size="small"
                sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 600 }}
              />
            </MotionBox>
          )}
        </MotionBox>

        {/* Call to Action */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          sx={{ textAlign: 'center', mt: 6 }}
        >
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2.5, fontSize: '1rem' }}>
            {isLoggedIn
              ? (locale === 'ko' ? '대시보드에서 실제 서비스를 이용해보세요' : 'Try the full service on your dashboard')
              : (locale === 'ko' ? '우리 병원에 어떻게 적용되는지 확인해보세요' : 'See how it works for your clinic')}
          </Typography>
          {isLoggedIn ? (
            <Button
              variant="contained"
              size="large"
              startIcon={<DashboardIcon />}
              onClick={() => router.push('/dashboard')}
              sx={{
                borderRadius: 3,
                px: 5,
                py: 1.75,
                fontSize: '1.05rem',
                fontWeight: 600,
              }}
            >
              {locale === 'ko' ? '대시보드 가기' : 'Go to Dashboard'}
            </Button>
          ) : (
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" alignItems="center">
              <Button
                variant="contained"
                size="large"
                onClick={() => router.push('/contact')}
                sx={{
                  borderRadius: 3,
                  px: 5,
                  py: 1.75,
                  fontSize: '1.05rem',
                  fontWeight: 600,
                }}
              >
                {locale === 'ko' ? '데모 요청하기' : 'Request Demo'}
              </Button>
              <Button
                variant="outlined"
                size="large"
                href="#features"
                sx={{
                  borderRadius: 3,
                  px: 4,
                  py: 1.5,
                  fontSize: '0.95rem',
                }}
              >
                {locale === 'ko' ? '기능 자세히 보기' : 'View Features'}
              </Button>
            </Stack>
          )}
        </MotionBox>
      </Container>
    </Box>
  );
}
