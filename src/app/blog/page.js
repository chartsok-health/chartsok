'use client';

import { useState, useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  TextField,
  InputAdornment,
} from '@mui/material';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchIcon from '@mui/icons-material/Search';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useI18n } from '@/lib/i18n';

const MotionBox = motion.create(Box);
const MotionCard = motion.create(Card);

const blogPosts = {
  ko: [
    {
      id: 'why-we-built-chartsok',
      title: '왜 차트쏙을 만들었나: 아버지의 40년에서 시작된 이야기',
      excerpt: '이비인후과 전문의 아버지의 40년 임상 경험에서 발견한 문제. 환자 눈을 보고 싶었던 의사와, 그 문제를 기술로 풀겠다고 나선 아들의 창업기.',
      category: '창업 이야기',
      author: '박준호',
      date: '2026-01-30',
      readTime: '6분',
    },
    {
      id: 'soap-chart-with-ai',
      title: 'SOAP 차트 작성, AI가 대신해준다면?',
      excerpt: 'SOAP 형식의 의료 기록을 수작업으로 쓰는 시대는 끝나가고 있습니다. AI 자동 생성의 현실과 한계, 그리고 차트쏙의 접근법.',
      category: '제품 인사이트',
      author: '박준호',
      date: '2026-01-26',
      readTime: '7분',
    },
    {
      id: 'emr-without-switching',
      title: 'EMR을 바꾸지 않고도 차트 시간을 줄이는 법',
      excerpt: '기존 EMR을 유지하면서 AI 차트를 도입하는 현실적인 방법. 클립보드 복사부터 API 연동까지, 단계별 접근법을 소개합니다.',
      category: '제품 인사이트',
      author: '박준호',
      date: '2026-01-22',
      readTime: '5분',
    },
    {
      id: 'voice-recognition-in-clinics',
      title: '진료실 음성인식, 어디까지 왔나',
      excerpt: '한국어 의료 음성인식의 현재 수준과 한계. 화자 분리, 의학 용어 인식, 방언 처리 등 실제 진료실에서 겪는 기술적 도전들.',
      category: '의료 AI',
      author: '박준호',
      date: '2026-01-18',
      readTime: '8분',
    },
    {
      id: 'doctor-burnout-after-clinic',
      title: '의사 번아웃의 숨은 원인: 진료 후 30분',
      excerpt: '진료는 끝났지만 업무는 끝나지 않습니다. 차트 작성, 환자 안내, 리콜 관리 — 진료 후 30분이 번아웃을 만드는 이유.',
      category: '클리닉 운영',
      author: '박준호',
      date: '2026-01-14',
      readTime: '5분',
    },
    {
      id: 'why-specialty-ai-models',
      title: '전문과별 AI 모델은 왜 필요한가',
      excerpt: '내과와 이비인후과의 차트는 완전히 다릅니다. 범용 AI로는 해결할 수 없는 전문과 특화 AI의 필요성과 차트쏙의 접근 방식.',
      category: '의료 AI',
      author: '박준호',
      date: '2026-01-10',
      readTime: '6분',
    },
    {
      id: 'patient-instructions-automation',
      title: '환자 안내문, 수작업에서 자동화로',
      excerpt: '진료 후 환자에게 전달하는 안내문을 매번 손으로 작성하고 계신가요? AI 기반 안내문 자동 생성이 클리닉에 가져오는 변화.',
      category: '제품 인사이트',
      author: '박준호',
      date: '2026-01-06',
      readTime: '5분',
    },
    {
      id: 'recall-management-revenue',
      title: '리콜 관리가 매출에 미치는 영향',
      excerpt: '재내원 환자를 놓치면 매출이 빠집니다. 수작업 리콜 관리의 한계와 자동화가 가져오는 매출 안정화 효과를 정리합니다.',
      category: '클리닉 운영',
      author: '박준호',
      date: '2026-01-02',
      readTime: '6분',
    },
    {
      id: 'medical-data-security-basics',
      title: '의료 데이터 보안, 어디까지 챙겨야 하나',
      excerpt: 'AI 차트 서비스 도입 시 반드시 확인해야 할 보안 체크리스트. 개인정보보호법, 의료법 관점에서 정리합니다.',
      category: '보안/규정',
      author: '박준호',
      date: '2025-12-28',
      readTime: '7분',
    },
    {
      id: 'ai-scribe-comparison-2025',
      title: '2025년 AI 메디컬 스크라이브 비교: 요약에서 끝나면 안 되는 이유',
      excerpt: '국내외 AI 메디컬 스크라이브 서비스를 비교합니다. 녹음-텍스트 변환만 하는 서비스와 후속관리까지 돕는 서비스의 차이.',
      category: '의료 AI',
      author: '박준호',
      date: '2025-12-22',
      readTime: '8분',
    },
    {
      id: 'clinic-workflow-optimization',
      title: '소규모 클리닉 워크플로우 최적화 가이드',
      excerpt: '의사 1~3명 규모 클리닉에서 진료 효율을 높이는 실용적인 방법. 접수부터 후속관리까지 단계별 개선 포인트.',
      category: '클리닉 운영',
      author: '박준호',
      date: '2025-12-15',
      readTime: '7분',
    },
    {
      id: 'future-of-clinic-ai',
      title: '클리닉 AI의 미래: 기록을 넘어 운영까지',
      excerpt: 'AI가 진료 기록만 돕는 시대는 지나고 있습니다. 예약, 안내, 리콜, 분석까지 — 클리닉 운영 전반을 AI가 돕는 미래를 전망합니다.',
      category: '의료 AI',
      author: '박준호',
      date: '2025-12-08',
      readTime: '6분',
    },
  ],
  en: [
    {
      id: 'why-we-built-chartsok',
      title: 'Why We Built ChartSok: A Story Born From 40 Years of Practice',
      excerpt: 'The problem discovered from my father\'s 40 years as an ENT specialist. A doctor who wanted to look his patients in the eye, and a son who set out to solve it with technology.',
      category: 'Founder Story',
      author: 'Junho Park',
      date: '2026-01-30',
      readTime: '6 min',
    },
    {
      id: 'soap-chart-with-ai',
      title: 'What If AI Wrote Your SOAP Charts?',
      excerpt: 'The era of manually writing SOAP notes is ending. The reality and limits of AI auto-generation, and how ChartSok approaches it.',
      category: 'Product Insight',
      author: 'Junho Park',
      date: '2026-01-26',
      readTime: '7 min',
    },
    {
      id: 'emr-without-switching',
      title: 'Cut Chart Time Without Switching Your EMR',
      excerpt: 'A practical guide to adopting AI charting while keeping your current EMR. From clipboard copy to API integration, step by step.',
      category: 'Product Insight',
      author: 'Junho Park',
      date: '2026-01-22',
      readTime: '5 min',
    },
    {
      id: 'voice-recognition-in-clinics',
      title: 'Voice Recognition in Clinics: How Far Have We Come?',
      excerpt: 'The current state and limits of Korean medical speech recognition. Speaker diarization, medical terminology, dialect handling — real challenges.',
      category: 'Medical AI',
      author: 'Junho Park',
      date: '2026-01-18',
      readTime: '8 min',
    },
    {
      id: 'doctor-burnout-after-clinic',
      title: 'The Hidden Cause of Doctor Burnout: 30 Minutes After the Visit',
      excerpt: 'The consultation is over, but the work isn\'t. Charting, patient instructions, recall management — why those 30 minutes cause burnout.',
      category: 'Clinic Operations',
      author: 'Junho Park',
      date: '2026-01-14',
      readTime: '5 min',
    },
    {
      id: 'why-specialty-ai-models',
      title: 'Why Specialty-Specific AI Models Matter',
      excerpt: 'An internal medicine chart looks nothing like an ENT chart. Why generic AI falls short and how ChartSok builds specialty-specific models.',
      category: 'Medical AI',
      author: 'Junho Park',
      date: '2026-01-10',
      readTime: '6 min',
    },
    {
      id: 'patient-instructions-automation',
      title: 'From Manual to Automated: Patient Instructions',
      excerpt: 'Still writing patient instruction sheets by hand after every visit? How AI-generated instructions change clinic workflows.',
      category: 'Product Insight',
      author: 'Junho Park',
      date: '2026-01-06',
      readTime: '5 min',
    },
    {
      id: 'recall-management-revenue',
      title: 'How Recall Management Impacts Revenue',
      excerpt: 'Missing return patients means lost revenue. The limits of manual recall tracking and how automation stabilizes income.',
      category: 'Clinic Operations',
      author: 'Junho Park',
      date: '2026-01-02',
      readTime: '6 min',
    },
    {
      id: 'medical-data-security-basics',
      title: 'Medical Data Security: What You Need to Check',
      excerpt: 'Essential security checklist when adopting AI charting. Reviewed from the perspective of data protection and medical regulations.',
      category: 'Security',
      author: 'Junho Park',
      date: '2025-12-28',
      readTime: '7 min',
    },
    {
      id: 'ai-scribe-comparison-2025',
      title: '2025 AI Medical Scribe Comparison: Why Summaries Aren\'t Enough',
      excerpt: 'Comparing AI medical scribe services. The difference between transcription-only tools and those that support the full post-visit workflow.',
      category: 'Medical AI',
      author: 'Junho Park',
      date: '2025-12-22',
      readTime: '8 min',
    },
    {
      id: 'clinic-workflow-optimization',
      title: 'Small Clinic Workflow Optimization Guide',
      excerpt: 'Practical methods to improve efficiency for 1-3 doctor clinics. Step-by-step improvements from check-in to follow-up.',
      category: 'Clinic Operations',
      author: 'Junho Park',
      date: '2025-12-15',
      readTime: '7 min',
    },
    {
      id: 'future-of-clinic-ai',
      title: 'The Future of Clinic AI: Beyond Documentation to Operations',
      excerpt: 'AI is moving past just medical records. Scheduling, instructions, recall, analytics — a look at AI-powered clinic operations.',
      category: 'Medical AI',
      author: 'Junho Park',
      date: '2025-12-08',
      readTime: '6 min',
    },
  ],
};

