'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
import { useAuth } from '@/lib/AuthContext';

const MotionPaper = motion.create(Paper);
const MotionCard = motion.create(Card);
const MotionBox = motion.create(Box);

// Mock history data
const mockHistoryData = [
  { id: '1', date: '2024-01-29', time: '14:30', duration: '5:23', diagnosis: '급성 편도염', icdCode: 'J03.9', patientAge: '32세', patientGender: '여' },
  { id: '2', date: '2024-01-29', time: '11:15', duration: '8:45', diagnosis: '급성 기관지염', icdCode: 'J20.9', patientAge: '45세', patientGender: '남' },
  { id: '3', date: '2024-01-28', time: '16:00', duration: '6:12', diagnosis: '본태성 고혈압', icdCode: 'I10', patientAge: '58세', patientGender: '남' },
  { id: '4', date: '2024-01-28', time: '10:30', duration: '4:56', diagnosis: '알레르기성 비염', icdCode: 'J30.4', patientAge: '28세', patientGender: '여' },
  { id: '5', date: '2024-01-27', time: '15:45', duration: '7:30', diagnosis: '급성 위장염', icdCode: 'K52.9', patientAge: '41세', patientGender: '남' },
  { id: '6', date: '2024-01-27', time: '09:00', duration: '5:10', diagnosis: '편두통', icdCode: 'G43.9', patientAge: '35세', patientGender: '여' },
  { id: '7', date: '2024-01-26', time: '14:00', duration: '6:45', diagnosis: '제2형 당뇨병', icdCode: 'E11', patientAge: '52세', patientGender: '남' },
  { id: '8', date: '2024-01-26', time: '11:30', duration: '4:20', diagnosis: '급성 결막염', icdCode: 'H10.3', patientAge: '25세', patientGender: '여' },
];

export default function HistoryPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  const handleMenuOpen = (event, id) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedId(null);
  };

  const filteredData = mockHistoryData.filter(
    (item) =>
      item.diagnosis.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.icdCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (dateStr === today.toISOString().split('T')[0]) return '오늘';
    if (dateStr === yesterday.toISOString().split('T')[0]) return '어제';
    return dateStr.replace(/-/g, '.');
  };

  const stats = [
    { label: '오늘', value: '4건', icon: CalendarTodayIcon, color: '#4B9CD3', bgColor: '#EBF5FF' },
    { label: '이번 주', value: '23건', icon: TrendingUpIcon, color: '#10B981', bgColor: '#ECFDF5' },
    { label: '이번 달', value: '156건', icon: LocalHospitalIcon, color: '#F59E0B', bgColor: '#FFFBEB' },
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
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: 'secondary.main', mb: 0.5 }}>
              진료 기록
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              과거 진료 내역을 조회하고 관리할 수 있습니다
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<MicIcon />}
            onClick={() => router.push('/dashboard/record')}
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
        {stats.map((stat, index) => {
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
                    <Typography variant="h4" sx={{ fontWeight: 800, color: 'secondary.main' }}>
                      {stat.value}
                    </Typography>
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

      {/* Main Table Card */}
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
                placeholder="진단명 또는 ICD 코드 검색..."
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
                <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>진단명</TableCell>
                <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>ICD 코드</TableCell>
                <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>환자</TableCell>
                <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>녹음 시간</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData
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
                        <Typography variant="body2">{row.time}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {row.diagnosis}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={row.icdCode}
                        size="small"
                        variant="outlined"
                        sx={{ fontFamily: 'monospace', fontWeight: 600 }}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar
                          sx={{
                            width: 28,
                            height: 28,
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            bgcolor: row.patientGender === '여' ? '#F472B6' : '#60A5FA',
                          }}
                        >
                          {row.patientGender}
                        </Avatar>
                        <Typography variant="body2">{row.patientAge}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={row.duration}
                        size="small"
                        sx={{ fontFamily: 'monospace', fontWeight: 600, bgcolor: 'grey.100' }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size="small" onClick={(e) => handleMenuOpen(e, row.id)}>
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </motion.tr>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

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
      </MotionPaper>

      {/* Empty State */}
      {filteredData.length === 0 && (
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          sx={{ textAlign: 'center', py: 8 }}
        >
          <LocalHospitalIcon sx={{ fontSize: 64, color: 'grey.300', mb: 2 }} />
          <Typography variant="h6" sx={{ color: 'text.secondary', mb: 1 }}>
            검색 결과가 없습니다
          </Typography>
          <Typography variant="body2" sx={{ color: 'grey.400' }}>
            다른 검색어를 입력해 보세요
          </Typography>
        </MotionBox>
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
