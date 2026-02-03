'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Paper,
  Button,
  IconButton,
  Chip,
  TextField,
  Divider,
  Snackbar,
  Tooltip,
  Alert,
  CircularProgress,
  Tabs,
  Tab,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import DescriptionIcon from '@mui/icons-material/Description';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PersonIcon from '@mui/icons-material/Person';
import ReplayIcon from '@mui/icons-material/Replay';
import HearingIcon from '@mui/icons-material/Hearing';
import BiotechIcon from '@mui/icons-material/Biotech';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import ScienceIcon from '@mui/icons-material/Science';
import PrintIcon from '@mui/icons-material/Print';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ChecklistIcon from '@mui/icons-material/Checklist';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useAuth } from '@/lib/AuthContext';

const MotionBox = motion.create(Box);

// Default SOAP sections for when template doesn't have sections defined
const defaultSOAPSections = [
  { sectionKey: 'subjective', labelKo: 'Subjective (주관적)', color: '#4B9CD3', isRequired: true },
  { sectionKey: 'objective', labelKo: 'Objective (객관적)', color: '#10B981', isRequired: true },
  { sectionKey: 'assessment', labelKo: 'Assessment (평가)', color: '#F59E0B', isRequired: true },
  { sectionKey: 'plan', labelKo: 'Plan (계획)', color: '#8B5CF6', isRequired: true },
];

// Icon mapping for special sections
const sectionIcons = {
  endoscopy: BiotechIcon,
  audiometry: HearingIcon,
  chronicDisease: MonitorHeartIcon,
  labResults: ScienceIcon,
};

// Helper function to safely convert any value to a displayable string
const formatSectionContent = (value) => {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'object') {
    return Object.entries(value)
      .map(([key, val]) => `${key}: ${typeof val === 'object' ? JSON.stringify(val) : val}`)
      .join('\n');
  }
  return String(value);
};

