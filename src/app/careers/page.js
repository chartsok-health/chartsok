'use client';

import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Divider,
} from '@mui/material';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WorkIcon from '@mui/icons-material/Work';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GroupsIcon from '@mui/icons-material/Groups';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SchoolIcon from '@mui/icons-material/School';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import EmailIcon from '@mui/icons-material/Email';
import { useI18n } from '@/lib/i18n';

const MotionBox = motion.create(Box);

const content = {
  ko: {
    badge: '채용',
    title: '함께 의료의 미래를 만들어요',
    subtitle: 'ChartSok은 AI로 의료 현장을 혁신하고 있습니다. 열정 있는 분들과 함께 성장하고 싶습니다.',
    whyJoin: '왜 ChartSok인가요?',
    benefits: [
      { icon: RocketLaunchIcon, title: '빠른 성장', desc: '스타트업의 역동적인 환경에서 빠르게 성장할 수 있습니다.' },
      { icon: FavoriteIcon, title: '의미 있는 일', desc: '의사들의 삶을 개선하고 환자 치료에 기여합니다.' },
      { icon: SchoolIcon, title: '학습 문화', desc: '컨퍼런스 참석, 도서 구입 등 학습을 지원합니다.' },
      { icon: LocalCafeIcon, title: '유연한 근무', desc: '재택근무, 유연 출퇴근제를 지원합니다.' },
      { icon: SelfImprovementIcon, title: '워라밸', desc: '연차 자유 사용, 리프레시 휴가를 제공합니다.' },
      { icon: GroupsIcon, title: '좋은 동료', desc: '서로 존중하고 배려하는 문화를 만들어갑니다.' },
    ],
    positions: '채용 중인 포지션',
    jobs: [
      {
        title: 'Senior AI/ML Engineer',
        team: 'AI팀',
        type: '정규직',
        location: '인천 (하이브리드)',
        tags: ['Python', 'PyTorch', 'NLP', 'ASR'],
        desc: '의료 음성 인식 및 자연어 처리 모델을 개발합니다.',
      },
      {
        title: 'Frontend Developer',
        team: '제품팀',
        type: '정규직',
        location: '인천 (하이브리드)',
        tags: ['React', 'Next.js', 'TypeScript'],
        desc: '의사들이 사용하는 직관적인 웹 인터페이스를 개발합니다.',
      },
      {
        title: 'Backend Developer',
        team: '제품팀',
        type: '정규직',
        location: '인천 (하이브리드)',
        tags: ['Node.js', 'Python', 'AWS'],
        desc: '안정적이고 확장 가능한 백엔드 시스템을 구축합니다.',
      },
      {
        title: '.NET Backend Developer',
        team: '제품팀',
        type: '정규직',
        location: '인천 (하이브리드)',
        tags: ['C#', '.NET', 'Azure', 'SQL Server'],
        desc: '.NET 기반 엔터프라이즈 백엔드 솔루션을 개발합니다.',
      },
      {
        title: 'Product Designer',
        team: '디자인팀',
        type: '정규직',
        location: '인천 (하이브리드)',
        tags: ['Figma', 'UX/UI', 'Design System'],
        desc: '의료 전문가를 위한 사용자 경험을 설계합니다.',
      },
      {
        title: 'Customer Success Manager',
        team: '고객팀',
        type: '정규직',
        location: '인천',
        tags: ['의료', 'B2B', '고객 관리'],
        desc: '병원 고객의 성공적인 온보딩과 지속적인 관계를 관리합니다.',
      },
    ],
    apply: '지원하기',
    noPositions: '원하는 포지션이 없나요?',
    noPositionsDesc: '언제든 이력서를 보내주세요. 좋은 인재를 항상 환영합니다.',
    sendResume: '이력서 보내기',
    email: 'chartsok.health@gmail.com',
  },
  en: {
    badge: 'Careers',
    title: 'Build the Future of Healthcare with Us',
    subtitle: 'ChartSok is innovating healthcare with AI. We want to grow with passionate people.',
    whyJoin: 'Why ChartSok?',
    benefits: [
      { icon: RocketLaunchIcon, title: 'Fast Growth', desc: 'Grow rapidly in a dynamic startup environment.' },
      { icon: FavoriteIcon, title: 'Meaningful Work', desc: 'Improve doctors\' lives and contribute to patient care.' },
      { icon: SchoolIcon, title: 'Learning Culture', desc: 'We support conference attendance and book purchases.' },
      { icon: LocalCafeIcon, title: 'Flexible Work', desc: 'Remote work and flexible hours supported.' },
      { icon: SelfImprovementIcon, title: 'Work-Life Balance', desc: 'Unlimited PTO and refresh leave provided.' },
      { icon: GroupsIcon, title: 'Great Colleagues', desc: 'Building a culture of mutual respect and care.' },
    ],
    positions: 'Open Positions',
    jobs: [
      {
        title: 'Senior AI/ML Engineer',
        team: 'AI Team',
        type: 'Full-time',
        location: 'Incheon (Hybrid)',
        tags: ['Python', 'PyTorch', 'NLP', 'ASR'],
        desc: 'Develop medical speech recognition and NLP models.',
      },
      {
        title: 'Frontend Developer',
        team: 'Product Team',
        type: 'Full-time',
        location: 'Incheon (Hybrid)',
        tags: ['React', 'Next.js', 'TypeScript'],
        desc: 'Build intuitive web interfaces for doctors.',
      },
      {
        title: 'Backend Developer',
        team: 'Product Team',
        type: 'Full-time',
        location: 'Incheon (Hybrid)',
        tags: ['Node.js', 'Python', 'AWS'],
        desc: 'Build stable and scalable backend systems.',
      },
      {
        title: '.NET Backend Developer',
        team: 'Product Team',
        type: 'Full-time',
        location: 'Incheon (Hybrid)',
        tags: ['C#', '.NET', 'Azure', 'SQL Server'],
        desc: 'Develop enterprise backend solutions with .NET.',
      },
      {
        title: 'Product Designer',
        team: 'Design Team',
        type: 'Full-time',
        location: 'Incheon (Hybrid)',
        tags: ['Figma', 'UX/UI', 'Design System'],
        desc: 'Design user experiences for medical professionals.',
      },
      {
        title: 'Customer Success Manager',
        team: 'Customer Team',
        type: 'Full-time',
        location: 'Incheon',
        tags: ['Healthcare', 'B2B', 'Customer Management'],
        desc: 'Manage hospital customer onboarding and relationships.',
      },
    ],
    apply: 'Apply',
    noPositions: 'Don\'t see your role?',
    noPositionsDesc: 'Send us your resume anytime. We always welcome great talent.',
    sendResume: 'Send Resume',
    email: 'chartsok.health@gmail.com',
  },
};

