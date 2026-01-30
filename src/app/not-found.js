'use client';

import { Box, Typography, Button, Container } from '@mui/material';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

const MotionBox = motion.create(Box);

export default function NotFound() {
  const router = useRouter();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#F8FAFC',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(circle at 1px 1px, #E2E8F0 1px, transparent 0)`,
          backgroundSize: '40px 40px',
          opacity: 0.5,
        }}
      />

      {/* Floating Elements */}
      {[...Array(5)].map((_, i) => (
        <MotionBox
          key={i}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5,
          }}
          sx={{
            position: 'absolute',
            width: 60 + i * 20,
            height: 60 + i * 20,
            borderRadius: '50%',
            background: `linear-gradient(135deg, rgba(75, 156, 211, ${0.1 - i * 0.015}) 0%, rgba(58, 123, 168, ${0.1 - i * 0.015}) 100%)`,
            left: `${10 + i * 18}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
        />
      ))}

      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          sx={{ textAlign: 'center' }}
        >
          {/* Logo */}
          <MotionBox
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              mb: 4,
              cursor: 'pointer',
            }}
            onClick={() => router.push('/')}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #4B9CD3 0%, #3A7BA8 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <AutoAwesomeIcon sx={{ color: 'white', fontSize: 24 }} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#1E3A5F' }}>
              ChartSok
            </Typography>
          </MotionBox>

          {/* 404 Number */}
          <MotionBox
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '8rem', md: '12rem' },
                fontWeight: 900,
                background: 'linear-gradient(135deg, #4B9CD3 0%, #3A7BA8 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                lineHeight: 1,
                mb: 2,
              }}
            >
              404
            </Typography>
          </MotionBox>

          {/* Icon */}
          <MotionBox
            animate={{
              rotate: [0, -10, 10, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
            }}
            sx={{ mb: 2 }}
          >
            <SentimentDissatisfiedIcon sx={{ fontSize: 64, color: 'grey.400' }} />
          </MotionBox>

          {/* Message */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: '#1E3A5F',
              mb: 1,
            }}
          >
            페이지를 찾을 수 없습니다
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              mb: 4,
              maxWidth: 400,
              mx: 'auto',
            }}
          >
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
            URL을 확인하시거나 아래 버튼을 이용해 주세요.
          </Typography>

          {/* Buttons */}
          <MotionBox
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <Button
              variant="outlined"
              size="large"
              startIcon={<ArrowBackIcon />}
              onClick={() => router.back()}
              sx={{
                borderRadius: 2,
                px: 3,
                borderColor: 'grey.300',
                color: 'text.primary',
                '&:hover': {
                  borderColor: 'grey.400',
                  bgcolor: 'grey.50',
                },
              }}
            >
              이전 페이지
            </Button>
            <Button
              variant="contained"
              size="large"
              startIcon={<HomeIcon />}
              onClick={() => router.push('/')}
              sx={{
                borderRadius: 2,
                px: 3,
                background: 'linear-gradient(135deg, #4B9CD3 0%, #3A7BA8 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #3A7BA8 0%, #2C5F7C 100%)',
                },
              }}
            >
              홈으로 가기
            </Button>
          </MotionBox>

          {/* Help Link */}
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              mt: 4,
            }}
          >
            문제가 계속되면{' '}
            <Typography
              component="span"
              sx={{
                color: 'primary.main',
                cursor: 'pointer',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              고객 지원
            </Typography>
            에 문의해 주세요.
          </Typography>
        </MotionBox>
      </Container>
    </Box>
  );
}
