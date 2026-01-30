'use client';

import { useState, useEffect } from 'react';
import { Box, Container, Typography, Paper, Stack, Button, TextField, Chip, Grid, Avatar, LinearProgress } from '@mui/material';
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
import { useI18n } from '@/lib/i18n';

const MotionBox = motion.create(Box);
const MotionPaper = motion.create(Paper);

const tabs = [
  { id: 'patient', icon: PersonSearchIcon, color: '#4B9CD3' },
  { id: 'vitals', icon: MonitorHeartIcon, color: '#10B981' },
  { id: 'recording', icon: MicIcon, color: '#EF4444' },
  { id: 'soap', icon: AutoAwesomeIcon, color: '#8B5CF6' },
  { id: 'emr', icon: SendIcon, color: '#EC4899' },
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

  const demo = t('demo');

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

  // Typing animation for transcript
  useEffect(() => {
    if (!isRecording || currentLineIndex >= transcriptLines.length) return;

    const currentLine = transcriptLines[currentLineIndex];
    const fullText = `${currentLine.speaker}: ${currentLine.text}`;

    if (displayedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length + 1));
      }, 30);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
        setDisplayedText('');
      }, 800);
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
            <Box sx={{ display: 'flex', gap: 1.5, mb: 3 }}>
              <TextField
                placeholder={demo.patientSelect?.searchPlaceholder}
                size="small"
                fullWidth
                InputProps={{
                  startAdornment: <SearchIcon sx={{ color: 'text.disabled', mr: 1, fontSize: 20 }} />,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: 'grey.50',
                    borderRadius: 2,
                  },
                }}
              />
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                sx={{ whiteSpace: 'nowrap', borderRadius: 2, px: 2 }}
              >
                {demo.patientSelect?.newPatient}
              </Button>
            </Box>

            {/* Recent Patients */}
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, mb: 1.5, display: 'block' }}>
              {demo.patientSelect?.recentPatients}
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
                      setTimeout(() => setActiveTab('vitals'), 400);
                    }}
                    sx={{
                      p: 2,
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
                      <Avatar sx={{ bgcolor: 'primary.main', width: 44, height: 44 }}>
                        <PersonIcon sx={{ fontSize: 22 }} />
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                            {patient.name}
                          </Typography>
                          <Chip
                            label={patient.complaint}
                            size="small"
                            sx={{
                              height: 20,
                              fontSize: '0.65rem',
                              bgcolor: 'warning.50',
                              color: 'warning.main',
                            }}
                          />
                        </Stack>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          {patient.age}세 · {patient.gender === 'M' ? '남' : '여'} · 최근 방문: {patient.lastVisit}
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
            {/* Selected Patient Info */}
            {selectedPatient && (
              <Box sx={{ mb: 3, p: 2, bgcolor: 'primary.50', borderRadius: 2, border: '1px solid', borderColor: 'primary.100' }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    <PersonIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{selectedPatient.name}</Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {selectedPatient.age}세 · {selectedPatient.gender === 'M' ? '남' : '여'}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            )}

            <Grid container spacing={2}>
              {[
                { label: demo.vitalsInput?.bp, value: '120/80', unit: 'mmHg', color: '#EF4444' },
                { label: demo.vitalsInput?.hr, value: '72', unit: 'bpm', color: '#F59E0B' },
                { label: demo.vitalsInput?.bt, value: '36.5', unit: '°C', color: '#10B981' },
                { label: demo.vitalsInput?.spo2, value: '98', unit: '%', color: '#4B9CD3' },
              ].map((vital, i) => (
                <Grid size={{ xs: 6 }} key={i}>
                  <MotionBox
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    sx={{
                      p: 2,
                      bgcolor: 'grey.50',
                      borderRadius: 2,
                      textAlign: 'center',
                      border: '1px solid',
                      borderColor: 'grey.100',
                    }}
                  >
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                      {vital.label}
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: vital.color, my: 0.5 }}>
                      {vital.value}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                      {vital.unit}
                    </Typography>
                  </MotionBox>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ mt: 3 }}>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, mb: 1, display: 'block' }}>
                {demo.vitalsInput?.chiefComplaint}
              </Typography>
              <TextField
                multiline
                rows={2}
                fullWidth
                defaultValue={selectedPatient?.complaint || '3일 전부터 두통'}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: 'grey.50',
                    borderRadius: 2,
                  },
                }}
              />
            </Box>

            {/* Template Selection */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, mb: 1.5, display: 'block' }}>
                차트 템플릿
              </Typography>
              <Stack direction="row" spacing={1}>
                {[
                  { id: 'soap', name: 'SOAP 노트', icon: DescriptionIcon },
                  { id: 'custom', name: '나만의 템플릿', icon: StarIcon },
                ].map((template) => (
                  <MotionBox key={template.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Paper
                      elevation={0}
                      onClick={() => setSelectedTemplate(template.id)}
                      sx={{
                        p: 1.5,
                        cursor: 'pointer',
                        border: '2px solid',
                        borderColor: selectedTemplate === template.id ? 'primary.main' : 'grey.200',
                        borderRadius: 2,
                        bgcolor: selectedTemplate === template.id ? 'primary.50' : 'white',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                      }}
                    >
                      <template.icon sx={{ fontSize: 18, color: selectedTemplate === template.id ? 'primary.main' : 'grey.500' }} />
                      <Typography variant="caption" sx={{ fontWeight: 600 }}>{template.name}</Typography>
                    </Paper>
                  </MotionBox>
                ))}
              </Stack>
            </Box>

            <Button
              variant="contained"
              fullWidth
              onClick={() => setActiveTab('recording')}
              sx={{ mt: 3, py: 1.5, borderRadius: 2 }}
            >
              진료 녹음 시작
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
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} sx={{ mb: 3 }}>
              {isRecording && (
                <MotionBox
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    bgcolor: '#EF4444',
                  }}
                />
              )}
              <Chip
                label={isRecording ? `녹음 중 · ${formatTime(recordingTime)}` : '준비됨'}
                sx={{
                  bgcolor: isRecording ? '#FEE2E2' : 'grey.100',
                  color: isRecording ? '#DC2626' : 'text.secondary',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  px: 1,
                }}
              />
            </Stack>

            {/* Waveform */}
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 0.5, height: 80, mb: 3 }}>
              {Array.from({ length: 40 }).map((_, i) => (
                <MotionBox
                  key={i}
                  animate={isRecording ? {
                    height: [10, 20 + Math.sin(i * 0.5) * 30 + Math.random() * 20, 10],
                  } : { height: 10 }}
                  transition={{
                    duration: 0.3 + Math.random() * 0.2,
                    repeat: isRecording ? Infinity : 0,
                    ease: 'easeInOut',
                  }}
                  sx={{
                    width: 4,
                    bgcolor: isRecording ? '#EF4444' : 'grey.300',
                    borderRadius: 2,
                    opacity: isRecording ? 0.8 : 0.4,
                  }}
                />
              ))}
            </Box>

            {/* Live Transcript */}
            <Box
              sx={{
                bgcolor: 'grey.900',
                borderRadius: 2,
                p: 2.5,
                minHeight: 180,
                maxHeight: 180,
                overflow: 'auto',
                mb: 3,
              }}
            >
              <Typography variant="caption" sx={{ color: 'grey.500', display: 'block', mb: 1.5 }}>
                실시간 자막
              </Typography>
              <Stack spacing={1.5}>
                {transcriptLines.slice(0, currentLineIndex).map((line, idx) => (
                  <MotionBox
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Typography variant="body2" sx={{ color: line.speaker === '의사' ? '#4B9CD3' : '#10B981' }}>
                      <strong>{line.speaker}:</strong>{' '}
                      <span style={{ color: '#E5E7EB' }}>{line.text}</span>
                    </Typography>
                  </MotionBox>
                ))}
                {isRecording && displayedText && (
                  <Typography variant="body2" sx={{ color: transcriptLines[currentLineIndex]?.speaker === '의사' ? '#4B9CD3' : '#10B981' }}>
                    {displayedText}
                    <MotionBox
                      component="span"
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      sx={{ ml: 0.5, color: 'white' }}
                    >
                      |
                    </MotionBox>
                  </Typography>
                )}
              </Stack>
            </Box>

            {/* Processing State */}
            {isProcessing ? (
              <MotionBox
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                sx={{ textAlign: 'center' }}
              >
                <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} sx={{ mb: 2 }}>
                  <MotionBox
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  >
                    <AutoAwesomeIcon sx={{ color: '#8B5CF6' }} />
                  </MotionBox>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#8B5CF6' }}>
                    AI가 대화를 분석하고 있습니다...
                  </Typography>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={processingProgress}
                  sx={{
                    borderRadius: 2,
                    height: 8,
                    bgcolor: '#8B5CF620',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: '#8B5CF6',
                    },
                  }}
                />
                <Typography variant="caption" sx={{ color: 'text.secondary', mt: 1, display: 'block' }}>
                  화자 분석 중... {processingProgress}%
                </Typography>
              </MotionBox>
            ) : (
              <Stack direction="row" spacing={2} justifyContent="center">
                {!isRecording ? (
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<MicIcon />}
                    onClick={handleStartRecording}
                    sx={{
                      px: 5,
                      py: 1.75,
                      borderRadius: 3,
                      bgcolor: '#EF4444',
                      '&:hover': { bgcolor: '#DC2626' },
                    }}
                  >
                    녹음 시작
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<StopIcon />}
                    onClick={handleStopRecording}
                    sx={{
                      px: 5,
                      py: 1.75,
                      borderRadius: 3,
                      bgcolor: '#8B5CF6',
                      '&:hover': { bgcolor: '#7C3AED' },
                    }}
                  >
                    녹음 종료 & AI 분석
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
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                {demo.soapPreview?.title}
              </Typography>
              <Chip
                icon={<AutoAwesomeIcon sx={{ fontSize: 14 }} />}
                label="AI 생성 완료"
                size="small"
                sx={{ bgcolor: '#EDE9FE', color: '#7C3AED' }}
              />
            </Stack>

            <Stack spacing={2}>
              {[
                { label: 'S', title: 'Subjective', content: demo.soapPreview?.s, color: '#4B9CD3' },
                { label: 'O', title: 'Objective', content: demo.soapPreview?.o, color: '#10B981' },
                { label: 'A', title: 'Assessment', content: demo.soapPreview?.a, color: '#F59E0B' },
                { label: 'P', title: 'Plan', content: demo.soapPreview?.p, color: '#8B5CF6' },
              ].map((item, index) => (
                <MotionBox
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.15 }}
                  sx={{
                    display: 'flex',
                    gap: 1.5,
                    p: 2,
                    bgcolor: 'grey.50',
                    borderRadius: 2,
                    borderLeft: '4px solid',
                    borderLeftColor: item.color,
                  }}
                >
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: 2,
                      bgcolor: item.color,
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '0.85rem',
                      flexShrink: 0,
                    }}
                  >
                    {item.label}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="caption" sx={{ color: item.color, fontWeight: 700 }}>
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.primary', fontSize: '0.85rem', lineHeight: 1.7, whiteSpace: 'pre-line', mt: 0.5 }}
                    >
                      {item.content}
                    </Typography>
                  </Box>
                </MotionBox>
              ))}
            </Stack>

            <Button
              variant="contained"
              fullWidth
              endIcon={<SendIcon />}
              onClick={() => setActiveTab('emr')}
              sx={{ mt: 3, py: 1.5, borderRadius: 2 }}
            >
              확인 후 EMR 전송
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
            sx={{ textAlign: 'center', py: 4 }}
          >
            {!isSent ? (
              <>
                <MotionBox
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  sx={{
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    bgcolor: '#EC489915',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 3,
                  }}
                >
                  <SendIcon sx={{ fontSize: 44, color: '#EC4899' }} />
                </MotionBox>
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'secondary.main', mb: 1 }}>
                  {demo.emrSync?.status}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4 }}>
                  차트를 EMR에 전송합니다
                </Typography>
                <MotionBox whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="contained"
                    size="large"
                    endIcon={<SendIcon />}
                    onClick={handleSendToEMR}
                    sx={{
                      px: 6,
                      py: 1.75,
                      borderRadius: 3,
                      bgcolor: '#EC4899',
                      '&:hover': { bgcolor: '#DB2777' },
                    }}
                  >
                    {demo.emrSync?.button}
                  </Button>
                </MotionBox>
              </>
            ) : (
              <MotionBox
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                {/* Confetti Effect */}
                {showConfetti && (
                  <Box sx={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
                    {Array.from({ length: 20 }).map((_, i) => (
                      <MotionBox
                        key={i}
                        initial={{
                          y: -20,
                          x: Math.random() * 400 - 200,
                          rotate: 0,
                        }}
                        animate={{
                          y: 500,
                          rotate: Math.random() * 360,
                        }}
                        transition={{
                          duration: 2 + Math.random(),
                          delay: Math.random() * 0.5,
                        }}
                        sx={{
                          position: 'absolute',
                          width: 10,
                          height: 10,
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
                  transition={{ duration: 0.5 }}
                  sx={{
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    bgcolor: '#10B981',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 3,
                    boxShadow: '0 0 40px rgba(16, 185, 129, 0.4)',
                  }}
                >
                  <CheckCircleIcon sx={{ fontSize: 50, color: 'white' }} />
                </MotionBox>
                <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} sx={{ mb: 1 }}>
                  <CelebrationIcon sx={{ color: '#F59E0B' }} />
                  <Typography variant="h5" sx={{ fontWeight: 800, color: '#10B981' }}>
                    {demo.emrSync?.success}
                  </Typography>
                  <CelebrationIcon sx={{ color: '#F59E0B' }} />
                </Stack>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4 }}>
                  차트가 EMR에 성공적으로 저장되었습니다!
                </Typography>
                <Button
                  variant="outlined"
                  onClick={resetDemo}
                  sx={{ borderRadius: 2, px: 4 }}
                >
                  새 진료 시작하기
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
        bgcolor: 'white',
      }}
    >
      <Container maxWidth="xl">
        {/* Section Header */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}
        >
          <Typography
            variant="overline"
            sx={{
              color: 'primary.main',
              mb: 1.5,
              display: 'block',
              letterSpacing: 2,
              fontWeight: 600,
            }}
          >
            INTERACTIVE DEMO
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', md: '2.75rem' },
              fontWeight: 700,
              color: 'secondary.main',
              mb: 2,
            }}
          >
            {demo.title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              fontSize: { xs: '1rem', md: '1.125rem' },
              maxWidth: 500,
              mx: 'auto',
            }}
          >
            {demo.subtitle}
          </Typography>
        </MotionBox>

        {/* Demo Card */}
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          sx={{ maxWidth: 'md', mx: 'auto' }}
        >
          <MotionPaper
            elevation={0}
            sx={{
              borderRadius: 4,
              overflow: 'hidden',
              border: '1px solid',
              borderColor: 'grey.200',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)',
              position: 'relative',
            }}
          >
            {/* Tab Navigation */}
            <Box
              sx={{
                px: { xs: 2, md: 4 },
                py: { xs: 2, md: 2.5 },
                bgcolor: 'grey.50',
                borderBottom: '1px solid',
                borderColor: 'grey.200',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  position: 'relative',
                }}
              >
                {/* Progress Line */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: { xs: 18, md: 22 },
                    left: '10%',
                    right: '10%',
                    height: 3,
                    bgcolor: 'grey.200',
                    zIndex: 0,
                    borderRadius: 2,
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: { xs: 18, md: 22 },
                    left: '10%',
                    height: 3,
                    bgcolor: 'primary.main',
                    zIndex: 1,
                    width: `${(tabs.findIndex(t => t.id === activeTab) / (tabs.length - 1)) * 80}%`,
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
                      onClick={() => setActiveTab(tab.id)}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        cursor: 'pointer',
                        zIndex: 2,
                        flex: 1,
                      }}
                    >
                      <MotionBox
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        sx={{
                          width: { xs: 36, md: 44 },
                          height: { xs: 36, md: 44 },
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bgcolor: isActive ? tab.color : isPast ? tab.color : 'white',
                          border: '3px solid',
                          borderColor: isActive || isPast ? tab.color : 'grey.300',
                          transition: 'all 0.2s ease',
                          boxShadow: isActive ? `0 0 0 4px ${tab.color}25` : 'none',
                        }}
                      >
                        <Icon
                          sx={{
                            fontSize: { xs: 18, md: 22 },
                            color: isActive || isPast ? 'white' : 'grey.400',
                          }}
                        />
                      </MotionBox>
                      <Typography
                        variant="caption"
                        sx={{
                          mt: 1,
                          fontWeight: isActive ? 700 : 500,
                          fontSize: { xs: '0.6rem', md: '0.75rem' },
                          color: isActive ? tab.color : isPast ? tab.color : 'text.secondary',
                          textAlign: 'center',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {demo.tabs?.[tab.id]}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            </Box>

            {/* Content Area */}
            <Box sx={{ p: { xs: 2.5, sm: 3 }, minHeight: 420 }}>
              <AnimatePresence mode="wait">
                {renderContent()}
              </AnimatePresence>
            </Box>
          </MotionPaper>
        </MotionBox>
      </Container>
    </Box>
  );
}
