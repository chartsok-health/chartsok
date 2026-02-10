'use client';

import {
  Box, Container, Typography, Grid, Card, Button, Chip,
  List, ListItem, ListItemIcon, ListItemText,
} from '@mui/material';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import HandshakeIcon from '@mui/icons-material/Handshake';
import StorefrontIcon from '@mui/icons-material/Storefront';
import BrushIcon from '@mui/icons-material/Brush';
import CampaignIcon from '@mui/icons-material/Campaign';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import ApiIcon from '@mui/icons-material/Api';
import DnsIcon from '@mui/icons-material/Dns';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SecurityIcon from '@mui/icons-material/Security';
import EmailIcon from '@mui/icons-material/Email';
import { useI18n } from '@/lib/i18n';

const MotionBox = motion.create(Box);

const content = {
  ko: {
    hero: {
      chip: 'EMR 파트너 프로그램',
      titleLine1: 'EMR에 AI 차트 자동화를',
      titleHighlight: '탑재하세요',
      subtitle: 'chartsok의 AI 음성인식 · 자동 차트 작성 기술을 귀사 EMR에 통합하여, 의료진의 차트 작성 시간을 80% 줄이세요.',
      partnerInquiry: '파트너 문의하기',
      securityPacket: '보안 패킷 요청',
    },
    partnershipModels: {
      sectionTitle: '제휴 모델',
      sectionSubtitle: '귀사의 비즈니스 모델에 맞는 최적의 파트너십 방식을 선택하세요.',
      items: [
        {
          icon: StorefrontIcon,
          title: '리셀 (Resell)',
          description: '근무 환경에서 chartsok을 직접 판매하고, 매출의 일정 비율을 수익으로 가져가세요.',
          color: '#4B9CD3',
          highlights: ['매출 수익 배분', '전담 영업 지원', '공동 마케팅 지원'],
        },
        {
          icon: BrushIcon,
          title: '화이트라벨 (White-label)',
          description: 'chartsok AI 엔진을 귀사 브랜드로 탑재하세요. UI부터 도메인까지 커스터마이징 가능합니다.',
          color: '#8B5CF6',
          highlights: ['브랜드 커스터마이징', 'UI/UX 완전 제어', '전용 인프라 제공'],
        },
        {
          icon: CampaignIcon,
          title: '코마케팅 (Co-marketing)',
          description: '공동 웨비나, 사례 연구, 콘텐츠 협업을 통해 양측 브랜드 인지도를 높이세요.',
          color: '#10B981',
          highlights: ['공동 콘텐츠 제작', '사례 연구 발표', '웨비나/세미나 공동 개최'],
        },
      ],
    },
    integrationMethods: {
      sectionTitle: '통합 방식',
      sectionSubtitle: '귀사 시스템 환경에 가장 적합한 연동 방식을 선택하세요.',
      requirementsLabel: '요구사항',
      providesLabel: 'chartsok 제공',
      items: [
        {
          icon: IntegrationInstructionsIcon,
          title: 'Embedded iFrame/SDK',
          description: 'chartsok UI를 EMR 화면 안에 바로 임베드하세요. 최소한의 개발로 빠르게 적용 가능합니다.',
          color: '#4B9CD3',
          requirements: ['웹뷰 또는 iFrame 지원', 'HTTPS 통신'],
          chartsokProvides: ['JavaScript SDK', '임베드 가이드'],
        },
        {
          icon: ApiIcon,
          title: 'API 연동',
          description: 'RESTful API로 직접 연동하여 완전한 커스터마이징이 가능합니다. 음성 데이터 송수신부터 차트 결과 조회까지.',
          color: '#F59E0B',
          requirements: ['REST API 클라이언트 구현', 'OAuth 2.0 인증'],
          chartsokProvides: ['API 문서', 'Sandbox 환경', 'API 키 발급'],
        },
        {
          icon: DnsIcon,
          title: '온프레미스/프라이빗',
          description: '보안 요구사항이 높은 환경을 위해 온프레미스 또는 프라이빗 클라우드 배포를 지원합니다.',
          color: '#8B5CF6',
          requirements: ['Docker/Kubernetes 환경', '최소 사양: 8vCPU, 32GB RAM'],
          chartsokProvides: ['Docker 이미지', 'Helm 차트', '설치 가이드'],
        },
      ],
    },
    onboarding: {
      sectionTitle: '온보딩 일정',
      sectionSubtitle: '파트너십 체결부터 런칭까지의 단계별 일정입니다.',
      steps: [
        {
          step: 1,
          title: 'NDA 체결',
          duration: '1주',
          description: '비밀유지협약 체결 및 기술 문서 공유',
          color: '#4B9CD3',
        },
        {
          step: 2,
          title: '샌드박스 연동',
          duration: '2주',
          description: '테스트 환경에서 API/SDK 연동 및 검증',
          color: '#10B981',
        },
        {
          step: 3,
          title: '병원 PoC',
          duration: '4-8주',
          description: '파일럿 병원에서 실제 환자 데이터로 검증',
          color: '#F59E0B',
        },
        {
          step: 4,
          title: '런칭',
          duration: '확정 후',
          description: '정식 배포 및 공동 마케팅 시작',
          color: '#8B5CF6',
        },
      ],
    },
    cta: {
      title: '파트너 프로그램 문의',
      subtitle: 'EMR 파트너십에 관심이 있으시면 아래 버튼을 클릭해 문의해 주세요. 전담 팀이 2영업일 이내에 연락드리겠습니다.',
      partnerInquiry: '파트너 문의하기',
      securityPacket: '보안 패킷 요청',
    },
  },
  en: {
    hero: {
      chip: 'EMR Partner Program',
      titleLine1: 'Add AI Chart Automation to',
      titleHighlight: 'Your EMR',
      subtitle: "Integrate chartsok's AI voice recognition and auto-charting technology into your EMR to reduce charting time by 80%.",
      partnerInquiry: 'Partner Inquiry',
      securityPacket: 'Request Security Packet',
    },
    partnershipModels: {
      sectionTitle: 'Partnership Models',
      sectionSubtitle: 'Choose the best partnership model for your business.',
      items: [
        {
          icon: StorefrontIcon,
          title: 'Resell',
          description: 'Sell chartsok directly in your environment and earn a share of revenue.',
          color: '#4B9CD3',
          highlights: ['Revenue sharing', 'Dedicated sales support', 'Co-marketing support'],
        },
        {
          icon: BrushIcon,
          title: 'White-label',
          description: "Embed chartsok's AI engine under your brand. Customize UI to domain.",
          color: '#8B5CF6',
          highlights: ['Brand customization', 'Full UI/UX control', 'Dedicated infrastructure'],
        },
        {
          icon: CampaignIcon,
          title: 'Co-marketing',
          description: 'Boost both brands through joint webinars, case studies, and content.',
          color: '#10B981',
          highlights: ['Joint content creation', 'Case study publication', 'Joint webinars/seminars'],
        },
      ],
    },
    integrationMethods: {
      sectionTitle: 'Integration Methods',
      sectionSubtitle: 'Choose the integration method that best fits your system.',
      requirementsLabel: 'Requirements',
      providesLabel: 'chartsok Provides',
      items: [
        {
          icon: IntegrationInstructionsIcon,
          title: 'Embedded iFrame/SDK',
          description: 'Embed the chartsok UI directly into your EMR screen. Quick to apply with minimal development.',
          color: '#4B9CD3',
          requirements: ['WebView or iFrame support', 'HTTPS communication'],
          chartsokProvides: ['JavaScript SDK', 'Embed guide'],
        },
        {
          icon: ApiIcon,
          title: 'API Integration',
          description: 'Full customization via RESTful API integration. From voice data transmission to chart result retrieval.',
          color: '#F59E0B',
          requirements: ['REST API client implementation', 'OAuth 2.0 authentication'],
          chartsokProvides: ['API documentation', 'Sandbox environment', 'API key issuance'],
        },
        {
          icon: DnsIcon,
          title: 'On-premise/Private',
          description: 'On-premise or private cloud deployment for environments with high security requirements.',
          color: '#8B5CF6',
          requirements: ['Docker/Kubernetes environment', 'Minimum specs: 8vCPU, 32GB RAM'],
          chartsokProvides: ['Docker image', 'Helm chart', 'Installation guide'],
        },
      ],
    },
    onboarding: {
      sectionTitle: 'Onboarding Timeline',
      sectionSubtitle: 'Step-by-step timeline from partnership to launch.',
      steps: [
        {
          step: 1,
          title: 'NDA Signing',
          duration: '1 week',
          description: 'Sign NDA and share technical documentation',
          color: '#4B9CD3',
        },
        {
          step: 2,
          title: 'Sandbox Integration',
          duration: '2 weeks',
          description: 'API/SDK integration and verification in test environment',
          color: '#10B981',
        },
        {
          step: 3,
          title: 'Hospital PoC',
          duration: '4-8 weeks',
          description: 'Validation with real patient data at pilot hospital',
          color: '#F59E0B',
        },
        {
          step: 4,
          title: 'Launch',
          duration: 'After approval',
          description: 'Official deployment and joint marketing kickoff',
          color: '#8B5CF6',
        },
      ],
    },
    cta: {
      title: 'Partner Program Inquiry',
      subtitle: 'Interested in EMR partnership? Click below to inquire. Our dedicated team will contact you within 2 business days.',
      partnerInquiry: 'Partner Inquiry',
      securityPacket: 'Request Security Packet',
    },
  },
};

