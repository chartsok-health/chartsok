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
import SecurityIcon from '@mui/icons-material/Security';
import LockIcon from '@mui/icons-material/Lock';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ShieldIcon from '@mui/icons-material/Shield';
import StorageIcon from '@mui/icons-material/Storage';
import CloudIcon from '@mui/icons-material/Cloud';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import PolicyIcon from '@mui/icons-material/Policy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmailIcon from '@mui/icons-material/Email';
import { useI18n } from '@/lib/i18n';

const MotionBox = motion.create(Box);

const content = {
  ko: {
    badge: '보안',
    title: '데이터 보안 원칙',
    subtitle: '환자의 의료 정보를 안전하게 보호합니다. chartsok은 의료 데이터 보안을 최우선으로 생각합니다.',
    certifications: [
      { name: '개인정보보호법', desc: '대한민국 개인정보 보호법 준수' },
      { name: '의료법', desc: '의료 데이터 보호 규정 준수' },
      { name: 'SSL/TLS', desc: '전송 구간 암호화' },
    ],
    sections: [
      {
        icon: LockIcon,
        title: '데이터 암호화',
        desc: '모든 데이터는 안전하게 암호화됩니다.',
        color: '#4B9CD3',
        items: [
          'AES-256 암호화로 저장 데이터 보호',
          'TLS를 통한 전송 중 데이터 암호화',
          'HTTPS 적용',
          '안전한 키 관리',
        ],
      },
      {
        icon: VerifiedUserIcon,
        title: '접근 제어',
        desc: '엄격한 접근 권한 관리로 데이터를 보호합니다.',
        color: '#10B981',
        items: [
          '역할 기반 접근 제어',
          '이메일 인증',
          '세션 관리 및 자동 로그아웃',
          '비밀번호 암호화 저장',
        ],
      },
      {
        icon: StorageIcon,
        title: '인프라 보안',
        desc: '안전한 클라우드 인프라에서 운영됩니다.',
        color: '#F59E0B',
        items: [
          '안전한 클라우드 인프라 사용',
          '데이터베이스 보안 규칙 적용',
          '안전한 API 엔드포인트',
          'CDN 기반 호스팅 보안',
        ],
      },
      {
        icon: PolicyIcon,
        title: '컴플라이언스',
        desc: '대한민국 의료 정보 보호 규정을 준수합니다.',
        color: '#8B5CF6',
        items: [
          '개인정보 보호법 준수',
          '의료법 준수',
          '정보통신망법 준수',
          '전자문서법 준수',
        ],
      },
      {
        icon: CloudIcon,
        title: '데이터 관리',
        desc: '안전한 데이터 관리 체계를 갖추고 있습니다.',
        color: '#EC4899',
        items: [
          '정기적인 데이터 백업',
          '데이터 복구 지원',
          '안전한 데이터 삭제',
          '최소 수집 원칙',
        ],
      },
      {
        icon: VpnKeyIcon,
        title: '보안 개발',
        desc: '보안을 고려한 개발 프로세스를 따릅니다.',
        color: '#14B8A6',
        items: [
          '보안 코드 리뷰',
          '정기적인 업데이트',
          '취약점 모니터링',
          '안전한 의존성 관리',
        ],
      },
    ],
    practices: '보안 원칙',
    practiceItems: [
      '최소 권한 원칙 적용',
      '보안 코드 리뷰 수행',
      '정기적인 의존성 업데이트',
      '안전한 인증 구현',
      '데이터 최소 수집 원칙 준수',
      '개인정보 처리 투명성 확보',
    ],
    contactTitle: '보안에 대해 더 알고 싶으신가요?',
    contactDesc: '보안 백서 요청 또는 보안 관련 질문은 언제든 문의해 주세요.',
    contactButton: '보안 문의',
    email: 'chartsok.health@gmail.com',
    reportTitle: '보안 취약점 신고',
    reportDesc: '보안 취약점을 발견하셨다면 아래 이메일로 제보해 주세요. 책임감 있는 공개를 환영합니다.',
  },
  en: {
    badge: 'Security',
    title: 'Data Security Principles',
    subtitle: 'We protect patient medical information safely. chartsok prioritizes medical data security.',
    certifications: [
      { name: 'PIPA', desc: 'Korea Personal Information Protection Act' },
      { name: 'Medical Act', desc: 'Medical data protection compliance' },
      { name: 'SSL/TLS', desc: 'Transport encryption' },
    ],
    sections: [
      {
        icon: LockIcon,
        title: 'Data Encryption',
        desc: 'All data is securely encrypted.',
        color: '#4B9CD3',
        items: [
          'AES-256 encryption for data at rest',
          'TLS for data in transit',
          'HTTPS enabled',
          'Secure key management',
        ],
      },
      {
        icon: VerifiedUserIcon,
        title: 'Access Control',
        desc: 'Strict access control protects your data.',
        color: '#10B981',
        items: [
          'Role-based access control',
          'Email authentication',
          'Session management and auto-logout',
          'Encrypted password storage',
        ],
      },
      {
        icon: StorageIcon,
        title: 'Infrastructure Security',
        desc: 'Operating on secure cloud infrastructure.',
        color: '#F59E0B',
        items: [
          'Secure cloud infrastructure',
          'Database security rules',
          'Secure API endpoints',
          'CDN-based hosting security',
        ],
      },
      {
        icon: PolicyIcon,
        title: 'Compliance',
        desc: 'Compliant with Korean data protection regulations.',
        color: '#8B5CF6',
        items: [
          'Personal Information Protection Act (PIPA)',
          'Medical Service Act compliance',
          'Information Communications Network Act',
          'Electronic Documents Act',
        ],
      },
      {
        icon: CloudIcon,
        title: 'Data Management',
        desc: 'Secure data management systems in place.',
        color: '#EC4899',
        items: [
          'Regular data backups',
          'Data recovery support',
          'Secure data deletion',
          'Data minimization principle',
        ],
      },
      {
        icon: VpnKeyIcon,
        title: 'Secure Development',
        desc: 'Following secure development practices.',
        color: '#14B8A6',
        items: [
          'Security code reviews',
          'Regular updates',
          'Vulnerability monitoring',
          'Safe dependency management',
        ],
      },
    ],
    practices: 'Security Principles',
    practiceItems: [
      'Least privilege principle',
      'Security code reviews',
      'Regular dependency updates',
      'Safe authentication implementation',
      'Data minimization principle',
      'Transparent data processing',
    ],
    contactTitle: 'Want to learn more about security?',
    contactDesc: 'Request our security whitepaper or ask any security-related questions.',
    contactButton: 'Security Inquiry',
    email: 'chartsok.health@gmail.com',
    reportTitle: 'Report a Vulnerability',
    reportDesc: 'If you discover a security vulnerability, please report it to the email below. We welcome responsible disclosure.',
  },
};

