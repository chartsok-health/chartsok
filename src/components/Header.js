'use client';

import { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Container,
  useMediaQuery,
  useTheme,
  Chip,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import TranslateIcon from '@mui/icons-material/Translate';
import { useI18n } from '@/lib/i18n';

const MotionBox = motion.create(Box);

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, locale, toggleLocale } = useI18n();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: t('nav.features'), href: '#features' },
    { label: t('nav.howItWorks'), href: '#how-it-works' },
    { label: t('nav.pricing'), href: '#pricing' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ width: 300, height: '100%', bgcolor: 'white' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderBottom: '1px solid', borderColor: 'grey.100' }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
          ChartSok
        </Typography>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List sx={{ pt: 2 }}>
        {navItems.map((item) => (
          <ListItem key={item.href} disablePadding>
            <ListItemButton
              component="a"
              href={item.href}
              onClick={handleDrawerToggle}
              sx={{ py: 2, px: 3 }}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ fontWeight: 500 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              toggleLocale();
              handleDrawerToggle();
            }}
            sx={{ py: 2, px: 3 }}
          >
            <TranslateIcon sx={{ mr: 2, color: 'primary.main' }} />
            <ListItemText
              primary={locale === 'ko' ? 'English' : '한국어'}
              primaryTypographyProps={{ fontWeight: 500 }}
            />
          </ListItemButton>
        </ListItem>
      </List>
      <Box sx={{ px: 3, mt: 4 }}>
        <Button
          variant="contained"
          fullWidth
          size="large"
          sx={{
            mb: 2,
            py: 1.5,
            background: 'linear-gradient(135deg, #4B9CD3 0%, #3A7BA8 100%)',
          }}
        >
          {t('nav.getStarted')}
        </Button>
        <Button
          variant="outlined"
          fullWidth
          size="large"
          sx={{ py: 1.5 }}
        >
          {t('nav.login')}
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          borderBottom: '1px solid',
          borderColor: scrolled ? 'grey.200' : 'transparent',
          bgcolor: scrolled ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(12px)',
          transition: 'all 0.3s ease',
          boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.05)' : 'none',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 76 } }}>
            {/* Logo */}
            <MotionBox
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Typography
                variant="h6"
                component="a"
                href="/"
                sx={{
                  fontWeight: 800,
                  color: 'primary.main',
                  textDecoration: 'none',
                  fontSize: { xs: '1.25rem', md: '1.5rem' },
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                ChartSok
                <Chip
                  label="차트쏙"
                  size="small"
                  sx={{
                    bgcolor: 'primary.main',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.7rem',
                    height: 22,
                  }}
                />
              </Typography>
            </MotionBox>

            <Box sx={{ flexGrow: 1 }} />

            {/* Desktop Navigation */}
            {!isMobile && (
              <>
                <Box sx={{ display: 'flex', gap: 0.5, mr: 3 }}>
                  {navItems.map((item) => (
                    <Button
                      key={item.href}
                      component="a"
                      href={item.href}
                      sx={{
                        color: 'text.secondary',
                        fontWeight: 500,
                        px: 2,
                        '&:hover': {
                          color: 'primary.main',
                          bgcolor: 'rgba(75, 156, 211, 0.08)',
                        },
                      }}
                    >
                      {item.label}
                    </Button>
                  ))}
                </Box>

                <IconButton
                  onClick={toggleLocale}
                  sx={{
                    mr: 2,
                    color: 'text.secondary',
                    '&:hover': {
                      color: 'primary.main',
                      bgcolor: 'rgba(75, 156, 211, 0.08)',
                    },
                  }}
                  title={locale === 'ko' ? 'Switch to English' : '한국어로 전환'}
                >
                  <TranslateIcon />
                </IconButton>

                <Button
                  variant="text"
                  sx={{
                    mr: 1,
                    color: 'text.primary',
                    fontWeight: 500,
                  }}
                >
                  {t('nav.login')}
                </Button>
                <MotionBox whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="contained"
                    sx={{
                      px: 3,
                      py: 1,
                      fontWeight: 600,
                      background: 'linear-gradient(135deg, #4B9CD3 0%, #3A7BA8 100%)',
                      boxShadow: '0 4px 14px rgba(75, 156, 211, 0.3)',
                      '&:hover': {
                        boxShadow: '0 6px 20px rgba(75, 156, 211, 0.4)',
                      },
                    }}
                  >
                    {t('nav.getStarted')}
                  </Button>
                </MotionBox>
              </>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <IconButton
                edge="end"
                onClick={handleDrawerToggle}
                sx={{ color: 'text.primary' }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: { boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.1)' }
        }}
      >
        {drawer}
      </Drawer>

      {/* Toolbar spacer */}
      <Toolbar sx={{ minHeight: { xs: 64, md: 76 } }} />
    </>
  );
}
