'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Container,
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
  Grid,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DownloadIcon from '@mui/icons-material/Download';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import DescriptionIcon from '@mui/icons-material/Description';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { useAuth } from '@/lib/AuthContext';

const MotionBox = motion.create(Box);
const MotionPaper = motion.create(Paper);

// Mock SOAP data
const mockSOAPData = {
  subjective: `주소: 인후통, 기침
현병력: 3일 전부터 목이 아프고 기침이 시작됨. 어제 밤 37.8°C 발열 있었음. 삼킬 때 통증 심함.
과거력: 특이 병력 없음
알레르기: 없음`,
  objective: `활력징후: BP 120/80, HR 78, BT 37.2°C
신체검사:
- 편도: 양측 비대, 발적, 백색 삼출물 동반
- 경부 림프절: 양측 압통 있는 림프절 촉지
- 폐: 청진상 수포음 없음`,
  assessment: `급성 편도염 (Acute tonsillitis)
- J03.9 급성 편도염, 상세불명`,
  plan: `1. 항생제: 아목시실린 500mg 1일 3회, 7일간
2. 진통소염제: 이부프로펜 400mg 1일 3회, 식후
3. 가글액: 탄툼베르데 1일 3-4회
4. 환자 교육: 충분한 수분 섭취, 휴식
5. 추적: 3일 후 호전 없으면 재진`,
};

const mockTranscription = [
  { speaker: '의사', text: '안녕하세요, 어디가 불편하셔서 오셨나요?' },
  { speaker: '환자', text: '며칠 전부터 목이 아프고 기침이 나요.' },
  { speaker: '의사', text: '열은 있으셨나요?' },
  { speaker: '환자', text: '어제 밤에 37.8도까지 올랐어요.' },
  { speaker: '의사', text: '목 좀 볼게요. 아, 편도가 많이 부어있네요.' },
  { speaker: '환자', text: '삼킬 때 많이 아파요.' },
  { speaker: '의사', text: '급성 편도염으로 보입니다. 항생제와 진통제 처방해 드릴게요.' },
];

export default function RecordResultPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [soapData, setSoapData] = useState(mockSOAPData);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const [generationProgress, setGenerationProgress] = useState(0);

  // Simulate AI generation
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setGenerationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsGenerating(false);
          return 100;
        }
        return prev + 5;
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, []);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setSnackbar({ open: true, message: '클립보드에 복사되었습니다' });
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
    setSnackbar({ open: true, message: '전체 차트가 복사되었습니다' });
  };

  const handleSave = () => {
    setIsEditing(false);
    setSnackbar({ open: true, message: '차트가 저장되었습니다' });
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
          <Typography variant="h4" sx={{ fontWeight: 800, color: 'secondary.main', mb: 0.5 }}>
            진료 기록 생성
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            AI가 진료 내용을 분석하여 SOAP 차트를 생성했습니다
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
                <Typography variant="h5" sx={{ fontWeight: 700, color: 'secondary.main', mb: 2 }}>
                  AI가 차트를 생성하고 있습니다
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
                  진료 내용을 분석하여 SOAP 형식의 차트를 작성 중입니다...
                </Typography>
                <Box sx={{ maxWidth: 400, mx: 'auto' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      진행률
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 600 }}>
                      {generationProgress}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={generationProgress}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor: 'grey.100',
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 4,
                        background: 'linear-gradient(135deg, #4B9CD3 0%, #3A7BA8 100%)',
                      },
                    }}
                  />
                </Box>
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
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <DescriptionIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6" sx={{ fontWeight: 600, color: 'secondary.main' }}>
                    녹음 내용
                  </Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {mockTranscription.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Box>
                        <Chip
                          label={item.speaker}
                          size="small"
                          color={item.speaker === '의사' ? 'primary' : 'default'}
                          sx={{ mb: 0.5, fontWeight: 600 }}
                        />
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'text.primary',
                            pl: 1,
                            borderLeft: '3px solid',
                            borderColor: item.speaker === '의사' ? 'primary.main' : 'grey.300',
                          }}
                        >
                          {item.text}
                        </Typography>
                      </Box>
                    </motion.div>
                  ))}
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
                    <LocalHospitalIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="h6" sx={{ fontWeight: 600, color: 'secondary.main' }}>
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
                            variant="subtitle1"
                            sx={{ fontWeight: 700, color: section.color }}
                          >
                            {section.label}
                          </Typography>
                          <Tooltip title="복사">
                            <IconButton
                              size="small"
                              onClick={() => handleCopy(soapData[section.key])}
                            >
                              <ContentCopyIcon fontSize="small" />
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
                              },
                            }}
                          />
                        ) : (
                          <Typography
                            variant="body2"
                            sx={{
                              color: 'text.primary',
                              whiteSpace: 'pre-line',
                              lineHeight: 1.8,
                              bgcolor: 'grey.50',
                              p: 2,
                              borderRadius: 2,
                            }}
                          >
                            {soapData[section.key]}
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
                    onClick={() => setSnackbar({ open: true, message: 'PDF 다운로드 기능은 준비 중입니다' })}
                  >
                    PDF 다운로드
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => {
                      handleSave();
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
