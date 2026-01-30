'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Paper,
  Button,
  Switch,
  FormControlLabel,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
  Chip,
  Grid,
  Card,
  CardContent,
  Divider,
  IconButton,
  InputAdornment,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from '@/lib/AuthContext';

// Move components outside to prevent remounting on state changes
const SettingSection = ({ icon: Icon, title, description, children, color = '#4B9CD3' }) => (
  <Paper
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
  </Paper>
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
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const [settings, setSettings] = useState({
    displayName: user?.displayName || '',
    specialty: '내과',
    hospitalName: '',
    chartTemplate: 'soap',
    autoSave: true,
    includeICD: true,
    defaultLanguage: 'ko',
    emailNotifications: true,
    soundEnabled: true,
    speakerDetection: true,
    autoCorrect: true,
    medicalTerms: true,
  });

  const [customTerms, setCustomTerms] = useState(['급성 편도염', '상기도 감염', '고혈압', '당뇨병']);
  const [newTerm, setNewTerm] = useState('');

  const handleChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    setSnackbar({ open: true, message: '설정이 저장되었습니다', severity: 'success' });
  };

  const handleAddTerm = () => {
    if (newTerm.trim() && !customTerms.includes(newTerm.trim())) {
      setCustomTerms([...customTerms, newTerm.trim()]);
      setNewTerm('');
      setSnackbar({ open: true, message: '용어가 추가되었습니다', severity: 'success' });
    }
  };

  const handleDeleteTerm = (termToDelete) => {
    setCustomTerms(customTerms.filter((term) => term !== termToDelete));
    setSnackbar({ open: true, message: '용어가 삭제되었습니다', severity: 'info' });
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1000, mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: 'secondary.main', mb: 0.5 }}>
              설정
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              chartsok 환경을 개인화하세요
            </Typography>
          </Box>
          <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave} sx={{ px: 3 }}>
            저장하기
          </Button>
        </Box>
      </Box>

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
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="병원/의원명"
                value={settings.hospitalName}
                onChange={(e) => handleChange('hospitalName', e.target.value)}
                placeholder="예: 서울내과의원"
              />
            </Grid>
          </Grid>
        </SettingSection>

        {/* Chart Settings */}
        <SettingSection
          icon={DescriptionIcon}
          title="차트 설정"
          description="차트 생성 방식을 설정합니다"
          color="#10B981"
          delay={0.2}
        >
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel>차트 템플릿</InputLabel>
                <Select
                  value={settings.chartTemplate}
                  label="차트 템플릿"
                  onChange={(e) => handleChange('chartTemplate', e.target.value)}
                >
                  <MenuItem value="soap">SOAP 형식</MenuItem>
                  <MenuItem value="narrative">서술형</MenuItem>
                  <MenuItem value="problem">문제 중심</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel>기본 언어</InputLabel>
                <Select
                  value={settings.defaultLanguage}
                  label="기본 언어"
                  onChange={(e) => handleChange('defaultLanguage', e.target.value)}
                >
                  <MenuItem value="ko">한국어</MenuItem>
                  <MenuItem value="en">English</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Divider sx={{ my: 3 }} />
          <ToggleSetting
            label="자동 저장"
            description="녹음 종료 시 자동으로 차트를 저장합니다"
            checked={settings.autoSave}
            onChange={(v) => handleChange('autoSave', v)}
          />
          <ToggleSetting
            label="ICD 코드 자동 포함"
            description="진단에 해당하는 ICD 코드를 자동으로 포함합니다"
            checked={settings.includeICD}
            onChange={(v) => handleChange('includeICD', v)}
          />
        </SettingSection>

        {/* AI Settings */}
        <SettingSection
          icon={AutoAwesomeIcon}
          title="AI 설정"
          description="AI 음성 인식 및 차트 생성 설정"
          color="#8B5CF6"
          delay={0.3}
        >
          <ToggleSetting
            label="화자 자동 구분"
            description="AI가 의사와 환자의 대화를 자동으로 구분합니다"
            checked={settings.speakerDetection}
            onChange={(v) => handleChange('speakerDetection', v)}
          />
          <ToggleSetting
            label="자동 교정"
            description="음성 인식 오류를 AI가 자동으로 교정합니다"
            checked={settings.autoCorrect}
            onChange={(v) => handleChange('autoCorrect', v)}
          />
          <ToggleSetting
            label="의학 용어 최적화"
            description="의학 전문 용어 인식을 최적화합니다"
            checked={settings.medicalTerms}
            onChange={(v) => handleChange('medicalTerms', v)}
          />
        </SettingSection>

        {/* Custom Terms Settings */}
        <SettingSection
          icon={LocalOfferIcon}
          title="자주 사용하는 용어"
          description="AI가 더 정확하게 인식할 의학 용어를 추가하세요"
          color="#8B5CF6"
          delay={0.4}
        >
          <Box sx={{ display: 'flex', gap: 1, mb: 2.5, alignItems: 'center' }}>
            <TextField
              fullWidth
              placeholder="용어 입력 후 Enter"
              value={newTerm}
              onChange={(e) => setNewTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddTerm()}
              size="small"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleAddTerm}
                        size="small"
                        disabled={!newTerm.trim()}
                        sx={{
                          bgcolor: newTerm.trim() ? '#8B5CF6' : 'transparent',
                          color: newTerm.trim() ? 'white' : 'grey.400',
                          '&:hover': { bgcolor: newTerm.trim() ? '#7C3AED' : 'transparent' },
                          transition: 'all 0.2s',
                        }}
                      >
                        <AddIcon sx={{ fontSize: 18 }} />
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
            {customTerms.map((term) => (
              <Chip
                key={term}
                label={term}
                onDelete={() => handleDeleteTerm(term)}
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

        {/* Notification Settings */}
        <SettingSection
          icon={NotificationsIcon}
          title="알림 설정"
          description="알림 수신 방법을 설정합니다"
          color="#64748B"
          delay={0.5}
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
        <Paper
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
        </Paper>
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
