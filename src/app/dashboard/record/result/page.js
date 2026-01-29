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
  LinearProgress,
  Alert,
  CircularProgress,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DownloadIcon from '@mui/icons-material/Download';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import DescriptionIcon from '@mui/icons-material/Description';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PersonIcon from '@mui/icons-material/Person';
import ErrorIcon from '@mui/icons-material/Error';
import ReplayIcon from '@mui/icons-material/Replay';
import { useAuth } from '@/lib/AuthContext';

const MotionBox = motion.create(Box);

// Default empty SOAP data
const emptySOAPData = {
  subjective: '',
  objective: '',
  assessment: '',
  plan: '',
};

export default function RecordResultPage() {
  const { userProfile } = useAuth();
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [soapData, setSoapData] = useState(emptySOAPData);
  const [transcription, setTranscription] = useState([]);
  const [recordingDuration, setRecordingDuration] = useState('00:00');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [error, setError] = useState(null);

  // Load transcription from sessionStorage and generate chart
  useEffect(() => {
    const loadAndGenerate = async () => {
      try {
        // Get transcription from sessionStorage
        const storedTranscription = sessionStorage.getItem('transcription');
        const storedDuration = sessionStorage.getItem('recordingDuration');

        if (storedTranscription) {
          const parsedTranscription = JSON.parse(storedTranscription);
          setTranscription(parsedTranscription);

          if (storedDuration) {
            setRecordingDuration(storedDuration);
          }

          // Generate chart if we have transcription
          if (parsedTranscription.length > 0) {
            await generateChart(parsedTranscription);
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
          setSoapData({
            subjective: '주소: 인후통, 기침\n현병력: 며칠 전부터 목 통증과 기침 증상 시작. 어제 밤 37.8°C 발열.\n과거력: 특이 병력 없음',
            objective: '활력징후: BT 37.8°C\n신체검사: 추가 검사 필요',
            assessment: '급성 인두염 의심\n- J02.9 급성 인두염, 상세불명',
            plan: '1. 추가 신체검사 필요\n2. 증상에 따른 대증 치료\n3. 수분 섭취 권장',
          });
          setIsGenerating(false);
        }
      } catch (err) {
        console.error('Error loading transcription:', err);
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
        setIsGenerating(false);
      }
    };

    loadAndGenerate();
  }, []);

  const generateChart = async (transcriptionData) => {
    try {
      setIsGenerating(true);
      setError(null);

      const response = await fetch('/api/generate-chart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transcription: transcriptionData,
          specialty: userProfile?.specialty || 'general',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Chart generation failed');
      }

      const data = await response.json();
      setSoapData(data.soap);
    } catch (err) {
      console.error('Chart generation error:', err);
      setError('차트 생성 중 오류가 발생했습니다: ' + err.message);
      // Set fallback data
      setSoapData({
        subjective: '음성 인식 데이터 기반 정보 입력 필요',
        objective: '신체검사 소견 입력 필요',
        assessment: '진단명 입력 필요',
        plan: '치료 계획 입력 필요',
      });
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

  const handleCopyAll = () => {
    const fullText = `[주관적 정보 (Subjective)]
${soapData.subjective}

[객관적 정보 (Objective)]
${soapData.objective}

[평가 (Assessment)]
${soapData.assessment}

[계획 (Plan)]
${soapData.plan}`;
    navigator.clipboard.writeText(fullText);
    setSnackbar({ open: true, message: '전체 차트가 복사되었습니다', severity: 'success' });
  };

  const handleSave = () => {
    setIsEditing(false);
    // TODO: Save to Firestore
    setSnackbar({ open: true, message: '차트가 저장되었습니다', severity: 'success' });
  };

  const soapSections = [
    { key: 'subjective', label: 'S - 주관적 정보', color: '#4B9CD3' },
    { key: 'objective', label: 'O - 객관적 정보', color: '#10B981' },
    { key: 'assessment', label: 'A - 평가', color: '#F59E0B' },
    { key: 'plan', label: 'P - 계획', color: '#EF4444' },
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1600, mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: 'secondary.main', mb: 0.5 }}>
            진료 기록 생성
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {isGenerating
              ? 'AI가 진료 내용을 분석 중입니다...'
              : 'AI가 진료 내용을 분석하여 SOAP 차트를 생성했습니다'}
          </Typography>
        </Box>
        {!isGenerating && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                startIcon={<ContentCopyIcon />}
                onClick={handleCopyAll}
              >
                전체 복사
              </Button>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSave}
              >
                저장하기
              </Button>
            </Box>
          </motion.div>
        )}
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
                진료 내용을 분석하여 SOAP 형식의 차트를 작성 중입니다...
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

            {/* Right: SOAP Chart */}
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
                    SOAP 차트
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

              {/* SOAP Sections */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {soapSections.map((section, index) => (
                  <MotionBox
                    key={section.key}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Box
                      sx={{
                        borderLeft: '4px solid',
                        borderColor: section.color,
                        pl: 2,
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 700, color: section.color }}
                        >
                          {section.label}
                        </Typography>
                        <Tooltip title="복사">
                          <IconButton
                            size="small"
                            onClick={() => handleCopy(soapData[section.key])}
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
                          value={soapData[section.key]}
                          onChange={(e) =>
                            setSoapData((prev) => ({
                              ...prev,
                              [section.key]: e.target.value,
                            }))
                          }
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
                            color: 'text.primary',
                            whiteSpace: 'pre-line',
                            lineHeight: 1.7,
                            bgcolor: 'grey.50',
                            p: 2,
                            borderRadius: 2,
                          }}
                        >
                          {soapData[section.key] || '내용 없음'}
                        </Typography>
                      )}
                    </Box>
                  </MotionBox>
                ))}
              </Box>

              {/* Action Buttons */}
              <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  onClick={() => setSnackbar({ open: true, message: 'PDF 다운로드 기능은 준비 중입니다', severity: 'info' })}
                >
                  PDF 다운로드
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    handleSave();
                    // Clear sessionStorage
                    sessionStorage.removeItem('transcription');
                    sessionStorage.removeItem('recordingDuration');
                    router.push('/dashboard/history');
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
