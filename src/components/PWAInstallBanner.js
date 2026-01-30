'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, Button, IconButton, Paper } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import GetAppIcon from '@mui/icons-material/GetApp';
import CloseIcon from '@mui/icons-material/Close';
import LaptopIcon from '@mui/icons-material/Laptop';
import { usePWA } from '@/lib/PWAContext';
import { useI18n } from '@/lib/i18n';

const MotionPaper = motion.create(Paper);

export default function PWAInstallBanner() {
  const { isInstallable, isInstalled, promptInstall } = usePWA();
  const { locale } = useI18n();
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    const wasDismissed = localStorage.getItem('pwa-banner-dismissed');
    if (!wasDismissed) {
      setDismissed(false);
    }
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem('pwa-banner-dismissed', 'true');
  };

  const handleInstall = async () => {
    if (isInstallable) {
      const installed = await promptInstall();
      if (installed) {
        handleDismiss();
      }
    } else {
      alert(locale === 'ko'
        ? 'Chrome 또는 Edge 브라우저에서 HTTPS로 접속하면 앱을 설치할 수 있습니다.'
        : 'Install available in Chrome or Edge browser over HTTPS.');
    }
  };

  // Show unless already installed or dismissed
  if (isInstalled || dismissed) {
    return null;
  }

  const content = {
    ko: {
      title: '차트쏙 데스크톱 앱 설치',
      description: '더 빠른 실행을 위해 데스크톱 앱으로 설치하세요',
      button: '설치',
    },
    en: {
      title: 'Install chartsok Desktop App',
      description: 'Install as a desktop app for faster access',
      button: 'Install',
    },
  };

  const t = content[locale] || content.ko;

  return (
    <AnimatePresence>
      <MotionPaper
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', damping: 25 }}
        elevation={8}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1200,
          borderRadius: 3,
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #1E3A5F 0%, #2D4A6F 100%)',
          maxWidth: 360,
        }}
      >
        <Box sx={{ p: 2.5, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              bgcolor: 'rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <LaptopIcon sx={{ color: 'white', fontSize: 28 }} />
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="subtitle2"
              sx={{ color: 'white', fontWeight: 700, mb: 0.25 }}
            >
              {t.title}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: 'rgba(255,255,255,0.8)', display: 'block' }}
            >
              {t.description}
            </Typography>
          </Box>
          <Button
            variant="contained"
            size="small"
            startIcon={<GetAppIcon />}
            onClick={handleInstall}
            sx={{
              bgcolor: 'white',
              color: '#1E3A5F',
              fontWeight: 600,
              px: 2,
              whiteSpace: 'nowrap',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.9)',
              },
            }}
          >
            {t.button}
          </Button>
          <IconButton
            size="small"
            onClick={handleDismiss}
            sx={{ color: 'rgba(255,255,255,0.7)', ml: -1 }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </MotionPaper>
    </AnimatePresence>
  );
}
