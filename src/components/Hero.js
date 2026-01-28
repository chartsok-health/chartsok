'use client';

import { Box, Container, Typography, Button, Stack, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import MicIcon from '@mui/icons-material/Mic';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import { useI18n } from '@/lib/i18n';

const MotionBox = motion.create(Box);

export default function Hero() {
  const { t } = useI18n();

  return (
    <Box
      sx={{
        background: 'linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)',
        pt: { xs: 4, sm: 6, md: 8 },
        pb: { xs: 6, sm: 8, md: 10 },
        overflow: 'hidden',
        position: 'relative',
        minHeight: { md: 'calc(100vh - 80px)' },
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Background decorations */}
      <Box
        sx={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '50%',
          height: '80%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(75, 156, 211, 0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
            alignItems: 'center',
            gap: { xs: 4, sm: 5, md: 6, lg: 8 },
          }}
        >
          {/* Text Content */}
          <Box sx={{ textAlign: { xs: 'center', lg: 'left' } }}>
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Chip
                icon={<AutoAwesomeIcon sx={{ fontSize: 14 }} />}
                label={t('hero.badge')}
                size="small"
                sx={{
                  mb: 2.5,
                  bgcolor: 'rgba(139, 92, 246, 0.1)',
                  color: '#8B5CF6',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  '& .MuiChip-icon': { color: '#8B5CF6' },
                }}
              />
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem', lg: '3.25rem', xl: '3.5rem' },
                  fontWeight: 800,
                  color: 'secondary.main',
                  lineHeight: 1.15,
                  mb: 0.5,
                  whiteSpace: { sm: 'nowrap' },
                }}
              >
                {t('hero.title')}
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem', lg: '3.25rem', xl: '3.5rem' },
                  fontWeight: 800,
                  lineHeight: 1.15,
                  mb: 3,
                }}
              >
                <Box
                  component="span"
                  sx={{
                    background: 'linear-gradient(135deg, #4B9CD3 0%, #8B5CF6 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {t('hero.titleHighlight')}
                </Box>{' '}
                <Box component="span" sx={{ color: 'secondary.main' }}>
                  {t('hero.titleEnd')}
                </Box>
              </Typography>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '0.95rem', sm: '1rem', md: '1.0625rem' },
                  color: 'text.secondary',
                  mb: 3.5,
                  maxWidth: { xs: '100%', lg: 480 },
                  mx: { xs: 'auto', lg: 0 },
                  lineHeight: 1.75,
                }}
              >
                {t('hero.subtitle')}
              </Typography>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={1.5}
                justifyContent={{ xs: 'center', lg: 'flex-start' }}
                sx={{ mb: 3.5 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    px: { xs: 3, sm: 4 },
                    py: 1.5,
                    fontSize: { xs: '0.9rem', sm: '0.95rem' },
                    minWidth: { xs: '100%', sm: 160 },
                  }}
                >
                  {t('hero.cta')}
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<PlayArrowIcon />}
                  sx={{
                    px: { xs: 3, sm: 4 },
                    py: 1.5,
                    fontSize: { xs: '0.9rem', sm: '0.95rem' },
                    minWidth: { xs: '100%', sm: 160 },
                    borderWidth: 2,
                    '&:hover': { borderWidth: 2 },
                  }}
                >
                  {t('hero.demo')}
                </Button>
              </Stack>
            </MotionBox>

            {/* Trust badges */}
            <MotionBox
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1,
                justifyContent: { xs: 'center', lg: 'flex-start' },
              }}
            >
              {[
                { icon: <SecurityIcon sx={{ fontSize: 14 }} />, label: 'HIPAA 준수' },
                { icon: <SpeedIcon sx={{ fontSize: 14 }} />, label: '실시간 처리' },
                { icon: <AutoAwesomeIcon sx={{ fontSize: 14 }} />, label: 'AI 정확도 98%' },
              ].map((badge, i) => (
                <Chip
                  key={i}
                  icon={badge.icon}
                  label={badge.label}
                  variant="outlined"
                  size="small"
                  sx={{
                    borderColor: 'grey.300',
                    color: 'text.secondary',
                    fontSize: '0.75rem',
                    height: 28,
                    '& .MuiChip-icon': { color: 'primary.main' },
                  }}
                />
              ))}
            </MotionBox>
          </Box>

          {/* Dashboard Mockup */}
          <MotionBox
            initial={{ opacity: 0, x: 30, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                maxWidth: { xs: 400, sm: 450, md: 480, lg: 500 },
              }}
            >
              {/* Main Dashboard Card */}
              <MotionBox
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                sx={{
                  bgcolor: 'white',
                  borderRadius: 3,
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
                  overflow: 'hidden',
                  border: '1px solid',
                  borderColor: 'grey.200',
                }}
              >
                {/* Header */}
                <Box
                  sx={{
                    p: { xs: 1.5, sm: 2 },
                    borderBottom: '1px solid',
                    borderColor: 'grey.100',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    bgcolor: 'grey.50',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: '#EF4444',
                        animation: 'pulse 1.5s infinite',
                        '@keyframes pulse': {
                          '0%, 100%': { opacity: 1 },
                          '50%': { opacity: 0.5 },
                        },
                      }}
                    />
                    <Typography variant="body2" sx={{ color: '#EF4444', fontWeight: 600, fontSize: { xs: '0.75rem', sm: '0.8rem' } }}>
                      녹음 중 · 02:34
                    </Typography>
                  </Box>
                  <Chip
                    label="AI 분석"
                    size="small"
                    sx={{
                      bgcolor: 'primary.main',
                      color: 'white',
                      fontSize: '0.7rem',
                      height: 24,
                    }}
                  />
                </Box>

                {/* Waveform */}
                <Box sx={{ px: { xs: 1.5, sm: 2 }, py: { xs: 1.5, sm: 2 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.4, height: 32, mb: 2 }}>
                    {Array.from({ length: 24 }).map((_, i) => (
                      <MotionBox
                        key={i}
                        animate={{ height: [6, Math.random() * 24 + 6, 6] }}
                        transition={{
                          duration: 0.6 + Math.random() * 0.3,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                        sx={{
                          width: 2.5,
                          bgcolor: 'primary.main',
                          borderRadius: 1,
                          opacity: 0.7,
                        }}
                      />
                    ))}
                  </Box>

                  {/* SOAP Cards */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    {[
                      { label: 'S', title: 'Subjective', content: '3일 전부터 두통 호소, 오후에 악화...', color: '#4B9CD3' },
                      { label: 'O', title: 'Objective', content: 'BP 120/80, HR 72, 경부 근육 긴장...', color: '#10B981' },
                      { label: 'A', title: 'Assessment', content: '긴장성 두통(TTH) 의심', color: '#F59E0B' },
                      { label: 'P', title: 'Plan', content: '생활습관 교정, 스트레칭 권고...', color: '#8B5CF6' },
                    ].map((item, index) => (
                      <MotionBox
                        key={item.label}
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.6 + index * 0.12 }}
                        sx={{
                          display: 'flex',
                          gap: 1.5,
                          p: { xs: 1, sm: 1.25 },
                          bgcolor: 'grey.50',
                          borderRadius: 1.5,
                          borderLeft: '3px solid',
                          borderColor: item.color,
                        }}
                      >
                        <Box
                          sx={{
                            width: { xs: 22, sm: 26 },
                            height: { xs: 22, sm: 26 },
                            borderRadius: 1,
                            bgcolor: item.color,
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 700,
                            fontSize: { xs: '0.65rem', sm: '0.7rem' },
                            flexShrink: 0,
                          }}
                        >
                          {item.label}
                        </Box>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography sx={{ color: 'text.secondary', fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem' } }}>
                            {item.title}
                          </Typography>
                          <Typography
                            sx={{
                              color: 'text.primary',
                              fontSize: { xs: '0.7rem', sm: '0.75rem' },
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {item.content}
                          </Typography>
                        </Box>
                      </MotionBox>
                    ))}
                  </Box>
                </Box>
              </MotionBox>

              {/* Floating Mic Button */}
              <MotionBox
                animate={{ y: [0, -8, 0], rotate: [0, 3, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                sx={{
                  position: 'absolute',
                  top: { xs: -15, sm: -20 },
                  right: { xs: -10, sm: -15 },
                  width: { xs: 48, sm: 56 },
                  height: { xs: 48, sm: 56 },
                  borderRadius: '50%',
                  bgcolor: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 24px rgba(75, 156, 211, 0.4)',
                }}
              >
                <MicIcon sx={{ color: 'white', fontSize: { xs: 22, sm: 26 } }} />
              </MotionBox>

              {/* Stats Card */}
              <MotionBox
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                sx={{
                  position: 'absolute',
                  bottom: { xs: 20, sm: 30 },
                  left: { xs: -10, sm: -25 },
                  bgcolor: 'white',
                  borderRadius: 2,
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
                  p: 1.5,
                  border: '1px solid',
                  borderColor: 'grey.100',
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                <Typography sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>
                  시간 절감
                </Typography>
                <Typography sx={{ color: '#10B981', fontWeight: 700, fontSize: '1.25rem' }}>
                  73%
                </Typography>
              </MotionBox>
            </Box>
          </MotionBox>
        </Box>
      </Container>
    </Box>
  );
}
