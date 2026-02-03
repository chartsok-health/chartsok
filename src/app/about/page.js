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
  Button,
} from '@mui/material';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EmailIcon from '@mui/icons-material/Email';
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
      title: '클리닉 중심 설계',
      description: '40년 임상 경험을 바탕으로 실제 진료 워크플로우에 맞게 설계했습니다. EMR을 대체하지 않고, 옆에서 함께 작동합니다.',
      color: '#10B981',
    },
    {
      icon: SpeedIcon,
      title: '기록부터 후속관리까지',
      description: '진료 요약에서 끝나지 않습니다. 환자 안내문, 재내원/리콜 등 후속관리 액션까지 자동화합니다.',
      color: '#4B9CD3',
    },
    {
      icon: SecurityIcon,
      title: '데이터 신중 처리',
      description: '음성 파일은 변환 후 즉시 삭제. 최소 수집, 권한 기반 접근, AES-256 암호화가 기본입니다.',
      color: '#EF4444',
    },
    {
      icon: PsychologyIcon,
      title: '맞춤형 솔루션',
      description: '전문과별 템플릿과 EMR 필드 매핑을 제공합니다. PoC/파일럿으로 병원에 맞게 적용합니다.',
      color: '#8B5CF6',
    },
  ],
  en: [
    {
      icon: LocalHospitalIcon,
      title: 'Built for Clinics',
      description: 'Designed around real clinical workflows from 40 years of experience. Works alongside your EMR, not instead of it.',
      color: '#10B981',
    },
    {
      icon: SpeedIcon,
      title: 'From Charts to Follow-up',
      description: 'Goes beyond visit summaries. Automates patient instructions, recall management, and follow-up actions.',
      color: '#4B9CD3',
    },
    {
      icon: SecurityIcon,
      title: 'Careful Data Handling',
      description: 'Audio deleted after transcription. Minimal data collection, role-based access, AES-256 encryption by default.',
      color: '#EF4444',
    },
    {
      icon: PsychologyIcon,
      title: 'Tailored Solutions',
      description: 'Specialty templates and EMR field mapping included. Deployed via PoC/pilot tailored to your clinic.',
      color: '#8B5CF6',
    },
  ],
};

const stats = {
  ko: [
    { value: '40년', label: '임상 경험 기반 설계' },
    { value: '70%', label: '진료 후 기록 시간 절감' },
    { value: '3가지', label: '핵심 자동화 (요약·안내·액션)' },
    { value: '6개', label: '전문과 맞춤 템플릿' },
  ],
  en: [
    { value: '40 yrs', label: 'Clinical Experience in Design' },
    { value: '70%', label: 'Less Time on Post-Visit Work' },
    { value: '3 Core', label: 'Automations (Summary·Instructions·Actions)' },
    { value: '6', label: 'Specialty Templates' },
  ],
};

const team = {
  ko: [
    { name: '박준호', role: 'CEO & 공동창업자', desc: '소프트웨어 엔지니어. 미국에서 컴퓨터공학을 전공하고 미국 테크 기업에서 풀스택 개발자로 근무했습니다. AI/ML, 클라우드 인프라, 의료 데이터 보안에 전문성을 갖추고 있으며, 아버지의 40년 임상 경험을 AI 기술로 풀어내 의사들의 진짜 문제를 해결합니다.' },
    { name: '박선홍', role: '공동창업자 & 의료 자문', desc: '이비인후과 전문의. 의과대학 졸업, 의학 석사·박사 학위 취득 후 대학병원 수련을 마치고, 외래교수, 이비인후과의원 원장, 종합병원 과장을 거쳐 현재 공공의료원 이비인후과장으로 40년간 환자를 진료하며 쌓은 경험을 제품에 담습니다.' },
  ],
  en: [
    { name: 'Junho Park', role: 'CEO & Co-founder', desc: 'Software Engineer. Studied Computer Science in the US and worked as a full-stack developer at US tech companies. Specialized in AI/ML, cloud infrastructure, and healthcare data security, translating 40 years of clinical experience into AI technology to solve real problems for doctors.' },
    { name: 'SeungHong Park', role: 'Co-founder & Medical Advisor', desc: 'ENT Specialist with M.D., M.S., and Ph.D. After completing residency at a university hospital, served as adjunct professor, ENT clinic director, and hospital department head. Currently Chief of ENT at a public medical center, bringing 40 years of patient care experience to the product.' },
  ],
};

