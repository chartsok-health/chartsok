'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Box, Typography } from '@mui/material';
import { useAuth } from '@/lib/AuthContext';

// Dynamically import the loading animation with no SSR to avoid hydration issues
const LoadingAnimation = dynamic(() => import('./LoadingAnimation'), {
  ssr: false,
  loading: () => (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#F8FAFC',
      }}
    >
      <Typography sx={{ color: '#4B9CD3', fontWeight: 800 }}>chartsok</Typography>
    </Box>
  ),
});

export default function AuthGuard({ children }) {
  const { user, userProfile, loading } = useAuth();
  const router = useRouter();
  const [minLoadingComplete, setMinLoadingComplete] = useState(false);

  // Minimum loading time to show the animation (3 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinLoadingComplete(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading && minLoadingComplete) {
      if (!user) {
        // Not logged in - redirect to home
        router.push('/');
      } else if (userProfile && !userProfile.onBoarded) {
        // Logged in but not onboarded - redirect to onboarding
        router.push('/onboarding');
      }
    }
  }, [user, userProfile, loading, minLoadingComplete, router]);

  // Show loading animation while auth is loading OR minimum time hasn't passed
  if (loading || !minLoadingComplete) {
    return <LoadingAnimation />;
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
