'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Box,
  Typography,
  Paper,
  Button,
  IconButton,
  Chip,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Card,
  CardContent,
  Grid,
  Tabs,
  Tab,
  Skeleton,
} from '@mui/material';
import { motion } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import MicIcon from '@mui/icons-material/Mic';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import TimerIcon from '@mui/icons-material/Timer';
import { useAuth } from '@/lib/AuthContext';
import { formatCountdown, getSecondsUntilDeletion } from '@/lib/helpers';

const MotionPaper = motion.create(Paper);
const MotionCard = motion.create(Card);
const MotionBox = motion.create(Box);

export default function HistoryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const patientIdParam = searchParams.get('patientId');
  const patientNameParam = searchParams.get('patientName');

  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [stats, setStats] = useState({ today: 0, week: 0, month: 0 });
  const [, setTick] = useState(0); // For countdown refresh

  // Fetch sessions from API
  useEffect(() => {
    async function fetchSessions() {
      try {
        setLoading(true);
        let url = '/api/sessions?limit=100';

        if (patientIdParam) {
          url += `&patientId=${patientIdParam}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        if (data.sessions) {
          setHistoryData(data.sessions);

          // Calculate stats
          const today = new Date().toISOString().split('T')[0];
          const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
          const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

          const todayCount = data.sessions.filter(s => s.date === today).length;
          const weekCount = data.sessions.filter(s => s.date >= weekAgo).length;
          const monthCount = data.sessions.filter(s => s.date >= monthAgo).length;

          setStats({ today: todayCount, week: weekCount, month: monthCount });
        }
      } catch (error) {
        console.error('Error fetching sessions:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchSessions();
  }, [patientIdParam]);

  // Update countdown every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTick((t) => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Clear patient filter
  const handleClearPatientFilter = () => {
    router.push('/dashboard/history');
  };

  const handleMenuOpen = (event, id) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedId(null);
  };

  const filteredData = historyData.filter((item) => {
    // Filter by search query
    const diagnosis = item.diagnosis || '';
    const icdCode = item.icdCode || '';
    const patientName = item.patientName || '';

    return (
      diagnosis.toLowerCase().includes(searchQuery.toLowerCase()) ||
      icdCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patientName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    if (dateStr === today) return '오늘';
    if (dateStr === yesterday) return '어제';
    return dateStr.replace(/-/g, '.');
  };

  const statCards = [
    { label: '오늘', value: `${stats.today}건`, icon: CalendarTodayIcon, color: '#4B9CD3', bgColor: '#EBF5FF' },
    { label: '이번 주', value: `${stats.week}건`, icon: TrendingUpIcon, color: '#10B981', bgColor: '#ECFDF5' },
    { label: '이번 달', value: `${stats.month}건`, icon: LocalHospitalIcon, color: '#F59E0B', bgColor: '#FFFBEB' },
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1600, mx: 'auto' }}>
      {/* Header */}
      <MotionBox
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{ mb: 4 }}
      >
        {/* Patient Filter Banner */}
        {patientIdParam && patientNameParam && (
          <Paper
            elevation={0}
            sx={{
              p: 2,
              mb: 3,
              borderRadius: 3,
              bgcolor: 'primary.50',
              border: '1px solid',
              borderColor: 'primary.200',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: 2,
                  bgcolor: 'primary.100',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <PersonIcon sx={{ color: 'primary.main' }} />
              </Box>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'primary.main' }}>
                  {decodeURIComponent(patientNameParam)} 환자의 진료 기록
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  총 {filteredData.length}건의 진료 기록이 있습니다
                </Typography>
              </Box>
            </Box>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={handleClearPatientFilter}
              sx={{
                borderRadius: 2,
                borderColor: 'primary.200',
                color: 'primary.main',
                '&:hover': {
                  borderColor: 'primary.main',
                  bgcolor: 'primary.100',
                },
              }}
            >
              전체 기록 보기
            </Button>
          </Paper>
        )}

        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: 'secondary.main', mb: 0.5 }}>
              진료 기록
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              {patientIdParam ? `${decodeURIComponent(patientNameParam || '')} 환자의 진료 내역` : '과거 진료 내역을 조회하고 관리할 수 있습니다'}
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<MicIcon />}
            onClick={() => {
              if (patientIdParam && patientNameParam) {
                router.push(`/dashboard/record?patientId=${patientIdParam}&patientName=${patientNameParam}`);
              } else {
                router.push('/dashboard/record');
              }
            }}
            sx={{
              px: 3,
              py: 1.5,
              borderRadius: 3,
              fontWeight: 700,
            }}
          >
            새 진료 시작
          </Button>
        </Box>
      </MotionBox>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Grid size={{ xs: 12, sm: 4 }} key={index}>
              <MotionCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                elevation={0}
                sx={{
                  border: '1px solid',
                  borderColor: 'grey.200',
                  borderRadius: 3,
                }}
              >
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
                    <Icon sx={{ color: stat.color }} />
                  </Box>
                  <Box>
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
              </MotionCard>
            </Grid>
          );
        })}
      </Grid>

      {/* Empty State - Show when no data at all */}
      {!loading && historyData.length === 0 && (
        <MotionPaper
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          elevation={0}
          sx={{
            borderRadius: 4,
            border: '1px solid',
            borderColor: 'grey.200',
            overflow: 'hidden',
            textAlign: 'center',
            py: 8,
            px: 4,
          }}
        >
          <Box
            sx={{
              width: 100,
              height: 100,
              borderRadius: '50%',
              bgcolor: 'primary.50',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 3,
            }}
          >
            <LocalHospitalIcon sx={{ fontSize: 48, color: 'primary.main' }} />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 700, color: 'secondary.main', mb: 1 }}>
            진료 기록이 없습니다
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, maxWidth: 400, mx: 'auto' }}>
            첫 번째 진료를 시작하여 AI가 자동으로 차트를 작성하는 것을 경험해보세요
          </Typography>
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
              background: 'linear-gradient(135deg, #4B9CD3 0%, #3A7BA8 100%)',
              boxShadow: '0 4px 14px rgba(75, 156, 211, 0.4)',
            }}
          >
            새 진료 시작
          </Button>
        </MotionPaper>
      )}

      {/* Main Table Card - Only show when there's data */}
      {(loading || historyData.length > 0) && (
        <MotionPaper
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          elevation={0}
          sx={{
            borderRadius: 4,
            border: '1px solid',
            borderColor: 'grey.200',
            overflow: 'hidden',
          }}
        >
          {/* Tabs & Search */}
          <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'grey.100' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
              <Tabs
                value={tabValue}
                onChange={(e, v) => setTabValue(v)}
                sx={{
                  minHeight: 40,
                  '& .MuiTab-root': {
                    minHeight: 40,
                    textTransform: 'none',
                    fontWeight: 600,
                  },
                }}
              >
                <Tab label="전체" />
                <Tab label="오늘" />
                <Tab label="이번 주" />
                <Tab label="이번 달" />
              </Tabs>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  placeholder="진단명 또는 환자명 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  size="small"
                  sx={{ minWidth: 280 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: 'grey.400' }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button variant="outlined" startIcon={<FilterListIcon />}>
                  필터
                </Button>
              </Box>
            </Box>
          </Box>

          {/* Table */}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: 'grey.50' }}>
                  <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>날짜</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>시간</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>환자</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>진단명</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>ICD 코드</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>대화 기록 삭제</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  // Loading skeleton
                  [...Array(5)].map((_, index) => (
                    <TableRow key={index}>
                      <TableCell><Skeleton variant="rounded" width={60} height={24} /></TableCell>
                      <TableCell><Skeleton variant="text" width={50} /></TableCell>
                      <TableCell><Skeleton variant="circular" width={28} height={28} /></TableCell>
                      <TableCell><Skeleton variant="text" width={120} /></TableCell>
                      <TableCell><Skeleton variant="rounded" width={60} height={24} /></TableCell>
                      <TableCell><Skeleton variant="rounded" width={80} height={24} /></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  ))
                ) : filteredData.length === 0 ? (
                  // No search results
                  <TableRow>
                    <TableCell colSpan={7} sx={{ py: 6, textAlign: 'center' }}>
                      <SearchIcon sx={{ fontSize: 48, color: 'grey.300', mb: 1 }} />
                      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        검색 결과가 없습니다
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'grey.400' }}>
                        다른 검색어를 입력해 보세요
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <motion.tr
                        key={row.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.03 }}
                        style={{ cursor: 'pointer' }}
                        onClick={() => router.push(`/dashboard/history/${row.id}`)}
                      >
                        <TableCell>
                          <Chip
                            label={formatDate(row.date)}
                            size="small"
                            sx={{
                              fontWeight: 600,
                              bgcolor: formatDate(row.date) === '오늘' ? 'primary.main' : 'grey.100',
                              color: formatDate(row.date) === '오늘' ? 'white' : 'text.primary',
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <AccessTimeIcon sx={{ fontSize: 16, color: 'grey.400' }} />
                            <Typography variant="body2">{row.time || '-'}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Avatar
                              sx={{
                                width: 28,
                                height: 28,
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                background: row.patientGender === '여'
                                  ? 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)'
                                  : 'linear-gradient(135deg, #4B9CD3 0%, #3A7BA8 100%)',
                              }}
                            >
                              {(row.patientName || '?').charAt(0)}
                            </Avatar>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              {row.patientName || 'Unknown'}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {row.diagnosis || '-'}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {row.icdCode ? (
                            <Chip
                              label={row.icdCode}
                              size="small"
                              variant="outlined"
                              sx={{ fontFamily: 'monospace', fontWeight: 600 }}
                            />
                          ) : (
                            <Typography variant="body2" sx={{ color: 'grey.400' }}>-</Typography>
                          )}
                        </TableCell>
                        <TableCell>
                          {(() => {
                            const remainingSeconds = getSecondsUntilDeletion(row.createdAt);
                            const isExpired = remainingSeconds <= 0;
                            const isUrgent = remainingSeconds > 0 && remainingSeconds < 3600;
                            return (
                              <Chip
                                icon={<TimerIcon sx={{ fontSize: 14 }} />}
                                label={formatCountdown(remainingSeconds)}
                                size="small"
                                sx={{
                                  fontFamily: 'monospace',
                                  fontWeight: 600,
                                  bgcolor: isExpired ? 'grey.200' : isUrgent ? 'error.50' : 'warning.50',
                                  color: isExpired ? 'grey.500' : isUrgent ? 'error.main' : 'warning.main',
                                  '& .MuiChip-icon': {
                                    color: isExpired ? 'grey.400' : isUrgent ? 'error.main' : 'warning.main',
                                  },
                                }}
                              />
                            );
                          })()}
                        </TableCell>
                        <TableCell align="right">
                          <IconButton size="small" onClick={(e) => handleMenuOpen(e, row.id)}>
                            <MoreVertIcon />
                          </IconButton>
                        </TableCell>
                      </motion.tr>
                    ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {filteredData.length > 0 && (
            <TablePagination
              component="div"
              count={filteredData.length}
              page={page}
              onPageChange={(e, newPage) => setPage(newPage)}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={(e) => {
                setRowsPerPage(parseInt(e.target.value, 10));
                setPage(0);
              }}
              labelRowsPerPage="페이지당 행:"
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} / ${count}`}
              sx={{ borderTop: '1px solid', borderColor: 'grey.100' }}
            />
          )}
        </MotionPaper>
      )}

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{ sx: { borderRadius: 2, minWidth: 180, boxShadow: '0 8px 24px rgba(0,0,0,0.12)' } }}
      >
        <MenuItem onClick={() => { router.push(`/dashboard/history/${selectedId}`); handleMenuClose(); }}>
          <ListItemIcon><VisibilityIcon fontSize="small" /></ListItemIcon>
          <ListItemText>상세 보기</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon><ContentCopyIcon fontSize="small" /></ListItemIcon>
          <ListItemText>차트 복사</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon><DownloadIcon fontSize="small" /></ListItemIcon>
          <ListItemText>PDF 다운로드</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
          <ListItemIcon><DeleteIcon fontSize="small" sx={{ color: 'error.main' }} /></ListItemIcon>
          <ListItemText>삭제</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
}
