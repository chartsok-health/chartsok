'use client';

import { useState, useEffect } from 'react';
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
  Skeleton,
  CircularProgress,
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
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ChecklistIcon from '@mui/icons-material/Checklist';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useAuth } from '@/lib/AuthContext';
import { formatDuration } from '@/lib/helpers';

const MotionCard = motion.create(Card);
const MotionBox = motion.create(Box);

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
  const { user, userProfile, loading: authLoading } = useAuth();
  const router = useRouter();
  const [todayRecords, setTodayRecords] = useState([]);
  const [pendingActions, setPendingActions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [displayName, setDisplayName] = useState('');
  const [stats, setStats] = useState({
    todayCount: 0,
    weekCount: 0,
    monthCount: 0,
    avgDuration: 0,
    avgDurationFormatted: '0:00',
    timeSavedHours: '0',
    timeSavedPercent: '0%',
    dailyAverage: '0',
    busiestDay: '-',
    weekChange: '+0%',
    topDiagnosis: '-',
    accuracy: '0%',
  });
  const [weeklyStats, setWeeklyStats] = useState([
    { day: '월', count: 0 },
    { day: '화', count: 0 },
    { day: '수', count: 0 },
    { day: '목', count: 0 },
    { day: '금', count: 0 },
    { day: '토', count: 0 },
    { day: '일', count: 0 },
  ]);

  // Fetch user settings for displayName
  useEffect(() => {
    async function fetchSettings() {
      if (!user?.uid) return;
      try {
        const response = await fetch(`/api/settings?userId=${user.uid}`);
        if (response.ok) {
          const data = await response.json();
          if (data.settings?.displayName) {
            setDisplayName(data.settings.displayName);
          }
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    }
    fetchSettings();
  }, [user?.uid]);

  // Fetch dashboard stats from API
  useEffect(() => {
    // Wait for auth to finish loading
    if (authLoading) return;

    async function fetchData() {
      // Wait for userProfile to be available to get hospitalId
      if (!userProfile?.hospitalId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        // Fetch comprehensive stats from dashboard stats API with hospitalId
        const statsResponse = await fetch(`/api/dashboard/stats?hospitalId=${userProfile.hospitalId}`);
        const statsData = await statsResponse.json();

        if (statsData) {
          // Update stats
          setStats({
            todayCount: statsData.todayCount || 0,
            weekCount: statsData.weekCount || 0,
            monthCount: statsData.monthCount || 0,
            avgDuration: statsData.avgDuration || 0,
            avgDurationFormatted: statsData.avgDurationFormatted || '0:00',
            timeSavedHours: statsData.timeSavedHours || '0',
            timeSavedPercent: statsData.timeSavedPercent || '0%',
            dailyAverage: statsData.dailyAverage || '0',
            busiestDay: statsData.busiestDay || '-',
            weekChange: statsData.weekChange || '+0%',
            topDiagnosis: statsData.topDiagnosis || '-',
            accuracy: statsData.accuracy || '0%',
          });

          // Update weekly data for bar chart
          if (statsData.weeklyData && statsData.weeklyData.length > 0) {
            setWeeklyStats(statsData.weeklyData);
          }

          // Set today's sessions for the list
          if (statsData.todaySessions && statsData.todaySessions.length > 0) {
            const records = statsData.todaySessions.map((session) => {
              const gender = session.patientGender || '';
              const age = session.patientAge || '';
              const patientInfo = gender || age ? `${gender}${gender && age ? '/' : ''}${age}` : '';

              return {
                id: session.id,
                time: session.time || '',
                patient: session.patientName || '환자',
                patientInfo,
                diagnosis: session.diagnosis || '',
                duration: session.durationFormatted || formatDuration(session.duration || 0),
                status: session.status,
              };
            });
            setTodayRecords(records);

            // Extract pending (incomplete) follow-up actions
            const allPending = [];
            statsData.todaySessions.forEach((session) => {
              if (Array.isArray(session.followUpActions)) {
                session.followUpActions.forEach((action) => {
                  if (!action.completed) {
                    allPending.push({
                      text: action.text,
                      patientName: session.patientName || '환자',
                      sessionId: session.id,
                    });
                  }
                });
              }
            });
            setPendingActions(allPending);
          }
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [authLoading, userProfile?.hospitalId]);

  const greeting = displayName || userProfile?.doctorName || user?.displayName || '선생님';

  const statCards = [
    {
      label: '오늘 진료',
      value: stats.todayCount.toString(),
      change: stats.weekChange,
      trend: stats.weekChange.startsWith('+') ? 'up' : 'down',
      icon: MicIcon,
      color: '#4B9CD3',
      bgColor: '#EBF5FF',
    },
    {
      label: '이번 주',
      value: stats.weekCount.toString(),
      change: stats.weekChange,
      trend: stats.weekChange.startsWith('+') ? 'up' : 'down',
      icon: CalendarTodayIcon,
      color: '#10B981',
      bgColor: '#ECFDF5',
    },
    {
      label: '평균 진료 시간',
      value: stats.avgDurationFormatted,
      change: '',
      trend: 'neutral',
      icon: AccessTimeIcon,
      color: '#F59E0B',
      bgColor: '#FFFBEB',
    },
    {
      label: '시간 절감',
      value: `${stats.timeSavedHours}시간`,
      change: stats.timeSavedPercent,
      trend: 'up',
      icon: TrendingUpIcon,
      color: '#EC4899',
      bgColor: '#FDF2F8',
    },
  ];

  const maxCount = Math.max(...weeklyStats.map((s) => s.count), 1);

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
                  안녕하세요, {greeting} 👋
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  녹음 → 차트 → 안내문 → 후속 조치까지, chartsok이 함께합니다.
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
        {statCards.map((stat, index) => {
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
                      {loading ? (
                        <Skeleton variant="text" width={60} height={40} />
                      ) : (
                        <Typography variant="h4" sx={{ fontWeight: 800, color: 'secondary.main' }}>
                          {stat.value}
                        </Typography>
                      )}
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {stat.label}
                      </Typography>
                    </Box>
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
            <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'secondary.main' }}>
                    주간 진료 현황
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    이번 주 총 <strong>{stats.weekCount}</strong>건의 진료를 완료했습니다
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
              <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: { xs: 1.5, md: 3 }, height: 120, px: 2 }}>
                {weeklyStats.map((day, index) => {
                  // getDay() returns 0 for Sunday, 1 for Monday, etc.
                  // Our array is Mon-Sun (0-6), so Monday=0 means getDay()-1, Sunday=6 means getDay()=0
                  const dayOfWeek = new Date().getDay();
                  const todayIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
                  const isToday = index === todayIndex;
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
                        animate={{ height: `${(day.count / maxCount) * 80}px` }}
                        transition={{ duration: 0.6, delay: index * 0.08, ease: 'easeOut' }}
                        style={{
                          width: '100%',
                          maxWidth: 60,
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

              {/* Weekly Stats Summary */}
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  pt: 2,
                  mt: 2,
                  borderTop: '1px solid',
                  borderColor: 'grey.100',
                }}
              >
                <Box sx={{ flex: 1, textAlign: 'center' }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                    일 평균
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: 'secondary.main' }}>
                    {stats.dailyAverage}건
                  </Typography>
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box sx={{ flex: 1, textAlign: 'center' }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                    최다 요일
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#4B9CD3' }}>
                    {stats.busiestDay && stats.busiestDay !== '-' ? `${stats.busiestDay}요일` : '-'}
                  </Typography>
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box sx={{ flex: 1, textAlign: 'center' }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                    지난주 대비
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 800,
                      color: !stats.weekChange || stats.weekChange === '+0%' || stats.weekChange === '0%'
                        ? 'text.secondary'
                        : stats.weekChange.startsWith('+') ? '#10B981' : '#EF4444',
                    }}
                  >
                    {stats.weekChange || '-'}
                  </Typography>
                </Box>
              </Box>

              {/* Quick Actions */}
              <Box sx={{ display: 'flex', gap: 1.5, mt: 2, pt: 2, borderTop: '1px solid', borderColor: 'grey.100' }}>
                <Button
                  variant="contained"
                  startIcon={<MicIcon />}
                  onClick={() => router.push('/dashboard/record')}
                  sx={{
                    flex: 1,
                    py: 1.2,
                    borderRadius: 2,
                    fontWeight: 600,
                    background: 'linear-gradient(135deg, #4B9CD3 0%, #3A7BA8 100%)',
                  }}
                >
                  새 진료 시작
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<HistoryIcon />}
                  onClick={() => router.push('/dashboard/history')}
                  sx={{
                    flex: 1,
                    py: 1.2,
                    borderRadius: 2,
                    fontWeight: 600,
                  }}
                >
                  기록 보기
                </Button>
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
            <CardContent sx={{ p: 3, height: '100%' }}>
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

              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, color: 'secondary.main' }}>
                이번 주 성과 분석
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {[
                  {
                    label: '차트 작성 시간',
                    value: stats.timeSavedHours !== '0' ? `${stats.timeSavedHours}시간` : '데이터 없음',
                    sub: stats.timeSavedHours !== '0' ? '절감' : null,
                    color: '#10B981',
                    bgColor: '#ECFDF5',
                  },
                  {
                    label: '정확도',
                    value: stats.accuracy && stats.accuracy !== '0%' ? stats.accuracy : '데이터 없음',
                    progress: stats.accuracy && stats.accuracy !== '0%' ? parseFloat(stats.accuracy) : null,
                    color: '#4B9CD3',
                    bgColor: '#EBF5FF',
                  },
                  {
                    label: '가장 많은 진단',
                    value: stats.topDiagnosis !== '-' ? stats.topDiagnosis : '데이터 없음',
                    sub: null,
                    color: '#F59E0B',
                    bgColor: '#FFFBEB',
                  },
                ].map((item, i) => (
                  <Box
                    key={i}
                    sx={{
                      p: 1.5,
                      bgcolor: item.bgColor,
                      borderRadius: 2,
                    }}
                  >
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, fontSize: '0.7rem' }}>
                      {item.label}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.25 }}>
                      <Typography variant="body1" sx={{ fontWeight: 800, color: item.color }}>
                        {item.value}
                      </Typography>
                      {item.sub && (
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          {item.sub}
                        </Typography>
                      )}
                      {item.progress && (
                        <LinearProgress
                          variant="determinate"
                          value={item.progress}
                          sx={{
                            flex: 1,
                            height: 5,
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

        {/* Pending Actions */}
        {pendingActions.length > 0 && (
          <Grid size={{ xs: 12 }}>
            <CleanCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.55 }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: 2,
                        bgcolor: '#FFFBEB',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <ChecklistIcon sx={{ fontSize: 18, color: '#F59E0B' }} />
                    </Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'secondary.main' }}>
                      미완료 후속 조치
                    </Typography>
                    <Chip
                      label={`${pendingActions.length}건`}
                      size="small"
                      sx={{ bgcolor: '#FFFBEB', color: '#F59E0B', fontWeight: 700, fontSize: '0.75rem' }}
                    />
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {pendingActions.slice(0, 5).map((action, index) => (
                    <MotionBox
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      onClick={() => router.push(`/dashboard/history/${action.sessionId}`)}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        py: 1,
                        px: 2,
                        borderRadius: 2,
                        border: '1px solid',
                        borderColor: 'grey.200',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          borderColor: '#F59E0B40',
                          bgcolor: '#FFFBEB',
                        },
                      }}
                    >
                      <RadioButtonUncheckedIcon sx={{ fontSize: 18, color: '#F59E0B' }} />
                      <Typography variant="body2" sx={{ fontWeight: 500, flex: 1 }}>
                        {action.text}
                      </Typography>
                      <Chip
                        label={action.patientName}
                        size="small"
                        sx={{ fontSize: '0.7rem', fontWeight: 600, bgcolor: 'grey.100' }}
                      />
                    </MotionBox>
                  ))}
                  {pendingActions.length > 5 && (
                    <Typography variant="caption" sx={{ color: 'text.secondary', textAlign: 'center', mt: 1 }}>
                      외 {pendingActions.length - 5}건 더 있습니다
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </CleanCard>
          </Grid>
        )}

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

              {loading ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} variant="rounded" height={60} />
                  ))}
                </Box>
              ) : todayRecords.length > 0 ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {todayRecords.map((record, index) => (
                    <MotionBox
                      key={record.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
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
                            bgcolor: record.patientInfo?.includes('여') ? '#F472B6' : '#60A5FA',
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
                          {record.patientInfo && (
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                              {record.patientInfo}
                            </Typography>
                          )}
                        </Box>
                      </Box>

                      {/* Diagnosis */}
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {record.diagnosis || '-'}
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
              ) : (
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
