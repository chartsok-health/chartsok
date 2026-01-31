'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
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
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Tooltip,
  Badge,
  Pagination,
  Skeleton,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import VerifiedIcon from '@mui/icons-material/Verified';
import WorkIcon from '@mui/icons-material/Work';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PersonIcon from '@mui/icons-material/Person';
import { useAuth } from '@/lib/AuthContext';

const MotionBox = motion.create(Box);
const MotionCard = motion.create(Card);
const MotionPaper = motion.create(Paper);

const specialties = [
  '내과',
  '외과',
  '소아청소년과',
  '산부인과',
  '정형외과',
  '피부과',
  '이비인후과',
  '안과',
  '가정의학과',
  '정신건강의학과',
  '신경과',
  '기타',
];

const roleLabels = {
  admin: { label: '관리자', color: 'info' },
  doctor: { label: '의사', color: 'primary' },
};

// Format Korean phone number as user types (010-1234-5678)
const formatPhoneNumber = (value) => {
  if (!value) return '';
  const numbers = value.replace(/\D/g, '');

  if (numbers.startsWith('02')) {
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 5) return `${numbers.slice(0, 2)}-${numbers.slice(2)}`;
    if (numbers.length <= 9) return `${numbers.slice(0, 2)}-${numbers.slice(2, 5)}-${numbers.slice(5)}`;
    return `${numbers.slice(0, 2)}-${numbers.slice(2, 6)}-${numbers.slice(6, 10)}`;
  } else {
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
  }
};

