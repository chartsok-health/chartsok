'use client';

import { Box, Container, Typography, Button, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useI18n } from '@/lib/i18n';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';

const MotionBox = motion.create(Box);

export default function CTA() {
  const { t } = useI18n();
  const { user } = useAuth();
  const router = useRouter();

  const handleCtaClick = () => {
    if (user) {
      router.push('/dashboard');
    } else {
      router.push('/?auth=signup');
    }
  };

  return (
    <Box
      id="contact"
      sx={{
        py: { xs: 12, md: 16 },
        background: 'linear-gradient(135deg, #0F2A44 0%, #1E4A6F 50%, #0F2A44 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background pattern */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.05,
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Floating elements */}
      <MotionBox
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        sx={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(75, 156, 211, 0.2) 0%, transparent 70%)',
        }}
      />
      <MotionBox
        animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        sx={{
          position: 'absolute',
          bottom: '20%',
          right: '10%',
          width: 150,
          height: 150,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(75, 156, 211, 0.15) 0%, transparent 70%)',
        }}
      />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          sx={{ textAlign: 'center' }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 700,
              color: 'white',
              mb: 2,
            }}
          >
            {t('cta.title')}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: { xs: '1rem', md: '1.25rem' },
              mb: 5,
              maxWidth: 600,
              mx: 'auto',
              lineHeight: 1.7,
            }}
          >
            {t('cta.subtitle')}
          </Typography>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
            sx={{ mb: 4 }}
          >
            <MotionBox whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleCtaClick}
                endIcon={<ArrowForwardIcon />}
                sx={{
                  bgcolor: 'white',
                  color: 'secondary.main',
                  px: 5,
                  py: 1.75,
                  fontSize: '1rem',
                  fontWeight: 600,
                  boxShadow: '0 4px 20px rgba(255, 255, 255, 0.2)',
                  '&:hover': {
                    bgcolor: 'grey.100',
                    boxShadow: '0 6px 30px rgba(255, 255, 255, 0.3)',
                  },
                }}
              >
                {user ? t('nav.dashboard') : t('cta.button')}
              </Button>
            </MotionBox>
            <MotionBox whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outlined"
                size="large"
                href="/contact"
                startIcon={<CalendarTodayIcon />}
                sx={{
                  borderColor: 'rgba(255, 255, 255, 0.4)',
                  color: 'white',
                  px: 4,
                  py: 1.75,
                  fontSize: '1rem',
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                {t('cta.demo')}
              </Button>
            </MotionBox>
          </Stack>

          <Box
            component="span"
            sx={{
              color: 'rgba(255, 255, 255, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              fontSize: '0.875rem',
            }}
          >
            <Box
              component="span"
              sx={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                bgcolor: '#10B981',
                display: 'inline-block',
              }}
            />
            {t('cta.note')}
          </Box>
        </MotionBox>
      </Container>
    </Box>
  );
}