const content = {
  ko: {
    badge: '회사 소개',
    title: '아버지의 40년, 아들의 기술',
    subtitle: '환자에게 정성을 다하고 싶었던 의사 아버지와, 그 꿈을 기술로 실현하려는 아들이 함께 만든 chartsok입니다. 진료 요약부터 후속관리까지, 클리닉 운영을 돕는 업무툴을 만듭니다.',
    missionTitle: '우리의 미션',
    missionText: '모든 의사가 차트가 아닌 환자의 눈을 바라볼 수 있는 세상. 40년간 진료실에서 느꼈던 아쉬움을 기술로 해결합니다. 진료 기록 자동화에서 끝나지 않고, 환자 안내문 생성과 재내원/리콜 관리까지 — 클리닉의 전체 워크플로우를 개선합니다.',
    storyTitle: '아버지와 아들의 이야기',
    storyText1: '"아들아, 나는 40년간 환자들에게 정성을 다하고 싶었어. 그런데 차트 쓰는 시간이 너무 많았어. 환자 눈 보면서 이야기하고 싶은데, 컴퓨터 화면만 봐야 했거든." 이비인후과 전문의로 40년을 보낸 아버지의 말씀이었습니다.',
    storyText2: '그 말을 들은 아들은 결심했습니다. 아버지처럼 환자에게 정성을 다하고 싶은 모든 의사들을 위해, 기술로 이 문제를 해결하겠다고. 그렇게 아버지와 아들이 함께 chartsok을 시작했습니다. 차트 작성뿐 아니라 후속관리까지, 클리닉 운영 전반을 돕는 솔루션을 만들어갑니다.',
    valuesTitle: '핵심 가치',
    statsTitle: 'chartsok의 시작',
    teamTitle: '창업 팀',
    joinTitle: '데모를 요청하세요',
    joinText: '진료 요약 + 후속관리 자동화가 우리 병원에 어떻게 적용되는지 확인해보세요. PoC / 파일럿 프로그램으로 맞춤 적용합니다.',
    joinButton: '데모 요청하기',
    contactButton: '문의하기',
  },
  en: {
    badge: 'About Us',
    title: "A Father's 40 Years, A Son's Technology",
    subtitle: 'chartsok was born from a doctor father who wanted to give heartfelt care to patients, and a son who turned that dream into reality through technology. We build workflow tools that help clinics — from visit summaries to follow-up automation.',
    missionTitle: 'Our Mission',
    missionText: "A world where every doctor can look into their patient's eyes instead of staring at charts. We solve the frustrations felt in clinics for 40 years through technology. Beyond chart automation — patient instructions, recall management, and the full clinic workflow.",
    storyTitle: 'A Father and Son Story',
    storyText1: '"Son, for 40 years I wanted to give my patients heartfelt care. But I spent so much time writing charts. I wanted to talk to my patients while looking at them, but I had to stare at the computer screen." These were the words of my father, an ENT specialist for 40 years.',
    storyText2: "Hearing those words, I made a decision. For all doctors who, like my father, want to give heartfelt care to their patients, I would solve this problem with technology. That's how my father and I started chartsok together. Beyond charting — we're building a solution that helps with the full clinic workflow.",
    valuesTitle: 'Core Values',
    statsTitle: 'The Beginning of chartsok',
    teamTitle: 'Founding Team',
    joinTitle: 'Request a Demo',
    joinText: 'See how visit summaries + follow-up automation can work for your clinic. We offer PoC / pilot programs tailored to your workflow.',
    joinButton: 'Request Demo',
    contactButton: 'Contact Us',
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
          <Grid container spacing={4} justifyContent="center">
            {currentTeam.map((member, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 5 }} key={index}>
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.15 }}
                  whileHover={{ y: -4 }}
                >
                  <Card
                    elevation={0}
                    sx={{
                      p: 4,
                      textAlign: 'center',
                      border: '1px solid',
                      borderColor: index === 0 ? 'primary.main' : 'secondary.main',
                      borderRadius: 4,
                      background: index === 0
                        ? 'linear-gradient(135deg, rgba(75, 156, 211, 0.03) 0%, rgba(139, 92, 246, 0.03) 100%)'
                        : 'linear-gradient(135deg, rgba(15, 42, 68, 0.02) 0%, rgba(30, 74, 111, 0.02) 100%)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: index === 0 ? 'primary.main' : 'secondary.main',
                        boxShadow: index === 0
                          ? '0 8px 30px rgba(75, 156, 211, 0.15)'
                          : '0 8px 30px rgba(15, 42, 68, 0.15)',
                      },
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 100,
                        height: 100,
                        mx: 'auto',
                        mb: 3,
                        bgcolor: index === 0 ? 'primary.main' : 'secondary.main',
                        fontSize: '2rem',
                        fontWeight: 700,
                        boxShadow: index === 0
                          ? '0 4px 20px rgba(75, 156, 211, 0.3)'
                          : '0 4px 20px rgba(15, 42, 68, 0.2)',
                      }}
                    >
                      {member.name.charAt(0)}
                    </Avatar>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                      {member.name}
                    </Typography>
                    <Chip
                      label={member.role}
                      sx={{
                        mb: 2,
                        bgcolor: index === 0 ? 'primary.main' : 'secondary.main',
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '0.8rem',
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        lineHeight: 1.8,
                        fontSize: '0.95rem',
                      }}
                    >
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
              <Button
                variant="outlined"
                size="large"
                href="/contact"
                startIcon={<EmailIcon />}
                sx={{
                  color: 'white',
                  borderColor: 'white',
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                {t.contactButton}
              </Button>
            </Card>
          </Container>
        </Box>
      </Box>
      <Footer />
    </>
  );
}
