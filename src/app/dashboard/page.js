'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  Avatar,
  Card,
  CardContent,
} from '@mui/material';
import { motion } from 'framer-motion';
import MicIcon from '@mui/icons-material/Mic';
import HistoryIcon from '@mui/icons-material/History';
import SettingsIcon from '@mui/icons-material/Settings';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { useAuth } from '@/lib/AuthContext';

const MotionCard = motion.create(Card);

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography>로딩 중...</Typography>
      </Box>
    );
  }

  if (!user) {
    return null;
  }

  const stats = [
    { label: '이번 달 진료', value: '0', icon: MicIcon, color: '#4B9CD3' },
    { label: '총 진료 기록', value: '0', icon: HistoryIcon, color: '#10B981' },
    { label: '시간 절감', value: '0%', icon: TrendingUpIcon, color: '#F59E0B' },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50', py: 4 }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 4,
          }}
        >
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, color: 'secondary.main', mb: 0.5 }}>
              안녕하세요, {user.displayName || '선생님'}!
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              오늘도 좋은 하루 되세요.
            </Typography>
          </Box>
          <Button
            variant="outlined"
            onClick={() => router.push('/')}
            sx={{ borderRadius: 2 }}
          >
            홈으로
          </Button>
        </Box>

        {/* Stats */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
                <MotionCard
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  elevation={0}
                  sx={{
                    border: '1px solid',
                    borderColor: 'grey.200',
                    borderRadius: 3,
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: 2,
                          bgcolor: `${stat.color}15`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Icon sx={{ fontSize: 28, color: stat.color }} />
                      </Box>
                      <Box>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: 'secondary.main' }}>
                          {stat.value}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {stat.label}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </MotionCard>
              </Grid>
            );
          })}
        </Grid>

        {/* Quick Actions */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'grey.200',
            textAlign: 'center',
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              bgcolor: 'primary.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 3,
            }}
          >
            <MicIcon sx={{ fontSize: 40, color: 'white' }} />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 700, color: 'secondary.main', mb: 1 }}>
            새 진료 시작하기
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3, maxWidth: 400, mx: 'auto' }}>
            녹음 버튼을 눌러 진료를 시작하세요. AI가 실시간으로 차트를 생성합니다.
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<MicIcon />}
            sx={{
              px: 5,
              py: 1.5,
              borderRadius: 3,
              fontSize: '1rem',
            }}
          >
            진료 시작
          </Button>
        </Paper>

        {/* Coming Soon Notice */}
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            서비스 준비 중입니다. 곧 더 많은 기능이 추가됩니다.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
