'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  IconButton,
  Chip,
  Tooltip,
  useMediaQuery,
  useTheme,
  Badge,
  Paper,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MicIcon from '@mui/icons-material/Mic';
import HistoryIcon from '@mui/icons-material/History';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardCommandKeyIcon from '@mui/icons-material/KeyboardCommandKey';
import PeopleIcon from '@mui/icons-material/People';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import DescriptionIcon from '@mui/icons-material/Description';
import { useAuth } from '@/lib/AuthContext';
import SearchModal from './SearchModal';

const MotionBox = motion.create(Box);
const MotionPaper = motion.create(Paper);

const DRAWER_WIDTH = 260;
const DRAWER_COLLAPSED_WIDTH = 72;
const TOPBAR_HEIGHT = 64;

const navItems = [
  { label: '대시보드', icon: DashboardIcon, path: '/dashboard', description: '홈' },
  { label: '새 진료', icon: MicIcon, path: '/dashboard/record', description: '녹음 시작' },
  { label: '진료 기록', icon: HistoryIcon, path: '/dashboard/history', description: '기록 조회' },
  { label: '환자 관리', icon: PeopleIcon, path: '/dashboard/patients', description: '환자 목록' },
  { label: '의료진 관리', icon: LocalHospitalIcon, path: '/dashboard/doctors', description: '의료진 관리' },
  { label: '템플릿', icon: DescriptionIcon, path: '/dashboard/templates', description: '나만의 템플릿' },
  { label: '설정', icon: SettingsIcon, path: '/dashboard/settings', description: '환경 설정' },
];

const pageInfo = {
  '/dashboard': { title: '대시보드', subtitle: '오늘의 진료 현황을 확인하세요' },
  '/dashboard/record': { title: '새 진료', subtitle: 'AI가 진료 내용을 실시간으로 기록합니다' },
  '/dashboard/history': { title: '진료 기록', subtitle: '과거 진료 내역을 조회하고 관리합니다' },
  '/dashboard/patients': { title: '환자 관리', subtitle: '환자 목록을 조회하고 관리합니다' },
  '/dashboard/doctors': { title: '의료진 관리', subtitle: '병원 의료진을 관리합니다' },
  '/dashboard/templates': { title: '템플릿', subtitle: '나만의 차트 템플릿을 만들고 관리하세요' },
  '/dashboard/settings': { title: '설정', subtitle: '환경을 맞춤 설정하세요' },
};

