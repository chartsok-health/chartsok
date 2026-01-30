'use client';

import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
} from '@mui/material';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import GroupsIcon from '@mui/icons-material/Groups';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useI18n } from '@/lib/i18n';

const MotionBox = motion.create(Box);

const values = {
  ko: [
    {
      icon: LocalHospitalIcon,
      title: '환자 중심',
      description: '의사가 환자에게 더 집중할 수 있도록, 행정 업무의 부담을 줄입니다.',
      color: '#4B9CD3',
    },
    {
      icon: SecurityIcon,
      title: '신뢰와 보안',
      description: '개인정보보호법 준수, AES-256 암호화로 환자 정보를 철저히 보호합니다.',
      color: '#10B981',
    },
    {
      icon: PsychologyIcon,
      title: '혁신적 기술',
      description: '최첨단 AI 기술로 의료 현장의 실질적인 문제를 해결합니다.',
      color: '#8B5CF6',
    },
    {
      icon: SpeedIcon,
      title: '효율성 극대화',
      description: '차트 작성 시간을 73% 절감하여 더 많은 환자를 진료할 수 있습니다.',
      color: '#F59E0B',
    },
  ],
  en: [
    {
      icon: LocalHospitalIcon,
      title: 'Patient-Centered',
      description: 'We reduce administrative burden so doctors can focus more on patients.',
      color: '#4B9CD3',
    },
    {
      icon: SecurityIcon,
      title: 'Trust & Security',
      description: 'Privacy compliant with AES-256 encryption to protect patient data.',
      color: '#10B981',
    },
    {
      icon: PsychologyIcon,
      title: 'Innovative Technology',
      description: 'Cutting-edge AI technology solving real problems in healthcare.',
      color: '#8B5CF6',
    },
    {
      icon: SpeedIcon,
      title: 'Maximum Efficiency',
      description: 'Reduce charting time by 73% to see more patients.',
      color: '#F59E0B',
    },
  ],
};

const stats = {
  ko: [
    { value: '500+', label: '도입 병의원' },
    { value: '98%', label: 'AI 정확도' },
    { value: '73%', label: '시간 절감' },
    { value: '50,000+', label: '생성된 차트' },
  ],
  en: [
    { value: '500+', label: 'Clinics Onboarded' },
    { value: '98%', label: 'AI Accuracy' },
    { value: '73%', label: 'Time Saved' },
    { value: '50,000+', label: 'Charts Generated' },
  ],
};

const team = {
  ko: [
    { name: '김의료', role: 'CEO & 공동창업자', desc: '전 삼성서울병원 내과 전문의, 서울대 의대 졸업' },
    { name: '이기술', role: 'CTO & 공동창업자', desc: '전 구글 AI 연구원, KAIST 컴퓨터공학 박사' },
    { name: '박제품', role: 'CPO', desc: '전 네이버 헬스케어 PM, 의료 서비스 기획 10년' },
    { name: '최디자인', role: 'Head of Design', desc: '전 토스 디자이너, 사용자 경험 전문가' },
  ],
  en: [
    { name: 'Dr. Kim', role: 'CEO & Co-founder', desc: 'Former Samsung Medical Center Internist' },
    { name: 'Lee Tech', role: 'CTO & Co-founder', desc: 'Former Google AI Researcher, KAIST PhD' },
    { name: 'Park Product', role: 'CPO', desc: 'Former Naver Healthcare PM, 10 years in medical services' },
    { name: 'Choi Design', role: 'Head of Design', desc: 'Former Toss Designer, UX Expert' },
  ],
};

const content = {
  ko: {
    badge: '회사 소개',
    title: '의료의 미래를 만들어갑니다',
    subtitle: 'ChartSok은 AI 기술로 의사들의 차트 작성 부담을 줄이고, 환자 진료에 더 집중할 수 있는 환경을 만듭니다.',
    missionTitle: '우리의 미션',
    missionText: '모든 의사가 행정 업무가 아닌 환자 치료에 집중할 수 있는 세상을 만듭니다. AI 기술을 통해 의료 현장의 비효율을 제거하고, 의료 서비스의 질을 높입니다.',
    storyTitle: '우리의 이야기',
    storyText1: '2023년, 내과 전문의 출신 CEO와 AI 전문가 CTO가 만나 ChartSok을 시작했습니다. 매일 2-3시간을 차트 작성에 쏟아야 했던 의사의 경험과, AI로 문제를 해결하고자 하는 엔지니어의 열정이 만났습니다.',
    storyText2: '우리는 의사들이 환자를 진료하는 것을 사랑하면서도, 차트 작성에 지쳐가는 것을 보았습니다. 이 문제를 해결하기 위해, 음성 인식과 자연어 처리 기술을 결합한 AI 차트 솔루션을 개발했습니다.',
    valuesTitle: '핵심 가치',
    statsTitle: '숫자로 보는 ChartSok',
    teamTitle: '리더십 팀',
    joinTitle: '함께 성장할 인재를 찾습니다',
    joinText: 'ChartSok과 함께 의료의 미래를 만들어갈 열정 있는 분들을 기다립니다.',
    joinButton: '채용 공고 보기',
  },
  en: {
    badge: 'About Us',
    title: 'Building the Future of Healthcare',
    subtitle: 'ChartSok uses AI technology to reduce charting burden for doctors, allowing them to focus more on patient care.',
    missionTitle: 'Our Mission',
    missionText: 'To create a world where every doctor can focus on patient care, not paperwork. We eliminate inefficiencies in healthcare through AI technology and improve the quality of medical services.',
    storyTitle: 'Our Story',
    storyText1: 'In 2023, our CEO, a former internist, met our CTO, an AI expert, and ChartSok was born. The experience of a doctor who had to spend 2-3 hours daily on charting met the passion of an engineer who wanted to solve problems with AI.',
    storyText2: 'We saw doctors who loved treating patients but were exhausted by documentation. To solve this problem, we developed an AI chart solution combining speech recognition and natural language processing.',
    valuesTitle: 'Core Values',
    statsTitle: 'ChartSok by Numbers',
    teamTitle: 'Leadership Team',
    joinTitle: 'Join Our Team',
    joinText: 'We are looking for passionate people to build the future of healthcare with ChartSok.',
    joinButton: 'View Open Positions',
  },
};

