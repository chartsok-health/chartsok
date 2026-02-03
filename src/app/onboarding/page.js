'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  Card,
  CardContent,
  Grid,
  Chip,
  LinearProgress,
  CircularProgress,
  InputAdornment,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CelebrationIcon from '@mui/icons-material/Celebration';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useAuth } from '@/lib/AuthContext';
import { db } from '@/lib/firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { userHospitalService } from '@/lib/firestore';

const MotionBox = motion.create(Box);
const MotionPaper = motion.create(Paper);
const MotionCard = motion.create(Card);

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

// Step IDs for dynamic flow
const STEP_WELCOME = 'welcome';
const STEP_HOSPITAL = 'hospital';
const STEP_TYPE = 'type';
const STEP_SIZE = 'size';
const STEP_SPECIALTY = 'specialty';
const STEP_COMPLETE = 'complete';

// Step icon mapping
const stepIcons = {
  [STEP_WELCOME]: '👋',
  [STEP_HOSPITAL]: '🏥',
  [STEP_TYPE]: '🏢',
  [STEP_SIZE]: '👥',
  [STEP_SPECIALTY]: '🩺',
  [STEP_COMPLETE]: '✅',
};

export default function OnboardingPage() {
  const { user, userProfile, completeOnboarding, loading } = useAuth();
  const router = useRouter();
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    practiceType: '',
    practiceSize: '',
    specialty: '',
    clinicName: '',
    phoneNumber: '',
  });

  // Hospital search state
  const [hospitalInput, setHospitalInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [foundHospital, setFoundHospital] = useState(null); // null = not searched, false = not found, object = found
  const [hospitalConfirmed, setHospitalConfirmed] = useState(false);

  // Dynamic steps based on whether hospital was found
  const getSteps = useCallback(() => {
    if (foundHospital && hospitalConfirmed) {
      return [STEP_WELCOME, STEP_HOSPITAL, STEP_SPECIALTY, STEP_COMPLETE];
    }
    if (foundHospital === false && hospitalConfirmed) {
      return [STEP_WELCOME, STEP_HOSPITAL, STEP_TYPE, STEP_SIZE, STEP_SPECIALTY, STEP_COMPLETE];
    }
    return [STEP_WELCOME, STEP_HOSPITAL, STEP_TYPE, STEP_SIZE, STEP_SPECIALTY, STEP_COMPLETE];
  }, [foundHospital, hospitalConfirmed]);

  const steps = getSteps();
  const currentStep = steps[activeStepIndex];

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
    if (!loading && userProfile?.onBoarded) {
      router.push('/dashboard');
    }
  }, [user, userProfile, loading, router]);

  const handleNext = () => {
    setActiveStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setActiveStepIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleSelect = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Validate hospital name: no special characters allowed, only Korean, English, numbers
  const validateHospitalName = (name) => {
    const cleaned = name.trim();
    if (!cleaned) return false;
    // Allow Korean, English, numbers only (no spaces, no special chars)
    return /^[가-힣a-zA-Z0-9]+$/.test(cleaned);
  };

  // Search for hospital in DB
  const handleHospitalSearch = async () => {
    if (!hospitalInput.trim()) return;

    setIsSearching(true);
    setFoundHospital(null);
    setHospitalConfirmed(false);

    try {
      const normalizedInput = hospitalInput.trim().replace(/\s+/g, '').toLowerCase();
      const hospitalsRef = collection(db, 'hospitals');
      const q = query(hospitalsRef, where('normalizedName', '==', normalizedInput));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const hospitalDoc = querySnapshot.docs[0];
        const hospitalData = hospitalDoc.data();
        setFoundHospital({
          id: hospitalDoc.id,
          ...hospitalData,
        });
        setFormData((prev) => ({
          ...prev,
          clinicName: hospitalData.name || hospitalInput.trim(),
          practiceType: hospitalData.type || prev.practiceType,
          practiceSize: hospitalData.size || prev.practiceSize,
          specialty: hospitalData.specialty || prev.specialty,
        }));
      } else {
        setFoundHospital(false);
        setFormData((prev) => ({
          ...prev,
          clinicName: hospitalInput.trim(),
        }));
      }
    } catch (error) {
      console.error('Error searching hospital:', error);
      setFoundHospital(false);
    } finally {
      setIsSearching(false);
    }
  };

  const handleConfirmHospital = (isExisting) => {
    setHospitalConfirmed(true);
    setTimeout(() => {
      setActiveStepIndex((prev) => prev + 1);
    }, 0);
  };

  const handleComplete = async () => {
    setIsSubmitting(true);
    try {
      let hospitalId;
      const isJoiningExisting = foundHospital && foundHospital.id;

      if (isJoiningExisting) {
        hospitalId = foundHospital.id;
      } else {
        const normalizedName = formData.clinicName.trim().replace(/\s+/g, '').toLowerCase();
        const hospitalsRef = collection(db, 'hospitals');
        const hospitalData = {
          name: formData.clinicName.trim(),
          normalizedName: normalizedName,
          type: formData.practiceType,
          size: formData.practiceSize,
          specialty: formData.specialty,
          phone: formData.phoneNumber || '',
          ownerId: user.uid,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        const hospitalRef = await addDoc(hospitalsRef, hospitalData);
        hospitalId = hospitalRef.id;
      }

      // Set approvalStatus: 'pending' when joining existing hospital, 'active' when creating new
      const approvalStatus = isJoiningExisting ? 'pending' : 'active';
      const role = isJoiningExisting ? 'doctor' : 'owner';

      await completeOnboarding({
        ...formData,
        hospitalId: hospitalId,
        hospitalName: formData.clinicName.trim(),
        displayName: user?.displayName || '',
        approvalStatus,
      });

      // Create userHospitals record with correct status
      await userHospitalService.associateUser(
        user.uid,
        hospitalId,
        role,
        true, // isPrimary
        {
          status: isJoiningExisting ? 'pending' : 'active',
          joinDate: new Date().toISOString().split('T')[0],
        }
      );

      // Move to completion step
      setActiveStepIndex(steps.length - 1);

      if (!isJoiningExisting) {
        // New hospital owner → go to dashboard
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      }
      // Pending users stay on completion screen with info
    } catch (error) {
      console.error('Error completing onboarding:', error);
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case STEP_WELCOME:
        return true;
      case STEP_HOSPITAL:
        return hospitalConfirmed;
      case STEP_TYPE:
        return !!formData.practiceType;
      case STEP_SIZE:
        return !!formData.practiceSize;
      case STEP_SPECIALTY:
        return !!formData.specialty;
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

  // Is the user joining an existing hospital (will be pending)?
  const isPendingFlow = foundHospital && foundHospital.id;

  const renderStepContent = () => {
    switch (currentStep) {
      case STEP_WELCOME:
        return (
          <MotionBox
            key="welcome"
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
              chartsok에 오신 것을 환영합니다!
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, maxWidth: 500, mx: 'auto' }}>
              병원 정보만 간단히 확인하면 바로 시작할 수 있습니다.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Chip icon={<CheckCircleIcon />} label="1분 이내 완료" variant="outlined" />
              <Chip icon={<CheckCircleIcon />} label="언제든 수정 가능" variant="outlined" />
              <Chip icon={<CheckCircleIcon />} label="개인정보 보호" variant="outlined" />
            </Box>
          </MotionBox>
        );

      case STEP_HOSPITAL:
        return (
          <MotionBox
            key="hospital"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <Typography variant="h5" sx={{ fontWeight: 700, color: 'secondary.main', mb: 1, textAlign: 'center' }}>
              병원 이름을 입력해 주세요
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4, textAlign: 'center' }}>
              등록된 병원이 있는지 확인합니다
            </Typography>

            <Box sx={{ maxWidth: 450, mx: 'auto' }}>
              <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                <TextField
                  fullWidth
                  label="병원/의원 이름"
                  placeholder="예: 서울내과의원"
                  value={hospitalInput}
                  onChange={(e) => {
                    // Strip whitespace and special characters as they type
                    const value = e.target.value.replace(/[^가-힣a-zA-Z0-9]/g, '');
                    setHospitalInput(value);
                    if (hospitalConfirmed) {
                      setFoundHospital(null);
                      setHospitalConfirmed(false);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && hospitalInput.trim()) {
                      handleHospitalSearch();
                    }
                  }}
                  disabled={isSearching}
                  helperText="공백 및 특수문자 없이 입력해주세요"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocalHospitalIcon sx={{ color: 'grey.400' }} />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
                <Button
                  variant="contained"
                  onClick={handleHospitalSearch}
                  disabled={!hospitalInput.trim() || isSearching}
                  sx={{
                    minWidth: 80,
                    background: 'linear-gradient(135deg, #4B9CD3 0%, #3A7BA8 100%)',
                  }}
                >
                  {isSearching ? <CircularProgress size={20} color="inherit" /> : <SearchIcon />}
                </Button>
              </Box>

              <AnimatePresence mode="wait">
                {foundHospital && !hospitalConfirmed && (
                  <MotionBox
                    key="found"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card
                      elevation={0}
                      sx={{
                        border: '2px solid',
                        borderColor: '#10B981',
                        borderRadius: 3,
                        bgcolor: '#F0FDF4',
                        mb: 2,
                      }}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                          <CheckCircleIcon sx={{ color: '#10B981', fontSize: 28 }} />
                          <Typography variant="h6" sx={{ fontWeight: 700, color: '#065F46' }}>
                            병원을 찾았습니다!
                          </Typography>
                        </Box>
                        <Box sx={{ pl: 0.5, mb: 2 }}>
                          <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                            {foundHospital.name}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            {foundHospital.type && (
                              <Chip
                                size="small"
                                label={practiceTypes.find(t => t.id === foundHospital.type)?.label || foundHospital.type}
                                sx={{ bgcolor: '#E0F2FE', color: '#0369A1' }}
                              />
                            )}
                            {foundHospital.size && (
                              <Chip
                                size="small"
                                label={`의료진 ${foundHospital.size}명`}
                                sx={{ bgcolor: '#F3E8FF', color: '#7C3AED' }}
                              />
                            )}
                            {foundHospital.specialty && (
                              <Chip
                                size="small"
                                label={specialties.find(s => s.id === foundHospital.specialty)?.label || foundHospital.specialty}
                                sx={{ bgcolor: '#FEF3C7', color: '#D97706' }}
                              />
                            )}
                          </Box>
                        </Box>
                        <Typography variant="caption" sx={{ color: '#065F46', display: 'block', mb: 2 }}>
                          가입 후 병원 관리자의 승인이 필요합니다
                        </Typography>
                        <Button
                          fullWidth
                          variant="contained"
                          onClick={() => handleConfirmHospital(true)}
                          sx={{
                            background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                            fontWeight: 600,
                          }}
                        >
                          이 병원으로 시작하기
                        </Button>
                      </CardContent>
                    </Card>
                  </MotionBox>
                )}

                {foundHospital === false && !hospitalConfirmed && (
                  <MotionBox
                    key="not-found"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card
                      elevation={0}
                      sx={{
                        border: '2px solid',
                        borderColor: '#F59E0B',
                        borderRadius: 3,
                        bgcolor: '#FFFBEB',
                        mb: 2,
                      }}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                          <AddCircleOutlineIcon sx={{ color: '#F59E0B', fontSize: 28 }} />
                          <Typography variant="h6" sx={{ fontWeight: 700, color: '#92400E' }}>
                            새로운 병원이네요!
                          </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ color: '#78350F', mb: 2 }}>
                          <strong>{hospitalInput.trim()}</strong>을(를) 새로 등록합니다. 병원 정보를 입력해 주세요.
                        </Typography>
                        <Button
                          fullWidth
                          variant="contained"
                          onClick={() => handleConfirmHospital(false)}
                          sx={{
                            background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                            fontWeight: 600,
                          }}
                        >
                          병원 등록하기
                        </Button>
                      </CardContent>
                    </Card>
                  </MotionBox>
                )}
              </AnimatePresence>

              {hospitalConfirmed && (
                <MotionBox
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    bgcolor: '#F0FDF4',
                    border: '1px solid #BBF7D0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <CheckCircleIcon sx={{ color: '#10B981', fontSize: 20 }} />
                  <Typography variant="body2" sx={{ color: '#065F46', fontWeight: 600 }}>
                    {foundHospital ? `${foundHospital.name} 선택됨` : `${hospitalInput.trim()} — 새로 등록`}
                  </Typography>
                </MotionBox>
              )}
            </Box>
          </MotionBox>
        );

      case STEP_TYPE:
        return (
          <MotionBox
            key="type"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <Typography variant="h5" sx={{ fontWeight: 700, color: 'secondary.main', mb: 1, textAlign: 'center' }}>
              어떤 유형의 의료기관인가요?
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
                        {isSelected && <CheckCircleIcon sx={{ color: type.color }} />}
                      </CardContent>
                    </MotionCard>
                  </Grid>
                );
              })}
            </Grid>
          </MotionBox>
        );

      case STEP_SIZE:
        return (
          <MotionBox
            key="size"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <Typography variant="h5" sx={{ fontWeight: 700, color: 'secondary.main', mb: 1, textAlign: 'center' }}>
              의료진 규모는 어떻게 되나요?
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4, textAlign: 'center' }}>
              chartsok을 사용할 의료진 수를 선택해 주세요
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

      case STEP_SPECIALTY:
        return (
          <MotionBox
            key="specialty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <Typography variant="h5" sx={{ fontWeight: 700, color: 'secondary.main', mb: 1, textAlign: 'center' }}>
              {foundHospital ? '선생님의 전문 분야를 선택해 주세요' : '전문 분야를 선택해 주세요'}
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

      case STEP_COMPLETE:
        // Different completion for pending vs active
        if (isPendingFlow) {
          return (
            <MotionBox
              key="pending"
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
                    background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 4,
                    boxShadow: '0 12px 40px rgba(245, 158, 11, 0.3)',
                  }}
                >
                  <HourglassTopIcon sx={{ fontSize: 48, color: 'white' }} />
                </Box>
              </motion.div>
              <Typography variant="h4" sx={{ fontWeight: 800, color: 'secondary.main', mb: 2 }}>
                가입 요청이 전송되었습니다
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 1 }}>
                <strong>{foundHospital.name}</strong> 관리자가 승인하면
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
                모든 기능을 사용하실 수 있습니다.
              </Typography>
              <Button
                variant="outlined"
                onClick={() => router.push('/dashboard')}
                sx={{ borderRadius: 3 }}
              >
                대시보드로 이동
              </Button>
            </MotionBox>
          );
        }

        return (
          <MotionBox
            key="complete"
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
              이제 chartsok의 모든 기능을 사용하실 수 있습니다.<br />
              대시보드로 이동합니다...
            </Typography>
            <CircularProgress size={24} />
          </MotionBox>
        );

      default:
        return null;
    }
  };

  const isLastActionStep = activeStepIndex === steps.length - 2;
  const isCompleteStep = currentStep === STEP_COMPLETE;

  // Get actionable steps (excluding welcome and complete) for stepper display
  const actionSteps = steps.filter(s => s !== STEP_WELCOME && s !== STEP_COMPLETE);
  const currentActionIndex = actionSteps.indexOf(currentStep);

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
          value={(activeStepIndex / (steps.length - 1)) * 100}
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
            px: 1.25,
            py: 0.5,
            borderRadius: 1.5,
            bgcolor: '#56A3D9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography sx={{ color: 'white', fontWeight: 800, fontSize: '0.9rem' }}>
            차트쏙
          </Typography>
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 800, color: 'secondary.main' }}>
          chartsok
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
        {/* Stepper — only show during action steps (not welcome, not complete) */}
        {!isCompleteStep && currentStep !== STEP_WELCOME && (
          <Box sx={{ px: 4, pt: 3, pb: 2, borderBottom: '1px solid', borderColor: 'grey.100', bgcolor: 'grey.50' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {actionSteps.map((step, index) => {
                const isCompleted = index < currentActionIndex;
                const isCurrent = index === currentActionIndex;
                const stepLabel = {
                  [STEP_HOSPITAL]: '병원 확인',
                  [STEP_TYPE]: '기관 유형',
                  [STEP_SIZE]: '규모',
                  [STEP_SPECIALTY]: '전문 분야',
                }[step] || step;

                return (
                  <Box key={step} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                      <motion.div
                        animate={{
                          scale: isCurrent ? [1, 1.1, 1] : 1,
                        }}
                        transition={{ duration: 1.5, repeat: isCurrent ? Infinity : 0 }}
                      >
                        <Box
                          sx={{
                            width: 36,
                            height: 36,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: isCompleted ? '1rem' : '0.8rem',
                            fontWeight: 700,
                            bgcolor: isCompleted ? '#10B981' : isCurrent ? '#4B9CD3' : '#E2E8F0',
                            color: isCompleted || isCurrent ? 'white' : '#94A3B8',
                            transition: 'all 0.4s ease',
                            boxShadow: isCurrent ? '0 0 0 4px rgba(75, 156, 211, 0.2)' : 'none',
                          }}
                        >
                          {isCompleted ? (
                            <CheckCircleIcon sx={{ fontSize: 20 }} />
                          ) : (
                            <span>{stepIcons[step]}</span>
                          )}
                        </Box>
                      </motion.div>
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: isCurrent ? 700 : 500,
                          color: isCurrent ? '#4B9CD3' : isCompleted ? '#10B981' : '#94A3B8',
                          fontSize: '0.7rem',
                          whiteSpace: 'nowrap',
                          transition: 'all 0.3s',
                        }}
                      >
                        {stepLabel}
                      </Typography>
                    </Box>
                    {index < actionSteps.length - 1 && (
                      <Box
                        sx={{
                          width: { xs: 24, sm: 48 },
                          height: 2,
                          borderRadius: 1,
                          bgcolor: isCompleted ? '#10B981' : '#E2E8F0',
                          mx: { xs: 0.5, sm: 1.5 },
                          mt: -2,
                          transition: 'all 0.4s ease',
                        }}
                      />
                    )}
                  </Box>
                );
              })}
            </Box>
          </Box>
        )}

        {/* Content */}
        <Box sx={{ p: 4 }}>
          <AnimatePresence mode="wait">
            {renderStepContent()}
          </AnimatePresence>
        </Box>

        {/* Actions */}
        {!isCompleteStep && (
          <Box sx={{ p: 3, borderTop: '1px solid', borderColor: 'grey.100', display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={handleBack}
              disabled={activeStepIndex === 0}
              sx={{ visibility: activeStepIndex === 0 ? 'hidden' : 'visible' }}
            >
              이전
            </Button>
            {currentStep === STEP_HOSPITAL ? (
              <Box />
            ) : isLastActionStep ? (
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
            ) : (
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
            )}
          </Box>
        )}
      </MotionPaper>
    </Box>
  );
}
