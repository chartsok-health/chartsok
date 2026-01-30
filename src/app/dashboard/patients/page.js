'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  InputAdornment,
  Button,
  IconButton,
  Chip,
  Avatar,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Tooltip,
  Card,
  CardContent,
  Pagination,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FilterListIcon from '@mui/icons-material/FilterList';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import HistoryIcon from '@mui/icons-material/History';
import { useRouter } from 'next/navigation';

const MotionBox = motion.create(Box);
const MotionCard = motion.create(Card);

// Sample patient data
const initialPatients = [
  { id: 1, name: '김영희', age: 45, gender: '여', phone: '010-1234-5678', birthDate: '1980-03-15', chartNo: 'P-2024-001', lastVisit: '2025-01-15', visitCount: 12, status: 'active', diagnosis: '고혈압' },
  { id: 2, name: '박철수', age: 62, gender: '남', phone: '010-2345-6789', birthDate: '1963-07-22', chartNo: 'P-2024-002', lastVisit: '2025-01-20', visitCount: 8, status: 'active', diagnosis: '당뇨' },
  { id: 3, name: '이민정', age: 33, gender: '여', phone: '010-3456-7890', birthDate: '1992-11-08', chartNo: 'P-2024-003', lastVisit: '2025-01-22', visitCount: 3, status: 'active', diagnosis: '편도염' },
  { id: 4, name: '정대현', age: 58, gender: '남', phone: '010-4567-8901', birthDate: '1967-05-30', chartNo: 'P-2024-004', lastVisit: '2025-01-25', visitCount: 15, status: 'active', diagnosis: '관절염' },
  { id: 5, name: '최수진', age: 28, gender: '여', phone: '010-5678-9012', birthDate: '1997-09-12', chartNo: 'P-2024-005', lastVisit: '2025-01-10', visitCount: 2, status: 'inactive', diagnosis: '감기' },
  { id: 6, name: '강민호', age: 51, gender: '남', phone: '010-6789-0123', birthDate: '1974-02-28', chartNo: 'P-2024-006', lastVisit: '2025-01-18', visitCount: 20, status: 'active', diagnosis: '위염' },
  { id: 7, name: '윤서연', age: 39, gender: '여', phone: '010-7890-1234', birthDate: '1986-06-05', chartNo: 'P-2024-007', lastVisit: '2025-01-23', visitCount: 7, status: 'active', diagnosis: '알레르기' },
  { id: 8, name: '임재혁', age: 71, gender: '남', phone: '010-8901-2345', birthDate: '1954-12-19', chartNo: 'P-2024-008', lastVisit: '2025-01-21', visitCount: 25, status: 'active', diagnosis: '고지혈증' },
];

// Clean Card Component - matching history page style
const CleanCard = ({ children, sx, ...props }) => (
  <Card
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
  </Card>
);

