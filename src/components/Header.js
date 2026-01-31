'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
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
  Avatar,
  Menu,
  MenuItem,
  Divider,
} from '@mui/material';
import { motion } from 'framer-motion';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import TranslateIcon from '@mui/icons-material/Translate';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useI18n } from '@/lib/i18n';
import { useAuth } from '@/lib/AuthContext';
import AuthModal from './AuthModal';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalView, setAuthModalView] = useState('login');
  const [mounted, setMounted] = useState(false);
  const { t, locale, toggleLocale } = useI18n();
  const { user, logout } = useAuth();
  const theme = useTheme();
  const isMobileQuery = useMediaQuery(theme.breakpoints.down('md'));
  const isMobile = mounted ? isMobileQuery : false;
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle auth query param to open modal - watches for URL changes
  useEffect(() => {
    const authParam = searchParams.get('auth');
    if (authParam === 'signup' || authParam === 'login') {
      setAuthModalView(authParam);
      setAuthModalOpen(true);
      // Clean up the URL
      window.history.replaceState({}, '', window.location.pathname + window.location.hash);
    }
  }, [searchParams]);

  const openAuthModal = (view) => {
    setAuthModalView(view);
    setAuthModalOpen(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle hash navigation on page load
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      // Small delay to ensure page has rendered
      setTimeout(() => {
        const element = document.getElementById(hash);
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
      }, 100);
    }
  }, []);

  const navItems = [
    { label: t('nav.features'), id: 'features' },
    { label: t('nav.howItWorks'), id: 'demo' },
    { label: t('nav.pricing'), id: 'pricing' },
    { label: t('nav.about'), href: '/about' },
    { label: t('nav.blog'), href: '/blog' },
    { label: t('footer.contact'), href: '/contact' },
  ];

  const scrollToSection = (id) => {
    // Check if we're on the home page
    if (window.location.pathname !== '/') {
      // Navigate to home page with hash
      router.push(`/#${id}`);
      return;
    }

    const element = document.getElementById(id);
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

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavClick = (id) => {
    scrollToSection(id);
    if (mobileOpen) {
      handleDrawerToggle();
    }
  };

  const drawer = (
    <Box sx={{ width: 300, height: '100%', bgcolor: 'white' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderBottom: '1px solid', borderColor: 'grey.100' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              px: 1.25,
              py: 0.5,
              borderRadius: 1.5,
              bgcolor: '#56A3D9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography sx={{ color: 'white', fontWeight: 800, fontSize: '0.85rem' }}>
              차트쏙
            </Typography>
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 700, color: 'secondary.main' }}>
            chartsok
          </Typography>
        </Box>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Auth buttons at top */}
      <Box sx={{ px: 3, pt: 3, pb: 2, borderBottom: '1px solid', borderColor: 'grey.100' }}>
        {user ? (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
              <Avatar
                src={user.photoURL}
                sx={{ width: 48, height: 48, bgcolor: 'primary.main' }}
              >
                {user.displayName?.charAt(0) || user.email?.charAt(0).toUpperCase()}
              </Avatar>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  {user.displayName || '사용자'}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {user.email}
                </Typography>
              </Box>
            </Box>
            <Button
              component={Link}
              href="/dashboard"
              variant="contained"
              fullWidth
              size="large"
              onClick={handleDrawerToggle}
              sx={{
                mb: 2,
                py: 1.5,
                background: 'linear-gradient(135deg, #4B9CD3 0%, #3A7BA8 100%)',
              }}
            >
              대시보드
            </Button>
            <Button
              variant="outlined"
              fullWidth
              size="large"
              onClick={async () => {
                handleDrawerToggle();
                await logout();
                router.push('/');
              }}
              sx={{ py: 1.5 }}
            >
              로그아웃
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={() => {
                handleDrawerToggle();
                openAuthModal('signup');
              }}
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
              onClick={() => {
                handleDrawerToggle();
                openAuthModal('login');
              }}
              sx={{ py: 1.5 }}
            >
              {t('nav.login')}
            </Button>
          </>
        )}
      </Box>

      {/* Navigation items */}
      <List sx={{ pt: 1 }}>
        {navItems.map((item, index) => (
          <ListItem key={item.id || item.href || index} disablePadding>
            <ListItemButton
              component={item.href ? Link : 'button'}
              href={item.href || undefined}
              onClick={() => {
                if (item.id) {
                  handleNavClick(item.id);
                } else {
                  handleDrawerToggle();
                }
              }}
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

      {/* Powered by jpumki */}
      <Box sx={{ mt: 'auto', p: 3, borderTop: '1px solid', borderColor: 'grey.100' }}>
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            fontSize: '0.7rem',
          }}
        >
          Powered by{' '}
          <Typography
            component="a"
            href="https://jpumki.com"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: 'primary.main',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: 'inherit',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            jpumki software
          </Typography>
        </Typography>
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
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 76 } }}>
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
              style={{ display: 'flex' }}
            >
              <Box
                component="a"
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  if (window.location.pathname !== '/') {
                    router.push('/');
                  } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  cursor: 'pointer',
                  textDecoration: 'none',
                }}
              >
                <Box
                  sx={{
                    px: { xs: 1.25, md: 1.5 },
                    py: { xs: 0.5, md: 0.75 },
                    borderRadius: 2,
                    bgcolor: '#56A3D9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography sx={{ color: 'white', fontWeight: 800, fontSize: { xs: '0.9rem', md: '1rem' } }}>
                    차트쏙
                  </Typography>
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 800,
                    color: 'secondary.main',
                    fontSize: { xs: '1.1rem', md: '1.25rem' },
                  }}
                >
                  chartsok
                </Typography>
              </Box>
            </motion.div>

            <Box sx={{ flexGrow: 1 }} />

            {/* Desktop Navigation */}
            {!isMobile && (
              <>
                <Box sx={{ display: 'flex', gap: 0.5, mr: 3 }}>
                  {navItems.map((item, index) => (
                    <Button
                      key={item.id || item.href || index}
                      component={item.href ? Link : 'button'}
                      href={item.href || undefined}
                      onClick={item.id ? () => handleNavClick(item.id) : undefined}
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
                    mr: 1,
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

                {user ? (
                  <>
                    <IconButton
                      onClick={(e) => setAnchorEl(e.currentTarget)}
                      sx={{ ml: 1 }}
                    >
                      <Avatar
                        src={user.photoURL}
                        sx={{
                          width: 40,
                          height: 40,
                          bgcolor: 'primary.main',
                          fontSize: '1rem',
                        }}
                      >
                        {user.displayName?.charAt(0) || user.email?.charAt(0).toUpperCase()}
                      </Avatar>
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={() => setAnchorEl(null)}
                      PaperProps={{
                        sx: {
                          mt: 1,
                          minWidth: 200,
                          borderRadius: 2,
                          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                        },
                      }}
                    >
                      <Box sx={{ px: 2, py: 1.5 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          {user.displayName || '사용자'}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          {user.email}
                        </Typography>
                      </Box>
                      <Divider />
                      <MenuItem
                        onClick={() => {
                          setAnchorEl(null);
                          router.push('/dashboard');
                        }}
                      >
                        <DashboardIcon sx={{ mr: 1.5, fontSize: 20, color: 'text.secondary' }} />
                        대시보드
                      </MenuItem>
                      <MenuItem
                        onClick={async () => {
                          setAnchorEl(null);
                          await logout();
                          router.push('/');
                        }}
                      >
                        <LogoutIcon sx={{ mr: 1.5, fontSize: 20, color: 'text.secondary' }} />
                        로그아웃
                      </MenuItem>
                    </Menu>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => openAuthModal('login')}
                      variant="text"
                      sx={{
                        mr: 1,
                        color: 'text.primary',
                        fontWeight: 500,
                      }}
                    >
                      {t('nav.login')}
                    </Button>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{ display: 'inline-block' }}
                    >
                      <Button
                        onClick={() => openAuthModal('signup')}
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
                    </motion.div>
                  </>
                )}
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

      {/* Auth Modal */}
      <AuthModal
        open={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialView={authModalView}
      />

          </>
  );
}
