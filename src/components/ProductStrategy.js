'use client';

import { useState } from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Stack, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import TabletAndroidIcon from '@mui/icons-material/TabletAndroid';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import MicIcon from '@mui/icons-material/Mic';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import DescriptionIcon from '@mui/icons-material/Description';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import SecurityIcon from '@mui/icons-material/Security';
import StorageIcon from '@mui/icons-material/Storage';
import { useI18n } from '@/lib/i18n';

const MotionBox = motion.create(Box);
const MotionCard = motion.create(Card);

const content = {
  ko: {
    sectionTitle: "2개 모듈, 하나의 플랫폼",
    sectionSubtitle: "진료 현장의 Embed Module과 운영 관리의 Admin Console이 함께 작동합니다",
    infraTitle: "공통 인프라",
    mainFeatures: "주요 기능",
    targetUsers: "대상",
    products: [
      {
        icon: TabletAndroidIcon,
        title: 'Embed Module',
        subtitle: '의료진용 진료 화면',
        description: 'EMR 화면 안에서 바로 작동합니다. 의료진이 기존 워크플로를 벗어나지 않고 AI 차트 자동화를 사용할 수 있습니다.',
        color: '#4B9CD3',
        gradient: 'linear-gradient(135deg, #4B9CD3 0%, #2563EB 100%)',
        users: '의료진 (의사, 간호사)',
        features: [
          { icon: MicIcon, text: '원클릭 녹음 시작/중지' },
          { icon: AutoAwesomeIcon, text: '실시간 SOAP 차트 생성' },
          { icon: DescriptionIcon, text: '기존 템플릿에 자동 매핑' },
          { icon: AssignmentIcon, text: '환자 안내문 자동 생성' },
        ],
        tag: '환자 대면',
      },
      {
        icon: AdminPanelSettingsIcon,
        title: 'Admin Console',
        subtitle: '운영/관리자용 대시보드',
        description: '병원 관리자와 EMR 운영팀을 위한 관리 콘솔입니다. 사용 현황 파악, 템플릿 관리, 품질 모니터링이 가능합니다.',
        color: '#8B5CF6',
        gradient: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
        users: '병원 관리자, EMR 운영팀',
        features: [
          { icon: DashboardIcon, text: '사용량/활용도 대시보드' },
          { icon: GroupIcon, text: '의사별 차트 생성 현황' },
          { icon: BarChartIcon, text: '시간 절감 리포트' },
          { icon: SettingsIcon, text: '템플릿/진료과 설정 관리' },
        ],
        tag: '운영 관리',
      },
    ],
    infraFeatures: [
      { icon: SecurityIcon, label: '데이터 암호화 (AES-256)', description: '전송 및 저장 데이터 전구간 암호화' },
      { icon: StorageIcon, label: '온프레미스 배포 지원', description: 'EMR사 내부 인프라에 직접 설치 가능' },
      { icon: BarChartIcon, label: 'Audit Log 자동 기록', description: '모든 차트 생성/수정 이력 감사 추적' },
    ],
  },
  en: {
    sectionTitle: "Two Modules, One Platform",
    sectionSubtitle: "Embed Module for clinicians meets Admin Console for operations",
    infraTitle: "Shared Infrastructure",
    mainFeatures: "Key Features",
    targetUsers: "For",
    products: [
      {
        icon: TabletAndroidIcon,
        title: 'Embed Module',
        subtitle: 'Clinical Interface',
        description: 'Runs inside your EMR. Clinicians use AI charting without leaving their workflow.',
        color: '#4B9CD3',
        gradient: 'linear-gradient(135deg, #4B9CD3 0%, #2563EB 100%)',
        users: 'Physicians, Nurses',
        features: [
          { icon: MicIcon, text: 'One-click recording' },
          { icon: AutoAwesomeIcon, text: 'Real-time SOAP generation' },
          { icon: DescriptionIcon, text: 'Auto-map to templates' },
          { icon: AssignmentIcon, text: 'Patient handouts' },
        ],
        tag: 'Patient-Facing',
      },
      {
        icon: AdminPanelSettingsIcon,
        title: 'Admin Console',
        subtitle: 'Operations Dashboard',
        description: 'For hospital admins and EMR ops teams. Monitor usage, manage templates, track quality.',
        color: '#8B5CF6',
        gradient: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
        users: 'Admins, EMR Ops',
        features: [
          { icon: DashboardIcon, text: 'Usage dashboard' },
          { icon: GroupIcon, text: 'Per-doctor analytics' },
          { icon: BarChartIcon, text: 'Time-saved reports' },
          { icon: SettingsIcon, text: 'Template settings' },
        ],
        tag: 'Operations',
      },
    ],
    infraFeatures: [
      { icon: SecurityIcon, label: 'AES-256 Encryption', description: 'End-to-end encryption for all data' },
      { icon: StorageIcon, label: 'On-Premise Ready', description: 'Deploy inside your own infrastructure' },
      { icon: BarChartIcon, label: 'Full Audit Trail', description: 'Every chart action logged for compliance' },
    ],
  },
};

