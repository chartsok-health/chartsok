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
  InputAdornment,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from '@mui/material';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import SettingsIcon from '@mui/icons-material/Settings';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import SecurityIcon from '@mui/icons-material/Security';
import EmailIcon from '@mui/icons-material/Email';
import { useI18n } from '@/lib/i18n';

const MotionBox = motion.create(Box);

const content = {
  ko: {
    badge: '도움말 센터',
    title: '무엇을 도와드릴까요?',
    subtitle: 'ChartSok 사용에 필요한 모든 정보를 찾아보세요.',
    search: '질문이나 키워드를 검색하세요...',
    categories: [
      { icon: RocketLaunchIcon, title: '시작하기', desc: '처음 사용자를 위한 가이드', count: 8, color: '#4B9CD3' },
      { icon: PlayCircleOutlineIcon, title: '녹음 & 차트', desc: '진료 녹음 및 차트 생성', count: 12, color: '#10B981' },
      { icon: IntegrationInstructionsIcon, title: 'EMR 연동', desc: 'EMR 시스템 연동 방법', count: 6, color: '#F59E0B' },
      { icon: SettingsIcon, title: '설정', desc: '계정 및 환경 설정', count: 10, color: '#8B5CF6' },
      { icon: SecurityIcon, title: '보안 & 개인정보', desc: '데이터 보호 정책', count: 5, color: '#EF4444' },
      { icon: SupportAgentIcon, title: '문제 해결', desc: '일반적인 문제 해결 방법', count: 15, color: '#64748B' },
    ],
    faqTitle: '자주 묻는 질문',
    faqs: [
      {
        q: 'ChartSok은 어떤 EMR 시스템과 연동되나요?',
        a: '국내 주요 EMR 시스템과의 연동을 준비하고 있습니다. REST API 직접 연동 또는 클립보드 복사 방식 모두 지원합니다. 사용하시는 EMR과의 연동 문의는 언제든 환영합니다.',
      },
      {
        q: '환자 정보는 안전하게 보호되나요?',
        a: '네, ChartSok은 개인정보보호법, 의료법 등 국내 규정을 준수합니다. 모든 데이터는 AES-256 암호화로 보호되며, 안전한 클라우드 인프라에서 운영됩니다.',
      },
      {
        q: '녹음 파일은 어떻게 처리되나요?',
        a: '녹음 파일은 텍스트 변환 후 서버에서 즉시 삭제됩니다. 암호화된 텍스트 기록만 저장되며, 원하시면 텍스트 기록도 삭제할 수 있습니다.',
      },
      {
        q: '환자 녹음 동의는 어떻게 받나요?',
        a: '앱 내에서 녹음 동의서를 전자 서명으로 받을 수 있습니다. 동의 기록은 타임스탬프와 함께 안전하게 저장되어 법적 요건을 충족합니다.',
      },
      {
        q: 'AI가 화자를 구분하는 정확도는 얼마나 되나요?',
        a: '현재 화자 구분 정확도는 약 95% 이상입니다. AI가 목소리 특성을 분석하여 의사와 환자를 자동으로 구분하며, 필요시 수동으로 수정할 수 있습니다.',
      },
      {
        q: '다른 전문과 AI도 추가될 예정인가요?',
        a: '네, 현재 내과, 이비인후과, 정형외과, 피부과, 소아청소년과, 정신건강의학과 AI가 제공되며, 추가 전문과 AI를 지속적으로 개발 중입니다.',
      },
      {
        q: '무료 체험 기간 동안 모든 기능을 사용할 수 있나요?',
        a: '네, 14일 무료 체험 기간 동안 선택한 플랜의 모든 기능을 제한 없이 사용하실 수 있습니다. 신용카드 없이 시작할 수 있습니다.',
      },
      {
        q: '기존 환자 데이터를 가져올 수 있나요?',
        a: '네, EMR 연동을 통해 기존 환자 목록을 자동으로 동기화할 수 있습니다. 과거 진료 기록도 참조하여 더 정확한 차트를 생성합니다.',
      },
    ],
    contactTitle: '원하는 답을 찾지 못하셨나요?',
    contactDesc: '직접 문의하시면 빠르게 도움을 드리겠습니다.',
    contactButton: '문의하기',
    email: 'chartsok.health@gmail.com',
  },
  en: {
    badge: 'Help Center',
    title: 'How can we help you?',
    subtitle: 'Find all the information you need to use ChartSok.',
    search: 'Search questions or keywords...',
    categories: [
      { icon: RocketLaunchIcon, title: 'Getting Started', desc: 'Guide for new users', count: 8, color: '#4B9CD3' },
      { icon: PlayCircleOutlineIcon, title: 'Recording & Charts', desc: 'Recording and chart generation', count: 12, color: '#10B981' },
      { icon: IntegrationInstructionsIcon, title: 'EMR Integration', desc: 'EMR system integration', count: 6, color: '#F59E0B' },
      { icon: SettingsIcon, title: 'Settings', desc: 'Account and preferences', count: 10, color: '#8B5CF6' },
      { icon: SecurityIcon, title: 'Security & Privacy', desc: 'Data protection policies', count: 5, color: '#EF4444' },
      { icon: SupportAgentIcon, title: 'Troubleshooting', desc: 'Common problem solutions', count: 15, color: '#64748B' },
    ],
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      {
        q: 'Which EMR systems does ChartSok integrate with?',
        a: 'We are preparing integration with major Korean EMR systems. Both REST API direct integration and clipboard copy methods are supported. Contact us for EMR integration inquiries.',
      },
      {
        q: 'Is patient data secure?',
        a: 'Yes, ChartSok complies with Korean privacy regulations including PIPA and Medical Service Act. All data is protected with AES-256 encryption and operated from secure cloud infrastructure.',
      },
      {
        q: 'How are recordings handled?',
        a: 'Audio files are deleted immediately after text conversion. Only encrypted text records are stored, and you can delete text records as well if desired.',
      },
      {
        q: 'How is patient recording consent obtained?',
        a: 'Recording consent can be obtained via electronic signature in the app. Consent records are securely stored with timestamps to meet legal requirements.',
      },
      {
        q: 'How accurate is AI speaker identification?',
        a: 'Current speaker identification accuracy is over 95%. AI analyzes voice characteristics to automatically distinguish doctor and patient, and manual correction is possible if needed.',
      },
      {
        q: 'Will more specialty AIs be added?',
        a: 'Yes, we currently offer Internal Medicine, ENT, Orthopedics, Dermatology, Pediatrics, and Psychiatry AIs, with more specialty AIs in development.',
      },
      {
        q: 'Can I use all features during the free trial?',
        a: 'Yes, during the 14-day free trial, you can use all features of your selected plan without restrictions. No credit card required to start.',
      },
      {
        q: 'Can I import existing patient data?',
        a: 'Yes, through EMR integration you can automatically sync your existing patient list. Past records are also referenced to generate more accurate charts.',
      },
    ],
    contactTitle: 'Didn\'t find your answer?',
    contactDesc: 'Contact us directly and we\'ll help you quickly.',
    contactButton: 'Contact Us',
    email: 'chartsok.health@gmail.com',
  },
};

