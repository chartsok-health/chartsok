'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
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
  CircularProgress,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import DescriptionIcon from '@mui/icons-material/Description';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useAuth } from '@/lib/AuthContext';
import { doc, collection, addDoc, updateDoc, deleteDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const MotionBox = motion.create(Box);
const MotionCard = motion.create(Card);
const MotionPaper = motion.create(Paper);

const categories = [
  {
    value: 'soap',
    label: 'SOAP 형식',
    color: '#4B9CD3',
    description: 'Subjective(주관적), Objective(객관적), Assessment(평가), Plan(계획)으로 구성된 표준 의료 차트 형식입니다. 체계적인 기록에 적합합니다.',
  },
  {
    value: 'narrative',
    label: '서술형',
    color: '#10B981',
    description: '자연스러운 문장으로 진료 내용을 서술하는 형식입니다. 복잡한 상황이나 상세한 설명이 필요할 때 적합합니다.',
  },
  {
    value: 'problem',
    label: '문제 중심',
    color: '#F59E0B',
    description: '환자의 문제 목록을 중심으로 기록하는 형식입니다. 여러 증상이나 만성 질환 관리에 적합합니다.',
  },
  {
    value: 'custom',
    label: '사용자 정의',
    color: '#8B5CF6',
    description: '특정 진료과나 상황에 맞게 자유롭게 구성할 수 있는 형식입니다. 나만의 차트 스타일을 만들 수 있습니다.',
  },
];

const defaultTemplates = [
  {
    id: 'default-soap',
    name: 'SOAP 기본',
    description: '표준 SOAP 형식 차트 템플릿',
    category: 'soap',
    isDefault: false, // Default will be computed - SOAP is fallback if no user template is default
    isSystem: true,
    status: 'active',
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
];

export default function TemplatesPage() {
  const { user } = useAuth();
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState('add'); // 'add' | 'edit' | 'view'
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('active'); // 'active' | 'archived' | 'all'
  const [categoryFilter, setCategoryFilter] = useState('all'); // 'all' | 'soap' | 'narrative' | 'problem' | 'custom'
  const rowsPerPage = 6;

  // Use refs for text inputs to avoid re-renders on every keystroke
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const contentRef = useRef(null);

  // Keep state only for select and checkbox
  const [formCategory, setFormCategory] = useState('custom');
  const [formIsDefault, setFormIsDefault] = useState(false);

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
          status: doc.data().status || 'active',
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

  // Stats calculation
  const { totalTemplates, activeTemplates, archivedTemplates, stats } = useMemo(() => {
    const userTemplates = templates.filter(t => !t.isSystem);
    const total = userTemplates.length;
    const active = userTemplates.filter(t => t.status === 'active').length;
    const archived = userTemplates.filter(t => t.status === 'archived').length;
    return {
      totalTemplates: total,
      activeTemplates: active,
      archivedTemplates: archived,
      stats: [
        { label: '전체 템플릿', value: total + defaultTemplates.length, icon: DescriptionIcon, color: '#4B9CD3', bgColor: '#EBF5FF' },
        { label: '활성 템플릿', value: active + defaultTemplates.length, icon: VerifiedIcon, color: '#10B981', bgColor: '#ECFDF5' },
        { label: '보관된 템플릿', value: archived, icon: ArchiveIcon, color: '#6B7280', bgColor: '#F3F4F6' },
      ],
    };
  }, [templates]);

  // Compute the effective default template - user's default or SOAP as fallback
  const effectiveDefaultId = useMemo(() => {
    const userDefault = templates.find(t => t.isDefault && !t.isSystem);
    if (userDefault) return userDefault.id;
    return 'default-soap'; // SOAP is always the fallback
  }, [templates]);

  const filteredTemplates = useMemo(() => {
    return templates.filter(t => {
      // System templates always show in active view
      if (t.isSystem && statusFilter === 'archived') return false;
      if (t.isSystem && statusFilter !== 'archived') {
        // Still apply category filter to system templates
        if (categoryFilter !== 'all' && t.category !== categoryFilter) {
          return false;
        }
      }

      // Filter by status for non-system templates
      if (!t.isSystem && statusFilter !== 'all' && t.status !== statusFilter) {
        return false;
      }

      // Filter by category
      if (categoryFilter !== 'all' && t.category !== categoryFilter) {
        return false;
      }

      // Filter by search
      if (searchQuery) {
        return (
          t.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.description?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      return true;
    });
  }, [templates, statusFilter, categoryFilter, searchQuery]);

  const paginatedTemplates = useMemo(() => {
    return filteredTemplates.slice(
      (page - 1) * rowsPerPage,
      page * rowsPerPage
    );
  }, [filteredTemplates, page, rowsPerPage]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const handleOpenDialog = (mode, template = null) => {
    setDialogMode(mode);
    setSelectedTemplate(template);
    if (template && (mode === 'edit' || mode === 'view')) {
      setFormCategory(template.category);
      setFormIsDefault(template.isDefault || false);
      // Set ref values after dialog opens
      setTimeout(() => {
        if (nameRef.current) nameRef.current.value = template.name || '';
        if (descriptionRef.current) descriptionRef.current.value = template.description || '';
        if (contentRef.current) contentRef.current.value = template.content || '';
      }, 0);
    } else {
      setFormCategory('custom');
      setFormIsDefault(false);
      setTimeout(() => {
        if (nameRef.current) nameRef.current.value = '';
        if (descriptionRef.current) descriptionRef.current.value = '';
        if (contentRef.current) contentRef.current.value = '';
      }, 0);
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedTemplate(null);
  };

  const handleSaveTemplate = async () => {
    const name = nameRef.current?.value || '';
    const description = descriptionRef.current?.value || '';
    const content = contentRef.current?.value || '';

    if (!name.trim() || !content.trim()) {
      setSnackbar({ open: true, message: '템플릿 이름과 내용을 입력해주세요', severity: 'warning' });
      return;
    }

    const formData = {
      name,
      description,
      category: formCategory,
      content,
      isDefault: formIsDefault,
    };

    setSaving(true);
    try {
      const templatesRef = collection(db, 'users', user.uid, 'templates');

      // If setting as default, unset other defaults
      if (formIsDefault) {
        const currentDefault = templates.find(t => t.isDefault && !t.isSystem && t.id !== selectedTemplate?.id);
        if (currentDefault) {
          await updateDoc(doc(db, 'users', user.uid, 'templates', currentDefault.id), {
            isDefault: false,
          });
        }
      }

      if (dialogMode === 'edit' && selectedTemplate && !selectedTemplate.isSystem) {
        await updateDoc(doc(db, 'users', user.uid, 'templates', selectedTemplate.id), {
          ...formData,
          updatedAt: new Date().toISOString(),
        });
        setTemplates(prev => prev.map(t =>
          t.id === selectedTemplate.id ? { ...t, ...formData } : (formIsDefault && !t.isSystem ? { ...t, isDefault: false } : t)
        ));
        setSnackbar({ open: true, message: '템플릿이 수정되었습니다', severity: 'success' });
      } else {
        const newTemplate = {
          ...formData,
          status: 'active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        const docRef = await addDoc(templatesRef, newTemplate);
        setTemplates(prev => {
          const updated = formIsDefault
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
    } finally {
      setSaving(false);
    }
  };

  const handleArchiveTemplate = async (id, currentStatus) => {
    const template = templates.find(t => t.id === id);
    if (!template || template.isSystem) return;

    const isArchiving = currentStatus === 'active';
    const message = isArchiving
      ? '이 템플릿을 보관함으로 이동하시겠습니까?'
      : '이 템플릿을 활성 상태로 복원하시겠습니까?';

    if (confirm(message)) {
      try {
        const newStatus = isArchiving ? 'archived' : 'active';
        await updateDoc(doc(db, 'users', user.uid, 'templates', id), {
          status: newStatus,
          updatedAt: new Date().toISOString(),
        });
        setTemplates(templates.map(t =>
          t.id === id ? { ...t, status: newStatus } : t
        ));
        setSnackbar({
          open: true,
          message: isArchiving ? '템플릿이 보관되었습니다' : '템플릿이 복원되었습니다',
          severity: 'success',
        });
      } catch (error) {
        console.error('Error updating template status:', error);
        setSnackbar({ open: true, message: '상태 변경에 실패했습니다', severity: 'error' });
      }
    }
  };

  const handleDeleteTemplate = async (template) => {
    if (!template || template.isSystem) return;

    if (!confirm('이 템플릿을 완전히 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'users', user.uid, 'templates', template.id));
      setTemplates(prev => prev.filter(t => t.id !== template.id));
      setSnackbar({ open: true, message: '템플릿이 삭제되었습니다', severity: 'info' });
    } catch (error) {
      console.error('Error deleting template:', error);
      setSnackbar({ open: true, message: '템플릿 삭제에 실패했습니다', severity: 'error' });
    }
  };

  const handleDuplicateTemplate = (template) => {
    setDialogMode('add');
    setSelectedTemplate(null);
    setFormCategory(template.category);
    setFormIsDefault(false);
    setDialogOpen(true);
    setTimeout(() => {
      if (nameRef.current) nameRef.current.value = `${template.name} (복사본)`;
      if (descriptionRef.current) descriptionRef.current.value = template.description || '';
      if (contentRef.current) contentRef.current.value = template.content || '';
    }, 0);
  };

  const handleSetDefault = async (template) => {
    // If clicking on already-default template, do nothing
    if (effectiveDefaultId === template.id) {
      return;
    }

    // Cannot set system template as default manually - it's the automatic fallback
    if (template.isSystem) {
      return;
    }

    try {
      // Find current user default and unset it
      const currentUserDefault = templates.find(t => t.isDefault && !t.isSystem);
      if (currentUserDefault) {
        await updateDoc(doc(db, 'users', user.uid, 'templates', currentUserDefault.id), {
          isDefault: false,
        });
      }

      // Set new user template as default
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

  const getCategoryInfo = (categoryValue) => {
    return categories.find(c => c.value === categoryValue) || categories[3];
  };

  const isDisabled = dialogMode === 'view';

  if (loading) {
    return (
      <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1400, mx: 'auto' }}>
        <Box sx={{ mb: 4 }}>
          <Skeleton variant="text" width={200} height={40} />
          <Skeleton variant="text" width={300} height={24} />
        </Box>
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {[1, 2, 3].map((i) => (
            <Grid size={{ xs: 12, sm: 4 }} key={i}>
              <Skeleton variant="rounded" height={100} sx={{ borderRadius: 3 }} />
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={2}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
              <Skeleton variant="rounded" height={280} sx={{ borderRadius: 3 }} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1400, mx: 'auto' }}>
      {/* Header */}
      <MotionBox
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{ mb: 4 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: 'secondary.main', mb: 0.5 }}>
              템플릿 관리
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              나만의 차트 템플릿을 만들어 AI가 당신의 스타일로 차트를 작성하게 하세요
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog('add')}
            sx={{
              borderRadius: 2,
              background: 'linear-gradient(135deg, #4B9CD3 0%, #3A7BA8 100%)',
              boxShadow: '0 4px 14px rgba(75, 156, 211, 0.4)',
              '&:hover': {
                boxShadow: '0 6px 20px rgba(75, 156, 211, 0.5)',
              },
            }}
          >
            새 템플릿
          </Button>
        </Box>
      </MotionBox>

      {/* Stats Cards */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid size={{ xs: 12, sm: 4 }} key={index}>
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <Card
                elevation={0}
                sx={{
                  background: 'white',
                  border: '1px solid',
                  borderColor: 'grey.200',
                  borderRadius: 3,
                }}
              >
                <CardContent sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      bgcolor: stat.bgColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <stat.icon sx={{ color: stat.color, fontSize: 24 }} />
                  </Box>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: 'secondary.main' }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {stat.label}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </MotionBox>
          </Grid>
        ))}
      </Grid>

      {/* Search and Filters */}
      <Card
        elevation={0}
        sx={{
          p: 2,
          mb: 3,
          background: 'white',
          border: '1px solid',
          borderColor: 'grey.200',
          borderRadius: 3,
        }}
      >
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <TextField
            placeholder="템플릿 이름, 설명으로 검색..."
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'grey.400' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              flex: 1,
              minWidth: 250,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                bgcolor: 'white',
              },
            }}
            size="small"
          />
          {/* Category Filter */}
          <FormControl size="small" sx={{ minWidth: 130 }}>
            <InputLabel>카테고리</InputLabel>
            <Select
              value={categoryFilter}
              label="카테고리"
              onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }}
            >
              <MenuItem value="all">전체</MenuItem>
              {categories.map(cat => (
                <MenuItem key={cat.value} value={cat.value}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: cat.color }} />
                    {cat.label}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* Category help tooltip */}
          <Tooltip
            title={
              <Box sx={{ p: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>카테고리 설명</Typography>
                {categories.map(cat => (
                  <Box key={cat.value} sx={{ mb: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.25 }}>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: cat.color }} />
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{cat.label}</Typography>
                    </Box>
                    <Typography variant="caption" sx={{ color: 'grey.300', display: 'block', pl: 1.5 }}>
                      {cat.description}
                    </Typography>
                  </Box>
                ))}
              </Box>
            }
            arrow
            placement="bottom-start"
          >
            <IconButton size="small" sx={{ color: 'text.secondary' }}>
              <HelpOutlineIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          {/* Status Filter Buttons */}
          <Box sx={{ display: 'flex', gap: 0.5, bgcolor: 'grey.100', borderRadius: 2, p: 0.5 }}>
            <Button
              size="small"
              variant={statusFilter === 'active' ? 'contained' : 'text'}
              onClick={() => { setStatusFilter('active'); setPage(1); }}
              sx={{
                borderRadius: 1.5,
                px: 2,
                py: 0.5,
                fontSize: '0.8rem',
                fontWeight: 600,
                minWidth: 'auto',
                ...(statusFilter === 'active' ? {
                  bgcolor: '#10B981',
                  '&:hover': { bgcolor: '#059669' },
                } : {
                  color: 'text.secondary',
                }),
              }}
            >
              활성 ({activeTemplates + defaultTemplates.length})
            </Button>
            <Button
              size="small"
              variant={statusFilter === 'archived' ? 'contained' : 'text'}
              onClick={() => { setStatusFilter('archived'); setPage(1); }}
              sx={{
                borderRadius: 1.5,
                px: 2,
                py: 0.5,
                fontSize: '0.8rem',
                fontWeight: 600,
                minWidth: 'auto',
                ...(statusFilter === 'archived' ? {
                  bgcolor: '#6B7280',
                  '&:hover': { bgcolor: '#4B5563' },
                } : {
                  color: 'text.secondary',
                }),
              }}
            >
              보관됨 ({archivedTemplates})
            </Button>
            <Button
              size="small"
              variant={statusFilter === 'all' ? 'contained' : 'text'}
              onClick={() => { setStatusFilter('all'); setPage(1); }}
              sx={{
                borderRadius: 1.5,
                px: 2,
                py: 0.5,
                fontSize: '0.8rem',
                fontWeight: 600,
                minWidth: 'auto',
                ...(statusFilter === 'all' ? {
                  bgcolor: '#4B9CD3',
                  '&:hover': { bgcolor: '#3A7BA8' },
                } : {
                  color: 'text.secondary',
                }),
              }}
            >
              전체 ({totalTemplates + defaultTemplates.length})
            </Button>
          </Box>
        </Box>
      </Card>

      {/* Template Cards */}
      {paginatedTemplates.length > 0 ? (
        <Grid container spacing={2}>
          <AnimatePresence>
            {paginatedTemplates.map((template, index) => {
              const categoryInfo = getCategoryInfo(template.category);
              return (
                <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={template.id}>
                  <MotionCard
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ y: -4 }}
                    elevation={0}
                    sx={{
                      background: 'white',
                      border: '1px solid',
                      borderColor: 'grey.200',
                      borderRadius: 3,
                      position: 'relative',
                      overflow: 'visible',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        borderColor: 'grey.300',
                      },
                    }}
                  >
                    {effectiveDefaultId === template.id && (
                      <Chip
                        icon={<StarIcon sx={{ fontSize: 14 }} />}
                        label="기본 템플릿"
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: -10,
                          right: 16,
                          bgcolor: '#4B9CD3',
                          color: 'white',
                          fontWeight: 600,
                          fontSize: '0.65rem',
                        }}
                      />
                    )}
                    <CardContent sx={{ p: 2.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
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
                          {template.isSystem && (
                            <Chip
                              label="시스템"
                              size="small"
                              color="info"
                              sx={{ fontWeight: 600, fontSize: '0.65rem' }}
                            />
                          )}
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Tooltip title={categoryInfo.description} arrow placement="top">
                            <Chip
                              label={categoryInfo.label}
                              size="small"
                              sx={{
                                bgcolor: `${categoryInfo.color}15`,
                                color: categoryInfo.color,
                                fontWeight: 600,
                                fontSize: '0.7rem',
                                cursor: 'help',
                              }}
                            />
                          </Tooltip>
                        </Box>
                      </Box>

                      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'secondary.main', mb: 0.5 }}>
                        {template.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, minHeight: 40 }}>
                        {template.description || '설명 없음'}
                      </Typography>

                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Tooltip title={effectiveDefaultId === template.id ? '기본 템플릿' : '기본으로 설정'}>
                          <IconButton
                            size="small"
                            onClick={() => handleSetDefault(template)}
                            sx={{ color: effectiveDefaultId === template.id ? '#4B9CD3' : 'grey.400' }}
                          >
                            {effectiveDefaultId === template.id ? <StarIcon /> : <StarBorderIcon />}
                          </IconButton>
                        </Tooltip>
                        {!template.isSystem && (
                          <Chip
                            label={template.status === 'active' ? '활성' : '보관됨'}
                            size="small"
                            sx={{
                              fontSize: '0.65rem',
                              fontWeight: 600,
                              bgcolor: template.status === 'active' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(107, 114, 128, 0.1)',
                              color: template.status === 'active' ? '#10B981' : '#6B7280',
                            }}
                          />
                        )}
                      </Box>
                    </CardContent>

                    <Box sx={{ px: 2.5, pb: 2, display: 'flex', gap: 1 }}>
                      <Button
                        size="small"
                        startIcon={<VisibilityIcon />}
                        onClick={() => handleOpenDialog('view', template)}
                        sx={{ flex: 1, borderRadius: 1.5, fontSize: '0.75rem' }}
                      >
                        상세
                      </Button>
                      {!template.isSystem && (
                        <Button
                          size="small"
                          startIcon={<EditIcon />}
                          onClick={() => handleOpenDialog('edit', template)}
                          sx={{ flex: 1, borderRadius: 1.5, fontSize: '0.75rem' }}
                        >
                          수정
                        </Button>
                      )}
                      <Tooltip title="복제">
                        <IconButton
                          size="small"
                          onClick={() => handleDuplicateTemplate(template)}
                          sx={{ bgcolor: 'grey.100', color: 'grey.600' }}
                        >
                          <ContentCopyIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      {!template.isSystem && (
                        <Tooltip title={template.status === 'active' ? '보관' : '복원'}>
                          <IconButton
                            size="small"
                            onClick={() => handleArchiveTemplate(template.id, template.status)}
                            sx={{
                              bgcolor: template.status === 'active' ? 'grey.100' : 'success.50',
                              color: template.status === 'active' ? 'grey.600' : 'success.main',
                            }}
                          >
                            {template.status === 'active' ? <ArchiveIcon fontSize="small" /> : <UnarchiveIcon fontSize="small" />}
                          </IconButton>
                        </Tooltip>
                      )}
                      {!template.isSystem && template.status === 'archived' && (
                        <Tooltip title="삭제">
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteTemplate(template)}
                            sx={{
                              bgcolor: 'error.50',
                              color: 'error.main',
                              '&:hover': {
                                bgcolor: 'error.100',
                              },
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Box>
                  </MotionCard>
                </Grid>
              );
            })}
          </AnimatePresence>
        </Grid>
      ) : (
        <MotionPaper
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          elevation={0}
          sx={{
            p: 6,
            borderRadius: 4,
            border: '1px solid',
            borderColor: 'grey.200',
            bgcolor: 'grey.50',
            textAlign: 'center',
          }}
        >
          <DescriptionIcon sx={{ fontSize: 64, color: 'grey.300', mb: 2 }} />
          <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.secondary', mb: 1 }}>
            템플릿이 없습니다
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
            새 템플릿을 만들어 AI가 당신의 스타일로 차트를 작성하게 하세요
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog('add')}
            sx={{
              borderRadius: 2,
              background: 'linear-gradient(135deg, #4B9CD3 0%, #3A7BA8 100%)',
            }}
          >
            첫 템플릿 만들기
          </Button>
        </MotionPaper>
      )}

      {/* Add/Edit/View Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
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
          {dialogMode === 'add' ? '새 템플릿 만들기' : dialogMode === 'edit' ? '템플릿 수정' : '템플릿 상세'}
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
                      value={formCategory}
                      label="카테고리"
                      onChange={(e) => setFormCategory(e.target.value)}
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
                    {categories.find(c => c.value === formCategory)?.description}
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
            {dialogMode !== 'view' && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Button
                  variant={formIsDefault ? 'contained' : 'outlined'}
                  size="small"
                  startIcon={formIsDefault ? <StarIcon /> : <StarBorderIcon />}
                  onClick={() => setFormIsDefault(!formIsDefault)}
                  sx={{
                    borderRadius: 2,
                    ...(formIsDefault && {
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
          <Button onClick={handleCloseDialog} sx={{ borderRadius: 2 }}>
            {dialogMode === 'view' ? '닫기' : '취소'}
          </Button>
          {dialogMode !== 'view' && (
            <Button
              variant="contained"
              onClick={handleSaveTemplate}
              disabled={saving}
              sx={{
                borderRadius: 2,
                background: 'linear-gradient(135deg, #4B9CD3 0%, #3A7BA8 100%)',
              }}
            >
              {saving ? <CircularProgress size={20} /> : (dialogMode === 'add' ? '만들기' : '저장')}
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
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
    </Box>
  );
}
