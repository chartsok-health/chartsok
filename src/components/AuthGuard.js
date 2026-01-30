'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, CircularProgress, Typography } from '@mui/material';
import { motion } from 'framer-motion';
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
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Box
            sx={{
              px: 2.5,
              py: 1.5,
              borderRadius: 2,
              bgcolor: '#56A3D9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(86, 163, 217, 0.3)',
            }}
          >
            <Typography sx={{ color: 'white', fontWeight: 800, fontSize: '1.5rem' }}>
              차트쏙
            </Typography>
          </Box>
        </MotionBox>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: 'secondary.main', mb: 0.5 }}>
            chartsok
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
