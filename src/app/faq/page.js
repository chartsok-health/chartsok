'use client';

import {
  Box,
  Container,
  Typography,
  Chip,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useI18n } from '@/lib/i18n';

const MotionBox = motion.create(Box);

const content = {
  ko: {
    badge: 'FAQ',
    title: '자주 묻는 질문',
    subtitle: 'Chartsok에 대해 궁금한 점을 확인하세요.',
    faqs: [
      {
        q: 'Chartsok은 EMR인가요?',
        a: '아니요. Chartsok은 EMR을 대체하지 않습니다. 진료 요약과 후속관리 자동화에 집중한 업무툴입니다.',
      },
      {
        q: '진료 녹음은 꼭 해야 하나요?',
        a: '아닙니다. 병원 환경에 따라 선택적으로 사용할 수 있도록 설계합니다.',
      },
      {
        q: '요약본은 어떤 형태로 나오나요?',
        a: '진료 핵심 요약 / 의사용 정리 / 환자 안내문 형태로 깔끔하게 생성됩니다.',
      },
      {
        q: '환자 안내문은 어떻게 활용하나요?',
        a: '진료 후 환자에게 전달할 내용을 정리해 누락을 줄이고 이해도를 높입니다.',
      },
      {
        q: '후속관리(Actions)는 어떤 기능인가요?',
        a: '재내원/리콜/추적관리 같은 다음 업무를 자동으로 정리하고 실행 가능한 형태로 만들어줍니다.',
      },
      {
        q: '우리 병원에서도 바로 쓸 수 있나요?',
        a: '네. 현재는 PoC / 파일럿 형태로 병원에 맞춰 적용하는 방식으로 진행합니다.',
      },
      {
        q: '데이터 보안은 어떻게 하나요?',
        a: '최소 수집, 권한 기반 접근, 암호화, 기록(Log) 기반 설계를 기본 원칙으로 합니다.',
      },
      {
        q: '가격은 어떻게 되나요?',
        a: '병원 규모와 사용 범위(PoC/정식 도입)에 따라 달라질 수 있어 데모 후 안내드립니다.',
      },
      {
        q: '어떤 병원에 가장 잘 맞나요?',
        a: '외래 환자가 많고, follow-up / 재내원 관리가 중요한 병원에 특히 잘 맞습니다.',
      },
    ],
    ctaTitle: '더 궁금한 점이 있으신가요?',
    ctaSubtitle: '언제든 편하게 문의해 주세요. 빠르게 답변드리겠습니다.',
    ctaButton: '문의하기',
  },
  en: {
    badge: 'FAQ',
    title: 'Frequently Asked Questions',
    subtitle: 'Find answers to common questions about Chartsok.',
    faqs: [
      {
        q: 'Is Chartsok an EMR?',
        a: 'No. Chartsok does not replace your EMR. It is a workflow tool focused on visit summaries and follow-up automation.',
      },
      {
        q: 'Is visit recording required?',
        a: 'No. Recording is optional and can be configured based on your clinic environment.',
      },
      {
        q: 'What format do summaries come in?',
        a: 'Summaries are generated as visit highlights, provider notes, and patient instructions.',
      },
      {
        q: 'How are patient instructions used?',
        a: 'They organize post-visit information for patients, reducing missed communications and improving understanding.',
      },
      {
        q: 'What are Actions?',
        a: 'Actions automatically organize follow-up tasks like recalls, tracking, and reminders into actionable to-dos.',
      },
      {
        q: 'Can my clinic start using it right away?',
        a: 'Yes. We currently onboard clinics through PoC / pilot programs tailored to your workflow.',
      },
      {
        q: 'How is data security handled?',
        a: 'We follow principles of minimal data collection, role-based access, encryption, and audit logging.',
      },
      {
        q: 'How much does it cost?',
        a: 'Pricing depends on clinic size and scope (PoC vs. full deployment). We provide details after a demo.',
      },
      {
        q: 'Which clinics is it best suited for?',
        a: 'Clinics with high outpatient volume where follow-up and recall management are important.',
      },
    ],
    ctaTitle: 'Have more questions?',
    ctaSubtitle: 'Feel free to reach out anytime. We will get back to you quickly.',
    ctaButton: 'Contact Us',
  },
};

export default function FAQPage() {
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
              <HelpOutlineIcon sx={{ fontSize: 48, mb: 2, opacity: 0.9 }} />
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

        {/* FAQ Accordion Section */}
        <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
          {t.faqs.map((faq, index) => (
            <MotionBox
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
            >
              <Accordion
                elevation={0}
                disableGutters
                sx={{
                  borderBottom: '1px solid',
                  borderColor: 'grey.200',
                  '&:before': { display: 'none' },
                  '&.Mui-expanded': {
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'primary.main',
                    mb: 1,
                    bgcolor: 'white',
                  },
                  bgcolor: 'transparent',
                }}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMoreIcon sx={{ color: 'primary.main' }} />
                  }
                  sx={{
                    px: { xs: 2, md: 3 },
                    py: 1,
                    '& .MuiAccordionSummary-content': { my: 2 },
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 600,
                      color: 'secondary.main',
                      fontSize: { xs: '0.95rem', md: '1.05rem' },
                    }}
                  >
                    {faq.q}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: { xs: 2, md: 3 }, pb: 3 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      lineHeight: 1.8,
                      fontSize: '0.95rem',
                    }}
                  >
                    {faq.a}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </MotionBox>
          ))}
        </Container>

        {/* CTA Section */}
        <Box sx={{ bgcolor: 'white', py: { xs: 6, md: 8 } }}>
          <Container maxWidth="md">
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              sx={{
                textAlign: 'center',
                p: { xs: 4, md: 6 },
                borderRadius: 3,
                background: 'linear-gradient(135deg, #1E3A5F 0%, #2D4A6F 100%)',
                color: 'white',
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  fontSize: { xs: '1.5rem', md: '2rem' },
                }}
              >
                {t.ctaTitle}
              </Typography>
              <Typography
                variant="body1"
                sx={{ mb: 4, opacity: 0.9, lineHeight: 1.7 }}
              >
                {t.ctaSubtitle}
              </Typography>
              <Button
                variant="outlined"
                size="large"
                endIcon={<ArrowForwardIcon />}
                href="/contact"
                sx={{
                  color: 'white',
                  borderColor: 'white',
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255,255,255,0.1)',
                  },
                }}
              >
                {t.ctaButton}
              </Button>
            </MotionBox>
          </Container>
        </Box>
      </Box>
      <Footer />
    </>
  );
}