export default function ProductStrategy() {
  const { locale } = useI18n();
  const t = content[locale] || content.ko;
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <Box
      id="product-strategy"
      sx={{
        py: { xs: 10, md: 14 },
        bgcolor: '#FAFBFC',
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
            PRODUCT STRATEGY
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
            {t.sectionTitle}
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
            {t.sectionSubtitle}
          </Typography>
        </MotionBox>

        {/* Product Cards */}
        <Grid container spacing={{ xs: 2.5, md: 4 }} sx={{ mb: { xs: 5, md: 6 } }}>
          {t.products.map((product, index) => {
            const isHovered = hoveredCard === index;
            return (
              <Grid size={{ xs: 12, sm: 6 }} key={index}>
                <MotionCard
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  whileHover={{ y: -6 }}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  elevation={0}
                  sx={{
                    height: '100%',
                    border: '2px solid',
                    borderColor: isHovered ? product.color : 'grey.200',
                    borderRadius: 3,
                    overflow: 'hidden',
                    transition: 'border-color 0.3s ease',
                  }}
                >
                  {/* Card Top Bar */}
                  <Box sx={{ background: product.gradient, px: 3, py: 2.5 }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Stack direction="row" alignItems="center" spacing={1.5}>
                        <product.icon sx={{ color: 'white', fontSize: 28 }} />
                        <Box>
                          <Typography variant="h6" sx={{ color: 'white', fontWeight: 700, fontSize: '1.1rem' }}>
                            {product.title}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.75rem' }}>
                            {product.subtitle}
                          </Typography>
                        </Box>
                      </Stack>
                      <Chip
                        label={product.tag}
                        size="small"
                        sx={{
                          bgcolor: 'rgba(255,255,255,0.2)',
                          color: 'white',
                          fontWeight: 600,
                          fontSize: '0.7rem',
                        }}
                      />
                    </Stack>
                  </Box>

                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 2.5 }}>
                      {product.description}
                    </Typography>

                    <Chip
                      label={`${t.targetUsers}: ${product.users}`}
                      size="small"
                      variant="outlined"
                      sx={{
                        mb: 2.5,
                        borderColor: product.color,
                        color: product.color,
                        fontWeight: 600,
                        fontSize: '0.75rem',
                      }}
                    />

                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1E293B', mb: 1.5, fontSize: '0.85rem' }}>
                      {t.mainFeatures}
                    </Typography>
                    <Stack spacing={1.5}>
                      {product.features.map((feature, i) => {
                        const Icon = feature.icon;
                        return (
                          <Stack key={i} direction="row" alignItems="center" spacing={1.5}>
                            <Box
                              sx={{
                                width: 32,
                                height: 32,
                                borderRadius: 1.5,
                                bgcolor: `${product.color}10`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                              }}
                            >
                              <Icon sx={{ fontSize: 16, color: product.color }} />
                            </Box>
                            <Typography variant="body2" sx={{ color: '#374151', fontSize: '0.85rem' }}>
                              {feature.text}
                            </Typography>
                          </Stack>
                        );
                      })}
                    </Stack>
                  </CardContent>
                </MotionCard>
              </Grid>
            );
          })}
        </Grid>

        {/* Infrastructure Features */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Box
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: 3,
              bgcolor: '#1E293B',
              color: 'white',
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 700, mb: 3, textAlign: 'center', fontSize: '1rem' }}
            >
              {t.infraTitle}
            </Typography>
            <Grid container spacing={3}>
              {t.infraFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Grid size={{ xs: 12, md: 4 }} key={index}>
                    <Stack direction="row" alignItems="flex-start" spacing={1.5}>
                      <Box
                        sx={{
                          width: 36,
                          height: 36,
                          borderRadius: 1.5,
                          bgcolor: 'rgba(75, 156, 211, 0.15)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <Icon sx={{ fontSize: 18, color: '#4B9CD3' }} />
                      </Box>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.85rem', mb: 0.25 }}>
                          {feature.label}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem' }}>
                          {feature.description}
                        </Typography>
                      </Box>
                    </Stack>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </MotionBox>
      </Container>
    </Box>
  );
}
