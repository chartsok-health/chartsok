'use client';

import { useState } from 'react';
import Link from 'next/link';
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
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import { useI18n } from '@/lib/i18n';
import { getArticlesByCategory } from '@/lib/helpArticles';

const MotionBox = motion.create(Box);

const content = {
  ko: {
    badge: '도움말 센터',
    title: '무엇을 도와드릴까요?',
    subtitle: 'chartsok 사용에 필요한 모든 정보를 찾아보세요.',
    search: '질문이나 키워드를 검색하세요...',
    categories: [
      { icon: RocketLaunchIcon, title: '시작하기', desc: '처음 사용자를 위한 가이드', slug: 'getting-started', color: '#4B9CD3' },
      { icon: PlayCircleOutlineIcon, title: '녹음 & 차트', desc: '진료 녹음 및 차트 생성', slug: 'recording-charts', color: '#10B981' },
      { icon: IntegrationInstructionsIcon, title: 'EMR 연동', desc: 'EMR 시스템 연동 (개발 중)', slug: 'emr-integration', color: '#F59E0B' },
      { icon: SettingsIcon, title: '설정', desc: '계정 및 환경 설정', slug: 'settings', color: '#8B5CF6' },
      { icon: SecurityIcon, title: '보안 & 개인정보', desc: '데이터 보호 정책', slug: 'security-privacy', color: '#EF4444' },
      { icon: SupportAgentIcon, title: '문제 해결', desc: '일반적인 문제 해결 방법', slug: 'troubleshooting', color: '#64748B' },
    ],
    faqTitle: '자주 묻는 질문',
    faqs: [
      {
        q: '녹음 파일은 어떻게 처리되나요?',
        a: '녹음된 음성 파일은 텍스트 변환이 완료되는 즉시 서버에서 삭제됩니다. 음성 파일은 별도로 저장하거나 보관하지 않습니다. 이것이 chartsok의 핵심 정책입니다.',
      },
      {
        q: '텍스트 기록 보관 기간은 어떻게 설정하나요?',
        a: '변환된 텍스트 기록의 보관 기간을 직접 설정할 수 있습니다. 즉시 삭제, 7일, 30일 중 병원 정책에 맞게 선택하세요. 설정한 기간이 지나면 자동으로 삭제되며, 수동 삭제도 가능합니다.',
      },
      {
        q: 'EMR에 어떻게 입력하나요?',
        a: '생성된 차트를 클립보드에 복사하여 사용 중인 EMR에 붙여넣기하면 됩니다. 전체 차트 복사 외에 개별 필드(주호소, 현병력 등)만 복사하는 것도 가능합니다. 모든 EMR과 호환됩니다.',
      },
      {
        q: '템플릿을 EMR 필드에 맞게 설정할 수 있나요?',
        a: '네, 템플릿 설정에서 출력 섹션을 EMR 입력 필드에 맞게 자유롭게 구성할 수 있습니다. 주호소, 현병력, 과거력, 신체검진 등 원하는 섹션을 설정하면 해당 형식으로 차트가 생성됩니다.',
      },
      {
        q: '전문과별 템플릿은 어떻게 다른가요?',
        a: '전문과별로 자주 사용하는 섹션과 형식이 기본 설정되어 있습니다. 내과는 만성질환 관리, 이비인후과는 청력검사/내시경 소견, 정형외과는 영상 소견 등 진료과 특성에 맞는 구조로 제공됩니다. 직접 수정도 가능합니다.',
      },
      {
        q: '음성 인식 정확도는 얼마나 되나요?',
        a: '의학 용어를 포함한 음성 인식 정확도는 약 95% 이상입니다. 의사와 환자 목소리도 자동으로 구분하며, 필요시 수정할 수 있습니다.',
      },
      {
        q: '환자 녹음 동의는 어떻게 받나요?',
        a: '녹음 시작 전 환자 동의를 받아야 합니다. 앱 내에서 전자 동의서를 받을 수 있으며, 동의 기록은 타임스탬프와 함께 저장됩니다.',
      },
      {
        q: '개인정보보호 규정을 준수하나요?',
        a: '네, chartsok은 개인정보보호법, 의료법 등 국내 규정을 준수합니다. 모든 데이터는 AES-256 암호화로 저장되고, 전송 시에도 TLS 1.3으로 보호됩니다.',
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
    subtitle: 'Find all the information you need to use chartsok.',
    search: 'Search questions or keywords...',
    categories: [
      { icon: RocketLaunchIcon, title: 'Getting Started', desc: 'Guide for new users', slug: 'getting-started', color: '#4B9CD3' },
      { icon: PlayCircleOutlineIcon, title: 'Recording & Charts', desc: 'Recording and chart generation', slug: 'recording-charts', color: '#10B981' },
      { icon: IntegrationInstructionsIcon, title: 'EMR Integration', desc: 'EMR integration (Coming Soon)', slug: 'emr-integration', color: '#F59E0B' },
      { icon: SettingsIcon, title: 'Settings', desc: 'Account and preferences', slug: 'settings', color: '#8B5CF6' },
      { icon: SecurityIcon, title: 'Security & Privacy', desc: 'Data protection policies', slug: 'security-privacy', color: '#EF4444' },
      { icon: SupportAgentIcon, title: 'Troubleshooting', desc: 'Common problem solutions', slug: 'troubleshooting', color: '#64748B' },
    ],
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      {
        q: 'How are audio recordings handled?',
        a: 'Audio files are deleted from our servers immediately after transcription is complete. We do not store or retain audio files. This is a core policy of chartsok.',
      },
      {
        q: 'How do I set text retention period?',
        a: 'You can configure how long transcribed text is retained. Choose from immediate deletion, 7 days, or 30 days based on your practice policy. Text is automatically deleted after the selected period, and manual deletion is also available.',
      },
      {
        q: 'How do I enter charts into my EMR?',
        a: 'Copy the generated chart to your clipboard and paste it into your EMR. You can copy the entire chart or individual fields (chief complaint, history, etc.) separately. Works with all EMRs.',
      },
      {
        q: 'Can I configure templates to match my EMR fields?',
        a: 'Yes, you can freely configure output sections to match your EMR input fields in template settings. Set up sections like chief complaint, history, physical exam, and charts will be generated in that format.',
      },
      {
        q: 'How do specialty templates differ?',
        a: 'Each specialty has pre-configured sections and formats. Internal medicine focuses on chronic disease management, ENT on audiometry/endoscopy findings, orthopedics on imaging findings, etc. You can customize them as needed.',
      },
      {
        q: 'How accurate is speech recognition?',
        a: 'Speech recognition accuracy, including medical terminology, is over 95%. Doctor and patient voices are automatically distinguished, and you can make corrections if needed.',
      },
      {
        q: 'How is patient consent for recording obtained?',
        a: 'Patient consent should be obtained before recording. Electronic consent can be collected in the app, with consent records stored with timestamps.',
      },
      {
        q: 'Do you comply with privacy regulations?',
        a: 'Yes, chartsok complies with Korean privacy regulations including PIPA and the Medical Service Act. All data is stored with AES-256 encryption and protected with TLS 1.3 during transit.',
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
              const articleCount = getArticlesByCategory(cat.slug).length;
              return (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                  <Link href={`/help/${cat.slug}`} style={{ textDecoration: 'none' }}>
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
                              label={`${articleCount} ${locale === 'ko' ? '문서' : 'articles'}`}
                              size="small"
                              sx={{ bgcolor: 'grey.100', fontSize: '0.7rem' }}
                            />
                          </Box>
                        </Box>
                      </Card>
                    </MotionBox>
                  </Link>
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
              component={Link}
              variant="outlined"
              size="large"
              startIcon={<ContactSupportIcon />}
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
