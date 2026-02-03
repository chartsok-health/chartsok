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
import MicIcon from '@mui/icons-material/Mic';
import DescriptionIcon from '@mui/icons-material/Description';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import SyncIcon from '@mui/icons-material/Sync';
import SpeedIcon from '@mui/icons-material/Speed';
import { useI18n } from '@/lib/i18n';

const MotionBox = motion.create(Box);

const content = {
  ko: {
    badge: '핵심 기능',
    title: '진료 차트 작성, 이제 차트쏙이 합니다',
    subtitle: '녹음부터 요약, 환자 안내문, 후속 관리까지. 진료 흐름에 맞춰 자동으로 처리됩니다.',
    features: [
      {
        icon: MicIcon,
        color: '#4B9CD3',
        title: '진료 녹음 + 요약 (Scribe)',
        description: '진료 내용을 자동으로 녹음하고, AI가 구조화된 요약을 생성합니다. 의사는 환자에 집중하고, 차트 정리는 차트쏙이 처리합니다.',
        bullets: [
          '진료 내용을 자동 분류하여 정리',
          '깔끔한 요약본 즉시 생성',
          '의사용 / 직원용 버전 분리 제공',
          'SOAP 노트 포맷 지원',
          '기존 진료 워크플로에 자연스럽게 통합',
        ],
      },
      {
        icon: DescriptionIcon,
        color: '#10B981',
        title: '환자 안내문 자동 생성',
        description: '진료 내용을 바탕으로 환자가 이해하기 쉬운 안내문을 자동 생성합니다. 설명 시간을 줄이고 환자 이해도를 높입니다.',
        bullets: [
          '환자 눈높이에 맞춘 쉬운 요약 제공',
          '복약 안내 및 주의사항 상세 포함',
          '전달 누락을 최소화하는 구조화된 안내',
          '병원별 맞춤 템플릿 설정 가능',
          '인쇄 / PDF / 메시지 등 다양한 출력 형식 지원',
        ],
      },
      {
        icon: AssignmentTurnedInIcon,
        color: '#8B5CF6',
        title: '후속관리 액션 생성 (Actions)',
        description: '차트 작성 후 필요한 후속 업무를 자동으로 정리합니다. 리콜, 추적 관찰, 리마인더까지 놓치는 것 없이 관리됩니다.',
        bullets: [
          '리콜 대상 환자 자동 식별',
          '후속 조치 할 일(To-Do) 목록 자동 생성',
          '리마인더 메시지 사전 준비',
          '완료 상태 실시간 추적 관리',
          '노쇼(No-show) 감소 효과',
        ],
      },
    ],
    integrationTitle: 'EMR 옆에서 함께 작동합니다',
    integrationSubtitle: '차트쏙은 기존 EMR을 대체하지 않습니다. 옆에서 보조하며, 진료 기록 작성을 빠르고 정확하게 도와줍니다.',
    integrationSteps: [
      {
        icon: IntegrationInstructionsIcon,
        title: '간편한 연동',
        description: '별도 설치 없이 브라우저에서 바로 사용. 기존 EMR 화면 옆에서 동시 작동합니다.',
      },
      {
        icon: SyncIcon,
        title: '실시간 동기화',
        description: '진료 녹음과 동시에 텍스트 변환이 시작되어, 진료 종료 직후 요약본이 준비됩니다.',
      },
      {
        icon: SpeedIcon,
        title: '즉시 활용',
        description: '생성된 요약, 안내문, 액션 항목을 EMR에 복사하거나 바로 활용할 수 있습니다.',
      },
    ],
    ctaTitle: '차트쏙을 직접 체험해 보세요',
    ctaDescription: '도입 상담을 신청하시면, 실제 진료 환경에서 차트쏙이 어떻게 작동하는지 보여드립니다.',
    ctaButton: '데모 신청하기',
  },
  en: {
    badge: 'Core Features',
    title: 'Charting, Now Handled by ChartSok',
    subtitle: 'From recording to summaries, patient instructions, and follow-ups. Everything is processed automatically to match your clinical workflow.',
    features: [
      {
        icon: MicIcon,
        color: '#4B9CD3',
        title: 'Visit Recording + Summary (Scribe)',
        description: 'Automatically records visits and generates structured AI summaries. Providers focus on the patient while ChartSok handles the charting.',
        bullets: [
          'Auto-organizes visit content by category',
          'Generates clean summaries instantly',
          'Separate versions for providers and staff',
          'SOAP note format support',
          'Integrates seamlessly into existing workflow',
        ],
      },
      {
        icon: DescriptionIcon,
        color: '#10B981',
        title: 'Patient Instructions',
        description: 'Generates patient-friendly summaries based on the visit. Reduces explanation time and improves patient comprehension.',
        bullets: [
          'Easy-to-understand recaps for patients',
          'Medication and precaution details included',
          'Structured format minimizes missed communications',
          'Customizable templates per practice',
          'Multi-format output: print, PDF, message',
        ],
      },
      {
        icon: AssignmentTurnedInIcon,
        color: '#8B5CF6',
        title: 'Follow-up Actions',
        description: 'Automatically organizes post-chart follow-up tasks. From recalls to tracking and reminders, nothing falls through the cracks.',
        bullets: [
          'Auto-identify recall candidates',
          'Generate follow-up to-do lists',
          'Prepare reminder messages in advance',
          'Track completion status in real time',
          'Reduce no-shows effectively',
        ],
      },
    ],
    integrationTitle: 'Works Alongside Your EMR',
    integrationSubtitle: 'ChartSok does not replace your EMR. It works alongside it, helping you chart faster and more accurately.',
    integrationSteps: [
      {
        icon: IntegrationInstructionsIcon,
        title: 'Easy Integration',
        description: 'Use directly in the browser with no installation. Runs side-by-side with your existing EMR screen.',
      },
      {
        icon: SyncIcon,
        title: 'Real-time Sync',
        description: 'Transcription begins as soon as recording starts, so summaries are ready the moment the visit ends.',
      },
      {
        icon: SpeedIcon,
        title: 'Instant Use',
        description: 'Copy generated summaries, instructions, and action items directly into your EMR or use them immediately.',
      },
    ],
    ctaTitle: 'See ChartSok in Action',
    ctaDescription: 'Request a demo and we will show you how ChartSok works in a real clinical environment.',
    ctaButton: 'Request a Demo',
  },
};

