'use client';

import { Box, Container, Typography, Grid, Link, Divider, IconButton, Stack } from '@mui/material';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useI18n } from '@/lib/i18n';

export default function Footer() {
  const { t } = useI18n();
  const router = useRouter();

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

  const footerSections = [
    {
      title: t('footer.product'),
      links: [
        { label: t('footer.features'), href: '#features', isSection: true },
        { label: t('footer.pricing'), href: '#pricing', isSection: true },
        { label: t('footer.demo'), href: '#demo', isSection: true },
        { label: t('footer.integrations'), href: '/integrations', isSection: false },
      ],
    },
    {
      title: t('footer.company'),
      links: [
        { label: t('footer.about'), href: '/about', isSection: false },
        { label: t('footer.careers'), href: '/careers', isSection: false },
        { label: t('footer.blog'), href: '/blog', isSection: false },
        { label: t('footer.contact'), href: '#contact', isSection: true },
      ],
    },
    {
      title: t('footer.support'),
      links: [
        { label: t('footer.help'), href: '/help', isSection: false },
        { label: t('footer.docs'), href: '/docs', isSection: false },
        { label: t('footer.status'), href: '/status', isSection: false },
      ],
    },
    {
      title: t('footer.legal'),
      links: [
        { label: t('footer.privacy'), href: '/privacy', isSection: false },
        { label: t('footer.terms'), href: '/terms', isSection: false },
        { label: t('footer.security'), href: '/security', isSection: false },
      ],
    },
  ];

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
                차트쏙
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
              {t('footer.description')}
            </Typography>

            {/* Social links */}
            <Stack direction="row" spacing={1}>
              <IconButton
                size="small"
                onClick={() => window.open('mailto:chartsok.health@gmail.com', '_self')}
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
              jpumki software 사업자등록번호: 220-60-00933
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
