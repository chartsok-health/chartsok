'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Paper,
  Button,
  Switch,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
  Chip,
  Grid,
  IconButton,
  InputAdornment,
  CircularProgress,
  Skeleton,
} from '@mui/material';
import { motion } from 'framer-motion';
import SaveIcon from '@mui/icons-material/Save';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PsychologyIcon from '@mui/icons-material/Psychology';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from '@/lib/AuthContext';

const MotionBox = motion.create(Box);
const MotionPaper = motion.create(Paper);

// Move components outside to prevent remounting on state changes
const SettingSection = ({ icon: Icon, title, description, children, color = '#4B9CD3', delay = 0 }) => (
  <MotionPaper
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    elevation={0}
    sx={{
      borderRadius: 4,
      border: '1px solid',
      borderColor: 'grey.200',
      overflow: 'hidden',
    }}
  >
    <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'grey.100', bgcolor: 'grey.50' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: 2,
            bgcolor: `${color}15`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon sx={{ color, fontSize: 22 }} />
        </Box>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700, color: 'secondary.main' }}>
            {title}
          </Typography>
          {description && (
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {description}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
    <Box sx={{ p: 3 }}>{children}</Box>
  </MotionPaper>
);

const ToggleSetting = ({ label, description, checked, onChange }) => (
  <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', py: 1.5 }}>
    <Box sx={{ pr: 2 }}>
      <Typography variant="body1" sx={{ fontWeight: 600 }}>
        {label}
      </Typography>
      {description && (
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.25 }}>
          {description}
        </Typography>
      )}
    </Box>
    <Switch checked={checked} onChange={(e) => onChange(e.target.checked)} />
  </Box>
);

const specialties = ['내과', '이비인후과', '정형외과', '피부과', '소아과', '정신건강의학과', '가정의학과', '신경과', '외과', '기타'];