const categories = {
  ko: ['전체', '창업 이야기', '제품 인사이트', '의료 AI', '클리닉 운영', '보안/규정'],
  en: ['All', 'Founder Story', 'Product Insight', 'Medical AI', 'Clinic Operations', 'Security'],
};

const content = {
  ko: {
    badge: '블로그',
    title: 'chartsok 블로그',
    subtitle: '진료실의 진짜 문제, 기술로 푸는 과정, 그리고 클리닉 운영의 인사이트를 나눕니다.',
    search: '블로그 검색...',
    readMore: '자세히 보기',
    featured: '추천 글',
    noResults: '검색 결과가 없습니다.',
  },
  en: {
    badge: 'Blog',
    title: 'chartsok Blog',
    subtitle: 'Real problems in the clinic, solving them with technology, and insights on clinic operations.',
    search: 'Search blog...',
    readMore: 'Read More',
    featured: 'Featured',
    noResults: 'No results found.',
  },
};

const categoryColors = {
  '창업 이야기': '#F59E0B',
  'Founder Story': '#F59E0B',
  '제품 인사이트': '#4B9CD3',
  'Product Insight': '#4B9CD3',
  '의료 AI': '#8B5CF6',
  'Medical AI': '#8B5CF6',
  '클리닉 운영': '#10B981',
  'Clinic Operations': '#10B981',
  '보안/규정': '#EF4444',
  'Security': '#EF4444',
};

