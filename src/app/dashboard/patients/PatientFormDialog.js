'use client';

import { useState, useEffect, memo, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  MenuItem,
  Paper,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';

// Format Korean phone number (010-1234-5678) - only on blur
const formatPhoneNumber = (value) => {
  if (!value) return '';
  const numbers = value.replace(/\D/g, '');

  if (numbers.startsWith('02')) {
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 5) return `${numbers.slice(0, 2)}-${numbers.slice(2)}`;
    if (numbers.length <= 9) return `${numbers.slice(0, 2)}-${numbers.slice(2, 5)}-${numbers.slice(5)}`;
    return `${numbers.slice(0, 2)}-${numbers.slice(2, 6)}-${numbers.slice(6, 10)}`;
  } else {
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
  }
};

function PatientFormDialog({ open, mode, patient, onClose, onSave }) {
  // Use refs for uncontrolled inputs to avoid re-renders
  const nameRef = useRef(null);
  const genderRef = useRef(null);
  const birthDateRef = useRef(null);
  const phoneRef = useRef(null);
  const addressRef = useRef(null);
  const notesRef = useRef(null);

  const [saving, setSaving] = useState(false);
  // Only use state for gender since it's a select
  const [gender, setGender] = useState('남');
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  // Reset form when dialog opens with new data
  useEffect(() => {
    if (open) {
      // Use setTimeout to ensure refs are available after render
      setTimeout(() => {
        if (patient && (mode === 'edit' || mode === 'view')) {
          if (nameRef.current) nameRef.current.value = patient.name || '';
          setGender(patient.gender || '남');
          if (birthDateRef.current) birthDateRef.current.value = patient.birthDate || '';
          if (phoneRef.current) phoneRef.current.value = patient.phone || '';
          if (addressRef.current) addressRef.current.value = patient.address || '';
          if (notesRef.current) notesRef.current.value = patient.notes || '';
        } else {
          if (nameRef.current) nameRef.current.value = '';
          setGender('남');
          if (birthDateRef.current) birthDateRef.current.value = '';
          if (phoneRef.current) phoneRef.current.value = '';
          if (addressRef.current) addressRef.current.value = '';
          if (notesRef.current) notesRef.current.value = '';
        }
      }, 0);
    }
  }, [open, patient, mode]);

  const handlePhoneChange = (e) => {
    if (phoneRef.current) {
      phoneRef.current.value = formatPhoneNumber(e.target.value);
    }
  };

  const handleSave = async () => {
    const name = nameRef.current?.value || '';
    const birthDate = birthDateRef.current?.value || '';
    const phone = phoneRef.current?.value || '';
    const address = addressRef.current?.value || '';
    const notes = notesRef.current?.value || '';

    // Validate required fields
    if (!name || !birthDate || !phone || !address) {
      setSnackbar({ open: true, message: '모든 필드를 입력해주세요' });
      return;
    }

    const formData = {
      name,
      gender,
      birthDate,
      phone,
      address,
      notes,
    };

    setSaving(true);
    try {
      await onSave(formData);
    } finally {
      setSaving(false);
    }
  };

  const isDisabled = mode === 'view';

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 700, pb: 1 }}>
        {mode === 'add' ? '새 환자 등록' : mode === 'edit' ? '환자 정보 수정' : '환자 정보'}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              required
              label="이름"
              inputRef={nameRef}
              defaultValue=""
              disabled={isDisabled}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              required
              select
              label="성별"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              disabled={isDisabled}
            >
              <MenuItem value="남">남성</MenuItem>
              <MenuItem value="여">여성</MenuItem>
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              required
              label="생년월일"
              type="date"
              inputRef={birthDateRef}
              defaultValue=""
              InputLabelProps={{ shrink: true }}
              disabled={isDisabled}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              required
              label="전화번호"
              inputRef={phoneRef}
              defaultValue=""
              placeholder="010-0000-0000"
              onChange={handlePhoneChange}
              disabled={isDisabled}
              inputProps={{ maxLength: 13 }}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              required
              label="주소"
              inputRef={addressRef}
              defaultValue=""
              disabled={isDisabled}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="메모"
              inputRef={notesRef}
              defaultValue=""
              multiline
              rows={3}
              disabled={isDisabled}
            />
          </Grid>
          {mode === 'view' && patient && (
            <>
              <Grid size={{ xs: 6 }}>
                <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, textAlign: 'center' }}>
                  <Typography variant="caption" color="text.secondary">차트번호</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>{patient.chartNo}</Typography>
                </Paper>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, textAlign: 'center' }}>
                  <Typography variant="caption" color="text.secondary">총 방문 횟수</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>{patient.visitCount}회</Typography>
                </Paper>
              </Grid>
            </>
          )}
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: 2.5, pt: 1 }}>
        <Button onClick={onClose} sx={{ borderRadius: 2 }}>
          {mode === 'view' ? '닫기' : '취소'}
        </Button>
        {mode !== 'view' && (
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={saving}
            sx={{
              borderRadius: 2,
              background: 'linear-gradient(135deg, #4B9CD3 0%, #3A7BA8 100%)',
            }}
          >
            {saving ? <CircularProgress size={20} /> : (mode === 'add' ? '등록' : '저장')}
          </Button>
        )}
      </DialogActions>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity="warning" onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Dialog>
  );
}

export default memo(PatientFormDialog);
