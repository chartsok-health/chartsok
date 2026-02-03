'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Box, Typography, Paper, Button } from '@mui/material';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import LogoutIcon from '@mui/icons-material/Logout';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
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

function PendingApprovalScreen({ hospitalName, onLogout }) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#F8FAFC',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
      }}
    >
      {/* Logo */}
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box
          sx={{
            px: 1.25,
            py: 0.5,
            borderRadius: 1.5,
            bgcolor: '#56A3D9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography sx={{ color: 'white', fontWeight: 800, fontSize: '0.9rem' }}>
            차트쏙
          </Typography>
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 800, color: '#1E293B' }}>
          chartsok
        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={{
          maxWidth: 480,
          width: '100%',
          borderRadius: 4,
          border: '1px solid',
          borderColor: 'grey.200',
          overflow: 'hidden',
          textAlign: 'center',
        }}
      >
        <Box sx={{ p: 5 }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 3,
              boxShadow: '0 8px 30px rgba(245, 158, 11, 0.3)',
            }}
          >
            <HourglassTopIcon sx={{ fontSize: 40, color: 'white' }} />
          </Box>

          <Typography variant="h5" sx={{ fontWeight: 800, color: '#1E293B', mb: 1.5 }}>
            승인 대기 중
          </Typography>

          <Typography variant="body1" sx={{ color: '#64748B', mb: 3, lineHeight: 1.8 }}>
            {hospitalName && (
              <Box component="span" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, mb: 1 }}>
                <LocalHospitalIcon sx={{ fontSize: 18, color: '#4B9CD3' }} />
                <strong style={{ color: '#1E293B' }}>{hospitalName}</strong>
              </Box>
            )}
            병원 관리자가 가입 요청을 승인하면<br />
            모든 기능을 사용하실 수 있습니다.
          </Typography>

          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: '#FFFBEB',
              border: '1px solid #FDE68A',
              mb: 3,
            }}
          >
            <Typography variant="body2" sx={{ color: '#92400E' }}>
              관리자에게 승인을 요청해 주세요.
              승인이 완료되면 자동으로 접속됩니다.
            </Typography>
          </Box>

          <Button
            variant="outlined"
            color="inherit"
            startIcon={<LogoutIcon />}
            onClick={onLogout}
            sx={{
              borderRadius: 2,
              color: '#64748B',
              borderColor: '#E2E8F0',
              '&:hover': { borderColor: '#CBD5E1', bgcolor: '#F8FAFC' },
            }}
          >
            로그아웃
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default function AuthGuard({ children }) {
  const { user, userProfile, loading, logout } = useAuth();
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

  // Logged in and onboarded but pending approval
  if (userProfile?.approvalStatus === 'pending') {
    return (
      <PendingApprovalScreen
        hospitalName={userProfile.hospitalName}
        onLogout={async () => {
          await logout();
          router.push('/');
        }}
      />
    );
  }

  // Logged in and onboarded and approved - show dashboard
  return children;
}
