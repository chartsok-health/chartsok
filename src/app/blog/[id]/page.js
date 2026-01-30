'use client';

import { useParams } from 'next/navigation';
import {
  Box,
  Container,
  Typography,
  Chip,
  Button,
  Divider,
  Avatar,
  Card,
  Grid,
} from '@mui/material';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ShareIcon from '@mui/icons-material/Share';
import { useI18n } from '@/lib/i18n';

const MotionBox = motion.create(Box);

const blogContent = {
  'ai-medical-charting-future': {
    ko: {
      title: 'AI 의료 차트의 미래: 2025년 트렌드',
      category: 'AI 기술',
      author: 'ChartSok 팀',
      authorRole: '콘텐츠 팀',
      date: '2025년 1월 28일',
      readTime: '5분',
      content: `
## 서론

인공지능 기술의 발전은 의료 분야에 혁명적인 변화를 가져오고 있습니다. 특히 의료 기록 작성 분야에서 AI의 활용은 의사들의 업무 효율성을 크게 향상시키고 있습니다.

## AI 의료 차트의 현재

현재 AI 의료 차트 시스템은 다음과 같은 기능을 제공합니다:

- **음성 인식**: 진료 중 대화를 실시간으로 텍스트로 변환
- **화자 구분**: AI가 의사와 환자의 목소리를 자동으로 구분
- **SOAP 차트 생성**: 변환된 텍스트를 구조화된 SOAP 형식으로 자동 정리
- **의학 용어 인식**: 전문 의학 용어를 정확하게 인식하고 표기

## 2025년 주요 트렌드

### 1. 전문과별 맞춤 AI

각 전문 분야의 특성에 맞춘 AI 모델이 등장하고 있습니다. 내과, 이비인후과, 정형외과 등 각 분야의 특수한 용어와 진료 패턴을 학습한 AI가 더욱 정확한 차트를 생성합니다.

### 2. EMR 완전 통합

AI 차트 시스템과 기존 EMR 시스템의 완전한 통합이 이루어지고 있습니다. 원클릭으로 생성된 차트를 EMR에 전송할 수 있어 업무 효율이 극대화됩니다.

### 3. 실시간 임상 의사결정 지원

AI가 차트 작성뿐만 아니라 진료 중 실시간으로 관련 가이드라인, 약물 상호작용 정보 등을 제공하는 방향으로 발전하고 있습니다.

## 결론

AI 의료 차트 기술은 의사들이 환자 진료에 더 집중할 수 있도록 돕는 핵심 도구가 되고 있습니다. 앞으로 더욱 발전된 기술이 의료 현장의 효율성을 높일 것으로 기대됩니다.
      `,
    },
    en: {
      title: 'The Future of AI Medical Charting: 2025 Trends',
      category: 'AI Technology',
      author: 'ChartSok Team',
      authorRole: 'Content Team',
      date: 'January 28, 2025',
      readTime: '5 min',
      content: `
## Introduction

Advances in artificial intelligence are bringing revolutionary changes to healthcare. In particular, AI in medical documentation is greatly improving physician workflow efficiency.

## Current State of AI Medical Charting

Current AI medical charting systems offer:

- **Speech Recognition**: Real-time transcription of clinical conversations
- **Speaker Identification**: AI automatically distinguishes doctor and patient voices
- **SOAP Chart Generation**: Automatically structures transcribed text into SOAP format
- **Medical Terminology Recognition**: Accurately identifies and notates specialized medical terms

## Key 2025 Trends

### 1. Specialty-Specific AI

AI models tailored to each specialty are emerging. AIs trained on the unique terminology and clinical patterns of internal medicine, ENT, orthopedics, and other fields generate more accurate charts.

### 2. Complete EMR Integration

Full integration between AI charting systems and existing EMR systems is happening. One-click transfer of generated charts to EMR maximizes workflow efficiency.

### 3. Real-time Clinical Decision Support

AI is evolving beyond charting to provide real-time guidelines, drug interaction information, and more during consultations.

## Conclusion

AI medical charting technology is becoming an essential tool helping doctors focus more on patient care. We expect continued technological advances to further improve healthcare efficiency.
      `,
    },
  },
};

// Default content for posts without specific content
const defaultContent = {
  ko: {
    content: `
## 콘텐츠 준비 중

이 글의 상세 내용은 현재 준비 중입니다. 곧 업데이트될 예정이니 잠시만 기다려주세요.

ChartSok 블로그에서는 AI 의료 기술, 효율적인 진료 방법, 그리고 의료 현장의 다양한 이야기를 전해드리고 있습니다.

### 관련 주제
- AI를 활용한 의료 기록 자동화
- SOAP 차트 작성 가이드
- EMR 연동 및 활용 팁
- 의료 현장 효율화 사례

더 많은 콘텐츠를 곧 만나보실 수 있습니다.
    `,
  },
  en: {
    content: `
## Content Coming Soon

The detailed content for this article is currently being prepared. Please check back soon.

The ChartSok blog shares insights on AI medical technology, efficient clinical practices, and stories from the healthcare field.

### Related Topics
- Medical documentation automation with AI
- SOAP charting guide
- EMR integration and tips
- Healthcare workflow optimization cases

More content coming soon.
    `,
  },
};

