'use client';

import { useState } from 'react';
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
} from '@mui/material';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SendIcon from '@mui/icons-material/Send';
import { useI18n } from '@/lib/i18n';

const MotionBox = motion.create(Box);

const content = {
  ko: {
    badge: '데모 요청',
    title: '데모를 신청하세요',
    subtitle:
      '진료 요약부터 후속관리까지, Chartsok이 어떻게 도움이 되는지 직접 확인하세요.',
    contactInfo: [
      {
        icon: EmailIcon,
        title: '이메일',
        value: 'chartsok.health@gmail.com',
        description: '평일 24시간 내 답변',
        color: '#4B9CD3',
      },
      {
        icon: LocationOnIcon,
        title: '주소',
        value: '인천광역시 중구',
        description: '대한민국',
        color: '#10B981',
      },
      {
        icon: AccessTimeIcon,
        title: '영업 시간',
        value: '평일 09:00 - 18:00',
        description: '주말 및 공휴일 휴무',
        color: '#F59E0B',
      },
    ],
    form: {
      clinicName: '병원명',
      contactName: '담당자 성함',
      email: '이메일',
      specialty: '진료과',
      volume: '일일 외래 환자 수 (대략)',
      message: '추가 문의사항 (선택)',
      submit: '데모 요청하기',
      specialties: [
        '내과',
        '가정의학과',
        '소아청소년과',
        '정형외과',
        '피부과',
        '이비인후과',
        '안과',
        '치과',
        '기타',
      ],
      volumes: ['20명 미만', '20~50명', '50~100명', '100명 이상'],
    },
    success: '데모 요청이 성공적으로 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.',
    error: '요청 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.',
    sending: '전송 중...',
  },
  en: {
    badge: 'Request Demo',
    title: 'Request a Demo',
    subtitle:
      'From visit summaries to follow-up actions — see how Chartsok can help your clinic.',
    contactInfo: [
      {
        icon: EmailIcon,
        title: 'Email',
        value: 'chartsok.health@gmail.com',
        description: 'Response within 24 hours',
        color: '#4B9CD3',
      },
      {
        icon: LocationOnIcon,
        title: 'Address',
        value: 'Jung-gu, Incheon',
        description: 'South Korea',
        color: '#10B981',
      },
      {
        icon: AccessTimeIcon,
        title: 'Business Hours',
        value: 'Mon-Fri 09:00 - 18:00 KST',
        description: 'Closed on weekends',
        color: '#F59E0B',
      },
    ],
    form: {
      clinicName: 'Clinic Name',
      contactName: 'Contact Name',
      email: 'Email',
      specialty: 'Specialty',
      volume: 'Daily Outpatient Volume (approx.)',
      message: 'Additional Notes (optional)',
      submit: 'Request Demo',
      specialties: [
        'Internal Medicine',
        'Family Medicine',
        'Pediatrics',
        'Orthopedics',
        'Dermatology',
        'ENT',
        'Ophthalmology',
        'Dentistry',
        'Other',
      ],
      volumes: ['Under 20', '20–50', '50–100', '100+'],
    },
    success: 'Your demo request has been submitted. We will contact you shortly.',
    error: 'Failed to submit request. Please try again later.',
    sending: 'Sending...',
  },
};

export default function ContactPage() {
  const { locale } = useI18n();
  const t = content[locale] || content.ko;

  const [formData, setFormData] = useState({
    clinicName: '',
    contactName: '',
    email: '',
    specialty: '',
    volume: '',
    message: '',
    website: '', // honeypot
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot check
    if (formData.website) return;

    setIsSubmitting(true);

    try {
      const { website, ...submitData } = formData;
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...submitData, locale }),
      });

      if (response.ok) {
        setSnackbar({ open: true, message: t.success, severity: 'success' });
        setFormData({
          clinicName: '',
          contactName: '',
          email: '',
          specialty: '',
          volume: '',
          message: '',
          website: '',
        });
      } else {
        setSnackbar({ open: true, message: t.error, severity: 'error' });
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setSnackbar({ open: true, message: t.error, severity: 'error' });
    } finally {
      setIsSubmitting(false);
    }
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
            {t.contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <Grid size={{ xs: 12, md: 4 }} key={index}>
                  <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card
                      elevation={0}
                      sx={{
                        p: 3,
                        textAlign: 'center',
                        border: '1px solid',
                        borderColor: 'grey.200',
                        borderRadius: 3,
                        height: '100%',
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
                        }}
                      >
                        <Icon sx={{ color: info.color, fontSize: 28 }} />
                      </Box>
                      <Typography
                        variant="subtitle2"
                        sx={{ color: 'text.secondary', mb: 0.5 }}
                      >
                        {info.title}
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                        {info.value}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {info.description}
                      </Typography>
                    </Card>
                  </MotionBox>
                </Grid>
              );
            })}
          </Grid>
        </Container>

        {/* Demo Request Form */}
        <Container maxWidth="sm" sx={{ py: { xs: 4, md: 6 } }}>
          <Card
            elevation={0}
            sx={{
              p: { xs: 3, md: 4 },
              border: '1px solid',
              borderColor: 'grey.200',
              borderRadius: 3,
            }}
          >
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label={t.form.clinicName}
                    value={formData.clinicName}
                    onChange={(e) =>
                      setFormData({ ...formData, clinicName: e.target.value })
                    }
                    required
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label={t.form.contactName}
                    value={formData.contactName}
                    onChange={(e) =>
                      setFormData({ ...formData, contactName: e.target.value })
                    }
                    required
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label={t.form.email}
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    select
                    label={t.form.specialty}
                    value={formData.specialty}
                    onChange={(e) =>
                      setFormData({ ...formData, specialty: e.target.value })
                    }
                    required
                  >
                    {t.form.specialties.map((s) => (
                      <MenuItem key={s} value={s}>
                        {s}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    select
                    label={t.form.volume}
                    value={formData.volume}
                    onChange={(e) =>
                      setFormData({ ...formData, volume: e.target.value })
                    }
                    required
                  >
                    {t.form.volumes.map((v) => (
                      <MenuItem key={v} value={v}>
                        {v}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label={t.form.message}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                  />
                </Grid>
                {/* Honeypot - hidden from real users */}
                <Box
                  sx={{
                    position: 'absolute',
                    left: '-9999px',
                    opacity: 0,
                    height: 0,
                    overflow: 'hidden',
                  }}
                  aria-hidden="true"
                >
                  <TextField
                    label="Website"
                    value={formData.website}
                    onChange={(e) =>
                      setFormData({ ...formData, website: e.target.value })
                    }
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </Box>
                <Grid size={{ xs: 12 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    disabled={isSubmitting}
                    endIcon={!isSubmitting && <SendIcon />}
                    sx={{
                      py: 1.5,
                      fontSize: '1rem',
                      fontWeight: 600,
                      textTransform: 'none',
                      background:
                        'linear-gradient(135deg, #4B9CD3 0%, #3A7BA8 100%)',
                      '&:disabled': {
                        background: 'grey.400',
                      },
                    }}
                  >
                    {isSubmitting ? t.sending : t.form.submit}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Card>
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
