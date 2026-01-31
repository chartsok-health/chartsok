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
  const allergiesRef = useRef(null);
  const notesRef = useRef(null);

  const [saving, setSaving] = useState(false);
  // Only use state for gender since it's a select
  const [gender, setGender] = useState('남');

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
          if (allergiesRef.current) allergiesRef.current.value = patient.allergies || '';
          if (notesRef.current) notesRef.current.value = patient.notes || '';
        } else {
          if (nameRef.current) nameRef.current.value = '';
          setGender('남');
          if (birthDateRef.current) birthDateRef.current.value = '';
          if (phoneRef.current) phoneRef.current.value = '';
          if (addressRef.current) addressRef.current.value = '';
          if (allergiesRef.current) allergiesRef.current.value = '';
          if (notesRef.current) notesRef.current.value = '';
        }
      }, 0);
    }
  }, [open, patient, mode]);

  const handlePhoneBlur = () => {
    if (phoneRef.current) {
      phoneRef.current.value = formatPhoneNumber(phoneRef.current.value);
    }
  };

  const handleSave = async () => {
    const formData = {
      name: nameRef.current?.value || '',
      gender: gender,
      birthDate: birthDateRef.current?.value || '',
      phone: phoneRef.current?.value || '',
      address: addressRef.current?.value || '',
      allergies: allergiesRef.current?.value || '',
      notes: notesRef.current?.value || '',
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
              label="이름"
              inputRef={nameRef}
              defaultValue=""
              disabled={isDisabled}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
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
              label="전화번호"
              inputRef={phoneRef}
              defaultValue=""
              placeholder="010-0000-0000"
              onBlur={handlePhoneBlur}
              disabled={isDisabled}
              inputProps={{ maxLength: 13 }}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="주소"
              inputRef={addressRef}
              defaultValue=""
              disabled={isDisabled}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="알레르기"
              inputRef={allergiesRef}
              defaultValue=""
              placeholder="예: 페니실린, 아스피린"
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
              {patient.allergies && (
                <Grid size={{ xs: 12 }}>
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: '#FEF2F2',
                      borderColor: '#FECACA',
                    }}
                  >
                    <Typography variant="caption" sx={{ color: '#DC2626', fontWeight: 600 }}>
                      알레르기 주의
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#DC2626', fontWeight: 700 }}>
                      {patient.allergies}
                    </Typography>
                  </Paper>
                </Grid>
              )}
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
    </Dialog>
  );
}

export default memo(PatientFormDialog);
