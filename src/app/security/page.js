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
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import TimerIcon from '@mui/icons-material/Timer';
import LockIcon from '@mui/icons-material/Lock';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ShieldIcon from '@mui/icons-material/Shield';
import StorageIcon from '@mui/icons-material/Storage';
import CloudIcon from '@mui/icons-material/Cloud';
import PolicyIcon from '@mui/icons-material/Policy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmailIcon from '@mui/icons-material/Email';
import { useI18n } from '@/lib/i18n';

const MotionBox = motion.create(Box);

const content = {
  ko: {
    badge: '데이터 처리 정책',
    title: '데이터를 신중하게 다룹니다',
    subtitle: '차트쏙은 의료 데이터 보호를 위해 명확한 데이터 처리 정책을 운영합니다.',
    // Key differentiators - Audio deletion and retention
    keyPolicies: {
      title: '핵심 데이터 처리 정책',
      items: [
        {
          icon: DeleteForeverIcon,
          title: '음성 파일 즉시 삭제',
          highlight: '변환 완료 후 즉시 삭제',
          description: '녹음된 음성 파일은 텍스트 변환이 완료되는 즉시 서버에서 완전히 삭제됩니다. 음성 파일은 별도로 저장하거나 보관하지 않습니다.',
          details: [
            '음성 파일은 변환 처리 중에만 일시적으로 존재',
            '변환 완료와 동시에 서버에서 영구 삭제',
            '음성 파일의 백업, 복제, 보관 없음',
            '삭제 처리 로그 확인 가능',
          ],
          color: '#EF4444',
        },
        {
          icon: TimerIcon,
          title: '텍스트 보관 기간 설정',
          highlight: '직접 설정 가능',
          description: '변환된 텍스트 기록의 보관 기간을 병원 정책에 맞게 직접 설정할 수 있습니다. 설정한 기간이 지나면 자동으로 삭제됩니다.',
          details: [
            '즉시 삭제 / 7일 / 30일 중 선택',
            '설정 기간 후 자동 삭제',
            '수동 삭제 언제든 가능',
            '삭제 예정일 미리 알림',
          ],
          color: '#F59E0B',
        },
      ],
    },
    // Standard security sections
    sections: [
      {
        icon: LockIcon,
        title: '데이터 암호화',
        desc: '모든 텍스트 데이터는 암호화되어 저장됩니다.',
        color: '#4B9CD3',
        items: [
          'AES-256 암호화로 저장 데이터 보호',
          'TLS 1.3을 통한 전송 중 데이터 암호화',
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
        desc: '국내 클라우드 인프라에서 운영됩니다.',
        color: '#8B5CF6',
        items: [
          '국내 데이터센터 사용',
          '데이터베이스 보안 규칙 적용',
          '안전한 API 엔드포인트',
          '정기적인 보안 점검',
        ],
      },
      {
        icon: PolicyIcon,
        title: '규정 준수',
        desc: '대한민국 의료 정보 보호 규정을 준수합니다.',
        color: '#EC4899',
        items: [
          '개인정보 보호법 준수',
          '의료법 준수',
          '정보통신망법 준수',
          '전자문서법 준수',
        ],
      },
    ],
    principles: '데이터 처리 원칙',
    principleItems: [
      '최소 수집: 서비스 제공에 필요한 최소한의 데이터만 수집합니다.',
      '목적 제한: 수집된 데이터는 명시된 목적으로만 사용됩니다.',
      '보관 기간 명시: 데이터 보관 기간을 명확히 안내하고 기간 후 삭제합니다.',
      '삭제 권리 보장: 사용자는 언제든 자신의 데이터 삭제를 요청할 수 있습니다.',
      '투명한 처리: 데이터 처리 방식을 명확히 안내합니다.',
    ],
    contactTitle: '데이터 처리에 대해 더 알고 싶으신가요?',
    contactDesc: '데이터 처리 정책에 대한 추가 질문이나 보안 백서 요청은 언제든 문의해 주세요.',
    contactButton: '문의하기',
    email: 'chartsok.health@gmail.com',
    reportTitle: '보안 취약점 신고',
    reportDesc: '보안 취약점을 발견하셨다면 아래 이메일로 제보해 주세요. 책임감 있는 공개를 환영합니다.',
  },
  en: {
    badge: 'Data Handling Policy',
    title: 'We Handle Data with Care',
    subtitle: 'ChartSok operates with clear data handling policies to protect medical data.',
    keyPolicies: {
      title: 'Key Data Handling Policies',
      items: [
        {
          icon: DeleteForeverIcon,
          title: 'Audio Deleted Immediately',
          highlight: 'Deleted after transcription',
          description: 'Recorded audio files are completely deleted from our servers as soon as text conversion is complete. We do not store or retain audio files.',
          details: [
            'Audio exists only temporarily during processing',
            'Permanently deleted upon conversion completion',
            'No backup, copy, or retention of audio',
            'Deletion logs available for verification',
          ],
          color: '#EF4444',
        },
        {
          icon: TimerIcon,
          title: 'Configurable Text Retention',
          highlight: 'You control the period',
          description: 'Configure how long transcribed text is retained according to your practice policy. Text is automatically deleted after your configured period.',
          details: [
            'Choose: Immediate / 7 days / 30 days',
            'Auto-deletion after set period',
            'Manual deletion available anytime',
            'Deletion reminders before scheduled date',
          ],
          color: '#F59E0B',
        },
      ],
    },
    sections: [
      {
        icon: LockIcon,
        title: 'Data Encryption',
        desc: 'All text data is encrypted for storage.',
        color: '#4B9CD3',
        items: [
          'AES-256 encryption for data at rest',
          'TLS 1.3 for data in transit',
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
        desc: 'Operating on Korean cloud infrastructure.',
        color: '#8B5CF6',
        items: [
          'Korean data center',
          'Database security rules',
          'Secure API endpoints',
          'Regular security audits',
        ],
      },
      {
        icon: PolicyIcon,
        title: 'Regulatory Compliance',
        desc: 'Compliant with Korean data protection regulations.',
        color: '#EC4899',
        items: [
          'Personal Information Protection Act (PIPA)',
          'Medical Service Act compliance',
          'Information Communications Network Act',
          'Electronic Documents Act',
        ],
      },
    ],
    principles: 'Data Handling Principles',
    principleItems: [
      'Minimization: We collect only the minimum data necessary for the service.',
      'Purpose limitation: Collected data is used only for stated purposes.',
      'Retention clarity: Data retention periods are clearly communicated and enforced.',
      'Deletion rights: Users can request deletion of their data at any time.',
      'Transparency: Data handling practices are clearly communicated.',
    ],
    contactTitle: 'Want to learn more about our data handling?',
    contactDesc: 'Contact us for additional questions about our data handling policy or to request our security whitepaper.',
    contactButton: 'Contact Us',
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
              <Typography variant="h6" sx={{ fontWeight: 400, lineHeight: 1.8, opacity: 0.9 }}>
                {t.subtitle}
              </Typography>
            </MotionBox>
          </Container>
        </Box>

        {/* Key Data Handling Policies - Primary differentiator */}
        <Container maxWidth="xl" sx={{ py: { xs: 6, md: 8 } }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: 'secondary.main', mb: 4, textAlign: 'center' }}>
            {t.keyPolicies.title}
          </Typography>
          <Grid container spacing={4}>
            {t.keyPolicies.items.map((policy, index) => {
              const Icon = policy.icon;
              return (
                <Grid size={{ xs: 12, md: 6 }} key={index}>
                  <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15 }}
                  >
                    <Card
                      elevation={0}
                      sx={{
                        p: 4,
                        height: '100%',
                        border: '2px solid',
                        borderColor: policy.color,
                        borderRadius: 3,
                        bgcolor: 'white',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
                        <Box
                          sx={{
                            width: 64,
                            height: 64,
                            borderRadius: 2,
                            bgcolor: `${policy.color}15`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          <Icon sx={{ fontSize: 32, color: policy.color }} />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Chip
                            label={policy.highlight}
                            size="small"
                            sx={{
                              mb: 1.5,
                              bgcolor: `${policy.color}15`,
                              color: policy.color,
                              fontWeight: 600,
                              fontSize: '0.75rem',
                            }}
                          />
                          <Typography variant="h5" sx={{ fontWeight: 700, color: 'secondary.main', mb: 1.5 }}>
                            {policy.title}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.7 }}>
                            {policy.description}
                          </Typography>
                          <List dense>
                            {policy.details.map((detail, i) => (
                              <ListItem key={i} disableGutters sx={{ py: 0.25 }}>
                                <ListItemIcon sx={{ minWidth: 28 }}>
                                  <CheckCircleIcon sx={{ fontSize: 16, color: policy.color }} />
                                </ListItemIcon>
                                <ListItemText
                                  primary={detail}
                                  primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                                />
                              </ListItem>
                            ))}
                          </List>
                        </Box>
                      </Box>
                    </Card>
                  </MotionBox>
                </Grid>
              );
            })}
          </Grid>
        </Container>

        {/* Standard Security Sections */}
        <Box sx={{ bgcolor: 'white', py: { xs: 6, md: 8 } }}>
          <Container maxWidth="xl">
            <Grid container spacing={3}>
              {t.sections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
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
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, fontSize: '1rem' }}>{section.title}</Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, fontSize: '0.875rem' }}>{section.desc}</Typography>
                        <List dense>
                          {section.items.map((item, i) => (
                            <ListItem key={i} disableGutters sx={{ py: 0.25 }}>
                              <ListItemIcon sx={{ minWidth: 24 }}>
                                <CheckCircleIcon sx={{ fontSize: 14, color: section.color }} />
                              </ListItemIcon>
                              <ListItemText
                                primary={item}
                                primaryTypographyProps={{ variant: 'body2', color: 'text.secondary', fontSize: '0.8rem' }}
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
        </Box>

        {/* Data Handling Principles */}
        <Container maxWidth="xl" sx={{ py: { xs: 6, md: 8 } }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: 'secondary.main', mb: 4, textAlign: 'center' }}>
            {t.principles}
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {t.principleItems.map((item, index) => (
              <Grid size={{ xs: 12, md: 6 }} key={index}>
                <Card
                  elevation={0}
                  sx={{
                    p: 2.5,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 2,
                    border: '1px solid',
                    borderColor: 'grey.200',
                    borderRadius: 2,
                  }}
                >
                  <CheckCircleIcon sx={{ color: '#10B981', mt: 0.25 }} />
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>{item}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

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
                <ShieldIcon sx={{ fontSize: 40, mb: 2 }} />
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>{t.contactTitle}</Typography>
                <Typography variant="body2" sx={{ mb: 3, opacity: 0.9 }}>{t.contactDesc}</Typography>
                <Button
                  variant="outlined"
                  startIcon={<EmailIcon />}
                  href="/contact"
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
