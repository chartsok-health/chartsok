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
import { useI18n } from '@/lib/i18n';

const MotionPaper = motion.create(Paper);

const content = {
  ko: {
    signUp: '회원가입',
    signUpSubtitle: '14일 무료 체험을 시작하세요',
    name: '이름',
    email: '이메일',
    password: '비밀번호',
    confirmPassword: '비밀번호 확인',
    pwLength: '8자 이상',
    pwUppercase: '대문자 포함',
    pwLowercase: '소문자 포함',
    pwNumber: '숫자 포함',
    terms: '이용약관',
    and: ' 및 ',
    privacy: '개인정보처리방침',
    agreeToTerms: '에 동의합니다',
    or: '또는',
    googleSignUp: 'Google로 가입하기',
    alreadyHaveAccount: '이미 계정이 있으신가요?',
    logIn: '로그인',
    errorAgreeTerms: '이용약관에 동의해주세요.',
    errorPasswordMismatch: '비밀번호가 일치하지 않습니다.',
    errorPasswordRequirements: '비밀번호 조건을 충족해주세요.',
    errorEmailInUse: '이미 사용 중인 이메일입니다.',
    errorInvalidEmail: '올바른 이메일 주소를 입력해주세요.',
    errorWeakPassword: '더 강력한 비밀번호를 사용해주세요.',
    errorOperationNotAllowed: '이메일/비밀번호 로그인이 비활성화되어 있습니다.',
    errorDefault: '회원가입에 실패했습니다. 다시 시도해주세요.',
    helperPasswordMismatch: '비밀번호가 일치하지 않습니다',
  },
  en: {
    signUp: 'Sign Up',
    signUpSubtitle: 'Start your 14-day free trial',
    name: 'Name',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    pwLength: 'At least 8 characters',
    pwUppercase: 'Contains uppercase',
    pwLowercase: 'Contains lowercase',
    pwNumber: 'Contains number',
    terms: 'Terms of Service',
    and: ' and ',
    privacy: 'Privacy Policy',
    agreeToTerms: 'I agree to the',
    or: 'or',
    googleSignUp: 'Sign up with Google',
    alreadyHaveAccount: 'Already have an account?',
    logIn: 'Log In',
    errorAgreeTerms: 'Please agree to the Terms of Service.',
    errorPasswordMismatch: 'Passwords do not match.',
    errorPasswordRequirements: 'Please meet password requirements.',
    errorEmailInUse: 'This email is already in use.',
    errorInvalidEmail: 'Please enter a valid email address.',
    errorWeakPassword: 'Please use a stronger password.',
    errorOperationNotAllowed: 'Email/password login is not enabled.',
    errorDefault: 'Sign up failed. Please try again.',
    helperPasswordMismatch: 'Passwords do not match',
  },
};

export default function SignupPage() {
  const { locale } = useI18n();
  const t = content[locale] || content.ko;
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
      setError(t.errorAgreeTerms);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError(t.errorPasswordMismatch);
      return;
    }

    if (!isPasswordValid) {
      setError(t.errorPasswordRequirements);
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
      setError(t.errorAgreeTerms);
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
        return t.errorEmailInUse;
      case 'auth/invalid-email':
        return t.errorInvalidEmail;
      case 'auth/weak-password':
        return t.errorWeakPassword;
      case 'auth/operation-not-allowed':
        return t.errorOperationNotAllowed;
      default:
        return t.errorDefault;
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
              {t.signUp}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {t.signUpSubtitle}
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
              label={t.name}
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label={t.email}
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label={t.password}
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
                <PasswordCheck valid={passwordChecks.length} text={t.pwLength} />
                <PasswordCheck valid={passwordChecks.uppercase} text={t.pwUppercase} />
                <PasswordCheck valid={passwordChecks.lowercase} text={t.pwLowercase} />
                <PasswordCheck valid={passwordChecks.number} text={t.pwNumber} />
              </Box>
            )}

            <TextField
              fullWidth
              label={t.confirmPassword}
              name="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              error={formData.confirmPassword && formData.password !== formData.confirmPassword}
              helperText={
                formData.confirmPassword && formData.password !== formData.confirmPassword
                  ? t.helperPasswordMismatch
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
                  {locale === 'en' ? `${t.agreeToTerms} ` : ''}
                  <Link href="/terms" style={{ color: '#4B9CD3', textDecoration: 'none' }}>
                    {t.terms}
                  </Link>
                  {t.and}
                  <Link href="/privacy" style={{ color: '#4B9CD3', textDecoration: 'none' }}>
                    {t.privacy}
                  </Link>
                  {locale === 'ko' ? t.agreeToTerms : ''}
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
              {loading ? <CircularProgress size={24} color="inherit" /> : t.signUp}
            </Button>
          </Box>

          {/* Divider */}
          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {t.or}
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
            {t.googleSignUp}
          </Button>

          {/* Login Link */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {t.alreadyHaveAccount}{' '}
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
                  {t.logIn}
                </Typography>
              </Link>
            </Typography>
          </Box>
        </MotionPaper>
      </Container>
    </Box>
  );
}
