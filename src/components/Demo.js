'use client';

import { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, Paper, Chip, LinearProgress } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useI18n } from '@/lib/i18n';

const MotionBox = motion.create(Box);
const MotionPaper = motion.create(Paper);

export default function Demo() {
  const { t } = useI18n();
  const [stage, setStage] = useState('idle'); // idle, recording, processing, complete
  const [progress, setProgress] = useState(0);
  const [showText, setShowText] = useState(false);

  const startDemo = () => {
    setStage('recording');
    setProgress(0);
    setShowText(false);

    // Simulate recording
    const recordingTimer = setTimeout(() => {
      setStage('processing');
      setProgress(0);
    }, 3000);

    return () => clearTimeout(recordingTimer);
  };

  useEffect(() => {
    if (stage === 'recording') {
      const interval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 2, 100));
      }, 60);
      return () => clearInterval(interval);
    }

    if (stage === 'processing') {
      setShowText(true);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setStage('complete');
            return 100;
          }
          return prev + 3;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [stage]);

  const resetDemo = () => {
    setStage('idle');
    setProgress(0);
    setShowText(false);
  };

  const sampleSOAP = t('demo.sampleSOAP');

  return (
    <Box
      id="demo"
      sx={{
        py: { xs: 10, md: 14 },
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)',
      }}
    >
      <Container maxWidth="lg">
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', md: '2.75rem' },
              fontWeight: 700,
              color: 'secondary.main',
              mb: 2,
            }}
          >
            {t('demo.title')}
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
            {t('demo.subtitle')}
          </Typography>
        </MotionBox>

        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          sx={{
            maxWidth: 900,
            mx: 'auto',
          }}
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
            {/* Header */}
            <Box
              sx={{
                p: 2,
                bgcolor: 'grey.50',
                borderBottom: '1px solid',
                borderColor: 'grey.200',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#EF4444' }} />
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#F59E0B' }} />
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#10B981' }} />
                </Box>
                <Typography variant="body2" sx={{ color: 'text.secondary', ml: 2 }}>
                  ChartSok Demo
                </Typography>
              </Box>
              <AnimatePresence mode="wait">
                {stage === 'recording' && (
                  <MotionBox
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <Chip
                      icon={<Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#EF4444', animation: 'pulse 1s infinite' }} />}
                      label={t('demo.recording')}
                      size="small"
                      sx={{ bgcolor: '#FEE2E2', color: '#DC2626' }}
                    />
                  </MotionBox>
                )}
                {stage === 'processing' && (
                  <MotionBox
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <Chip
                      icon={<AutoAwesomeIcon sx={{ fontSize: 16 }} />}
                      label={t('demo.processing')}
                      size="small"
                      sx={{ bgcolor: '#DBEAFE', color: '#2563EB' }}
                    />
                  </MotionBox>
                )}
                {stage === 'complete' && (
                  <MotionBox
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <Chip
                      icon={<CheckCircleIcon sx={{ fontSize: 16 }} />}
                      label={t('demo.complete')}
                      size="small"
                      sx={{ bgcolor: '#D1FAE5', color: '#059669' }}
                    />
                  </MotionBox>
                )}
              </AnimatePresence>
            </Box>

            {/* Content */}
            <Box sx={{ p: { xs: 3, md: 4 }, minHeight: 400 }}>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
                {/* Left: Transcript */}
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 2, fontWeight: 600 }}>
                    Transcript
                  </Typography>
                  <Box
                    sx={{
                      bgcolor: 'grey.50',
                      borderRadius: 2,
                      p: 2.5,
                      minHeight: 200,
                      position: 'relative',
                    }}
                  >
                    <AnimatePresence>
                      {(stage === 'recording' || showText) && (
                        <MotionBox
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              color: 'text.primary',
                              whiteSpace: 'pre-line',
                              lineHeight: 1.8,
                              fontSize: '0.9rem',
                            }}
                          >
                            {t('demo.sampleTranscript')}
                          </Typography>
                        </MotionBox>
                      )}
                    </AnimatePresence>

                    {stage === 'recording' && (
                      <Box sx={{ mt: 2 }}>
                        <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                          {Array.from({ length: 20 }).map((_, i) => (
                            <MotionBox
                              key={i}
                              animate={{ height: [4, Math.random() * 20 + 4, 4] }}
                              transition={{
                                duration: 0.5,
                                repeat: Infinity,
                                delay: i * 0.05,
                              }}
                              sx={{
                                width: 3,
                                bgcolor: 'primary.main',
                                borderRadius: 1,
                              }}
                            />
                          ))}
                        </Box>
                      </Box>
                    )}
                  </Box>
                </Box>

                {/* Right: SOAP Output */}
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 2, fontWeight: 600 }}>
                    SOAP Note
                  </Typography>
                  <Box
                    sx={{
                      bgcolor: 'grey.50',
                      borderRadius: 2,
                      p: 2.5,
                      minHeight: 200,
                    }}
                  >
                    <AnimatePresence>
                      {(stage === 'processing' || stage === 'complete') && (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                          {[
                            { label: 'S', title: 'Subjective', content: sampleSOAP.s, color: '#4B9CD3', delay: 0 },
                            { label: 'O', title: 'Objective', content: sampleSOAP.o, color: '#10B981', delay: 0.2 },
                            { label: 'A', title: 'Assessment', content: sampleSOAP.a, color: '#F59E0B', delay: 0.4 },
                            { label: 'P', title: 'Plan', content: sampleSOAP.p, color: '#8B5CF6', delay: 0.6 },
                          ].map((item) => (
                            <MotionBox
                              key={item.label}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: progress > item.delay * 100 + 10 ? 1 : 0.3, x: 0 }}
                              transition={{ duration: 0.4, delay: item.delay }}
                              sx={{
                                display: 'flex',
                                gap: 1.5,
                                opacity: progress > item.delay * 100 + 10 ? 1 : 0.3,
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
                                  fontWeight: 700,
                                  fontSize: '0.7rem',
                                  flexShrink: 0,
                                }}
                              >
                                {item.label}
                              </Box>
                              <Box sx={{ flex: 1 }}>
                                <Typography variant="caption" sx={{ color: item.color, fontWeight: 600 }}>
                                  {item.title}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.primary', fontSize: '0.8rem', lineHeight: 1.6 }}>
                                  {item.content}
                                </Typography>
                              </Box>
                            </MotionBox>
                          ))}
                        </Box>
                      )}
                    </AnimatePresence>
                  </Box>
                </Box>
              </Box>

              {/* Progress bar */}
              {(stage === 'recording' || stage === 'processing') && (
                <Box sx={{ mt: 3 }}>
                  <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      bgcolor: 'grey.200',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: stage === 'recording' ? '#EF4444' : 'primary.main',
                        borderRadius: 3,
                      },
                    }}
                  />
                </Box>
              )}

              {/* Control Button */}
              <Box sx={{ mt: 4, textAlign: 'center' }}>
                {stage === 'idle' && (
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<MicIcon />}
                    onClick={startDemo}
                    sx={{
                      px: 4,
                      py: 1.5,
                      background: 'linear-gradient(135deg, #4B9CD3 0%, #3A7BA8 100%)',
                      boxShadow: '0 4px 14px rgba(75, 156, 211, 0.4)',
                    }}
                  >
                    {t('demo.tryDemo')}
                  </Button>
                )}
                {stage === 'recording' && (
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<StopIcon />}
                    onClick={() => setStage('processing')}
                    sx={{
                      px: 4,
                      py: 1.5,
                      bgcolor: '#EF4444',
                      '&:hover': { bgcolor: '#DC2626' },
                    }}
                  >
                    Stop
                  </Button>
                )}
                {stage === 'complete' && (
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={resetDemo}
                    sx={{ px: 4, py: 1.5 }}
                  >
                    Try Again
                  </Button>
                )}
              </Box>
            </Box>
          </MotionPaper>
        </MotionBox>
      </Container>
    </Box>
  );
}
