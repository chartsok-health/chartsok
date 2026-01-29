'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Card,
  CardContent,
  Chip,
  Avatar,
  IconButton,
  Divider,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { motion } from 'framer-motion';
import MicIcon from '@mui/icons-material/Mic';
import HistoryIcon from '@mui/icons-material/History';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useAuth } from '@/lib/AuthContext';

const MotionCard = motion.create(Card);
const MotionBox = motion.create(Box);

// Mock data
const todayRecords = [
  { id: '1', time: '14:30', diagnosis: '급성 편도염', patient: '여/32세', status: 'completed', duration: '5:23' },
  { id: '2', time: '13:15', diagnosis: '급성 기관지염', patient: '남/45세', status: 'completed', duration: '8:12' },
  { id: '3', time: '11:00', diagnosis: '알레르기성 비염', patient: '여/28세', status: 'completed', duration: '4:56' },
  { id: '4', time: '09:30', diagnosis: '고혈압 추적', patient: '남/58세', status: 'completed', duration: '6:30' },
];

const weeklyStats = [
  { day: '월', count: 12 },
  { day: '화', count: 15 },
  { day: '수', count: 8 },
  { day: '목', count: 18 },
  { day: '금', count: 14 },
  { day: '토', count: 6 },
  { day: '일', count: 0 },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();

  const stats = [
    {
      label: '오늘 진료',
      value: '4',
      change: '+2',
      trend: 'up',
      icon: MicIcon,
      color: '#4B9CD3',
      bgColor: '#EBF5FF',
    },
    {
      label: '이번 주',
      value: '73',
      change: '+12%',
      trend: 'up',
      icon: CalendarTodayIcon,
      color: '#10B981',
      bgColor: '#ECFDF5',
    },
    {
      label: '평균 진료 시간',
      value: '5:42',
      change: '-23%',
      trend: 'down',
      icon: AccessTimeIcon,
      color: '#F59E0B',
      bgColor: '#FFFBEB',
    },
    {
      label: '시간 절감',
      value: '73%',
      change: '+5%',
      trend: 'up',
      icon: TrendingUpIcon,
      color: '#8B5CF6',
      bgColor: '#F5F3FF',
    },
  ];

  const maxCount = Math.max(...weeklyStats.map((s) => s.count));

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1600, mx: 'auto' }}>
      {/* Header */}
      <MotionBox
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{ mb: 4 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: 'secondary.main', mb: 0.5 }}>
              안녕하세요, {user?.displayName || '선생님'} 👋
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              오늘 하루도 ChartSok과 함께 효율적인 진료를 시작하세요.
            </Typography>
          </Box>
          <Button
            variant="contained"
            size="large"
            startIcon={<MicIcon />}
            onClick={() => router.push('/dashboard/record')}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 3,
              fontWeight: 700,
              boxShadow: '0 8px 24px rgba(75, 156, 211, 0.3)',
              background: 'linear-gradient(135deg, #4B9CD3 0%, #3A7BA8 100%)',
              '&:hover': {
                boxShadow: '0 12px 32px rgba(75, 156, 211, 0.4)',
              },
            }}
          >
            새 진료 시작
          </Button>
        </Box>
      </MotionBox>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? TrendingUpIcon : TrendingDownIcon;
          return (
            <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={index}>
              <MotionCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                elevation={0}
                sx={{
                  border: '1px solid',
                  borderColor: 'grey.200',
                  borderRadius: 4,
                  overflow: 'visible',
                  '&:hover': {
                    borderColor: stat.color,
                    boxShadow: `0 8px 24px ${stat.color}20`,
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 3,
                        bgcolor: stat.bgColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Icon sx={{ fontSize: 24, color: stat.color }} />
                    </Box>
                    <Chip
                      icon={<TrendIcon sx={{ fontSize: 14 }} />}
                      label={stat.change}
                      size="small"
                      sx={{
                        bgcolor: stat.trend === 'up' ? '#ECFDF5' : '#FEF2F2',
                        color: stat.trend === 'up' ? '#10B981' : '#EF4444',
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        '& .MuiChip-icon': {
                          color: stat.trend === 'up' ? '#10B981' : '#EF4444',
                        },
                      }}
                    />
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: 'secondary.main', mb: 0.5 }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {stat.label}
                  </Typography>
                </CardContent>
              </MotionCard>
            </Grid>
          );
        })}
      </Grid>

      <Grid container spacing={3}>
        {/* Weekly Chart */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            elevation={0}
            sx={{
              border: '1px solid',
              borderColor: 'grey.200',
              borderRadius: 4,
              height: '100%',
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'secondary.main' }}>
                    주간 진료 현황
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    이번 주 총 73건의 진료를 완료했습니다
                  </Typography>
                </Box>
                <Button
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => router.push('/dashboard/history')}
                >
                  상세 보기
                </Button>
              </Box>

              {/* Simple Bar Chart */}
              <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 200, mt: 4 }}>
                {weeklyStats.map((day, index) => (
                  <Box
                    key={day.day}
                    sx={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                      {day.count}
                    </Typography>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(day.count / maxCount) * 140}px` }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      style={{
                        width: '100%',
                        background: index === new Date().getDay() - 1
                          ? 'linear-gradient(180deg, #4B9CD3 0%, #3A7BA8 100%)'
                          : '#E2E8F0',
                        borderRadius: 8,
                        minHeight: 8,
                      }}
                    />
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: index === new Date().getDay() - 1 ? 700 : 500,
                        color: index === new Date().getDay() - 1 ? 'primary.main' : 'text.secondary',
                      }}
                    >
                      {day.day}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </MotionCard>
        </Grid>

        {/* AI Insights */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            elevation={0}
            sx={{
              border: '1px solid',
              borderColor: 'grey.200',
              borderRadius: 4,
              height: '100%',
              background: 'linear-gradient(135deg, #4B9CD3 0%, #3A7BA8 100%)',
              color: 'white',
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <AutoAwesomeIcon />
                <Typography variant="overline" sx={{ fontWeight: 700, letterSpacing: 1 }}>
                  AI 인사이트
                </Typography>
              </Box>

              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                이번 주 성과 분석
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.15)', borderRadius: 2 }}>
                  <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                    차트 작성 시간
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                    <Typography variant="h5" sx={{ fontWeight: 800 }}>
                      4.2시간
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      절감
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.15)', borderRadius: 2 }}>
                  <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                    정확도
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="h5" sx={{ fontWeight: 800 }}>
                      98.5%
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={98.5}
                      sx={{
                        flex: 1,
                        height: 8,
                        borderRadius: 4,
                        bgcolor: 'rgba(255,255,255,0.2)',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: 'white',
                          borderRadius: 4,
                        },
                      }}
                    />
                  </Box>
                </Box>

                <Box sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.15)', borderRadius: 2 }}>
                  <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                    가장 많은 진단
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    급성 상기도 감염
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </MotionCard>
        </Grid>

        {/* Today's Records */}
        <Grid size={{ xs: 12 }}>
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            elevation={0}
            sx={{
              border: '1px solid',
              borderColor: 'grey.200',
              borderRadius: 4,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'secondary.main' }}>
                    오늘의 진료 기록
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}
                  </Typography>
                </Box>
                <Button
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => router.push('/dashboard/history')}
                >
                  전체 기록
                </Button>
              </Box>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>시간</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>진단명</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>환자</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>녹음 시간</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>상태</TableCell>
                      <TableCell align="right"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {todayRecords.map((record, index) => (
                      <motion.tr
                        key={record.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.7 + index * 0.05 }}
                        style={{ cursor: 'pointer' }}
                        onClick={() => router.push(`/dashboard/history/${record.id}`)}
                      >
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <AccessTimeIcon sx={{ fontSize: 16, color: 'grey.400' }} />
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              {record.time}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {record.diagnosis}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Avatar sx={{ width: 28, height: 28, bgcolor: 'grey.200', fontSize: '0.75rem' }}>
                              <PersonIcon sx={{ fontSize: 16 }} />
                            </Avatar>
                            <Typography variant="body2">{record.patient}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={record.duration}
                            size="small"
                            sx={{
                              fontFamily: 'monospace',
                              fontWeight: 600,
                              bgcolor: 'grey.100',
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            icon={<CheckCircleIcon sx={{ fontSize: 14 }} />}
                            label="완료"
                            size="small"
                            sx={{
                              bgcolor: '#ECFDF5',
                              color: '#10B981',
                              fontWeight: 600,
                              '& .MuiChip-icon': { color: '#10B981' },
                            }}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <IconButton size="small">
                            <MoreHorizIcon />
                          </IconButton>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {todayRecords.length === 0 && (
                <Box sx={{ textAlign: 'center', py: 6 }}>
                  <LocalHospitalIcon sx={{ fontSize: 48, color: 'grey.300', mb: 2 }} />
                  <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                    오늘 진료 기록이 없습니다
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<MicIcon />}
                    onClick={() => router.push('/dashboard/record')}
                  >
                    첫 진료 시작하기
                  </Button>
                </Box>
              )}
            </CardContent>
          </MotionCard>
        </Grid>
      </Grid>
    </Box>
  );
}
