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
import GavelIcon from '@mui/icons-material/Gavel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmailIcon from '@mui/icons-material/Email';
import { useI18n } from '@/lib/i18n';

const MotionBox = motion.create(Box);

const content = {
  ko: {
    badge: '이용약관',
    title: '서비스 이용약관',
    lastUpdated: '최종 업데이트: 2026년 1월 1일',
    intro: '본 약관은 ChartSok(이하 "회사")이 제공하는 AI 기반 의료 차트 작성 서비스(이하 "서비스")의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임 사항을 규정함을 목적으로 합니다.',
    sections: [
      {
        title: '제1조 (목적)',
        content: '이 약관은 회사가 제공하는 서비스의 이용 조건 및 절차, 회사와 이용자의 권리, 의무 및 책임 사항, 기타 필요한 사항을 규정함을 목적으로 합니다.',
        items: [],
      },
      {
        title: '제2조 (정의)',
        content: '이 약관에서 사용하는 용어의 정의는 다음과 같습니다.',
        items: [
          '"서비스"란 회사가 제공하는 AI 기반 의료 차트 작성 및 관련 서비스를 말합니다.',
          '"이용자"란 이 약관에 따라 회사가 제공하는 서비스를 이용하는 의료인을 말합니다.',
          '"회원"이란 회사에 개인정보를 제공하여 회원등록을 한 자로서, 서비스를 이용하는 자를 말합니다.',
          '"콘텐츠"란 서비스에서 제공되는 텍스트, 음성, 차트 등 모든 형태의 정보를 말합니다.',
        ],
      },
      {
        title: '제3조 (약관의 효력 및 변경)',
        content: '회사는 필요한 경우 약관을 변경할 수 있으며, 변경된 약관은 서비스 내 공지사항을 통해 공지합니다.',
        items: [
          '이 약관은 서비스를 이용하고자 하는 모든 이용자에게 적용됩니다.',
          '회사는 약관의 규제에 관한 법률 등 관련 법을 위반하지 않는 범위에서 약관을 개정할 수 있습니다.',
          '변경된 약관은 공지 후 7일이 경과한 날부터 효력이 발생합니다.',
        ],
      },
      {
        title: '제4조 (서비스의 제공)',
        content: '회사는 다음과 같은 서비스를 제공합니다.',
        items: [
          'AI 기반 음성 인식 및 의료 차트 자동 생성',
          'EMR 시스템 연동 및 데이터 전송',
          '의료 기록 관리 및 조회',
          '기타 회사가 정하는 서비스',
        ],
      },
      {
        title: '제5조 (서비스 이용 조건)',
        content: '서비스는 의료인 자격을 가진 사용자만 이용할 수 있습니다.',
        items: [
          '이용자는 대한민국 의료법에 따른 의료인 자격이 있어야 합니다.',
          '이용자는 서비스를 의료 목적으로만 사용해야 합니다.',
          '이용자는 환자의 동의 하에 음성 녹음을 진행해야 합니다.',
          '이용자는 생성된 차트의 내용을 검토하고 최종 확인할 책임이 있습니다.',
        ],
      },
      {
        title: '제6조 (회원의 의무)',
        content: '회원은 다음 행위를 해서는 안 됩니다.',
        items: [
          '타인의 개인정보를 도용하는 행위',
          '서비스를 이용하여 얻은 정보를 무단으로 복제, 배포하는 행위',
          '서비스의 운영을 고의로 방해하는 행위',
          '관련 법령, 약관, 서비스 이용 안내를 위반하는 행위',
        ],
      },
      {
        title: '제7조 (서비스 이용 제한)',
        content: '회사는 다음의 경우 서비스 이용을 제한할 수 있습니다.',
        items: [
          '회원이 본 약관을 위반한 경우',
          '서비스 운영을 고의로 방해한 경우',
          '불법적인 목적으로 서비스를 이용한 경우',
          '기타 회사가 정한 서비스 정책을 위반한 경우',
        ],
      },
      {
        title: '제8조 (책임의 제한)',
        content: '회사의 책임 범위는 다음과 같습니다.',
        items: [
          '회사는 천재지변, 전쟁 등 불가항력으로 인한 서비스 중단에 대해 책임을 지지 않습니다.',
          'AI가 생성한 차트는 참고용이며, 최종 의료 판단은 이용자인 의료인의 책임입니다.',
          '회사는 이용자가 서비스를 통해 얻은 정보로 인한 손해에 대해 책임을 지지 않습니다.',
          '회사는 이용자 간 또는 이용자와 제3자 간의 분쟁에 대해 책임을 지지 않습니다.',
        ],
      },
      {
        title: '제9조 (지적재산권)',
        content: '서비스에 관한 지적재산권은 다음과 같습니다.',
        items: [
          '서비스에 사용된 소프트웨어, 디자인, 로고 등의 지적재산권은 회사에 귀속됩니다.',
          '이용자가 생성한 의료 차트의 내용에 대한 권리는 이용자에게 귀속됩니다.',
          '이용자는 회사의 지적재산권을 무단으로 복제, 배포, 수정할 수 없습니다.',
        ],
      },
      {
        title: '제10조 (분쟁 해결)',
        content: '서비스 이용과 관련한 분쟁은 다음과 같이 해결합니다.',
        items: [
          '회사와 이용자 간의 분쟁은 상호 협의에 의해 해결합니다.',
          '협의가 이루어지지 않을 경우, 대한민국 법원을 관할 법원으로 합니다.',
          '준거법은 대한민국 법으로 합니다.',
        ],
      },
    ],
    contact: '약관에 대한 문의: chartsok.health@gmail.com',
  },
  en: {
    badge: 'Terms of Service',
    title: 'Terms of Service',
    lastUpdated: 'Last Updated: January 1, 2026',
    intro: 'These Terms of Service govern your use of ChartSok\'s AI-based medical charting service and establish the rights, obligations, and responsibilities between ChartSok ("Company") and users.',
    sections: [
      {
        title: 'Article 1 (Purpose)',
        content: 'The purpose of these Terms is to define the conditions and procedures for using the Service, as well as the rights, obligations, and responsibilities of the Company and users.',
        items: [],
      },
      {
        title: 'Article 2 (Definitions)',
        content: 'The terms used in these Terms are defined as follows.',
        items: [
          '"Service" refers to the AI-based medical charting and related services provided by the Company.',
          '"User" refers to healthcare professionals who use the Service in accordance with these Terms.',
          '"Member" refers to a person who has registered by providing personal information to the Company.',
          '"Content" refers to all forms of information provided through the Service, including text, audio, and charts.',
        ],
      },
      {
        title: 'Article 3 (Effect and Amendment)',
        content: 'The Company may amend these Terms as necessary, and amended Terms will be announced through the Service.',
        items: [
          'These Terms apply to all users who wish to use the Service.',
          'The Company may revise the Terms within the scope of applicable laws.',
          'Amended Terms become effective 7 days after announcement.',
        ],
      },
      {
        title: 'Article 4 (Service Provision)',
        content: 'The Company provides the following services.',
        items: [
          'AI-based speech recognition and automatic medical chart generation',
          'EMR system integration and data transfer',
          'Medical record management and retrieval',
          'Other services designated by the Company',
        ],
      },
      {
        title: 'Article 5 (Service Use Conditions)',
        content: 'The Service is only available to users with healthcare professional qualifications.',
        items: [
          'Users must have healthcare professional qualifications under applicable law.',
          'Users must use the Service only for medical purposes.',
          'Users must obtain patient consent before voice recording.',
          'Users are responsible for reviewing and confirming the generated chart content.',
        ],
      },
      {
        title: 'Article 6 (Member Obligations)',
        content: 'Members must not engage in the following activities.',
        items: [
          'Using another person\'s personal information',
          'Unauthorized copying or distribution of information obtained through the Service',
          'Intentionally disrupting Service operation',
          'Violating applicable laws, Terms, or Service guidelines',
        ],
      },
      {
        title: 'Article 7 (Service Restrictions)',
        content: 'The Company may restrict Service use in the following cases.',
        items: [
          'When a member violates these Terms',
          'When Service operation is intentionally disrupted',
          'When the Service is used for illegal purposes',
          'When other Service policies are violated',
        ],
      },
      {
        title: 'Article 8 (Limitation of Liability)',
        content: 'The scope of the Company\'s liability is as follows.',
        items: [
          'The Company is not liable for service interruption due to force majeure.',
          'AI-generated charts are for reference; final medical judgment is the responsibility of the healthcare professional.',
          'The Company is not liable for damages from information obtained through the Service.',
          'The Company is not liable for disputes between users or between users and third parties.',
        ],
      },
      {
        title: 'Article 9 (Intellectual Property)',
        content: 'Intellectual property rights for the Service are as follows.',
        items: [
          'Software, design, logos, and other IP used in the Service belong to the Company.',
          'Rights to the content of medical charts created by users belong to the users.',
          'Users may not copy, distribute, or modify the Company\'s intellectual property without authorization.',
        ],
      },
      {
        title: 'Article 10 (Dispute Resolution)',
        content: 'Disputes related to Service use are resolved as follows.',
        items: [
          'Disputes between the Company and users are resolved through mutual agreement.',
          'If no agreement is reached, Korean courts have jurisdiction.',
          'Governing law is the law of the Republic of Korea.',
        ],
      },
    ],
    contact: 'For inquiries about Terms: chartsok.health@gmail.com',
  },
};

export default function TermsPage() {
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
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: section.items.length > 0 ? 2 : 0, lineHeight: 1.8 }}>
                  {section.content}
                </Typography>
                {section.items.length > 0 && (
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
                )}
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