export default function BlogPage() {
  const { locale } = useI18n();
  const t = content[locale] || content.ko;
  const posts = blogPosts[locale] || blogPosts.ko;
  const cats = categories[locale] || categories.ko;

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(cats[0]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory = activeCategory === cats[0] || post.category === activeCategory;
      const matchesSearch = searchQuery === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [posts, activeCategory, searchQuery, cats]);

  const featuredPost = filteredPosts[0];
  const otherPosts = filteredPosts.slice(1);

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
              <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 400, lineHeight: 1.8, mb: 4 }}>
                {t.subtitle}
              </Typography>
              <TextField
                placeholder={t.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ maxWidth: 400, width: '100%', bgcolor: 'white', borderRadius: 2 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: 'grey.400' }} />
                    </InputAdornment>
                  ),
                  sx: { borderRadius: 2 },
                }}
              />
            </MotionBox>
          </Container>
        </Box>

        {/* Categories */}
        <Container maxWidth="xl" sx={{ py: 3 }}>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
            {cats.map((cat) => (
              <Chip
                key={cat}
                label={cat}
                clickable
                onClick={() => setActiveCategory(cat)}
                sx={{
                  fontWeight: 500,
                  bgcolor: activeCategory === cat ? (categoryColors[cat] || 'primary.main') : 'white',
                  color: activeCategory === cat ? 'white' : 'text.primary',
                  border: '1px solid',
                  borderColor: activeCategory === cat ? (categoryColors[cat] || 'primary.main') : 'grey.300',
                  '&:hover': {
                    bgcolor: activeCategory === cat
                      ? (categoryColors[cat] || 'primary.main')
                      : 'grey.100',
                  },
                }}
              />
            ))}
          </Box>
        </Container>

        {filteredPosts.length === 0 ? (
          <Container maxWidth="xl" sx={{ py: 8, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ color: 'text.secondary' }}>{t.noResults}</Typography>
          </Container>
        ) : (
          <>
            {/* Featured Post */}
            {featuredPost && (
              <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 } }}>
                <MotionCard
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  elevation={0}
                  sx={{ border: '1px solid', borderColor: 'grey.200', borderRadius: 4, overflow: 'hidden' }}
                >
                  <Grid container>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Box
                        sx={{
                          height: { xs: 200, md: '100%' },
                          minHeight: { md: 350 },
                          background: `linear-gradient(135deg, ${categoryColors[featuredPost.category] || '#4B9CD3'} 0%, ${categoryColors[featuredPost.category] || '#4B9CD3'}CC 100%)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Typography variant="h2" sx={{ color: 'white', fontWeight: 800, opacity: 0.3, fontSize: { xs: '3rem', md: '4rem' } }}>
                          쏙
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                          <Chip label={t.featured} size="small" sx={{ bgcolor: '#FEF3C7', color: '#D97706', fontWeight: 600 }} />
                          <Chip
                            label={featuredPost.category}
                            size="small"
                            sx={{ bgcolor: `${categoryColors[featuredPost.category]}15`, color: categoryColors[featuredPost.category], fontWeight: 600 }}
                          />
                        </Box>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: 'secondary.main', mb: 2, fontSize: { xs: '1.25rem', md: '1.75rem' } }}>
                          {featuredPost.title}
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.8 }}>
                          {featuredPost.excerpt}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 3 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <PersonIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>{featuredPost.author}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <AccessTimeIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>{featuredPost.readTime}</Typography>
                          </Box>
                        </Box>
                        <Button
                          component={Link}
                          href={`/blog/${featuredPost.id}`}
                          variant="contained"
                          endIcon={<ArrowForwardIcon />}
                          sx={{ background: `linear-gradient(135deg, ${categoryColors[featuredPost.category] || '#4B9CD3'} 0%, ${categoryColors[featuredPost.category] || '#4B9CD3'}CC 100%)` }}
                        >
                          {t.readMore}
                        </Button>
                      </CardContent>
                    </Grid>
                  </Grid>
                </MotionCard>
              </Container>
            )}

            {/* Other Posts */}
            {otherPosts.length > 0 && (
              <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 } }}>
                <Grid container spacing={3}>
                  {otherPosts.map((post, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={post.id}>
                      <MotionCard
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ y: -4 }}
                        elevation={0}
                        sx={{ height: '100%', border: '1px solid', borderColor: 'grey.200', borderRadius: 3, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
                      >
                        <Box
                          sx={{
                            height: 140,
                            background: `linear-gradient(135deg, ${categoryColors[post.category] || '#4B9CD3'}30 0%, ${categoryColors[post.category] || '#4B9CD3'}10 100%)`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Typography variant="h4" sx={{ color: categoryColors[post.category] || '#4B9CD3', fontWeight: 800, opacity: 0.2 }}>
                            {post.category.charAt(0)}
                          </Typography>
                        </Box>
                        <CardContent sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
                          <Chip
                            label={post.category}
                            size="small"
                            sx={{ mb: 1.5, bgcolor: `${categoryColors[post.category]}15`, color: categoryColors[post.category], fontWeight: 600, fontSize: '0.7rem', alignSelf: 'flex-start' }}
                          />
                          <Typography variant="h6" sx={{ fontWeight: 700, color: 'secondary.main', mb: 1, lineHeight: 1.4, fontSize: '1rem' }}>
                            {post.title}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.6, flex: 1, fontSize: '0.85rem' }}>
                            {post.excerpt.length > 80 ? post.excerpt.slice(0, 80) + '...' : post.excerpt}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', mb: 1.5 }}>
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>{post.author}</Typography>
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>·</Typography>
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>{post.date}</Typography>
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>·</Typography>
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>{post.readTime}</Typography>
                          </Box>
                          <Button
                            component={Link}
                            href={`/blog/${post.id}`}
                            variant="text"
                            endIcon={<ArrowForwardIcon />}
                            sx={{ fontWeight: 600, alignSelf: 'flex-start', p: 0, minWidth: 0 }}
                          >
                            {t.readMore}
                          </Button>
                        </CardContent>
                      </MotionCard>
                    </Grid>
                  ))}
                </Grid>
              </Container>
            )}
          </>
        )}
      </Box>
      <Footer />
    </>
  );
}
