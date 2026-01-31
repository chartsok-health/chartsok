'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button,
  IconButton,
  Chip,
  Avatar,
  Grid,
  Tooltip,
  Card,
  CardContent,
  Pagination,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import DeleteIcon from '@mui/icons-material/Delete';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import HistoryIcon from '@mui/icons-material/History';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import PatientFormDialog from './PatientFormDialog';

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
  const { user } = useAuth();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [dialogMode, setDialogMode] = useState('add');

  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('active'); // 'active' | 'archived' | 'all'
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const rowsPerPage = 6;

  // Fetch patients on mount
  useEffect(() => {
    if (user?.uid) {
      fetchPatients();
    }
  }, [user?.uid]);

  const fetchPatients = async () => {
    if (!user?.uid) return;

    try {
      setLoading(true);
      const response = await fetch(`/api/patients?userId=${user.uid}`);
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
        status: patient.status || 'active', // Use status from DB, default to active
      }));

      setPatients(transformedPatients);
    } catch (error) {
      console.error('Error fetching patients:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      // Filter by status
      if (statusFilter !== 'all' && patient.status !== statusFilter) {
        return false;
      }
      // Filter by search query
      if (searchQuery) {
        return (
          patient.name?.includes(searchQuery) ||
          patient.chartNo?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          patient.phone?.includes(searchQuery)
        );
      }
      return true;
    });
  }, [patients, statusFilter, searchQuery]);

  const totalPages = Math.ceil(filteredPatients.length / rowsPerPage);
  const paginatedPatients = useMemo(() => {
    return filteredPatients.slice(
      (page - 1) * rowsPerPage,
      page * rowsPerPage
    );
  }, [filteredPatients, page, rowsPerPage]);

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
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPatient(null);
  };

  const handleSavePatient = async (formData) => {
    if (!user?.uid) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      if (dialogMode === 'add') {
        // Create new patient via API
        const response = await fetch('/api/patients', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            userId: user.uid,
            status: 'active', // New patients are active by default
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
          status: 'active',
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
    }
  };

  const handleArchivePatient = async (id, currentStatus) => {
    const isArchiving = currentStatus === 'active';
    const message = isArchiving
      ? '이 환자를 보관함으로 이동하시겠습니까?'
      : '이 환자를 활성 상태로 복원하시겠습니까?';

    if (confirm(message)) {
      try {
        const newStatus = isArchiving ? 'archived' : 'active';
        const response = await fetch(`/api/patients/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus }),
        });

        if (!response.ok) throw new Error('Failed to update patient status');

        // Update local state
        setPatients(patients.map((p) =>
          p.id === id ? { ...p, status: newStatus } : p
        ));
        setSnackbar({
          open: true,
          message: isArchiving ? '환자가 보관되었습니다' : '환자가 복원되었습니다',
          severity: 'success',
        });
      } catch (error) {
        console.error('Error updating patient status:', error);
        setSnackbar({ open: true, message: '환자 상태 변경에 실패했습니다', severity: 'error' });
      }
    }
  };

  const handleDeletePatient = async (id) => {
    if (confirm('이 환자를 완전히 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      try {
        const response = await fetch(`/api/patients/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) throw new Error('Failed to delete patient');

        // Remove from local state
        setPatients(patients.filter((p) => p.id !== id));
        setSnackbar({ open: true, message: '환자가 삭제되었습니다', severity: 'info' });
      } catch (error) {
        console.error('Error deleting patient:', error);
        setSnackbar({ open: true, message: '환자 삭제에 실패했습니다', severity: 'error' });
      }
    }
  };

  const { totalPatients, activePatients, archivedPatients, stats } = useMemo(() => {
    const total = patients.length;
    const active = patients.filter((p) => p.status === 'active').length;
    const archived = patients.filter((p) => p.status === 'archived').length;
    return {
      totalPatients: total,
      activePatients: active,
      archivedPatients: archived,
      stats: [
        { label: '전체 환자', value: total, icon: PersonIcon, color: '#4B9CD3', bgColor: '#EBF5FF' },
        { label: '활성 환자', value: active, icon: LocalHospitalIcon, color: '#10B981', bgColor: '#ECFDF5' },
        { label: '보관된 환자', value: archived, icon: ArchiveIcon, color: '#6B7280', bgColor: '#F3F4F6' },
      ],
    };
  }, [patients]);

  if (loading || !user) {
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
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
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
            {/* Status Filter Buttons */}
            <Box sx={{ display: 'flex', gap: 0.5, bgcolor: 'grey.100', borderRadius: 2, p: 0.5 }}>
              <Button
                size="small"
                variant={statusFilter === 'active' ? 'contained' : 'text'}
                onClick={() => { setStatusFilter('active'); setPage(1); }}
                sx={{
                  borderRadius: 1.5,
                  px: 2,
                  py: 0.5,
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  minWidth: 'auto',
                  ...(statusFilter === 'active' ? {
                    bgcolor: '#10B981',
                    '&:hover': { bgcolor: '#059669' },
                  } : {
                    color: 'text.secondary',
                  }),
                }}
              >
                활성 ({activePatients})
              </Button>
              <Button
                size="small"
                variant={statusFilter === 'archived' ? 'contained' : 'text'}
                onClick={() => { setStatusFilter('archived'); setPage(1); }}
                sx={{
                  borderRadius: 1.5,
                  px: 2,
                  py: 0.5,
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  minWidth: 'auto',
                  ...(statusFilter === 'archived' ? {
                    bgcolor: '#6B7280',
                    '&:hover': { bgcolor: '#4B5563' },
                  } : {
                    color: 'text.secondary',
                  }),
                }}
              >
                보관됨 ({archivedPatients})
              </Button>
              <Button
                size="small"
                variant={statusFilter === 'all' ? 'contained' : 'text'}
                onClick={() => { setStatusFilter('all'); setPage(1); }}
                sx={{
                  borderRadius: 1.5,
                  px: 2,
                  py: 0.5,
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  minWidth: 'auto',
                  ...(statusFilter === 'all' ? {
                    bgcolor: '#4B9CD3',
                    '&:hover': { bgcolor: '#3A7BA8' },
                  } : {
                    color: 'text.secondary',
                  }),
                }}
              >
                전체 ({totalPatients})
              </Button>
            </Box>
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
                      label={patient.status === 'active' ? '활성' : '보관됨'}
                      size="small"
                      sx={{
                        fontSize: '0.65rem',
                        fontWeight: 600,
                        bgcolor: patient.status === 'active' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(107, 114, 128, 0.1)',
                        color: patient.status === 'active' ? '#10B981' : '#6B7280',
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
                    <Tooltip title={patient.status === 'active' ? '보관' : '복원'}>
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleArchivePatient(patient.id, patient.status);
                        }}
                        sx={{
                          bgcolor: patient.status === 'active' ? 'grey.100' : 'success.50',
                          color: patient.status === 'active' ? 'grey.600' : 'success.main',
                        }}
                      >
                        {patient.status === 'active' ? <ArchiveIcon fontSize="small" /> : <UnarchiveIcon fontSize="small" />}
                      </IconButton>
                    </Tooltip>
                    {patient.status === 'archived' && (
                      <Tooltip title="삭제">
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeletePatient(patient.id);
                          }}
                          sx={{
                            bgcolor: 'error.50',
                            color: 'error.main',
                            '&:hover': {
                              bgcolor: 'error.100',
                            },
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
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

      {/* Patient Form Dialog */}
      <PatientFormDialog
        open={openDialog}
        mode={dialogMode}
        patient={selectedPatient}
        onClose={handleCloseDialog}
        onSave={handleSavePatient}
      />

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
