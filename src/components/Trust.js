'use client';

import { Box, Container, Typography, Grid, Card, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import TimerIcon from '@mui/icons-material/Timer';
import TableChartIcon from '@mui/icons-material/TableChart';
import TuneIcon from '@mui/icons-material/Tune';
import { useI18n } from '@/lib/i18n';

const MotionBox = motion.create(Box);
const MotionCard = motion.create(Card);

const content = {
  ko: {
    badge: '차트쏙만의 차별점',
    title: '왜 차트쏙인가요?',
    subtitle: '단순 음성 기록을 넘어, 클리닉 운영 전체를 돕습니다',
    differentiators: [
      {
        icon: DeleteForeverIcon,
        title: '요약에서 끝나지 않습니다',
        description: '다른 서비스는 진료 녹음 → 텍스트 변환에서 멈춥니다. 차트쏙은 요약 이후 환자 안내문 생성, 재내원/리콜 관리, follow-up 액션까지 자동화합니다.',
        highlight: '요약 → 안내 → 액션',
        details: [
          '진료 요약 자동 생성',
          '환자 안내문 자동 작성',
          '재내원/리콜 대상 자동 정리',
          'Follow-up To-do 액션 생성',
        ],
      },
      {
        icon: TableChartIcon,
        title: 'EMR을 대체하지 않고, 옆에서 작동',
        description: 'EMR을 바꿀 필요 없습니다. 기존 EMR 필드에 맞춰 출력을 구성하고, 클립보드 복사로 바로 붙여넣기하세요. API 직접 연동도 준비 중입니다.',
        highlight: 'EMR 호환 설계',
        details: [
          'EMR 입력 필드에 맞춘 출력 구성',
          '클립보드 복사로 즉시 EMR 입력',
          '전체 또는 필드별 개별 복사',
          'API 직접 연동 준비 중',
        ],
      },
      {
        icon: TuneIcon,
        title: '보안이 기본입니다',
        description: '음성 파일은 변환 직후 삭제. 텍스트 보관 기간은 병원이 직접 설정합니다. 최소 수집 · 권한 기반 접근 · AES-256 암호화가 기본입니다.',
        highlight: '음성 파일 미보관',
        details: [
          '음성 파일 변환 후 즉시 삭제',
          '텍스트 보관 기간 직접 설정 (즉시/7일/30일)',
          'AES-256 암호화 저장',
          '국내 규정 (개인정보보호법·의료법) 준수',
        ],
      },
    ],
  },
  en: {
    badge: 'What Makes ChartSok Different',
    title: 'Why ChartSok?',
    subtitle: 'Beyond voice transcription — a full clinic workflow tool',
    differentiators: [
      {
        icon: DeleteForeverIcon,
        title: 'Goes Beyond Summaries',
        description: 'Other services stop at recording → text conversion. ChartSok automates patient instructions, recall management, and follow-up actions after the summary.',
        highlight: 'Summary → Instructions → Actions',
        details: [
          'Auto-generate visit summaries',
          'Auto-create patient instructions',
          'Auto-organize recall targets',
          'Generate follow-up to-do actions',
        ],
      },
      {
        icon: TableChartIcon,
        title: 'Works Alongside Your EMR',
        description: 'No need to switch EMRs. Output structured for your EMR fields, copy to clipboard and paste directly. Direct API integration coming soon.',
        highlight: 'EMR-Compatible Design',
        details: [
          'Output structured for EMR input fields',
          'Clipboard copy for instant EMR entry',
          'Copy entire chart or individual fields',
          'Direct API integration in progress',
        ],
      },
      {
        icon: TuneIcon,
        title: 'Security by Default',
        description: 'Audio deleted immediately after transcription. Text retention period configured by your clinic. Minimal collection, role-based access, AES-256 encryption built in.',
        highlight: 'No Audio Storage',
        details: [
          'Audio deleted after transcription',
          'Configure text retention (immediate/7/30 days)',
          'AES-256 encrypted storage',
          'Korean regulatory compliant (PIPA, Medical Act)',
        ],
      },
    ],
  },
};

export default function Trust() {
  const { locale } = useI18n();
  const t = content[locale] || content.ko;

  return (
    <Box
      id="trust"
      sx={{
        py: { xs: 10, md: 14 },
        bgcolor: '#F8FAFC',
      }}
    >
      <Container maxWidth="xl">
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}
        >
          <Chip
            label={t.badge}
            sx={{
              mb: 3,
              bgcolor: 'primary.main',
              color: 'white',
              fontWeight: 600,
              fontSize: '0.875rem',
              px: 1,
            }}
          />
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', md: '2.75rem' },
              fontWeight: 700,
              color: 'secondary.main',
              mb: 2,
            }}
          >
            {t.title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              fontSize: { xs: '1rem', md: '1.125rem' },
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            {t.subtitle}
          </Typography>
        </MotionBox>

        <Grid container spacing={4}>
          {t.differentiators.map((item, index) => {
            const Icon = item.icon;
            return (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
                <MotionCard
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  elevation={0}
                  sx={{
                    height: '100%',
                    p: 4,
                    border: '2px solid',
                    borderColor: 'grey.200',
                    borderRadius: 3,
                    bgcolor: 'white',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: 'primary.main',
                      boxShadow: '0 12px 40px rgba(75, 156, 211, 0.15)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: 2,
                      bgcolor: 'primary.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                    }}
                  >
                    <Icon sx={{ fontSize: 32, color: 'white' }} />
                  </Box>

                  <Chip
                    label={item.highlight}
                    size="small"
                    sx={{
                      mb: 2,
                      bgcolor: '#E0F2FE',
                      color: 'primary.main',
                      fontWeight: 600,
                      fontSize: '0.75rem',
                    }}
                  />

                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      color: 'secondary.main',
                      mb: 2,
                      fontSize: { xs: '1.125rem', md: '1.25rem' },
                      lineHeight: 1.4,
                    }}
                  >
                    {item.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      mb: 3,
                      lineHeight: 1.7,
                    }}
                  >
                    {item.description}
                  </Typography>

                  <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
                    {item.details.map((detail, i) => (
                      <Box
                        component="li"
                        key={i}
                        sx={{
                          color: 'text.secondary',
                          fontSize: '0.875rem',
                          mb: 1,
                          '&::marker': {
                            color: 'primary.main',
                          },
                        }}
                      >
                        {detail}
                      </Box>
                    ))}
                  </Box>
                </MotionCard>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
