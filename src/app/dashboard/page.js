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
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useAuth } from '@/lib/AuthContext';

const MotionCard = motion.create(Card);
const MotionBox = motion.create(Box);
const MotionPaper = motion.create(Paper);

// Mock data
const todayRecords = [
  { id: '1', time: '14:30', diagnosis: '급성 편도염', patient: '김영희', patientInfo: '여/32세', status: 'completed', duration: '5:23' },
  { id: '2', time: '13:15', diagnosis: '급성 기관지염', patient: '박철수', patientInfo: '남/45세', status: 'completed', duration: '8:12' },
  { id: '3', time: '11:00', diagnosis: '알레르기성 비염', patient: '이민정', patientInfo: '여/28세', status: 'completed', duration: '4:56' },
  { id: '4', time: '09:30', diagnosis: '고혈압 추적', patient: '정대현', patientInfo: '남/58세', status: 'completed', duration: '6:30' },
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

// Clean Card Component - matching history page style
const CleanCard = ({ children, sx, ...props }) => (
  <MotionCard
    elevation={0}
    sx={{
      background: 'white',
      border: '1px solid',
      borderColor: 'grey.200',
      borderRadius: 3,
      overflow: 'hidden',
      ...sx,
    }}
    {...props}
  >
    {children}
  </MotionCard>
);

export default function DashboardPage() {
  const { user, userProfile } = useAuth();
  const router = useRouter();

  const displayName = userProfile?.doctorName || user?.displayName || '선생님';

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
      color: '#EC4899',
      bgColor: '#FDF2F8',
    },
  ];

  const maxCount = Math.max(...weeklyStats.map((s) => s.count));

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1600, mx: 'auto' }}>
      {/* Header with CTA */}
      <MotionBox
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{ mb: 4 }}
      >
        <CleanCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          sx={{
            background: 'linear-gradient(135deg, #4B9CD3 0%, #3A7BA8 100%)',
            color: 'white',
            border: 'none',
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Grid container alignItems="center" spacing={3}>
              <Grid size={{ xs: 12, md: 8 }}>
                <Typography variant="overline" sx={{ opacity: 0.9, letterSpacing: 2, fontWeight: 600 }}>
                  WELCOME BACK
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
                  안녕하세요, {displayName} 👋
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  오늘 하루도 ChartSok과 함께 효율적인 진료를 시작하세요.
                  AI가 차트 작성을 도와드립니다.
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<PlayArrowIcon />}
                  onClick={() => router.push('/dashboard/record')}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    fontWeight: 700,
                    fontSize: '1rem',
                    color: 'white',
                    borderColor: 'rgba(255, 255, 255, 0.6)',
                    borderWidth: 2,
                    backdropFilter: 'blur(10px)',
                    background: 'rgba(255, 255, 255, 0.1)',
                    '&:hover': {
                      borderColor: 'white',
                      background: 'rgba(255, 255, 255, 0.2)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.2s ease',
                  }}
                >
                  새 진료 시작
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </CleanCard>
      </MotionBox>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? TrendingUpIcon : TrendingDownIcon;
          return (
            <Grid size={{ xs: 6, lg: 3 }} key={index}>
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
              >
                <CleanCard sx={{ height: '100%' }}>
                  <CardContent sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        bgcolor: stat.bgColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Icon sx={{ fontSize: 24, color: stat.color }} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h4" sx={{ fontWeight: 800, color: 'secondary.main' }}>
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {stat.label}
                      </Typography>
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
                  </CardContent>
                </CleanCard>
              </MotionBox>
            </Grid>
          );
        })}
      </Grid>

      <Grid container spacing={3}>
        {/* Weekly Chart */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <CleanCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            sx={{ height: '100%' }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'secondary.main' }}>
                    주간 진료 현황
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    이번 주 총 <strong>73건</strong>의 진료를 완료했습니다
                  </Typography>
                </Box>
                <Button
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => router.push('/dashboard/history')}
                  sx={{ fontWeight: 600 }}
                >
                  상세 보기
                </Button>
              </Box>

              {/* Bar Chart */}
              <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: { xs: 1, md: 2 }, height: 160, mt: 3, px: 1 }}>
                {weeklyStats.map((day, index) => {
                  const isToday = index === new Date().getDay() - 1;
                  return (
                    <Box
                      key={day.day}
                      sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 0.5,
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: 600,
                          color: isToday ? '#4B9CD3' : 'text.secondary',
                          fontSize: { xs: '0.7rem', md: '0.8rem' },
                        }}
                      >
                        {day.count}
                      </Typography>
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${(day.count / maxCount) * 110}px` }}
                        transition={{ duration: 0.6, delay: index * 0.08, ease: 'easeOut' }}
                        style={{
                          width: '100%',
                          background: isToday ? '#4B9CD3' : '#D6E8F5',
                          borderRadius: 6,
                          minHeight: 4,
                        }}
                      />
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: isToday ? 700 : 500,
                          color: isToday ? '#4B9CD3' : 'text.secondary',
                          fontSize: { xs: '0.75rem', md: '0.85rem' },
                        }}
                      >
                        {day.day}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            </CardContent>
          </CleanCard>
        </Grid>

        {/* AI Insights */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <CleanCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            sx={{ height: '100%' }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: 2,
                    bgcolor: '#F3E8FF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <AutoAwesomeIcon sx={{ fontSize: 18, color: '#9333EA' }} />
                </Box>
                <Typography variant="overline" sx={{ fontWeight: 700, letterSpacing: 1.5, color: 'text.secondary' }}>
                  AI 인사이트
                </Typography>
              </Box>

              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: 'secondary.main' }}>
                이번 주 성과 분석
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[
                  { label: '차트 작성 시간', value: '4.2시간', sub: '절감', color: '#10B981', bgColor: '#ECFDF5' },
                  { label: '정확도', value: '98.5%', progress: 98.5, color: '#4B9CD3', bgColor: '#EBF5FF' },
                  { label: '가장 많은 진단', value: '급성 상기도 감염', sub: null, color: '#F59E0B', bgColor: '#FFFBEB' },
                ].map((item, i) => (
                  <Box
                    key={i}
                    sx={{
                      p: 2,
                      bgcolor: item.bgColor,
                      borderRadius: 2,
                    }}
                  >
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                      {item.label}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                      <Typography variant="h6" sx={{ fontWeight: 800, color: item.color }}>
                        {item.value}
                      </Typography>
                      {item.sub && (
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {item.sub}
                        </Typography>
                      )}
                      {item.progress && (
                        <LinearProgress
                          variant="determinate"
                          value={item.progress}
                          sx={{
                            flex: 1,
                            height: 6,
                            borderRadius: 3,
                            bgcolor: 'white',
                            '& .MuiLinearProgress-bar': {
                              bgcolor: item.color,
                              borderRadius: 3,
                            },
                          }}
                        />
                      )}
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </CleanCard>
        </Grid>

        {/* Today's Records */}
        <Grid size={{ xs: 12 }}>
          <CleanCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
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
                  sx={{ fontWeight: 600 }}
                >
                  전체 기록
                </Button>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {todayRecords.map((record, index) => (
                  <MotionBox
                    key={record.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.7 + index * 0.05 }}
                    whileHover={{ x: 4, backgroundColor: '#F8FAFC' }}
                    onClick={() => router.push(`/dashboard/history/${record.id}`)}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      py: 1.5,
                      px: 2,
                      borderRadius: 2,
                      cursor: 'pointer',
                      border: '1px solid',
                      borderColor: 'grey.200',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        borderColor: 'primary.200',
                      },
                    }}
                  >
                    {/* Time */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, minWidth: 70 }}>
                      <AccessTimeIcon sx={{ fontSize: 14, color: 'grey.400' }} />
                      <Typography variant="body2" sx={{ fontWeight: 600, fontFamily: 'monospace' }}>
                        {record.time}
                      </Typography>
                    </Box>

                    {/* Patient */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 120 }}>
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          bgcolor: record.patientInfo.includes('여') ? '#F472B6' : '#60A5FA',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                        }}
                      >
                        {record.patient.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {record.patient}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          {record.patientInfo}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Diagnosis */}
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {record.diagnosis}
                      </Typography>
                    </Box>

                    {/* Duration */}
                    <Chip
                      label={record.duration}
                      size="small"
                      sx={{
                        fontFamily: 'monospace',
                        fontWeight: 600,
                        bgcolor: 'grey.100',
                      }}
                    />

                    {/* More */}
                    <IconButton size="small" sx={{ color: 'grey.400' }}>
                      <MoreHorizIcon fontSize="small" />
                    </IconButton>
                  </MotionBox>
                ))}
              </Box>

              {todayRecords.length === 0 && (
                <Box sx={{ textAlign: 'center', py: 6 }}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      bgcolor: 'grey.100',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2,
                    }}
                  >
                    <LocalHospitalIcon sx={{ fontSize: 40, color: 'grey.400' }} />
                  </Box>
                  <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                    오늘 진료 기록이 없습니다
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<MicIcon />}
                    onClick={() => router.push('/dashboard/record')}
                    sx={{
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #4B9CD3 0%, #3A7BA8 100%)',
                    }}
                  >
                    첫 진료 시작하기
                  </Button>
                </Box>
              )}
            </CardContent>
          </CleanCard>
        </Grid>
      </Grid>
    </Box>
  );
}