export default function PartnersPage() {
  const { locale } = useI18n();
  const t = content[locale];

  return (
    <>
      <Header />
      <Box sx={{ minHeight: '100vh', bgcolor: '#FAFBFC' }}>
        {/* Hero Section */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
            color: 'white',
            pt: { xs: 14, md: 18 },
            pb: { xs: 8, md: 12 },
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at 20% 50%, rgba(75, 156, 211, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
            }}
          />
          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
            <MotionBox
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto' }}
            >
              <Chip
                label={t.hero.chip}
                icon={<HandshakeIcon />}
                sx={{
                  mb: 3,
                  bgcolor: 'rgba(75, 156, 211, 0.2)',
                  color: '#4B9CD3',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  py: 0.5,
                  '& .MuiChip-icon': { color: '#4B9CD3' },
                }}
              />
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  mb: 3,
                  fontSize: { xs: '2rem', md: '3rem' },
                  lineHeight: 1.2,
                }}
              >
                {t.hero.titleLine1}{' '}
                <Box component="span" sx={{ color: '#4B9CD3' }}>
                  {t.hero.titleHighlight}
                </Box>
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  mb: 5,
                  color: 'rgba(255,255,255,0.7)',
                  fontWeight: 400,
                  lineHeight: 1.8,
                  fontSize: { xs: '1rem', md: '1.15rem' },
                }}
              >
                {t.hero.subtitle}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button
                  component={Link}
                  href="/contact?type=emr_partner"
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    bgcolor: '#4B9CD3',
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 700,
                    fontSize: '1rem',
                    '&:hover': { bgcolor: '#3A8BC2' },
                  }}
                >
                  {t.hero.partnerInquiry}
                </Button>
                <Button
                  component={Link}
                  href="/contact?type=security_packet"
                  variant="outlined"
                  size="large"
                  startIcon={<SecurityIcon />}
                  sx={{
                    borderColor: 'rgba(255,255,255,0.3)',
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 700,
                    fontSize: '1rem',
                    '&:hover': {
                      borderColor: 'rgba(255,255,255,0.6)',
                      bgcolor: 'rgba(255,255,255,0.05)',
                    },
                  }}
                >
                  {t.hero.securityPacket}
                </Button>
              </Box>
            </MotionBox>
          </Container>
        </Box>

        {/* Partnership Models Section */}
        <Box sx={{ py: { xs: 8, md: 12 } }}>
          <Container maxWidth="lg">
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              sx={{ textAlign: 'center', mb: 6 }}
            >
              <Typography
                variant="h3"
                sx={{ fontWeight: 800, mb: 2, color: '#1E293B', fontSize: { xs: '1.8rem', md: '2.4rem' } }}
              >
                {t.partnershipModels.sectionTitle}
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto', fontWeight: 400 }}
              >
                {t.partnershipModels.sectionSubtitle}
              </Typography>
            </MotionBox>
            <Grid container spacing={4}>
              {t.partnershipModels.items.map((model, index) => (
                <Grid size={{ xs: 12, md: 4 }} key={index}>
                  <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card
                      elevation={0}
                      sx={{
                        p: 4,
                        height: '100%',
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 3,
                        transition: 'all 0.3s',
                        '&:hover': {
                          borderColor: model.color,
                          boxShadow: `0 8px 30px ${model.color}15`,
                          transform: 'translateY(-4px)',
                        },
                      }}
                    >
                      <Box
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: 2,
                          bgcolor: `${model.color}12`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 3,
                        }}
                      >
                        <model.icon sx={{ fontSize: 28, color: model.color }} />
                      </Box>
                      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#1E293B' }}>
                        {model.title}
                      </Typography>
                      <Typography sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.8 }}>
                        {model.description}
                      </Typography>
                      <List dense>
                        {model.highlights.map((item, i) => (
                          <ListItem key={i} sx={{ px: 0 }}>
                            <ListItemIcon sx={{ minWidth: 32 }}>
                              <CheckCircleIcon sx={{ fontSize: 18, color: model.color }} />
                            </ListItemIcon>
                            <ListItemText
                              primary={item}
                              primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 500 }}
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
        </Box>

        {/* Integration Methods Section */}
        <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'white' }}>
          <Container maxWidth="lg">
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              sx={{ textAlign: 'center', mb: 6 }}
            >
              <Typography
                variant="h3"
                sx={{ fontWeight: 800, mb: 2, color: '#1E293B', fontSize: { xs: '1.8rem', md: '2.4rem' } }}
              >
                {t.integrationMethods.sectionTitle}
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto', fontWeight: 400 }}
              >
                {t.integrationMethods.sectionSubtitle}
              </Typography>
            </MotionBox>
            <Grid container spacing={4}>
              {t.integrationMethods.items.map((method, index) => (
                <Grid size={{ xs: 12, md: 4 }} key={index}>
                  <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card
                      elevation={0}
                      sx={{
                        p: 4,
                        height: '100%',
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 3,
                        transition: 'all 0.3s',
                        '&:hover': {
                          borderColor: method.color,
                          boxShadow: `0 8px 30px ${method.color}15`,
                          transform: 'translateY(-4px)',
                        },
                      }}
                    >
                      <Box
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: 2,
                          bgcolor: `${method.color}12`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 3,
                        }}
                      >
                        <method.icon sx={{ fontSize: 28, color: method.color }} />
                      </Box>
                      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#1E293B' }}>
                        {method.title}
                      </Typography>
                      <Typography sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.8 }}>
                        {method.description}
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: '#1E293B' }}>
                          {t.integrationMethods.requirementsLabel}
                        </Typography>
                        <List dense>
                          {method.requirements.map((req, i) => (
                            <ListItem key={i} sx={{ px: 0, py: 0.25 }}>
                              <ListItemIcon sx={{ minWidth: 28 }}>
                                <CheckCircleIcon sx={{ fontSize: 16, color: method.color }} />
                              </ListItemIcon>
                              <ListItemText
                                primary={req}
                                primaryTypographyProps={{ fontSize: '0.85rem' }}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: '#1E293B' }}>
                          {t.integrationMethods.providesLabel}
                        </Typography>
                        <List dense>
                          {method.chartsokProvides.map((item, i) => (
                            <ListItem key={i} sx={{ px: 0, py: 0.25 }}>
                              <ListItemIcon sx={{ minWidth: 28 }}>
                                <CheckCircleIcon sx={{ fontSize: 16, color: '#10B981' }} />
                              </ListItemIcon>
                              <ListItemText
                                primary={item}
                                primaryTypographyProps={{ fontSize: '0.85rem' }}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    </Card>
                  </MotionBox>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Onboarding Timeline Section */}
        <Box sx={{ py: { xs: 8, md: 12 } }}>
          <Container maxWidth="lg">
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              sx={{ textAlign: 'center', mb: 6 }}
            >
              <Typography
                variant="h3"
                sx={{ fontWeight: 800, mb: 2, color: '#1E293B', fontSize: { xs: '1.8rem', md: '2.4rem' } }}
              >
                {t.onboarding.sectionTitle}
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto', fontWeight: 400 }}
              >
                {t.onboarding.sectionSubtitle}
              </Typography>
            </MotionBox>
            <Grid container spacing={3} sx={{ position: 'relative' }}>
              {t.onboarding.steps.map((step, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                  <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                  >
                    <Card
                      elevation={0}
                      sx={{
                        p: 3,
                        textAlign: 'center',
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 3,
                        position: 'relative',
                        height: '100%',
                      }}
                    >
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: '50%',
                          bgcolor: step.color,
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mx: 'auto',
                          mb: 2,
                          fontWeight: 800,
                          fontSize: '1.2rem',
                        }}
                      >
                        {step.step}
                      </Box>
                      <Chip
                        label={step.duration}
                        size="small"
                        sx={{
                          mb: 2,
                          bgcolor: `${step.color}15`,
                          color: step.color,
                          fontWeight: 600,
                        }}
                      />
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#1E293B' }}>
                        {step.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                        {step.description}
                      </Typography>
                      {index < t.onboarding.steps.length - 1 && (
                        <ArrowForwardIcon
                          sx={{
                            display: { xs: 'none', md: 'block' },
                            position: 'absolute',
                            right: -20,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: 'divider',
                            fontSize: 28,
                          }}
                        />
                      )}
                    </Card>
                  </MotionBox>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Contact CTA Section */}
        <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'white' }}>
          <Container maxWidth="md">
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card
                elevation={0}
                sx={{
                  p: { xs: 4, md: 6 },
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
                  color: 'white',
                  borderRadius: 4,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'radial-gradient(circle at 30% 50%, rgba(75, 156, 211, 0.15) 0%, transparent 50%)',
                  }}
                />
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                  <EmailIcon sx={{ fontSize: 48, color: '#4B9CD3', mb: 2 }} />
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 800, mb: 2, fontSize: { xs: '1.5rem', md: '2rem' } }}
                  >
                    {t.cta.title}
                  </Typography>
                  <Typography
                    sx={{
                      color: 'rgba(255,255,255,0.7)',
                      mb: 4,
                      maxWidth: 500,
                      mx: 'auto',
                      lineHeight: 1.8,
                    }}
                  >
                    {t.cta.subtitle}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Button
                      component={Link}
                      href="/contact?type=emr_partner"
                      variant="contained"
                      size="large"
                      endIcon={<ArrowForwardIcon />}
                      sx={{
                        bgcolor: '#4B9CD3',
                        px: 4,
                        py: 1.5,
                        borderRadius: 2,
                        fontWeight: 700,
                        '&:hover': { bgcolor: '#3A8BC2' },
                      }}
                    >
                      {t.cta.partnerInquiry}
                    </Button>
                    <Button
                      component={Link}
                      href="/contact?type=security_packet"
                      variant="outlined"
                      size="large"
                      startIcon={<SecurityIcon />}
                      sx={{
                        borderColor: 'rgba(255,255,255,0.3)',
                        color: 'white',
                        px: 4,
                        py: 1.5,
                        borderRadius: 2,
                        fontWeight: 700,
                        '&:hover': {
                          borderColor: 'rgba(255,255,255,0.6)',
                          bgcolor: 'rgba(255,255,255,0.05)',
                        },
                      }}
                    >
                      {t.cta.securityPacket}
                    </Button>
                  </Box>
                </Box>
              </Card>
            </MotionBox>
          </Container>
        </Box>
      </Box>
      <Footer />
    </>
  );
}
