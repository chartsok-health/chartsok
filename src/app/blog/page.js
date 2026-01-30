'use client';

import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
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
      id: 'ai-medical-charting-future',
      title: 'AI 의료 차트의 미래: 2025년 트렌드',
      excerpt: '인공지능 기술이 의료 기록 작성을 어떻게 변화시키고 있는지, 그리고 앞으로의 발전 방향을 살펴봅니다.',
      image: '/blog/ai-charting.jpg',
      category: 'AI 기술',
      author: 'ChartSok 팀',
      date: '2025-01-28',
      readTime: '5분',
    },
    {
      id: 'soap-chart-guide',
      title: 'SOAP 차트 완벽 가이드: 효율적인 의료 기록 작성법',
      excerpt: 'SOAP 형식의 의료 기록 작성 방법과 각 섹션별 작성 팁을 상세히 알아봅니다.',
      image: '/blog/soap-guide.jpg',
      category: '의료 가이드',
      author: '김의료 원장',
      date: '2025-01-25',
      readTime: '8분',
    },
    {
      id: 'emr-integration-benefits',
      title: 'EMR 연동의 장점: 업무 효율 극대화하기',
      excerpt: 'ChartSok의 EMR 연동 기능이 어떻게 병원 업무 효율을 높이는지 실제 사례와 함께 소개합니다.',
      image: '/blog/emr-integration.jpg',
      category: '제품 활용',
      author: 'ChartSok 팀',
      date: '2025-01-22',
      readTime: '6분',
    },
    {
      id: 'voice-recognition-medical',
      title: '의료 음성 인식 기술의 현재와 미래',
      excerpt: '의료 현장에서 음성 인식 기술이 어떻게 활용되고 있으며, 기술의 정확도와 한계를 분석합니다.',
      image: '/blog/voice-tech.jpg',
      category: 'AI 기술',
      author: '이기술 CTO',
      date: '2025-01-18',
      readTime: '7분',
    },
    {
      id: 'doctor-burnout-solution',
      title: '의사 번아웃 해결책: 행정 업무 줄이기',
      excerpt: '의사들의 번아웃 원인 중 하나인 과도한 차트 작성 업무를 줄이는 방법을 제안합니다.',
      image: '/blog/burnout.jpg',
      category: '의료 현장',
      author: '박제품 CPO',
      date: '2025-01-15',
      readTime: '5분',
    },
    {
      id: 'specialty-ai-comparison',
      title: '전문과별 AI 어시스턴트 비교: 내과 vs 이비인후과',
      excerpt: '각 전문과에 최적화된 AI 어시스턴트의 특징과 차이점을 비교 분석합니다.',
      image: '/blog/specialty-ai.jpg',
      category: '제품 활용',
      author: 'ChartSok 팀',
      date: '2025-01-10',
      readTime: '6분',
    },
  ],
  en: [
    {
      id: 'ai-medical-charting-future',
      title: 'The Future of AI Medical Charting: 2025 Trends',
      excerpt: 'How AI technology is transforming medical documentation and where it\'s heading.',
      image: '/blog/ai-charting.jpg',
      category: 'AI Technology',
      author: 'ChartSok Team',
      date: '2025-01-28',
      readTime: '5 min',
    },
    {
      id: 'soap-chart-guide',
      title: 'Complete SOAP Chart Guide: Efficient Medical Documentation',
      excerpt: 'Learn how to write SOAP format medical records with detailed tips for each section.',
      image: '/blog/soap-guide.jpg',
      category: 'Medical Guide',
      author: 'Dr. Kim',
      date: '2025-01-25',
      readTime: '8 min',
    },
    {
      id: 'emr-integration-benefits',
      title: 'Benefits of EMR Integration: Maximizing Workflow Efficiency',
      excerpt: 'See how ChartSok\'s EMR integration improves hospital workflow with real cases.',
      image: '/blog/emr-integration.jpg',
      category: 'Product Tips',
      author: 'ChartSok Team',
      date: '2025-01-22',
      readTime: '6 min',
    },
    {
      id: 'voice-recognition-medical',
      title: 'Medical Voice Recognition: Present and Future',
      excerpt: 'How voice recognition is used in healthcare and analysis of its accuracy and limitations.',
      image: '/blog/voice-tech.jpg',
      category: 'AI Technology',
      author: 'Lee, CTO',
      date: '2025-01-18',
      readTime: '7 min',
    },
    {
      id: 'doctor-burnout-solution',
      title: 'Doctor Burnout Solution: Reducing Administrative Work',
      excerpt: 'Proposing solutions to reduce excessive charting work, a major cause of physician burnout.',
      image: '/blog/burnout.jpg',
      category: 'Healthcare',
      author: 'Park, CPO',
      date: '2025-01-15',
      readTime: '5 min',
    },
    {
      id: 'specialty-ai-comparison',
      title: 'Specialty AI Assistants Compared: Internal Medicine vs ENT',
      excerpt: 'Comparing the features and differences of AI assistants optimized for each specialty.',
      image: '/blog/specialty-ai.jpg',
      category: 'Product Tips',
      author: 'ChartSok Team',
      date: '2025-01-10',
      readTime: '6 min',
    },
  ],
};

