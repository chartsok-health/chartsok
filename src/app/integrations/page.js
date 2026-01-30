'use client';

import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  Chip,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SyncIcon from '@mui/icons-material/Sync';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import SettingsIcon from '@mui/icons-material/Settings';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import EmailIcon from '@mui/icons-material/Email';
import { useI18n } from '@/lib/i18n';

const MotionBox = motion.create(Box);

const content = {
  ko: {
    badge: 'EMR 연동 (개발 중)',
    title: 'EMR 연동 준비 중',
    subtitle: 'chartsok은 다양한 EMR 시스템과의 연동을 준비하고 있습니다. 현재는 클립보드 복사 방식으로 모든 EMR과 함께 사용할 수 있으며, API 기반 직접 연동은 개발 중입니다.',
    emrSystems: [
      {
        name: '비트컴퓨터',
        desc: '국내 대표 EMR 시스템',
        status: '개발 중',
        features: ['API 연동 개발 예정', 'SOAP 포맷 호환', '협의 진행 중'],
      },
      {
        name: '유비케어',
        desc: '클라우드 EMR 솔루션',
        status: '개발 중',
        features: ['API 연동 개발 예정', '데이터 매핑 준비 중', '협의 진행 중'],
      },
      {
        name: '이지케어텍',
        desc: '중소병원 EMR',
        status: '개발 중',
        features: ['표준 포맷 지원 예정', '연동 협의 가능', '맞춤 개발 검토'],
      },
      {
        name: '기타 EMR',
        desc: '의원급 EMR 시스템',
        status: '협의 가능',
        features: ['요청 시 연동 검토', '파트너십 문의 환영'],
      },
      {
        name: '클립보드 연동',
        desc: '모든 EMR 지원',
        status: '현재 사용 가능',
        features: ['원클릭 복사', '모든 EMR 호환', '추가 설정 불필요'],
      },
    ],
    benefits: [
      { icon: SpeedIcon, title: '시간 절약 (예정)', desc: 'API 연동 시 원클릭으로 차트 전송' },
      { icon: SecurityIcon, title: '안전한 전송', desc: '암호화된 연결로 데이터 보호' },
      { icon: CloudSyncIcon, title: '표준 포맷', desc: 'SOAP 등 의료 표준 포맷 지원' },
      { icon: SettingsIcon, title: '유연한 연동 (예정)', desc: 'REST API를 통한 맞춤형 연동' },
    ],
    howItWorks: '연동 프로세스',
    steps: [
      { step: '1', title: '연동 문의', desc: '사용 중인 EMR 시스템을 알려주세요.' },
      { step: '2', title: '기술 검토', desc: '연동 가능성과 방법을 검토합니다.' },
      { step: '3', title: '연동 개발', desc: '맞춤형 연동 솔루션을 개발합니다.' },
      { step: '4', title: '테스트 및 배포', desc: '안정적인 연동을 검증합니다.' },
    ],
    contactTitle: 'EMR 연동 파트너십',
    contactDesc: 'EMR 시스템 연동에 관심이 있으시면 연락해 주세요. 함께 더 나은 의료 환경을 만들어 갈 파트너를 찾고 있습니다.',
    contactButton: '파트너십 문의',
    email: 'chartsok.health@gmail.com',
    customTitle: 'API 기반 연동 (개발 중)',
    customDesc: '자체 EMR 시스템을 운영하시나요? REST API 기반 직접 연동을 준비하고 있습니다. 베타 테스트에 관심 있으시면 문의해주세요.',
    customButton: '문의하기',
  },
  en: {
    badge: 'EMR Integration (In Development)',
    title: 'EMR Integration Coming Soon',
    subtitle: 'chartsok is preparing integration with various EMR systems. Currently, clipboard copy works with all EMRs, and API-based direct integration is under development.',
    emrSystems: [
      {
        name: 'BitComputer',
        desc: 'Leading EMR system in Korea',
        status: 'In Development',
        features: ['API integration planned', 'SOAP format compatible', 'In discussion'],
      },
      {
        name: 'Ubicare',
        desc: 'Cloud EMR solution',
        status: 'In Development',
        features: ['API integration planned', 'Data mapping in progress', 'In discussion'],
      },
      {
        name: 'EzcareTech',
        desc: 'Hospital EMR',
        status: 'In Development',
        features: ['Standard format support planned', 'Integration available', 'Custom development review'],
      },
      {
        name: 'Other EMR',
        desc: 'Clinic EMR systems',
        status: 'Open to Discussion',
        features: ['Integration review on request', 'Partnership inquiries welcome'],
      },
      {
        name: 'Clipboard Integration',
        desc: 'Works with all EMRs',
        status: 'Available Now',
        features: ['One-click copy', 'All EMR compatible', 'No setup required'],
      },
    ],
    benefits: [
      { icon: SpeedIcon, title: 'Save Time (Planned)', desc: 'One-click chart transfer via API' },
      { icon: SecurityIcon, title: 'Secure Transfer', desc: 'Data protection via encrypted connection' },
      { icon: CloudSyncIcon, title: 'Standard Format', desc: 'Support for SOAP and medical standard formats' },
      { icon: SettingsIcon, title: 'Flexible Integration (Planned)', desc: 'Custom integration via REST API' },
    ],
    howItWorks: 'Integration Process',
    steps: [
      { step: '1', title: 'Contact Us', desc: 'Tell us about your EMR system.' },
      { step: '2', title: 'Technical Review', desc: 'We assess integration feasibility.' },
      { step: '3', title: 'Development', desc: 'Custom integration solution developed.' },
      { step: '4', title: 'Test & Deploy', desc: 'Verify stable integration.' },
    ],
    contactTitle: 'EMR Integration Partnership',
    contactDesc: 'Interested in EMR integration? Contact us. We are looking for partners to build a better healthcare environment together.',
    contactButton: 'Partnership Inquiry',
    email: 'chartsok.health@gmail.com',
    customTitle: 'API-Based Integration (In Development)',
    customDesc: 'Running your own EMR system? We are preparing REST API-based direct integration. Contact us if interested in beta testing.',
    customButton: 'Contact Us',
  },
};

