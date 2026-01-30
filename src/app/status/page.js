'use client';

import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  Divider,
} from '@mui/material';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloudIcon from '@mui/icons-material/Cloud';
import StorageIcon from '@mui/icons-material/Storage';
import MicIcon from '@mui/icons-material/Mic';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import SyncIcon from '@mui/icons-material/Sync';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import { useI18n } from '@/lib/i18n';

const MotionBox = motion.create(Box);

const content = {
  ko: {
    badge: '시스템 상태',
    title: '서비스 상태',
    subtitle: 'ChartSok 서비스의 실시간 상태를 확인하세요.',
    allOperational: '모든 시스템 정상 작동 중',
    lastUpdated: '마지막 업데이트',
    uptime: '가동률',
    responseTime: '응답 시간',
    services: [
      { name: '웹 애플리케이션', status: 'operational', uptime: 99.99, icon: CloudIcon },
      { name: 'API 서버', status: 'operational', uptime: 99.98, icon: StorageIcon },
      { name: '음성 인식 서비스', status: 'operational', uptime: 99.95, icon: MicIcon },
      { name: 'AI 차트 생성', status: 'operational', uptime: 99.97, icon: SmartToyIcon },
      { name: 'EMR 연동', status: 'operational', uptime: 99.96, icon: SyncIcon },
      { name: '인증 서비스', status: 'operational', uptime: 99.99, icon: SecurityIcon },
    ],
    statusLabels: {
      operational: '정상',
      degraded: '성능 저하',
      outage: '장애',
    },
    historyTitle: '최근 30일 기록',
    noIncidents: '최근 30일간 장애가 없었습니다.',
    performance: '성능 지표',
    metrics: [
      { label: 'API 응답 시간', value: '45ms', trend: 'good' },
      { label: '음성 인식 처리', value: '1.2초', trend: 'good' },
      { label: 'AI 차트 생성', value: '3.5초', trend: 'good' },
      { label: 'EMR 전송', value: '0.8초', trend: 'good' },
    ],
    subscribe: '상태 알림 구독',
    subscribeDesc: '서비스 장애 발생 시 이메일로 알림을 받으세요.',
  },
  en: {
    badge: 'System Status',
    title: 'Service Status',
    subtitle: 'Check the real-time status of ChartSok services.',
    allOperational: 'All Systems Operational',
    lastUpdated: 'Last Updated',
    uptime: 'Uptime',
    responseTime: 'Response Time',
    services: [
      { name: 'Web Application', status: 'operational', uptime: 99.99, icon: CloudIcon },
      { name: 'API Server', status: 'operational', uptime: 99.98, icon: StorageIcon },
      { name: 'Speech Recognition', status: 'operational', uptime: 99.95, icon: MicIcon },
      { name: 'AI Chart Generation', status: 'operational', uptime: 99.97, icon: SmartToyIcon },
      { name: 'EMR Integration', status: 'operational', uptime: 99.96, icon: SyncIcon },
      { name: 'Authentication', status: 'operational', uptime: 99.99, icon: SecurityIcon },
    ],
    statusLabels: {
      operational: 'Operational',
      degraded: 'Degraded',
      outage: 'Outage',
    },
    historyTitle: 'Last 30 Days',
    noIncidents: 'No incidents in the last 30 days.',
    performance: 'Performance Metrics',
    metrics: [
      { label: 'API Response', value: '45ms', trend: 'good' },
      { label: 'Speech Processing', value: '1.2s', trend: 'good' },
      { label: 'AI Chart Generation', value: '3.5s', trend: 'good' },
      { label: 'EMR Transfer', value: '0.8s', trend: 'good' },
    ],
    subscribe: 'Subscribe to Updates',
    subscribeDesc: 'Get email notifications when incidents occur.',
  },
};

const getStatusColor = (status) => {
  switch (status) {
    case 'operational': return '#10B981';
    case 'degraded': return '#F59E0B';
    case 'outage': return '#EF4444';
    default: return '#6B7280';
  }
};

