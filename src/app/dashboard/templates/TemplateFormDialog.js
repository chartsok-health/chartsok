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
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const categories = [
  { value: 'soap', label: 'SOAP', color: '#4B9CD3', description: '표준 SOAP 형식 (Subjective, Objective, Assessment, Plan)' },
  { value: 'narrative', label: '서술형', color: '#10B981', description: '자유 형식의 서술형 차트' },
  { value: 'problem', label: '문제 중심', color: '#F59E0B', description: '문제 중심 의무기록 (POMR)' },
  { value: 'custom', label: '사용자 정의', color: '#8B5CF6', description: '나만의 맞춤 형식' },
];

function TemplateFormDialog({ open, mode = 'add', template, onClose, onSave }) {
  // Use refs for uncontrolled inputs to avoid re-renders
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const contentRef = useRef(null);

  const [saving, setSaving] = useState(false);
  const [category, setCategory] = useState('custom');
  const [isDefault, setIsDefault] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'warning' });

  // Reset form when dialog opens with new data
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        if (template && (mode === 'edit' || mode === 'view')) {
          if (nameRef.current) nameRef.current.value = template.name || '';
          if (descriptionRef.current) descriptionRef.current.value = template.description || '';
          if (contentRef.current) contentRef.current.value = template.content || '';
          setCategory(template.category || 'custom');
          setIsDefault(template.isDefault || false);
        } else {
          if (nameRef.current) nameRef.current.value = '';
          if (descriptionRef.current) descriptionRef.current.value = '';
          if (contentRef.current) contentRef.current.value = '';
          setCategory('custom');
          setIsDefault(false);
        }
      }, 0);
    }
  }, [open, template, mode]);

  const handleSave = async () => {
    const name = nameRef.current?.value || '';
    const description = descriptionRef.current?.value || '';
    const content = contentRef.current?.value || '';

    // Validate required fields
    if (!name.trim() || !content.trim()) {
      setSnackbar({ open: true, message: '템플릿 이름과 내용을 입력해주세요', severity: 'warning' });
      return;
    }

    const formData = {
      name,
      description,
      category,
      content,
      isDefault,
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
      maxWidth="md"
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
        {mode === 'add' ? '새 템플릿 만들기' : mode === 'edit' ? '템플릿 수정' : '템플릿 상세'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                required
                label="템플릿 이름"
                inputRef={nameRef}
                defaultValue=""
                disabled={isDisabled}
                placeholder="예: 내과 초진 템플릿"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Box sx={{ width: '100%' }}>
                <FormControl fullWidth disabled={isDisabled}>
                  <InputLabel>카테고리</InputLabel>
                  <Select
                    value={category}
                    label="카테고리"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categories.map(cat => (
                      <MenuItem key={cat.value} value={cat.value}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: cat.color }} />
                          {cat.label}
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Typography variant="caption" sx={{ color: 'text.secondary', mt: 1, display: 'block' }}>
                  {categories.find(c => c.value === category)?.description}
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="설명"
                inputRef={descriptionRef}
                defaultValue=""
                disabled={isDisabled}
                placeholder="이 템플릿의 용도를 간단히 설명해주세요"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                required
                label="템플릿 내용"
                inputRef={contentRef}
                defaultValue=""
                multiline
                rows={10}
                disabled={isDisabled}
                placeholder={`차트 형식을 작성하세요. AI가 이 형식에 맞춰 차트를 생성합니다.

예시:
[Subjective]
환자의 주호소...

[Objective]
신체 검진...

[Assessment]
진단...

[Plan]
치료 계획...`}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    fontFamily: 'monospace',
                    fontSize: '0.875rem',
                  },
                }}
              />
            </Grid>
          </Grid>
          {mode !== 'view' && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button
                variant={isDefault ? 'contained' : 'outlined'}
                size="small"
                startIcon={isDefault ? <StarIcon /> : <StarBorderIcon />}
                onClick={() => setIsDefault(!isDefault)}
                sx={{
                  borderRadius: 2,
                  ...(isDefault && {
                    background: 'linear-gradient(135deg, #4B9CD3 0%, #3A7BA8 100%)',
                  }),
                }}
              >
                기본 템플릿으로 설정
              </Button>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                새 진료 시 이 템플릿이 자동으로 선택됩니다
              </Typography>
            </Box>
          )}
        </Box>
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
            {saving ? <CircularProgress size={20} /> : (mode === 'add' ? '만들기' : '저장')}
          </Button>
        )}
      </DialogActions>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Dialog>
  );
}

export default memo(TemplateFormDialog);
