'use client';

import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Chip,
  Snackbar,
  Alert,
} from '@mui/material';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SendIcon from '@mui/icons-material/Send';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import BusinessIcon from '@mui/icons-material/Business';
import HandshakeIcon from '@mui/icons-material/Handshake';
import { useI18n } from '@/lib/i18n';

const MotionBox = motion.create(Box);

const content = {
  ko: {
    badge: '문의하기',
    title: '무엇이든 물어보세요',
    subtitle: 'ChartSok 팀이 빠르게 답변해 드리겠습니다. 제품 문의, 데모 예약, 파트너십 등 무엇이든 환영합니다.',
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
    inquiryTypes: [
      { icon: SupportAgentIcon, title: '기술 지원', desc: '제품 사용 중 문제가 있으신가요?' },
      { icon: BusinessIcon, title: '영업 문의', desc: '도입 상담 및 데모 예약' },
      { icon: HandshakeIcon, title: '파트너십', desc: 'EMR 연동 및 협력 문의' },
    ],
    form: {
      name: '이름',
      email: '이메일',
      company: '병원/회사명',
      subject: '문의 유형',
      message: '문의 내용',
      submit: '문의 보내기',
      subjects: ['제품 문의', '데모 요청', '기술 지원', 'EMR 연동', '파트너십', '기타'],
    },
    success: '문의가 성공적으로 전송되었습니다. 빠른 시일 내에 답변 드리겠습니다.',
    error: '문의 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.',
    sending: '전송 중...',
  },
  en: {
    badge: 'Contact Us',
    title: 'Get in Touch',
    subtitle: 'The ChartSok team will respond quickly. Product inquiries, demo bookings, partnerships - all welcome.',
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
    inquiryTypes: [
      { icon: SupportAgentIcon, title: 'Technical Support', desc: 'Having issues with the product?' },
      { icon: BusinessIcon, title: 'Sales Inquiry', desc: 'Consultation and demo booking' },
      { icon: HandshakeIcon, title: 'Partnership', desc: 'EMR integration and collaboration' },
    ],
    form: {
      name: 'Name',
      email: 'Email',
      company: 'Hospital/Company',
      subject: 'Inquiry Type',
      message: 'Message',
      submit: 'Send Inquiry',
      subjects: ['Product Inquiry', 'Demo Request', 'Technical Support', 'EMR Integration', 'Partnership', 'Other'],
    },
    success: 'Your inquiry has been sent successfully. We will respond shortly.',
    error: 'Failed to send inquiry. Please try again later.',
    sending: 'Sending...',
  },
};

export default function ContactPage() {
  const { locale } = useI18n();
  const t = content[locale] || content.ko;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSnackbar({ open: true, message: t.success, severity: 'success' });
        setFormData({ name: '', email: '', company: '', subject: '', message: '' });
      } else {
        setSnackbar({ open: true, message: t.error || 'Failed to send message', severity: 'error' });
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setSnackbar({ open: true, message: t.error || 'Failed to send message', severity: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <Box sx={{ bgcolor: '#FAFBFC', minHeight: '100vh' }}>
        {/* Hero Section */}
        <Box
          sx={{
            background: 'linear-gradient(180deg, #EBF5FF 0%, #FAFBFC 100%)',
            pt: { xs: 8, md: 12 },
            pb: { xs: 6, md: 8 },
          }}
        >
          <Container maxWidth="xl">
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
                  bgcolor: 'primary.main',
                  color: 'white',
                  fontWeight: 600,
                  px: 2,
                }}
              />
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  color: 'secondary.main',
                  mb: 3,
                  fontSize: { xs: '2rem', md: '3rem' },
                }}
              >
                {t.title}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: 'text.secondary',
                  fontWeight: 400,
                  lineHeight: 1.8,
                }}
              >
                {t.subtitle}
              </Typography>
            </MotionBox>
          </Container>
        </Box>

        {/* Contact Info Cards */}
        <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 } }}>
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
                      <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 0.5 }}>
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

        {/* Contact Form */}
        <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 } }}>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: 'secondary.main', mb: 3 }}>
                {locale === 'ko' ? '문의 유형' : 'Inquiry Types'}
              </Typography>
              {t.inquiryTypes.map((type, index) => {
                const Icon = type.icon;
                return (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 2,
                      mb: 3,
                      p: 2,
                      bgcolor: 'white',
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: 'grey.200',
                    }}
                  >
                    <Icon sx={{ color: 'primary.main', mt: 0.5 }} />
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {type.title}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {type.desc}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <Card
                elevation={0}
                sx={{
                  p: 4,
                  border: '1px solid',
                  borderColor: 'grey.200',
                  borderRadius: 3,
                }}
              >
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label={t.form.name}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label={t.form.email}
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label={t.form.company}
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        select
                        label={t.form.subject}
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        SelectProps={{ native: true }}
                        required
                      >
                        <option value=""></option>
                        {t.form.subjects.map((sub) => (
                          <option key={sub} value={sub}>{sub}</option>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        multiline
                        rows={5}
                        label={t.form.message}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={isSubmitting}
                        endIcon={!isSubmitting && <SendIcon />}
                        sx={{
                          px: 4,
                          py: 1.5,
                          background: 'linear-gradient(135deg, #4B9CD3 0%, #3A7BA8 100%)',
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
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
