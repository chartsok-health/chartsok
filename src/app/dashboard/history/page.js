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
  Dialog,
  DialogContent,
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
import ImageIcon from '@mui/icons-material/Image';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import BiotechIcon from '@mui/icons-material/Biotech';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import CloseIcon from '@mui/icons-material/Close';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { useAuth } from '@/lib/AuthContext';
import { getHistoryList } from '@/lib/services';
import { formatCountdown, getSecondsUntilDeletion, groupBy } from '@/lib/helpers';
import { patientAttachments } from '@/lib/mockDatabase';

const MotionPaper = motion.create(Paper);
const MotionCard = motion.create(Card);
const MotionBox = motion.create(Box);

// Get data from services
const historyData = getHistoryList();
const patientAttachmentsGrouped = groupBy(patientAttachments, 'patientId');

const attachmentTypeConfig = {
  xray: { icon: ImageIcon, color: '#4B9CD3', label: 'X-ray' },
  ct: { icon: ImageIcon, color: '#8B5CF6', label: 'CT' },
  mri: { icon: ImageIcon, color: '#EC4899', label: 'MRI' },
  lab: { icon: BiotechIcon, color: '#10B981', label: '검사결과' },
  ecg: { icon: MonitorHeartIcon, color: '#F59E0B', label: '심전도' },
  document: { icon: InsertDriveFileIcon, color: '#6B7280', label: '문서' },
};

