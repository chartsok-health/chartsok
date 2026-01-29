'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  Box,
  Typography,
  Paper,
  Button,
  IconButton,
  Chip,
  Divider,
  Snackbar,
  Tooltip,
  Grid,
  TextField,
  Card,
  CardContent,
} from '@mui/material';
import { motion } from 'framer-motion';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DownloadIcon from '@mui/icons-material/Download';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { useAuth } from '@/lib/AuthContext';

const MotionPaper = motion.create(Paper);
const MotionBox = motion.create(Box);

// Mock data for detail view
const mockDetailData = {
  id: '1',
  date: '2024-01-29',
  time: '14:30',
  duration: '5:23',
  diagnosis: '급성 편도염',
  icdCode: 'J03.9',
  patientAge: '32세',
  patientGender: '여',
  transcription: [
    { speaker: '의사', text: '안녕하세요, 어디가 불편하셔서 오셨나요?', timestamp: '00:03' },
    { speaker: '환자', text: '며칠 전부터 목이 아프고 기침이 나요.', timestamp: '00:08' },
    { speaker: '의사', text: '열은 있으셨나요?', timestamp: '00:15' },
    { speaker: '환자', text: '어제 밤에 37.8도까지 올랐어요.', timestamp: '00:20' },
    { speaker: '의사', text: '목 좀 볼게요. 아, 편도가 많이 부어있네요.', timestamp: '00:28' },
    { speaker: '환자', text: '삼킬 때 많이 아파요.', timestamp: '00:35' },
    { speaker: '의사', text: '급성 편도염으로 보입니다. 항생제와 진통제 처방해 드릴게요.', timestamp: '00:42' },
  ],
  soap: {
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
  },
};

const soapSections = [
  { key: 'subjective', label: 'S', fullLabel: 'Subjective (주관적)', color: '#4B9CD3', bgColor: '#EBF5FF' },
  { key: 'objective', label: 'O', fullLabel: 'Objective (객관적)', color: '#10B981', bgColor: '#ECFDF5' },
  { key: 'assessment', label: 'A', fullLabel: 'Assessment (평가)', color: '#F59E0B', bgColor: '#FFFBEB' },
  { key: 'plan', label: 'P', fullLabel: 'Plan (계획)', color: '#EF4444', bgColor: '#FEF2F2' },
];