export default function SettingsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const [settings, setSettings] = useState({
    displayName: '',
    specialty: '내과',
    hospitalName: '',
    email: '',
    phone: '',
    licenseNo: '',
    address: '',
    emailNotifications: true,
    soundEnabled: true,
    aiTone: '',
  });

  const [customTerms, setCustomTerms] = useState([]);
  const [newTerm, setNewTerm] = useState('');
  const [addingTerm, setAddingTerm] = useState(false);

  // Fetch settings and keywords on mount
  useEffect(() => {
    const fetchData = async () => {
      if (!user?.uid) {
        setLoading(false);
        return;
      }

      try {
        // Fetch settings and keywords in parallel
        const [settingsRes, keywordsRes] = await Promise.all([
          fetch(`/api/settings?userId=${user.uid}`),
          fetch(`/api/keywords?userId=${user.uid}&category=custom`),
        ]);

        if (settingsRes.ok) {
          const data = await settingsRes.json();
          if (data.settings) {
            setSettings(prev => ({
              ...prev,
              displayName: data.settings.displayName || user?.displayName || '',
              specialty: data.settings.specialty || '내과',
              hospitalName: data.settings.hospitalName || '',
              email: data.settings.email || user?.email || '',
              phone: data.settings.phone || '',
              licenseNo: data.settings.licenseNo || '',
              address: data.settings.address || '',
              emailNotifications: data.settings.emailNotifications ?? true,
              soundEnabled: data.settings.soundEnabled ?? true,
              aiTone: data.settings.aiTone || '',
            }));
          }
        }

        if (keywordsRes.ok) {
          const data = await keywordsRes.json();
          setCustomTerms(data.keywords || []);
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
        setSnackbar({ open: true, message: '설정을 불러오는데 실패했습니다', severity: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.uid, user?.displayName]);

  const handleChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    if (!user?.uid) return;

    setSaving(true);
    try {
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.uid,
          ...settings,
        }),
      });

      if (response.ok) {
        setSnackbar({ open: true, message: '설정이 저장되었습니다', severity: 'success' });
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      setSnackbar({ open: true, message: '설정 저장에 실패했습니다', severity: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleAddTerm = async () => {
    if (!newTerm.trim() || !user?.uid) return;
    if (customTerms.some(t => t.term === newTerm.trim())) {
      setSnackbar({ open: true, message: '이미 등록된 용어입니다', severity: 'warning' });
      return;
    }

    setAddingTerm(true);
    try {
      const response = await fetch('/api/keywords', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.uid,
          term: newTerm.trim(),
          category: 'custom',
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setCustomTerms([...customTerms, data.keyword]);
        setNewTerm('');
        setSnackbar({ open: true, message: '용어가 추가되었습니다', severity: 'success' });
      } else {
        throw new Error('Failed to add');
      }
    } catch (error) {
      console.error('Error adding term:', error);
      setSnackbar({ open: true, message: '용어 추가에 실패했습니다', severity: 'error' });
    } finally {
      setAddingTerm(false);
    }
  };

  const handleDeleteTerm = async (keyword) => {
    try {
      const response = await fetch(`/api/keywords?id=${keyword.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCustomTerms(customTerms.filter((t) => t.id !== keyword.id));
        setSnackbar({ open: true, message: '용어가 삭제되었습니다', severity: 'info' });
      } else {
        throw new Error('Failed to delete');
      }
    } catch (error) {
      console.error('Error deleting term:', error);
      setSnackbar({ open: true, message: '용어 삭제에 실패했습니다', severity: 'error' });
    }
  };

  if (loading) {
    return (
      <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1000, mx: 'auto' }}>
        <Box sx={{ mb: 4 }}>
          <Skeleton variant="text" width={200} height={40} />
          <Skeleton variant="text" width={300} height={24} />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} variant="rounded" height={200} sx={{ borderRadius: 4 }} />
          ))}
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1000, mx: 'auto' }}>
      {/* Header */}
      <MotionBox
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{ mb: 4 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: 'secondary.main', mb: 0.5 }}>
              설정
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              chartsok 환경을 개인화하세요
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={saving ? <CircularProgress size={16} color="inherit" /> : <SaveIcon />}
            onClick={handleSave}
            disabled={saving}
            sx={{ px: 3 }}
          >
            {saving ? '저장 중...' : '저장하기'}
          </Button>
        </Box>
      </MotionBox>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Profile Settings */}
        <SettingSection
          icon={PersonIcon}
          title="프로필 설정"
          description="기본 사용자 정보를 설정합니다"
          delay={0.1}
        >
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="이름"
                value={settings.displayName}
                onChange={(e) => handleChange('displayName', e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel>전문 분야</InputLabel>
                <Select
                  value={settings.specialty}
                  label="전문 분야"
                  onChange={(e) => handleChange('specialty', e.target.value)}
                >
                  {specialties.map((spec) => (
                    <MenuItem key={spec} value={spec}>{spec}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="이메일"
                type="email"
                value={settings.email}
                disabled
                helperText="이메일은 계정에 연결되어 변경할 수 없습니다"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="전화번호"
                value={settings.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="010-0000-0000"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="의사 면허번호"
                value={settings.licenseNo}
                onChange={(e) => handleChange('licenseNo', e.target.value)}
                placeholder="예: 12345"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="병원/의원명"
                value={settings.hospitalName}
                onChange={(e) => handleChange('hospitalName', e.target.value)}
                placeholder="예: 서울내과의원"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="주소"
                value={settings.address}
                onChange={(e) => handleChange('address', e.target.value)}
                placeholder="예: 서울특별시 강남구 테헤란로 123"
              />
            </Grid>
          </Grid>
        </SettingSection>

        {/* Custom Terms Settings */}
        <SettingSection
          icon={LocalOfferIcon}
          title="자주 사용하는 용어"
          description="AI가 더 정확하게 인식할 의학 용어를 추가하세요"
          color="#8B5CF6"
          delay={0.2}
        >
          <Box sx={{ display: 'flex', gap: 1, mb: 2.5, alignItems: 'center' }}>
            <TextField
              fullWidth
              placeholder="용어 입력 후 Enter"
              value={newTerm}
              onChange={(e) => setNewTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddTerm()}
              size="small"
              disabled={addingTerm}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleAddTerm}
                        size="small"
                        disabled={!newTerm.trim() || addingTerm}
                        sx={{
                          bgcolor: newTerm.trim() && !addingTerm ? '#8B5CF6' : 'transparent',
                          color: newTerm.trim() && !addingTerm ? 'white' : 'grey.400',
                          '&:hover': { bgcolor: newTerm.trim() && !addingTerm ? '#7C3AED' : 'transparent' },
                          transition: 'all 0.2s',
                        }}
                      >
                        {addingTerm ? <CircularProgress size={16} color="inherit" /> : <AddIcon sx={{ fontSize: 18 }} />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: 'grey.50',
                },
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {customTerms.map((keyword) => (
              <Chip
                key={keyword.id}
                label={keyword.term}
                onDelete={() => handleDeleteTerm(keyword)}
                deleteIcon={<CloseIcon sx={{ fontSize: 16 }} />}
                sx={{
                  bgcolor: '#EDE9FE',
                  color: '#5B21B6',
                  fontWeight: 500,
                  '& .MuiChip-deleteIcon': {
                    color: '#7C3AED',
                    '&:hover': { color: '#5B21B6' },
                  },
                }}
              />
            ))}
            {customTerms.length === 0 && (
              <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                등록된 용어가 없습니다
              </Typography>
            )}
          </Box>
        </SettingSection>

        {/* AI Tone Settings */}
        <SettingSection
          icon={PsychologyIcon}
          title="AI 톤 설정"
          description="AI가 차트를 작성할 때 참고할 스타일과 톤을 설정합니다"
          color="#EC4899"
          delay={0.3}
        >
          <TextField
            fullWidth
            multiline
            rows={4}
            label="AI 작성 스타일"
            value={settings.aiTone}
            onChange={(e) => handleChange('aiTone', e.target.value)}
            placeholder="예: 간결하고 객관적인 톤으로 작성해주세요. 환자에게 공감하는 표현을 포함하고, 전문 의학 용어를 적절히 사용해주세요. 진단과 치료 계획은 명확하게 구분해서 작성해주세요."
            helperText="AI가 차트를 요약하거나 작성할 때 이 설명을 참고합니다. 원하는 문체, 톤, 형식 등을 자유롭게 설명해주세요."
            sx={{
              '& .MuiOutlinedInput-root': {
                bgcolor: 'grey.50',
              },
            }}
          />
        </SettingSection>

        {/* Notification Settings */}
        <SettingSection
          icon={NotificationsIcon}
          title="알림 설정"
          description="알림 수신 방법을 설정합니다"
          color="#64748B"
          delay={0.4}
        >
          <ToggleSetting
            label="이메일 알림"
            description="중요 알림을 이메일로 받습니다"
            checked={settings.emailNotifications}
            onChange={(v) => handleChange('emailNotifications', v)}
          />
          <ToggleSetting
            label="소리 알림"
            description="차트 생성 완료 시 소리 알림을 받습니다"
            checked={settings.soundEnabled}
            onChange={(v) => handleChange('soundEnabled', v)}
          />
        </SettingSection>

        {/* Danger Zone */}
        <MotionPaper
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          elevation={0}
          sx={{
            borderRadius: 4,
            border: '1px solid',
            borderColor: 'error.200',
            overflow: 'hidden',
          }}
        >
          <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'error.100', bgcolor: 'error.50' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'error.main' }}>
              위험 구역
            </Typography>
            <Typography variant="body2" sx={{ color: 'error.main', opacity: 0.8 }}>
              이 작업은 되돌릴 수 없습니다
            </Typography>
          </Box>
          <Box sx={{ p: 3, display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              color="error"
              onClick={() => setSnackbar({ open: true, message: '준비 중인 기능입니다', severity: 'info' })}
            >
              모든 데이터 삭제
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => setSnackbar({ open: true, message: '준비 중인 기능입니다', severity: 'info' })}
            >
              계정 삭제
            </Button>
          </Box>
        </MotionPaper>
      </Box>

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
