'use client';

import Link from 'next/link';
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
import CodeIcon from '@mui/icons-material/Code';
import ApiIcon from '@mui/icons-material/Api';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import SecurityIcon from '@mui/icons-material/Security';
import WebhookIcon from '@mui/icons-material/Webhook';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmailIcon from '@mui/icons-material/Email';
import { useI18n } from '@/lib/i18n';

const MotionBox = motion.create(Box);

const content = {
  ko: {
    badge: '개발자 문서',
    title: 'chartsok API',
    subtitle: 'chartsok의 강력한 API로 자체 시스템과 연동하세요. RESTful API와 Webhook을 지원합니다.',
    sections: [
      {
        icon: ApiIcon,
        title: 'REST API',
        desc: 'RESTful 아키텍처 기반의 직관적인 API',
        items: ['환자 정보 조회/등록', '차트 데이터 CRUD', '녹음 파일 업로드', '실시간 상태 조회'],
        color: '#4B9CD3',
      },
      {
        icon: WebhookIcon,
        title: 'Webhooks',
        desc: '실시간 이벤트 알림 수신',
        items: ['차트 생성 완료', '녹음 처리 완료', 'EMR 전송 결과', '시스템 알림'],
        color: '#10B981',
      },
      {
        icon: IntegrationInstructionsIcon,
        title: 'EMR 연동',
        desc: '주요 EMR 시스템 연동 가이드',
        items: ['비트컴퓨터 연동', '유비케어 연동', '커스텀 EMR 연동', '연동 테스트 도구'],
        color: '#F59E0B',
      },
      {
        icon: SecurityIcon,
        title: '인증 & 보안',
        desc: 'OAuth 2.0 기반 보안 인증',
        items: ['API 키 관리', 'OAuth 2.0 인증', 'IP 화이트리스트', '요청 서명'],
        color: '#8B5CF6',
      },
    ],
    quickStart: 'Quick Start',
    quickStartDesc: '몇 분 안에 chartsok API를 시작하세요.',
    steps: [
      { step: '1', title: 'API 키 발급', desc: '개발자 콘솔에서 API 키를 발급받습니다.' },
      { step: '2', title: '인증 설정', desc: 'API 키를 헤더에 포함하여 인증합니다.' },
      { step: '3', title: 'API 호출', desc: 'REST API를 호출하여 기능을 사용합니다.' },
    ],
    codeExample: '코드 예제',
    sdks: 'SDK & 라이브러리',
    sdkList: ['JavaScript/TypeScript', 'Python', 'Java', 'PHP'],
    contactTitle: 'API 연동 지원이 필요하신가요?',
    contactDesc: '엔터프라이즈 고객을 위한 전담 기술 지원을 제공합니다.',
    contactButton: '기술 지원 문의',
    email: 'chartsok.health@gmail.com',
    comingSoon: 'API 문서 준비 중',
    comingSoonDesc: '상세 API 문서가 곧 공개됩니다. 미리 연동을 준비하시려면 문의해 주세요.',
  },
  en: {
    badge: 'Docs',
    title: 'chartsok API',
    subtitle: 'RESTful API and Webhooks for integration.',
    sections: [
      {
        icon: ApiIcon,
        title: 'REST API',
        desc: 'RESTful architecture',
        items: ['Patient CRUD', 'Chart CRUD', 'Audio upload', 'Real-time status'],
        color: '#4B9CD3',
      },
      {
        icon: WebhookIcon,
        title: 'Webhooks',
        desc: 'Real-time events',
        items: ['Chart done', 'Recording done', 'EMR result', 'Alerts'],
        color: '#10B981',
      },
      {
        icon: IntegrationInstructionsIcon,
        title: 'EMR Integration',
        desc: 'Integration guides',
        items: ['BitComputer', 'Ubicare', 'Custom EMR', 'Testing tools'],
        color: '#F59E0B',
      },
      {
        icon: SecurityIcon,
        title: 'Auth & Security',
        desc: 'OAuth 2.0 auth',
        items: ['API keys', 'OAuth 2.0', 'IP whitelist', 'Request signing'],
        color: '#8B5CF6',
      },
    ],
    quickStart: 'Quick Start',
    quickStartDesc: 'Get started in minutes.',
    steps: [
      { step: '1', title: 'Get API Key', desc: 'Generate from dev console.' },
      { step: '2', title: 'Set Auth', desc: 'Add API key to headers.' },
      { step: '3', title: 'Call API', desc: 'Use REST endpoints.' },
    ],
    codeExample: 'Code Example',
    sdks: 'SDKs',
    sdkList: ['JS/TS', 'Python', 'Java', 'PHP'],
    contactTitle: 'Need integration help?',
    contactDesc: 'Dedicated support for enterprise.',
    contactButton: 'Contact',
    email: 'chartsok.health@gmail.com',
    comingSoon: 'Docs Coming Soon',
    comingSoonDesc: 'Full API docs available soon. Contact us to prepare early.',
  },
};