export default function AboutPage() {
  const { locale } = useI18n();
  const t = content[locale] || content.ko;
  const currentValues = values[locale] || values.ko;
  const currentStats = stats[locale] || stats.ko;
  const currentTeam = team[locale] || team.ko;

  return (
    <>
      <Header />
      <Box sx={{ bgcolor: '#FAFBFC', minHeight: '100vh' }}>
        {/* Hero Section */}
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
              transition={{ duration: 0.6 }}
              sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto' }}
            >
              <Chip
                label={t.badge}
                sx={{
                  mb: 3,
                  bgcolor: 'primary.main',
                  color: 'white',
                  fontWeight: 600,
                  px: 2,
                }}
              />
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  color: 'secondary.main',
                  mb: 3,
                  fontSize: { xs: '2rem', md: '3rem' },
                }}
              >
                {t.title}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: 'text.secondary',
                  fontWeight: 400,
                  lineHeight: 1.8,
                }}
              >
                {t.subtitle}
              </Typography>
            </MotionBox>
          </Container>
        </Box>

        {/* Stats Section */}
        <Container maxWidth="xl" sx={{ py: { xs: 6, md: 8 } }}>
          <Grid container spacing={3}>
            {currentStats.map((stat, index) => (
              <Grid size={{ xs: 6, md: 3 }} key={index}>
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card
                    elevation={0}
                    sx={{
                      textAlign: 'center',
                      p: 3,
                      border: '1px solid',
                      borderColor: 'grey.200',
                      borderRadius: 3,
                    }}
                  >
                    <Typography
                      variant="h3"
                      sx={{ fontWeight: 800, color: 'primary.main', mb: 1 }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {stat.label}
                    </Typography>
                  </Card>
                </MotionBox>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Mission Section */}
        <Container maxWidth="xl" sx={{ py: { xs: 6, md: 8 } }}>
          <Grid container spacing={6} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <MotionBox
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 700, color: 'secondary.main', mb: 3 }}
                >
                  {t.missionTitle}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: 'text.secondary', lineHeight: 1.9, fontSize: '1.1rem' }}
                >
                  {t.missionText}
                </Typography>
              </MotionBox>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <MotionBox
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Box
                  sx={{
                    p: 4,
                    bgcolor: 'white',
                    borderRadius: 4,
                    border: '1px solid',
                    borderColor: 'grey.200',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        bgcolor: '#FEF2F2',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <FavoriteIcon sx={{ color: '#EF4444' }} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {t.storyTitle}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 2 }}
                  >
                    {t.storyText1}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', lineHeight: 1.8 }}
                  >
                    {t.storyText2}
                  </Typography>
                </Box>
              </MotionBox>
            </Grid>
          </Grid>
        </Container>

        {/* Values Section */}
        <Box sx={{ bgcolor: 'white', py: { xs: 6, md: 8 } }}>
          <Container maxWidth="xl">
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, color: 'secondary.main', mb: 5, textAlign: 'center' }}
            >
              {t.valuesTitle}
            </Typography>
            <Grid container spacing={3}>
              {currentValues.map((value, index) => {
                const Icon = value.icon;
                return (
                  <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                    <MotionBox
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Card
                        elevation={0}
                        sx={{
                          p: 3,
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
                            borderRadius: 3,
                            bgcolor: `${value.color}15`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mx: 'auto',
                            mb: 2,
                          }}
                        >
                          <Icon sx={{ color: value.color, fontSize: 28 }} />
                        </Box>
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: 700, mb: 1, color: 'secondary.main' }}
                        >
                          {value.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {value.description}
                        </Typography>
                      </Card>
                    </MotionBox>
                  </Grid>
                );
              })}
            </Grid>
          </Container>
        </Box>

        {/* Team Section */}
        <Container maxWidth="xl" sx={{ py: { xs: 6, md: 8 } }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, color: 'secondary.main', mb: 5, textAlign: 'center' }}
          >
            {t.teamTitle}
          </Typography>
          <Grid container spacing={3}>
            {currentTeam.map((member, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card
                    elevation={0}
                    sx={{
                      p: 3,
                      textAlign: 'center',
                      border: '1px solid',
                      borderColor: 'grey.200',
                      borderRadius: 3,
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 80,
                        height: 80,
                        mx: 'auto',
                        mb: 2,
                        bgcolor: 'primary.main',
                        fontSize: '1.5rem',
                        fontWeight: 700,
                      }}
                    >
                      {member.name.charAt(0)}
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                      {member.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: 'primary.main', fontWeight: 600, mb: 1 }}
                    >
                      {member.role}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {member.desc}
                    </Typography>
                  </Card>
                </MotionBox>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* CTA Section */}
        <Box sx={{ bgcolor: 'white', py: { xs: 6, md: 8 } }}>
          <Container maxWidth="xl">
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
              <GroupsIcon sx={{ fontSize: 48, mb: 2, opacity: 0.9 }} />
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                {t.joinTitle}
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
                {t.joinText}
              </Typography>
            </Card>
          </Container>
        </Box>
      </Box>
      <Footer />
    </>
  );
}