export default function HistoryDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [soapData, setSoapData] = useState(mockDetailData.soap);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setSnackbar({ open: true, message: '클립보드에 복사되었습니다' });
  };

  const handleCopyAll = () => {
    const fullText = soapSections.map(s => `[${s.fullLabel}]\n${soapData[s.key]}`).join('\n\n');
    navigator.clipboard.writeText(fullText);
    setSnackbar({ open: true, message: '전체 차트가 복사되었습니다' });
  };

  const handleSave = () => {
    setIsEditing(false);
    setSnackbar({ open: true, message: '차트가 저장되었습니다' });
  };

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
                {mockDetailData.diagnosis}
              </Typography>
              <Chip
                label={mockDetailData.icdCode}
                sx={{
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  bgcolor: 'primary.main',
                  color: 'white',
                }}
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Chip
                icon={<CalendarTodayIcon sx={{ fontSize: 16 }} />}
                label={mockDetailData.date}
                size="small"
                variant="outlined"
              />
              <Chip
                icon={<AccessTimeIcon sx={{ fontSize: 16 }} />}
                label={mockDetailData.time}
                size="small"
                variant="outlined"
              />
              <Chip
                icon={<PersonIcon sx={{ fontSize: 16 }} />}
                label={`${mockDetailData.patientGender} / ${mockDetailData.patientAge}`}
                size="small"
                variant="outlined"
              />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button variant="outlined" startIcon={<ContentCopyIcon />} onClick={handleCopyAll}>
              전체 복사
            </Button>
            <Button variant="outlined" startIcon={<DownloadIcon />}>
              PDF
            </Button>
            <Button variant="outlined" color="error" startIcon={<DeleteIcon />}>
              삭제
            </Button>
          </Box>
        </Box>
      </MotionBox>

      <Grid container spacing={3}>
        {/* Left: Transcription */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <MotionPaper
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            elevation={0}
            sx={{
              borderRadius: 4,
              border: '1px solid',
              borderColor: 'grey.200',
              height: { lg: 'calc(100vh - 280px)' },
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'grey.100' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'secondary.main' }}>
                  녹음 내용
                </Typography>
                <Tooltip title="녹음 재생">
                  <IconButton size="small">
                    <PlayArrowIcon />
                  </IconButton>
                </Tooltip>
              </Box>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                녹음 시간: {mockDetailData.duration}
              </Typography>
            </Box>

            <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
              {mockDetailData.transcription.map((item, index) => (
                <MotionBox
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  sx={{ mb: 2 }}
                >
                  <Card
                    elevation={0}
                    sx={{
                      bgcolor: item.speaker === '의사' ? 'primary.50' : 'grey.50',
                      border: '1px solid',
                      borderColor: item.speaker === '의사' ? 'primary.100' : 'grey.200',
                      borderRadius: 2,
                    }}
                  >
                    <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <Box
                          sx={{
                            width: 24,
                            height: 24,
                            borderRadius: 1,
                            bgcolor: item.speaker === '의사' ? 'primary.main' : 'grey.400',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {item.speaker === '의사' ? (
                            <LocalHospitalIcon sx={{ fontSize: 14, color: 'white' }} />
                          ) : (
                            <PersonIcon sx={{ fontSize: 14, color: 'white' }} />
                          )}
                        </Box>
                        <Typography variant="caption" sx={{ fontWeight: 700, color: item.speaker === '의사' ? 'primary.main' : 'text.secondary' }}>
                          {item.speaker}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'grey.400', ml: 'auto' }}>
                          {item.timestamp}
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ color: 'text.primary', lineHeight: 1.6 }}>
                        {item.text}
                      </Typography>
                    </CardContent>
                  </Card>
                </MotionBox>
              ))}
            </Box>
          </MotionPaper>
        </Grid>

        {/* Right: SOAP Chart */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <MotionPaper
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            elevation={0}
            sx={{
              borderRadius: 4,
              border: '1px solid',
              borderColor: 'grey.200',
            }}
          >
            <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'grey.100' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'secondary.main' }}>
                    SOAP 차트
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    {soapSections.map((s) => (
                      <Box
                        key={s.key}
                        sx={{
                          width: 24,
                          height: 24,
                          borderRadius: 1,
                          bgcolor: s.bgColor,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Typography variant="caption" sx={{ fontWeight: 800, color: s.color }}>
                          {s.label}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
                <Button
                  variant={isEditing ? 'contained' : 'outlined'}
                  startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
                  onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                  size="small"
                >
                  {isEditing ? '저장' : '편집'}
                </Button>
              </Box>
            </Box>

            <Box sx={{ p: 3 }}>
              <Grid container spacing={3}>
                {soapSections.map((section, index) => (
                  <Grid size={{ xs: 12 }} key={section.key}>
                    <MotionBox
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                    >
                      <Box sx={{ display: 'flex', gap: 2 }}>
                        {/* Label */}
                        <Box
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: 2,
                            bgcolor: section.bgColor,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          <Typography variant="h5" sx={{ fontWeight: 800, color: section.color }}>
                            {section.label}
                          </Typography>
                        </Box>

                        {/* Content */}
                        <Box sx={{ flex: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: section.color }}>
                              {section.fullLabel}
                            </Typography>
                            <Tooltip title="복사">
                              <IconButton size="small" onClick={() => handleCopy(soapData[section.key])}>
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
                              onChange={(e) => setSoapData((prev) => ({ ...prev, [section.key]: e.target.value }))}
                              sx={{ '& .MuiOutlinedInput-root': { bgcolor: 'grey.50' } }}
                            />
                          ) : (
                            <Paper
                              elevation={0}
                              sx={{
                                p: 2,
                                bgcolor: 'grey.50',
                                borderRadius: 2,
                                border: '1px solid',
                                borderColor: 'grey.200',
                              }}
                            >
                              <Typography variant="body2" sx={{ whiteSpace: 'pre-line', lineHeight: 1.8 }}>
                                {soapData[section.key]}
                              </Typography>
                            </Paper>
                          )}
                        </Box>
                      </Box>
                    </MotionBox>
                  </Grid>
                ))}
              </Grid>
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