export default function DashboardLayout({ children }) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Keyboard shortcut for search (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const drawerWidth = collapsed ? DRAWER_COLLAPSED_WIDTH : DRAWER_WIDTH;

  const isActive = (path) => {
    if (path === '/dashboard') return pathname === '/dashboard';
    return pathname.startsWith(path);
  };

  const currentPage = pageInfo[pathname] || pageInfo['/dashboard'];

  const DrawerContent = () => (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#FFFFFF',
      }}
    >
      {/* Logo Header */}
      <MotionBox
        initial={false}
        animate={{ opacity: 1 }}
        sx={{
          p: 2,
          height: TOPBAR_HEIGHT,
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          borderBottom: '1px solid',
          borderColor: 'grey.100',
        }}
      >
        <AnimatePresence mode="wait">
          {!collapsed ? (
            <MotionBox
              key="full-logo"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              sx={{ display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer' }}
              onClick={() => router.push('/')}
            >
              <Box
                sx={{
                  px: 1.5,
                  py: 0.75,
                  borderRadius: 2,
                  bgcolor: '#56A3D9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(86, 163, 217, 0.3)',
                }}
              >
                <Typography sx={{ color: 'white', fontWeight: 800, fontSize: '0.9rem' }}>
                  차트쏙
                </Typography>
              </Box>
              <Typography sx={{ fontWeight: 700, color: 'secondary.main', fontSize: '1.1rem' }}>
                chartsok
              </Typography>
            </MotionBox>
          ) : (
            <MotionBox
              key="mini-logo"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              sx={{
                width: 42,
                height: 42,
                minWidth: 42,
                minHeight: 42,
                borderRadius: '50%',
                bgcolor: '#56A3D9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(86, 163, 217, 0.3)',
                overflow: 'hidden',
              }}
              onClick={() => router.push('/')}
            >
              <Typography sx={{ color: 'white', fontWeight: 800, fontSize: '1.1rem', lineHeight: 1 }}>
                쏙
              </Typography>
            </MotionBox>
          )}
        </AnimatePresence>
        {!isMobile && !collapsed && (
          <IconButton
            size="small"
            onClick={() => setCollapsed(true)}
            sx={{
              bgcolor: 'grey.100',
              '&:hover': { bgcolor: 'grey.200' },
            }}
          >
            <ChevronLeftIcon sx={{ fontSize: 18 }} />
          </IconButton>
        )}
      </MotionBox>

      {/* User Profile */}
      <Box sx={{ p: collapsed ? 1 : 2 }}>
        <MotionBox
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            p: collapsed ? 1 : 1.5,
            bgcolor: 'grey.50',
            borderRadius: 2,
            cursor: 'pointer',
            justifyContent: collapsed ? 'center' : 'flex-start',
            border: '1px solid',
            borderColor: 'grey.100',
          }}
          onClick={() => router.push('/dashboard/settings')}
        >
          <Avatar
            src={user?.photoURL}
            sx={{
              width: 36,
              height: 36,
              bgcolor: 'primary.main',
              fontSize: '0.875rem',
              fontWeight: 600,
            }}
          >
            {user?.displayName?.charAt(0) || user?.email?.charAt(0).toUpperCase()}
          </Avatar>
          {!collapsed && (
            <MotionBox
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              sx={{ overflow: 'hidden', flex: 1 }}
            >
              <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.3 }} noWrap>
                {user?.displayName || '선생님'}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem' }} noWrap>
                {user?.email}
              </Typography>
            </MotionBox>
          )}
        </MotionBox>
      </Box>

      {/* Navigation */}
      <Box sx={{ flex: 1, px: collapsed ? 1 : 1.5, py: 1, overflow: 'auto' }}>
        <List sx={{ p: 0 }}>
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
                <Tooltip title={collapsed ? item.label : ''} placement="right" arrow>
                  <ListItemButton
                    component={motion.div}
                    whileHover={{ x: active ? 0 : 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      router.push(item.path);
                      if (isMobile) setMobileOpen(false);
                    }}
                    sx={{
                      borderRadius: 2.5,
                      py: 1.25,
                      px: collapsed ? 1.5 : 2,
                      justifyContent: collapsed ? 'center' : 'flex-start',
                      background: active
                        ? 'linear-gradient(135deg, #4B9CD3 0%, #3A7BA8 100%)'
                        : 'transparent',
                      color: active ? 'white' : 'text.primary',
                      position: 'relative',
                      overflow: 'hidden',
                      boxShadow: active
                        ? '0 4px 15px rgba(75, 156, 211, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)'
                        : 'none',
                      backdropFilter: active ? 'blur(10px)' : 'none',
                      border: active ? '1px solid rgba(255,255,255,0.2)' : '1px solid transparent',
                      '&:hover': {
                        background: active
                          ? 'linear-gradient(135deg, #3A7BA8 0%, #2C5F7C 100%)'
                          : 'rgba(0,0,0,0.04)',
                      },
                      '&::before': active ? {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '50%',
                        background: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 100%)',
                        borderRadius: 'inherit',
                        pointerEvents: 'none',
                      } : {},
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: collapsed ? 0 : 36,
                        color: active ? 'white' : 'grey.600',
                      }}
                    >
                      <Badge
                        badgeContent={item.badge}
                        color="error"
                        sx={{
                          '& .MuiBadge-badge': {
                            fontSize: '0.55rem',
                            height: 14,
                            minWidth: 14,
                            fontWeight: 700,
                          },
                        }}
                      >
                        <Icon sx={{ fontSize: 20 }} />
                      </Badge>
                    </ListItemIcon>
                    {!collapsed && (
                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{
                          fontWeight: active ? 600 : 500,
                          fontSize: '0.8rem',
                        }}
                      />
                    )}
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* Bottom Section */}
      <Box sx={{ p: collapsed ? 1 : 1.5, borderTop: '1px solid', borderColor: 'grey.100' }}>
        <List sx={{ p: 0 }}>
          <ListItem disablePadding sx={{ mb: 0.5 }}>
            <Tooltip title={collapsed ? '도움말' : ''} placement="right" arrow>
              <ListItemButton
                component={motion.div}
                whileHover={{ x: 4 }}
                onClick={() => {
                  router.push('/help');
                  if (isMobile) setMobileOpen(false);
                }}
                sx={{
                  borderRadius: 2,
                  py: 1,
                  px: collapsed ? 1.5 : 2,
                  justifyContent: collapsed ? 'center' : 'flex-start',
                }}
              >
                <ListItemIcon sx={{ minWidth: collapsed ? 0 : 36, color: 'grey.600' }}>
                  <HelpOutlineIcon sx={{ fontSize: 20 }} />
                </ListItemIcon>
                {!collapsed && (
                  <ListItemText
                    primary="도움말"
                    primaryTypographyProps={{ fontSize: '0.8rem' }}
                  />
                )}
              </ListItemButton>
            </Tooltip>
          </ListItem>
          <ListItem disablePadding>
            <Tooltip title={collapsed ? '로그아웃' : ''} placement="right" arrow>
              <ListItemButton
                component={motion.div}
                whileHover={{ x: 4, backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                onClick={handleLogout}
                sx={{
                  borderRadius: 2,
                  py: 1,
                  px: collapsed ? 1.5 : 2,
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  color: 'error.main',
                }}
              >
                <ListItemIcon sx={{ minWidth: collapsed ? 0 : 36, color: 'error.main' }}>
                  <LogoutIcon sx={{ fontSize: 20 }} />
                </ListItemIcon>
                {!collapsed && (
                  <ListItemText
                    primary="로그아웃"
                    primaryTypographyProps={{ fontSize: '0.8rem' }}
                  />
                )}
              </ListItemButton>
            </Tooltip>
          </ListItem>
        </List>


        {/* Expand button when collapsed */}
        {!isMobile && collapsed && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 1 }}>
            <IconButton
              size="small"
              onClick={() => setCollapsed(false)}
              sx={{
                bgcolor: 'grey.100',
                '&:hover': { bgcolor: 'grey.200' },
              }}
            >
              <ChevronLeftIcon sx={{ fontSize: 18, transform: 'rotate(180deg)' }} />
            </IconButton>
          </Box>
        )}

        {/* Powered by jpumki */}
        {!collapsed && (
          <Box sx={{ px: 2, py: 1.5, borderTop: '1px solid', borderColor: 'grey.100' }}>
            <Typography
              variant="caption"
              sx={{
                color: 'text.disabled',
                fontSize: '0.65rem',
                display: 'block',
                textAlign: 'center',
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
        )}
      </Box>
    </Box>
  );

  if (!mounted) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F8FAFC' }}>
      {/* Desktop Drawer */}
      {!isMobile && (
        <motion.div
          initial={false}
          animate={{ width: drawerWidth }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          style={{
            flexShrink: 0,
            position: 'relative',
          }}
        >
          <Box
            sx={{
              position: 'fixed',
              width: drawerWidth,
              height: '100vh',
              overflow: 'hidden',
              borderRight: '1px solid',
              borderColor: 'grey.200',
              bgcolor: 'white',
              transition: 'width 0.3s ease-in-out',
            }}
          >
            <DrawerContent />
          </Box>
        </motion.div>
      )}

      {/* Mobile Drawer */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          PaperProps={{
            sx: { width: DRAWER_WIDTH, border: 'none' },
          }}
        >
          <DrawerContent />
        </Drawer>
      )}

      {/* Main Content Area */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top Bar */}
        <MotionBox
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          sx={{
            height: TOPBAR_HEIGHT,
            bgcolor: 'white',
            borderBottom: '1px solid',
            borderColor: 'grey.200',
            display: 'flex',
            alignItems: 'center',
            px: 3,
            gap: 3,
            position: 'sticky',
            top: 0,
            zIndex: 100,
          }}
        >
          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              onClick={() => setMobileOpen(true)}
              sx={{
                bgcolor: 'grey.100',
                '&:hover': { bgcolor: 'grey.200' },
              }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Page Title */}
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'secondary.main', lineHeight: 1.2 }}>
              {currentPage.title}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {currentPage.subtitle}
            </Typography>
          </Box>

          {/* Search Bar - Click to open modal */}
          <MotionPaper
            component={motion.div}
            whileHover={{ boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
            whileTap={{ scale: 0.98 }}
            elevation={0}
            onClick={() => setSearchOpen(true)}
            sx={{
              flex: 1,
              maxWidth: 400,
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              px: 2,
              py: 0.75,
              borderRadius: 2,
              bgcolor: 'grey.50',
              border: '1px solid',
              borderColor: 'grey.200',
              ml: 'auto',
              cursor: 'pointer',
              transition: 'all 0.2s',
              '&:hover': {
                borderColor: 'primary.main',
                bgcolor: 'grey.100',
              },
            }}
          >
            <SearchIcon sx={{ color: 'grey.400', fontSize: 20, mr: 1 }} />
            <Typography sx={{ flex: 1, fontSize: '0.85rem', color: 'grey.500' }}>
              환자, 진단명 검색...
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                px: 1,
                py: 0.25,
                borderRadius: 1,
                bgcolor: 'grey.200',
              }}
            >
              <KeyboardCommandKeyIcon sx={{ fontSize: 12, color: 'grey.600' }} />
              <Typography variant="caption" sx={{ color: 'grey.600', fontWeight: 600 }}>
                K
              </Typography>
            </Box>
          </MotionPaper>

          {/* Right Actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: { xs: 'auto', md: 0 } }}>
            <Tooltip title="알림" arrow>
              <IconButton
                component={motion.button}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                sx={{
                  bgcolor: 'grey.50',
                  border: '1px solid',
                  borderColor: 'grey.200',
                  '&:hover': { bgcolor: 'grey.100' },
                }}
              >
                <Badge
                  badgeContent={3}
                  color="error"
                  sx={{
                    '& .MuiBadge-badge': {
                      fontSize: '0.65rem',
                      height: 16,
                      minWidth: 16,
                    },
                  }}
                >
                  <NotificationsNoneIcon sx={{ fontSize: 20 }} />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="도움말" arrow>
              <IconButton
                component={motion.button}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/help')}
                sx={{
                  bgcolor: 'grey.50',
                  border: '1px solid',
                  borderColor: 'grey.200',
                  '&:hover': { bgcolor: 'grey.100' },
                }}
              >
                <HelpOutlineIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </Tooltip>
          </Box>
        </MotionBox>

        {/* Page Content */}
        <Box
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          sx={{ flex: 1, overflow: 'auto' }}
        >
          {children}
        </Box>
      </Box>

      {/* Global Search Modal */}
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </Box>
  );
}