export default function StatusPage() {
  const { locale } = useI18n();
  const t = content[locale] || content.ko;
  const now = new Date().toLocaleString(locale === 'ko' ? 'ko-KR' : 'en-US');

  return (
    <>
      <Header />
      <Box sx={{ bgcolor: '#FAFBFC', minHeight: '100vh' }}>
        {/* Hero */}
        <Box
          sx={{
            background: 'linear-gradient(180deg, #ECFDF5 0%, #FAFBFC 100%)',
            pt: { xs: 8, md: 12 },
            pb: { xs: 6, md: 8 },
          }}
        >
          <Container maxWidth="xl">
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              sx={{ textAlign: 'center', maxWidth: 700, mx: 'auto' }}
            >
              <Chip label={t.badge} sx={{ mb: 3, bgcolor: '#10B981', color: 'white', fontWeight: 600 }} />
              <Typography variant="h2" sx={{ fontWeight: 800, color: 'secondary.main', mb: 3, fontSize: { xs: '2rem', md: '3rem' } }}>
                {t.title}
              </Typography>
              <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 400, mb: 4 }}>
                {t.subtitle}
              </Typography>
              <Card
                elevation={0}
                sx={{
                  p: 3,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 2,
                  border: '2px solid',
                  borderColor: '#10B981',
                  borderRadius: 3,
                  bgcolor: 'white',
                }}
              >
                <CheckCircleIcon sx={{ fontSize: 32, color: '#10B981' }} />
                <Box sx={{ textAlign: 'left' }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#10B981' }}>
                    {t.allOperational}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {t.lastUpdated}: {now}
                  </Typography>
                </Box>
              </Card>
            </MotionBox>
          </Container>
        </Box>

        {/* Services Status */}
        <Container maxWidth="xl" sx={{ py: { xs: 6, md: 8 } }}>
          <Grid container spacing={2}>
            {t.services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                  <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card
                      elevation={0}
                      sx={{ p: 2.5, border: '1px solid', borderColor: 'grey.200', borderRadius: 3 }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Icon sx={{ color: 'text.secondary' }} />
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{service.name}</Typography>
                        </Box>
                        <Chip
                          label={t.statusLabels[service.status]}
                          size="small"
                          sx={{
                            bgcolor: `${getStatusColor(service.status)}15`,
                            color: getStatusColor(service.status),
                            fontWeight: 600,
                            fontSize: '0.7rem',
                          }}
                        />
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          {t.uptime}: {service.uptime}%
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={service.uptime}
                          sx={{
                            flex: 1,
                            height: 4,
                            borderRadius: 2,
                            bgcolor: 'grey.200',
                            '& .MuiLinearProgress-bar': { bgcolor: getStatusColor(service.status) },
                          }}
                        />
                      </Box>
                    </Card>
                  </MotionBox>
                </Grid>
              );
            })}
          </Grid>
        </Container>

        {/* Performance Metrics */}
        <Box sx={{ bgcolor: 'white', py: { xs: 6, md: 8 } }}>
          <Container maxWidth="xl">
            <Typography variant="h4" sx={{ fontWeight: 700, color: 'secondary.main', mb: 4, textAlign: 'center' }}>
              {t.performance}
            </Typography>
            <Grid container spacing={3}>
              {t.metrics.map((metric, index) => (
                <Grid size={{ xs: 6, md: 3 }} key={index}>
                  <Card
                    elevation={0}
                    sx={{ p: 3, textAlign: 'center', border: '1px solid', borderColor: 'grey.200', borderRadius: 3 }}
                  >
                    <SpeedIcon sx={{ fontSize: 32, color: '#10B981', mb: 1 }} />
                    <Typography variant="h5" sx={{ fontWeight: 800, color: 'secondary.main', mb: 0.5 }}>
                      {metric.value}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {metric.label}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* History */}
        <Container maxWidth="xl" sx={{ py: { xs: 6, md: 8 } }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: 'secondary.main', mb: 3 }}>
            {t.historyTitle}
          </Typography>
          <Card
            elevation={0}
            sx={{ p: 4, border: '1px solid', borderColor: 'grey.200', borderRadius: 3, textAlign: 'center' }}
          >
            <CheckCircleIcon sx={{ fontSize: 48, color: '#10B981', mb: 2 }} />
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              {t.noIncidents}
            </Typography>
          </Card>
        </Container>
      </Box>
      <Footer />
    </>
  );
}
