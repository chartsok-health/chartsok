'use client';

import { Box, Typography, Button, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchOffIcon from '@mui/icons-material/SearchOff';

const MotionBox = motion.create(Box);
const MotionPaper = motion.create(Paper);

export default function DashboardNotFound() {
  const router = useRouter();

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 200px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4,
      }}
    >
      <MotionPaper
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        elevation={0}
        sx={{
          p: { xs: 4, md: 6 },
          borderRadius: 4,
          border: '1px solid',
          borderColor: 'grey.200',
          textAlign: 'center',
          maxWidth: 500,
        }}
      >
        {/* Icon */}
        <MotionBox
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          sx={{
            width: 100,
            height: 100,
            borderRadius: '50%',
            bgcolor: 'grey.100',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 3,
          }}
        >
          <SearchOffIcon sx={{ fontSize: 48, color: 'grey.400' }} />
        </MotionBox>

        {/* 404 Badge */}
        <Box
          sx={{
            display: 'inline-block',
            px: 2,
            py: 0.5,
            borderRadius: 2,
            bgcolor: 'error.50',
            color: 'error.main',
            fontWeight: 700,
            fontSize: '0.875rem',
            mb: 2,
          }}
        >
          404 Error
        </Box>

        {/* Message */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: 'secondary.main',
            mb: 1,
          }}
        >
          페이지를 찾을 수 없습니다
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            mb: 4,
            lineHeight: 1.7,
          }}
        >
          요청하신 대시보드 페이지가 존재하지 않습니다.<br />
          URL을 확인하시거나 대시보드 홈으로 이동해 주세요.
        </Typography>

        {/* Buttons */}
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => router.back()}
            sx={{ borderRadius: 2 }}
          >
            이전 페이지
          </Button>
          <Button
            variant="contained"
            startIcon={<DashboardIcon />}
            onClick={() => router.push('/dashboard')}
            sx={{ borderRadius: 2 }}
          >
            대시보드 홈
          </Button>
        </Box>

        {/* Quick Links */}
        <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid', borderColor: 'grey.100' }}>
          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1 }}>
            자주 찾는 페이지
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { label: '새 진료', path: '/dashboard/record' },
              { label: '진료 기록', path: '/dashboard/history' },
              { label: '환자 관리', path: '/dashboard/patients' },
              { label: '설정', path: '/dashboard/settings' },
            ].map((link) => (
              <Button
                key={link.path}
                size="small"
                onClick={() => router.push(link.path)}
                sx={{
                  fontSize: '0.75rem',
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' },
                }}
              >
                {link.label}
              </Button>
            ))}
          </Box>
        </Box>

        {/* Powered by jpumki */}
        <Typography
          variant="caption"
          sx={{
            color: 'text.disabled',
            mt: 3,
            display: 'block',
            fontSize: '0.7rem',
          }}
        >
          Powered by{' '}
          <Typography
            component="a"
            href="https://jpumki.com"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: 'primary.main',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: 'inherit',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            jpumki software
          </Typography>
        </Typography>
      </MotionPaper>
    </Box>
  );
}
