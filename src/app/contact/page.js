'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  TextField,
  Button,
  Chip,
  Snackbar,
  Alert,
  MenuItem,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SendIcon from '@mui/icons-material/Send';
import HandshakeIcon from '@mui/icons-material/Handshake';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import SecurityIcon from '@mui/icons-material/Security';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import GroupsIcon from '@mui/icons-material/Groups';
import CategoryIcon from '@mui/icons-material/Category';
import PeopleIcon from '@mui/icons-material/People';
import MessageIcon from '@mui/icons-material/Message';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useI18n } from '@/lib/i18n';

const MotionCard = motion.create(Card);

const MotionBox = motion.create(Box);

const typeConfig = {
  emr_partner: {
    ko: {
      badge: 'EMR 제휴 문의',
      title: 'EMR 파트너 제휴 문의',
      subtitle: 'Chartsok AI 차트 모듈을 귀사 EMR에 탑재하세요. 기술 검토부터 파일럿까지 전담팀이 함께합니다.',
      icon: HandshakeIcon,
      formFields: ['companyName', 'contactName', 'email', 'phone', 'emrName', 'hospitalCount', 'message'],
    },
    en: {
      badge: 'EMR Partnership',
      title: 'EMR Partner Inquiry',
      subtitle: 'Embed Chartsok AI charting into your EMR. Our dedicated team supports you from technical review to pilot.',
      icon: HandshakeIcon,
      formFields: ['companyName', 'contactName', 'email', 'phone', 'emrName', 'hospitalCount', 'message'],
    },
  },
  clinic: {
    ko: {
      badge: '데모 요청',
      title: '데모를 신청하세요',
      subtitle: '진료 요약부터 후속관리까지, Chartsok이 어떻게 도움이 되는지 직접 확인하세요.',
      icon: LocalHospitalIcon,
      formFields: ['clinicName', 'contactName', 'email', 'specialty', 'volume', 'message'],
    },
    en: {
      badge: 'Request Demo',
      title: 'Request a Demo',
      subtitle: 'From visit summaries to follow-up actions — see how Chartsok can help your clinic.',
      icon: LocalHospitalIcon,
      formFields: ['clinicName', 'contactName', 'email', 'specialty', 'volume', 'message'],
    },
  },
  security_packet: {
    ko: {
      badge: '보안 자료 요청',
      title: '보안 검토 자료 요청',
      subtitle: 'Chartsok의 보안 체계, 인증 현황, 개인정보 처리 방침 등 기술 검토에 필요한 자료를 보내드립니다.',
      icon: SecurityIcon,
      formFields: ['companyName', 'contactName', 'email', 'phone', 'message'],
    },
    en: {
      badge: 'Security Packet',
      title: 'Request Security Documentation',
      subtitle: 'We\'ll send you our security architecture, certifications, and data processing policies for your technical review.',
      icon: SecurityIcon,
      formFields: ['companyName', 'contactName', 'email', 'phone', 'message'],
    },
  },
  template_mapping_check: {
    ko: {
      badge: '템플릿 매핑 확인',
      title: 'EMR 템플릿 매핑 가능 여부 확인',
      subtitle: '귀사 EMR의 차트 템플릿 샘플을 보내주시면, 매핑 가능 여부와 예상 소요 기간을 안내드립니다.',
      icon: HandshakeIcon,
      formFields: ['companyName', 'contactName', 'email', 'phone', 'emrName', 'message'],
    },
    en: {
      badge: 'Template Mapping',
      title: 'Check Template Mapping Compatibility',
      subtitle: 'Send us your EMR chart template samples and we\'ll confirm mapping feasibility and estimated timeline.',
      icon: HandshakeIcon,
      formFields: ['companyName', 'contactName', 'email', 'phone', 'emrName', 'message'],
    },
  },
};

const fieldIcons = {
  companyName: BusinessIcon,
  clinicName: LocalHospitalIcon,
  contactName: PersonIcon,
  email: EmailIcon,
  phone: PhoneIcon,
  emrName: MedicalServicesIcon,
  hospitalCount: GroupsIcon,
  specialty: CategoryIcon,
  volume: PeopleIcon,
  message: MessageIcon,
};