export default function FeaturesPage() {
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

        {/* Feature Cards */}
        <Container maxWidth="xl" sx={{ py: { xs: 6, md: 10 } }}>
          <Grid container spacing={4}>
            {t.features.map((feature, index) => {
              const Icon = feature.icon;
              const color = feature.color;
              return (
                <Grid size={{ xs: 12, md: 4 }} key={index}>
                  <MotionBox
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ delay: index * 0.15, duration: 0.5 }}
                    sx={{ height: '100%' }}
                  >
                    <Card
                      elevation={0}
                      sx={{
                        p: 4,
                        height: '100%',
                        border: '1px solid',
                        borderColor: 'grey.200',
                        borderRadius: 3,
                        bgcolor: 'white',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                        '&:hover': {
                          borderColor: color,
                          boxShadow: `0 4px 20px ${color}15`,
                        },
                      }}
                    >
                      {/* Icon */}
                      <Box
                        sx={{
                          width: 64,
                          height: 64,
                          borderRadius: 2,
                          bgcolor: `${color}15`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 3,
                        }}
                      >
                        <Icon sx={{ fontSize: 32, color }} />
                      </Box>

                      {/* Title */}
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 700,
                          color: 'secondary.main',
                          mb: 2,
                          fontSize: { xs: '1.25rem', md: '1.4rem' },
                        }}
                      >
                        {feature.title}
                      </Typography>

                      {/* Description */}
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          mb: 3,
                          lineHeight: 1.8,
                          fontSize: '0.925rem',
                        }}
                      >
                        {feature.description}
                      </Typography>

                      {/* Bullet Points */}
                      <List dense sx={{ mt: 'auto' }}>
                        {feature.bullets.map((bullet, i) => (
                          <ListItem key={i} disableGutters sx={{ py: 0.5 }}>
                            <ListItemIcon sx={{ minWidth: 28 }}>
                              <CheckCircleIcon
                                sx={{ fontSize: 18, color }}
                              />
                            </ListItemIcon>
                            <ListItemText
                              primary={bullet}
                              primaryTypographyProps={{
                                variant: 'body2',
                                color: 'text.secondary',
                                fontSize: '0.875rem',
                                lineHeight: 1.6,
                              }}
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

        {/* How It Integrates */}
        <Box sx={{ bgcolor: 'white', py: { xs: 6, md: 10 } }}>
          <Container maxWidth="xl">
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
              sx={{ textAlign: 'center', mb: 6 }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: 'secondary.main',
                  mb: 2,
                }}
              >
                {t.integrationTitle}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  maxWidth: 600,
                  mx: 'auto',
                  lineHeight: 1.8,
                }}
              >
                {t.integrationSubtitle}
              </Typography>
            </MotionBox>

            <Grid container spacing={4}>
              {t.integrationSteps.map((step, index) => {
                const Icon = step.icon;
                const colors = ['#4B9CD3', '#10B981', '#8B5CF6'];
                const stepColor = colors[index];
                return (
                  <Grid size={{ xs: 12, md: 4 }} key={index}>
                    <MotionBox
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ delay: index * 0.15, duration: 0.5 }}
                    >
                      <Card
                        elevation={0}
                        sx={{
                          p: 4,
                          height: '100%',
                          border: '1px solid',
                          borderColor: 'grey.200',
                          borderRadius: 3,
                          textAlign: 'center',
                        }}
                      >
                        <Box
                          sx={{
                            width: 56,
                            height: 56,
                            borderRadius: '50%',
                            bgcolor: `${stepColor}15`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mx: 'auto',
                            mb: 3,
                          }}
                        >
                          <Icon sx={{ fontSize: 28, color: stepColor }} />
                        </Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            color: 'secondary.main',
                            mb: 1.5,
                          }}
                        >
                          {step.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'text.secondary',
                            lineHeight: 1.7,
                          }}
                        >
                          {step.description}
                        </Typography>
                      </Card>
                    </MotionBox>
                  </Grid>
                );
              })}
            </Grid>
          </Container>
        </Box>

        {/* CTA Section */}
        <Container maxWidth="xl" sx={{ py: { xs: 6, md: 10 } }}>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
          >
            <Card
              elevation={0}
              sx={{
                p: { xs: 4, md: 6 },
                background: 'linear-gradient(135deg, #1E3A5F 0%, #2D4A6F 100%)',
                borderRadius: 3,
                textAlign: 'center',
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
                sx={{
                  mb: 4,
                  opacity: 0.9,
                  maxWidth: 500,
                  mx: 'auto',
                  lineHeight: 1.7,
                }}
              >
                {t.ctaDescription}
              </Typography>
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                href="/contact"
                sx={{
                  bgcolor: 'white',
                  color: '#1E3A5F',
                  fontWeight: 700,
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  fontSize: '1rem',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.9)',
                  },
                }}
              >
                {t.ctaButton}
              </Button>
            </Card>
          </MotionBox>
        </Container>
      </Box>
      <Footer />
    </>
  );
}
