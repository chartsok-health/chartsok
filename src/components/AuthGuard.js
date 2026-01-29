'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, CircularProgress, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useAuth } from '@/lib/AuthContext';

const MotionBox = motion.create(Box);

export default function AuthGuard({ children }) {
  const { user, userProfile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // Not logged in - redirect to home
        router.push('/');
      } else if (userProfile && !userProfile.onBoarded) {
        // Logged in but not onboarded - redirect to onboarding
        router.push('/onboarding');
      }
    }
  }, [user, userProfile, loading, router]);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#F8FAFC',
          gap: 3,
        }}
      >
        <MotionBox
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #4B9CD3 0%, #3A7BA8 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(75, 156, 211, 0.3)',
            }}
          >
            <AutoAwesomeIcon sx={{ fontSize: 32, color: 'white' }} />
          </Box>
        </MotionBox>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: 'secondary.main', mb: 0.5 }}>
            ChartSok
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            로딩 중...
          </Typography>
        </Box>
        <CircularProgress size={24} sx={{ color: 'primary.main' }} />
      </Box>
    );
  }

  // Not logged in
  if (!user) {
    return null;
  }

  // Logged in but not onboarded
  if (userProfile && !userProfile.onBoarded) {
    return null;
  }

  // Logged in and onboarded - show dashboard
  return children;
}