export default function DocsPage() {
  const { locale } = useI18n();
  const t = content[locale] || content.ko;

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
          <Container maxWidth="xl">
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              sx={{ textAlign: 'center', maxWidth: 700, mx: 'auto' }}
            >
              <Chip label={t.badge} sx={{ mb: 3, bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 600 }} />
              <Typography variant="h2" sx={{ fontWeight: 800, mb: 3, fontSize: { xs: '2rem', md: '3rem' } }}>
                {t.title}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 400, lineHeight: 1.8, opacity: 0.9 }}>
                {t.subtitle}
              </Typography>
            </MotionBox>
          </Container>
        </Box>

        {/* API Sections */}
        <Container maxWidth="xl" sx={{ py: { xs: 6, md: 8 } }}>
          <Grid container spacing={3}>
            {t.sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                  <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card
                      elevation={0}
                      sx={{ p: 3, height: '100%', border: '1px solid', borderColor: 'grey.200', borderRadius: 3 }}
                    >
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 2,
                          bgcolor: `${section.color}15`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 2,
                        }}
                      >
                        <Icon sx={{ color: section.color }} />
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>{section.title}</Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>{section.desc}</Typography>
                      <List dense>
                        {section.items.map((item, i) => (
                          <ListItem key={i} disableGutters sx={{ py: 0.25 }}>
                            <ListItemIcon sx={{ minWidth: 28 }}>
                              <CheckCircleIcon sx={{ fontSize: 16, color: section.color }} />
                            </ListItemIcon>
                            <ListItemText
                              primary={item}
                              primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Card>
                  </MotionBox>
                </Grid>
              );
            })}
          </Grid>
        </Container>

        {/* Quick Start */}
        <Box sx={{ bgcolor: 'white', py: { xs: 6, md: 8 } }}>
          <Container maxWidth="xl">
            <Typography variant="h4" sx={{ fontWeight: 700, color: 'secondary.main', mb: 2, textAlign: 'center' }}>
              {t.quickStart}
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 5, textAlign: 'center' }}>
              {t.quickStartDesc}
            </Typography>
            <Grid container spacing={3}>
              {t.steps.map((step, index) => (
                <Grid size={{ xs: 12, md: 4 }} key={index}>
                  <Card
                    elevation={0}
                    sx={{ p: 3, textAlign: 'center', border: '1px solid', borderColor: 'grey.200', borderRadius: 3 }}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 2,
                        fontWeight: 700,
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
        </Box>

        {/* Code Example */}
        <Container maxWidth="xl" sx={{ py: { xs: 6, md: 8 } }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: 'secondary.main', mb: 3 }}>
            {t.codeExample}
          </Typography>
          <Card
            elevation={0}
            sx={{
              p: 3,
              bgcolor: '#1E293B',
              borderRadius: 3,
              fontFamily: 'monospace',
              overflow: 'auto',
            }}
          >
            <Box component="pre" sx={{ m: 0, color: '#E2E8F0', fontSize: '0.875rem', lineHeight: 1.8 }}>
{`// chartsok API Example
const response = await fetch('https://api.chartsok.com/v1/charts', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    patient_id: 'P-2024-001',
    audio_url: 'https://...',
    specialty: 'internal_medicine'
  })
});

const chart = await response.json();
console.log(chart.soap); // { subjective, objective, assessment, plan }`}
            </Box>
          </Card>
        </Container>

        {/* SDKs */}
        <Box sx={{ bgcolor: 'white', py: { xs: 4, md: 6 } }}>
          <Container maxWidth="xl">
            <Typography variant="h5" sx={{ fontWeight: 700, color: 'secondary.main', mb: 3, textAlign: 'center' }}>
              {t.sdks}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
              {t.sdkList.map((sdk) => (
                <Chip
                  key={sdk}
                  icon={<CodeIcon />}
                  label={sdk}
                  sx={{ bgcolor: 'grey.100', fontWeight: 500 }}
                />
              ))}
            </Box>
          </Container>
        </Box>

        {/* Contact CTA */}
        <Container maxWidth="xl" sx={{ py: { xs: 6, md: 8 } }}>
          <Card
            elevation={0}
            sx={{
              p: { xs: 4, md: 6 },
              textAlign: 'center',
              background: 'linear-gradient(135deg, #1E3A5F 0%, #2D4A6F 100%)',
              borderRadius: 4,
              color: 'white',
            }}
          >
            <CodeIcon sx={{ fontSize: 48, mb: 2, opacity: 0.9 }} />
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>{t.contactTitle}</Typography>
            <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>{t.contactDesc}</Typography>
            <Button
              component={Link}
              variant="outlined"
              size="large"
              startIcon={<EmailIcon />}
              href="/contact"
              sx={{ color: 'white', borderColor: 'white', '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' } }}
            >
              {t.contactButton}
            </Button>
          </Card>
        </Container>
      </Box>
      <Footer />
    </>
  );
}