export default function CareersPage() {
  const { locale } = useI18n();
  const t = content[locale] || content.ko;

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
              <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 400, lineHeight: 1.8 }}>
                {t.subtitle}
              </Typography>
            </MotionBox>
          </Container>
        </Box>

        {/* Benefits */}
        <Container maxWidth="xl" sx={{ py: { xs: 6, md: 8 } }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: 'secondary.main', mb: 5, textAlign: 'center' }}>
            {t.whyJoin}
          </Typography>
          <Grid container spacing={3}>
            {t.benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                  <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card elevation={0} sx={{ p: 3, height: '100%', border: '1px solid', borderColor: 'grey.200', borderRadius: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                        <Icon sx={{ color: 'primary.main' }} />
                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{benefit.title}</Typography>
                      </Box>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>{benefit.desc}</Typography>
                    </Card>
                  </MotionBox>
                </Grid>
              );
            })}
          </Grid>
        </Container>

        {/* Open Positions */}
        <Box sx={{ bgcolor: 'white', py: { xs: 6, md: 8 } }}>
          <Container maxWidth="xl">
            <Typography variant="h4" sx={{ fontWeight: 700, color: 'secondary.main', mb: 5, textAlign: 'center' }}>
              {t.positions}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {t.jobs.map((job, index) => (
                <MotionBox
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'grey.200', borderRadius: 3 }}>
                    <Grid container alignItems="center" spacing={2}>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>{job.title}</Typography>
                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <GroupsIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>{job.team}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <WorkIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>{job.type}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <LocationOnIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>{job.location}</Typography>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid size={{ xs: 12, md: 4 }}>
                        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                          {job.tags.map((tag) => (
                            <Chip key={tag} label={tag} size="small" sx={{ bgcolor: '#EBF5FF', color: 'primary.main', fontWeight: 500, fontSize: '0.7rem' }} />
                          ))}
                        </Box>
                      </Grid>
                      <Grid size={{ xs: 12, md: 2 }} sx={{ textAlign: { md: 'right' } }}>
                        <Button
                          variant="outlined"
                          href={`mailto:${t.email}?subject=${encodeURIComponent(job.title + ' 지원')}`}
                          sx={{ borderRadius: 2 }}
                        >
                          {t.apply}
                        </Button>
                      </Grid>
                    </Grid>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 2 }}>{job.desc}</Typography>
                  </Card>
                </MotionBox>
              ))}
            </Box>
          </Container>
        </Box>

        {/* CTA */}
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
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>{t.noPositions}</Typography>
            <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>{t.noPositionsDesc}</Typography>
            <Button
              variant="outlined"
              size="large"
              startIcon={<EmailIcon />}
              href={`mailto:${t.email}`}
              sx={{ color: 'white', borderColor: 'white', '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' } }}
            >
              {t.sendResume}
            </Button>
          </Card>
        </Container>
      </Box>
      <Footer />
    </>
  );
}
