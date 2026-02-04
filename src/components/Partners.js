'use client';

import { Box, Container, Typography, Button, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import Link from 'next/link';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReplayIcon from '@mui/icons-material/Replay';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import SecurityIcon from '@mui/icons-material/Security';
import { useI18n } from '@/lib/i18n';

const MotionBox = motion.create(Box);

const kpiIcons = [CheckCircleIcon, ReplayIcon, EventAvailableIcon];

export default function Partners() {
  const { t, locale } = useI18n();
  const kpis = t('partners.kpis') || [];

  const trustItems = locale === 'ko'
    ? ['최소 데이터 수집', '역할 기반 접근 제어', '활동 로깅']
    : ['Minimal data collection', 'Role-based access', 'Activity logging'];

  return (
    <Box
      id="partners"
      sx={{
        py: { xs: 10, md: 14 },
        background: 'linear-gradient(180deg, #0F172A 0%, #1E293B 100%)',
      }}
    >
      <Container maxWidth="md">
        {/* Trust strip */}
        <MotionBox
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 2,
            mb: 8,
          }}
        >
          {trustItems.map((item, i) => (
            <Chip
              key={i}
              icon={<SecurityIcon sx={{ fontSize: 14, color: 'rgba(255,255,255,0.6) !important' }} />}
              label={item}
              size="small"
              sx={{
                bgcolor: 'rgba(255,255,255,0.08)',
                color: 'rgba(255,255,255,0.7)',
                border: '1px solid rgba(255,255,255,0.12)',
                fontSize: '0.8rem',
                fontWeight: 500,
              }}
            />
          ))}
        </MotionBox>

        {/* Partner section */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          sx={{ textAlign: 'center' }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              color: 'white',
              fontSize: { xs: '1.75rem', md: '2.25rem' },
              mb: 3,
            }}
          >
            {t('partners.title')}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255,255,255,0.7)',
              fontSize: { xs: '0.95rem', md: '1.05rem' },
              lineHeight: 1.8,
              maxWidth: 560,
              mx: 'auto',
              mb: 6,
              whiteSpace: 'pre-line',
            }}
          >
            {t('partners.description')}
          </Typography>

          {/* KPI chips */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: 3,
              mb: 6,
            }}
          >
            {Array.isArray(kpis) && kpis.map((kpi, index) => {
              const Icon = kpiIcons[index] || CheckCircleIcon;
              return (
                <MotionBox
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    px: 2.5,
                    py: 1.5,
                    borderRadius: 2,
                    bgcolor: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <Icon sx={{ color: '#4B9CD3', fontSize: 20 }} />
                  <Typography
                    variant="body2"
                    sx={{ color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}
                  >
                    {kpi.label}
                  </Typography>
                </MotionBox>
              );
            })}
          </Box>

          <MotionBox
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <Button
              component={Link}
              href="/contact"
              variant="outlined"
              size="large"
              sx={{
                borderColor: 'rgba(255,255,255,0.3)',
                color: 'white',
                px: 4,
                py: 1.5,
                fontSize: '0.95rem',
                fontWeight: 600,
                textTransform: 'none',
                borderRadius: 2,
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255,255,255,0.08)',
                },
              }}
            >
              {t('partners.cta')}
            </Button>
          </MotionBox>
        </MotionBox>
      </Container>
    </Box>
  );
}
