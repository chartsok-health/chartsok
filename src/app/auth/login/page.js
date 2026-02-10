'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
  Alert,
  IconButton,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import { motion } from 'framer-motion';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAuth } from '@/lib/AuthContext';
import { useI18n } from '@/lib/i18n';

const MotionPaper = motion.create(Paper);

const content = {
  ko: {
    login: '로그인',
    loginSubtitle: '계정에 로그인하여 서비스를 이용하세요',
    email: '이메일',
    password: '비밀번호',
    forgotPassword: '비밀번호를 잊으셨나요?',
    or: '또는',
    googleLogin: 'Google로 로그인',
    noAccount: '계정이 없으신가요?',
    signUp: '회원가입',
    errorInvalidEmail: '올바른 이메일 주소를 입력해주세요.',
    errorUserDisabled: '비활성화된 계정입니다.',
    errorUserNotFound: '등록되지 않은 이메일입니다.',
    errorWrongPassword: '비밀번호가 일치하지 않습니다.',
    errorInvalidCredential: '이메일 또는 비밀번호가 올바르지 않습니다.',
    errorTooManyRequests: '너무 많은 시도가 있었습니다. 잠시 후 다시 시도해주세요.',
    errorDefault: '로그인에 실패했습니다. 다시 시도해주세요.',
  },
  en: {
    login: 'Log In',
    loginSubtitle: 'Log in to your account to use the service',
    email: 'Email',
    password: 'Password',
    forgotPassword: 'Forgot your password?',
    or: 'or',
    googleLogin: 'Log in with Google',
    noAccount: "Don't have an account?",
    signUp: 'Sign Up',
    errorInvalidEmail: 'Please enter a valid email address.',
    errorUserDisabled: 'This account has been disabled.',
    errorUserNotFound: 'Email not found.',
    errorWrongPassword: 'Incorrect password.',
    errorInvalidCredential: 'Invalid email or password.',
    errorTooManyRequests: 'Too many attempts. Please try again later.',
    errorDefault: 'Login failed. Please try again.',
  },
};

export default function LoginPage() {
  const { locale } = useI18n();
  const t = content[locale] || content.ko;
  const { login, loginWithGoogle } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err) {
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      await loginWithGoogle();
      router.push('/dashboard');
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
      case 'auth/user-disabled':
        return t.errorUserDisabled;
      case 'auth/user-not-found':
        return t.errorUserNotFound;
      case 'auth/wrong-password':
        return t.errorWrongPassword;
      case 'auth/invalid-credential':
        return t.errorInvalidCredential;
      case 'auth/too-many-requests':
        return t.errorTooManyRequests;
      default:
        return t.errorDefault;
    }
  };

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
            href="/"
            sx={{ mb: 2, color: 'text.secondary' }}
          >
            <ArrowBackIcon />
          </IconButton>

          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: 'primary.main',
                mb: 1,
              }}
            >
              chartsok
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 700, color: 'secondary.main', mb: 1 }}>
              {t.login}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {t.loginSubtitle}
            </Typography>
          </Box>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          {/* Login Form */}
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label={t.email}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label={t.password}
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{ mb: 1 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Forgot Password Link */}
            <Box sx={{ textAlign: 'right', mb: 3 }}>
              <Link href="/auth/forgot-password" style={{ textDecoration: 'none' }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'primary.main',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  {t.forgotPassword}
                </Typography>
              </Link>
            </Box>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={loading}
              sx={{
                py: 1.5,
                mb: 2,
                fontWeight: 600,
                fontSize: '1rem',
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : t.login}
            </Button>
          </Box>

          {/* Divider */}
          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {t.or}
            </Typography>
          </Divider>

          {/* Google Login */}
          <Button
            variant="outlined"
            fullWidth
            size="large"
            onClick={handleGoogleLogin}
            disabled={loading}
            startIcon={<GoogleIcon />}
            sx={{
              py: 1.5,
              mb: 3,
              fontWeight: 600,
              borderColor: 'grey.300',
              color: 'text.primary',
              '&:hover': {
                borderColor: 'grey.400',
                bgcolor: 'grey.50',
              },
            }}
          >
            {t.googleLogin}
          </Button>

          {/* Sign Up Link */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {t.noAccount}{' '}
              <Link href="/auth/signup" style={{ textDecoration: 'none' }}>
                <Typography
                  component="span"
                  variant="body2"
                  sx={{
                    color: 'primary.main',
                    fontWeight: 600,
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  {t.signUp}
                </Typography>
              </Link>
            </Typography>
          </Box>
        </MotionPaper>
      </Container>
    </Box>
  );
}