export default function SecurityPage() {
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
              <Chip label={t.badge} sx={{ mb: 3, bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 600 }} />
              <Typography variant="h2" sx={{ fontWeight: 800, mb: 3, fontSize: { xs: '2rem', md: '3rem' } }}>
                {t.title}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 400, lineHeight: 1.8, opacity: 0.9, mb: 4 }}>
                {t.subtitle}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                {t.certifications.map((cert) => (
                  <Card
                    key={cert.name}
                    elevation={0}
                    sx={{
                      p: 2,
                      bgcolor: 'rgba(255,255,255,0.1)',
                      borderRadius: 2,
                      minWidth: 140,
                    }}
                  >
                    <ShieldIcon sx={{ color: '#10B981', mb: 1 }} />
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'white' }}>
                      {cert.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                      {cert.desc}
                    </Typography>
                  </Card>
                ))}
              </Box>
            </MotionBox>
          </Container>
        </Box>

        {/* Security Sections */}
        <Container maxWidth="xl" sx={{ py: { xs: 6, md: 8 } }}>
          <Grid container spacing={3}>
            {t.sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                  <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card elevation={0} sx={{ p: 3, height: '100%', border: '1px solid', borderColor: 'grey.200', borderRadius: 3 }}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 2,
                          bgcolor: `${section.color}15`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 2,
                        }}
                      >
                        <Icon sx={{ color: section.color }} />
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>{section.title}</Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>{section.desc}</Typography>
                      <List dense>
                        {section.items.map((item, i) => (
                          <ListItem key={i} disableGutters sx={{ py: 0.25 }}>
                            <ListItemIcon sx={{ minWidth: 28 }}>
                              <CheckCircleIcon sx={{ fontSize: 16, color: section.color }} />
                            </ListItemIcon>
                            <ListItemText
                              primary={item}
                              primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
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

        {/* Security Practices */}
        <Box sx={{ bgcolor: 'white', py: { xs: 6, md: 8 } }}>
          <Container maxWidth="xl">
            <Typography variant="h4" sx={{ fontWeight: 700, color: 'secondary.main', mb: 4, textAlign: 'center' }}>
              {t.practices}
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              {t.practiceItems.map((item, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                  <Card
                    elevation={0}
                    sx={{
                      p: 2.5,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      border: '1px solid',
                      borderColor: 'grey.200',
                      borderRadius: 2,
                    }}
                  >
                    <CheckCircleIcon sx={{ color: '#10B981' }} />
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>{item}</Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Contact CTA */}
        <Container maxWidth="xl" sx={{ py: { xs: 6, md: 8 } }}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  background: 'linear-gradient(135deg, #4B9CD3 0%, #3A7BA8 100%)',
                  borderRadius: 3,
                  color: 'white',
                }}
              >
                <SecurityIcon sx={{ fontSize: 40, mb: 2 }} />
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>{t.contactTitle}</Typography>
                <Typography variant="body2" sx={{ mb: 3, opacity: 0.9 }}>{t.contactDesc}</Typography>
                <Button
                  variant="outlined"
                  startIcon={<EmailIcon />}
                  href={`mailto:${t.email}`}
                  sx={{ color: 'white', borderColor: 'white', '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' } }}
                >
                  {t.contactButton}
                </Button>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  border: '1px solid',
                  borderColor: 'grey.200',
                  borderRadius: 3,
                }}
              >
                <ShieldIcon sx={{ fontSize: 40, mb: 2, color: '#10B981' }} />
                <Typography variant="h5" sx={{ fontWeight: 700, color: 'secondary.main', mb: 2 }}>{t.reportTitle}</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>{t.reportDesc}</Typography>
                <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 600 }}>{t.email}</Typography>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  );
}