export default function HistoryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const patientIdParam = searchParams.get('patientId');
  const patientNameParam = searchParams.get('patientName');

  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [attachmentFilter, setAttachmentFilter] = useState('all');
  const [attachmentSort, setAttachmentSort] = useState('date'); // 'date' or 'type'
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);
  const [previewZoom, setPreviewZoom] = useState(1);
  const [, setTick] = useState(0); // For countdown refresh

  // Update countdown every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTick((t) => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle attachment preview
  const handleOpenPreview = (file, allFiles) => {
    setPreviewFile({ ...file, allFiles });
    setPreviewZoom(1);
    setPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setPreviewOpen(false);
    setPreviewFile(null);
    setPreviewZoom(1);
  };

  const handlePrevFile = () => {
    if (!previewFile?.allFiles) return;
    const currentIndex = previewFile.allFiles.findIndex(f => f.id === previewFile.id);
    if (currentIndex > 0) {
      const prevFile = previewFile.allFiles[currentIndex - 1];
      setPreviewFile({ ...prevFile, allFiles: previewFile.allFiles });
      setPreviewZoom(1);
    }
  };

  const handleNextFile = () => {
    if (!previewFile?.allFiles) return;
    const currentIndex = previewFile.allFiles.findIndex(f => f.id === previewFile.id);
    if (currentIndex < previewFile.allFiles.length - 1) {
      const nextFile = previewFile.allFiles[currentIndex + 1];
      setPreviewFile({ ...nextFile, allFiles: previewFile.allFiles });
      setPreviewZoom(1);
    }
  };

  // Get attachment counts by type
  const getAttachmentCounts = (attachments) => {
    const counts = { all: attachments.length };
    attachments.forEach(file => {
      counts[file.type] = (counts[file.type] || 0) + 1;
    });
    return counts;
  };

  // Filter and sort attachments
  const getFilteredAttachments = (attachments) => {
    let filtered = attachmentFilter === 'all'
      ? attachments
      : attachments.filter(f => f.type === attachmentFilter);

    // Sort
    return filtered.sort((a, b) => {
      if (attachmentSort === 'date') {
        return new Date(b.date) - new Date(a.date);
      }
      return a.type.localeCompare(b.type);
    });
  };

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
    // Filter by patient if patientId is provided
    if (patientIdParam && item.patientId !== parseInt(patientIdParam)) {
      return false;
    }
    // Filter by search query
    return (
      item.diagnosis.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.icdCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.patientName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

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

      {/* Patient Attachments Section - Only shown when viewing a specific patient */}
      {patientIdParam && patientAttachmentsGrouped[parseInt(patientIdParam)] && (() => {
        const attachments = patientAttachmentsGrouped[parseInt(patientIdParam)];
        const counts = getAttachmentCounts(attachments);
        const filteredAttachments = getFilteredAttachments(attachments);

        return (
          <MotionPaper
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            elevation={0}
            sx={{
              p: 3,
              mb: 4,
              borderRadius: 4,
              border: '1px solid',
              borderColor: 'grey.200',
            }}
          >
            {/* Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    bgcolor: 'info.50',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <FolderIcon sx={{ color: 'info.main' }} />
                </Box>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'secondary.main' }}>
                    첨부 파일
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    총 {attachments.length}개 파일
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => setAttachmentSort(attachmentSort === 'date' ? 'type' : 'date')}
                  sx={{ borderRadius: 2, fontSize: '0.75rem' }}
                >
                  {attachmentSort === 'date' ? '날짜순' : '유형순'}
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<DownloadIcon />}
                  sx={{ borderRadius: 2 }}
                >
                  전체 다운로드
                </Button>
              </Box>
            </Box>

            {/* Type Summary Chips */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3, pb: 2, borderBottom: '1px solid', borderColor: 'grey.100' }}>
              <Chip
                label={`전체 (${counts.all})`}
                size="small"
                onClick={() => setAttachmentFilter('all')}
                sx={{
                  fontWeight: 600,
                  bgcolor: attachmentFilter === 'all' ? 'primary.main' : 'grey.100',
                  color: attachmentFilter === 'all' ? 'white' : 'text.primary',
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: attachmentFilter === 'all' ? 'primary.dark' : 'grey.200',
                  },
                }}
              />
              {Object.entries(attachmentTypeConfig).map(([type, config]) => {
                if (!counts[type]) return null;
                const Icon = config.icon;
                return (
                  <Chip
                    key={type}
                    icon={<Icon sx={{ fontSize: 16, color: attachmentFilter === type ? 'white' : config.color }} />}
                    label={`${config.label} (${counts[type]})`}
                    size="small"
                    onClick={() => setAttachmentFilter(type)}
                    sx={{
                      fontWeight: 600,
                      bgcolor: attachmentFilter === type ? config.color : `${config.color}15`,
                      color: attachmentFilter === type ? 'white' : config.color,
                      cursor: 'pointer',
                      '&:hover': {
                        bgcolor: attachmentFilter === type ? config.color : `${config.color}25`,
                      },
                      '& .MuiChip-icon': {
                        color: attachmentFilter === type ? 'white' : config.color,
                      },
                    }}
                  />
                );
              })}
            </Box>

            {/* Attachments Grid */}
            <Grid container spacing={2}>
              {filteredAttachments.map((file, index) => {
                const config = attachmentTypeConfig[file.type] || attachmentTypeConfig.document;
                const FileIcon = config.icon;
                return (
                  <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }} key={file.id}>
                    <MotionCard
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2, delay: index * 0.03 }}
                      elevation={0}
                      onClick={() => handleOpenPreview(file, filteredAttachments)}
                      sx={{
                        border: '1px solid',
                        borderColor: 'grey.200',
                        borderRadius: 2,
                        overflow: 'hidden',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        '&:hover': {
                          borderColor: config.color,
                          boxShadow: `0 4px 12px ${config.color}20`,
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      {/* Thumbnail or Icon */}
                      <Box
                        sx={{
                          height: 80,
                          bgcolor: `${config.color}08`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          position: 'relative',
                        }}
                      >
                        <FileIcon sx={{ fontSize: 32, color: config.color }} />
                        {/* Type badge */}
                        <Chip
                          label={config.label}
                          size="small"
                          sx={{
                            position: 'absolute',
                            top: 6,
                            right: 6,
                            height: 18,
                            fontSize: '0.6rem',
                            fontWeight: 700,
                            bgcolor: config.color,
                            color: 'white',
                          }}
                        />
                      </Box>

                      {/* File Info */}
                      <CardContent sx={{ p: 1.5 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 600,
                            color: 'secondary.main',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            fontSize: '0.8rem',
                            mb: 0.5,
                          }}
                        >
                          {file.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>
                          {file.date}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'grey.400', fontSize: '0.65rem', display: 'block' }}>
                          {file.size}
                        </Typography>
                      </CardContent>
                    </MotionCard>
                  </Grid>
                );
              })}
            </Grid>

            {/* Empty state for filtered view */}
            {filteredAttachments.length === 0 && (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  해당 유형의 파일이 없습니다
                </Typography>
              </Box>
            )}
          </MotionPaper>
        );
      })()}

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
                <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>환자</TableCell>
                <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>진단명</TableCell>
                <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>ICD 코드</TableCell>
                <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>대화 기록 삭제</TableCell>
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
                          {row.patientName.charAt(0)}
                        </Avatar>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {row.patientName}
                        </Typography>
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
                      {(() => {
                        const remainingSeconds = getSecondsUntilDeletion(row.createdAt);
                        const isExpired = remainingSeconds <= 0;
                        const isUrgent = remainingSeconds > 0 && remainingSeconds < 3600; // less than 1 hour
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

      {/* Attachment Preview Modal */}
      <Dialog
        open={previewOpen}
        onClose={handleClosePreview}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            bgcolor: 'grey.900',
            minHeight: '80vh',
          },
        }}
      >
        {previewFile && (() => {
          const config = attachmentTypeConfig[previewFile.type] || attachmentTypeConfig.document;
          const FileIcon = config.icon;
          const currentIndex = previewFile.allFiles?.findIndex(f => f.id === previewFile.id) ?? 0;
          const totalFiles = previewFile.allFiles?.length ?? 1;
          const isImageType = ['xray', 'ct', 'mri'].includes(previewFile.type);

          return (
            <>
              {/* Header */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 2,
                  borderBottom: '1px solid',
                  borderColor: 'grey.800',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: 1.5,
                      bgcolor: `${config.color}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <FileIcon sx={{ color: config.color, fontSize: 20 }} />
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'white' }}>
                      {previewFile.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'grey.400' }}>
                      {previewFile.date} · {previewFile.size} · {config.label}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {/* File counter */}
                  <Chip
                    label={`${currentIndex + 1} / ${totalFiles}`}
                    size="small"
                    sx={{
                      bgcolor: 'grey.800',
                      color: 'grey.300',
                      fontWeight: 600,
                    }}
                  />

                  {/* Zoom controls for images */}
                  {isImageType && (
                    <>
                      <IconButton
                        onClick={() => setPreviewZoom(Math.max(0.5, previewZoom - 0.25))}
                        sx={{ color: 'grey.300', '&:hover': { bgcolor: 'grey.800' } }}
                      >
                        <ZoomOutIcon />
                      </IconButton>
                      <Typography variant="caption" sx={{ color: 'grey.400', minWidth: 45, textAlign: 'center' }}>
                        {Math.round(previewZoom * 100)}%
                      </Typography>
                      <IconButton
                        onClick={() => setPreviewZoom(Math.min(3, previewZoom + 0.25))}
                        sx={{ color: 'grey.300', '&:hover': { bgcolor: 'grey.800' } }}
                      >
                        <ZoomInIcon />
                      </IconButton>
                    </>
                  )}

                  <IconButton
                    onClick={handleClosePreview}
                    sx={{ color: 'grey.300', '&:hover': { bgcolor: 'grey.800' } }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
              </Box>

              {/* Content */}
              <DialogContent
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  p: 0,
                  minHeight: 400,
                  bgcolor: 'grey.900',
                }}
              >
                {/* Navigation - Previous */}
                {currentIndex > 0 && (
                  <IconButton
                    onClick={handlePrevFile}
                    sx={{
                      position: 'absolute',
                      left: 16,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      bgcolor: 'rgba(0,0,0,0.5)',
                      color: 'white',
                      zIndex: 10,
                      '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
                    }}
                  >
                    <NavigateBeforeIcon sx={{ fontSize: 32 }} />
                  </IconButton>
                )}

                {/* File Preview Content */}
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 4,
                    width: '100%',
                    height: '100%',
                    overflow: 'auto',
                  }}
                >
                  {isImageType ? (
                    // Image preview (simulated with icon for now)
                    <Box
                      sx={{
                        transform: `scale(${previewZoom})`,
                        transition: 'transform 0.2s',
                        p: 4,
                        bgcolor: 'grey.800',
                        borderRadius: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2,
                      }}
                    >
                      <FileIcon sx={{ fontSize: 120, color: config.color }} />
                      <Typography variant="body2" sx={{ color: 'grey.400' }}>
                        {previewFile.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'grey.500', textAlign: 'center', maxWidth: 300 }}>
                        실제 구현에서는 여기에 DICOM 뷰어 또는 이미지가 표시됩니다
                      </Typography>
                    </Box>
                  ) : (
                    // Document / Lab result preview
                    <Box
                      sx={{
                        p: 4,
                        bgcolor: 'grey.800',
                        borderRadius: 3,
                        textAlign: 'center',
                        maxWidth: 400,
                      }}
                    >
                      <FileIcon sx={{ fontSize: 80, color: config.color, mb: 2 }} />
                      <Typography variant="h6" sx={{ color: 'white', fontWeight: 700, mb: 1 }}>
                        {previewFile.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'grey.400', mb: 3 }}>
                        {config.label} 파일
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Chip
                          label={previewFile.date}
                          size="small"
                          sx={{ bgcolor: 'grey.700', color: 'grey.300' }}
                        />
                        <Chip
                          label={previewFile.size}
                          size="small"
                          sx={{ bgcolor: 'grey.700', color: 'grey.300' }}
                        />
                      </Box>
                    </Box>
                  )}
                </Box>

                {/* Navigation - Next */}
                {currentIndex < totalFiles - 1 && (
                  <IconButton
                    onClick={handleNextFile}
                    sx={{
                      position: 'absolute',
                      right: 16,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      bgcolor: 'rgba(0,0,0,0.5)',
                      color: 'white',
                      zIndex: 10,
                      '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
                    }}
                  >
                    <NavigateNextIcon sx={{ fontSize: 32 }} />
                  </IconButton>
                )}
              </DialogContent>

              {/* Footer */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 2,
                  p: 2,
                  borderTop: '1px solid',
                  borderColor: 'grey.800',
                }}
              >
                <Button
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  sx={{
                    borderColor: 'grey.600',
                    color: 'grey.300',
                    '&:hover': { borderColor: 'grey.400', bgcolor: 'grey.800' },
                  }}
                >
                  다운로드
                </Button>
                {isImageType && (
                  <Button
                    variant="outlined"
                    startIcon={<FullscreenIcon />}
                    sx={{
                      borderColor: 'grey.600',
                      color: 'grey.300',
                      '&:hover': { borderColor: 'grey.400', bgcolor: 'grey.800' },
                    }}
                  >
                    전체화면
                  </Button>
                )}
              </Box>
            </>
          );
        })()}
      </Dialog>
    </Box>
  );
}