export default function HelpPage() {
  const { locale } = useI18n();
  const t = content[locale] || content.ko;
  const [expanded, setExpanded] = useState(false);

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
              <Typography variant="h6" sx={{ color: 'text.secondary', mb: 4, fontWeight: 400 }}>
                {t.subtitle}
              </Typography>
              <TextField
                placeholder={t.search}
                fullWidth
                sx={{ maxWidth: 500, bgcolor: 'white', borderRadius: 2 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: 'grey.400' }} />
                    </InputAdornment>
                  ),
                  sx: { borderRadius: 2 },
                }}
              />
            </MotionBox>
          </Container>
        </Box>

        {/* Categories */}
        <Container maxWidth="xl" sx={{ py: { xs: 6, md: 8 } }}>
          <Grid container spacing={3}>
            {t.categories.map((cat, index) => {
              const Icon = cat.icon;
              return (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                  <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -4 }}
                  >
                    <Card
                      elevation={0}
                      sx={{
                        p: 3,
                        height: '100%',
                        border: '1px solid',
                        borderColor: 'grey.200',
                        borderRadius: 3,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        '&:hover': { borderColor: cat.color },
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                        <Box
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: 2,
                            bgcolor: `${cat.color}15`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Icon sx={{ color: cat.color }} />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
                            {cat.title}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                            {cat.desc}
                          </Typography>
                          <Chip
                            label={`${cat.count} ${locale === 'ko' ? '문서' : 'articles'}`}
                            size="small"
                            sx={{ bgcolor: 'grey.100', fontSize: '0.7rem' }}
                          />
                        </Box>
                      </Box>
                    </Card>
                  </MotionBox>
                </Grid>
              );
            })}
          </Grid>
        </Container>

        {/* FAQ */}
        <Box sx={{ bgcolor: 'white', py: { xs: 6, md: 8 } }}>
          <Container maxWidth="xl">
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, color: 'secondary.main', mb: 4, textAlign: 'center' }}
            >
              {t.faqTitle}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {t.faqs.map((faq, index) => (
                <Accordion
                  key={index}
                  expanded={expanded === index}
                  onChange={() => setExpanded(expanded === index ? false : index)}
                  elevation={0}
                  sx={{
                    border: '1px solid',
                    borderColor: 'grey.200',
                    borderRadius: '12px !important',
                    '&:before': { display: 'none' },
                    mb: 1,
                  }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography sx={{ fontWeight: 600 }}>{faq.q}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                      {faq.a}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
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
              background: 'linear-gradient(135deg, #4B9CD3 0%, #3A7BA8 100%)',
              borderRadius: 4,
              color: 'white',
            }}
          >
            <SupportAgentIcon sx={{ fontSize: 48, mb: 2, opacity: 0.9 }} />
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>{t.contactTitle}</Typography>
            <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>{t.contactDesc}</Typography>
            <Button
              variant="outlined"
              size="large"
              startIcon={<EmailIcon />}
              href={`mailto:${t.email}`}
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
