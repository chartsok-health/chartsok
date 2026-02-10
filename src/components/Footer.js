'use client';

import { Box, Container, Typography, Grid, Link, Divider, IconButton, Stack } from '@mui/material';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useI18n } from '@/lib/i18n';

export default function Footer() {
  const { t, locale } = useI18n();
  const router = useRouter();

  const content = {
    ko: {
      brandSubtitle: '차트쏙',
      description: 'EMR 안에서 작동하는 AI 차트 자동화 모듈. 병원은 기존 워크플로를 유지하고, EMR은 AI 기능을 빠르게 번들링합니다.',
      sections: [
        {
          title: '제품',
          links: [
            { label: '기능', href: '#partner-value', isSection: true },
            { label: '통합 옵션', href: '#integration', isSection: true },
            { label: '보안', href: '#security', isSection: true },
          ],
        },
        {
          title: '파트너',
          links: [
            { label: 'EMR 파트너', href: '/partners', isSection: false },
            { label: '파트너 문의', href: '/contact?type=emr_partner', isSection: false },
            { label: '보안 자료 요청', href: '/contact?type=security_packet', isSection: false },
          ],
        },
        {
          title: '지원',
          links: [
            { label: '문의', href: '/contact', isSection: false },
            { label: '도움말', href: '/help', isSection: false },
            { label: 'API 문서', href: '/docs', isSection: false },
          ],
        },
        {
          title: '법적 고지',
          links: [
            { label: '개인정보처리방침', href: '/privacy', isSection: false },
            { label: '이용약관', href: '/terms', isSection: false },
            { label: '보안 정책', href: '/security', isSection: false },
          ],
        },
      ],
      businessInfo: 'jpumki software 사업자등록번호: 220-60-00933',
    },
    en: {
      brandSubtitle: 'chartsok',
      description: 'AI chart module inside your EMR. Same workflow, bundled AI.',
      sections: [
        {
          title: 'Product',
          links: [
            { label: 'Features', href: '#partner-value', isSection: true },
            { label: 'Integration', href: '#integration', isSection: true },
            { label: 'Security', href: '#security', isSection: true },
          ],
        },
        {
          title: 'Partners',
          links: [
            { label: 'EMR Partners', href: '/partners', isSection: false },
            { label: 'Partner Inquiry', href: '/contact?type=emr_partner', isSection: false },
            { label: 'Security Docs', href: '/contact?type=security_packet', isSection: false },
          ],
        },
        {
          title: 'Support',
          links: [
            { label: 'Contact', href: '/contact', isSection: false },
            { label: 'Help', href: '/help', isSection: false },
            { label: 'API Docs', href: '/docs', isSection: false },
          ],
        },
        {
          title: 'Legal',
          links: [
            { label: 'Privacy', href: '/privacy', isSection: false },
            { label: 'Terms', href: '/terms', isSection: false },
            { label: 'Security', href: '/security', isSection: false },
          ],
        },
      ],
      businessInfo: 'jpumki software Reg: 220-60-00933',
    },
  };

  const c = content[locale] || content.ko;

  const scrollToSection = (id) => {
    if (!id || id === '#') return;
    if (id.startsWith('/')) {
      // It's a page link, not a section
      return;
    }
    const sectionId = id.replace('#', '');

    // Check if we're on the home page
    if (window.location.pathname !== '/') {
      // Navigate to home page with hash
      router.push(`/#${sectionId}`);
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const isMobileView = window.innerWidth < 900;
      const headerOffset = isMobileView ? 64 : 77;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const footerSections = c.sections;

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'secondary.main',
        pt: { xs: 8, md: 10 },
        pb: 4,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {/* Brand */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: 'white',
                mb: 2,
              }}
            >
              chartsok
              <Typography
                component="span"
                sx={{
                  color: 'primary.main',
                  fontWeight: 500,
                  ml: 1,
                }}
              >
                {c.brandSubtitle}
              </Typography>
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255, 255, 255, 0.6)',
                maxWidth: 300,
                lineHeight: 1.8,
                mb: 3,
              }}
            >
              {c.description}
            </Typography>

            {/* Social links */}
            <Stack direction="row" spacing={1}>
              <IconButton
                size="small"
                onClick={() => router.push('/contact')}
                sx={{
                  color: 'rgba(255, 255, 255, 0.5)',
                  '&:hover': {
                    color: 'primary.main',
                    bgcolor: 'rgba(75, 156, 211, 0.1)',
                  },
                }}
              >
                <EmailIcon />
              </IconButton>
              <IconButton
                size="small"
                onClick={() => window.open('https://instagram.com/chartsok.health', '_blank')}
                sx={{
                  color: 'rgba(255, 255, 255, 0.5)',
                  '&:hover': {
                    color: '#E4405F',
                    bgcolor: 'rgba(228, 64, 95, 0.1)',
                  },
                }}
              >
                <InstagramIcon />
              </IconButton>
            </Stack>
          </Grid>

          {/* Links */}
          {footerSections.map((section) => (
            <Grid size={{ xs: 6, sm: 3, lg: 2 }} key={section.title}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 600,
                  color: 'white',
                  mb: 2.5,
                  textTransform: 'uppercase',
                  fontSize: '0.75rem',
                  letterSpacing: 1,
                }}
              >
                {section.title}
              </Typography>
              <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                {section.links.map((link) => (
                  <Box component="li" key={link.label} sx={{ mb: 1.5 }}>
                    {link.isSection ? (
                      <Link
                        component="button"
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection(link.href);
                        }}
                        sx={{
                          color: 'rgba(255, 255, 255, 0.6)',
                          textDecoration: 'none',
                          fontSize: '0.875rem',
                          transition: 'color 0.2s ease',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: 0,
                          '&:hover': {
                            color: 'primary.main',
                          },
                        }}
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <Link
                        component={NextLink}
                        href={link.href}
                        sx={{
                          color: 'rgba(255, 255, 255, 0.6)',
                          textDecoration: 'none',
                          fontSize: '0.875rem',
                          transition: 'color 0.2s ease',
                          '&:hover': {
                            color: 'primary.main',
                          },
                        }}
                      >
                        {link.label}
                      </Link>
                    )}
                  </Box>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 5, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255, 255, 255, 0.5)',
                mb: 0.5,
              }}
            >
              {t('footer.copyright')}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255, 255, 255, 0.4)',
                fontSize: '0.8rem',
              }}
            >
              {t('footer.ceo')} | {t('footer.address')}
            </Typography>
          </Box>
          <Box sx={{ textAlign: { xs: 'center', md: 'right' } }}>
            <Typography
              variant="caption"
              sx={{
                color: 'rgba(255, 255, 255, 0.4)',
                fontSize: '0.75rem',
                display: 'block',
                mb: 0.5,
              }}
            >
              Powered by{' '}
              <Link
                href="https://jpumki.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'primary.main',
                  textDecoration: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                jpumki software
              </Link>
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: 'rgba(255, 255, 255, 0.35)',
                fontSize: '0.7rem',
              }}
            >
              {c.businessInfo}
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