const fieldLabels = {
  ko: {
    companyName: '회사명',
    clinicName: '병원명',
    contactName: '담당자 성함',
    email: '이메일',
    phone: '연락처',
    emrName: 'EMR 제품명',
    hospitalCount: '고객 병원 수 (대략)',
    specialty: '진료과',
    volume: '일일 외래 환자 수 (대략)',
    message: '추가 문의사항 (선택)',
    specialties: ['내과', '가정의학과', '소아청소년과', '정형외과', '피부과', '이비인후과', '안과', '치과', '기타'],
    volumes: ['20명 미만', '20~50명', '50~100명', '100명 이상'],
    hospitalCounts: ['100곳 미만', '100~500곳', '500~1,000곳', '1,000곳 이상'],
    submit: {
      emr_partner: '제휴 문의하기',
      clinic: '데모 요청하기',
      security_packet: '자료 요청하기',
      template_mapping_check: '매핑 확인 요청하기',
    },
    formHeader: {
      emr_partner: '제휴 정보 입력',
      clinic: '병원 정보 입력',
      security_packet: '요청자 정보 입력',
      template_mapping_check: '제휴사 정보 입력',
    },
    requiredNote: '* 필수 입력 항목',
    responseTime: '영업일 기준 24시간 내 답변드립니다',
    success: '요청이 성공적으로 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.',
    error: '요청 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.',
    sending: '전송 중...',
  },
  en: {
    companyName: 'Company Name',
    clinicName: 'Clinic Name',
    contactName: 'Contact Name',
    email: 'Email',
    phone: 'Phone',
    emrName: 'EMR Product Name',
    hospitalCount: 'Number of Client Hospitals (approx.)',
    specialty: 'Specialty',
    volume: 'Daily Outpatient Volume (approx.)',
    message: 'Additional Notes (optional)',
    specialties: ['Internal Medicine', 'Family Medicine', 'Pediatrics', 'Orthopedics', 'Dermatology', 'ENT', 'Ophthalmology', 'Dentistry', 'Other'],
    volumes: ['Under 20', '20–50', '50–100', '100+'],
    hospitalCounts: ['Under 100', '100–500', '500–1,000', '1,000+'],
    submit: {
      emr_partner: 'Submit Partnership Inquiry',
      clinic: 'Request Demo',
      security_packet: 'Request Security Packet',
      template_mapping_check: 'Check Template Mapping',
    },
    formHeader: {
      emr_partner: 'Partnership Details',
      clinic: 'Clinic Information',
      security_packet: 'Contact Information',
      template_mapping_check: 'Partner Information',
    },
    requiredNote: '* Required fields',
    responseTime: 'We respond within 24 business hours',
    success: 'Your request has been submitted. We will contact you shortly.',
    error: 'Failed to submit request. Please try again later.',
    sending: 'Sending...',
  },
};

const contactInfo = {
  ko: [
    { icon: EmailIcon, title: '이메일', value: 'chartsok.health@gmail.com', description: '평일 24시간 내 답변', color: '#4B9CD3' },
    { icon: LocationOnIcon, title: '주소', value: '인천광역시 중구', description: '대한민국', color: '#10B981' },
    { icon: AccessTimeIcon, title: '영업 시간', value: '평일 09:00 - 18:00', description: '주말 및 공휴일 휴무', color: '#F59E0B' },
  ],
  en: [
    { icon: EmailIcon, title: 'Email', value: 'chartsok.health@gmail.com', description: 'Response within 24 hours', color: '#4B9CD3' },
    { icon: LocationOnIcon, title: 'Address', value: 'Jung-gu, Incheon', description: 'South Korea', color: '#10B981' },
    { icon: AccessTimeIcon, title: 'Business Hours', value: 'Mon-Fri 09:00 - 18:00 KST', description: 'Closed on weekends', color: '#F59E0B' },
  ],
};

