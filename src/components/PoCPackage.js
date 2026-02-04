'use client';

import { Box, Container, Typography, Grid, Card, CardContent, Stack, Chip, Button } from '@mui/material';
import { motion } from 'framer-motion';
import Link from 'next/link';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import VerifiedIcon from '@mui/icons-material/Verified';
import TimerIcon from '@mui/icons-material/Timer';

const MotionBox = motion.create(Box);
const MotionCard = motion.create(Card);

const pocIncludes = [
  { text: 'NDA 체결 및 기술 문서 공유', week: '1주' },
  { text: '대표 템플릿 3종 필드 매핑', week: '1주' },
  { text: 'Sandbox 환경 API/SDK 연동', week: '2주' },
  { text: '파일럿 병원 2~3곳 실전 테스트', week: '4~8주' },
  { text: '전담 엔지니어 기술 지원', week: '전 기간' },
  { text: '성과 리포트 및 본계약 협의', week: '완료 후' },
];

const successKPIs = [
  { label: '차트 작성 시간', target: '70%+ 절감', color: '#4B9CD3' },
  { label: '의료진 만족도', target: '4.0/5.0 이상', color: '#10B981' },
  { label: '템플릿 매핑 정확도', target: '검증 완료', color: '#8B5CF6' },
  { label: 'EMR 연동 안정성', target: '99.5% 가동', color: '#F59E0B' },
];

const emrRequirements = [
  '웹뷰 또는 iFrame 임베드 가능한 EMR 환경',
  'HTTPS 기반 API 통신 가능',
  '파일럿 병원 2~3곳 섭외 (Chartsok 지원 가능)',
  '기술 담당자 1명 배정',
];

