'use client';

import { Box, Container, Typography, Button, Stack, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import MicIcon from '@mui/icons-material/Mic';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import DescriptionIcon from '@mui/icons-material/Description';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useI18n } from '@/lib/i18n';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const MotionBox = motion.create(Box);

// --- Animation variants ---

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// --- Product mockup: simple stagger-in showing the workflow ---

const soapColors = ['#4B9CD3', '#10B981', '#F59E0B', '#8B5CF6'];

const cardStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 1.0 },
  },
};

const cardItem = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const bottomBar = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: 2.0 },
  },
};

function ProductMockup({ t }) {
  const soapCards = t('hero.mockup.soap') || [];

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: { lg: 480, xl: 520 },
        mx: 'auto',
      }}
    >
      {/* Main card — gentle float */}
      <MotionBox
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        sx={{
          bgcolor: 'white',
          borderRadius: 3,
          boxShadow: '0 24px 48px -12px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.04)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Browser-like header */}
        <Box
          sx={{
            px: 2.5,
            py: 1.5,
            borderBottom: '1px solid',
            borderColor: '#F1F5F9',
            bgcolor: '#FAFBFC',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Stack direction="row" spacing={0.75} alignItems="center">
            <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#FF5F57' }} />
            <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#FFBD2E' }} />
            <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#28CA41' }} />
          </Stack>
          <Box sx={{ px: 2.5, py: 0.4, borderRadius: 1, bgcolor: '#F1F5F9' }}>
            <Typography sx={{ fontSize: '0.6rem', color: '#94A3B8', fontFamily: 'monospace' }}>
              chartsok.emr / chart
            </Typography>
          </Box>
          <Box sx={{ width: 40 }} />
        </Box>

        {/* Content area */}
        <Box sx={{ p: { xs: 2.5, sm: 3 } }}>
          {/* Status bar */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 2.5,
              pb: 2,
              borderBottom: '1px solid',
              borderColor: '#F1F5F9',
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <CheckCircleOutlineIcon sx={{ fontSize: 16, color: '#10B981' }} />
              <Typography sx={{ fontSize: '0.78rem', fontWeight: 600, color: '#10B981' }}>
                {t('hero.mockup.chartDone')}
              </Typography>
              <Chip
                icon={<AutoAwesomeIcon sx={{ fontSize: 10 }} />}
                label="AI"
                size="small"
                sx={{
                  bgcolor: '#8B5CF608',
                  color: '#8B5CF6',
                  fontWeight: 700,
                  fontSize: '0.55rem',
                  height: 18,
                  '& .MuiChip-icon': { color: '#8B5CF6' },
                  border: '1px solid #8B5CF615',
                }}
              />
            </Stack>
            <Typography sx={{ fontSize: '0.68rem', color: '#94A3B8' }}>
              {t('hero.mockup.patient')}
            </Typography>
          </Box>

          {/* SOAP cards — stagger in once */}
          <MotionBox variants={cardStagger} initial="hidden" animate="visible">
            <Stack spacing={1.25}>
              {soapCards.map((card, i) => (
                <MotionBox
                  key={card.key}
                  variants={cardItem}
                  sx={{
                    display: 'flex',
                    gap: 1.5,
                    p: 1.5,
                    bgcolor: '#FAFBFC',
                    borderRadius: 2,
                    borderLeft: '3px solid',
                    borderColor: soapColors[i],
                  }}
                >
                  <Box
                    sx={{
                      width: 26,
                      height: 26,
                      borderRadius: 1.25,
                      bgcolor: soapColors[i],
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.68rem',
                      flexShrink: 0,
                    }}
                  >
                    {card.key}
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography sx={{ color: '#94A3B8', fontWeight: 600, fontSize: '0.65rem', mb: 0.25 }}>
                      {card.label}
                    </Typography>
                    <Typography
                      sx={{
                        color: '#334155',
                        fontSize: '0.76rem',
                        lineHeight: 1.4,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {card.text}
                    </Typography>
                  </Box>
                </MotionBox>
              ))}
            </Stack>
          </MotionBox>

          {/* Bottom action bar — fades in after cards */}
          <MotionBox
            variants={bottomBar}
            initial="hidden"
            animate="visible"
            sx={{
              mt: 2,
              pt: 2,
              borderTop: '1px solid',
              borderColor: '#F1F5F9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Stack direction="row" spacing={1}>
              <Chip
                label={t('hero.mockup.emrApply')}
                size="small"
                sx={{
                  bgcolor: '#10B98112',
                  color: '#10B981',
                  fontWeight: 600,
                  fontSize: '0.62rem',
                  height: 22,
                }}
              />
              <Chip
                label={t('hero.mockup.instructions')}
                size="small"
                sx={{
                  bgcolor: '#4B9CD312',
                  color: '#4B9CD3',
                  fontWeight: 600,
                  fontSize: '0.62rem',
                  height: 22,
                }}
              />
            </Stack>
            <Typography sx={{ fontSize: '0.62rem', color: '#CBD5E1' }}>
              {t('hero.mockup.auditSaved')}
            </Typography>
          </MotionBox>
        </Box>

        {/* Subtle shimmer sweep — runs once after cards appear */}
        <MotionBox
          initial={{ x: '-100%' }}
          animate={{ x: '200%' }}
          transition={{ duration: 1.6, delay: 2.2, ease: 'easeInOut' }}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '40%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.06) 50%, transparent 100%)',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />
      </MotionBox>

      {/* Floating stat — bottom left (gentle float) */}
      <MotionBox
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: [0, 5, 0] }}
        transition={{
          opacity: { duration: 0.5, delay: 2.2 },
          y: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2.2 },
        }}
        sx={{
          position: 'absolute',
          bottom: -14,
          left: { lg: -32, xl: -40 },
          bgcolor: 'white',
          borderRadius: 2,
          boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
          px: 1.75,
          py: 1,
          border: '1px solid',
          borderColor: '#E2E8F0',
          display: { xs: 'none', lg: 'flex' },
          alignItems: 'center',
          gap: 1,
          zIndex: 10,
        }}
      >
        <Box
          sx={{
            width: 28,
            height: 28,
            borderRadius: 1.25,
            bgcolor: '#ECFDF5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <SpeedIcon sx={{ fontSize: 14, color: '#10B981' }} />
        </Box>
        <Box>
          <Typography sx={{ fontSize: '0.58rem', color: '#94A3B8', fontWeight: 500, lineHeight: 1 }}>
            {t('hero.mockup.chartTime')}
          </Typography>
          <Typography sx={{ fontWeight: 800, fontSize: '0.92rem', color: '#10B981', lineHeight: 1.2 }}>
            {t('hero.mockup.chartSaving')}
          </Typography>
        </Box>
      </MotionBox>

      {/* Floating badge — top right (gentle float) */}
      <MotionBox
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: [0, -4, 0] }}
        transition={{
          opacity: { duration: 0.5, delay: 1.8 },
          y: { duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1.8 },
        }}
        sx={{
          position: 'absolute',
          top: -10,
          right: { lg: -20, xl: -32 },
          bgcolor: 'white',
          borderRadius: 1.5,
          boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
          px: 1.25,
          py: 0.6,
          border: '1px solid',
          borderColor: '#E2E8F0',
          display: { xs: 'none', lg: 'flex' },
          alignItems: 'center',
          gap: 0.5,
          zIndex: 10,
        }}
      >
        <SecurityIcon sx={{ fontSize: 12, color: '#8B5CF6' }} />
        <Typography sx={{ fontSize: '0.62rem', fontWeight: 700, color: '#8B5CF6' }}>
          {t('hero.mockup.onPremise')}
        </Typography>
      </MotionBox>
    </MotionBox>
  );
}

// --- Main Hero Component ---

export default function Hero() {
  const { t } = useI18n();
  const { user } = useAuth();
  const router = useRouter();

  const handleCtaClick = () => {
    if (user) {
      router.push('/dashboard');
    } else {
      router.push('/contact?type=emr_partner');
    }
  };

  return (
    <Box
      sx={{
        background: 'linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 60%, #F8FAFC 100%)',
        pt: { xs: 5, sm: 7, md: 9, lg: 11 },
        pb: { xs: 7, sm: 9, md: 11, lg: 13 },
        overflow: 'hidden',
        position: 'relative',
        minHeight: { md: 'calc(100vh - 80px)' },
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Subtle background */}
      <Box sx={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        <Box
          sx={{
            position: 'absolute',
            top: '-20%',
            right: '-8%',
            width: { xs: 300, md: 500, lg: 600 },
            height: { xs: 300, md: 500, lg: 600 },
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(75,156,211,0.05) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '-15%',
            left: '-10%',
            width: { xs: 250, md: 400 },
            height: { xs: 250, md: 400 },
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
      </Box>

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <MotionBox
          variants={stagger}
          initial="hidden"
          animate="visible"
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
            alignItems: 'center',
            gap: { xs: 5, sm: 6, md: 7, lg: 8, xl: 10 },
          }}
        >
          {/* ===== TEXT ===== */}
          <MotionBox variants={stagger} sx={{ textAlign: { xs: 'center', lg: 'left' } }}>
            {/* Badge */}
            <MotionBox variants={fadeUp}>
              <Chip
                icon={<AutoAwesomeIcon sx={{ fontSize: 14 }} />}
                label={t('hero.badge')}
                size="small"
                sx={{
                  mb: { xs: 2.5, sm: 3 },
                  bgcolor: 'rgba(139,92,246,0.08)',
                  color: '#8B5CF6',
                  fontWeight: 600,
                  fontSize: { xs: '0.72rem', sm: '0.78rem' },
                  height: { xs: 28, sm: 30 },
                  '& .MuiChip-icon': { color: '#8B5CF6' },
                  border: '1px solid rgba(139,92,246,0.12)',
                }}
              />
            </MotionBox>

            {/* Title */}
            <MotionBox variants={fadeUp}>
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontSize: { xs: '1.75rem', sm: '2.1rem', md: '2.5rem', lg: '2.9rem', xl: '3.25rem' },
                  fontWeight: 800,
                  color: '#0F172A',
                  lineHeight: { xs: 1.2, sm: 1.15 },
                  mb: { xs: 2.5, sm: 3 },
                  letterSpacing: '-0.025em',
                  wordBreak: 'keep-all',
                }}
              >
                {t('hero.title')}
                <br />
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
                <Box component="span" sx={{ color: '#0F172A' }}>
                  {t('hero.titleEnd')}
                </Box>
              </Typography>
            </MotionBox>

            {/* Subtitle */}
            <MotionBox variants={fadeUp}>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '0.92rem', sm: '0.98rem', md: '1.05rem', lg: '1.08rem' },
                  color: '#475569',
                  mb: { xs: 1.5, sm: 2 },
                  maxWidth: { xs: '100%', lg: 520 },
                  mx: { xs: 'auto', lg: 0 },
                  lineHeight: 1.75,
                  whiteSpace: 'pre-line',
                }}
              >
                {t('hero.subtitle')}
              </Typography>

              {/* Selling points */}
              <Stack
                direction="row"
                spacing={{ xs: 1, sm: 1.5 }}
                flexWrap="wrap"
                useFlexGap
                justifyContent={{ xs: 'center', lg: 'flex-start' }}
                sx={{ mb: { xs: 3, sm: 3.5 } }}
              >
                {(t('hero.sellingPoints') || []).map((point, i) => (
                  <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Box
                      sx={{
                        width: 5,
                        height: 5,
                        borderRadius: '50%',
                        bgcolor: point.color,
                        flexShrink: 0,
                      }}
                    />
                    <Typography sx={{ fontSize: { xs: '0.78rem', sm: '0.82rem' }, color: '#64748B', fontWeight: 600 }}>
                      {point.text}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </MotionBox>

            {/* CTA */}
            <MotionBox variants={fadeUp}>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1.5, sm: 2 }}
                justifyContent={{ xs: 'center', lg: 'flex-start' }}
                sx={{ mb: { xs: 3.5, sm: 4 } }}
              >
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleCtaClick}
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    px: { xs: 3.5, sm: 4, md: 5 },
                    py: { xs: 1.5, sm: 1.75 },
                    fontSize: { xs: '0.92rem', sm: '0.95rem', md: '1rem' },
                    minWidth: { xs: '100%', sm: 200 },
                    bgcolor: '#4B9CD3',
                    boxShadow: '0 4px 16px rgba(75,156,211,0.3)',
                    borderRadius: 2.5,
                    fontWeight: 700,
                    '&:hover': {
                      bgcolor: '#3A8BC2',
                      boxShadow: '0 8px 24px rgba(75,156,211,0.4)',
                    },
                    transition: 'all 0.25s ease',
                  }}
                >
                  {user ? t('nav.dashboard') : t('hero.cta')}
                </Button>

                <Button
                  component={Link}
                  href="/contact?type=security_packet"
                  variant="outlined"
                  size="large"
                  startIcon={<SecurityIcon />}
                  sx={{
                    px: { xs: 3, sm: 4 },
                    py: { xs: 1.5, sm: 1.75 },
                    fontSize: { xs: '0.92rem', sm: '0.95rem', md: '1rem' },
                    minWidth: { xs: '100%', sm: 190 },
                    borderWidth: 1.5,
                    borderColor: '#CBD5E1',
                    color: '#475569',
                    fontWeight: 600,
                    borderRadius: 2.5,
                    '&:hover': {
                      borderWidth: 1.5,
                      borderColor: '#4B9CD3',
                      color: '#4B9CD3',
                      bgcolor: 'rgba(75,156,211,0.04)',
                    },
                    transition: 'all 0.25s ease',
                  }}
                >
                  {t('hero.demo')}
                </Button>
              </Stack>
            </MotionBox>

            {/* Trust badges */}
            <MotionBox variants={fadeUp}>
              <Stack
                direction="row"
                flexWrap="wrap"
                gap={{ xs: 0.75, sm: 1 }}
                justifyContent={{ xs: 'center', lg: 'flex-start' }}
              >
                {(t('hero.badges') || []).map((badge, i) => {
                  const iconMap = {
                    mic: <MicIcon sx={{ fontSize: 13 }} />,
                    template: <DescriptionIcon sx={{ fontSize: 13 }} />,
                    speed: <SpeedIcon sx={{ fontSize: 13 }} />,
                    security: <SecurityIcon sx={{ fontSize: 13 }} />,
                  };
                  return (
                    <Chip
                      key={i}
                      icon={iconMap[badge.icon] || <AutoAwesomeIcon sx={{ fontSize: 13 }} />}
                      label={badge.text}
                      variant="outlined"
                      size="small"
                      sx={{
                        borderColor: '#E2E8F0',
                        color: '#64748B',
                        fontSize: { xs: '0.7rem', sm: '0.74rem' },
                        height: { xs: 26, sm: 28 },
                        '& .MuiChip-icon': { color: '#94A3B8' },
                      }}
                    />
                  );
                })}
              </Stack>
            </MotionBox>
          </MotionBox>

          {/* ===== VISUAL (desktop) ===== */}
          <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
            <ProductMockup t={t} />
          </Box>
        </MotionBox>

        {/* Mobile visual */}
        <MotionBox
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          sx={{ display: { xs: 'block', lg: 'none' }, mt: 4 }}
        >
          <Box
            sx={{
              bgcolor: 'white',
              borderRadius: 3,
              boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
              overflow: 'hidden',
              border: '1px solid',
              borderColor: '#F1F5F9',
              maxWidth: 400,
              mx: 'auto',
            }}
          >
            {/* Mobile header */}
            <Box
              sx={{
                px: 2,
                py: 1.25,
                borderBottom: '1px solid',
                borderColor: '#F1F5F9',
                bgcolor: '#FAFBFC',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Stack direction="row" alignItems="center" spacing={0.75}>
                <CheckCircleOutlineIcon sx={{ fontSize: 14, color: '#10B981' }} />
                <Typography sx={{ color: '#10B981', fontWeight: 600, fontSize: '0.72rem' }}>
                  {t('hero.mockup.chartDone')}
                </Typography>
              </Stack>
              <Typography sx={{ fontSize: '0.62rem', color: '#94A3B8' }}>
                {t('hero.mockup.patientShort')}
              </Typography>
            </Box>

            {/* Mobile SOAP */}
            <Box sx={{ p: 2 }}>
              <Stack spacing={0.75}>
                {(t('hero.mockup.soap') || []).map((s, i) => (
                  <Box
                    key={s.key}
                    sx={{
                      display: 'flex',
                      gap: 1,
                      alignItems: 'center',
                      p: 1,
                      bgcolor: '#FAFBFC',
                      borderRadius: 1.25,
                      borderLeft: '2.5px solid',
                      borderColor: soapColors[i],
                    }}
                  >
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        borderRadius: 0.75,
                        bgcolor: soapColors[i],
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '0.58rem',
                        flexShrink: 0,
                      }}
                    >
                      {s.key}
                    </Box>
                    <Typography sx={{ fontSize: '0.7rem', color: '#475569' }}>
                      {s.text}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Box>
        </MotionBox>
      </Container>
    </Box>
  );
}