function ContactContent() {
  const searchParams = useSearchParams();
  const { locale } = useI18n();
  const type = searchParams.get('type') || 'clinic';
  const config = typeConfig[type] || typeConfig.clinic;
  const t = config[locale] || config.ko;
  const labels = fieldLabels[locale] || fieldLabels.ko;
  const infos = contactInfo[locale] || contactInfo.ko;
  const HeroIcon = t.icon;

  const initialFormData = {};
  t.formFields.forEach((f) => { initialFormData[f] = ''; });
  initialFormData.website = ''; // honeypot

  const [formData, setFormData] = useState(initialFormData);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.website) return;
    setIsSubmitting(true);

    try {
      const { website, ...submitData } = formData;
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...submitData, type, locale }),
      });

      if (response.ok) {
        setSnackbar({ open: true, message: labels.success, severity: 'success' });
        const resetData = {};
        t.formFields.forEach((f) => { resetData[f] = ''; });
        resetData.website = '';
        setFormData(resetData);
      } else {
        setSnackbar({ open: true, message: labels.error, severity: 'error' });
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setSnackbar({ open: true, message: labels.error, severity: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Determine if a field should be full width based on whether it would be alone in a row
  const getFieldSize = (field) => {
    const alwaysFullWidth = ['companyName', 'clinicName', 'message'];
    if (alwaysFullWidth.includes(field)) return { xs: 12 };

    // Get fields that can be paired (half-width candidates)
    const pairableFields = t.formFields.filter((f) => !alwaysFullWidth.includes(f));
    const fieldIndex = pairableFields.indexOf(field);

    // If odd number of pairable fields and this is the last one, make it full width
    if (pairableFields.length % 2 === 1 && fieldIndex === pairableFields.length - 1) {
      return { xs: 12 };
    }

    return { xs: 12, sm: 6 };
  };

  const renderField = (field) => {
    const gridSize = getFieldSize(field);
    const FieldIcon = fieldIcons[field];
    const iconAdornment = FieldIcon ? {
      startAdornment: (
        <InputAdornment position="start">
          <FieldIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
        </InputAdornment>
      ),
    } : {};

    if (field === 'specialty') {
      return (
        <Grid size={gridSize} key={field}>
          <TextField
            fullWidth
            select
            label={labels[field]}
            value={formData[field]}
            onChange={handleChange(field)}
            required
            slotProps={{ input: iconAdornment }}
          >
            {labels.specialties.map((s) => (
              <MenuItem key={s} value={s}>{s}</MenuItem>
            ))}
          </TextField>
        </Grid>
      );
    }
    if (field === 'volume') {
      return (
        <Grid size={gridSize} key={field}>
          <TextField
            fullWidth
            select
            label={labels[field]}
            value={formData[field]}
            onChange={handleChange(field)}
            required
            slotProps={{ input: iconAdornment }}
          >
            {labels.volumes.map((v) => (
              <MenuItem key={v} value={v}>{v}</MenuItem>
            ))}
          </TextField>
        </Grid>
      );
    }
    if (field === 'hospitalCount') {
      return (
        <Grid size={gridSize} key={field}>
          <TextField
            fullWidth
            select
            label={labels[field]}
            value={formData[field]}
            onChange={handleChange(field)}
            required
            slotProps={{ input: iconAdornment }}
          >
            {labels.hospitalCounts.map((h) => (
              <MenuItem key={h} value={h}>{h}</MenuItem>
            ))}
          </TextField>
        </Grid>
      );
    }
    if (field === 'message') {
      return (
        <Grid size={gridSize} key={field}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label={labels[field]}
            value={formData[field]}
            onChange={handleChange(field)}
            placeholder={locale === 'ko' ? '궁금한 점이나 추가 요청사항을 입력해주세요' : 'Enter any questions or additional requests'}
          />
        </Grid>
      );
    }
    return (
      <Grid size={gridSize} key={field}>
        <TextField
          fullWidth
          label={labels[field]}
          type={field === 'email' ? 'email' : 'text'}
          value={formData[field]}
          onChange={handleChange(field)}
          required={field !== 'message'}
          slotProps={{ input: iconAdornment }}
        />
      </Grid>
    );
  };

  return (
    <>
      <Header />
      <Box sx={{ bgcolor: '#FAFBFC', minHeight: '100vh' }}>
        {/* Hero */}
        <Box
          sx={{
            background: 'linear-gradient(180deg, #1E3A5F 0%, #2D4A6F 100%)',
            pt: { xs: 8, md: 12 },
            pb: { xs: 6, md: 8 },
            color: 'white',
          }}
        >
          <Container maxWidth="lg">
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              sx={{ textAlign: 'center', maxWidth: 700, mx: 'auto' }}
            >
              <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    bgcolor: 'rgba(255,255,255,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <HeroIcon sx={{ fontSize: 28, color: 'white' }} />
                </Box>
              </Box>
              <Chip
                label={t.badge}
                sx={{
                  mb: 3,
                  bgcolor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  fontWeight: 600,
                }}
              />
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  mb: 3,
                  fontSize: { xs: '2rem', md: '3rem' },
                }}
              >
                {t.title}
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: 400, lineHeight: 1.8, opacity: 0.9 }}
              >
                {t.subtitle}
              </Typography>
            </MotionBox>
          </Container>
        </Box>

        {/* Contact Info */}
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
          <Grid container spacing={3}>
            {infos.map((info, index) => {
              const Icon = info.icon;
              return (
                <Grid size={{ xs: 12, md: 4 }} key={index}>
                  <MotionCard
                    elevation={0}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ y: -4, boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}
                    sx={{
                      p: 3,
                      textAlign: 'center',
                      border: '1px solid',
                      borderColor: 'grey.200',
                      borderRadius: 3,
                      height: '100%',
                      cursor: 'default',
                      transition: 'border-color 0.2s',
                      '&:hover': {
                        borderColor: info.color,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: 3,
                        bgcolor: `${info.color}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 2,
                        transition: 'transform 0.2s',
                      }}
                    >
                      <Icon sx={{ color: info.color, fontSize: 28 }} />
                    </Box>
                    <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 0.5 }}>
                      {info.title}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                      {info.value}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {info.description}
                    </Typography>
                  </MotionCard>
                </Grid>
              );
            })}
          </Grid>
        </Container>

        {/* Form */}
        <Container maxWidth="sm" sx={{ py: { xs: 4, md: 6 }, pb: { xs: 8, md: 10 } }}>
          <MotionCard
            elevation={0}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            sx={{
              p: { xs: 3, md: 4 },
              border: '1px solid',
              borderColor: 'grey.200',
              borderRadius: 3,
              boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
            }}
          >
            {/* Form Header */}
            <Box sx={{ mb: 3, pb: 3, borderBottom: '1px solid', borderColor: 'grey.100' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    bgcolor: '#4B9CD315',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <HeroIcon sx={{ fontSize: 20, color: '#4B9CD3' }} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
                  {labels.formHeader?.[type] || t.badge}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {labels.requiredNote}
              </Typography>
            </Box>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={2.5}>
                {t.formFields.map(renderField)}
                {/* Honeypot */}
                <Box
                  sx={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }}
                  aria-hidden="true"
                >
                  <TextField
                    label="Website"
                    value={formData.website}
                    onChange={handleChange('website')}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </Box>
                <Grid size={{ xs: 12 }} sx={{ mt: 1 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    disabled={isSubmitting}
                    endIcon={!isSubmitting ? <SendIcon /> : null}
                    startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
                    sx={{
                      py: 1.75,
                      fontSize: '1rem',
                      fontWeight: 600,
                      textTransform: 'none',
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #4B9CD3 0%, #3A7BA8 100%)',
                      boxShadow: '0 4px 14px rgba(75, 156, 211, 0.3)',
                      transition: 'all 0.2s',
                      '&:hover': {
                        boxShadow: '0 6px 20px rgba(75, 156, 211, 0.4)',
                        transform: 'translateY(-1px)',
                      },
                      '&:disabled': {
                        background: 'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)',
                        boxShadow: 'none',
                      },
                    }}
                  >
                    {isSubmitting ? labels.sending : labels.submit[type] || labels.submit.clinic}
                  </Button>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.75, mt: 1 }}>
                    <CheckCircleOutlineIcon sx={{ fontSize: 16, color: '#10B981' }} />
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {labels.responseTime}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </MotionCard>
        </Container>
      </Box>
      <Footer />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography sx={{ color: '#64748B' }}>Loading...</Typography>
      </Box>
    }>
      <ContactContent />
    </Suspense>
  );
}
