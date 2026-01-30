'use client';

import { useState } from 'react';
import { Box, Container, Typography, Paper, Stack, Button, TextField, Chip, Grid, List, ListItem, ListItemIcon, ListItemText, Avatar } from '@mui/material';
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
import { useI18n } from '@/lib/i18n';

const MotionBox = motion.create(Box);
const MotionPaper = motion.create(Paper);

const tabs = [
  { id: 'patient', icon: PersonSearchIcon, color: '#4B9CD3' },
  { id: 'vitals', icon: MonitorHeartIcon, color: '#10B981' },
  { id: 'recording', icon: MicIcon, color: '#F59E0B' },
  { id: 'soap', icon: AutoAwesomeIcon, color: '#8B5CF6' },
  { id: 'emr', icon: SendIcon, color: '#EC4899' },
];

const samplePatients = [
  { id: 1, name: '김영희', age: 45, gender: 'F', lastVisit: '2025-01-20' },
  { id: 2, name: '박철수', age: 62, gender: 'M', lastVisit: '2025-01-18' },
  { id: 3, name: '이지연', age: 35, gender: 'F', lastVisit: '2025-01-15' },
];

export default function Demo() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState('patient');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const demo = t('demo');

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
            <Box
              sx={{
                display: 'flex',
                gap: 1.5,
                mb: 3,
              }}
            >
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
              {samplePatients.map((patient) => (
                <Paper
                  key={patient.id}
                  elevation={0}
                  onClick={() => {
                    setSelectedPatient(patient);
                    setTimeout(() => setActiveTab('vitals'), 500);
                  }}
                  sx={{
                    p: 2,
                    cursor: 'pointer',
                    border: '2px solid',
                    borderColor: selectedPatient?.id === patient.id ? 'primary.main' : 'grey.100',
                    borderRadius: 2,
                    bgcolor: selectedPatient?.id === patient.id ? 'primary.main' + '08' : 'white',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      borderColor: 'primary.main',
                      bgcolor: 'primary.main' + '05',
                    },
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>
                      <PersonIcon sx={{ fontSize: 20 }} />
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {patient.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {patient.age}세 / {patient.gender} / {patient.lastVisit}
                      </Typography>
                    </Box>
                    {selectedPatient?.id === patient.id && (
                      <CheckCircleIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                    )}
                  </Stack>
                </Paper>
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
            <Grid container spacing={2}>
              {[
                { label: demo.vitalsInput?.bp, value: '120/80', unit: 'mmHg' },
                { label: demo.vitalsInput?.hr, value: '72', unit: 'bpm' },
                { label: demo.vitalsInput?.bt, value: '36.5', unit: '°C' },
                { label: demo.vitalsInput?.spo2, value: '98', unit: '%' },
              ].map((vital, i) => (
                <Grid size={{ xs: 6 }} key={i}>
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: 'grey.50',
                      borderRadius: 2,
                      textAlign: 'center',
                    }}
                  >
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                      {vital.label}
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main', my: 0.5 }}>
                      {vital.value}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                      {vital.unit}
                    </Typography>
                  </Box>
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
                defaultValue="3일 전부터 두통"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: 'grey.50',
                    borderRadius: 2,
                  },
                }}
              />
            </Box>

            <Button
              variant="contained"
              fullWidth
              onClick={() => setActiveTab('recording')}
              sx={{ mt: 3, py: 1.5, borderRadius: 2 }}
            >
              진료 시작
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
            sx={{ textAlign: 'center' }}
          >
            {/* Recording Status */}
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={1.5} sx={{ mb: 3 }}>
              {isRecording && (
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    bgcolor: '#EF4444',
                    animation: 'pulse 1s infinite',
                  }}
                />
              )}
              <Chip
                label={isRecording ? `${demo.recording?.status} · ${demo.recording?.time}` : '준비됨'}
                sx={{
                  bgcolor: isRecording ? '#FEE2E2' : 'grey.100',
                  color: isRecording ? '#DC2626' : 'text.secondary',
                  fontWeight: 600,
                }}
              />
            </Stack>

            {/* Waveform */}
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 0.3, height: 60, mb: 3 }}>
              {Array.from({ length: 30 }).map((_, i) => (
                <MotionBox
                  key={i}
                  animate={isRecording ? {
                    height: [8, 15 + (i % 7) * 7, 8],
                  } : { height: 8 }}
                  transition={{
                    duration: 0.4 + (i % 4) * 0.05,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  sx={{
                    width: 3,
                    bgcolor: isRecording ? 'primary.main' : 'grey.300',
                    borderRadius: 2,
                  }}
                />
              ))}
            </Box>

            {/* Transcript Preview */}
            {isRecording && (
              <Box
                sx={{
                  bgcolor: 'grey.50',
                  borderRadius: 2,
                  p: 2.5,
                  textAlign: 'left',
                  mb: 3,
                  maxHeight: 150,
                  overflow: 'auto',
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.primary',
                    whiteSpace: 'pre-line',
                    lineHeight: 1.8,
                    fontSize: '0.85rem',
                  }}
                >
                  {demo.recording?.transcript}
                </Typography>
              </Box>
            )}

            {/* Record Button */}
            <Button
              variant="contained"
              size="large"
              startIcon={isRecording ? <AutoAwesomeIcon /> : <MicIcon />}
              onClick={() => {
                if (isRecording) {
                  setActiveTab('soap');
                } else {
                  setIsRecording(true);
                }
              }}
              sx={{
                px: 5,
                py: 1.75,
                borderRadius: 3,
                bgcolor: isRecording ? '#8B5CF6' : '#EF4444',
                '&:hover': {
                  bgcolor: isRecording ? '#7C3AED' : '#DC2626',
                },
              }}
            >
              {isRecording ? 'AI 분석 시작' : '녹음 시작'}
            </Button>
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
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                {demo.soapPreview?.title}
              </Typography>
              <Chip
                icon={<CheckCircleIcon sx={{ fontSize: 14 }} />}
                label="AI 생성 완료"
                size="small"
                sx={{ bgcolor: '#D1FAE5', color: '#059669' }}
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
                    borderLeft: '3px solid',
                    borderLeftColor: item.color,
                  }}
                >
                  <Box
                    sx={{
                      width: 28,
                      height: 28,
                      borderRadius: 1.5,
                      bgcolor: item.color,
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      flexShrink: 0,
                    }}
                  >
                    {item.label}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="caption" sx={{ color: item.color, fontWeight: 600 }}>
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.primary', fontSize: '0.85rem', lineHeight: 1.6, whiteSpace: 'pre-line' }}
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
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    bgcolor: '#EC4899' + '15',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 3,
                  }}
                >
                  <SendIcon sx={{ fontSize: 36, color: '#EC4899' }} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'secondary.main', mb: 1 }}>
                  {demo.emrSync?.status}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4 }}>
                  비트컴퓨터 EMR에 차트를 전송합니다
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<SendIcon />}
                  onClick={() => setIsSent(true)}
                  sx={{
                    px: 5,
                    py: 1.5,
                    borderRadius: 2,
                    bgcolor: '#EC4899',
                    '&:hover': { bgcolor: '#DB2777' },
                  }}
                >
                  {demo.emrSync?.button}
                </Button>
              </>
            ) : (
              <MotionBox
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    bgcolor: '#10B981',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 3,
                  }}
                >
                  <CheckCircleIcon sx={{ fontSize: 40, color: 'white' }} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#10B981', mb: 1 }}>
                  {demo.emrSync?.success}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4 }}>
                  차트가 EMR에 성공적으로 저장되었습니다
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setActiveTab('patient');
                    setSelectedPatient(null);
                    setIsRecording(false);
                    setIsSent(false);
                  }}
                  sx={{ borderRadius: 2 }}
                >
                  새 진료 시작
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
            LIVE DEMO
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
            }}
          >
            {/* Tab Navigation - Stepper Style */}
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
                    height: 2,
                    bgcolor: 'grey.200',
                    zIndex: 0,
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: { xs: 18, md: 22 },
                    left: '10%',
                    height: 2,
                    bgcolor: 'primary.main',
                    zIndex: 1,
                    width: `${(tabs.findIndex(t => t.id === activeTab) / (tabs.length - 1)) * 80}%`,
                    transition: 'width 0.3s ease',
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
                      <Box
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
                          boxShadow: isActive ? `0 0 0 4px ${tab.color}20` : 'none',
                          '&:hover': {
                            transform: 'scale(1.1)',
                          },
                        }}
                      >
                        <Icon
                          sx={{
                            fontSize: { xs: 18, md: 22 },
                            color: isActive || isPast ? 'white' : 'grey.400',
                          }}
                        />
                      </Box>
                      <Typography
                        variant="caption"
                        sx={{
                          mt: 1,
                          fontWeight: isActive ? 700 : 500,
                          fontSize: { xs: '0.65rem', md: '0.75rem' },
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
            <Box sx={{ p: { xs: 2.5, sm: 3 }, minHeight: 400 }}>
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