export default function RecordResultPage() {
  const { user, userProfile } = useAuth();
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [chartData, setChartData] = useState({});
  const [transcription, setTranscription] = useState([]);
  const [recordingDuration, setRecordingDuration] = useState('00:00');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  // New B2B fields
  const [patientInstructions, setPatientInstructions] = useState('');
  const [isEditingInstructions, setIsEditingInstructions] = useState(false);
  const [followUpActions, setFollowUpActions] = useState([]);
  const [newActionText, setNewActionText] = useState('');

  // Default SOAP template for fallback
  const defaultSoapTemplate = {
    id: 'default-soap',
    name: 'SOAP 기본',
    description: '표준 SOAP 형식 차트 템플릿',
    category: 'soap',
    isDefault: true,
    isSystem: true,
    status: 'active',
    content: `[Subjective]
환자의 주호소 및 현병력을 기록합니다.

[Objective]
신체 검진 및 검사 소견을 기록합니다.

[Assessment]
진단 및 감별 진단을 기록합니다.

[Plan]
치료 계획 및 처방을 기록합니다.`,
  };

  // Template states
  const [templates, setTemplates] = useState([defaultSoapTemplate]);
  const [selectedTemplateId, setSelectedTemplateId] = useState('default-soap');
  const [templateSections, setTemplateSections] = useState(defaultSOAPSections);

  // Data from record page
  const [patientInfo, setPatientInfo] = useState(null);
  const [vitalsInfo, setVitalsInfo] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [userSettings, setUserSettings] = useState({ aiTone: '', keywords: [] });
  const [userData, setUserData] = useState({ userId: '', hospitalId: '', doctorName: '' });

  // Fetch templates on mount
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const specialty = userProfile?.specialty || null;
        const userId = userProfile?.uid || user?.uid || null;

        const params = new URLSearchParams();
        if (userId) params.append('userId', userId);
        if (specialty) params.append('specialty', specialty);

        const url = `/api/templates${params.toString() ? '?' + params.toString() : ''}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.templates && data.templates.length > 0) {
          setTemplates(data.templates);
          const defaultTemplate = data.templates.find(t =>
            t.specialty === specialty || t.isDefault
          ) || data.templates[0];

          if (defaultTemplate) {
            setSelectedTemplateId(defaultTemplate.id);
            const isSOAP = defaultTemplate.category === 'soap' ||
              defaultTemplate.id === 'default-soap' ||
              (defaultTemplate.content && defaultTemplate.content.includes('[Subjective]'));

            if (isSOAP) {
              setTemplateSections(defaultSOAPSections);
            } else if (defaultTemplate.sections && defaultTemplate.sections.length > 0) {
              setTemplateSections(defaultTemplate.sections);
            }
          }
        } else {
          setTemplates([defaultSoapTemplate]);
          setSelectedTemplateId('default-soap');
          setTemplateSections(defaultSOAPSections);
        }
      } catch (err) {
        console.error('Error fetching templates:', err);
        setTemplates([defaultSoapTemplate]);
        setSelectedTemplateId('default-soap');
        setTemplateSections(defaultSOAPSections);
      }
    };

    fetchTemplates();
  }, [userProfile?.specialty, userProfile?.uid, user?.uid]);

  // Load all data from sessionStorage and generate chart
  useEffect(() => {
    const loadAndGenerate = async () => {
      try {
        const storedTranscription = sessionStorage.getItem('transcription');
        const storedDuration = sessionStorage.getItem('recordingDuration');
        const storedPatientInfo = sessionStorage.getItem('patientInfo');
        const storedVitalsInfo = sessionStorage.getItem('vitalsInfo');
        const storedTemplate = sessionStorage.getItem('selectedTemplate');
        const storedUserSettings = sessionStorage.getItem('userSettings');
        const storedUserData = sessionStorage.getItem('userData');

        if (storedPatientInfo) {
          setPatientInfo(JSON.parse(storedPatientInfo));
        }
        if (storedVitalsInfo) {
          setVitalsInfo(JSON.parse(storedVitalsInfo));
        }
        if (storedTemplate) {
          const parsedTemplate = JSON.parse(storedTemplate);
          setSelectedTemplate(parsedTemplate);

          const isSOAP = parsedTemplate.category === 'soap' ||
            parsedTemplate.id === 'default-soap' ||
            (parsedTemplate.content && parsedTemplate.content.includes('[Subjective]'));

          if (isSOAP) {
            setTemplateSections(defaultSOAPSections);
          } else {
            setTemplateSections([]);
          }
        }
        if (storedUserSettings) {
          setUserSettings(JSON.parse(storedUserSettings));
        }
        if (storedUserData) {
          setUserData(JSON.parse(storedUserData));
        }
        if (storedDuration) {
          setRecordingDuration(storedDuration);
        }

        if (storedTranscription) {
          const parsedTranscription = JSON.parse(storedTranscription);
          setTranscription(parsedTranscription);

          if (parsedTranscription.length > 0) {
            await generateChart(parsedTranscription, {
              patientInfo: storedPatientInfo ? JSON.parse(storedPatientInfo) : null,
              vitalsInfo: storedVitalsInfo ? JSON.parse(storedVitalsInfo) : null,
              template: storedTemplate ? JSON.parse(storedTemplate) : null,
              userSettings: storedUserSettings ? JSON.parse(storedUserSettings) : null,
            });
          } else {
            setError('녹음된 내용이 없습니다. 다시 녹음해 주세요.');
            setIsGenerating(false);
          }
        } else {
          setError('녹음 데이터가 없습니다. 데모 데이터를 표시합니다.');
          setTranscription([
            { speaker: '의사', text: '안녕하세요, 어디가 불편하셔서 오셨나요?', timestamp: '00:03' },
            { speaker: '환자', text: '며칠 전부터 목이 아프고 기침이 나요.', timestamp: '00:08' },
            { speaker: '의사', text: '열은 있으셨나요?', timestamp: '00:15' },
            { speaker: '환자', text: '어제 밤에 37.8도까지 올랐어요.', timestamp: '00:20' },
          ]);
          generateDemoData();
          setIsGenerating(false);
        }
      } catch (err) {
        console.error('Error loading transcription:', err);
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
        setIsGenerating(false);
      }
    };

    if (selectedTemplateId) {
      loadAndGenerate();
    }
  }, [selectedTemplateId]);

  const generateDemoData = () => {
    setChartData({
      subjective: '주소: 인후통, 기침\n현병력: 며칠 전부터 목 통증과 기침 증상 시작. 어제 밤 37.8°C 발열.\n과거력: 특이 병력 없음',
      objective: '활력징후: BT 37.8°C\n신체검사: 추가 검사 필요',
      assessment: '급성 인두염 의심\n- J02.9 급성 인두염, 상세불명',
      plan: '1. 추가 신체검사 필요\n2. 증상에 따른 대증 치료\n3. 수분 섭취 권장',
    });
    setPatientInstructions(
      '진단명: 급성 인두염 (목감기)\n\n' +
      '[ 복약 안내 ]\n- 처방된 약을 하루 3회 식후 30분에 드세요\n- 약을 빠뜨리지 않고 끝까지 복용하세요\n\n' +
      '[ 생활 수칙 ]\n- 물을 자주 드세요 (하루 8잔 이상)\n- 충분히 쉬세요\n- 자극적인 음식은 피하세요\n\n' +
      '[ 주의사항 ]\n- 열이 39도 이상 오르면 응급실을 방문하세요\n- 호흡곤란이 있으면 즉시 내원하세요\n\n' +
      '[ 재방문 ]\n- 3일 후 재진 예정입니다'
    );
    setFollowUpActions([
      { text: '처방전 출력', completed: false },
      { text: '3일 후 재진 예약', completed: false },
      { text: '환자 안내문 출력', completed: false },
    ]);
  };

  const generateChart = async (transcriptionData, additionalData = {}) => {
    try {
      setIsGenerating(true);
      setError(null);

      const { patientInfo, vitalsInfo, template, userSettings: settings } = additionalData;

      const response = await fetch('/api/generate-chart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transcription: transcriptionData,
          specialty: userProfile?.specialty || 'general',
          templateId: selectedTemplateId,
          template: template || null,
          vitals: vitalsInfo || null,
          patientInfo: patientInfo || null,
          aiTone: settings?.aiTone || '',
          keywords: settings?.keywords || [],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Chart generation failed');
      }

      const data = await response.json();

      // Handle chart content
      if (data.chartContent) {
        setChartData({ content: data.chartContent });
      } else if (data.soap && Object.keys(data.soap).length > 0) {
        setChartData(data.soap);
      } else {
        console.warn('API returned empty data, using demo data');
        generateDemoData();
        return;
      }

      // Handle new B2B fields
      if (data.patientInstructions) {
        setPatientInstructions(data.patientInstructions);
      }
      if (data.followUpActions && data.followUpActions.length > 0) {
        setFollowUpActions(
          data.followUpActions.map(action =>
            typeof action === 'string' ? { text: action, completed: false } : action
          )
        );
      }
    } catch (err) {
      console.error('Chart generation error:', err);
      setError('차트 생성 중 오류가 발생했습니다: ' + err.message);
      generateDemoData();
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRetry = () => {
    if (transcription.length > 0) {
      generateChart(transcription);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setSnackbar({ open: true, message: '클립보드에 복사되었습니다', severity: 'success' });
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    const patientName = patientInfo?.name || '환자';
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
          <p><strong>날짜:</strong> ${new Date().toLocaleDateString('ko-KR')}</p>
          <div class="content">${patientInstructions}</div>
          <div class="footer">chartsok (차트쏙) | AI 의료 차트 자동화</div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const handleToggleAction = (index) => {
    setFollowUpActions(prev =>
      prev.map((action, i) =>
        i === index ? { ...action, completed: !action.completed } : action
      )
    );
  };

  const handleAddAction = () => {
    if (!newActionText.trim()) return;
    setFollowUpActions(prev => [...prev, { text: newActionText.trim(), completed: false }]);
    setNewActionText('');
  };

  const handleRemoveAction = (index) => {
    setFollowUpActions(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    try {
      if (!chartData || Object.keys(chartData).length === 0) {
        setSnackbar({ open: true, message: '저장할 차트 내용이 없습니다', severity: 'error' });
        return false;
      }

      if (!userData?.hospitalId) {
        setSnackbar({ open: true, message: '병원 정보가 없습니다. 다시 녹음해 주세요.', severity: 'error' });
        return false;
      }

      // Extract diagnosis from assessment
      const assessmentValue = chartData.assessment;
      let diagnosis = '';
      if (typeof assessmentValue === 'string') {
        diagnosis = assessmentValue.split('\n')[0] || '';
      } else if (assessmentValue && typeof assessmentValue === 'object') {
        diagnosis = Object.values(assessmentValue).join(' ').split('\n')[0] || '';
      }
      if (!diagnosis && chartData.content) {
        diagnosis = typeof chartData.content === 'string' ? chartData.content.split('\n')[0] : '';
      }

      // Convert all chartData values to strings before saving
      const normalizedChartData = {};
      for (const [key, value] of Object.entries(chartData)) {
        normalizedChartData[key] = formatSectionContent(value);
      }

      const response = await fetch('/api/charts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          templateId: selectedTemplateId,
          chartData: normalizedChartData,
          diagnosis,
          patientId: patientInfo?.id || null,
          patientName: patientInfo?.name || null,
          patientChartNo: patientInfo?.chartNo || null,
          hospitalId: userData?.hospitalId || null,
          userId: userData?.userId || null,
          doctorId: userData?.doctorId || userData?.userId || null,
          doctorName: userData?.doctorName || '',
          vitals: vitalsInfo || null,
          transcription: transcription || [],
          recordingDuration: recordingDuration || '00:00',
          // New B2B fields
          patientInstructions: patientInstructions || '',
          followUpActions: followUpActions || [],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to save chart');
      }

      setIsEditing(false);
      setIsEditingInstructions(false);
      setSnackbar({ open: true, message: '차트가 저장되었습니다', severity: 'success' });
      return true;
    } catch (err) {
      console.error('Save error:', err);
      setSnackbar({ open: true, message: `저장 중 오류가 발생했습니다: ${err.message}`, severity: 'error' });
      return false;
    }
  };

  const getSelectedTemplateName = () => {
    const template = templates.find(t => t.id === selectedTemplateId);
    return template?.name || 'SOAP';
  };

  const isSOAPTemplate = () => {
    if (selectedTemplate) {
      return (
        selectedTemplate.category === 'soap' ||
        selectedTemplate.id === 'default-soap' ||
        (selectedTemplate.content && selectedTemplate.content.includes('[Subjective]'))
      );
    }
    if (selectedTemplateId === 'default-soap' || selectedTemplateId.includes('soap')) {
      return true;
    }
    if (chartData.subjective || chartData.objective || chartData.assessment || chartData.plan) {
      return true;
    }
    return templateSections.some(s =>
      ['subjective', 'objective', 'assessment', 'plan'].includes(s.sectionKey)
    );
  };

  const completedActions = followUpActions.filter(a => a.completed).length;
  const totalActions = followUpActions.length;

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1600, mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: 'secondary.main', mb: 0.5 }}>
            진료 기록 생성
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {isGenerating
              ? 'AI가 진료 내용을 분석 중입니다...'
              : `AI가 차트, 안내문, 후속 조치를 생성했습니다`}
          </Typography>
        </Box>
      </Box>

      {/* Error Alert */}
      {error && !isGenerating && (
        <Alert
          severity="warning"
          sx={{ mb: 3, borderRadius: 2 }}
          action={
            transcription.length > 0 && (
              <Button color="inherit" size="small" startIcon={<ReplayIcon />} onClick={handleRetry}>
                재시도
              </Button>
            )
          }
        >
          {error}
        </Alert>
      )}

      {/* Generation Loading */}
      <AnimatePresence>
        {isGenerating && (
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            sx={{ mb: 4 }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 6,
                borderRadius: 4,
                border: '1px solid',
                borderColor: 'grey.200',
                textAlign: 'center',
              }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              >
                <AutoAwesomeIcon sx={{ fontSize: 64, color: 'primary.main', mb: 3 }} />
              </motion.div>
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'secondary.main', mb: 2 }}>
                AI가 차트를 생성하고 있습니다
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4 }}>
                차트, 환자 안내문, 후속 조치 항목을 한번에 생성 중입니다...
              </Typography>
              <CircularProgress size={32} />
            </Paper>
          </MotionBox>
        )}
      </AnimatePresence>

      {/* Main Content */}
      {!isGenerating && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', lg: 'row' } }}>
            {/* Left: Transcription */}
            <Paper
              elevation={0}
              sx={{
                flex: { lg: '0 0 350px' },
                p: 3,
                borderRadius: 4,
                border: '1px solid',
                borderColor: 'grey.200',
                maxHeight: { lg: 'calc(100vh - 200px)' },
                overflow: 'auto',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <DescriptionIcon sx={{ mr: 1, color: 'primary.main', fontSize: 20 }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'secondary.main' }}>
                    녹음 내용
                  </Typography>
                </Box>
                <Chip label={recordingDuration} size="small" variant="outlined" />
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {transcription.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Box sx={{ display: 'flex', gap: 1.5 }}>
                      <Box
                        sx={{
                          width: 28,
                          height: 28,
                          borderRadius: 1.5,
                          bgcolor: item.speaker === '의사' ? 'primary.main' : 'grey.400',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        {item.speaker === '의사' ? (
                          <LocalHospitalIcon sx={{ fontSize: 14, color: 'white' }} />
                        ) : (
                          <PersonIcon sx={{ fontSize: 14, color: 'white' }} />
                        )}
                      </Box>
                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.25 }}>
                          <Typography variant="caption" sx={{ fontWeight: 600, color: item.speaker === '의사' ? 'primary.main' : 'text.secondary' }}>
                            {item.speaker}
                          </Typography>
                          {item.timestamp && (
                            <Typography variant="caption" sx={{ color: 'grey.400' }}>
                              {item.timestamp}
                            </Typography>
                          )}
                        </Box>
                        <Typography variant="body2" sx={{ color: 'text.primary', lineHeight: 1.5 }}>
                          {item.text}
                        </Typography>
                      </Box>
                    </Box>
                  </motion.div>
                ))}
                {transcription.length === 0 && (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="body2" sx={{ color: 'grey.400' }}>
                      녹음 내용이 없습니다
                    </Typography>
                  </Box>
                )}
              </Box>
            </Paper>

            {/* Right: Tabbed Content (Chart / Instructions / Actions) */}
            <Paper
              elevation={0}
              sx={{
                flex: 1,
                borderRadius: 4,
                border: '1px solid',
                borderColor: 'grey.200',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Tabs */}
              <Box sx={{ borderBottom: '1px solid', borderColor: 'grey.200' }}>
                <Tabs
                  value={activeTab}
                  onChange={(e, newVal) => setActiveTab(newVal)}
                  sx={{
                    px: 2,
                    '& .MuiTab-root': {
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      textTransform: 'none',
                      minHeight: 52,
                    },
                  }}
                >
                  <Tab
                    icon={<LocalHospitalIcon sx={{ fontSize: 18 }} />}
                    iconPosition="start"
                    label={`${getSelectedTemplateName()} 차트`}
                  />
                  <Tab
                    icon={<AssignmentIcon sx={{ fontSize: 18 }} />}
                    iconPosition="start"
                    label="환자 안내문"
                  />
                  <Tab
                    icon={<ChecklistIcon sx={{ fontSize: 18 }} />}
                    iconPosition="start"
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        후속 조치
                        {totalActions > 0 && (
                          <Chip
                            label={`${completedActions}/${totalActions}`}
                            size="small"
                            color={completedActions === totalActions ? 'success' : 'default'}
                            sx={{ height: 20, fontSize: '0.7rem', fontWeight: 700 }}
                          />
                        )}
                      </Box>
                    }
                  />
                </Tabs>
              </Box>

              {/* Tab Content */}
              <Box sx={{ p: 3, flex: 1, overflow: 'auto' }}>
                {/* Tab 0: Chart */}
                {activeTab === 0 && (
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                      <Chip
                        icon={<CheckCircleIcon />}
                        label="AI 생성 완료"
                        size="small"
                        color="success"
                      />
                      <Tooltip title={isEditing ? '저장' : '편집'}>
                        <IconButton
                          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                          color={isEditing ? 'primary' : 'default'}
                          size="small"
                        >
                          {isEditing ? <SaveIcon /> : <EditIcon />}
                        </IconButton>
                      </Tooltip>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                      {isSOAPTemplate() ? (
                        (templateSections.length > 0 && templateSections[0].labelKo
                          ? templateSections
                          : defaultSOAPSections
                        ).map((section, index) => {
                          const SectionIcon = sectionIcons[section.sectionKey] || null;
                          return (
                            <MotionBox
                              key={section.sectionKey || `section-${index}`}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                              <Box
                                sx={{
                                  borderLeft: '4px solid',
                                  borderColor: section.color || 'primary.main',
                                  pl: 2,
                                }}
                              >
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    {SectionIcon && (
                                      <SectionIcon sx={{ fontSize: 18, color: section.color }} />
                                    )}
                                    <Typography
                                      variant="subtitle2"
                                      sx={{ fontWeight: 700, color: section.color || 'primary.main' }}
                                    >
                                      {section.labelKo}
                                    </Typography>
                                  </Box>
                                  <Tooltip title="복사">
                                    <IconButton
                                      size="small"
                                      onClick={() => handleCopy(formatSectionContent(chartData[section.sectionKey]))}
                                    >
                                      <ContentCopyIcon sx={{ fontSize: 16 }} />
                                    </IconButton>
                                  </Tooltip>
                                </Box>
                                {isEditing ? (
                                  <TextField
                                    fullWidth
                                    multiline
                                    minRows={3}
                                    value={formatSectionContent(chartData[section.sectionKey])}
                                    onChange={(e) =>
                                      setChartData((prev) => ({
                                        ...prev,
                                        [section.sectionKey]: e.target.value,
                                      }))
                                    }
                                    placeholder={`${section.labelKo} 내용을 입력하세요`}
                                    sx={{
                                      '& .MuiOutlinedInput-root': {
                                        bgcolor: 'grey.50',
                                        fontSize: '0.875rem',
                                      },
                                    }}
                                  />
                                ) : (
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      color: chartData[section.sectionKey] ? 'text.primary' : 'grey.400',
                                      whiteSpace: 'pre-line',
                                      lineHeight: 1.7,
                                      bgcolor: 'grey.50',
                                      p: 2,
                                      borderRadius: 2,
                                      fontStyle: chartData[section.sectionKey] ? 'normal' : 'italic',
                                    }}
                                  >
                                    {formatSectionContent(chartData[section.sectionKey]) || '내용 없음'}
                                  </Typography>
                                )}
                              </Box>
                            </MotionBox>
                          );
                        })
                      ) : (
                        <MotionBox
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Box sx={{ borderLeft: '4px solid', borderColor: 'primary.main', pl: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <DescriptionIcon sx={{ fontSize: 18, color: 'primary.main' }} />
                                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main' }}>
                                  {selectedTemplate?.name || '차트 내용'}
                                </Typography>
                              </Box>
                              <Tooltip title="복사">
                                <IconButton size="small" onClick={() => handleCopy(chartData.content || '')}>
                                  <ContentCopyIcon sx={{ fontSize: 16 }} />
                                </IconButton>
                              </Tooltip>
                            </Box>
                            {isEditing ? (
                              <TextField
                                fullWidth
                                multiline
                                minRows={10}
                                value={chartData.content || ''}
                                onChange={(e) => setChartData(prev => ({ ...prev, content: e.target.value }))}
                                placeholder="차트 내용을 입력하세요"
                                sx={{
                                  '& .MuiOutlinedInput-root': {
                                    bgcolor: 'grey.50',
                                    fontSize: '0.875rem',
                                    fontFamily: 'monospace',
                                  },
                                }}
                              />
                            ) : (
                              <Typography
                                variant="body2"
                                sx={{
                                  color: chartData.content ? 'text.primary' : 'grey.400',
                                  whiteSpace: 'pre-line',
                                  lineHeight: 1.7,
                                  bgcolor: 'grey.50',
                                  p: 2,
                                  borderRadius: 2,
                                  fontStyle: chartData.content ? 'normal' : 'italic',
                                  fontFamily: 'monospace',
                                }}
                              >
                                {chartData.content || '내용 없음'}
                              </Typography>
                            )}
                          </Box>
                        </MotionBox>
                      )}
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
                        <Chip
                          label="AI 생성"
                          size="small"
                          sx={{ bgcolor: '#ECFDF5', color: '#10B981', fontWeight: 600, fontSize: '0.7rem' }}
                        />
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
                        <Tooltip title={isEditingInstructions ? '완료' : '편집'}>
                          <IconButton
                            size="small"
                            onClick={() => setIsEditingInstructions(!isEditingInstructions)}
                            color={isEditingInstructions ? 'primary' : 'default'}
                          >
                            {isEditingInstructions ? <SaveIcon sx={{ fontSize: 18 }} /> : <EditIcon sx={{ fontSize: 18 }} />}
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>

                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                      진단 결과와 치료 계획을 바탕으로 환자에게 전달할 안내문입니다. 인쇄하거나 복사하여 전달할 수 있습니다.
                    </Typography>

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
                      ) : (
                        <Typography
                          variant="body2"
                          sx={{
                            whiteSpace: 'pre-line',
                            lineHeight: 1.8,
                            color: patientInstructions ? 'text.primary' : 'grey.400',
                            fontStyle: patientInstructions ? 'normal' : 'italic',
                          }}
                        >
                          {patientInstructions || '안내문이 생성되지 않았습니다'}
                        </Typography>
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

                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                      진료 후 처리해야 할 항목들입니다. 완료되면 체크하세요.
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      {followUpActions.map((action, index) => (
                        <MotionBox
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2, delay: index * 0.05 }}
                        >
                          <Paper
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
                        </MotionBox>
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
                        <Typography variant="body2" sx={{ color: 'grey.400' }}>
                          후속 조치 항목이 없습니다
                        </Typography>
                      </Box>
                    )}
                  </Box>
                )}
              </Box>

              {/* Bottom Action Bar */}
              <Box
                sx={{
                  p: 2,
                  borderTop: '1px solid',
                  borderColor: 'grey.200',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: 1.5,
                }}
              >
                <Button
                  variant="outlined"
                  onClick={() => {
                    const allText = isSOAPTemplate()
                      ? Object.entries(chartData)
                          .map(([key, val]) => `[${key.toUpperCase()}]\n${formatSectionContent(val)}`)
                          .join('\n\n')
                      : chartData.content || '';
                    handleCopy(allText);
                  }}
                  startIcon={<ContentCopyIcon />}
                  sx={{ borderRadius: 2, fontWeight: 600 }}
                >
                  전체 복사
                </Button>
                <Button
                  variant="contained"
                  onClick={async () => {
                    const saved = await handleSave();
                    if (saved) {
                      sessionStorage.removeItem('transcription');
                      sessionStorage.removeItem('recordingDuration');
                      sessionStorage.removeItem('patientInfo');
                      sessionStorage.removeItem('vitalsInfo');
                      sessionStorage.removeItem('selectedTemplate');
                      sessionStorage.removeItem('userSettings');
                      sessionStorage.removeItem('userData');
                      router.push('/dashboard/history');
                    }
                  }}
                  startIcon={<SaveIcon />}
                  sx={{
                    borderRadius: 2,
                    fontWeight: 600,
                    background: 'linear-gradient(135deg, #4B9CD3 0%, #3A7BA8 100%)',
                  }}
                >
                  저장 및 완료
                </Button>
              </Box>
            </Paper>
          </Box>
        </motion.div>
      )}

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
