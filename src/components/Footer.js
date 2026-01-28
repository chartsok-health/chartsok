'use client';

import { Box, Container, Typography, Grid, Link, Divider, IconButton, Stack } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import EmailIcon from '@mui/icons-material/Email';
import { useI18n } from '@/lib/i18n';

export default function Footer() {
  const { t } = useI18n();

  const scrollToSection = (id) => {
    if (!id || id === '#') return;
    const sectionId = id.replace('#', '');
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
        { label: t('footer.features'), href: '#features' },
        { label: t('footer.pricing'), href: '#pricing' },
        { label: t('footer.demo'), href: '#demo' },
        { label: t('footer.integrations'), href: '#' },
      ],
    },
    {
      title: t('footer.company'),
      links: [
        { label: t('footer.about'), href: '#' },
        { label: t('footer.careers'), href: '#' },
        { label: t('footer.blog'), href: '#' },
        { label: t('footer.contact'), href: '#contact' },
      ],
    },
    {
      title: t('footer.support'),
      links: [
        { label: t('footer.help'), href: '#' },
        { label: t('footer.docs'), href: '#' },
        { label: t('footer.status'), href: '#' },
      ],
    },
    {
      title: t('footer.legal'),
      links: [
        { label: t('footer.privacy'), href: '#' },
        { label: t('footer.terms'), href: '#' },
        { label: t('footer.security'), href: '#' },
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
              ChartSok
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
              {[
                { icon: <LinkedInIcon />, label: 'LinkedIn' },
                { icon: <TwitterIcon />, label: 'Twitter' },
                { icon: <YouTubeIcon />, label: 'YouTube' },
                { icon: <EmailIcon />, label: 'Email' },
              ].map((social) => (
                <IconButton
                  key={social.label}
                  size="small"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.5)',
                    '&:hover': {
                      color: 'primary.main',
                      bgcolor: 'rgba(75, 156, 211, 0.1)',
                    },
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
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
          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255, 255, 255, 0.5)',
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
            {t('footer.address')}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
