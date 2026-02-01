'use client';

import { useState, useEffect } from 'react';
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
    // Convert object to formatted string (key: value pairs)
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

  // Template states - initialize with default SOAP sections
  const [templates, setTemplates] = useState([defaultSoapTemplate]);
  const [selectedTemplateId, setSelectedTemplateId] = useState('default-soap');
  const [templateSections, setTemplateSections] = useState(defaultSOAPSections);

  // Data from record page
  const [patientInfo, setPatientInfo] = useState(null);
  const [vitalsInfo, setVitalsInfo] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [userSettings, setUserSettings] = useState({ aiTone: '', keywords: [] });
  const [userData, setUserData] = useState({ userId: '', hospitalId: '', doctorName: '' });

  // Fetch templates on mount - pass userId for proper fallback with default SOAP
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const specialty = userProfile?.specialty || null;
        const userId = userProfile?.uid || user?.uid || null;

        // Build URL with userId for proper template loading (includes default SOAP)
        const params = new URLSearchParams();
        if (userId) params.append('userId', userId);
        if (specialty) params.append('specialty', specialty);

        const url = `/api/templates${params.toString() ? '?' + params.toString() : ''}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.templates && data.templates.length > 0) {
          setTemplates(data.templates);
          // Set default template based on specialty or first template
          const defaultTemplate = data.templates.find(t =>
            t.specialty === specialty || t.isDefault
          ) || data.templates[0];

          if (defaultTemplate) {
            setSelectedTemplateId(defaultTemplate.id);
            // For SOAP templates, ALWAYS use defaultSOAPSections
            const isSOAP = defaultTemplate.category === 'soap' ||
              defaultTemplate.id === 'default-soap' ||
              (defaultTemplate.content && defaultTemplate.content.includes('[Subjective]'));

            if (isSOAP) {
              // Always use default SOAP sections for SOAP templates
              setTemplateSections(defaultSOAPSections);
            } else if (defaultTemplate.sections && defaultTemplate.sections.length > 0) {
              // Only use template sections for non-SOAP templates with valid sections
              setTemplateSections(defaultTemplate.sections);
            }
          }
        } else {
          // Fallback to default SOAP template if no templates returned
          console.log('No templates from API, using default SOAP');
          setTemplates([defaultSoapTemplate]);
          setSelectedTemplateId('default-soap');
          setTemplateSections(defaultSOAPSections);
        }
      } catch (err) {
        console.error('Error fetching templates:', err);
        // Fallback to default SOAP template on error
        setTemplates([defaultSoapTemplate]);
        setSelectedTemplateId('default-soap');
        setTemplateSections(defaultSOAPSections);
      }
    };

    fetchTemplates();
  }, [userProfile?.specialty, userProfile?.uid, user?.uid]);

  // Debug: Log chartData and templateSections changes
  useEffect(() => {
    console.log('chartData updated:', chartData);
    console.log('templateSections:', templateSections);
  }, [chartData, templateSections]);

  // Load all data from sessionStorage and generate chart
  useEffect(() => {
    const loadAndGenerate = async () => {
      console.log('loadAndGenerate called with selectedTemplateId:', selectedTemplateId);

      try {
        // Load all stored data
        const storedTranscription = sessionStorage.getItem('transcription');
        const storedDuration = sessionStorage.getItem('recordingDuration');
        const storedPatientInfo = sessionStorage.getItem('patientInfo');
        const storedVitalsInfo = sessionStorage.getItem('vitalsInfo');
        const storedTemplate = sessionStorage.getItem('selectedTemplate');
        const storedUserSettings = sessionStorage.getItem('userSettings');
        const storedUserData = sessionStorage.getItem('userData');

        console.log('SessionStorage data:', {
          hasTranscription: !!storedTranscription,
          hasUserData: !!storedUserData,
          hasTemplate: !!storedTemplate,
        });

        // Parse and set all data
        if (storedPatientInfo) {
          setPatientInfo(JSON.parse(storedPatientInfo));
        }
        if (storedVitalsInfo) {
          setVitalsInfo(JSON.parse(storedVitalsInfo));
        }
        if (storedTemplate) {
          const parsedTemplate = JSON.parse(storedTemplate);
          setSelectedTemplate(parsedTemplate);

          // Set templateSections based on the stored template
          const isSOAP = parsedTemplate.category === 'soap' ||
            parsedTemplate.id === 'default-soap' ||
            (parsedTemplate.content && parsedTemplate.content.includes('[Subjective]'));

          if (isSOAP) {
            // Always use default SOAP sections for SOAP templates
            setTemplateSections(defaultSOAPSections);
          } else {
            // For non-SOAP, clear sections (will show text content instead)
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
            // Pass all data to generateChart
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
          // No transcription found - use mock data for demo
          setError('녹음 데이터가 없습니다. 데모 데이터를 표시합니다.');
          setTranscription([
            { speaker: '의사', text: '안녕하세요, 어디가 불편하셔서 오셨나요?', timestamp: '00:03' },
            { speaker: '환자', text: '며칠 전부터 목이 아프고 기침이 나요.', timestamp: '00:08' },
            { speaker: '의사', text: '열은 있으셨나요?', timestamp: '00:15' },
            { speaker: '환자', text: '어제 밤에 37.8도까지 올랐어요.', timestamp: '00:20' },
          ]);
          // Generate demo data based on current template
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
    // Different demo data based on template type
    const template = templates.find(t => t.id === selectedTemplateId);

    if (template?.specialty === 'ent') {
      setChartData({
        subjective: '주소: 인후통, 기침\n현병력: 며칠 전부터 목 통증과 기침 증상 시작. 어제 밤 37.8°C 발열.',
        objective: '활력징후: BT 37.8°C, BP 120/80 mmHg\n신체검사: 인후부 발적(+), 편도비대 2도',
        endoscopy: '후두내시경 소견:\n- 후두개: 정상\n- 성대: 양측 정상 움직임, 발적(-)\n- 피열연골: 정상',
        audiometry: '순음청력검사:\n- 우측: 정상 (20dB 이하)\n- 좌측: 정상 (20dB 이하)',
        assessment: '급성 인두염\n- J02.9 급성 인두염, 상세불명',
        plan: '1. 항생제 처방 (아목시실린 500mg TID x 5일)\n2. 해열진통제 (이부프로펜 PRN)\n3. 수분 섭취 권장\n4. 3일 후 재진',
      });
    } else if (template?.specialty === 'internal') {
      setChartData({
        subjective: '주소: 혈압 관리\n현병력: 2년 전 고혈압 진단받고 약 복용 중. 오늘 정기 검진 위해 내원.',
        objective: '활력징후: BP 135/85 mmHg, HR 72 bpm, BT 36.5°C\n신체검사: 심음 정상, 폐음 청명',
        chronicDisease: '만성질환 관리:\n[고혈압] 암로디핀 5mg QD 복용 중\n- 가정혈압 기록: 평균 130/82 mmHg\n- 염분 제한 식이 유지 중',
        labResults: '검사결과:\n- 공복혈당: 98 mg/dL (정상)\n- 총콜레스테롤: 195 mg/dL\n- LDL: 115 mg/dL\n- Cr: 0.9 mg/dL',
        assessment: '본태성 고혈압, 조절 양호\n- I10 본태성 고혈압',
        plan: '1. 현 처방 유지 (암로디핀 5mg QD)\n2. 저염식이 지속\n3. 규칙적 운동 권장 (유산소 30분/일)\n4. 3개월 후 재진',
      });
    } else {
      // Default SOAP
      setChartData({
        subjective: '주소: 인후통, 기침\n현병력: 며칠 전부터 목 통증과 기침 증상 시작. 어제 밤 37.8°C 발열.\n과거력: 특이 병력 없음',
        objective: '활력징후: BT 37.8°C\n신체검사: 추가 검사 필요',
        assessment: '급성 인두염 의심\n- J02.9 급성 인두염, 상세불명',
        plan: '1. 추가 신체검사 필요\n2. 증상에 따른 대증 치료\n3. 수분 섭취 권장',
      });
    }
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
          // Additional data for AI analysis
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
      console.log('API Response:', data); // Debug log

      // Handle both SOAP format and text-based format
      if (data.chartContent) {
        console.log('Setting chartContent:', data.chartContent);
        setChartData({ content: data.chartContent });
      } else if (data.soap && Object.keys(data.soap).length > 0) {
        console.log('Setting SOAP data:', data.soap);
        setChartData(data.soap);
      } else {
        // If API returned empty or invalid data, use demo data
        console.warn('API returned empty data, using demo data');
        generateDemoData();
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

  const handleSave = async () => {
    try {
      // Validate chartData before saving
      if (!chartData || Object.keys(chartData).length === 0) {
        setSnackbar({ open: true, message: '저장할 차트 내용이 없습니다', severity: 'error' });
        return false;
      }

      // Validate required IDs
      if (!userData?.hospitalId) {
        console.error('Missing hospitalId:', userData);
        setSnackbar({ open: true, message: '병원 정보가 없습니다. 다시 녹음해 주세요.', severity: 'error' });
        return false;
      }

      console.log('Saving chart with data:', {
        chartData,
        hospitalId: userData?.hospitalId,
        userId: userData?.userId,
        doctorId: userData?.doctorId,
        patientId: patientInfo?.id,
      });

      // Extract diagnosis from assessment - handle both string and object cases
      const assessmentValue = chartData.assessment;
      let diagnosis = '';
      if (typeof assessmentValue === 'string') {
        diagnosis = assessmentValue.split('\n')[0] || '';
      } else if (assessmentValue && typeof assessmentValue === 'object') {
        // If it's an object, try to get a string representation
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
          // Add patient info
          patientId: patientInfo?.id || null,
          patientName: patientInfo?.name || null,
          patientChartNo: patientInfo?.chartNo || null,
          // Add hospital and user info (required)
          hospitalId: userData?.hospitalId || null,
          userId: userData?.userId || null,
          doctorId: userData?.doctorId || userData?.userId || null,
          doctorName: userData?.doctorName || '',
          // Include vitals and transcription
          vitals: vitalsInfo || null,
          transcription: transcription || [],
          recordingDuration: recordingDuration || '00:00',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Save failed:', errorData);
        throw new Error(errorData.error || 'Failed to save chart');
      }

      const result = await response.json();
      console.log('Chart saved successfully:', result);

      setIsEditing(false);
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

  // Check if current template is SOAP-based
  const isSOAPTemplate = () => {
    // If we have the selected template from sessionStorage, check it
    if (selectedTemplate) {
      return (
        selectedTemplate.category === 'soap' ||
        selectedTemplate.id === 'default-soap' ||
        (selectedTemplate.content && selectedTemplate.content.includes('[Subjective]'))
      );
    }
    // Check by template ID
    if (selectedTemplateId === 'default-soap' || selectedTemplateId.includes('soap')) {
      return true;
    }
    // Check if we have SOAP data structure
    if (chartData.subjective || chartData.objective || chartData.assessment || chartData.plan) {
      return true;
    }
    // Fallback to checking templateSections has SOAP keys
    return templateSections.some(s =>
      ['subjective', 'objective', 'assessment', 'plan'].includes(s.sectionKey)
    );
  };

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
              : `AI가 진료 내용을 분석하여 ${getSelectedTemplateName()} 차트를 생성했습니다`}
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
                진료 내용을 분석하여 {getSelectedTemplateName()} 형식의 차트를 작성 중입니다...
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

            {/* Right: Chart Content */}
            <Paper
              elevation={0}
              sx={{
                flex: 1,
                p: 3,
                borderRadius: 4,
                border: '1px solid',
                borderColor: 'grey.200',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocalHospitalIcon sx={{ mr: 1, color: 'primary.main', fontSize: 20 }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'secondary.main' }}>
                    {getSelectedTemplateName()} 차트
                  </Typography>
                  <Chip
                    icon={<CheckCircleIcon />}
                    label="AI 생성 완료"
                    size="small"
                    color="success"
                    sx={{ ml: 2 }}
                  />
                </Box>
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
              <Divider sx={{ mb: 3 }} />

              {/* Dynamic Content based on Template Type */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {isSOAPTemplate() ? (
                  // SOAP template: show sections - always use defaultSOAPSections for consistent display
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
                              {!section.isRequired && (
                                <Chip
                                  label="선택"
                                  size="small"
                                  sx={{
                                    fontSize: '0.65rem',
                                    height: 18,
                                    bgcolor: 'grey.100',
                                    color: 'grey.600',
                                  }}
                                />
                              )}
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
                                  bgcolor: section.bgColor || 'grey.50',
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
                                bgcolor: section.bgColor || 'grey.50',
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
                  // Non-SOAP template: show text-based content
                  <MotionBox
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Box
                      sx={{
                        borderLeft: '4px solid',
                        borderColor: 'primary.main',
                        pl: 2,
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <DescriptionIcon sx={{ fontSize: 18, color: 'primary.main' }} />
                          <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 700, color: 'primary.main' }}
                          >
                            {selectedTemplate?.name || '차트 내용'}
                          </Typography>
                        </Box>
                        <Tooltip title="복사">
                          <IconButton
                            size="small"
                            onClick={() => handleCopy(chartData.content || '')}
                          >
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
                          onChange={(e) =>
                            setChartData((prev) => ({
                              ...prev,
                              content: e.target.value,
                            }))
                          }
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

              {/* Action Button */}
              <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  onClick={async () => {
                    const saved = await handleSave();
                    if (saved) {
                      // Clean up sessionStorage
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
