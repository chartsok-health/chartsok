'use client';

import { useState, useEffect, useRef } from 'react';
import { Box, Container, Typography, Button, Stack, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SecurityIcon from '@mui/icons-material/Security';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useRouter } from 'next/navigation';
import { useI18n } from '@/lib/i18n';

const MotionBox = motion.create(Box);

/* Animated counter */
function AnimatedCounter({ end, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1800;
          const steps = 40;
          const increment = end / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
}

const content = {
  ko: {
    badge: 'EMR 파트너 프로그램',
    headlineBefore: 'EMR에 AI 차트 모듈,',
    counterSuffix: '~8주',
    headlineAfter: '안에 런칭',
    subtitle1: 'NDA 체결 → 템플릿 매핑 → 파일럿 → 런칭까지,',
    subtitle2: '검증된 파트너 온보딩 프로세스',
    highlights: [
      '추가 개발 비용 ZERO',
      'PoC 무료 제공',
      '전담 엔지니어 배정',
      '70% 매출 셰어',
    ],
    partnerButton: '파트너 미팅 신청',
    securityButton: '보안 패킷 요청',
  },
  en: {
    badge: 'Partner Program',
    headlineBefore: 'AI Charting in Your EMR in',
    counterSuffix: '–8 Weeks',
    headlineAfter: '',
    subtitle1: 'NDA → Mapping → Pilot → Launch',
    subtitle2: 'We guide you every step.',
    highlights: [
      'Zero Dev Cost',
      'Free PoC',
      'Dedicated Engineer',
      '70% RevShare',
    ],
    partnerButton: 'Let\'s Talk',
    securityButton: 'Get Security Packet',
  },
};

export default function CTA() {
  const router = useRouter();
  const { locale } = useI18n();
  const t = content[locale] || content.ko;

  return (
    <Box
      id="contact"
      sx={{
        py: { xs: 10, sm: 12, md: 16 },
        background: 'linear-gradient(135deg, #0F2A44 0%, #1E4A6F 50%, #0F2A44 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background dot pattern */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.04,
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Animated floating orbs */}
      <MotionBox
        animate={{ y: [0, -25, 0], x: [0, 10, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        sx={{
          position: 'absolute',
          top: '15%',
          left: '8%',
          width: { xs: 80, md: 120 },
          height: { xs: 80, md: 120 },
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(75, 156, 211, 0.2) 0%, transparent 70%)',
          display: { xs: 'none', sm: 'block' },
        }}
      />
      <MotionBox
        animate={{ y: [0, 20, 0], x: [0, -15, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        sx={{
          position: 'absolute',
          bottom: '15%',
          right: '8%',
          width: { xs: 100, md: 160 },
          height: { xs: 100, md: 160 },
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
          display: { xs: 'none', sm: 'block' },
        }}
      />
      <MotionBox
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        sx={{
          position: 'absolute',
          top: '50%',
          right: '25%',
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
          display: { xs: 'none', md: 'block' },
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          sx={{ textAlign: 'center' }}
        >
          {/* Badge */}
          <MotionBox
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Chip
              label={t.badge}
              sx={{
                mb: 3,
                bgcolor: 'rgba(75, 156, 211, 0.15)',
                color: '#81C4F8',
                fontWeight: 600,
                fontSize: { xs: '0.75rem', md: '0.85rem' },
                border: '1px solid rgba(75, 156, 211, 0.3)',
                height: { xs: 28, md: 32 },
              }}
            />
          </MotionBox>

          {/* Headline */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '1.6rem', sm: '2rem', md: '2.75rem', lg: '3rem' },
                fontWeight: 800,
                color: 'white',
                mb: 2,
                lineHeight: 1.2,
              }}
            >
              {t.headlineBefore}{' '}
              <Box
                component="span"
                sx={{
                  background: 'linear-gradient(135deg, #4B9CD3, #81C4F8)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                <AnimatedCounter end={4} suffix={t.counterSuffix} />
              </Box>
              {t.headlineAfter && <>{' '}{t.headlineAfter}</>}
            </Typography>
          </MotionBox>

          {/* Subtitle */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Typography
              variant="body1"
              sx={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: { xs: '0.9rem', sm: '1rem', md: '1.15rem' },
                mb: 4,
                maxWidth: 560,
                mx: 'auto',
                lineHeight: 1.7,
              }}
            >
              {t.subtitle1}
              <br />
              {t.subtitle2}
            </Typography>
          </MotionBox>

          {/* Highlight pills */}
          <MotionBox
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: { xs: 1, md: 1.5 },
              mb: { xs: 4, md: 5 },
            }}
          >
            {t.highlights.map((text, i) => (
              <MotionBox
                key={text}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.35 + i * 0.08 }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={0.75}
                  sx={{
                    px: { xs: 1.5, md: 2 },
                    py: { xs: 0.5, md: 0.75 },
                    borderRadius: 2,
                    bgcolor: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <CheckCircleOutlineIcon
                    sx={{ fontSize: { xs: 14, md: 16 }, color: '#10B981' }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'rgba(255,255,255,0.85)',
                      fontSize: { xs: '0.72rem', md: '0.82rem' },
                      fontWeight: 500,
                    }}
                  >
                    {text}
                  </Typography>
                </Stack>
              </MotionBox>
            ))}
          </MotionBox>

          {/* Buttons */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              justifyContent="center"
              sx={{ mb: 4 }}
            >
              <MotionBox whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => router.push('/contact?type=emr_partner')}
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    bgcolor: 'white',
                    color: '#0F2A44',
                    px: { xs: 3, sm: 4, md: 5 },
                    py: { xs: 1.5, md: 1.75 },
                    fontSize: { xs: '0.9rem', md: '1rem' },
                    fontWeight: 700,
                    borderRadius: 2.5,
                    width: { xs: '100%', sm: 'auto' },
                    boxShadow: '0 4px 20px rgba(255, 255, 255, 0.2)',
                    '&:hover': {
                      bgcolor: 'grey.100',
                      boxShadow: '0 8px 32px rgba(255, 255, 255, 0.3)',
                    },
                  }}
                >
                  {t.partnerButton}
                </Button>
              </MotionBox>
              <MotionBox whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => router.push('/contact?type=security_packet')}
                  startIcon={<SecurityIcon />}
                  sx={{
                    borderColor: 'rgba(255, 255, 255, 0.35)',
                    color: 'white',
                    px: { xs: 3, sm: 4 },
                    py: { xs: 1.5, md: 1.75 },
                    fontSize: { xs: '0.9rem', md: '1rem' },
                    borderRadius: 2.5,
                    width: { xs: '100%', sm: 'auto' },
                    borderWidth: 2,
                    '&:hover': {
                      borderColor: 'white',
                      borderWidth: 2,
                      bgcolor: 'rgba(255, 255, 255, 0.08)',
                    },
                  }}
                >
                  {t.securityButton}
                </Button>
              </MotionBox>
            </Stack>
          </MotionBox>
        </MotionBox>
      </Container>
    </Box>
  );
}