const categories = {
  ko: ['전체', 'AI 기술', '의료 가이드', '제품 활용', '의료 현장'],
  en: ['All', 'AI Technology', 'Medical Guide', 'Product Tips', 'Healthcare'],
};

const content = {
  ko: {
    badge: '블로그',
    title: 'ChartSok 블로그',
    subtitle: 'AI 의료 기술, 효율적인 진료, 그리고 의료 현장의 이야기를 전합니다.',
    search: '블로그 검색...',
    readMore: '자세히 보기',
    featured: '추천 글',
  },
  en: {
    badge: 'Blog',
    title: 'ChartSok Blog',
    subtitle: 'AI medical technology, efficient practice, and stories from the healthcare field.',
    search: 'Search blog...',
    readMore: 'Read More',
    featured: 'Featured',
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

export default function BlogPage() {
  const { locale } = useI18n();
  const t = content[locale] || content.ko;
  const posts = blogPosts[locale] || blogPosts.ko;
  const cats = categories[locale] || categories.ko;
  const featuredPost = posts[0];
  const otherPosts = posts.slice(1);

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
                sx={{
                  fontWeight: 500,
                  bgcolor: cat === cats[0] ? 'primary.main' : 'white',
                  color: cat === cats[0] ? 'white' : 'text.primary',
                  border: '1px solid',
                  borderColor: cat === cats[0] ? 'primary.main' : 'grey.300',
                  '&:hover': { bgcolor: cat === cats[0] ? 'primary.dark' : 'grey.100' },
                }}
              />
            ))}
          </Box>
        </Container>

        {/* Featured Post */}
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
                    bgcolor: 'linear-gradient(135deg, #4B9CD3 0%, #3A7BA8 100%)',
                    background: 'linear-gradient(135deg, #4B9CD3 0%, #3A7BA8 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="h2" sx={{ color: 'white', fontWeight: 800, opacity: 0.3 }}>
                    AI
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
                  <Typography variant="h4" sx={{ fontWeight: 700, color: 'secondary.main', mb: 2 }}>
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
                    sx={{ background: 'linear-gradient(135deg, #4B9CD3 0%, #3A7BA8 100%)' }}
                  >
                    {t.readMore}
                  </Button>
                </CardContent>
              </Grid>
            </Grid>
          </MotionCard>
        </Container>

        {/* Other Posts */}
        <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 } }}>
          <Grid container spacing={3}>
            {otherPosts.map((post, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={post.id}>
                <MotionCard
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  elevation={0}
                  sx={{ height: '100%', border: '1px solid', borderColor: 'grey.200', borderRadius: 3, overflow: 'hidden' }}
                >
                  <Box
                    sx={{
                      height: 160,
                      background: `linear-gradient(135deg, ${categoryColors[post.category] || '#4B9CD3'}30 0%, ${categoryColors[post.category] || '#4B9CD3'}10 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="h4" sx={{ color: categoryColors[post.category] || '#4B9CD3', fontWeight: 800, opacity: 0.3 }}>
                      {post.category.charAt(0)}
                    </Typography>
                  </Box>
                  <CardContent sx={{ p: 3 }}>
                    <Chip
                      label={post.category}
                      size="small"
                      sx={{ mb: 2, bgcolor: `${categoryColors[post.category]}15`, color: categoryColors[post.category], fontWeight: 600, fontSize: '0.7rem' }}
                    />
                    <Typography variant="h6" sx={{ fontWeight: 700, color: 'secondary.main', mb: 1, lineHeight: 1.4 }}>
                      {post.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.6 }}>
                      {post.excerpt.slice(0, 80)}...
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>{post.date}</Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>·</Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>{post.readTime}</Typography>
                    </Box>
                  </CardContent>
                  <Box sx={{ px: 3, pb: 3 }}>
                    <Button
                      component={Link}
                      href={`/blog/${post.id}`}
                      variant="text"
                      endIcon={<ArrowForwardIcon />}
                      sx={{ fontWeight: 600 }}
                    >
                      {t.readMore}
                    </Button>
                  </Box>
                </MotionCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  );
}
