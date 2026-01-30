'use client';

import {
  Box,
  Container,
  Typography,
  Card,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SecurityIcon from '@mui/icons-material/Security';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmailIcon from '@mui/icons-material/Email';
import { useI18n } from '@/lib/i18n';

const MotionBox = motion.create(Box);

const content = {
  ko: {
    badge: '개인정보처리방침',
    title: '개인정보처리방침',
    lastUpdated: '최종 업데이트: 2026년 1월 1일',
    intro: 'ChartSok(이하 "회사")은 이용자의 개인정보를 중요시하며, 「개인정보 보호법」 및 관련 법령을 준수하고 있습니다. 본 개인정보처리방침은 회사가 제공하는 서비스 이용과 관련하여 개인정보를 어떻게 수집, 이용, 보관, 파기하는지에 대해 설명합니다.',
    sections: [
      {
        title: '1. 수집하는 개인정보 항목',
        content: '회사는 서비스 제공을 위해 다음과 같은 개인정보를 수집합니다.',
        items: [
          '필수 항목: 이름, 이메일 주소, 비밀번호, 의료기관 정보',
          '선택 항목: 전화번호, 프로필 사진',
          '자동 수집 항목: IP 주소, 쿠키, 서비스 이용 기록, 접속 로그',
          '음성 데이터: 의료 기록 작성을 위한 음성 녹음 (환자 동의 하에)',
        ],
      },
      {
        title: '2. 개인정보 수집 및 이용 목적',
        content: '회사는 수집한 개인정보를 다음의 목적으로 이용합니다.',
        items: [
          '서비스 제공: AI 기반 의료 차트 작성 서비스 제공',
          '회원 관리: 회원 가입, 본인 확인, 서비스 이용',
          '서비스 개선: 서비스 품질 향상 및 새로운 기능 개발',
          '고객 지원: 문의 응대, 공지사항 전달',
          '마케팅: 이벤트 및 프로모션 안내 (동의 시)',
        ],
      },
      {
        title: '3. 개인정보 보유 및 이용 기간',
        content: '회사는 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.',
        items: [
          '회원 정보: 회원 탈퇴 시까지 (법령에 따른 보존 기간 제외)',
          '의료 기록: 의료법에 따라 10년간 보관',
          '결제 정보: 전자상거래법에 따라 5년간 보관',
          '서비스 이용 기록: 3년간 보관 후 파기',
        ],
      },
      {
        title: '4. 개인정보의 제3자 제공',
        content: '회사는 원칙적으로 이용자의 개인정보를 제3자에게 제공하지 않습니다. 다만, 다음의 경우는 예외로 합니다.',
        items: [
          '이용자가 사전에 동의한 경우',
          '법령의 규정에 의한 경우',
          'EMR 연동 시 의료기관으로 데이터 전송 (이용자 동의 하에)',
        ],
      },
      {
        title: '5. 개인정보의 파기',
        content: '회사는 개인정보 보유 기간의 경과, 처리 목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체 없이 해당 개인정보를 파기합니다.',
        items: [
          '전자적 파일: 복구 불가능한 방법으로 영구 삭제',
          '서면 자료: 분쇄하거나 소각하여 파기',
        ],
      },
      {
        title: '6. 이용자의 권리',
        content: '이용자는 언제든지 다음과 같은 권리를 행사할 수 있습니다.',
        items: [
          '개인정보 열람 요구',
          '개인정보 정정 및 삭제 요구',
          '개인정보 처리 정지 요구',
          '동의 철회',
        ],
      },
      {
        title: '7. 개인정보 보호를 위한 기술적/관리적 대책',
        content: '회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.',
        items: [
          'SSL/TLS를 통한 데이터 암호화 전송',
          'AES-256 암호화를 통한 데이터 저장',
          '방화벽 및 침입 탐지 시스템 운영',
          '개인정보 접근 권한 제한 및 접근 기록 관리',
          '정기적인 보안 점검 및 취약점 분석',
        ],
      },
      {
        title: '8. 개인정보 보호책임자',
        content: '회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 이용자의 불만 처리 및 피해 구제를 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.',
        items: [
          '이메일: chartsok.health@gmail.com',
        ],
      },
    ],
    contact: '개인정보 관련 문의는 위 이메일로 연락해 주시기 바랍니다.',
  },
  en: {
    badge: 'Privacy Policy',
    title: 'Privacy Policy',
    lastUpdated: 'Last Updated: January 1, 2026',
    intro: 'ChartSok (hereinafter "Company") values your privacy and complies with the Personal Information Protection Act and related regulations. This Privacy Policy explains how we collect, use, store, and dispose of personal information in connection with our services.',
    sections: [
      {
        title: '1. Personal Information Collected',
        content: 'We collect the following personal information to provide our services.',
        items: [
          'Required: Name, email address, password, healthcare institution information',
          'Optional: Phone number, profile picture',
          'Automatically collected: IP address, cookies, service usage records, access logs',
          'Voice data: Voice recordings for medical record creation (with patient consent)',
        ],
      },
      {
        title: '2. Purpose of Collection and Use',
        content: 'We use the collected personal information for the following purposes.',
        items: [
          'Service provision: AI-based medical charting service',
          'Member management: Registration, identity verification, service use',
          'Service improvement: Quality enhancement and new feature development',
          'Customer support: Inquiry response, notice delivery',
          'Marketing: Event and promotion notifications (with consent)',
        ],
      },
      {
        title: '3. Retention Period',
        content: 'We destroy personal information without delay once the purpose of collection and use has been achieved.',
        items: [
          'Member information: Until account deletion (except legally required retention)',
          'Medical records: 10 years as per medical law',
          'Payment information: 5 years as per e-commerce law',
          'Service usage records: 3 years then destroyed',
        ],
      },
      {
        title: '4. Third-Party Disclosure',
        content: 'We do not provide your personal information to third parties in principle. However, exceptions apply in the following cases.',
        items: [
          'When you have given prior consent',
          'When required by law',
          'When transferring data to healthcare institutions for EMR integration (with user consent)',
        ],
      },
      {
        title: '5. Destruction of Personal Information',
        content: 'We destroy personal information without delay when it is no longer needed after the retention period expires or the purpose of processing is achieved.',
        items: [
          'Electronic files: Permanently deleted using irreversible methods',
          'Paper documents: Destroyed by shredding or incineration',
        ],
      },
      {
        title: '6. Your Rights',
        content: 'You may exercise the following rights at any time.',
        items: [
          'Request to view personal information',
          'Request to correct or delete personal information',
          'Request to suspend processing of personal information',
          'Withdraw consent',
        ],
      },
      {
        title: '7. Technical and Administrative Measures',
        content: 'We take the following measures to ensure the security of personal information.',
        items: [
          'Data transmission encryption via SSL/TLS',
          'Data storage encryption via AES-256',
          'Firewall and intrusion detection system operation',
          'Access rights restriction and access log management',
          'Regular security checks and vulnerability analysis',
        ],
      },
      {
        title: '8. Privacy Officer',
        content: 'We designate a Privacy Officer to oversee personal information processing and handle user complaints and remedies as follows.',
        items: [
          'Email: chartsok.health@gmail.com',
        ],
      },
    ],
    contact: 'For privacy-related inquiries, please contact us at the email above.',
  },
};

export default function PrivacyPage() {
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
              <Typography variant="h2" sx={{ fontWeight: 800, color: 'secondary.main', mb: 2, fontSize: { xs: '2rem', md: '3rem' } }}>
                {t.title}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {t.lastUpdated}
              </Typography>
            </MotionBox>
          </Container>
        </Box>

        {/* Content */}
        <Container maxWidth="xl" sx={{ py: { xs: 6, md: 8 } }}>
          <Card elevation={0} sx={{ p: { xs: 3, md: 6 }, border: '1px solid', borderColor: 'grey.200', borderRadius: 3, maxWidth: 900, mx: 'auto' }}>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, lineHeight: 1.8 }}>
              {t.intro}
            </Typography>

            {t.sections.map((section, index) => (
              <Box key={index} sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'secondary.main', mb: 2 }}>
                  {section.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.8 }}>
                  {section.content}
                </Typography>
                <List dense>
                  {section.items.map((item, i) => (
                    <ListItem key={i} sx={{ py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <CheckCircleIcon sx={{ fontSize: 18, color: 'primary.main' }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={item}
                        primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                      />
                    </ListItem>
                  ))}
                </List>
                {index < t.sections.length - 1 && <Divider sx={{ mt: 3 }} />}
              </Box>
            ))}

            <Box sx={{ mt: 4, p: 3, bgcolor: '#EBF5FF', borderRadius: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
              <EmailIcon sx={{ color: 'primary.main' }} />
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {t.contact}
              </Typography>
            </Box>
          </Card>
        </Container>
      </Box>
      <Footer />
    </>
  );
}
