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
    subtitle: '다른 음성 기록 서비스와 다릅니다',
    differentiators: [
      {
        icon: DeleteForeverIcon,
        title: '음성 파일 즉시 삭제 + 보관 기간 설정',
        description: '녹음된 음성은 텍스트 변환 직후 서버에서 완전히 삭제됩니다. 변환된 텍스트는 설정한 기간(즉시 삭제 / 7일 / 30일) 후 자동 삭제됩니다.',
        highlight: '음성 파일 미보관',
        details: [
          '음성 파일은 변환 완료 후 즉시 삭제',
          '텍스트 보관 기간 직접 설정 가능',
          '설정 기간 후 자동 삭제',
          '수동 삭제 언제든 가능',
        ],
      },
      {
        icon: TableChartIcon,
        title: 'EMR 입력을 위한 필드 매핑',
        description: 'SOAP 형식 외에도 사용하시는 EMR의 입력 필드에 맞춰 출력을 구성할 수 있습니다. 필드별로 복사하여 EMR에 바로 붙여넣기하세요.',
        highlight: 'EMR 최적화 출력',
        details: [
          'EMR 입력 필드에 맞춘 출력 구성',
          '주호소, 현병력, 과거력 등 섹션 매핑',
          '전체 또는 필드별 개별 복사',
          '클립보드 복사로 즉시 EMR 입력',
        ],
      },
      {
        icon: TuneIcon,
        title: '전문과 · 의사 스타일 맞춤 템플릿',
        description: '내과, 이비인후과, 정형외과 등 전문과별 기본 템플릿을 제공합니다. 선생님의 진료 스타일에 맞게 섹션 구성과 출력 형식을 직접 수정할 수 있습니다.',
        highlight: '완전한 커스터마이징',
        details: [
          '전문과별 최적화된 기본 템플릿',
          '섹션 추가/삭제/순서 변경 자유',
          '출력 형식(문장형/요약형/리스트) 선택',
          '자주 쓰는 문구 저장 및 삽입',
        ],
      },
    ],
  },
  en: {
    badge: 'What Makes ChartSok Different',
    title: 'Why ChartSok?',
    subtitle: 'Different from other voice recording services',
    differentiators: [
      {
        icon: DeleteForeverIcon,
        title: 'Audio Deletion + Configurable Retention',
        description: 'Recorded audio is completely deleted after transcription. Transcribed text is auto-deleted after your configured period (immediate / 7 days / 30 days).',
        highlight: 'No Audio Storage',
        details: [
          'Audio deleted immediately after transcription',
          'Configure text retention period yourself',
          'Auto-deletion after set period',
          'Manual deletion available anytime',
        ],
      },
      {
        icon: TableChartIcon,
        title: 'EMR Field Mapping for Easy Input',
        description: 'Beyond SOAP format, configure output to match your EMR input fields. Copy by field and paste directly into your EMR.',
        highlight: 'EMR-Optimized Output',
        details: [
          'Output structured for EMR input fields',
          'Map sections like CC, HPI, PMH, PE',
          'Copy entire chart or individual fields',
          'Clipboard copy for instant EMR entry',
        ],
      },
      {
        icon: TuneIcon,
        title: 'Specialty & Doctor Style Templates',
        description: 'Pre-configured templates for Internal Medicine, ENT, Orthopedics, and more. Customize section layout and output format to match your documentation style.',
        highlight: 'Full Customization',
        details: [
          'Specialty-optimized default templates',
          'Add/remove/reorder sections freely',
          'Choose output format (narrative/summary/list)',
          'Save and insert frequently used phrases',
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
