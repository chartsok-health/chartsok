'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  Box,
  Container,
  Typography,
  Card,
  Breadcrumbs,
  Button,
  Divider,
} from '@mui/material';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArticleIcon from '@mui/icons-material/Article';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useI18n } from '@/lib/i18n';
import { getCategoryInfo, getArticle, getArticlesByCategory } from '@/lib/helpArticles';
import ReactMarkdown from 'react-markdown';

const MotionBox = motion.create(Box);

export default function HelpArticlePage() {
  const params = useParams();
  const { locale } = useI18n();
  const { category, id } = params;

  const categoryInfo = getCategoryInfo(category);
  const article = getArticle(category, id);
  const allArticles = getArticlesByCategory(category);

  // Find next and previous articles
  const currentIndex = allArticles.findIndex((a) => a.id === id);
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

  if (!categoryInfo || !article) {
    return (
      <>
        <Header />
        <Box sx={{ bgcolor: '#FAFBFC', minHeight: '100vh', py: 12 }}>
          <Container maxWidth="xl">
            <Typography variant="h4" sx={{ textAlign: 'center' }}>
              {locale === 'ko' ? '문서를 찾을 수 없습니다' : 'Article not found'}
            </Typography>
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Button component={Link} href="/help" startIcon={<ArrowBackIcon />}>
                {locale === 'ko' ? '도움말로 돌아가기' : 'Back to Help'}
              </Button>
            </Box>
          </Container>
        </Box>
        <Footer />
      </>
    );
  }

  const catT = categoryInfo[locale] || categoryInfo.ko;
  const articleT = article[locale] || article.ko;

  return (
    <>
      <Header />
      <Box sx={{ bgcolor: '#FAFBFC', minHeight: '100vh' }}>
        {/* Hero */}
        <Box
          sx={{
            background: 'linear-gradient(180deg, #EBF5FF 0%, #FAFBFC 100%)',
            pt: { xs: 8, md: 10 },
            pb: { xs: 4, md: 6 },
          }}
        >
          <Container maxWidth="xl">
            {/* Breadcrumbs */}
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              sx={{ mb: 3 }}
            >
              <Link href="/help" style={{ color: '#4B9CD3', textDecoration: 'none' }}>
                {locale === 'ko' ? '도움말' : 'Help'}
              </Link>
              <Link
                href={`/help/${category}`}
                style={{ color: '#4B9CD3', textDecoration: 'none' }}
              >
                {catT.title}
              </Link>
              <Typography color="text.primary">{articleT.title}</Typography>
            </Breadcrumbs>

            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  color: 'secondary.main',
                  fontSize: { xs: '1.75rem', md: '2.5rem' },
                  mb: 2,
                }}
              >
                {articleT.title}
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                {articleT.summary}
              </Typography>
            </MotionBox>
          </Container>
        </Box>

        {/* Content */}
        <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 } }}>
          <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', lg: 'row' } }}>
            {/* Main Content */}
            <Box sx={{ flex: 1 }}>
              <Card
                elevation={0}
                sx={{
                  p: { xs: 3, md: 5 },
                  border: '1px solid',
                  borderColor: 'grey.200',
                  borderRadius: 3,
                }}
              >
                <Box
                  sx={{
                    '& h2': {
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      color: 'secondary.main',
                      mt: 4,
                      mb: 2,
                      '&:first-of-type': { mt: 0 },
                    },
                    '& h3': {
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: 'secondary.main',
                      mt: 3,
                      mb: 1.5,
                    },
                    '& h4': {
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      color: 'secondary.main',
                      mt: 2.5,
                      mb: 1,
                    },
                    '& p': {
                      color: 'text.secondary',
                      lineHeight: 1.8,
                      mb: 2,
                    },
                    '& ul, & ol': {
                      color: 'text.secondary',
                      pl: 3,
                      mb: 2,
                      '& li': {
                        mb: 0.5,
                        lineHeight: 1.8,
                      },
                    },
                    '& code': {
                      bgcolor: 'grey.100',
                      px: 1,
                      py: 0.25,
                      borderRadius: 1,
                      fontSize: '0.875rem',
                      fontFamily: 'monospace',
                    },
                    '& pre': {
                      bgcolor: '#1E293B',
                      color: '#E2E8F0',
                      p: 2,
                      borderRadius: 2,
                      overflow: 'auto',
                      mb: 2,
                      '& code': {
                        bgcolor: 'transparent',
                        px: 0,
                        py: 0,
                        color: 'inherit',
                      },
                    },
                    '& strong': {
                      fontWeight: 600,
                      color: 'text.primary',
                    },
                  }}
                >
                  <ReactMarkdown>{articleT.content}</ReactMarkdown>
                </Box>
              </Card>

              {/* Navigation */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mt: 4,
                  gap: 2,
                  flexDirection: { xs: 'column', sm: 'row' },
                }}
              >
                {prevArticle ? (
                  <Link
                    href={`/help/${category}/${prevArticle.id}`}
                    style={{ textDecoration: 'none', flex: 1 }}
                  >
                    <Card
                      elevation={0}
                      sx={{
                        p: 2,
                        border: '1px solid',
                        borderColor: 'grey.200',
                        borderRadius: 2,
                        transition: 'all 0.2s',
                        '&:hover': { borderColor: catT.color, bgcolor: `${catT.color}05` },
                      }}
                    >
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {locale === 'ko' ? '이전 문서' : 'Previous'}
                      </Typography>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {(prevArticle[locale] || prevArticle.ko).title}
                      </Typography>
                    </Card>
                  </Link>
                ) : (
                  <Box sx={{ flex: 1 }} />
                )}

                {nextArticle ? (
                  <Link
                    href={`/help/${category}/${nextArticle.id}`}
                    style={{ textDecoration: 'none', flex: 1, textAlign: 'right' }}
                  >
                    <Card
                      elevation={0}
                      sx={{
                        p: 2,
                        border: '1px solid',
                        borderColor: 'grey.200',
                        borderRadius: 2,
                        transition: 'all 0.2s',
                        '&:hover': { borderColor: catT.color, bgcolor: `${catT.color}05` },
                      }}
                    >
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {locale === 'ko' ? '다음 문서' : 'Next'}
                      </Typography>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {(nextArticle[locale] || nextArticle.ko).title}
                      </Typography>
                    </Card>
                  </Link>
                ) : (
                  <Box sx={{ flex: 1 }} />
                )}
              </Box>
            </Box>

            {/* Sidebar */}
            <Box sx={{ width: { xs: '100%', lg: 300 }, flexShrink: 0 }}>
              {/* Related Articles */}
              <Card
                elevation={0}
                sx={{
                  p: 3,
                  border: '1px solid',
                  borderColor: 'grey.200',
                  borderRadius: 3,
                  mb: 3,
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
                  {locale === 'ko' ? `${catT.title}의 다른 문서` : `More in ${catT.title}`}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {allArticles.slice(0, 5).map((a) => {
                    const aT = a[locale] || a.ko;
                    const isActive = a.id === id;
                    return (
                      <Link
                        key={a.id}
                        href={`/help/${category}/${a.id}`}
                        style={{ textDecoration: 'none' }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                            p: 1.5,
                            borderRadius: 2,
                            bgcolor: isActive ? `${catT.color}10` : 'transparent',
                            transition: 'all 0.2s',
                            '&:hover': { bgcolor: `${catT.color}10` },
                          }}
                        >
                          <ArticleIcon
                            sx={{
                              fontSize: 18,
                              color: isActive ? catT.color : 'grey.400',
                            }}
                          />
                          <Typography
                            variant="body2"
                            sx={{
                              color: isActive ? catT.color : 'text.secondary',
                              fontWeight: isActive ? 600 : 400,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {aT.title}
                          </Typography>
                        </Box>
                      </Link>
                    );
                  })}
                </Box>
                {allArticles.length > 5 && (
                  <Link href={`/help/${category}`} style={{ textDecoration: 'none' }}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: catT.color,
                        mt: 2,
                        fontWeight: 500,
                        '&:hover': { textDecoration: 'underline' },
                      }}
                    >
                      {locale === 'ko'
                        ? `모든 문서 보기 (${allArticles.length})`
                        : `View all (${allArticles.length})`}
                    </Typography>
                  </Link>
                )}
              </Card>

              {/* Need Help */}
              <Card
                elevation={0}
                sx={{
                  p: 3,
                  border: '1px solid',
                  borderColor: 'grey.200',
                  borderRadius: 3,
                  background: `linear-gradient(135deg, ${catT.color}08 0%, ${catT.color}03 100%)`,
                }}
              >
                <SupportAgentIcon sx={{ fontSize: 32, color: catT.color, mb: 2 }} />
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                  {locale === 'ko' ? '도움이 더 필요하신가요?' : 'Need more help?'}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                  {locale === 'ko'
                    ? '기술 지원팀에 문의해주세요.'
                    : 'Contact our support team.'}
                </Typography>
                <Button
                  component={Link}
                  href="/contact"
                  variant="outlined"
                  size="small"
                  sx={{
                    borderColor: catT.color,
                    color: catT.color,
                    '&:hover': { borderColor: catT.color, bgcolor: `${catT.color}10` },
                  }}
                >
                  {locale === 'ko' ? '문의하기' : 'Contact Us'}
                </Button>
              </Card>
            </Box>
          </Box>

          {/* Back Button */}
          <Box sx={{ mt: 6, textAlign: 'center' }}>
            <Button
              component={Link}
              href={`/help/${category}`}
              startIcon={<ArrowBackIcon />}
              sx={{ color: 'text.secondary' }}
            >
              {locale === 'ko' ? `${catT.title}(으)로 돌아가기` : `Back to ${catT.title}`}
            </Button>
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
}
