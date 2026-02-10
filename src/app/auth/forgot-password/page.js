'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { motion } from 'framer-motion';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmailIcon from '@mui/icons-material/Email';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useAuth } from '@/lib/AuthContext';
import { useI18n } from '@/lib/i18n';

const MotionPaper = motion.create(Paper);

const content = {
  ko: {
    title: '비밀번호 찾기',
    subtitle1: '가입한 이메일 주소를 입력하시면',
    subtitle2: '비밀번호 재설정 링크를 보내드립니다.',
    email: '이메일',
    sendResetLink: '재설정 링크 보내기',
    backToLogin: '로그인으로 돌아가기',
    successTitle: '이메일을 확인해주세요',
    successMessage: (email) => (
      <>
        <strong>{email}</strong>로 비밀번호 재설정 링크를 보냈습니다.
        이메일을 확인하고 링크를 클릭하여 비밀번호를 재설정하세요.
      </>
    ),
    spamNotice: '이메일이 도착하지 않았다면 스팸 폴더를 확인해주세요.',
    errorInvalidEmail: '올바른 이메일 주소를 입력해주세요.',
    errorUserNotFound: '등록되지 않은 이메일입니다.',
    errorTooManyRequests: '너무 많은 요청이 있었습니다. 잠시 후 다시 시도해주세요.',
    errorDefault: '요청 처리에 실패했습니다. 다시 시도해주세요.',
  },
  en: {
    title: 'Reset Password',
    subtitle1: 'Enter your registered email address',
    subtitle2: "and we'll send you a password reset link.",
    email: 'Email',
    sendResetLink: 'Send Reset Link',
    backToLogin: 'Back to Login',
    successTitle: 'Check Your Email',
    successMessage: (email) => (
      <>
        We've sent a password reset link to <strong>{email}</strong>.
        Check your email and click the link to reset your password.
      </>
    ),
    spamNotice: "If you don't see the email, check your spam folder.",
    errorInvalidEmail: 'Please enter a valid email address.',
    errorUserNotFound: 'Email not found.',
    errorTooManyRequests: 'Too many requests. Please try again later.',
    errorDefault: 'Request failed. Please try again.',
  },
};

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth();
  const { locale } = useI18n();
  const t = content[locale] || content.ko;

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await resetPassword(email);
      setSuccess(true);
    } catch (err) {
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  const getErrorMessage = (code) => {
    switch (code) {
      case 'auth/invalid-email':
        return t.errorInvalidEmail;
      case 'auth/user-not-found':
        return t.errorUserNotFound;
      case 'auth/too-many-requests':
        return t.errorTooManyRequests;
      default:
        return t.errorDefault;
    }
  };

  if (success) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'grey.50',
          py: 4,
        }}
      >
        <Container maxWidth="sm">
          <MotionPaper
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            elevation={0}
            sx={{
              p: { xs: 3, sm: 5 },
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'grey.200',
              textAlign: 'center',
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                bgcolor: 'success.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 3,
              }}
            >
              <CheckCircleOutlineIcon sx={{ fontSize: 40, color: 'white' }} />
            </Box>

            <Typography variant="h5" sx={{ fontWeight: 700, color: 'secondary.main', mb: 2 }}>
              {t.successTitle}
            </Typography>

            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
              {t.successMessage(email)}
            </Typography>

            <Alert severity="info" sx={{ mb: 4, borderRadius: 2, textAlign: 'left' }}>
              {t.spamNotice}
            </Alert>

            <Button
              component={Link}
              href="/auth/login"
              variant="contained"
              fullWidth
              size="large"
              sx={{ py: 1.5, fontWeight: 600 }}
            >
              {t.backToLogin}
            </Button>
          </MotionPaper>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'grey.50',
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <MotionPaper
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          elevation={0}
          sx={{
            p: { xs: 3, sm: 5 },
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'grey.200',
          }}
        >
          {/* Back Button */}
          <IconButton
            component={Link}
            href="/auth/login"
            sx={{ mb: 2, color: 'text.secondary' }}
          >
            <ArrowBackIcon />
          </IconButton>

          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                bgcolor: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2,
              }}
            >
              <EmailIcon sx={{ fontSize: 32, color: 'white' }} />
            </Box>

            <Typography variant="h5" sx={{ fontWeight: 700, color: 'secondary.main', mb: 1 }}>
              {t.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {t.subtitle1}<br />
              {t.subtitle2}
            </Typography>
          </Box>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          {/* Reset Form */}
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label={t.email}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{ mb: 3 }}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={loading}
              sx={{
                py: 1.5,
                mb: 3,
                fontWeight: 600,
                fontSize: '1rem',
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : t.sendResetLink}
            </Button>
          </Box>

          {/* Back to Login */}
          <Box sx={{ textAlign: 'center' }}>
            <Link href="/auth/login" style={{ textDecoration: 'none' }}>
              <Typography
                variant="body2"
                sx={{
                  color: 'primary.main',
                  fontWeight: 600,
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                {t.backToLogin}
              </Typography>
            </Link>
          </Box>
        </MotionPaper>
      </Container>
    </Box>
  );
}