export default function PoCPackage() {
  return (
    <Box
      id="poc-package"
      sx={{
        py: { xs: 10, md: 14 },
        bgcolor: 'white',
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}
        >
          <Typography
            variant="overline"
            sx={{
              color: 'primary.main',
              mb: 1.5,
              display: 'block',
              letterSpacing: 2,
              fontWeight: 700,
              fontSize: { xs: '0.65rem', md: '0.75rem' },
            }}
          >
            PoC PACKAGE
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '1.6rem', sm: '2rem', md: '2.5rem' },
              fontWeight: 800,
              color: 'secondary.main',
              mb: 2,
              lineHeight: 1.2,
            }}
          >
            무료 파일럿 패키지
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              fontSize: { xs: '0.9rem', md: '1.05rem' },
              maxWidth: 640,
              mx: 'auto',
              lineHeight: 1.7,
            }}
          >
            비용 부담 없이 실제 병원 환경에서 검증하세요. PoC 기간 중 과금은 없습니다.
          </Typography>
        </MotionBox>

        <Grid container spacing={{ xs: 3, md: 4 }}>
          {/* Left: What's Included */}
          <Grid size={{ xs: 12, md: 7 }}>
            <MotionCard
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              elevation={0}
              sx={{
                height: '100%',
                border: '2px solid',
                borderColor: '#4B9CD3',
                borderRadius: 3,
                overflow: 'hidden',
              }}
            >
              {/* Card Header */}
              <Box sx={{ bgcolor: '#4B9CD3', px: 3, py: 2 }}>
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <RocketLaunchIcon sx={{ color: 'white', fontSize: 24 }} />
                  <Typography variant="h6" sx={{ color: 'white', fontWeight: 700, fontSize: '1.1rem' }}>
                    PoC 패키지 포함 사항
                  </Typography>
                  <Chip
                    label="무료"
                    size="small"
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '0.75rem',
                    }}
                  />
                </Stack>
              </Box>

              <CardContent sx={{ p: 3 }}>
                <Stack spacing={2}>
                  {pocIncludes.map((item, index) => (
                    <MotionBox
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        p: 1.5,
                        borderRadius: 2,
                        bgcolor: 'grey.50',
                        '&:hover': { bgcolor: '#F0F9FF' },
                        transition: 'background-color 0.2s',
                      }}
                    >
                      <CheckCircleIcon sx={{ color: '#10B981', fontSize: 22, flexShrink: 0 }} />
                      <Typography
                        variant="body2"
                        sx={{ flex: 1, fontWeight: 500, fontSize: '0.9rem', color: '#1E293B' }}
                      >
                        {item.text}
                      </Typography>
                      <Chip
                        label={item.week}
                        size="small"
                        sx={{
                          bgcolor: '#EFF6FF',
                          color: '#4B9CD3',
                          fontWeight: 600,
                          fontSize: '0.7rem',
                          height: 24,
                        }}
                      />
                    </MotionBox>
                  ))}
                </Stack>

                {/* EMR Requirements */}
                <Box sx={{ mt: 3, p: 2.5, borderRadius: 2, bgcolor: '#FFFBEB', border: '1px solid #FDE68A' }}>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
                    <AssignmentIcon sx={{ color: '#F59E0B', fontSize: 20 }} />
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#92400E', fontSize: '0.85rem' }}>
                      EMR사 준비사항
                    </Typography>
                  </Stack>
                  <Stack spacing={0.75}>
                    {emrRequirements.map((req, i) => (
                      <Typography key={i} variant="body2" sx={{ color: '#78350F', fontSize: '0.82rem', pl: 0.5 }}>
                        • {req}
                      </Typography>
                    ))}
                  </Stack>
                </Box>
              </CardContent>
            </MotionCard>
          </Grid>

          {/* Right: Success KPIs + Support */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Stack spacing={3} sx={{ height: '100%' }}>
              {/* Success KPIs */}
              <MotionCard
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                elevation={0}
                sx={{
                  border: '1px solid',
                  borderColor: 'grey.200',
                  borderRadius: 3,
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2.5 }}>
                    <VerifiedIcon sx={{ color: '#10B981', fontSize: 22 }} />
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#1E293B', fontSize: '1rem' }}>
                      PoC 성공 KPI
                    </Typography>
                  </Stack>
                  <Grid container spacing={2}>
                    {successKPIs.map((kpi, index) => (
                      <Grid size={{ xs: 6 }} key={index}>
                        <Box
                          sx={{
                            p: 2,
                            borderRadius: 2,
                            bgcolor: `${kpi.color}08`,
                            border: '1px solid',
                            borderColor: `${kpi.color}20`,
                            textAlign: 'center',
                          }}
                        >
                          <Typography
                            variant="caption"
                            sx={{ color: 'text.secondary', fontSize: '0.72rem', display: 'block', mb: 0.5 }}
                          >
                            {kpi.label}
                          </Typography>
                          <Typography
                            variant="subtitle2"
                            sx={{ color: kpi.color, fontWeight: 700, fontSize: '0.85rem' }}
                          >
                            {kpi.target}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </MotionCard>

              {/* Dedicated Support */}
              <MotionCard
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                elevation={0}
                sx={{
                  border: '1px solid',
                  borderColor: 'grey.200',
                  borderRadius: 3,
                  flex: 1,
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                    <SupportAgentIcon sx={{ color: '#8B5CF6', fontSize: 22 }} />
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#1E293B', fontSize: '1rem' }}>
                      전담 지원
                    </Typography>
                  </Stack>
                  <Stack spacing={1.5}>
                    {[
                      '전담 솔루션 엔지니어 배정',
                      '주간 진행 미팅 및 리포트',
                      '병원 현장 교육 지원',
                      '이슈 발생 시 24시간 내 대응',
                    ].map((item, i) => (
                      <Stack key={i} direction="row" alignItems="center" spacing={1}>
                        <CheckCircleIcon sx={{ color: '#8B5CF6', fontSize: 18 }} />
                        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>
                          {item}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </CardContent>
              </MotionCard>

              {/* Timeline */}
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                sx={{
                  p: 2.5,
                  borderRadius: 2,
                  bgcolor: '#F0F9FF',
                  border: '1px solid #BFDBFE',
                  textAlign: 'center',
                }}
              >
                <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} sx={{ mb: 1 }}>
                  <TimerIcon sx={{ color: '#4B9CD3', fontSize: 20 }} />
                  <Typography variant="subtitle2" sx={{ color: '#1E40AF', fontWeight: 700, fontSize: '0.9rem' }}>
                    PoC 전체 기간: 7~11주
                  </Typography>
                </Stack>
                <Typography variant="caption" sx={{ color: '#3B82F6', fontSize: '0.78rem' }}>
                  NDA 체결부터 성과 리포트까지 • 비용 무료
                </Typography>
              </MotionBox>
            </Stack>
          </Grid>
        </Grid>

        {/* Bottom CTA */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          sx={{ textAlign: 'center', mt: { xs: 5, md: 6 } }}
        >
          <Button
            component={Link}
            href="/contact?type=emr_partner"
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{
              px: { xs: 3, sm: 4, md: 5 },
              py: { xs: 1.25, md: 1.75 },
              borderRadius: 2.5,
              fontWeight: 700,
              fontSize: { xs: '0.9rem', md: '1rem' },
              bgcolor: '#4B9CD3',
              width: { xs: '100%', sm: 'auto' },
              boxShadow: '0 4px 16px rgba(75, 156, 211, 0.25)',
              '&:hover': { bgcolor: '#3A8BC2', boxShadow: '0 6px 24px rgba(75, 156, 211, 0.35)' },
            }}
          >
            무료 PoC 신청하기
          </Button>
          <Typography
            variant="caption"
            sx={{ display: 'block', mt: 1.5, color: 'text.disabled', fontSize: '0.78rem' }}
          >
            신청 후 2영업일 이내 전담 팀이 연락드립니다
          </Typography>
        </MotionBox>
      </Container>
    </Box>
  );
}