export default function PatientsPage() {
  const router = useRouter();
  const [patients, setPatients] = useState(initialPatients);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [dialogMode, setDialogMode] = useState('add');

  const [formData, setFormData] = useState({
    name: '',
    gender: '남',
    birthDate: '',
    phone: '',
    address: '',
    notes: '',
  });

  const [page, setPage] = useState(1);
  const rowsPerPage = 6;

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.includes(searchQuery) ||
      patient.chartNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.phone.includes(searchQuery)
  );

  const totalPages = Math.ceil(filteredPatients.length / rowsPerPage);
  const paginatedPatients = filteredPatients.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  // Reset page when search changes
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const handleOpenDialog = (mode, patient = null) => {
    setDialogMode(mode);
    setSelectedPatient(patient);
    if (patient && mode !== 'add') {
      setFormData({
        name: patient.name,
        gender: patient.gender,
        birthDate: patient.birthDate,
        phone: patient.phone,
        address: patient.address || '',
        notes: patient.notes || '',
      });
    } else {
      setFormData({ name: '', gender: '남', birthDate: '', phone: '', address: '', notes: '' });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPatient(null);
  };

  const handleSavePatient = () => {
    if (dialogMode === 'add') {
      const newPatient = {
        id: patients.length + 1,
        ...formData,
        age: calculateAge(formData.birthDate),
        chartNo: `P-2024-${String(patients.length + 1).padStart(3, '0')}`,
        lastVisit: '-',
        visitCount: 0,
        status: 'active',
        diagnosis: '-',
      };
      setPatients([...patients, newPatient]);
    } else if (dialogMode === 'edit' && selectedPatient) {
      setPatients(
        patients.map((p) =>
          p.id === selectedPatient.id ? { ...p, ...formData, age: calculateAge(formData.birthDate) } : p
        )
      );
    }
    handleCloseDialog();
  };

  const handleDeletePatient = (id) => {
    if (confirm('정말 이 환자를 삭제하시겠습니까?')) {
      setPatients(patients.filter((p) => p.id !== id));
    }
  };

  const calculateAge = (birthDate) => {
    if (!birthDate) return 0;
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  };

  const totalPatients = patients.length;
  const activePatients = patients.filter((p) => p.status === 'active').length;
  const thisMonthVisits = patients.filter((p) => p.lastVisit?.startsWith('2025-01')).length;

  const stats = [
    { label: '전체 환자', value: totalPatients, icon: PersonIcon, color: '#4B9CD3', bgColor: '#EBF5FF' },
    { label: '활성 환자', value: activePatients, icon: LocalHospitalIcon, color: '#10B981', bgColor: '#ECFDF5' },
    { label: '이번 달 방문', value: thisMonthVisits, icon: TrendingUpIcon, color: '#F59E0B', bgColor: '#FFFBEB' },
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1400, mx: 'auto' }}>
      {/* Header */}
      <MotionBox
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{ mb: 4 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#1E3A5F', mb: 0.5 }}>
              환자 관리
            </Typography>
            <Typography variant="body2" sx={{ color: '#546E7A', fontWeight: 500 }}>
              등록된 환자 목록을 조회하고 관리합니다
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog('add')}
            sx={{
              borderRadius: 2,
              px: 3,
              background: 'linear-gradient(135deg, #4B9CD3 0%, #3A7BA8 100%)',
              boxShadow: '0 4px 14px rgba(75, 156, 211, 0.4)',
              '&:hover': {
                boxShadow: '0 6px 20px rgba(75, 156, 211, 0.5)',
              },
            }}
          >
            새 환자 등록
          </Button>
        </Box>
      </MotionBox>

      {/* Stats Cards */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid size={{ xs: 12, sm: 4 }} key={index}>
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <CleanCard>
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
                    <stat.icon sx={{ color: stat.color, fontSize: 24 }} />
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
              </CleanCard>
            </MotionBox>
          </Grid>
        ))}
      </Grid>

      {/* Search and Filters */}
      <CleanCard sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            placeholder="환자 이름, 차트번호, 전화번호 검색..."
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'grey.400' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              flex: 1,
              minWidth: 250,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                bgcolor: 'white',
              },
            }}
            size="small"
          />
          <Button variant="outlined" startIcon={<FilterListIcon />} sx={{ borderRadius: 2 }}>
            필터
          </Button>
          <Button variant="outlined" startIcon={<FileDownloadIcon />} sx={{ borderRadius: 2 }}>
            내보내기
          </Button>
        </Box>
      </CleanCard>

      {/* Patient Cards Grid */}
      <Grid container spacing={2}>
        <AnimatePresence>
          {paginatedPatients.map((patient, index) => (
            <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={patient.id}>
              <MotionCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                elevation={0}
                sx={{
                  background: 'white',
                  border: '1px solid',
                  borderColor: 'grey.200',
                  borderRadius: 3,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    borderColor: 'primary.200',
                  },
                }}
                onClick={() => handleOpenDialog('view', patient)}
              >
                <CardContent sx={{ p: 2.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar
                        sx={{
                          width: 48,
                          height: 48,
                          background: patient.gender === '남'
                            ? 'linear-gradient(135deg, #4B9CD3 0%, #3A7BA8 100%)'
                            : 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)',
                          fontSize: '1.1rem',
                          fontWeight: 700,
                        }}
                      >
                        {patient.name.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'secondary.main' }}>
                          {patient.name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Chip
                            label={`${patient.age}세`}
                            size="small"
                            sx={{ height: 20, fontSize: '0.7rem', fontWeight: 600, bgcolor: '#E8EDF2', color: '#455A64' }}
                          />
                          <Chip
                            icon={patient.gender === '남' ? <MaleIcon /> : <FemaleIcon />}
                            label={patient.gender}
                            size="small"
                            sx={{
                              height: 20,
                              fontSize: '0.7rem',
                              bgcolor: patient.gender === '남' ? 'primary.50' : 'pink.50',
                              color: patient.gender === '남' ? 'primary.main' : '#ec4899',
                              '& .MuiChip-icon': {
                                fontSize: 14,
                                color: patient.gender === '남' ? 'primary.main' : '#ec4899',
                              },
                            }}
                          />
                        </Box>
                      </Box>
                    </Box>
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </Box>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PhoneIcon sx={{ fontSize: 14, color: 'grey.400' }} />
                      <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>
                        {patient.phone}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CalendarTodayIcon sx={{ fontSize: 14, color: 'grey.400' }} />
                      <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>
                        최근 방문: {patient.lastVisit}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Chip
                        label={patient.chartNo}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: '0.7rem', fontWeight: 600 }}
                      />
                      <Chip
                        label={`${patient.visitCount}회 방문`}
                        size="small"
                        sx={{
                          fontSize: '0.7rem',
                          bgcolor: patient.visitCount > 10 ? 'success.50' : 'grey.100',
                          color: patient.visitCount > 10 ? 'success.main' : 'text.secondary',
                        }}
                      />
                    </Box>
                    <Chip
                      label={patient.status === 'active' ? '활성' : '비활성'}
                      size="small"
                      sx={{
                        fontSize: '0.65rem',
                        fontWeight: 600,
                        bgcolor: patient.status === 'active' ? 'rgba(16, 185, 129, 0.1)' : 'grey.100',
                        color: patient.status === 'active' ? '#10B981' : 'text.secondary',
                      }}
                    />
                  </Box>
                </CardContent>

                <Box sx={{ px: 2.5, pb: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {/* Prominent History Button */}
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<HistoryIcon />}
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/dashboard/history?patientId=${patient.id}&patientName=${encodeURIComponent(patient.name)}`);
                    }}
                    sx={{
                      borderRadius: 1.5,
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      borderColor: 'primary.200',
                      color: 'primary.main',
                      py: 0.75,
                      '&:hover': {
                        borderColor: 'primary.main',
                        bgcolor: 'primary.50',
                      },
                    }}
                  >
                    진료 기록 보기
                  </Button>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      size="small"
                      startIcon={<VisibilityIcon />}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenDialog('view', patient);
                      }}
                      sx={{ flex: 1, borderRadius: 1.5, fontSize: '0.75rem' }}
                    >
                      상세
                    </Button>
                    <Button
                      size="small"
                      startIcon={<EditIcon />}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenDialog('edit', patient);
                      }}
                      sx={{ flex: 1, borderRadius: 1.5, fontSize: '0.75rem' }}
                    >
                      수정
                    </Button>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeletePatient(patient.id);
                      }}
                      sx={{ bgcolor: 'error.50' }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </MotionCard>
            </Grid>
          ))}
        </AnimatePresence>
      </Grid>

      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            showFirstButton
            showLastButton
          />
        </Box>
      )}

      {/* Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, pb: 1 }}>
          {dialogMode === 'add' ? '새 환자 등록' : dialogMode === 'edit' ? '환자 정보 수정' : '환자 정보'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="이름"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={dialogMode === 'view'}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                select
                label="성별"
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                disabled={dialogMode === 'view'}
              >
                <MenuItem value="남">남성</MenuItem>
                <MenuItem value="여">여성</MenuItem>
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="생년월일"
                type="date"
                value={formData.birthDate}
                onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                InputLabelProps={{ shrink: true }}
                disabled={dialogMode === 'view'}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="전화번호"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="010-0000-0000"
                disabled={dialogMode === 'view'}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="주소"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                disabled={dialogMode === 'view'}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="메모"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                multiline
                rows={3}
                disabled={dialogMode === 'view'}
              />
            </Grid>
            {dialogMode === 'view' && selectedPatient && (
              <>
                <Grid size={{ xs: 6 }}>
                  <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, textAlign: 'center' }}>
                    <Typography variant="caption" color="text.secondary">차트번호</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>{selectedPatient.chartNo}</Typography>
                  </Paper>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, textAlign: 'center' }}>
                    <Typography variant="caption" color="text.secondary">총 방문 횟수</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>{selectedPatient.visitCount}회</Typography>
                  </Paper>
                </Grid>
              </>
            )}
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2.5, pt: 1 }}>
          <Button onClick={handleCloseDialog} sx={{ borderRadius: 2 }}>
            {dialogMode === 'view' ? '닫기' : '취소'}
          </Button>
          {dialogMode !== 'view' && (
            <Button
              variant="contained"
              onClick={handleSavePatient}
              sx={{
                borderRadius: 2,
                background: 'linear-gradient(135deg, #4B9CD3 0%, #3A7BA8 100%)',
              }}
            >
              {dialogMode === 'add' ? '등록' : '저장'}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
}