export default function IntegrationsPage() {
  const { locale } = useI18n();
  const t = content[locale] || content.ko;

  return (
    <>
      <Header />
      <Box sx={{ bgcolor: '#FAFBFC', minHeight: '100vh' }}>
        {/* Hero */}
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
              sx={{ textAlign: 'center', maxWidth: 700, mx: 'auto' }}
            >
              <Chip label={t.badge} sx={{ mb: 3, bgcolor: 'primary.main', color: 'white', fontWeight: 600 }} />
              <Typography variant="h2" sx={{ fontWeight: 800, color: 'secondary.main', mb: 3, fontSize: { xs: '2rem', md: '3rem' } }}>
                {t.title}
              </Typography>
              <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 400, lineHeight: 1.8 }}>
                {t.subtitle}
              </Typography>
            </MotionBox>
          </Container>
        </Box>

        {/* EMR Systems */}
        <Container maxWidth="xl" sx={{ py: { xs: 6, md: 8 } }}>
          <Grid container spacing={3}>
            {t.emrSystems.map((emr, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card elevation={0} sx={{ p: 3, height: '100%', border: '1px solid', borderColor: 'grey.200', borderRadius: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <IntegrationInstructionsIcon sx={{ color: 'primary.main' }} />
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>{emr.name}</Typography>
                      </Box>
                      <Chip
                        label={emr.status}
                        size="small"
                        sx={{
                          bgcolor: emr.status.includes('지원') || emr.status === 'Supported' || emr.status === 'API Available' || emr.status === 'API 제공' ? '#10B98115' : '#F59E0B15',
                          color: emr.status.includes('지원') || emr.status === 'Supported' || emr.status === 'API Available' || emr.status === 'API 제공' ? '#10B981' : '#F59E0B',
                          fontWeight: 600,
                          fontSize: '0.7rem',
                        }}
                      />
                    </Box>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>{emr.desc}</Typography>
                    <List dense>
                      {emr.features.map((feature, i) => (
                        <ListItem key={i} disableGutters sx={{ py: 0.25 }}>
                          <ListItemIcon sx={{ minWidth: 28 }}>
                            <CheckCircleIcon sx={{ fontSize: 16, color: 'primary.main' }} />
                          </ListItemIcon>
                          <ListItemText
                            primary={feature}
                            primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Card>
                </MotionBox>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Benefits */}
        <Box sx={{ bgcolor: 'white', py: { xs: 6, md: 8 } }}>
          <Container maxWidth="xl">
            <Grid container spacing={3}>
              {t.benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <Grid size={{ xs: 6, md: 3 }} key={index}>
                    <Card elevation={0} sx={{ p: 3, height: '100%', textAlign: 'center', border: '1px solid', borderColor: 'grey.200', borderRadius: 3 }}>
                      <Icon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>{benefit.title}</Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>{benefit.desc}</Typography>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Container>
        </Box>

        {/* How It Works */}
        <Container maxWidth="xl" sx={{ py: { xs: 6, md: 8 } }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: 'secondary.main', mb: 5, textAlign: 'center' }}>
            {t.howItWorks}
          </Typography>
          <Grid container spacing={3}>
            {t.steps.map((step, index) => (
              <Grid size={{ xs: 6, md: 3 }} key={index}>
                <Card elevation={0} sx={{ p: 3, height: '100%', textAlign: 'center', border: '1px solid', borderColor: 'grey.200', borderRadius: 3 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      bgcolor: 'primary.main',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2,
                      fontWeight: 700,
                      fontSize: '1.25rem',
                    }}
                  >
                    {step.step}
                  </Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>{step.title}</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>{step.desc}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Contact CTA */}
        <Container maxWidth="xl" sx={{ py: { xs: 6, md: 8 } }}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  background: 'linear-gradient(135deg, #4B9CD3 0%, #3A7BA8 100%)',
                  borderRadius: 3,
                  color: 'white',
                }}
              >
                <SupportAgentIcon sx={{ fontSize: 40, mb: 2 }} />
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>{t.contactTitle}</Typography>
                <Typography variant="body2" sx={{ mb: 3, opacity: 0.9 }}>{t.contactDesc}</Typography>
                <Button
                  variant="outlined"
                  startIcon={<EmailIcon />}
                  href={`mailto:${t.email}`}
                  sx={{ color: 'white', borderColor: 'white', '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' } }}
                >
                  {t.contactButton}
                </Button>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  border: '1px solid',
                  borderColor: 'grey.200',
                  borderRadius: 3,
                }}
              >
                <SyncIcon sx={{ fontSize: 40, mb: 2, color: 'primary.main' }} />
                <Typography variant="h5" sx={{ fontWeight: 700, color: 'secondary.main', mb: 2 }}>{t.customTitle}</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>{t.customDesc}</Typography>
                <Button variant="outlined" href="/contact" sx={{ borderRadius: 2 }}>
                  {t.customButton}
                </Button>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  );
}