export default function DoctorsPage() {
  const { user, userProfile, loading: authLoading } = useAuth();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [dialogMode, setDialogMode] = useState('add');
  const [openInviteDialog, setOpenInviteDialog] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [dialogSnackbar, setDialogSnackbar] = useState({ open: false, message: '' });

  // Use refs for text inputs to avoid re-renders on every keystroke
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const licenseNoRef = useRef(null);
  const addressRef = useRef(null);
  const joinDateRef = useRef(null);

  // Keep state only for selects
  const [formSpecialty, setFormSpecialty] = useState('내과');
  const [formRole, setFormRole] = useState('doctor');

  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('active'); // 'active' | 'archived' | 'all'
  const rowsPerPage = 6;

  // Fetch doctors on mount
  useEffect(() => {
    // Wait for auth to finish loading
    if (authLoading) return;

    const fetchDoctors = async () => {
      try {
        const hospitalId = userProfile?.hospitalId || 'default';
        const response = await fetch(`/api/doctors?hospitalId=${hospitalId}&userId=${user?.uid || ''}`);

        if (response.ok) {
          const data = await response.json();
          setDoctors(data.doctors || []);
        }
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setSnackbar({ open: true, message: '의료진 목록을 불러오는데 실패했습니다', severity: 'error' });
      } finally {
        setLoading(false);
      }
    };

    if (userProfile?.hospitalId) {
      fetchDoctors();
    } else {
      setLoading(false);
    }
  }, [authLoading, user?.uid, userProfile?.hospitalId]);

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      // Filter by status
      if (statusFilter !== 'all' && doctor.status !== statusFilter) {
        return false;
      }
      // Filter by search query
      if (searchQuery) {
        return (
          doctor.name?.includes(searchQuery) ||
          doctor.specialty?.includes(searchQuery) ||
          doctor.email?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      return true;
    });
  }, [doctors, statusFilter, searchQuery]);

  const totalPages = Math.ceil(filteredDoctors.length / rowsPerPage);
  const paginatedDoctors = useMemo(() => {
    return filteredDoctors.slice(
      (page - 1) * rowsPerPage,
      page * rowsPerPage
    );
  }, [filteredDoctors, page, rowsPerPage]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const handleOpenDialog = (mode, doctor = null) => {
    setDialogMode(mode);
    setSelectedDoctor(doctor);
    if (doctor && (mode === 'edit' || mode === 'view')) {
      setFormSpecialty(doctor.specialty);
      setFormRole(doctor.role);
      setTimeout(() => {
        if (nameRef.current) nameRef.current.value = doctor.name || '';
        if (emailRef.current) emailRef.current.value = doctor.email || '';
        if (phoneRef.current) phoneRef.current.value = doctor.phone || '';
        if (licenseNoRef.current) licenseNoRef.current.value = doctor.licenseNo || '';
        if (addressRef.current) addressRef.current.value = doctor.address || '';
        if (joinDateRef.current) joinDateRef.current.value = doctor.joinDate || new Date().toISOString().split('T')[0];
      }, 0);
    } else {
      setFormSpecialty('내과');
      setFormRole('doctor');
      setTimeout(() => {
        if (nameRef.current) nameRef.current.value = '';
        if (emailRef.current) emailRef.current.value = '';
        if (phoneRef.current) phoneRef.current.value = '';
        if (licenseNoRef.current) licenseNoRef.current.value = '';
        if (addressRef.current) addressRef.current.value = '';
        if (joinDateRef.current) joinDateRef.current.value = new Date().toISOString().split('T')[0];
      }, 0);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedDoctor(null);
  };

  const handleSaveDoctor = async () => {
    const name = nameRef.current?.value || '';
    const email = emailRef.current?.value || '';
    const phone = phoneRef.current?.value || '';
    const licenseNo = licenseNoRef.current?.value || '';
    const address = addressRef.current?.value || '';
    const joinDate = joinDateRef.current?.value || new Date().toISOString().split('T')[0];

    // Validate all required fields
    if (!name || !email || !formSpecialty || !phone || !licenseNo || !address) {
      setDialogSnackbar({ open: true, message: '모든 필드를 입력해주세요' });
      return;
    }

    const formData = {
      name,
      specialty: formSpecialty,
      role: formRole,
      email,
      phone,
      licenseNo,
      address,
      joinDate,
    };

    setSaving(true);
    try {
      const hospitalId = userProfile?.hospitalId || 'default';

      if (dialogMode === 'add') {
        const response = await fetch('/api/doctors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            hospitalId,
            ...formData,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setDoctors([...doctors, data.doctor]);
          setSnackbar({ open: true, message: '의료진이 등록되었습니다', severity: 'success' });
        } else {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to add');
        }
      } else if (dialogMode === 'edit' && selectedDoctor) {
        const response = await fetch('/api/doctors', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: selectedDoctor.id,
            hospitalId,
            ...formData,
          }),
        });

        if (response.ok) {
          setDoctors(
            doctors.map((d) =>
              d.id === selectedDoctor.id ? { ...d, ...formData } : d
            )
          );

          // If editing self, also sync to settings
          if (selectedDoctor.isMe && user?.uid) {
            await fetch('/api/settings', {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                userId: user.uid,
                displayName: formData.name,
                specialty: formData.specialty,
                phone: formData.phone,
                licenseNo: formData.licenseNo,
                address: formData.address,
              }),
            });
          }

          setSnackbar({ open: true, message: '의료진 정보가 수정되었습니다', severity: 'success' });
        } else {
          throw new Error('Failed to update');
        }
      }
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving doctor:', error);
      setSnackbar({ open: true, message: '저장에 실패했습니다', severity: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleArchiveDoctor = async (id, currentStatus) => {
    const isArchiving = currentStatus === 'active';
    const message = isArchiving
      ? '이 의료진을 보관함으로 이동하시겠습니까?'
      : '이 의료진을 활성 상태로 복원하시겠습니까?';

    if (confirm(message)) {
      try {
        const hospitalId = userProfile?.hospitalId || 'default';
        const newStatus = isArchiving ? 'archived' : 'active';
        const response = await fetch('/api/doctors', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, hospitalId, status: newStatus }),
        });

        if (!response.ok) throw new Error('Failed to update doctor status');

        // Update local state
        setDoctors(doctors.map((d) =>
          d.id === id ? { ...d, status: newStatus } : d
        ));
        setSnackbar({
          open: true,
          message: isArchiving ? '의료진이 보관되었습니다' : '의료진이 복원되었습니다',
          severity: 'success',
        });
      } catch (error) {
        console.error('Error updating doctor status:', error);
        setSnackbar({ open: true, message: '상태 변경에 실패했습니다', severity: 'error' });
      }
    }
  };

  const handleDeleteDoctor = async (doctor) => {
    if (!confirm('이 의료진을 완전히 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      return;
    }

    try {
      const hospitalId = userProfile?.hospitalId || 'default';
      const response = await fetch(`/api/doctors?id=${doctor.id}&hospitalId=${hospitalId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setDoctors(doctors.filter((d) => d.id !== doctor.id));
        setSnackbar({ open: true, message: '의료진이 삭제되었습니다', severity: 'info' });
      } else {
        throw new Error('Failed to delete');
      }
    } catch (error) {
      console.error('Error deleting doctor:', error);
      setSnackbar({ open: true, message: '삭제에 실패했습니다', severity: 'error' });
    }
  };

  const handleInviteDoctor = () => {
    if (inviteEmail) {
      setSnackbar({ open: true, message: `${inviteEmail}로 초대 이메일이 전송되었습니다`, severity: 'success' });
      setInviteEmail('');
      setOpenInviteDialog(false);
    }
  };

  // Stats
  const { totalDoctors, activeDoctors, archivedDoctors, stats } = useMemo(() => {
    const total = doctors.length;
    const active = doctors.filter((d) => d.status === 'active').length;
    const archived = doctors.filter((d) => d.status === 'archived').length;
    return {
      totalDoctors: total,
      activeDoctors: active,
      archivedDoctors: archived,
      stats: [
        { label: '전체 의료진', value: total, icon: GroupsIcon, color: '#4B9CD3', bgColor: '#EBF5FF' },
        { label: '활성 의료진', value: active, icon: VerifiedIcon, color: '#10B981', bgColor: '#ECFDF5' },
        { label: '보관된 의료진', value: archived, icon: ArchiveIcon, color: '#6B7280', bgColor: '#F3F4F6' },
      ],
    };
  }, [doctors]);

  if (loading) {
    return (
      <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1400, mx: 'auto' }}>
        <Box sx={{ mb: 4 }}>
          <Skeleton variant="text" width={200} height={40} />
          <Skeleton variant="text" width={300} height={24} />
        </Box>
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {[1, 2].map((i) => (
            <Grid size={{ xs: 12, sm: 6 }} key={i}>
              <Skeleton variant="rounded" height={100} sx={{ borderRadius: 3 }} />
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={3}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
              <Skeleton variant="rounded" height={280} sx={{ borderRadius: 3 }} />
            </Grid>
          ))}
        </Grid>
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
            <Typography variant="h5" sx={{ fontWeight: 800, color: 'secondary.main', mb: 0.5 }}>
              의료진 관리
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              병원 의료진을 관리하고 새로운 의료진을 초대합니다
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<EmailIcon />}
              onClick={() => setOpenInviteDialog(true)}
              sx={{ borderRadius: 2, borderColor: '#4B9CD3', color: '#4B9CD3', '&:hover': { borderColor: '#3A7BA8', bgcolor: 'rgba(75, 156, 211, 0.08)' } }}
            >
              의료진 초대
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog('add')}
              sx={{
                borderRadius: 2,
                background: 'linear-gradient(135deg, #4B9CD3 0%, #3A7BA8 100%)',
                boxShadow: '0 4px 14px rgba(75, 156, 211, 0.4)',
                '&:hover': {
                  boxShadow: '0 6px 20px rgba(75, 156, 211, 0.5)',
                },
              }}
            >
              직접 등록
            </Button>
          </Box>
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
              <Card
                elevation={0}
                sx={{
                  background: 'white',
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
              </Card>
            </MotionBox>
          </Grid>
        ))}
      </Grid>

      {/* Search and Filters */}
      {doctors.length > 0 && (
        <Card
          elevation={0}
          sx={{
            p: 2,
            mb: 3,
            background: 'white',
            border: '1px solid',
            borderColor: 'grey.200',
            borderRadius: 3,
          }}
        >
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
            <TextField
              placeholder="이름, 전문 분야, 이메일로 검색..."
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
                활성 ({activeDoctors})
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
                보관됨 ({archivedDoctors})
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
                전체 ({totalDoctors})
              </Button>
            </Box>
          </Box>
        </Card>
      )}

      {/* Doctor Cards */}
      {paginatedDoctors.length > 0 ? (
        <Grid container spacing={2}>
          <AnimatePresence>
            {paginatedDoctors.map((doctor, index) => (
              <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={doctor.id}>
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
                    borderColor: doctor.role === 'admin' ? 'info.200' : 'grey.200',
                    bgcolor: doctor.role === 'admin' ? 'info.50' : 'white',
                    borderRadius: 3,
                    position: 'relative',
                    overflow: 'visible',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      borderColor: 'primary.200',
                    },
                  }}
                >
                  {doctor.isMe && (
                    <Chip
                      icon={<PersonIcon sx={{ fontSize: 14 }} />}
                      label="나"
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: -10,
                        left: 16,
                        fontWeight: 700,
                        bgcolor: '#4B9CD3',
                        color: 'white',
                        '& .MuiChip-icon': { color: 'white' },
                      }}
                    />
                  )}
                  {doctor.role === 'admin' && (
                    <Chip
                      label="관리자"
                      size="small"
                      color="info"
                      sx={{
                        position: 'absolute',
                        top: -10,
                        right: 16,
                        fontWeight: 700,
                      }}
                    />
                  )}
                  <CardContent sx={{ p: 2.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Badge
                          overlap="circular"
                          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                          badgeContent={
                            doctor.status === 'active' ? (
                              <Box
                                sx={{
                                  width: 12,
                                  height: 12,
                                  borderRadius: '50%',
                                  bgcolor: 'success.main',
                                  border: '2px solid white',
                                }}
                              />
                            ) : null
                          }
                        >
                          <Avatar
                            src={doctor.avatar}
                            sx={{
                              width: 48,
                              height: 48,
                              background: 'linear-gradient(135deg, #4B9CD3 0%, #3A7BA8 100%)',
                              fontSize: '1.1rem',
                              fontWeight: 700,
                            }}
                          >
                            {doctor.name?.charAt(0) || '?'}
                          </Avatar>
                        </Badge>
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'secondary.main' }}>
                            {doctor.name}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Chip
                              label={doctor.specialty}
                              size="small"
                              sx={{ height: 20, fontSize: '0.7rem', fontWeight: 600, bgcolor: '#E8EDF2', color: '#455A64' }}
                            />
                          </Box>
                        </Box>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <EmailIcon sx={{ fontSize: 14, color: 'grey.400' }} />
                        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>
                          {doctor.email || '-'}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <PhoneIcon sx={{ fontSize: 14, color: 'grey.400' }} />
                        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>
                          {doctor.phone || '-'}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <MedicalServicesIcon sx={{ fontSize: 14, color: 'grey.400' }} />
                        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>
                          면허번호: {doctor.licenseNo || '-'}
                        </Typography>
                      </Box>
                      {doctor.address && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LocationOnIcon sx={{ fontSize: 14, color: 'grey.400' }} />
                          <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>
                            {doctor.address}
                          </Typography>
                        </Box>
                      )}
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Chip
                        icon={<WorkIcon sx={{ fontSize: 14 }} />}
                        label={`입사 ${doctor.joinDate || '-'}`}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: '0.7rem' }}
                      />
                      <Chip
                        label={doctor.status === 'active' ? '활성' : '보관됨'}
                        size="small"
                        sx={{
                          fontSize: '0.65rem',
                          fontWeight: 600,
                          bgcolor: doctor.status === 'active' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(107, 114, 128, 0.1)',
                          color: doctor.status === 'active' ? '#10B981' : '#6B7280',
                        }}
                      />
                    </Box>
                  </CardContent>

                  <Box sx={{ px: 2.5, pb: 2, display: 'flex', gap: 1 }}>
                    <Button
                      size="small"
                      startIcon={<VisibilityIcon />}
                      onClick={() => handleOpenDialog('view', doctor)}
                      sx={{ flex: 1, borderRadius: 1.5, fontSize: '0.75rem' }}
                    >
                      상세
                    </Button>
                    <Button
                      size="small"
                      startIcon={<EditIcon />}
                      onClick={() => handleOpenDialog('edit', doctor)}
                      sx={{ flex: 1, borderRadius: 1.5, fontSize: '0.75rem' }}
                    >
                      수정
                    </Button>
                    {!doctor.isMe && (
                      <Tooltip title={doctor.status === 'active' ? '보관' : '복원'}>
                        <IconButton
                          size="small"
                          onClick={() => handleArchiveDoctor(doctor.id, doctor.status)}
                          sx={{
                            bgcolor: doctor.status === 'active' ? 'grey.100' : 'success.50',
                            color: doctor.status === 'active' ? 'grey.600' : 'success.main',
                          }}
                        >
                          {doctor.status === 'active' ? <ArchiveIcon fontSize="small" /> : <UnarchiveIcon fontSize="small" />}
                        </IconButton>
                      </Tooltip>
                    )}
                    {!doctor.isMe && doctor.status === 'archived' && (
                      <Tooltip title="삭제">
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteDoctor(doctor)}
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
                </MotionCard>
              </Grid>
            ))}
          </AnimatePresence>
        </Grid>
      ) : (
        <MotionPaper
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          elevation={0}
          sx={{
            p: 6,
            borderRadius: 4,
            border: '1px solid',
            borderColor: 'grey.200',
            bgcolor: 'grey.50',
            textAlign: 'center',
          }}
        >
          <PersonAddIcon sx={{ fontSize: 64, color: 'grey.300', mb: 2 }} />
          <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.secondary', mb: 1 }}>
            등록된 의료진이 없습니다
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
            새로운 의료진을 등록하거나 초대하세요
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog('add')}
            sx={{
              borderRadius: 2,
              background: 'linear-gradient(135deg, #4B9CD3 0%, #3A7BA8 100%)',
            }}
          >
            의료진 등록하기
          </Button>
        </MotionPaper>
      )}

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

      {/* Add/Edit Dialog */}
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
          {dialogMode === 'add' ? '새 의료진 등록' : dialogMode === 'edit' ? '의료진 정보 수정' : '의료진 정보'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                required
                label="이름"
                inputRef={nameRef}
                defaultValue=""
                disabled={dialogMode === 'view'}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                required
                select
                label="전문 분야"
                value={formSpecialty}
                onChange={(e) => setFormSpecialty(e.target.value)}
                disabled={dialogMode === 'view'}
              >
                {specialties.map((s) => (
                  <MenuItem key={s} value={s}>{s}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                required
                label="이메일"
                type="email"
                inputRef={emailRef}
                defaultValue=""
                disabled={dialogMode === 'view' || (dialogMode === 'edit' && selectedDoctor?.isMe)}
                helperText={dialogMode === 'edit' && selectedDoctor?.isMe ? '본인 이메일은 변경할 수 없습니다' : ''}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                required
                label="전화번호"
                inputRef={phoneRef}
                defaultValue=""
                onChange={(e) => {
                  if (phoneRef.current) {
                    phoneRef.current.value = formatPhoneNumber(e.target.value);
                  }
                }}
                placeholder="010-0000-0000"
                inputProps={{ maxLength: 13 }}
                disabled={dialogMode === 'view'}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                required
                label="면허번호"
                inputRef={licenseNoRef}
                defaultValue=""
                placeholder="M-00000"
                disabled={dialogMode === 'view'}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                required
                label="입사일"
                type="date"
                inputRef={joinDateRef}
                defaultValue={new Date().toISOString().split('T')[0]}
                InputLabelProps={{ shrink: true }}
                disabled={dialogMode === 'view'}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                required
                label="주소"
                inputRef={addressRef}
                defaultValue=""
                placeholder="서울시 강남구..."
                disabled={dialogMode === 'view'}
              />
            </Grid>
            {(dialogMode === 'edit' || dialogMode === 'view') && (
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  select
                  label="역할"
                  value={formRole}
                  onChange={(e) => setFormRole(e.target.value)}
                  disabled={dialogMode === 'view'}
                >
                  <MenuItem value="admin">관리자</MenuItem>
                  <MenuItem value="doctor">의사</MenuItem>
                </TextField>
              </Grid>
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
              onClick={handleSaveDoctor}
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

        <Snackbar
          open={dialogSnackbar.open}
          autoHideDuration={3000}
          onClose={() => setDialogSnackbar({ ...dialogSnackbar, open: false })}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert severity="warning" onClose={() => setDialogSnackbar({ ...dialogSnackbar, open: false })}>
            {dialogSnackbar.message}
          </Alert>
        </Snackbar>
      </Dialog>

      {/* Invite Dialog */}
      <Dialog
        open={openInviteDialog}
        onClose={() => setOpenInviteDialog(false)}
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
        <DialogTitle sx={{ fontWeight: 700, pb: 1 }}>의료진 초대</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, mt: 1 }}>
            초대할 의료진의 이메일 주소를 입력하세요. 초대 링크가 전송됩니다.
          </Typography>
          <TextField
            fullWidth
            required
            label="이메일 주소"
            type="email"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            placeholder="doctor@example.com"
          />
        </DialogContent>
        <DialogActions sx={{ p: 2.5, pt: 1 }}>
          <Button onClick={() => setOpenInviteDialog(false)} sx={{ borderRadius: 2 }}>
            취소
          </Button>
          <Button
            variant="contained"
            onClick={handleInviteDoctor}
            startIcon={<EmailIcon />}
            sx={{
              borderRadius: 2,
              background: 'linear-gradient(135deg, #4B9CD3 0%, #3A7BA8 100%)',
            }}
          >
            초대 전송
          </Button>
        </DialogActions>
      </Dialog>

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
