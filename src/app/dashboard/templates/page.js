'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
  Skeleton,
  InputAdornment,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import DescriptionIcon from '@mui/icons-material/Description';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SearchIcon from '@mui/icons-material/Search';
import { useAuth } from '@/lib/AuthContext';
import { doc, collection, addDoc, updateDoc, deleteDoc, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const MotionCard = motion.create(Card);

const categories = [
  { value: 'soap', label: 'SOAP 형식', color: '#4B9CD3' },
  { value: 'narrative', label: '서술형', color: '#10B981' },
  { value: 'problem', label: '문제 중심', color: '#F59E0B' },
  { value: 'custom', label: '사용자 정의', color: '#8B5CF6' },
];

const defaultTemplates = [
  {
    id: 'default-soap',
    name: 'SOAP 기본',
    description: '표준 SOAP 형식 차트 템플릿',
    category: 'soap',
    isDefault: true,
    isSystem: true,
    content: `[Subjective]
환자의 주호소 및 현병력을 기록합니다.
- 주호소:
- 발병 시기:
- 증상 양상:
- 동반 증상:
- 과거력:

[Objective]
신체 검진 및 검사 소견을 기록합니다.
- V/S: BP    /   , HR    , BT    ℃
- 신체 검진:
- 검사 소견:

[Assessment]
진단 및 감별 진단을 기록합니다.
- 진단:
- ICD 코드:

[Plan]
치료 계획 및 처방을 기록합니다.
- 처방:
- 교육:
- 추적 관찰:`,
  },
  {
    id: 'default-narrative',
    name: '서술형 기본',
    description: '자연스러운 문장 형식의 진료 기록',
    category: 'narrative',
    isDefault: false,
    isSystem: true,
    content: `[진료 기록]

환자는 [주호소]를 주소로 내원하였습니다.

[현병력]
증상이 시작된 시기, 양상, 경과를 자세히 기술합니다.

[신체 검진]
활력 징후 및 신체 검진 소견을 기술합니다.

[평가]
임상적 판단 및 진단을 기술합니다.

[치료 계획]
처방, 교육, 추후 계획을 기술합니다.`,
  },
];

export default function TemplatesPage() {
  const { user } = useAuth();
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [templateToDelete, setTemplateToDelete] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'custom',
    content: '',
    isDefault: false,
  });

  // Fetch templates from Firestore
  useEffect(() => {
    if (!user) return;

    const fetchTemplates = async () => {
      try {
        const templatesRef = collection(db, 'users', user.uid, 'templates');
        const q = query(templatesRef, orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        const userTemplates = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTemplates([...defaultTemplates, ...userTemplates]);
      } catch (error) {
        console.error('Error fetching templates:', error);
        setTemplates(defaultTemplates);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, [user]);

  const handleOpenDialog = (template = null) => {
    if (template) {
      setEditingTemplate(template);
      setFormData({
        name: template.name,
        description: template.description,
        category: template.category,
        content: template.content,
        isDefault: template.isDefault,
      });
    } else {
      setEditingTemplate(null);
      setFormData({
        name: '',
        description: '',
        category: 'custom',
        content: '',
        isDefault: false,
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingTemplate(null);
  };

  const handleSaveTemplate = async () => {
    if (!formData.name.trim() || !formData.content.trim()) {
      setSnackbar({ open: true, message: '템플릿 이름과 내용을 입력해주세요', severity: 'error' });
      return;
    }

    try {
      const templatesRef = collection(db, 'users', user.uid, 'templates');

      // If setting as default, unset other defaults
      if (formData.isDefault) {
        const currentDefault = templates.find(t => t.isDefault && !t.isSystem && t.id !== editingTemplate?.id);
        if (currentDefault) {
          await updateDoc(doc(db, 'users', user.uid, 'templates', currentDefault.id), {
            isDefault: false,
          });
        }
      }

      if (editingTemplate && !editingTemplate.isSystem) {
        // Update existing template
        await updateDoc(doc(db, 'users', user.uid, 'templates', editingTemplate.id), {
          ...formData,
          updatedAt: new Date().toISOString(),
        });
        setTemplates(prev => prev.map(t =>
          t.id === editingTemplate.id ? { ...t, ...formData } : (formData.isDefault && !t.isSystem ? { ...t, isDefault: false } : t)
        ));
        setSnackbar({ open: true, message: '템플릿이 수정되었습니다', severity: 'success' });
      } else {
        // Create new template
        const newTemplate = {
          ...formData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        const docRef = await addDoc(templatesRef, newTemplate);
        setTemplates(prev => {
          const updated = formData.isDefault
            ? prev.map(t => t.isSystem ? t : { ...t, isDefault: false })
            : prev;
          return [{ id: docRef.id, ...newTemplate }, ...updated.filter(t => t.isSystem || t.id !== docRef.id)];
        });
        setSnackbar({ open: true, message: '템플릿이 생성되었습니다', severity: 'success' });
      }

      handleCloseDialog();
    } catch (error) {
      console.error('Error saving template:', error);
      setSnackbar({ open: true, message: '템플릿 저장에 실패했습니다', severity: 'error' });
    }
  };

  const handleDeleteTemplate = async () => {
    if (!templateToDelete || templateToDelete.isSystem) return;

    try {
      await deleteDoc(doc(db, 'users', user.uid, 'templates', templateToDelete.id));
      setTemplates(prev => prev.filter(t => t.id !== templateToDelete.id));
      setSnackbar({ open: true, message: '템플릿이 삭제되었습니다', severity: 'success' });
    } catch (error) {
      console.error('Error deleting template:', error);
      setSnackbar({ open: true, message: '템플릿 삭제에 실패했습니다', severity: 'error' });
    } finally {
      setDeleteDialogOpen(false);
      setTemplateToDelete(null);
    }
  };

  const handleDuplicateTemplate = (template) => {
    setFormData({
      name: `${template.name} (복사본)`,
      description: template.description,
      category: template.category,
      content: template.content,
      isDefault: false,
    });
    setEditingTemplate(null);
    setDialogOpen(true);
  };

  const handleSetDefault = async (template) => {
    if (template.isSystem) {
      // For system templates, just update local state
      setTemplates(prev => prev.map(t => ({
        ...t,
        isDefault: t.id === template.id,
      })));
      setSnackbar({ open: true, message: '기본 템플릿이 변경되었습니다', severity: 'success' });
      return;
    }

    try {
      // Unset current default
      const currentDefault = templates.find(t => t.isDefault && !t.isSystem);
      if (currentDefault) {
        await updateDoc(doc(db, 'users', user.uid, 'templates', currentDefault.id), {
          isDefault: false,
        });
      }

      // Set new default
      await updateDoc(doc(db, 'users', user.uid, 'templates', template.id), {
        isDefault: true,
      });

      setTemplates(prev => prev.map(t => ({
        ...t,
        isDefault: t.id === template.id,
      })));
      setSnackbar({ open: true, message: '기본 템플릿이 변경되었습니다', severity: 'success' });
    } catch (error) {
      console.error('Error setting default:', error);
      setSnackbar({ open: true, message: '기본 템플릿 설정에 실패했습니다', severity: 'error' });
    }
  };

  const filteredTemplates = templates.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || t.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getCategoryInfo = (categoryValue) => {
    return categories.find(c => c.value === categoryValue) || categories[3];
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1400, mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: 'secondary.main', mb: 0.5 }}>
              템플릿
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              나만의 차트 템플릿을 만들어 AI가 당신의 스타일로 차트를 작성하게 하세요
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
            sx={{
              px: 3,
              background: 'linear-gradient(135deg, #4B9CD3 0%, #3A7BA8 100%)',
            }}
          >
            새 템플릿
          </Button>
        </Box>
      </Box>

      {/* Filters */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 3,
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'grey.200',
          display: 'flex',
          gap: 2,
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <TextField
          placeholder="템플릿 검색..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="small"
          sx={{ minWidth: 250 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
          }}
        />
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>카테고리</InputLabel>
          <Select
            value={categoryFilter}
            label="카테고리"
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <MenuItem value="all">전체</MenuItem>
            {categories.map(cat => (
              <MenuItem key={cat.value} value={cat.value}>{cat.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 1 }}>
          <AutoAwesomeIcon sx={{ color: 'primary.main', fontSize: 20 }} />
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {filteredTemplates.length}개 템플릿
          </Typography>
        </Box>
      </Paper>

      {/* Templates Grid */}
      {loading ? (
        <Grid container spacing={3}>
          {[1, 2, 3, 4].map(i => (
            <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={i}>
              <Skeleton variant="rounded" height={220} sx={{ borderRadius: 3 }} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container spacing={3}>
          <AnimatePresence>
            {filteredTemplates.map((template, index) => {
              const categoryInfo = getCategoryInfo(template.category);
              return (
                <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={template.id}>
                  <MotionCard
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                    elevation={0}
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 3,
                      border: '1px solid',
                      borderColor: template.isDefault ? 'primary.main' : 'grey.200',
                      position: 'relative',
                      overflow: 'visible',
                      '&:hover': {
                        borderColor: 'primary.main',
                        boxShadow: '0 4px 20px rgba(75, 156, 211, 0.15)',
                      },
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {template.isDefault && (
                      <Chip
                        icon={<StarIcon sx={{ fontSize: 14 }} />}
                        label="기본 템플릿"
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: -12,
                          right: 16,
                          bgcolor: 'primary.main',
                          color: 'white',
                          fontWeight: 600,
                          fontSize: '0.7rem',
                        }}
                      />
                    )}
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                        <Box
                          sx={{
                            width: 44,
                            height: 44,
                            borderRadius: 2,
                            bgcolor: `${categoryInfo.color}15`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <DescriptionIcon sx={{ color: categoryInfo.color, fontSize: 22 }} />
                        </Box>
                        <Chip
                          label={categoryInfo.label}
                          size="small"
                          sx={{
                            bgcolor: `${categoryInfo.color}15`,
                            color: categoryInfo.color,
                            fontWeight: 600,
                            fontSize: '0.7rem',
                          }}
                        />
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: 'secondary.main' }}>
                        {template.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                        {template.description}
                      </Typography>
                      {template.isSystem && (
                        <Chip
                          label="시스템 템플릿"
                          size="small"
                          sx={{
                            bgcolor: 'grey.100',
                            color: 'text.secondary',
                            fontSize: '0.65rem',
                          }}
                        />
                      )}
                    </CardContent>
                    <CardActions sx={{ p: 2, pt: 0, flexDirection: 'column', gap: 1.5 }}>
                      {/* Edit Button - prominent for user templates */}
                      {!template.isSystem && (
                        <Button
                          fullWidth
                          variant="outlined"
                          startIcon={<EditIcon />}
                          onClick={() => handleOpenDialog(template)}
                          sx={{
                            borderRadius: 2,
                            borderColor: 'primary.200',
                            color: 'primary.main',
                            '&:hover': {
                              borderColor: 'primary.main',
                              bgcolor: 'primary.50',
                            },
                          }}
                        >
                          템플릿 수정
                        </Button>
                      )}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <Box>
                          <Tooltip title={template.isDefault ? '기본 템플릿' : '기본으로 설정'}>
                            <IconButton
                              size="small"
                              onClick={() => handleSetDefault(template)}
                              sx={{ color: template.isDefault ? 'primary.main' : 'grey.400' }}
                            >
                              {template.isDefault ? <StarIcon /> : <StarBorderIcon />}
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="복제">
                            <IconButton size="small" onClick={() => handleDuplicateTemplate(template)}>
                              <ContentCopyIcon sx={{ fontSize: 18 }} />
                            </IconButton>
                          </Tooltip>
                        </Box>
                        <Box>
                          {!template.isSystem && (
                            <Tooltip title="삭제">
                              <IconButton
                                size="small"
                                onClick={() => {
                                  setTemplateToDelete(template);
                                  setDeleteDialogOpen(true);
                                }}
                                sx={{ color: 'error.main' }}
                              >
                                <DeleteIcon sx={{ fontSize: 18 }} />
                              </IconButton>
                            </Tooltip>
                          )}
                        </Box>
                      </Box>
                    </CardActions>
                  </MotionCard>
                </Grid>
              );
            })}
          </AnimatePresence>
        </Grid>
      )}

      {/* Empty State */}
      {!loading && filteredTemplates.length === 0 && (
        <Paper
          elevation={0}
          sx={{
            p: 6,
            textAlign: 'center',
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'grey.200',
          }}
        >
          <DescriptionIcon sx={{ fontSize: 64, color: 'grey.300', mb: 2 }} />
          <Typography variant="h6" sx={{ color: 'text.secondary', mb: 1 }}>
            템플릿이 없습니다
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
            새 템플릿을 만들어 AI가 당신의 스타일로 차트를 작성하게 하세요
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            첫 템플릿 만들기
          </Button>
        </Paper>
      )}

      {/* Create/Edit Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3 }
        }}
      >
        <DialogTitle sx={{ fontWeight: 700 }}>
          {editingTemplate ? '템플릿 수정' : '새 템플릿 만들기'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 1 }}>
            <TextField
              label="템플릿 이름"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              fullWidth
              placeholder="예: 내과 초진 템플릿"
            />
            <TextField
              label="설명"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              fullWidth
              placeholder="이 템플릿의 용도를 간단히 설명해주세요"
            />
            <FormControl fullWidth>
              <InputLabel>카테고리</InputLabel>
              <Select
                value={formData.category}
                label="카테고리"
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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
            <TextField
              label="템플릿 내용"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              fullWidth
              multiline
              rows={12}
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
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button
                variant={formData.isDefault ? 'contained' : 'outlined'}
                size="small"
                startIcon={formData.isDefault ? <StarIcon /> : <StarBorderIcon />}
                onClick={() => setFormData({ ...formData, isDefault: !formData.isDefault })}
                sx={{
                  borderRadius: 2,
                  ...(formData.isDefault && {
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
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={handleCloseDialog}>취소</Button>
          <Button
            variant="contained"
            onClick={handleSaveTemplate}
            sx={{
              background: 'linear-gradient(135deg, #4B9CD3 0%, #3A7BA8 100%)',
            }}
          >
            {editingTemplate ? '저장' : '만들기'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle sx={{ fontWeight: 700 }}>템플릿 삭제</DialogTitle>
        <DialogContent>
          <Typography>
            "{templateToDelete?.name}" 템플릿을 삭제하시겠습니까?
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
            이 작업은 되돌릴 수 없습니다.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDeleteDialogOpen(false)}>취소</Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteTemplate}
          >
            삭제
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
