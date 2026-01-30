'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  Box,
  Container,
  Typography,
  Card,
  Chip,
  Breadcrumbs,
  Button,
} from '@mui/material';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArticleIcon from '@mui/icons-material/Article';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import SettingsIcon from '@mui/icons-material/Settings';
import SecurityIcon from '@mui/icons-material/Security';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useI18n } from '@/lib/i18n';
import { getCategoryInfo, getArticlesByCategory } from '@/lib/helpArticles';

const MotionBox = motion.create(Box);

const iconMap = {
  RocketLaunchIcon,
  PlayCircleOutlineIcon,
  IntegrationInstructionsIcon,
  SettingsIcon,
  SecurityIcon,
  SupportAgentIcon,
};

export default function HelpCategoryPage() {
  const params = useParams();
  const { locale } = useI18n();
  const category = params.category;

  const categoryInfo = getCategoryInfo(category);
  const articles = getArticlesByCategory(category);

  if (!categoryInfo) {
    return (
      <>
        <Header />
        <Box sx={{ bgcolor: '#FAFBFC', minHeight: '100vh', py: 12 }}>
          <Container maxWidth="xl">
            <Typography variant="h4" sx={{ textAlign: 'center' }}>
              {locale === 'ko' ? '카테고리를 찾을 수 없습니다' : 'Category not found'}
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

  const t = categoryInfo[locale] || categoryInfo.ko;
  const Icon = iconMap[t.icon] || ArticleIcon;

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
              <Typography color="text.primary">{t.title}</Typography>
            </Breadcrumbs>

            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              sx={{ display: 'flex', alignItems: 'center', gap: 3 }}
            >
              <Box
                sx={{
                  width: 72,
                  height: 72,
                  borderRadius: 3,
                  bgcolor: `${t.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon sx={{ fontSize: 36, color: t.color }} />
              </Box>
              <Box>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                    color: 'secondary.main',
                    fontSize: { xs: '1.75rem', md: '2.5rem' },
                  }}
                >
                  {t.title}
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', mt: 0.5 }}>
                  {t.desc}
                </Typography>
              </Box>
            </MotionBox>
          </Container>
        </Box>

        {/* Articles List */}
        <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 } }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
            {locale === 'ko' ? `${articles.length}개의 문서` : `${articles.length} articles`}
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {articles.map((article, index) => {
              const articleT = article[locale] || article.ko;
              return (
                <MotionBox
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={`/help/${category}/${article.id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <Card
                      elevation={0}
                      sx={{
                        p: 3,
                        border: '1px solid',
                        borderColor: 'grey.200',
                        borderRadius: 3,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        '&:hover': {
                          borderColor: t.color,
                          bgcolor: `${t.color}05`,
                          transform: 'translateX(4px)',
                        },
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: 2,
                            bgcolor: `${t.color}10`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          <ArticleIcon sx={{ fontSize: 20, color: t.color }} />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: 700, color: 'secondary.main', mb: 0.5 }}
                          >
                            {articleT.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: 'text.secondary', lineHeight: 1.6 }}
                          >
                            {articleT.summary}
                          </Typography>
                        </Box>
                        <NavigateNextIcon sx={{ color: 'grey.400', flexShrink: 0 }} />
                      </Box>
                    </Card>
                  </Link>
                </MotionBox>
              );
            })}
          </Box>

          {/* Back Button */}
          <Box sx={{ mt: 6, textAlign: 'center' }}>
            <Button
              component={Link}
              href="/help"
              startIcon={<ArrowBackIcon />}
              sx={{ color: 'text.secondary' }}
            >
              {locale === 'ko' ? '도움말 센터로 돌아가기' : 'Back to Help Center'}
            </Button>
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
}