const postMeta = {
  'soap-chart-guide': {
    ko: { title: 'SOAP 차트 완벽 가이드', category: '의료 가이드', author: '김의료 원장', date: '2025년 1월 25일', readTime: '8분' },
    en: { title: 'Complete SOAP Chart Guide', category: 'Medical Guide', author: 'Dr. Kim', date: 'January 25, 2025', readTime: '8 min' },
  },
  'emr-integration-benefits': {
    ko: { title: 'EMR 연동의 장점: 업무 효율 극대화하기', category: '제품 활용', author: 'ChartSok 팀', date: '2025년 1월 22일', readTime: '6분' },
    en: { title: 'Benefits of EMR Integration', category: 'Product Tips', author: 'ChartSok Team', date: 'January 22, 2025', readTime: '6 min' },
  },
  'voice-recognition-medical': {
    ko: { title: '의료 음성 인식 기술의 현재와 미래', category: 'AI 기술', author: '이기술 CTO', date: '2025년 1월 18일', readTime: '7분' },
    en: { title: 'Medical Voice Recognition: Present and Future', category: 'AI Technology', author: 'Lee, CTO', date: 'January 18, 2025', readTime: '7 min' },
  },
  'doctor-burnout-solution': {
    ko: { title: '의사 번아웃 해결책: 행정 업무 줄이기', category: '의료 현장', author: '박제품 CPO', date: '2025년 1월 15일', readTime: '5분' },
    en: { title: 'Doctor Burnout Solution', category: 'Healthcare', author: 'Park, CPO', date: 'January 15, 2025', readTime: '5 min' },
  },
  'specialty-ai-comparison': {
    ko: { title: '전문과별 AI 어시스턴트 비교', category: '제품 활용', author: 'ChartSok 팀', date: '2025년 1월 10일', readTime: '6분' },
    en: { title: 'Specialty AI Assistants Compared', category: 'Product Tips', author: 'ChartSok Team', date: 'January 10, 2025', readTime: '6 min' },
  },
};

const categoryColors = {
  'AI 기술': '#8B5CF6',
  'AI Technology': '#8B5CF6',
  '의료 가이드': '#10B981',
  'Medical Guide': '#10B981',
  '제품 활용': '#4B9CD3',
  'Product Tips': '#4B9CD3',
  '의료 현장': '#F59E0B',
  'Healthcare': '#F59E0B',
};

export default function BlogPostPage() {
  const params = useParams();
  const { id } = params;
  const { locale } = useI18n();

  const postData = blogContent[id]?.[locale] || blogContent[id]?.ko;
  const meta = postMeta[id]?.[locale] || postMeta[id]?.ko;
  const defaultData = defaultContent[locale] || defaultContent.ko;

  const post = postData || {
    title: meta?.title || 'Blog Post',
    category: meta?.category || 'General',
    author: meta?.author || 'ChartSok Team',
    authorRole: 'ChartSok',
    date: meta?.date || '2025',
    readTime: meta?.readTime || '5분',
    content: defaultData.content,
  };

  const t = {
    back: locale === 'ko' ? '블로그로 돌아가기' : 'Back to Blog',
    share: locale === 'ko' ? '공유' : 'Share',
    relatedTitle: locale === 'ko' ? '관련 글' : 'Related Posts',
  };

  return (
    <>
      <Header />
      <Box sx={{ bgcolor: '#FAFBFC', minHeight: '100vh' }}>
        {/* Hero */}
        <Box
          sx={{
            background: 'linear-gradient(180deg, #EBF5FF 0%, #FAFBFC 100%)',
            pt: { xs: 6, md: 10 },
            pb: { xs: 4, md: 6 },
          }}
        >
          <Container maxWidth="xl">
            <MotionBox initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Button
                component={Link}
                href="/blog"
                startIcon={<ArrowBackIcon />}
                sx={{ mb: 3, color: 'text.secondary' }}
              >
                {t.back}
              </Button>
              <Chip
                label={post.category}
                sx={{
                  mb: 2,
                  bgcolor: `${categoryColors[post.category] || '#4B9CD3'}15`,
                  color: categoryColors[post.category] || '#4B9CD3',
                  fontWeight: 600,
                }}
              />
              <Typography
                variant="h3"
                sx={{ fontWeight: 800, color: 'secondary.main', mb: 3, fontSize: { xs: '1.75rem', md: '2.5rem' }, lineHeight: 1.3 }}
              >
                {post.title}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Avatar sx={{ width: 40, height: 40, bgcolor: 'primary.main' }}>
                    {post.author?.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{post.author}</Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>{post.authorRole}</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <CalendarTodayIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>{post.date}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <AccessTimeIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>{post.readTime}</Typography>
                  </Box>
                </Box>
              </Box>
            </MotionBox>
          </Container>
        </Box>

        {/* Content */}
        <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 } }}>
          <Card elevation={0} sx={{ p: { xs: 3, md: 5 }, border: '1px solid', borderColor: 'grey.200', borderRadius: 3 }}>
            <Box
              sx={{
                '& h2': { fontSize: '1.5rem', fontWeight: 700, mt: 4, mb: 2, color: 'secondary.main' },
                '& h3': { fontSize: '1.25rem', fontWeight: 600, mt: 3, mb: 1.5, color: 'secondary.main' },
                '& p': { lineHeight: 1.9, mb: 2, color: 'text.secondary' },
                '& ul, & ol': { pl: 3, mb: 2, color: 'text.secondary' },
                '& li': { mb: 1, lineHeight: 1.8 },
                '& strong': { color: 'text.primary', fontWeight: 600 },
              }}
              dangerouslySetInnerHTML={{
                __html: post.content
                  .replace(/## (.*)/g, '<h2>$1</h2>')
                  .replace(/### (.*)/g, '<h3>$1</h3>')
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/- (.*)/g, '<li>$1</li>')
                  .replace(/\n\n/g, '</p><p>')
                  .replace(/^/, '<p>')
                  .replace(/$/, '</p>'),
              }}
            />
          </Card>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button variant="outlined" startIcon={<ShareIcon />} sx={{ borderRadius: 2 }}>
              {t.share}
            </Button>
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
}
