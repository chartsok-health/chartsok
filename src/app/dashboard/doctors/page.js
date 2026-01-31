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
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Tooltip,
  Divider,
  Badge,
  Pagination,
  Skeleton,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import { motion } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import StarIcon from '@mui/icons-material/Star';
import VerifiedIcon from '@mui/icons-material/Verified';
import WorkIcon from '@mui/icons-material/Work';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
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
  owner: { label: '원장', color: 'warning' },
  admin: { label: '관리자', color: 'info' },
  doctor: { label: '의사', color: 'primary' },
};

export default function DoctorsPage() {
  const { user, userProfile } = useAuth();
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

  const [formData, setFormData] = useState({
    name: '',
    specialty: '내과',
    role: 'doctor',
    email: '',
    phone: '',
    licenseNo: '',
  });

  const [page, setPage] = useState(1);
  const rowsPerPage = 6;

  // Fetch doctors on mount
  useEffect(() => {
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

    fetchDoctors();
  }, [user?.uid, userProfile?.hospitalId]);

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.includes(searchQuery) ||
      doctor.specialty.includes(searchQuery) ||
      doctor.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredDoctors.length / rowsPerPage);
  const paginatedDoctors = filteredDoctors.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

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
    if (doctor && mode === 'edit') {
      setFormData({
        name: doctor.name,
        specialty: doctor.specialty,
        role: doctor.role,
        email: doctor.email,
        phone: doctor.phone || '',
        licenseNo: doctor.licenseNo || '',
      });
    } else {
      setFormData({
        name: '',
        specialty: '내과',
        role: 'doctor',
        email: '',
        phone: '',
        licenseNo: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedDoctor(null);
  };

  const handleSaveDoctor = async () => {
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
          throw new Error('Failed to add');
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

  const handleDeleteDoctor = async (doctor) => {
    if (doctor.role === 'owner') {
      setSnackbar({ open: true, message: '원장은 삭제할 수 없습니다', severity: 'warning' });
      return;
    }

    if (!confirm('정말 이 의료진을 삭제하시겠습니까?')) {
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
  const totalDoctors = doctors.length;
  const activeDoctors = doctors.filter((d) => d.status === 'active').length;
  const totalPatients = doctors.reduce((sum, d) => sum + (d.patients || 0), 0);

  if (loading) {
    return (
      <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1400, mx: 'auto' }}>
        <Box sx={{ mb: 4 }}>
          <Skeleton variant="text" width={200} height={40} />
          <Skeleton variant="text" width={300} height={24} />
        </Box>
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {[1, 2, 3].map((i) => (
            <Grid size={{ xs: 12, sm: 4 }} key={i}>
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
        {[
          { label: '전체 의료진', value: totalDoctors, color: '#4B9CD3', bgColor: '#EBF5FF', icon: GroupsIcon },
          { label: '활동 중', value: activeDoctors, color: '#10B981', bgColor: '#ECFDF5', icon: VerifiedIcon },
          { label: '담당 환자 수', value: totalPatients, color: '#F59E0B', bgColor: '#FFFBEB', icon: PersonIcon },
        ].map((stat, index) => (
          <Grid size={{ xs: 12, sm: 4 }} key={index}>
            <MotionPaper
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'grey.200',
                bgcolor: 'white',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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
              </Box>
            </MotionPaper>
          </Grid>
        ))}
      </Grid>

      {/* Search */}
      {doctors.length > 0 && (
        <MotionPaper
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          elevation={0}
          sx={{ p: 2, mb: 3, borderRadius: 3, border: '1px solid', borderColor: 'grey.200', bgcolor: 'white' }}
        >
          <TextField
            fullWidth
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
            size="small"
          />
        </MotionPaper>
      )}

      {/* Doctor Cards */}
      {paginatedDoctors.length > 0 ? (
        <Grid container spacing={3}>
          {paginatedDoctors.map((doctor, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={doctor.id}>
              <MotionCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -4 }}
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: doctor.role === 'owner' ? 'warning.200' : 'grey.200',
                  bgcolor: doctor.role === 'owner' ? 'warning.50' : 'white',
                  position: 'relative',
                  overflow: 'visible',
                }}
              >
                {doctor.role === 'owner' && (
                  <Chip
                    icon={<StarIcon sx={{ fontSize: 14 }} />}
                    label="원장"
                    size="small"
                    color="warning"
                    sx={{
                      position: 'absolute',
                      top: -10,
                      right: 16,
                      fontWeight: 700,
                    }}
                  />
                )}
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
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
                          width: 56,
                          height: 56,
                          bgcolor: 'primary.main',
                          fontSize: '1.25rem',
                          fontWeight: 600,
                        }}
                      >
                        {doctor.name.charAt(0)}
                      </Avatar>
                    </Badge>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'secondary.main' }}>
                          {doctor.name}
                        </Typography>
                        {doctor.status === 'pending' && (
                          <Chip label="대기중" size="small" color="default" sx={{ height: 20, fontSize: '0.65rem', fontWeight: 600 }} />
                        )}
                      </Box>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {doctor.specialty}
                      </Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <EmailIcon sx={{ fontSize: 16, color: 'grey.400' }} />
                      <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>
                        {doctor.email || '-'}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PhoneIcon sx={{ fontSize: 16, color: 'grey.400' }} />
                      <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>
                        {doctor.phone || '-'}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <MedicalServicesIcon sx={{ fontSize: 16, color: 'grey.400' }} />
                      <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>
                        면허번호: {doctor.licenseNo || '-'}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                    <Chip
                      icon={<PersonIcon sx={{ fontSize: 14 }} />}
                      label={`환자 ${doctor.patients || 0}명`}
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: '0.7rem' }}
                    />
                    <Chip
                      icon={<WorkIcon sx={{ fontSize: 14 }} />}
                      label={`입사 ${doctor.joinDate || '-'}`}
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: '0.7rem' }}
                    />
                  </Box>
                </CardContent>

                <CardActions sx={{ p: 2, pt: 0, justifyContent: 'flex-end' }}>
                  <Tooltip title="수정">
                    <IconButton size="small" onClick={() => handleOpenDialog('edit', doctor)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  {doctor.role !== 'owner' && (
                    <Tooltip title="삭제">
                      <IconButton size="small" color="error" onClick={() => handleDeleteDoctor(doctor)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                </CardActions>
              </MotionCard>
            </Grid>
          ))}
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
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>
          {dialogMode === 'add' ? '새 의료진 등록' : '의료진 정보 수정'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="이름"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                select
                label="전문 분야"
                value={formData.specialty}
                onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
              >
                {specialties.map((s) => (
                  <MenuItem key={s} value={s}>{s}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="이메일"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="전화번호"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="010-0000-0000"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="면허번호"
                value={formData.licenseNo}
                onChange={(e) => setFormData({ ...formData, licenseNo: e.target.value })}
                placeholder="M-00000"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                select
                label="역할"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                disabled={selectedDoctor?.role === 'owner'}
              >
                <MenuItem value="doctor">의사</MenuItem>
                <MenuItem value="admin">관리자</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseDialog} disabled={saving}>취소</Button>
          <Button
            variant="contained"
            onClick={handleSaveDoctor}
            disabled={saving}
            startIcon={saving ? <CircularProgress size={16} color="inherit" /> : null}
          >
            {saving ? '저장 중...' : (dialogMode === 'add' ? '등록' : '저장')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Invite Dialog */}
      <Dialog open={openInviteDialog} onClose={() => setOpenInviteDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>의료진 초대</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
            초대할 의료진의 이메일 주소를 입력하세요. 초대 링크가 전송됩니다.
          </Typography>
          <TextField
            fullWidth
            label="이메일 주소"
            type="email"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            placeholder="doctor@example.com"
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenInviteDialog(false)}>취소</Button>
          <Button variant="contained" onClick={handleInviteDoctor} startIcon={<EmailIcon />}>
            초대 전송
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
