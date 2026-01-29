'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  Grid,
  Chip,
  LinearProgress,
  Avatar,
  CircularProgress,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CelebrationIcon from '@mui/icons-material/Celebration';
import { useAuth } from '@/lib/AuthContext';

const MotionBox = motion.create(Box);
const MotionPaper = motion.create(Paper);
const MotionCard = motion.create(Card);

const steps = ['환영합니다', '진료 유형', '규모', '전문 분야', '추가 정보', '완료'];

const practiceTypes = [
  {
    id: 'individual',
    label: '개인 의원',
    description: '1인 또는 소규모 개인 의원',
    icon: PersonIcon,
    color: '#4B9CD3',
  },
  {
    id: 'group',
    label: '그룹 의원',
    description: '여러 의사가 함께 운영하는 의원',
    icon: GroupsIcon,
    color: '#10B981',
  },
  {
    id: 'hospital',
    label: '병원',
    description: '중소 규모 병원',
    icon: LocalHospitalIcon,
    color: '#F59E0B',
  },
  {
    id: 'enterprise',
    label: '대형 병원',
    description: '종합병원 또는 대학병원',
    icon: BusinessIcon,
    color: '#8B5CF6',
  },
];

const practiceSizes = [
  { id: '1', label: '1명', description: '단독 진료' },
  { id: '2-5', label: '2-5명', description: '소규모' },
  { id: '6-20', label: '6-20명', description: '중규모' },
  { id: '21-50', label: '21-50명', description: '중대규모' },
  { id: '50+', label: '50명 이상', description: '대규모' },
];

const specialties = [
  { id: 'internal', label: '내과', emoji: '🩺' },
  { id: 'ent', label: '이비인후과', emoji: '👂' },
  { id: 'orthopedics', label: '정형외과', emoji: '🦴' },
  { id: 'dermatology', label: '피부과', emoji: '🧴' },
  { id: 'pediatrics', label: '소아과', emoji: '👶' },
  { id: 'psychiatry', label: '정신건강의학과', emoji: '🧠' },
  { id: 'family', label: '가정의학과', emoji: '👨‍👩‍👧' },
  { id: 'neurology', label: '신경과', emoji: '⚡' },
  { id: 'surgery', label: '외과', emoji: '🔪' },
  { id: 'obgyn', label: '산부인과', emoji: '🤰' },
  { id: 'ophthalmology', label: '안과', emoji: '👁️' },
  { id: 'cardiology', label: '심장내과', emoji: '❤️' },
  { id: 'other', label: '기타', emoji: '➕' },
];

