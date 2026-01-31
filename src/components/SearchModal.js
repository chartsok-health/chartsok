'use client';

import { useState, useEffect, useCallback, useRef, memo } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  IconButton,
  Chip,
  InputBase,
  Modal,
  Fade,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import ArticleIcon from '@mui/icons-material/Article';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MicIcon from '@mui/icons-material/Mic';
import PeopleIcon from '@mui/icons-material/People';
import HistoryIcon from '@mui/icons-material/History';
import DescriptionIcon from '@mui/icons-material/Description';
import { useAuth } from '@/lib/AuthContext';

// Quick actions - static navigation items
const quickActions = [
  { id: 'new-record', label: '새 진료 시작', icon: MicIcon, path: '/dashboard/record' },
  { id: 'patients', label: '환자 목록', icon: PeopleIcon, path: '/dashboard/patients' },
  { id: 'history', label: '진료 기록', icon: HistoryIcon, path: '/dashboard/history' },
  { id: 'templates', label: '템플릿 관리', icon: DescriptionIcon, path: '/dashboard/templates' },
];

function SearchModal({ open, onClose }) {
  const router = useRouter();
  const { userProfile } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState({ patients: [], records: [], quickActions: quickActions });
  const [allPatients, setAllPatients] = useState([]);
  const [allRecords, setAllRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchInputRef = useRef(null);
  const debounceRef = useRef(null);

  // Fetch data when modal opens
  useEffect(() => {
    const fetchData = async () => {
      if (!open || !userProfile?.hospitalId) return;

      setIsLoading(true);
      try {
        // Fetch patients and records in parallel
        const [patientsRes, recordsRes] = await Promise.all([
          fetch(`/api/patients?hospitalId=${userProfile.hospitalId}`),
          fetch(`/api/charts?hospitalId=${userProfile.hospitalId}&limit=100`),
        ]);

        if (patientsRes.ok) {
          const patientsData = await patientsRes.json();
          setAllPatients(patientsData.patients || []);
        }

        if (recordsRes.ok) {
          const recordsData = await recordsRes.json();
          setAllRecords(recordsData.charts || []);
        }
      } catch (error) {
        console.error('Error fetching search data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [open, userProfile?.hospitalId]);

  // Focus search input when modal opens
  useEffect(() => {
    if (open && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
    if (!open) {
      setSearchQuery('');
      setSearchResults({ patients: [], records: [], quickActions: quickActions });
    }
  }, [open]);

  // Search function with debouncing
  const handleSearch = useCallback((query) => {
    setSearchQuery(query);

    // Clear existing debounce timer
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Debounce the search
    debounceRef.current = setTimeout(() => {
      if (!query.trim()) {
        setSearchResults({ patients: [], records: [], quickActions: quickActions });
        return;
      }

      const lowerQuery = query.toLowerCase();

      // Filter patients
      const filteredPatients = allPatients.filter(p =>
        (p.name && p.name.toLowerCase().includes(lowerQuery)) ||
        (p.chartNo && p.chartNo.toLowerCase().includes(lowerQuery)) ||
        (p.phone && p.phone.includes(query))
      ).slice(0, 5).map(p => ({
        id: p.id,
        name: p.name || 'Unknown',
        chartNo: p.chartNo || '',
        birthDate: p.birthDate || '',
        lastVisit: p.updatedAt || p.createdAt || '',
        diagnosis: p.diagnosis || '',
      }));

      // Filter records
      const filteredRecords = allRecords.filter(r =>
        (r.patientName && r.patientName.toLowerCase().includes(lowerQuery)) ||
        (r.diagnosis && r.diagnosis.toLowerCase().includes(lowerQuery)) ||
        (r.chartData?.subjective && r.chartData.subjective.toLowerCase().includes(lowerQuery)) ||
        (r.chartData?.assessment && r.chartData.assessment.toLowerCase().includes(lowerQuery))
      ).slice(0, 5).map(r => ({
        id: r.id,
        patientName: r.patientName || 'Unknown',
        date: r.createdAt ? (typeof r.createdAt === 'string' ? r.createdAt.split('T')[0] : new Date(r.createdAt).toISOString().split('T')[0]) : '',
        diagnosis: r.diagnosis || '',
        summary: r.chartData?.assessment?.split('\n')[0] || r.chartData?.subjective?.split('\n')[0] || '',
      }));

      // Filter quick actions
      const filteredActions = quickActions.filter(a =>
        a.label.toLowerCase().includes(lowerQuery)
      );

      setSearchResults({ patients: filteredPatients, records: filteredRecords, quickActions: filteredActions });
    }, 150);
  }, [allPatients, allRecords]);

  // Handle search result selection
  const handleResultClick = (type, item) => {
    onClose();

    if (type === 'patient') {
      router.push(`/dashboard/patients?id=${item.id}`);
    } else if (type === 'record') {
      router.push(`/dashboard/history?id=${item.id}`);
    } else if (type === 'action') {
      router.push(item.path);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 300,
          sx: { bgcolor: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(4px)' },
        },
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '15%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '90%',
            maxWidth: 600,
            bgcolor: 'white',
            borderRadius: 3,
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            overflow: 'hidden',
          }}
        >
          {/* Search Input */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              px: 3,
              py: 2,
              borderBottom: '1px solid',
              borderColor: 'grey.200',
            }}
          >
            <SearchIcon sx={{ color: 'grey.400', fontSize: 24, mr: 2 }} />
            <InputBase
              inputRef={searchInputRef}
              placeholder="환자 이름, 진단명, 기록 검색..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              sx={{ flex: 1, fontSize: '1.1rem' }}
              autoFocus
            />
            <IconButton
              size="small"
              onClick={onClose}
              sx={{ ml: 1 }}
            >
              <CloseIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Box>

          {/* Search Results */}
          <Box sx={{ maxHeight: 400, overflow: 'auto', py: 1 }}>
            {/* Loading Indicator */}
            {isLoading && (
              <Box sx={{ py: 4, textAlign: 'center' }}>
                <CircularProgress size={32} />
                <Typography variant="body2" sx={{ color: 'grey.500', mt: 1 }}>
                  데이터 로딩 중...
                </Typography>
              </Box>
            )}

            {/* Quick Actions */}
            {searchResults.quickActions.length > 0 && (
              <Box sx={{ px: 2, py: 1 }}>
                <Typography variant="caption" sx={{ color: 'grey.500', fontWeight: 600, px: 1, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  빠른 실행
                </Typography>
                <List sx={{ p: 0, mt: 0.5 }}>
                  {searchResults.quickActions.map((action) => {
                    const Icon = action.icon;
                    return (
                      <ListItem key={action.id} disablePadding>
                        <ListItemButton
                          onClick={() => handleResultClick('action', action)}
                          sx={{
                            borderRadius: 2,
                            py: 1,
                            '&:hover': { bgcolor: 'primary.50' },
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 40 }}>
                            <Box
                              sx={{
                                width: 32,
                                height: 32,
                                borderRadius: 1.5,
                                bgcolor: 'primary.100',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <Icon sx={{ fontSize: 18, color: 'primary.main' }} />
                            </Box>
                          </ListItemIcon>
                          <ListItemText
                            primary={action.label}
                            primaryTypographyProps={{ fontWeight: 500, fontSize: '0.9rem' }}
                          />
                          <Chip
                            label="이동"
                            size="small"
                            sx={{ bgcolor: 'grey.100', fontSize: '0.7rem', height: 22 }}
                          />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              </Box>
            )}

            {/* Patients */}
            {searchResults.patients.length > 0 && (
              <Box sx={{ px: 2, py: 1 }}>
                <Typography variant="caption" sx={{ color: 'grey.500', fontWeight: 600, px: 1, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  환자
                </Typography>
                <List sx={{ p: 0, mt: 0.5 }}>
                  {searchResults.patients.map((patient) => (
                    <ListItem key={patient.id} disablePadding>
                      <ListItemButton
                        onClick={() => handleResultClick('patient', patient)}
                        sx={{
                          borderRadius: 2,
                          py: 1.5,
                          '&:hover': { bgcolor: 'primary.50' },
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 48 }}>
                          <Avatar
                            sx={{
                              width: 36,
                              height: 36,
                              bgcolor: 'secondary.100',
                              color: 'secondary.main',
                              fontSize: '0.9rem',
                              fontWeight: 600,
                            }}
                          >
                            {patient.name.charAt(0)}
                          </Avatar>
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography component="span" sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                                {patient.name}
                              </Typography>
                              {patient.diagnosis && (
                                <Chip
                                  label={patient.diagnosis}
                                  size="small"
                                  sx={{ bgcolor: 'warning.100', color: 'warning.dark', fontSize: '0.7rem', height: 20 }}
                                />
                              )}
                            </Box>
                          }
                          secondary={
                            <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.25 }}>
                              <AccessTimeIcon sx={{ fontSize: 14, color: 'grey.400' }} />
                              <Typography component="span" variant="caption" sx={{ color: 'grey.500' }}>
                                {patient.chartNo && `차트번호: ${patient.chartNo}`}
                                {patient.chartNo && patient.lastVisit && ' | '}
                                {patient.lastVisit && `최근 방문: ${typeof patient.lastVisit === 'string' ? patient.lastVisit.split('T')[0] : ''}`}
                              </Typography>
                            </Box>
                          }
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}

            {/* Records */}
            {searchResults.records.length > 0 && (
              <Box sx={{ px: 2, py: 1 }}>
                <Typography variant="caption" sx={{ color: 'grey.500', fontWeight: 600, px: 1, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  진료 기록
                </Typography>
                <List sx={{ p: 0, mt: 0.5 }}>
                  {searchResults.records.map((record) => (
                    <ListItem key={record.id} disablePadding>
                      <ListItemButton
                        onClick={() => handleResultClick('record', record)}
                        sx={{
                          borderRadius: 2,
                          py: 1.5,
                          '&:hover': { bgcolor: 'primary.50' },
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 48 }}>
                          <Box
                            sx={{
                              width: 36,
                              height: 36,
                              borderRadius: 1.5,
                              bgcolor: 'info.100',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <ArticleIcon sx={{ fontSize: 20, color: 'info.main' }} />
                          </Box>
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography component="span" sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                                {record.patientName}
                              </Typography>
                              <Typography component="span" variant="caption" sx={{ color: 'grey.500' }}>
                                {record.date}
                              </Typography>
                            </Box>
                          }
                          secondary={
                            <Typography
                              component="span"
                              variant="body2"
                              sx={{
                                color: 'grey.600',
                                mt: 0.25,
                                fontSize: '0.8rem',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                display: 'block',
                              }}
                            >
                              {record.diagnosis} - {record.summary}
                            </Typography>
                          }
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}

            {/* No Results */}
            {!isLoading && searchQuery && searchResults.patients.length === 0 && searchResults.records.length === 0 && searchResults.quickActions.length === 0 && (
              <Box sx={{ py: 6, textAlign: 'center' }}>
                <SearchIcon sx={{ fontSize: 48, color: 'grey.300', mb: 2 }} />
                <Typography sx={{ color: 'grey.500', fontWeight: 500 }}>
                  &quot;{searchQuery}&quot;에 대한 검색 결과가 없습니다
                </Typography>
                <Typography variant="body2" sx={{ color: 'grey.400', mt: 0.5 }}>
                  다른 검색어를 입력해 보세요
                </Typography>
              </Box>
            )}
          </Box>

          {/* Footer */}
          <Box
            sx={{
              px: 3,
              py: 1.5,
              borderTop: '1px solid',
              borderColor: 'grey.100',
              bgcolor: 'grey.50',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Box sx={{ px: 0.75, py: 0.25, borderRadius: 0.5, bgcolor: 'grey.200', fontSize: '0.7rem' }}>↵</Box>
                <Typography variant="caption" sx={{ color: 'grey.500' }}>선택</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Box sx={{ px: 0.75, py: 0.25, borderRadius: 0.5, bgcolor: 'grey.200', fontSize: '0.7rem' }}>ESC</Box>
                <Typography variant="caption" sx={{ color: 'grey.500' }}>닫기</Typography>
              </Box>
            </Box>
            <Typography variant="caption" sx={{ color: 'grey.400' }}>
              차트쏙 검색
            </Typography>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}

export default memo(SearchModal);
