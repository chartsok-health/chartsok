'use client';

import { useState, useEffect } from 'react';
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
  CircularProgress,
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

// Calculate age from birth date
const calculateAge = (birthDate) => {
  if (!birthDate) return 0;
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
};

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
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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

  // Fetch patients on mount
  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/patients');
      if (!response.ok) throw new Error('Failed to fetch patients');
      const data = await response.json();

      // API returns { patients, total } - handle both array and object response
      const patientsList = Array.isArray(data) ? data : (data.patients || []);

      // Transform data to include computed fields
      const transformedPatients = patientsList.map(patient => ({
        ...patient,
        age: calculateAge(patient.birthDate),
        lastVisit: patient.lastVisit || '-',
        visitCount: patient.visitCount || 0,
        status: patient.visitCount > 0 ? 'active' : 'inactive',
      }));

      setPatients(transformedPatients);
    } catch (error) {
      console.error('Error fetching patients:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name?.includes(searchQuery) ||
      patient.chartNo?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.phone?.includes(searchQuery)
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
        birthDate: patient.birthDate || '',
        phone: patient.phone || '',
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

  const handleSavePatient = async () => {
    try {
      setSaving(true);

      if (dialogMode === 'add') {
        // Create new patient via API
        const response = await fetch('/api/patients', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            chartNo: `P-${new Date().getFullYear()}-${String(patients.length + 1).padStart(3, '0')}`,
          }),
        });

        if (!response.ok) throw new Error('Failed to create patient');
        const result = await response.json();
        const newPatient = result.patient;

        // Add to local state with computed fields
        setPatients([...patients, {
          ...newPatient,
          age: calculateAge(newPatient.birthDate),
          lastVisit: '-',
          visitCount: 0,
          status: 'inactive',
        }]);
      } else if (dialogMode === 'edit' && selectedPatient) {
        // Update patient via API
        const response = await fetch(`/api/patients/${selectedPatient.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error('Failed to update patient');
        const result = await response.json();
        const updatedPatient = result.patient;

        // Update local state
        setPatients(
          patients.map((p) =>
            p.id === selectedPatient.id
              ? { ...p, ...updatedPatient, age: calculateAge(updatedPatient.birthDate) }
              : p
          )
        );
      }

      handleCloseDialog();
    } catch (error) {
      console.error('Error saving patient:', error);
      alert('환자 정보 저장에 실패했습니다.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeletePatient = async (id) => {
    if (confirm('정말 이 환자를 삭제하시겠습니까?')) {
      try {
        const response = await fetch(`/api/patients/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) throw new Error('Failed to delete patient');

        setPatients(patients.filter((p) => p.id !== id));
      } catch (error) {
        console.error('Error deleting patient:', error);
        alert('환자 삭제에 실패했습니다.');
      }
    }
  };

  const totalPatients = patients.length;
  const activePatients = patients.filter((p) => p.status === 'active').length;
  const now = new Date();
  const thisMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const thisMonthVisits = patients.filter((p) => p.lastVisit?.startsWith(thisMonth)).length;

  const stats = [
    { label: '전체 환자', value: totalPatients, icon: PersonIcon, color: '#4B9CD3', bgColor: '#EBF5FF' },
    { label: '활성 환자', value: activePatients, icon: LocalHospitalIcon, color: '#10B981', bgColor: '#ECFDF5' },
    { label: '이번 달 방문', value: thisMonthVisits, icon: TrendingUpIcon, color: '#F59E0B', bgColor: '#FFFBEB' },
  ];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

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

      {/* Empty State - Show when no patients */}
      {patients.length === 0 && (
        <CleanCard sx={{ textAlign: 'center', py: 8, px: 4 }}>
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
            <PersonIcon sx={{ fontSize: 48, color: 'primary.main' }} />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 700, color: 'secondary.main', mb: 1 }}>
            등록된 환자가 없습니다
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, maxWidth: 400, mx: 'auto' }}>
            첫 번째 환자를 등록하고 AI 차트 작성 기능을 시작해보세요
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog('add')}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 3,
              fontWeight: 700,
              background: 'linear-gradient(135deg, #4B9CD3 0%, #3A7BA8 100%)',
              boxShadow: '0 4px 14px rgba(75, 156, 211, 0.4)',
            }}
          >
            새 환자 등록
          </Button>
        </CleanCard>
      )}

      {/* Search and Filters - Only show when there are patients */}
      {patients.length > 0 && (
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
      )}

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
                        {patient.name?.charAt(0) || '?'}
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
                        {patient.phone || '-'}
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
                        label={patient.chartNo || '-'}
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
              disabled={saving}
              sx={{
                borderRadius: 2,
                background: 'linear-gradient(135deg, #4B9CD3 0%, #3A7BA8 100%)',
              }}
            >
              {saving ? <CircularProgress size={20} /> : (dialogMode === 'add' ? '등록' : '저장')}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
}