export default function OnboardingPage() {
  const { user, userProfile, completeOnboarding, loading } = useAuth();
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    practiceType: '',
    practiceSize: '',
    specialty: '',
    clinicName: '',
    doctorName: '',
    phoneNumber: '',
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
    if (!loading && userProfile?.onBoarded) {
      router.push('/dashboard');
    }
  }, [user, userProfile, loading, router]);

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSelect = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleComplete = async () => {
    setIsSubmitting(true);
    try {
      await completeOnboarding(formData);
      // Move to completion step
      setActiveStep(5);
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch (error) {
      console.error('Error completing onboarding:', error);
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    switch (activeStep) {
      case 0:
        return true;
      case 1:
        return !!formData.practiceType;
      case 2:
        return !!formData.practiceSize;
      case 3:
        return !!formData.specialty;
      case 4:
        return !!formData.clinicName && !!formData.doctorName;
      default:
        return true;
    }
  };

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#F8FAFC' }}>
        <CircularProgress />
      </Box>
    );
  }

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            sx={{ textAlign: 'center', py: 4 }}
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Box
                sx={{
                  width: 100,
                  height: 100,
                  borderRadius: 4,
                  background: 'linear-gradient(135deg, #4B9CD3 0%, #3A7BA8 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 4,
                  boxShadow: '0 12px 40px rgba(75, 156, 211, 0.3)',
                }}
              >
                <AutoAwesomeIcon sx={{ fontSize: 48, color: 'white' }} />
              </Box>
            </motion.div>
            <Typography variant="h4" sx={{ fontWeight: 800, color: 'secondary.main', mb: 2 }}>
              ChartSok에 오신 것을 환영합니다!
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, maxWidth: 500, mx: 'auto' }}>
              몇 가지 간단한 질문에 답해주시면, 선생님의 진료 환경에 맞게 최적화된 서비스를 제공해 드릴게요.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Chip icon={<CheckCircleIcon />} label="2분 이내 완료" variant="outlined" />
              <Chip icon={<CheckCircleIcon />} label="언제든 수정 가능" variant="outlined" />
              <Chip icon={<CheckCircleIcon />} label="개인정보 보호" variant="outlined" />
            </Box>
          </MotionBox>
        );

      case 1:
        return (
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <Typography variant="h5" sx={{ fontWeight: 700, color: 'secondary.main', mb: 1, textAlign: 'center' }}>
              어떤 유형의 의료기관에서 근무하시나요?
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4, textAlign: 'center' }}>
              가장 적합한 옵션을 선택해 주세요
            </Typography>
            <Grid container spacing={2}>
              {practiceTypes.map((type, index) => {
                const Icon = type.icon;
                const isSelected = formData.practiceType === type.id;
                return (
                  <Grid size={{ xs: 12, sm: 6 }} key={type.id}>
                    <MotionCard
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      elevation={0}
                      onClick={() => handleSelect('practiceType', type.id)}
                      sx={{
                        cursor: 'pointer',
                        border: '2px solid',
                        borderColor: isSelected ? type.color : 'grey.200',
                        borderRadius: 3,
                        bgcolor: isSelected ? `${type.color}10` : 'white',
                        transition: 'all 0.2s',
                      }}
                    >
                      <CardContent sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box
                          sx={{
                            width: 56,
                            height: 56,
                            borderRadius: 3,
                            bgcolor: isSelected ? type.color : `${type.color}20`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s',
                          }}
                        >
                          <Icon sx={{ fontSize: 28, color: isSelected ? 'white' : type.color }} />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: isSelected ? type.color : 'secondary.main' }}>
                            {type.label}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {type.description}
                          </Typography>
                        </Box>
                        {isSelected && (
                          <CheckCircleIcon sx={{ color: type.color }} />
                        )}
                      </CardContent>
                    </MotionCard>
                  </Grid>
                );
              })}
            </Grid>
          </MotionBox>
        );

      case 2:
        return (
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <Typography variant="h5" sx={{ fontWeight: 700, color: 'secondary.main', mb: 1, textAlign: 'center' }}>
              의료진 규모는 어떻게 되나요?
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4, textAlign: 'center' }}>
              ChartSok을 사용할 의료진 수를 선택해 주세요
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
              {practiceSizes.map((size, index) => {
                const isSelected = formData.practiceSize === size.id;
                return (
                  <MotionBox
                    key={size.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSelect('practiceSize', size.id)}
                    sx={{
                      cursor: 'pointer',
                      p: 3,
                      borderRadius: 3,
                      border: '2px solid',
                      borderColor: isSelected ? 'primary.main' : 'grey.200',
                      bgcolor: isSelected ? 'primary.50' : 'white',
                      minWidth: 120,
                      textAlign: 'center',
                      transition: 'all 0.2s',
                    }}
                  >
                    <Typography variant="h5" sx={{ fontWeight: 800, color: isSelected ? 'primary.main' : 'secondary.main', mb: 0.5 }}>
                      {size.label}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {size.description}
                    </Typography>
                  </MotionBox>
                );
              })}
            </Box>
          </MotionBox>
        );

      case 3:
        return (
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <Typography variant="h5" sx={{ fontWeight: 700, color: 'secondary.main', mb: 1, textAlign: 'center' }}>
              전문 분야를 선택해 주세요
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4, textAlign: 'center' }}>
              AI가 해당 분야에 최적화된 의학 용어를 학습합니다
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, justifyContent: 'center' }}>
              {specialties.map((spec, index) => {
                const isSelected = formData.specialty === spec.id;
                return (
                  <motion.div
                    key={spec.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: index * 0.03 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Chip
                      label={`${spec.emoji} ${spec.label}`}
                      onClick={() => handleSelect('specialty', spec.id)}
                      sx={{
                        px: 2,
                        py: 3,
                        fontSize: '0.95rem',
                        fontWeight: isSelected ? 700 : 500,
                        border: '2px solid',
                        borderColor: isSelected ? 'primary.main' : 'grey.200',
                        bgcolor: isSelected ? 'primary.main' : 'white',
                        color: isSelected ? 'white' : 'text.primary',
                        '&:hover': {
                          bgcolor: isSelected ? 'primary.dark' : 'grey.50',
                        },
                      }}
                    />
                  </motion.div>
                );
              })}
            </Box>
          </MotionBox>
        );

      case 4:
        return (
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <Typography variant="h5" sx={{ fontWeight: 700, color: 'secondary.main', mb: 1, textAlign: 'center' }}>
              마지막으로 기본 정보를 입력해 주세요
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4, textAlign: 'center' }}>
              차트 생성 시 사용됩니다
            </Typography>
            <Box sx={{ maxWidth: 400, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField
                fullWidth
                label="의원/병원 이름"
                placeholder="예: 서울내과의원"
                value={formData.clinicName}
                onChange={(e) => handleSelect('clinicName', e.target.value)}
                required
              />
              <TextField
                fullWidth
                label="선생님 성함"
                placeholder="예: 홍길동"
                value={formData.doctorName}
                onChange={(e) => handleSelect('doctorName', e.target.value)}
                required
              />
              <TextField
                fullWidth
                label="연락처 (선택)"
                placeholder="예: 02-1234-5678"
                value={formData.phoneNumber}
                onChange={(e) => handleSelect('phoneNumber', e.target.value)}
              />
            </Box>
          </MotionBox>
        );

      case 5:
        return (
          <MotionBox
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            sx={{ textAlign: 'center', py: 4 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 0.6 }}
            >
              <Box
                sx={{
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 4,
                  boxShadow: '0 12px 40px rgba(16, 185, 129, 0.3)',
                }}
              >
                <CelebrationIcon sx={{ fontSize: 48, color: 'white' }} />
              </Box>
            </motion.div>
            <Typography variant="h4" sx={{ fontWeight: 800, color: 'secondary.main', mb: 2 }}>
              설정이 완료되었습니다!
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
              이제 ChartSok의 모든 기능을 사용하실 수 있습니다.<br />
              대시보드로 이동합니다...
            </Typography>
            <CircularProgress size={24} />
          </MotionBox>
        );

      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#F8FAFC',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
      }}
    >
      {/* Progress Bar */}
      <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100 }}>
        <LinearProgress
          variant="determinate"
          value={(activeStep / (steps.length - 1)) * 100}
          sx={{
            height: 4,
            bgcolor: 'grey.200',
            '& .MuiLinearProgress-bar': {
              background: 'linear-gradient(90deg, #4B9CD3 0%, #10B981 100%)',
            },
          }}
        />
      </Box>

      {/* Logo */}
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: 2,
            background: 'linear-gradient(135deg, #4B9CD3 0%, #3A7BA8 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <AutoAwesomeIcon sx={{ color: 'white', fontSize: 20 }} />
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 800, color: 'secondary.main' }}>
          ChartSok
        </Typography>
      </Box>

      {/* Main Card */}
      <MotionPaper
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        elevation={0}
        sx={{
          maxWidth: 700,
          width: '100%',
          borderRadius: 4,
          border: '1px solid',
          borderColor: 'grey.200',
          overflow: 'hidden',
        }}
      >
        {/* Stepper */}
        {activeStep < 5 && (
          <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'grey.100', bgcolor: 'grey.50' }}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.slice(0, -1).map((label, index) => (
                <Step key={label}>
                  <StepLabel
                    sx={{
                      '& .MuiStepLabel-label': {
                        fontSize: '0.75rem',
                        fontWeight: activeStep === index ? 600 : 400,
                      },
                    }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        )}

        {/* Content */}
        <Box sx={{ p: 4 }}>
          <AnimatePresence mode="wait">
            {renderStepContent()}
          </AnimatePresence>
        </Box>

        {/* Actions */}
        {activeStep < 5 && (
          <Box sx={{ p: 3, borderTop: '1px solid', borderColor: 'grey.100', display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={handleBack}
              disabled={activeStep === 0}
              sx={{ visibility: activeStep === 0 ? 'hidden' : 'visible' }}
            >
              이전
            </Button>
            {activeStep < 4 ? (
              <Button
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                onClick={handleNext}
                disabled={!canProceed()}
                sx={{
                  px: 4,
                  background: 'linear-gradient(135deg, #4B9CD3 0%, #3A7BA8 100%)',
                }}
              >
                다음
              </Button>
            ) : (
              <Button
                variant="contained"
                endIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <CheckCircleIcon />}
                onClick={handleComplete}
                disabled={!canProceed() || isSubmitting}
                sx={{
                  px: 4,
                  background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                }}
              >
                {isSubmitting ? '저장 중...' : '완료하기'}
              </Button>
            )}
          </Box>
        )}
      </MotionPaper>

      {/* Skip for now */}
      {activeStep < 5 && activeStep > 0 && (
        <Button
          variant="text"
          sx={{ mt: 2, color: 'text.secondary' }}
          onClick={handleComplete}
        >
          나중에 설정하기
        </Button>
      )}
    </Box>
  );
}
