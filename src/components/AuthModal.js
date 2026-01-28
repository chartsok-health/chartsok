'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Divider,
  Alert,
  CircularProgress,
  Checkbox,
  FormControlLabel,
  Backdrop,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useAuth } from '@/lib/AuthContext';

const MotionBox = motion.create(Box);
const MotionButton = motion.create(Button);

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: { duration: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24,
    },
  },
};

const buttonVariants = {
  idle: { scale: 1 },
  hover: { scale: 1.02 },
  tap: { scale: 0.98 },
};

const iconPulseVariants = {
  initial: { scale: 0, rotate: -180 },
  animate: {
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 15,
    },
  },
};

const successIconVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 12,
      delay: 0.2,
    },
  },
};

export default function AuthModal({ open, onClose, initialView = 'login' }) {
  const { login, signup, loginWithGoogle, resetPassword } = useAuth();

  const [view, setView] = useState(initialView);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Reset view when modal opens with new initialView
  useEffect(() => {
    if (open) {
      setView(initialView);
    }
  }, [open, initialView]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    setError('');
    setShowPassword(false);
    setAgreeTerms(false);
    setResetSuccess(false);
  };

  const handleClose = () => {
    resetForm();
    setView('login');
    onClose();
  };

  const switchView = (newView) => {
    resetForm();
    setView(newView);
  };

  const validatePassword = (password) => ({
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
  });

  const passwordChecks = validatePassword(formData.password);
  const isPasswordValid = Object.values(passwordChecks).every(Boolean);

  const getErrorMessage = (code) => {
    const errors = {
      'auth/invalid-email': '올바른 이메일 주소를 입력해주세요.',
      'auth/user-disabled': '비활성화된 계정입니다.',
      'auth/user-not-found': '등록되지 않은 이메일입니다.',
      'auth/wrong-password': '비밀번호가 일치하지 않습니다.',
      'auth/invalid-credential': '이메일 또는 비밀번호가 올바르지 않습니다.',
      'auth/email-already-in-use': '이미 사용 중인 이메일입니다.',
      'auth/weak-password': '더 강력한 비밀번호를 사용해주세요.',
      'auth/too-many-requests': '너무 많은 시도가 있었습니다. 잠시 후 다시 시도해주세요.',
    };
    return errors[code] || '오류가 발생했습니다. 다시 시도해주세요.';
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(formData.email, formData.password);
      handleClose();
    } catch (err) {
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
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
      handleClose();
    } catch (err) {
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    if (view === 'signup' && !agreeTerms) {
      setError('이용약관에 동의해주세요.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await loginWithGoogle();
      handleClose();
    } catch (err) {
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await resetPassword(formData.email);
      setResetSuccess(true);
    } catch (err) {
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  const PasswordCheck = ({ valid, text, delay = 0 }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: 'spring', stiffness: 300 }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
        <motion.div
          animate={{ scale: valid ? [1, 1.2, 1] : 1 }}
          transition={{ duration: 0.3 }}
        >
          <CheckCircleIcon sx={{ fontSize: 14, color: valid ? 'success.main' : 'grey.400', transition: 'color 0.3s ease' }} />
        </motion.div>
        <Typography variant="caption" sx={{ color: valid ? 'success.main' : 'text.secondary', transition: 'color 0.3s ease' }}>
          {text}
        </Typography>
      </Box>
    </motion.div>
  );

  const renderLogin = () => (
    <MotionBox
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div variants={itemVariants}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: 'secondary.main', mb: 1 }}>
            다시 만나서 반가워요!
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            ChartSok 계정으로 로그인하세요
          </Typography>
        </Box>
      </motion.div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
          >
            <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>
          </motion.div>
        )}
      </AnimatePresence>

      <Box component="form" onSubmit={handleLogin}>
        <motion.div variants={itemVariants}>
          <TextField
            fullWidth
            name="email"
            label="이메일"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            sx={{ mb: 3 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon sx={{ color: 'grey.400' }} />
                </InputAdornment>
              ),
            }}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <TextField
            fullWidth
            name="password"
            label="비밀번호"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            required
            sx={{ mb: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: 'grey.400' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Box sx={{ textAlign: 'right', mb: 3 }}>
            <Typography
              variant="body2"
              onClick={() => switchView('forgot')}
              sx={{
                color: 'primary.main',
                cursor: 'pointer',
                transition: 'opacity 0.2s',
                '&:hover': { opacity: 0.8 },
              }}
            >
              비밀번호를 잊으셨나요?
            </Typography>
          </Box>
        </motion.div>

        <motion.div variants={itemVariants}>
          <MotionButton
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={loading}
            variants={buttonVariants}
            initial="idle"
            whileHover="hover"
            whileTap="tap"
            sx={{
              py: 1.5,
              mb: 2,
              fontWeight: 600,
              fontSize: '1rem',
              borderRadius: 2,
              background: 'linear-gradient(135deg, #4B9CD3 0%, #3A7BA8 100%)',
              boxShadow: '0 4px 14px rgba(75, 156, 211, 0.3)',
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : '로그인'}
          </MotionButton>
        </motion.div>
      </Box>

      <motion.div variants={itemVariants}>
        <Divider sx={{ my: 3 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary', px: 1 }}>또는</Typography>
        </Divider>
      </motion.div>

      <motion.div variants={itemVariants}>
        <MotionButton
          variant="outlined"
          fullWidth
          size="large"
          onClick={handleGoogleAuth}
          disabled={loading}
          startIcon={<GoogleIcon />}
          variants={buttonVariants}
          initial="idle"
          whileHover="hover"
          whileTap="tap"
          sx={{
            py: 1.5,
            fontWeight: 600,
            borderRadius: 2,
            borderColor: 'grey.300',
            color: 'text.primary',
            '&:hover': { borderColor: 'grey.400', bgcolor: 'grey.50' },
          }}
        >
          Google로 계속하기
        </MotionButton>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            계정이 없으신가요?{' '}
            <Typography
              component="span"
              variant="body2"
              onClick={() => switchView('signup')}
              sx={{
                color: 'primary.main',
                fontWeight: 600,
                cursor: 'pointer',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              회원가입
            </Typography>
          </Typography>
        </Box>
      </motion.div>
    </MotionBox>
  );

  const renderSignup = () => (
    <MotionBox
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div variants={itemVariants}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: 'secondary.main', mb: 1 }}>
            14일 무료 체험 시작
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            지금 가입하고 AI 차트 자동화를 경험하세요
          </Typography>
        </Box>
      </motion.div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
          >
            <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>
          </motion.div>
        )}
      </AnimatePresence>

      <Box component="form" onSubmit={handleSignup}>
        <motion.div variants={itemVariants}>
          <TextField
            fullWidth
            name="name"
            label="이름"
            value={formData.name}
            onChange={handleChange}
            required
            sx={{ mb: 3 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon sx={{ color: 'grey.400' }} />
                </InputAdornment>
              ),
            }}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <TextField
            fullWidth
            name="email"
            label="이메일"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            sx={{ mb: 3 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon sx={{ color: 'grey.400' }} />
                </InputAdornment>
              ),
            }}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <TextField
            fullWidth
            name="password"
            label="비밀번호"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            required
            sx={{ mb: formData.password ? 1 : 3 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: 'grey.400' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </motion.div>

        <AnimatePresence>
          {formData.password && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 2, pl: 1 }}>
                <PasswordCheck valid={passwordChecks.length} text="8자 이상" delay={0} />
                <PasswordCheck valid={passwordChecks.uppercase} text="대문자" delay={0.05} />
                <PasswordCheck valid={passwordChecks.lowercase} text="소문자" delay={0.1} />
                <PasswordCheck valid={passwordChecks.number} text="숫자" delay={0.15} />
              </Box>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div variants={itemVariants}>
          <TextField
            fullWidth
            name="confirmPassword"
            label="비밀번호 확인"
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
            sx={{ mb: 3 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: 'grey.400' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <FormControlLabel
            control={
              <Checkbox
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                color="primary"
                size="small"
              />
            }
            label={
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                <span style={{ color: '#4B9CD3', cursor: 'pointer' }}>이용약관</span> 및{' '}
                <span style={{ color: '#4B9CD3', cursor: 'pointer' }}>개인정보처리방침</span>에 동의합니다
              </Typography>
            }
            sx={{ mb: 2 }}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <MotionButton
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={loading}
            variants={buttonVariants}
            initial="idle"
            whileHover="hover"
            whileTap="tap"
            sx={{
              py: 1.5,
              mb: 2,
              fontWeight: 600,
              fontSize: '1rem',
              borderRadius: 2,
              background: 'linear-gradient(135deg, #4B9CD3 0%, #3A7BA8 100%)',
              boxShadow: '0 4px 14px rgba(75, 156, 211, 0.3)',
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : '무료로 시작하기'}
          </MotionButton>
        </motion.div>
      </Box>

      <motion.div variants={itemVariants}>
        <Divider sx={{ my: 3 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary', px: 1 }}>또는</Typography>
        </Divider>
      </motion.div>

      <motion.div variants={itemVariants}>
        <MotionButton
          variant="outlined"
          fullWidth
          size="large"
          onClick={handleGoogleAuth}
          disabled={loading}
          startIcon={<GoogleIcon />}
          variants={buttonVariants}
          initial="idle"
          whileHover="hover"
          whileTap="tap"
          sx={{
            py: 1.5,
            fontWeight: 600,
            borderRadius: 2,
            borderColor: 'grey.300',
            color: 'text.primary',
            '&:hover': { borderColor: 'grey.400', bgcolor: 'grey.50' },
          }}
        >
          Google로 가입하기
        </MotionButton>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            이미 계정이 있으신가요?{' '}
            <Typography
              component="span"
              variant="body2"
              onClick={() => switchView('login')}
              sx={{
                color: 'primary.main',
                fontWeight: 600,
                cursor: 'pointer',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              로그인
            </Typography>
          </Typography>
        </Box>
      </motion.div>
    </MotionBox>
  );

  const renderForgotPassword = () => (
    <MotionBox
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {resetSuccess ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          <Box sx={{ textAlign: 'center', py: 2 }}>
            <motion.div
              variants={successIconVariants}
              initial="initial"
              animate="animate"
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
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Typography variant="h5" sx={{ fontWeight: 700, color: 'secondary.main', mb: 2 }}>
                이메일을 확인해주세요
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 1 }}>
                <strong>{formData.email}</strong>로
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
                비밀번호 재설정 링크를 보냈습니다.
              </Typography>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Alert severity="info" sx={{ mb: 4, borderRadius: 2, textAlign: 'left' }}>
                이메일이 도착하지 않았다면 스팸 폴더를 확인해주세요.
              </Alert>
              <MotionButton
                variant="contained"
                fullWidth
                size="large"
                onClick={() => switchView('login')}
                variants={buttonVariants}
                initial="idle"
                whileHover="hover"
                whileTap="tap"
                sx={{
                  py: 1.5,
                  fontWeight: 600,
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #4B9CD3 0%, #3A7BA8 100%)',
                }}
              >
                로그인으로 돌아가기
              </MotionButton>
            </motion.div>
          </Box>
        </motion.div>
      ) : (
        <>
          <motion.div variants={itemVariants}>
            <motion.div whileHover={{ x: -3 }} whileTap={{ scale: 0.95 }}>
              <IconButton onClick={() => switchView('login')} sx={{ mb: 2, ml: -1 }}>
                <ArrowBackIcon />
              </IconButton>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <motion.div
                variants={iconPulseVariants}
                initial="initial"
                animate="animate"
              >
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
              </motion.div>
              <Typography variant="h5" sx={{ fontWeight: 700, color: 'secondary.main', mb: 1 }}>
                비밀번호 찾기
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                가입한 이메일로 재설정 링크를 보내드립니다
              </Typography>
            </Box>
          </motion.div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -10, height: 0 }}
              >
                <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>
              </motion.div>
            )}
          </AnimatePresence>

          <Box component="form" onSubmit={handleResetPassword}>
            <motion.div variants={itemVariants}>
              <TextField
                fullWidth
                name="email"
                label="이메일"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                sx={{ mb: 3 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon sx={{ color: 'grey.400' }} />
                    </InputAdornment>
                  ),
                }}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <MotionButton
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={loading}
                variants={buttonVariants}
                initial="idle"
                whileHover="hover"
                whileTap="tap"
                sx={{
                  py: 1.5,
                  fontWeight: 600,
                  fontSize: '1rem',
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #4B9CD3 0%, #3A7BA8 100%)',
                  boxShadow: '0 4px 14px rgba(75, 156, 211, 0.3)',
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : '재설정 링크 보내기'}
              </MotionButton>
            </motion.div>
          </Box>
        </>
      )}
    </MotionBox>
  );

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: 'rgba(15, 42, 68, 0.85)',
            backdropFilter: 'blur(12px)',
          },
        },
      }}
      PaperProps={{
        component: motion.div,
        initial: { opacity: 0, scale: 0.9, y: 20 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.9, y: 20 },
        transition: { type: 'spring', stiffness: 300, damping: 25 },
        sx: {
          borderRadius: 4,
          boxShadow: '0 24px 80px rgba(0, 0, 0, 0.25)',
          overflow: 'hidden',
        },
      }}
    >
      {/* Close Button */}
      <motion.div
        initial={{ opacity: 0, rotate: -90 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ delay: 0.2 }}
      >
        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            zIndex: 1,
            bgcolor: 'grey.100',
            transition: 'all 0.2s ease',
            '&:hover': { bgcolor: 'grey.200', transform: 'rotate(90deg)' },
          }}
          size="small"
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </motion.div>

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Box
          sx={{
            pt: 4,
            pb: 2,
            textAlign: 'center',
            background: 'linear-gradient(180deg, rgba(75, 156, 211, 0.1) 0%, transparent 100%)',
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              background: 'linear-gradient(135deg, #4B9CD3 0%, #3A7BA8 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            ChartSok
          </Typography>
        </Box>
      </motion.div>

      <DialogContent sx={{ p: 4, pt: 2 }}>
        <AnimatePresence mode="wait">
          {view === 'login' && <div key="login">{renderLogin()}</div>}
          {view === 'signup' && <div key="signup">{renderSignup()}</div>}
          {view === 'forgot' && <div key="forgot">{renderForgotPassword()}</div>}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
