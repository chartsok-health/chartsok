'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  Box,
  Typography,
  Paper,
  Button,
  IconButton,
  Chip,
  Snackbar,
  Tooltip,
  Grid,
  TextField,
  Card,
  CardContent,
  CircularProgress,
  Tabs,
  Tab,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { motion } from 'framer-motion';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import TimerIcon from '@mui/icons-material/Timer';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import AirIcon from '@mui/icons-material/Air';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import HearingIcon from '@mui/icons-material/Hearing';
import BiotechIcon from '@mui/icons-material/Biotech';
import ScienceIcon from '@mui/icons-material/Science';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ChecklistIcon from '@mui/icons-material/Checklist';
import PrintIcon from '@mui/icons-material/Print';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Avatar from '@mui/material/Avatar';
import { formatCountdown, getSecondsUntilDeletion } from '@/lib/helpers';
import { SectionColors } from '@/lib/constants';
import { useAuth } from '@/lib/AuthContext';

const MotionPaper = motion.create(Paper);
const MotionBox = motion.create(Box);

// Icon mapping for special sections
const sectionIcons = {
  endoscopy: BiotechIcon,
  audiometry: HearingIcon,
  chronicDisease: MonitorHeartIcon,
  labResults: ScienceIcon,
};

export default function HistoryDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { userProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [loading, setLoading] = useState(true);
  const [detailData, setDetailData] = useState(null);
  const [chartData, setChartData] = useState({});
  const [activeTab, setActiveTab] = useState(0);

  // B2B fields
  const [patientInstructions, setPatientInstructions] = useState('');
  const [isEditingInstructions, setIsEditingInstructions] = useState(false);
  const [followUpActions, setFollowUpActions] = useState([]);
  const [newActionText, setNewActionText] = useState('');

  // Fetch chart detail from API
  useEffect(() => {
    async function fetchChartDetail() {
      try {
        setLoading(true);

        let url = `/api/charts/${params.id}`;
        if (userProfile?.hospitalId) {
          url += `?hospitalId=${userProfile.hospitalId}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        if (data.session) {
          setDetailData(data.session);
          setChartData(data.session.chartData || {});
          setPatientInstructions(data.session.patientInstructions || '');
          setFollowUpActions(
            Array.isArray(data.session.followUpActions)
              ? data.session.followUpActions
              : []
          );
        }
      } catch (error) {
        console.error('Error fetching chart detail:', error);
      } finally {
        setLoading(false);
      }
    }

    if (params.id && userProfile) {
      fetchChartDetail();
    }
  }, [params.id, userProfile]);

  // Get template sections
  const templateSections = detailData?.templateSections || [
    { key: 'subjective', name: 'Subjective (주관적)' },
    { key: 'objective', name: 'Objective (객관적)' },
    { key: 'assessment', name: 'Assessment (평가)' },
    { key: 'plan', name: 'Plan (계획)' },
  ];

  const templateName = detailData?.template?.name || 'SOAP';

  // Calculate and update countdown every second
  useEffect(() => {
    if (!detailData) return;

    const calculateRemaining = () => {
      return getSecondsUntilDeletion(detailData.createdAt, 24);
    };

    setRemainingSeconds(calculateRemaining());
    const interval = setInterval(() => {
      setRemainingSeconds(calculateRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, [detailData]);

  if (loading) {
    return (
      <Box sx={{ p: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!detailData) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5" sx={{ color: 'text.secondary' }}>
          세션을 찾을 수 없습니다
        </Typography>
        <Button onClick={() => router.push('/dashboard/history')} sx={{ mt: 2 }}>
          목록으로 돌아가기
        </Button>
      </Box>
    );
  }

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setSnackbar({ open: true, message: '클립보드에 복사되었습니다' });
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/charts', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chartId: detailData.id,
          hospitalId: userProfile?.hospitalId || null,
          chartData: chartData,
          patientInstructions,
          followUpActions,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save chart');
      }

      setIsEditing(false);
      setIsEditingInstructions(false);
      setSnackbar({ open: true, message: '저장되었습니다' });
    } catch (error) {
      console.error('Save error:', error);
      setSnackbar({ open: true, message: '저장 중 오류가 발생했습니다' });
    }
  };

  const handleToggleAction = async (index) => {
    const updated = followUpActions.map((action, i) =>
      i === index ? { ...action, completed: !action.completed } : action
    );
    setFollowUpActions(updated);

    // Auto-save action toggle
    try {
      await fetch('/api/charts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chartId: detailData.id,
          hospitalId: userProfile?.hospitalId || null,
          followUpActions: updated,
        }),
      });
    } catch (err) {
      console.error('Error saving action toggle:', err);
    }
  };

  const handleAddAction = async () => {
    if (!newActionText.trim()) return;
    const updated = [...followUpActions, { text: newActionText.trim(), completed: false }];
    setFollowUpActions(updated);
    setNewActionText('');

    try {
      await fetch('/api/charts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chartId: detailData.id,
          hospitalId: userProfile?.hospitalId || null,
          followUpActions: updated,
        }),
      });
    } catch (err) {
      console.error('Error saving new action:', err);
    }
  };

  const handleRemoveAction = async (index) => {
    const updated = followUpActions.filter((_, i) => i !== index);
    setFollowUpActions(updated);

    try {
      await fetch('/api/charts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chartId: detailData.id,
          hospitalId: userProfile?.hospitalId || null,
          followUpActions: updated,
        }),
      });
    } catch (err) {
      console.error('Error removing action:', err);
    }
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    const patientName = detailData.patientName || '환자';
    printWindow.document.write(`
      <html>
        <head>
          <title>환자 안내문 - ${patientName}</title>
          <style>
            body { font-family: 'Malgun Gothic', sans-serif; padding: 40px; line-height: 1.8; }
            h1 { font-size: 20px; border-bottom: 2px solid #333; padding-bottom: 10px; }
            .content { white-space: pre-line; font-size: 14px; margin-top: 20px; }
            .footer { margin-top: 40px; font-size: 12px; color: #666; border-top: 1px solid #ddd; padding-top: 10px; }
          </style>
        </head>
        <body>
          <h1>환자 안내문</h1>
          <p><strong>환자명:</strong> ${patientName}</p>
          <p><strong>날짜:</strong> ${detailData.date || new Date().toLocaleDateString('ko-KR')}</p>
          <div class="content">${patientInstructions}</div>
          <div class="footer">chartsok (차트쏙) | AI 의료 차트 자동화</div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const getSectionLabel = (sectionKey) => {
    const labelMap = {
      subjective: 'S',
      objective: 'O',
      assessment: 'A',
      plan: 'P',
      endoscopy: '내시경',
      audiometry: '청력',
      chronicDisease: '만성',
      labResults: '검사',
      imaging: '영상',
      rom: 'ROM',
      lesionDescription: '병변',
      dermoscopy: '피부경',
      growth: '성장',
      vaccination: '예방',
    };
    return labelMap[sectionKey] || sectionKey.charAt(0).toUpperCase();
  };

  const completedActions = followUpActions.filter(a => a.completed).length;
  const totalActions = followUpActions.length;

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1600, mx: 'auto' }}>
      {/* Header */}
      <MotionBox
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{ mb: 4 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconButton onClick={() => router.push('/dashboard/history')} sx={{ mr: 1 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            진료 기록으로 돌아가기
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
              <Typography variant="h4" sx={{ fontWeight: 800, color: 'secondary.main' }}>
                {detailData.diagnosis || '진단 없음'}
              </Typography>
              {detailData.icdCode && (
                <Chip
                  label={detailData.icdCode}
                  sx={{
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    bgcolor: 'primary.main',
                    color: 'white',
                  }}
                />
              )}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Chip
                icon={<CalendarTodayIcon sx={{ fontSize: 16 }} />}
                label={detailData.date}
                size="small"
                variant="outlined"
              />
              <Chip
                icon={<AccessTimeIcon sx={{ fontSize: 16 }} />}
                label={detailData.time}
                size="small"
                variant="outlined"
              />
              <Chip
                icon={<PersonIcon sx={{ fontSize: 16 }} />}
                label={`${detailData.patientGender || ''} / ${detailData.patientAge || ''}`}
                size="small"
                variant="outlined"
              />
              <Chip
                label={templateName}
                size="small"
                sx={{ bgcolor: 'primary.50', color: 'primary.main', fontWeight: 600 }}
              />
              {totalActions > 0 && (
                <Chip
                  icon={<ChecklistIcon sx={{ fontSize: 16 }} />}
                  label={`액션 ${completedActions}/${totalActions}`}
                  size="small"
                  color={completedActions === totalActions ? 'success' : 'warning'}
                  sx={{ fontWeight: 600 }}
                />
              )}
            </Box>
          </Box>
        </Box>
      </MotionBox>

      {/* Patient Info & Vitals Section */}
      <MotionPaper
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        elevation={0}
        sx={{ p: 3, mb: 3, borderRadius: 3, border: '1px solid', borderColor: 'grey.200' }}
      >
        <Grid container spacing={3}>
          {/* Patient Info */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Avatar
                sx={{
                  width: 56,
                  height: 56,
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  background: detailData.patientGender === '여'
                    ? 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)'
                    : 'linear-gradient(135deg, #4B9CD3 0%, #3A7BA8 100%)',
                }}
              >
                {(detailData.patientName || '환').charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>{detailData.patientName || '환자'}</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {detailData.patientAge || ''} · {detailData.patientGender || ''} · {detailData.chartNo || ''}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.secondary', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                <MedicalServicesIcon sx={{ fontSize: 18, color: 'warning.main' }} />
                주호소
              </Typography>
              <Paper elevation={0} sx={{ p: 2, bgcolor: 'warning.50', borderRadius: 2, border: '1px solid', borderColor: 'warning.100' }}>
                <Typography variant="body2" sx={{ color: 'text.primary', lineHeight: 1.6 }}>
                  {detailData.chiefComplaint || '기록된 주호소가 없습니다.'}
                </Typography>
              </Paper>
            </Box>
          </Grid>

          {/* Vitals */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'secondary.main', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <MonitorHeartIcon sx={{ color: 'error.main' }} />
              활력 징후 (Vital Signs)
            </Typography>
            <Grid container spacing={2}>
              {[
                { label: '혈압', value: `${detailData.vitals?.systolic || '-'}/${detailData.vitals?.diastolic || '-'}`, unit: 'mmHg', icon: MonitorHeartIcon, color: '#EF4444' },
                { label: '맥박', value: detailData.vitals?.heartRate || '-', unit: 'bpm', icon: FavoriteIcon, color: '#EC4899' },
                { label: '체온', value: detailData.vitals?.temperature || '-', unit: '°C', icon: ThermostatIcon, color: '#F59E0B' },
                { label: 'SpO2', value: detailData.vitals?.spO2 || '-', unit: '%', icon: AirIcon, color: '#3B82F6' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <Grid size={{ xs: 6, sm: 3 }} key={item.label}>
                    <Card elevation={0} sx={{ p: 2, textAlign: 'center', bgcolor: `${item.color}08`, borderRadius: 2, border: '1px solid', borderColor: `${item.color}20` }}>
                      <Icon sx={{ fontSize: 28, color: item.color, mb: 0.5 }} />
                      <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>{item.label}</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 0.5, mt: 0.5 }}>
                        <Typography variant="h6" sx={{ fontWeight: 800, color: item.color }}>{item.value}</Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>{item.unit}</Typography>
                      </Box>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </MotionPaper>

      <Grid container spacing={3} sx={{ alignItems: 'stretch' }}>
        {/* Left: Transcription */}
        <Grid size={{ xs: 12, lg: 5 }}>
          <MotionPaper
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            elevation={0}
            sx={{
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'grey.200',
              height: '100%',
              minHeight: { lg: 600 },
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'grey.100' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'secondary.main' }}>
                  진료 대화 기록
                </Typography>
                {remainingSeconds > 0 ? (
                  <Chip
                    icon={<TimerIcon sx={{ fontSize: 14 }} />}
                    label={`자동 삭제: ${formatCountdown(remainingSeconds)}`}
                    size="small"
                    sx={{
                      fontFamily: 'monospace',
                      fontWeight: 600,
                      bgcolor: remainingSeconds < 3600 ? 'error.50' : 'warning.50',
                      color: remainingSeconds < 3600 ? 'error.main' : 'warning.main',
                      '& .MuiChip-icon': {
                        color: remainingSeconds < 3600 ? 'error.main' : 'warning.main',
                      },
                    }}
                  />
                ) : (
                  <Chip
                    label="삭제됨"
                    size="small"
                    sx={{
                      fontWeight: 600,
                      bgcolor: 'grey.200',
                      color: 'grey.500',
                    }}
                  />
                )}
              </Box>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                음성 파일은 텍스트 변환 후 즉시 삭제되며, 대화 기록은 24시간 후 자동 삭제됩니다
              </Typography>
            </Box>

            <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
              {remainingSeconds <= 0 ? (
                <Box sx={{ textAlign: 'center', py: 8, color: 'text.secondary' }}>
                  <TimerIcon sx={{ fontSize: 48, color: 'grey.300', mb: 1 }} />
                  <Typography variant="body1" sx={{ fontWeight: 600, color: 'grey.500', mb: 1 }}>
                    대화 기록이 삭제되었습니다
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'grey.400' }}>
                    환자 개인정보 보호를 위해 대화 기록은 24시간 후 자동으로 삭제됩니다.
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'grey.400', mt: 0.5 }}>
                    차트, 안내문, 후속 조치는 그대로 유지됩니다.
                  </Typography>
                </Box>
              ) : detailData.transcription && detailData.transcription.length > 0 ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  {detailData.transcription.map((item, index) => (
                    <MotionBox
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                    >
                      <Card
                        elevation={0}
                        sx={{
                          bgcolor: item.speaker === '의사' ? '#EBF5FF' : 'grey.50',
                          border: '1px solid',
                          borderColor: item.speaker === '의사' ? '#C3DCF5' : 'grey.200',
                          borderRadius: 2,
                        }}
                      >
                        <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                            <Box
                              sx={{
                                width: 22,
                                height: 22,
                                borderRadius: 1,
                                bgcolor: item.speaker === '의사' ? '#4B9CD3' : 'grey.400',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              {item.speaker === '의사' ? (
                                <LocalHospitalIcon sx={{ fontSize: 12, color: 'white' }} />
                              ) : (
                                <PersonIcon sx={{ fontSize: 12, color: 'white' }} />
                              )}
                            </Box>
                            <Typography variant="caption" sx={{ fontWeight: 700, color: item.speaker === '의사' ? '#4B9CD3' : 'text.secondary' }}>
                              {item.speaker}
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'grey.400', ml: 'auto', fontSize: '0.7rem' }}>
                              {item.timestamp}
                            </Typography>
                          </Box>
                          <Typography variant="body2" sx={{ color: 'text.primary', lineHeight: 1.5, fontSize: '0.85rem' }}>
                            {item.text}
                          </Typography>
                        </CardContent>
                      </Card>
                    </MotionBox>
                  ))}
                </Box>
              ) : (
                <Box sx={{ textAlign: 'center', py: 6, color: 'text.secondary' }}>
                  <Typography variant="body2">대화 기록이 없습니다</Typography>
                </Box>
              )}
            </Box>
          </MotionPaper>
        </Grid>

        {/* Right: Tabbed Panel (Chart / Instructions / Actions) */}
        <Grid size={{ xs: 12, lg: 7 }}>
          <MotionPaper
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            elevation={0}
            sx={{
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'grey.200',
              height: '100%',
              minHeight: { lg: 600 },
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Tab Headers */}
            <Box sx={{ borderBottom: '1px solid', borderColor: 'grey.100' }}>
              <Tabs
                value={activeTab}
                onChange={(e, newVal) => setActiveTab(newVal)}
                sx={{
                  px: 1,
                  '& .MuiTab-root': {
                    fontWeight: 600,
                    fontSize: '0.8rem',
                    textTransform: 'none',
                    minHeight: 48,
                  },
                }}
              >
                <Tab
                  icon={<LocalHospitalIcon sx={{ fontSize: 16 }} />}
                  iconPosition="start"
                  label={`${templateName} 차트`}
                />
                <Tab
                  icon={<AssignmentIcon sx={{ fontSize: 16 }} />}
                  iconPosition="start"
                  label="환자 안내문"
                />
                <Tab
                  icon={<ChecklistIcon sx={{ fontSize: 16 }} />}
                  iconPosition="start"
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      후속 조치
                      {totalActions > 0 && (
                        <Chip
                          label={`${completedActions}/${totalActions}`}
                          size="small"
                          color={completedActions === totalActions ? 'success' : 'default'}
                          sx={{ height: 18, fontSize: '0.65rem', fontWeight: 700 }}
                        />
                      )}
                    </Box>
                  }
                />
              </Tabs>
            </Box>

            {/* Tab Content */}
            <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
              {/* Tab 0: Chart */}
              {activeTab === 0 && (
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                    <Button
                      variant={isEditing ? 'contained' : 'outlined'}
                      startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
                      onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                      size="small"
                    >
                      {isEditing ? '저장' : '편집'}
                    </Button>
                  </Box>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {templateSections.map((section, index) => {
                      const sectionKey = section.key || section.sectionKey;
                      const SectionIcon = sectionIcons[sectionKey] || null;
                      const sectionColor = SectionColors[sectionKey]?.color || '#64748B';
                      const sectionBgColor = SectionColors[sectionKey]?.bgColor || '#F8FAFC';

                      return (
                        <MotionBox
                          key={sectionKey}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <Box sx={{ display: 'flex', gap: 2 }}>
                            <Box
                              sx={{
                                width: 40,
                                height: 40,
                                borderRadius: 2,
                                bgcolor: sectionBgColor,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                              }}
                            >
                              {SectionIcon ? (
                                <SectionIcon sx={{ fontSize: 20, color: sectionColor }} />
                              ) : (
                                <Typography variant="h6" sx={{ fontWeight: 800, color: sectionColor }}>
                                  {getSectionLabel(sectionKey)}
                                </Typography>
                              )}
                            </Box>

                            <Box sx={{ flex: 1 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: sectionColor }}>
                                  {section.name || section.labelKo}
                                </Typography>
                                <Tooltip title="복사">
                                  <IconButton size="small" onClick={() => handleCopy(chartData[sectionKey] || '')}>
                                    <ContentCopyIcon sx={{ fontSize: 16 }} />
                                  </IconButton>
                                </Tooltip>
                              </Box>
                              {isEditing ? (
                                <TextField
                                  fullWidth
                                  multiline
                                  minRows={2}
                                  value={chartData[sectionKey] || ''}
                                  onChange={(e) => setChartData((prev) => ({ ...prev, [sectionKey]: e.target.value }))}
                                  size="small"
                                  placeholder={`${section.name || section.labelKo} 내용을 입력하세요`}
                                  sx={{ '& .MuiOutlinedInput-root': { bgcolor: sectionBgColor } }}
                                />
                              ) : (
                                <Paper
                                  elevation={0}
                                  sx={{
                                    p: 1.5,
                                    bgcolor: chartData[sectionKey] ? 'grey.50' : sectionBgColor,
                                    borderRadius: 2,
                                    border: '1px solid',
                                    borderColor: 'grey.200',
                                  }}
                                >
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      whiteSpace: 'pre-line',
                                      lineHeight: 1.7,
                                      fontSize: '0.85rem',
                                      color: chartData[sectionKey] ? 'text.primary' : 'grey.400',
                                      fontStyle: chartData[sectionKey] ? 'normal' : 'italic',
                                    }}
                                  >
                                    {chartData[sectionKey] || '내용 없음'}
                                  </Typography>
                                </Paper>
                              )}
                            </Box>
                          </Box>
                        </MotionBox>
                      );
                    })}
                  </Box>
                </Box>
              )}

              {/* Tab 1: Patient Instructions */}
              {activeTab === 1 && (
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AssignmentIcon sx={{ fontSize: 20, color: '#10B981' }} />
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'secondary.main' }}>
                        환자 안내문
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Tooltip title="복사">
                        <IconButton size="small" onClick={() => handleCopy(patientInstructions)}>
                          <ContentCopyIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="인쇄">
                        <IconButton size="small" onClick={handlePrint}>
                          <PrintIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={isEditingInstructions ? '저장' : '편집'}>
                        <IconButton
                          size="small"
                          onClick={() => {
                            if (isEditingInstructions) {
                              handleSave();
                            }
                            setIsEditingInstructions(!isEditingInstructions);
                          }}
                          color={isEditingInstructions ? 'primary' : 'default'}
                        >
                          {isEditingInstructions ? <SaveIcon sx={{ fontSize: 18 }} /> : <EditIcon sx={{ fontSize: 18 }} />}
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>

                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      border: '1px solid',
                      borderColor: '#10B98130',
                      bgcolor: '#FAFFFE',
                    }}
                  >
                    {isEditingInstructions ? (
                      <TextField
                        fullWidth
                        multiline
                        minRows={10}
                        value={patientInstructions}
                        onChange={(e) => setPatientInstructions(e.target.value)}
                        placeholder="환자에게 전달할 안내문을 작성하세요"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            bgcolor: 'white',
                            fontSize: '0.875rem',
                          },
                        }}
                      />
                    ) : patientInstructions ? (
                      <Typography
                        variant="body2"
                        sx={{
                          whiteSpace: 'pre-line',
                          lineHeight: 1.8,
                          color: 'text.primary',
                        }}
                      >
                        {patientInstructions}
                      </Typography>
                    ) : (
                      <Box sx={{ textAlign: 'center', py: 4 }}>
                        <AssignmentIcon sx={{ fontSize: 48, color: 'grey.300', mb: 1 }} />
                        <Typography variant="body2" sx={{ color: 'grey.400' }}>
                          이 진료 기록에는 안내문이 없습니다
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'grey.400' }}>
                          편집 버튼을 눌러 안내문을 추가할 수 있습니다
                        </Typography>
                      </Box>
                    )}
                  </Paper>
                </Box>
              )}

              {/* Tab 2: Follow-up Actions */}
              {activeTab === 2 && (
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <ChecklistIcon sx={{ fontSize: 20, color: '#F59E0B' }} />
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'secondary.main' }}>
                        후속 조치
                      </Typography>
                      {totalActions > 0 && (
                        <Chip
                          label={`${completedActions}/${totalActions} 완료`}
                          size="small"
                          color={completedActions === totalActions ? 'success' : 'warning'}
                          sx={{ fontWeight: 600, fontSize: '0.7rem' }}
                        />
                      )}
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {followUpActions.map((action, index) => (
                      <Paper
                        key={index}
                        elevation={0}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          px: 2,
                          py: 0.5,
                          borderRadius: 2,
                          border: '1px solid',
                          borderColor: action.completed ? '#10B98140' : 'grey.200',
                          bgcolor: action.completed ? '#ECFDF5' : 'white',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={action.completed}
                              onChange={() => handleToggleAction(index)}
                              sx={{
                                color: 'grey.400',
                                '&.Mui-checked': { color: '#10B981' },
                              }}
                            />
                          }
                          label={
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: 500,
                                textDecoration: action.completed ? 'line-through' : 'none',
                                color: action.completed ? 'text.secondary' : 'text.primary',
                              }}
                            >
                              {action.text}
                            </Typography>
                          }
                          sx={{ flex: 1, m: 0 }}
                        />
                        <IconButton
                          size="small"
                          onClick={() => handleRemoveAction(index)}
                          sx={{ color: 'grey.400', '&:hover': { color: 'error.main' } }}
                        >
                          <DeleteOutlineIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                      </Paper>
                    ))}
                  </Box>

                  {/* Add new action */}
                  <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="새 항목 추가..."
                      value={newActionText}
                      onChange={(e) => setNewActionText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddAction();
                        }
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          fontSize: '0.875rem',
                        },
                      }}
                    />
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<AddIcon />}
                      onClick={handleAddAction}
                      disabled={!newActionText.trim()}
                      sx={{ borderRadius: 2, whiteSpace: 'nowrap', fontWeight: 600 }}
                    >
                      추가
                    </Button>
                  </Box>

                  {followUpActions.length === 0 && (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                      <ChecklistIcon sx={{ fontSize: 48, color: 'grey.300', mb: 1 }} />
                      <Typography variant="body2" sx={{ color: 'grey.400' }}>
                        후속 조치 항목이 없습니다
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'grey.400' }}>
                        위에서 새 항목을 추가할 수 있습니다
                      </Typography>
                    </Box>
                  )}
                </Box>
              )}
            </Box>
          </MotionPaper>
        </Grid>
      </Grid>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </Box>
  );
}
