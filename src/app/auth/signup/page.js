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
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { motion } from 'framer-motion';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useAuth } from '@/lib/AuthContext';

const MotionPaper = motion.create(Paper);

export default function SignupPage() {
  const { signup, loginWithGoogle } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validatePassword = (password) => {
    return {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
    };
  };

  const passwordChecks = validatePassword(formData.password);
  const isPasswordValid = Object.values(passwordChecks).every(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!agreeTerms) {
      setError('이용약관에 동의해주세요.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!isPasswordValid) {
      setError('비밀번호 조건을 충족해주세요.');
      return;
    }

    setLoading(true);

    try {
      await signup(formData.email, formData.password, formData.name);
      router.push('/dashboard');
    } catch (err) {
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    if (!agreeTerms) {
      setError('이용약관에 동의해주세요.');
      return;
    }

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
      case 'auth/email-already-in-use':
        return '이미 사용 중인 이메일입니다.';
      case 'auth/invalid-email':
        return '올바른 이메일 주소를 입력해주세요.';
      case 'auth/weak-password':
        return '더 강력한 비밀번호를 사용해주세요.';
      case 'auth/operation-not-allowed':
        return '이메일/비밀번호 로그인이 비활성화되어 있습니다.';
      default:
        return '회원가입에 실패했습니다. 다시 시도해주세요.';
    }
  };

  const PasswordCheck = ({ valid, text }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
      <CheckCircleIcon
        sx={{
          fontSize: 16,
          color: valid ? 'success.main' : 'grey.400',
        }}
      />
      <Typography
        variant="caption"
        sx={{
          color: valid ? 'success.main' : 'text.secondary',
        }}
      >
        {text}
      </Typography>
    </Box>
  );

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
              회원가입
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              14일 무료 체험을 시작하세요
            </Typography>
          </Box>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          {/* Signup Form */}
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="이름"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="이메일"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="비밀번호"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
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

            {/* Password Requirements */}
            {formData.password && (
              <Box sx={{ mb: 2, pl: 1 }}>
                <PasswordCheck valid={passwordChecks.length} text="8자 이상" />
                <PasswordCheck valid={passwordChecks.uppercase} text="대문자 포함" />
                <PasswordCheck valid={passwordChecks.lowercase} text="소문자 포함" />
                <PasswordCheck valid={passwordChecks.number} text="숫자 포함" />
              </Box>
            )}

            <TextField
              fullWidth
              label="비밀번호 확인"
              name="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              error={formData.confirmPassword && formData.password !== formData.confirmPassword}
              helperText={
                formData.confirmPassword && formData.password !== formData.confirmPassword
                  ? '비밀번호가 일치하지 않습니다'
                  : ''
              }
              sx={{ mb: 2 }}
            />

            {/* Terms Agreement */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  color="primary"
                />
              }
              label={
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  <Link href="/terms" style={{ color: '#4B9CD3', textDecoration: 'none' }}>
                    이용약관
                  </Link>
                  {' 및 '}
                  <Link href="/privacy" style={{ color: '#4B9CD3', textDecoration: 'none' }}>
                    개인정보처리방침
                  </Link>
                  에 동의합니다
                </Typography>
              }
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
                mb: 2,
                fontWeight: 600,
                fontSize: '1rem',
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : '회원가입'}
            </Button>
          </Box>

          {/* Divider */}
          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              또는
            </Typography>
          </Divider>

          {/* Google Signup */}
          <Button
            variant="outlined"
            fullWidth
            size="large"
            onClick={handleGoogleSignup}
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
            Google로 가입하기
          </Button>

          {/* Login Link */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              이미 계정이 있으신가요?{' '}
              <Link href="/auth/login" style={{ textDecoration: 'none' }}>
                <Typography
                  component="span"
                  variant="body2"
                  sx={{
                    color: 'primary.main',
                    fontWeight: 600,
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  로그인
                </Typography>
              </Link>
            </Typography>
          </Box>
        </MotionPaper>
      </Container>
    </Box>
  );
}
