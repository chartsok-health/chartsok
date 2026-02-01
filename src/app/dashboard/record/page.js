'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Chip,
  Fade,
  Grow,
  Grid,
  Card,
  CardContent,
  Alert,
  LinearProgress,
  Button,
  TextField,
  InputAdornment,
  Avatar,
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Divider,
  Tooltip,
  Collapse,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import PersonIcon from '@mui/icons-material/Person';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import SearchIcon from '@mui/icons-material/Search';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AirIcon from '@mui/icons-material/Air';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import DescriptionIcon from '@mui/icons-material/Description';
import EditNoteIcon from '@mui/icons-material/EditNote';
import CelebrationIcon from '@mui/icons-material/Celebration';
import AssignmentIcon from '@mui/icons-material/Assignment';
import HomeIcon from '@mui/icons-material/Home';
import StarIcon from '@mui/icons-material/Star';
import { useAuth } from '@/lib/AuthContext';
import PatientFormDialog from '@/app/dashboard/patients/PatientFormDialog';
import TemplateFormDialog from '@/app/dashboard/templates/TemplateFormDialog';
import { db } from '@/lib/firebase';
import { collection, addDoc, updateDoc, doc, getDocs } from 'firebase/firestore';

const MotionBox = motion.create(Box);
const MotionPaper = motion.create(Paper);
const MotionCard = motion.create(Card);

// Common chief complaints
const commonComplaints = [
  '두통', '발열', '기침', '인후통', '복통', '어지러움',
  '피로감', '호흡곤란', '관절통', '피부발진', '소화불량', '불면'
];

const steps = [
  { label: '환자 선택', icon: PersonSearchIcon, color: '#4B9CD3' },
  { label: '사전 정보', icon: EditNoteIcon, color: '#10B981' },
  { label: '진료 녹음', icon: MicIcon, color: '#EF4444' },
  { label: 'AI 분석', icon: AutoAwesomeIcon, color: '#9333EA' },
  { label: '완료', icon: CheckCircleIcon, color: '#22C55E' },
];

export default function RecordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, userProfile } = useAuth();

  // Get patient params from URL (for pre-selection from history page)
  const patientIdParam = searchParams.get('patientId');
  const patientNameParam = searchParams.get('patientName');

  // Step management
  const [activeStep, setActiveStep] = useState(0);

  // Step 1: Patient selection
  const [patients, setPatients] = useState([]);
  const [loadingPatients, setLoadingPatients] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [newPatientDialogOpen, setNewPatientDialogOpen] = useState(false);

  // Step 2: Vitals
  const [vitals, setVitals] = useState({
    systolic: '',
    diastolic: '',
    heartRate: '',
    temperature: '',
    spO2: '',
    chiefComplaint: '',
  });

  // Template selection
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [loadingTemplates, setLoadingTemplates] = useState(false);
  const [newTemplateDialogOpen, setNewTemplateDialogOpen] = useState(false);

  // User settings for AI (keywords and aiTone)
  const [userSettings, setUserSettings] = useState({
    aiTone: '',
    keywords: [],
  });

  // Step 3: Recording
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [liveText, setLiveText] = useState('');
  const [liveHistory, setLiveHistory] = useState([]);
  const [audioLevels, setAudioLevels] = useState(Array(20).fill(20));
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState('');
  const [processingProgress, setProcessingProgress] = useState(0);
  const [error, setError] = useState(null);

  // Refs
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const streamRef = useRef(null);
  const analyserRef = useRef(null);
  const audioContextRef = useRef(null);
  const transcriptionRef = useRef(null);
  const recognitionRef = useRef(null);
  const recordingTimeRef = useRef(0);
  const isRecordingRef = useRef(false);
  const isPausedRef = useRef(false);

  useEffect(() => {
    recordingTimeRef.current = recordingTime;
  }, [recordingTime]);

  useEffect(() => {
    isRecordingRef.current = isRecording;
  }, [isRecording]);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  // Fetch patients from API based on hospitalId
  useEffect(() => {
    if (!userProfile?.hospitalId) return;

    const fetchPatients = async () => {
      setLoadingPatients(true);
      try {
        const response = await fetch(`/api/patients?hospitalId=${userProfile.hospitalId}`);
        if (!response.ok) throw new Error('Failed to fetch patients');
        const data = await response.json();

        // API returns { patients, total }
        const patientsList = data.patients || [];

        // Calculate age from birthDate and add recent diagnosis
        const transformedPatients = patientsList.map(patient => ({
          ...patient,
          age: patient.birthDate ? calculateAge(patient.birthDate) : patient.age || 0,
          recentDiagnosis: patient.recentDiagnosis || '기록 없음',
        }));

        setPatients(transformedPatients);
      } catch (error) {
        console.error('Error fetching patients:', error);
      } finally {
        setLoadingPatients(false);
      }
    };

    fetchPatients();
  }, [userProfile?.hospitalId]);

  // Helper function to calculate age
  const calculateAge = (birthDate) => {
    if (!birthDate) return 0;
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  };

  // Timer effect
  useEffect(() => {
    let interval;
    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording, isPaused]);

  // Auto-scroll
  useEffect(() => {
    if (transcriptionRef.current) {
      transcriptionRef.current.scrollTop = transcriptionRef.current.scrollHeight;
    }
  }, [liveHistory, liveText]);

  // Pre-select patient from URL params (when coming from history page)
  useEffect(() => {
    if (patientIdParam && patientNameParam && patients.length > 0) {
      // Find patient in loaded patients by ID
      const foundPatient = patients.find(p => p.id === patientIdParam || p.id === parseInt(patientIdParam));
      if (foundPatient) {
        setSelectedPatient(foundPatient);
      } else {
        // Create a patient entry from URL params if not found in loaded patients
        setSelectedPatient({
          id: patientIdParam,
          name: decodeURIComponent(patientNameParam),
          age: '-',
          gender: '-',
          lastVisit: new Date().toISOString().split('T')[0],
          chartNo: `P-${patientIdParam}`,
          recentDiagnosis: '기록 보기',
        });
      }
    }
  }, [patientIdParam, patientNameParam, patients]);

  // Default SOAP template (same as templates page)
  const defaultTemplates = [
    {
      id: 'default-soap',
      name: 'SOAP 기본',
      description: '표준 SOAP 형식 차트 템플릿',
      category: 'soap',
      isDefault: false, // Will be computed based on user templates
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

  // Fetch templates directly from Firestore (same as templates page)
  useEffect(() => {
    if (!user?.uid) return;

    const fetchTemplates = async () => {
      setLoadingTemplates(true);
      try {
        const templatesRef = collection(db, 'users', user.uid, 'templates');
        // Fetch without orderBy to avoid index requirements
        const snapshot = await getDocs(templatesRef);
        const userTemplates = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          status: doc.data().status || 'active',
          createdAt: doc.data().createdAt || new Date(0).toISOString(),
        }));

        // Filter only active templates
        const activeTemplates = userTemplates.filter(t => t.status === 'active');

        // Sort by createdAt descending (newest first)
        activeTemplates.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        // Check if user has a default template
        const userDefault = activeTemplates.find(t => t.isDefault);

        // Set SOAP as default only if no user template is default
        const soapWithDefault = {
          ...defaultTemplates[0],
          isDefault: !userDefault,
        };

        const allTemplates = [soapWithDefault, ...activeTemplates];
        setTemplates(allTemplates);

        // Auto-select the default template
        const defaultTemplate = allTemplates.find(t => t.isDefault);
        if (defaultTemplate) {
          setSelectedTemplate(defaultTemplate);
        }
      } catch (error) {
        console.error('Error fetching templates:', error);
        setTemplates(defaultTemplates);
        setSelectedTemplate(defaultTemplates[0]);
      } finally {
        setLoadingTemplates(false);
      }
    };

    fetchTemplates();
  }, [user?.uid]);

  // Fetch user settings (aiTone and keywords) for AI analysis
  useEffect(() => {
    if (!user?.uid) return;

    const fetchUserSettings = async () => {
      try {
        // Fetch settings and keywords in parallel
        const [settingsRes, keywordsRes] = await Promise.all([
          fetch(`/api/settings?userId=${user.uid}`),
          fetch(`/api/keywords?userId=${user.uid}`),
        ]);

        let aiTone = '';
        let keywords = [];

        if (settingsRes.ok) {
          const data = await settingsRes.json();
          aiTone = data.settings?.aiTone || '';
        }

        if (keywordsRes.ok) {
          const data = await keywordsRes.json();
          keywords = data.keywords || [];
        }

        setUserSettings({ aiTone, keywords });
      } catch (error) {
        console.error('Error fetching user settings:', error);
      }
    };

    fetchUserSettings();
  }, [user?.uid]);

  // Audio visualization
  useEffect(() => {
    let animationFrame;
    const updateLevels = () => {
      if (analyserRef.current && isRecording && !isPaused) {
        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(dataArray);
        const bands = 20;
        const bandSize = Math.floor(dataArray.length / bands);
        const levels = [];
        for (let i = 0; i < bands; i++) {
          let sum = 0;
          for (let j = 0; j < bandSize; j++) {
            sum += dataArray[i * bandSize + j];
          }
          levels.push(20 + (sum / bandSize) * 0.4);
        }
        setAudioLevels(levels);
      }
      animationFrame = requestAnimationFrame(updateLevels);
    };

    if (isRecording && !isPaused) {
      updateLevels();
    } else {
      setAudioLevels(Array(20).fill(20));
    }

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [isRecording, isPaused]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Filter patients based on search
  const filteredPatients = patients.filter(
    (patient) =>
      patient.name?.includes(searchQuery) ||
      patient.chartNo?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle new patient creation (receives formData from PatientFormDialog)
  const handleCreatePatient = async (formData) => {
    try {
      const chartNo = `P-${new Date().getFullYear()}-${String(patients.length + 1).padStart(3, '0')}`;

      // Save to database via API
      const response = await fetch('/api/patients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.uid,
          name: formData.name,
          gender: formData.gender,
          birthDate: formData.birthDate,
          phone: formData.phone,
          address: formData.address,
          notes: formData.notes || '',
          chartNo: chartNo,
        }),
      });

      if (!response.ok) throw new Error('Failed to create patient');
      const result = await response.json();
      const createdPatient = result.patient;

      const patient = {
        ...createdPatient,
        age: formData.birthDate ? calculateAge(formData.birthDate) : 0,
        lastVisit: new Date().toISOString().split('T')[0],
        chartNo: createdPatient.chartNo || chartNo,
        recentDiagnosis: '신규 환자',
      };

      // Add to local patients list
      setPatients([patient, ...patients]);
      setSelectedPatient(patient);
      setNewPatientDialogOpen(false);
    } catch (error) {
      console.error('Error creating patient:', error);
      // Fallback to local-only patient for the session
      const patient = {
        id: Date.now().toString(),
        name: formData.name,
        age: formData.birthDate ? calculateAge(formData.birthDate) : 0,
        gender: formData.gender,
        lastVisit: new Date().toISOString().split('T')[0],
        chartNo: `P-${Date.now().toString().slice(-6)}`,
        recentDiagnosis: '신규 환자',
      };
      setPatients([patient, ...patients]);
      setSelectedPatient(patient);
      setNewPatientDialogOpen(false);
    }
  };

  // Add common complaint chip
  const handleAddComplaint = (complaint) => {
    const current = vitals.chiefComplaint;
    if (current) {
      setVitals({ ...vitals, chiefComplaint: current + ', ' + complaint });
    } else {
      setVitals({ ...vitals, chiefComplaint: complaint });
    }
  };

  // Handle new template creation (receives formData from TemplateFormDialog)
  const handleCreateTemplate = async (formData) => {
    if (!user?.uid) return;

    try {
      const templatesRef = collection(db, 'users', user.uid, 'templates');

      // If setting as default, unset other defaults first
      if (formData.isDefault) {
        const currentDefault = templates.find(t => t.isDefault && !t.isSystem);
        if (currentDefault) {
          await updateDoc(doc(db, 'users', user.uid, 'templates', currentDefault.id), {
            isDefault: false,
          });
        }
      }

      const newTemplate = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        content: formData.content,
        isDefault: formData.isDefault,
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const docRef = await addDoc(templatesRef, newTemplate);

      const createdTemplate = {
        id: docRef.id,
        ...newTemplate,
      };

      // Update local templates list
      setTemplates(prev => {
        // If new template is default, unset other defaults in local state
        const updated = formData.isDefault
          ? prev.map(t => t.isSystem ? t : { ...t, isDefault: false })
          : prev;
        return [updated[0], createdTemplate, ...updated.slice(1)]; // Keep SOAP at top
      });

      // Auto-select the new template
      setSelectedTemplate(createdTemplate);
      setNewTemplateDialogOpen(false);
    } catch (error) {
      console.error('Error creating template:', error);
    }
  };

  // Quick vitals presets
  const applyVitalsPreset = (preset) => {
    const presets = {
      normal: { systolic: '120', diastolic: '80', heartRate: '72', temperature: '36.5', spO2: '98' },
      hypertensive: { systolic: '150', diastolic: '95', heartRate: '85', temperature: '36.5', spO2: '97' },
      fever: { systolic: '120', diastolic: '80', heartRate: '90', temperature: '38.2', spO2: '97' },
    };
    if (presets[preset]) {
      setVitals({ ...vitals, ...presets[preset] });
    }
  };

  // Web Speech API for live preview only
  const initSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return null;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'ko-KR';

    recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      setLiveText(interimTranscript);

      if (finalTranscript) {
        const timestamp = formatTime(recordingTimeRef.current);
        setLiveHistory((prev) => [...prev, { text: finalTranscript.trim(), timestamp }]);
        setLiveText('');
      }
    };

    recognition.onerror = (event) => {
      if (event.error === 'no-speech' || event.error === 'aborted') {
        return;
      }
      if (event.error === 'network') {
        console.warn('Speech recognition: Network error, will retry');
      } else if (event.error === 'not-allowed') {
        console.warn('Speech recognition: Microphone permission denied');
      }
    };

    recognition.onend = () => {
      if (recognitionRef.current && !isPausedRef.current && isRecordingRef.current) {
        try {
          setTimeout(() => {
            if (recognitionRef.current && isRecordingRef.current) {
              recognitionRef.current.start();
            }
          }, 100);
        } catch (e) {}
      }
    };

    return recognition;
  };

  const handleStartRecording = async () => {
    setError(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 16000,
        },
      });

      streamRef.current = stream;

      // Audio analyser
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      audioContextRef.current = audioContext;
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyserRef.current = analyser;

      // MediaRecorder
      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? 'audio/webm;codecs=opus'
        : MediaRecorder.isTypeSupported('audio/webm')
          ? 'audio/webm'
          : MediaRecorder.isTypeSupported('audio/mp4')
            ? 'audio/mp4'
            : 'audio/wav';

      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.start(1000);

      // Web Speech for live preview
      const recognition = initSpeechRecognition();
      if (recognition) {
        recognitionRef.current = recognition;
        recognition.start();
      }

      setIsRecording(true);
      setIsPaused(false);
      setRecordingTime(0);
      setLiveHistory([]);
      setLiveText('');
    } catch (err) {
      console.error('Error starting recording:', err);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setError('마이크 접근 권한이 필요합니다. 브라우저 설정에서 마이크를 허용해 주세요.');
      } else {
        setError('녹음을 시작할 수 없습니다: ' + err.message);
      }
    }
  };

  const handleStopRecording = async () => {
    const finalRecordingTime = recordingTime;

    // Stop speech recognition
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }

    // Stop media recorder
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }

    // Stop audio stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }

    // Close audio context
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }

    setIsRecording(false);
    setIsPaused(false);
    setLiveText('');

    // Move to AI Analysis step
    setActiveStep(3);
    setIsProcessing(true);
    setProcessingProgress(0);

    // Simulate AI processing with progress stages
    const stages = [
      { status: '오디오 파일 준비 중...', progress: 15 },
      { status: '음성 특성 분석 중...', progress: 35 },
      { status: 'AI 화자 분리 중...', progress: 55 },
      { status: '텍스트 변환 중...', progress: 75 },
      { status: '대화 구조 분석 중...', progress: 90 },
      { status: '최종 검토 중...', progress: 100 },
    ];

    for (const stage of stages) {
      setProcessingStatus(stage.status);
      setProcessingProgress(stage.progress);
      await new Promise((resolve) => setTimeout(resolve, 800));
    }

    // Create mock transcription from live history or generate sample
    let transcription;
    if (liveHistory.length > 0) {
      transcription = liveHistory.map((item, idx) => ({
        speaker: idx % 2 === 0 ? '의사' : '환자',
        text: item.text,
        timestamp: item.timestamp,
      }));
    } else {
      // Generate sample transcription for demo
      transcription = [
        { speaker: '의사', text: '안녕하세요, 오늘 어떻게 오셨어요?', timestamp: '00:00' },
        { speaker: '환자', text: vitals.chiefComplaint || '머리가 아프고 열이 나는 것 같아요.', timestamp: '00:05' },
        { speaker: '의사', text: '언제부터 그러셨어요?', timestamp: '00:10' },
        { speaker: '환자', text: '어제 저녁부터요. 점점 심해지는 것 같아요.', timestamp: '00:15' },
        { speaker: '의사', text: '다른 증상은 없으신가요? 기침이나 콧물?', timestamp: '00:22' },
        { speaker: '환자', text: '기침은 조금 있어요. 목도 좀 따끔거려요.', timestamp: '00:28' },
      ];
    }

    sessionStorage.setItem('transcription', JSON.stringify(transcription));
    sessionStorage.setItem('recordingDuration', formatTime(finalRecordingTime));
    sessionStorage.setItem('patientInfo', JSON.stringify(selectedPatient));
    sessionStorage.setItem('vitalsInfo', JSON.stringify(vitals));
    sessionStorage.setItem('selectedTemplate', JSON.stringify(selectedTemplate));
    sessionStorage.setItem('userSettings', JSON.stringify(userSettings));
    sessionStorage.setItem('userData', JSON.stringify({
      userId: user?.uid || '',
      doctorId: user?.uid || '', // Use user.uid as doctorId (logged-in doctor)
      hospitalId: userProfile?.hospitalId || '',
      hospitalName: userProfile?.hospitalName || '',
      doctorName: userProfile?.displayName || user?.displayName || '',
      specialty: userProfile?.specialty || '',
    }));

    setIsProcessing(false);
    setActiveStep(4);
  };

  const handlePauseResume = () => {
    if (isPaused) {
      mediaRecorderRef.current?.resume();
      if (recognitionRef.current) {
        try { recognitionRef.current.start(); } catch (e) {}
      }
    } else {
      mediaRecorderRef.current?.pause();
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    }
    setIsPaused(!isPaused);
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const canProceedStep1 = selectedPatient !== null;
  const canProceedStep2 = vitals.chiefComplaint.trim() !== '';

  // Custom Stepper Component
  const renderStepper = () => (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, md: 3 },
        mb: 4,
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'grey.200',
        background: 'linear-gradient(135deg, #FAFBFC 0%, #F5F7FA 100%)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
        }}
      >
        {/* Progress Line Background */}
        <Box
          sx={{
            position: 'absolute',
            top: { xs: 20, md: 24 },
            left: '10%',
            right: '10%',
            height: 3,
            bgcolor: 'grey.200',
            zIndex: 0,
            borderRadius: 2,
          }}
        />
        {/* Progress Line Active */}
        <Box
          sx={{
            position: 'absolute',
            top: { xs: 20, md: 24 },
            left: '10%',
            height: 3,
            bgcolor: steps[activeStep]?.color || 'primary.main',
            zIndex: 1,
            borderRadius: 2,
            width: `${(activeStep / (steps.length - 1)) * 80}%`,
            transition: 'all 0.5s ease',
          }}
        />

        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = activeStep === index;
          const isPast = activeStep > index;

          return (
            <Box
              key={step.label}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                zIndex: 2,
                flex: 1,
              }}
            >
              <motion.div
                animate={{
                  scale: isActive ? 1.1 : 1,
                }}
                transition={{ duration: 0.3 }}
                style={{ borderRadius: '50%' }}
              >
                <Box
                  sx={{
                    width: { xs: 40, md: 48 },
                    height: { xs: 40, md: 48 },
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: isActive || isPast ? step.color : 'white',
                    border: '3px solid',
                    borderColor: isActive || isPast ? step.color : 'grey.300',
                    transition: 'all 0.3s ease',
                    boxShadow: isActive ? `0 0 0 6px ${step.color}20` : 'none',
                  }}
                >
                  <Icon
                    sx={{
                      fontSize: { xs: 20, md: 24 },
                      color: isActive || isPast ? 'white' : 'grey.400',
                    }}
                  />
                </Box>
              </motion.div>
              <Typography
                variant="caption"
                sx={{
                  mt: 1,
                  fontWeight: isActive ? 700 : 500,
                  fontSize: { xs: '0.65rem', md: '0.75rem' },
                  color: isActive ? step.color : isPast ? step.color : 'text.secondary',
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                }}
              >
                {step.label}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Paper>
  );

  // Step 1: Patient Selection
  const renderPatientSelection = () => (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'grey.200' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'secondary.main' }}>
                환자 검색
              </Typography>
              <Chip
                label={`${filteredPatients.length}명`}
                size="small"
                sx={{ bgcolor: 'primary.50', color: 'primary.main', fontWeight: 600 }}
              />
            </Box>

            <TextField
              fullWidth
              placeholder="환자 이름 또는 차트 번호로 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'grey.400' }} />
                  </InputAdornment>
                ),
                endAdornment: searchQuery && (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setSearchQuery('')}>
                      <CloseIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  bgcolor: 'grey.50',
                  '&.Mui-focused': {
                    bgcolor: 'white',
                  },
                },
              }}
            />

            <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 1.5, fontWeight: 600 }}>
              {searchQuery ? '검색 결과' : '최근 진료 환자'}
            </Typography>

            <AnimatePresence mode="wait">
              {filteredPatients.length === 0 ? (
                <MotionBox
                  key="empty"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  sx={{ textAlign: 'center', py: 6 }}
                >
                  {patients.length === 0 ? (
                    // No patients at all
                    <>
                      <Box
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: '50%',
                          bgcolor: 'primary.50',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mx: 'auto',
                          mb: 2,
                        }}
                      >
                        <PersonIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                      </Box>
                      <Typography variant="h6" sx={{ color: 'secondary.main', fontWeight: 700, mb: 1 }}>
                        등록된 환자가 없습니다
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'grey.500', mb: 3 }}>
                        첫 번째 환자를 등록하여 진료를 시작하세요
                      </Typography>
                      <Button
                        variant="contained"
                        startIcon={<PersonAddIcon />}
                        onClick={() => setNewPatientDialogOpen(true)}
                        sx={{
                          borderRadius: 2,
                          background: 'linear-gradient(135deg, #4B9CD3 0%, #3A7BA8 100%)',
                        }}
                      >
                        새 환자 등록
                      </Button>
                    </>
                  ) : (
                    // Has patients but search returned nothing
                    <>
                      <PersonSearchIcon sx={{ fontSize: 64, color: 'grey.300', mb: 2 }} />
                      <Typography variant="body1" sx={{ color: 'grey.500', mb: 2 }}>
                        "{searchQuery}" 검색 결과가 없습니다
                      </Typography>
                      <Button
                        variant="outlined"
                        startIcon={<PersonAddIcon />}
                        onClick={() => setNewPatientDialogOpen(true)}
                      >
                        새 환자로 등록
                      </Button>
                    </>
                  )}
                </MotionBox>
              ) : (
                <List sx={{ bgcolor: 'grey.50', borderRadius: 2, p: 1 }}>
                  {filteredPatients.map((patient, index) => (
                    <MotionBox
                      key={patient.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <ListItemButton
                        selected={selectedPatient?.id === patient.id}
                        onClick={() => setSelectedPatient(patient)}
                        sx={{
                          borderRadius: 2,
                          mb: 0.5,
                          transition: 'all 0.2s ease',
                          '&.Mui-selected': {
                            bgcolor: 'primary.50',
                            border: '2px solid',
                            borderColor: 'primary.main',
                          },
                          '&:hover': {
                            bgcolor: selectedPatient?.id === patient.id ? 'primary.100' : 'grey.100',
                            transform: 'translateX(4px)',
                          },
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar
                            sx={{
                              bgcolor: selectedPatient?.id === patient.id ? 'primary.main' : patient.gender === '여' ? '#F472B6' : '#60A5FA',
                              transition: 'all 0.2s ease',
                            }}
                          >
                            {patient.name.charAt(0)}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography component="span" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography component="span" variant="subtitle1" sx={{ fontWeight: 600 }}>
                                {patient.name}
                              </Typography>
                              <Chip
                                label={`${patient.age}세 ${patient.gender}`}
                                size="small"
                                sx={{ height: 20, fontSize: '0.65rem', bgcolor: 'grey.200' }}
                              />
                            </Typography>
                          }
                          secondary={
                            <Typography component="span" sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                              <Typography component="span" variant="caption" sx={{ color: 'text.secondary' }}>
                                {patient.chartNo}
                              </Typography>
                              <Typography component="span" variant="caption" sx={{ color: 'grey.400' }}>•</Typography>
                              <Typography component="span" variant="caption" sx={{ color: 'text.secondary' }}>
                                최근: {patient.recentDiagnosis}
                              </Typography>
                            </Typography>
                          }
                        />
                        <AnimatePresence>
                          {selectedPatient?.id === patient.id && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                            >
                              <CheckCircleIcon sx={{ color: 'primary.main', fontSize: 28 }} />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </ListItemButton>
                    </MotionBox>
                  ))}
                </List>
              )}
            </AnimatePresence>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                border: '2px dashed',
                borderColor: 'grey.300',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor: 'primary.main',
                  bgcolor: 'primary.50',
                },
                mb: 2,
              }}
              onClick={() => setNewPatientDialogOpen(true)}
            >
              <Box sx={{ textAlign: 'center' }}>
                <PersonAddIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                  새 환자 등록
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  클릭하여 새 환자를 등록하세요
                </Typography>
              </Box>
            </Paper>
          </motion.div>

          <Collapse in={selectedPatient !== null}>
            <MotionPaper
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                border: '2px solid',
                borderColor: 'primary.main',
                bgcolor: 'linear-gradient(135deg, #EBF5FF 0%, #F0F9FF 100%)',
                background: 'linear-gradient(135deg, #EBF5FF 0%, #F0F9FF 100%)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <CheckCircleIcon sx={{ color: 'primary.main' }} />
                <Typography variant="subtitle2" sx={{ color: 'primary.main', fontWeight: 700 }}>
                  선택된 환자
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ width: 56, height: 56, bgcolor: 'primary.main', fontSize: '1.5rem' }}>
                  {selectedPatient?.name?.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {selectedPatient?.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {selectedPatient?.age}세 · {selectedPatient?.gender} · {selectedPatient?.chartNo}
                  </Typography>
                </Box>
              </Box>
            </MotionPaper>
          </Collapse>
        </Grid>
      </Grid>

      {/* New Patient Dialog - Same as patients page */}
      <PatientFormDialog
        open={newPatientDialogOpen}
        mode="add"
        patient={null}
        onClose={() => setNewPatientDialogOpen(false)}
        onSave={handleCreatePatient}
      />
    </MotionBox>
  );

  // Step 2: Vitals Entry
  const renderVitalsEntry = () => (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'grey.200' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'secondary.main' }}>
                바이탈 사인
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Tooltip title="정상 범위로 채우기">
                  <Chip
                    label="정상"
                    size="small"
                    onClick={() => applyVitalsPreset('normal')}
                    sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'success.100' } }}
                  />
                </Tooltip>
                <Tooltip title="발열 프리셋">
                  <Chip
                    label="발열"
                    size="small"
                    onClick={() => applyVitalsPreset('fever')}
                    sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'warning.100' } }}
                  />
                </Tooltip>
              </Box>
            </Box>

            <Grid container spacing={2}>
              {[
                { key: 'bp', icon: MonitorHeartIcon, label: '혈압 (mmHg)', color: 'error.main', dual: true },
                { key: 'heartRate', icon: FavoriteIcon, label: '심박수 (bpm)', color: '#EC4899', placeholder: '72' },
                { key: 'temperature', icon: ThermostatIcon, label: '체온 (°C)', color: '#F59E0B', placeholder: '36.5' },
                { key: 'spO2', icon: AirIcon, label: 'SpO2 (%)', color: 'info.main', placeholder: '98' },
              ].map((item, index) => (
                <Grid size={{ xs: 6, sm: 3 }} key={item.key}>
                  <MotionPaper
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    elevation={0}
                    sx={{
                      p: 2,
                      bgcolor: 'grey.50',
                      borderRadius: 2,
                      textAlign: 'center',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        bgcolor: 'grey.100',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    <item.icon sx={{ fontSize: 28, color: item.color, mb: 1 }} />
                    <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1 }}>
                      {item.label}
                    </Typography>
                    {item.dual ? (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <TextField
                          size="small"
                          placeholder="120"
                          value={vitals.systolic}
                          onChange={(e) => setVitals({ ...vitals, systolic: e.target.value })}
                          sx={{ width: '45%' }}
                          inputProps={{ style: { textAlign: 'center' } }}
                        />
                        <Typography>/</Typography>
                        <TextField
                          size="small"
                          placeholder="80"
                          value={vitals.diastolic}
                          onChange={(e) => setVitals({ ...vitals, diastolic: e.target.value })}
                          sx={{ width: '45%' }}
                          inputProps={{ style: { textAlign: 'center' } }}
                        />
                      </Box>
                    ) : (
                      <TextField
                        size="small"
                        placeholder={item.placeholder}
                        value={vitals[item.key]}
                        onChange={(e) => setVitals({ ...vitals, [item.key]: e.target.value })}
                        fullWidth
                        inputProps={{ style: { textAlign: 'center' } }}
                      />
                    )}
                  </MotionPaper>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ mt: 4 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                주호소 <span style={{ color: '#EF4444' }}>*</span>
              </Typography>

              {/* Quick complaint chips */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {commonComplaints.map((complaint) => (
                  <motion.div key={complaint} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Chip
                      label={complaint}
                      size="small"
                      onClick={() => handleAddComplaint(complaint)}
                      sx={{
                        cursor: 'pointer',
                        bgcolor: vitals.chiefComplaint.includes(complaint) ? 'primary.100' : 'grey.100',
                        color: vitals.chiefComplaint.includes(complaint) ? 'primary.main' : 'text.primary',
                        '&:hover': { bgcolor: 'primary.50' },
                      }}
                    />
                  </motion.div>
                ))}
              </Box>

              <TextField
                fullWidth
                multiline
                rows={3}
                placeholder="환자의 주요 증상을 입력하세요..."
                value={vitals.chiefComplaint}
                onChange={(e) => setVitals({ ...vitals, chiefComplaint: e.target.value })}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
            </Box>

            {/* Template Selection */}
            <Box sx={{ mt: 4 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <DescriptionIcon sx={{ fontSize: 18, color: 'primary.main' }} />
                차트 템플릿 선택
              </Typography>

              <Grid container spacing={1.5}>
                {/* Templates from API (includes SOAP default) */}
                {templates.map((template) => (
                  <Grid size={{ xs: 6, sm: 4 }} key={template.id}>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Paper
                        elevation={0}
                        onClick={() => setSelectedTemplate(template)}
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          cursor: 'pointer',
                          border: '2px solid',
                          borderColor: selectedTemplate?.id === template.id ? 'primary.main' : 'grey.200',
                          bgcolor: selectedTemplate?.id === template.id ? 'primary.50' : 'white',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            borderColor: selectedTemplate?.id === template.id ? 'primary.main' : 'grey.300',
                            bgcolor: selectedTemplate?.id === template.id ? 'primary.50' : 'grey.50',
                          },
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Box
                            sx={{
                              width: 36,
                              height: 36,
                              borderRadius: 1.5,
                              bgcolor: selectedTemplate?.id === template.id ? 'primary.main' : 'grey.100',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <DescriptionIcon sx={{ fontSize: 18, color: selectedTemplate?.id === template.id ? 'white' : 'grey.500' }} />
                          </Box>
                          <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '0.8rem' }} noWrap>
                                {template.name}
                              </Typography>
                              {template.isDefault && (
                                <StarIcon sx={{ fontSize: 12, color: 'warning.main' }} />
                              )}
                            </Box>
                            <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.65rem' }}>
                              {template.category === 'soap' ? 'SOAP 형식' :
                               template.category === 'narrative' ? '서술형' :
                               template.category === 'problem' ? '문제 중심' :
                               template.category === 'custom' ? '사용자 정의' : template.category}
                            </Typography>
                          </Box>
                          {selectedTemplate?.id === template.id && (
                            <CheckCircleIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                          )}
                        </Box>
                      </Paper>
                    </motion.div>
                  </Grid>
                ))}

                {/* Add Template Button */}
                <Grid size={{ xs: 6, sm: 4 }}>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Paper
                      elevation={0}
                      onClick={() => setNewTemplateDialogOpen(true)}
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        cursor: 'pointer',
                        border: '2px dashed',
                        borderColor: 'grey.300',
                        bgcolor: 'white',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          borderColor: 'primary.main',
                          bgcolor: 'primary.50',
                        },
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box
                          sx={{
                            width: 36,
                            height: 36,
                            borderRadius: 1.5,
                            bgcolor: 'grey.100',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <PersonAddIcon sx={{ fontSize: 18, color: 'grey.500' }} />
                        </Box>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '0.8rem', color: 'text.secondary' }}>
                            템플릿 추가
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.65rem' }}>
                            나만의 템플릿
                          </Typography>
                        </Box>
                      </Box>
                    </Paper>
                  </motion.div>
                </Grid>
              </Grid>

              {selectedTemplate && (
                <MotionBox
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}
                >
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, display: 'block', mb: 1 }}>
                    선택된 템플릿 미리보기
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.75rem', whiteSpace: 'pre-wrap' }}>
                    {selectedTemplate.content ? `${selectedTemplate.content.slice(0, 200)}...` : '템플릿 내용 없음'}
                  </Typography>
                </MotionBox>
              )}
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'primary.200', bgcolor: 'primary.50', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <PersonIcon sx={{ color: 'primary.main' }} />
              <Typography variant="subtitle2" sx={{ color: 'primary.main', fontWeight: 700 }}>
                환자 정보
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ width: 48, height: 48, bgcolor: 'primary.main' }}>
                {selectedPatient?.name?.charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{selectedPatient?.name}</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {selectedPatient?.age}세 · {selectedPatient?.gender}
                </Typography>
              </Box>
            </Box>
          </Paper>

          <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'grey.200' }}>
            <Typography variant="subtitle2" sx={{ color: 'text.secondary', fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <AutoAwesomeIcon sx={{ fontSize: 18, color: 'warning.main' }} />
              팁
            </Typography>
            <Box component="ul" sx={{ m: 0, pl: 2.5, '& li': { mb: 1, color: 'text.secondary', fontSize: '0.875rem' } }}>
              <li>바이탈 사인은 선택 사항입니다</li>
              <li>주호소는 필수 입력입니다</li>
              <li>위 증상 칩을 클릭하면 빠르게 추가됩니다</li>
              <li>SOAP 또는 나만의 템플릿을 선택하세요</li>
              <li>AI가 선택한 템플릿에 맞게 차트를 생성합니다</li>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* New Template Dialog - Same as templates page */}
      <TemplateFormDialog
        open={newTemplateDialogOpen}
        mode="add"
        template={null}
        onClose={() => setNewTemplateDialogOpen(false)}
        onSave={handleCreateTemplate}
      />
    </MotionBox>
  );

  // Step 3: Recording
  const renderRecording = () => (
    <Grid container spacing={3}>
      {/* Left: Controls */}
      <Grid size={{ xs: 12, lg: 5 }}>
        <MotionPaper
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 4,
            border: '2px solid',
            borderColor: isRecording ? 'error.main' : 'grey.200',
            textAlign: 'center',
            bgcolor: isRecording ? 'rgba(239, 68, 68, 0.02)' : 'white',
            transition: 'all 0.3s ease',
          }}
        >
          {/* Patient Info Badge */}
          <Chip
            avatar={<Avatar sx={{ bgcolor: 'primary.main' }}><PersonIcon sx={{ fontSize: 16 }} /></Avatar>}
            label={`${selectedPatient?.name} · ${(vitals.chiefComplaint || '').slice(0, 20)}${(vitals.chiefComplaint || '').length > 20 ? '...' : ''}`}
            sx={{ mb: 3 }}
          />

          {/* Timer */}
          <motion.div
            animate={isRecording && !isPaused ? { scale: [1, 1.02, 1] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <Typography
              variant="h1"
              sx={{
                fontWeight: 800,
                color: isRecording ? 'error.main' : 'grey.300',
                fontFamily: 'monospace',
                fontSize: { xs: '3rem', md: '4rem' },
                letterSpacing: 4,
                mb: 2,
              }}
            >
              {formatTime(recordingTime)}
            </Typography>
          </motion.div>

          {/* Visualization */}
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 0.5, height: 80, mb: 3 }}>
            {audioLevels.map((level, index) => (
              <motion.div
                key={index}
                animate={{ height: level }}
                transition={{ duration: 0.1 }}
                style={{
                  width: 4,
                  backgroundColor: isRecording && !isPaused ? '#EF4444' : '#E2E8F0',
                  borderRadius: 2,
                }}
              />
            ))}
          </Box>

          {/* Status */}
          {isRecording && (
            <MotionBox initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} sx={{ mb: 3 }}>
              <Chip
                icon={<AutoAwesomeIcon sx={{ fontSize: 16 }} />}
                label={isPaused ? '일시정지됨' : '녹음 중 - 종료 후 AI 화자 분석'}
                color={isPaused ? 'warning' : 'primary'}
                variant="outlined"
                sx={{ fontWeight: 600 }}
              />
            </MotionBox>
          )}

          {/* Controls */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mb: 3 }}>
            {!isRecording ? (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <IconButton
                  onClick={handleStartRecording}
                  sx={{
                    width: 100,
                    height: 100,
                    bgcolor: 'error.main',
                    color: 'white',
                    boxShadow: '0 8px 32px rgba(239, 68, 68, 0.4)',
                    '&:hover': { bgcolor: 'error.dark' },
                  }}
                >
                  <MicIcon sx={{ fontSize: 48 }} />
                </IconButton>
              </motion.div>
            ) : (
              <>
                <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <IconButton
                    onClick={handlePauseResume}
                    sx={{ width: 64, height: 64, bgcolor: 'warning.main', color: 'white', '&:hover': { bgcolor: 'warning.dark' } }}
                  >
                    {isPaused ? <PlayArrowIcon sx={{ fontSize: 32 }} /> : <PauseIcon sx={{ fontSize: 32 }} />}
                  </IconButton>
                </motion.div>

                <motion.div animate={{ scale: isPaused ? 1 : [1, 1.05, 1] }} transition={{ duration: 1, repeat: isPaused ? 0 : Infinity }}>
                  <IconButton
                    sx={{ width: 100, height: 100, bgcolor: 'error.main', color: 'white', boxShadow: '0 8px 32px rgba(239, 68, 68, 0.4)' }}
                    disabled
                  >
                    <MicIcon sx={{ fontSize: 48 }} />
                  </IconButton>
                </motion.div>

                <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <IconButton
                    onClick={handleStopRecording}
                    sx={{ width: 64, height: 64, bgcolor: 'secondary.main', color: 'white', '&:hover': { bgcolor: 'secondary.dark' } }}
                  >
                    <StopIcon sx={{ fontSize: 32 }} />
                  </IconButton>
                </motion.div>
              </>
            )}
          </Box>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {!isRecording
              ? '녹음 버튼을 눌러 진료를 시작하세요'
              : isPaused
                ? '일시정지 중입니다. 재개하려면 재생 버튼을 누르세요.'
                : '진료 중... 정지하면 AI가 화자를 분석합니다'}
          </Typography>
        </MotionPaper>
      </Grid>

      {/* Right: Live Preview */}
      <Grid size={{ xs: 12, lg: 7 }}>
        <MotionPaper
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          elevation={0}
          sx={{
            borderRadius: 4,
            border: '1px solid',
            borderColor: 'grey.200',
            height: { lg: 'calc(100vh - 340px)' },
            minHeight: 400,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Header */}
          <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'grey.100' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'secondary.main' }}>
                  실시간 미리보기
                </Typography>
                {isRecording && !isPaused && (
                  <Chip
                    label="LIVE"
                    size="small"
                    sx={{
                      bgcolor: 'error.main',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '0.65rem',
                      height: 20,
                      animation: 'pulse 1.5s infinite'
                    }}
                  />
                )}
              </Box>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                화자 구분은 녹음 종료 후
              </Typography>
            </Box>
          </Box>

          {/* Content */}
          <Box ref={transcriptionRef} sx={{ flex: 1, overflowY: 'auto', p: 3, bgcolor: '#FAFBFC' }}>
            <AnimatePresence>
              {liveHistory.length === 0 && !liveText ? (
                <Fade in>
                  <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                    <GraphicEqIcon sx={{ fontSize: 64, color: 'grey.300', mb: 2 }} />
                    <Typography variant="subtitle1" sx={{ color: 'grey.400', mb: 1 }}>대기 중</Typography>
                    <Typography variant="body2" sx={{ color: 'grey.400' }}>녹음을 시작하면 실시간으로 텍스트가 표시됩니다</Typography>
                  </Box>
                </Fade>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {liveHistory.map((item, index) => (
                    <Grow key={index} in timeout={300}>
                      <Card elevation={0} sx={{ p: 0, bgcolor: 'white', border: '1px solid', borderColor: 'grey.200', borderRadius: 3 }}>
                        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                            <Box sx={{ width: 36, height: 36, borderRadius: 2, bgcolor: 'grey.200', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <SettingsVoiceIcon sx={{ fontSize: 18, color: 'grey.500' }} />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                <Chip label="화자 분석 대기" size="small" sx={{ height: 20, fontSize: '0.65rem', bgcolor: 'grey.100', color: 'grey.600' }} />
                                <Typography variant="caption" sx={{ color: 'grey.400' }}>{item.timestamp}</Typography>
                              </Box>
                              <Typography variant="body2" sx={{ color: 'text.primary', lineHeight: 1.6 }}>{item.text}</Typography>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grow>
                  ))}

                  {liveText && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                      <Card elevation={0} sx={{ p: 0, bgcolor: 'primary.50', border: '1px dashed', borderColor: 'primary.200', borderRadius: 3 }}>
                        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                            <Box sx={{ width: 36, height: 36, borderRadius: 2, bgcolor: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <MicIcon sx={{ fontSize: 18, color: 'white' }} />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                              <Typography variant="caption" sx={{ fontWeight: 700, color: 'primary.main', mb: 0.5, display: 'block' }}>말하는 중...</Typography>
                              <Typography variant="body2" sx={{ color: 'text.primary', lineHeight: 1.6, fontStyle: 'italic' }}>{liveText}</Typography>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </Box>
              )}
            </AnimatePresence>

            {isRecording && !isPaused && !liveText && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginTop: liveHistory.length > 0 ? 16 : 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#4B9CD3' }}
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </Box>
                  <Typography variant="caption" sx={{ color: 'grey.500' }}>듣는 중...</Typography>
                </Box>
              </motion.div>
            )}
          </Box>
        </MotionPaper>
      </Grid>
    </Grid>
  );

  // Step 4: Processing
  const renderProcessing = () => (
    <Box
      sx={{
        minHeight: 400,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      >
        <AutoAwesomeIcon sx={{ fontSize: 80, color: 'primary.main', mb: 4 }} />
      </motion.div>
      <Typography variant="h5" sx={{ fontWeight: 700, color: 'secondary.main', mb: 2 }}>
        AI가 화자를 분석 중입니다
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
        {processingStatus}
      </Typography>
      <Box sx={{ width: 350, mb: 2 }}>
        <LinearProgress
          variant="determinate"
          value={processingProgress}
          sx={{
            height: 10,
            borderRadius: 5,
            bgcolor: 'grey.200',
            '& .MuiLinearProgress-bar': {
              borderRadius: 5,
              background: 'linear-gradient(90deg, #4B9CD3 0%, #9333EA 100%)',
            },
          }}
        />
      </Box>
      <Typography variant="caption" sx={{ color: 'grey.500', mb: 4 }}>
        {processingProgress}% 완료
      </Typography>

      <Box sx={{ display: 'flex', gap: 4, mt: 2 }}>
        {[
          { icon: LocalHospitalIcon, label: '의사 음성', color: 'primary.main', active: processingProgress > 30 },
          { icon: SwapHorizIcon, label: '자동 구분', color: 'grey.400', active: processingProgress > 50 },
          { icon: PersonIcon, label: '환자 음성', color: 'grey.600', active: processingProgress > 70 },
        ].map((item, index) => (
          <motion.div
            key={item.label}
            animate={{
              scale: item.active ? [1, 1.1, 1] : 1,
              opacity: item.active ? 1 : 0.5,
            }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <item.icon sx={{ fontSize: 40, color: item.active ? item.color : 'grey.300', mb: 1 }} />
              <Typography variant="caption" sx={{ color: item.active ? 'text.primary' : 'grey.400', display: 'block' }}>
                {item.label}
              </Typography>
            </Box>
          </motion.div>
        ))}
      </Box>
    </Box>
  );

  // Step 5: Completion
  const renderCompletion = () => (
    <MotionBox
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      sx={{ textAlign: 'center', py: 6 }}
    >
      {/* Confetti-like celebration */}
      <Box sx={{ position: 'relative', display: 'inline-block' }}>
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0.5],
              x: Math.cos(i * 45 * Math.PI / 180) * 60,
              y: Math.sin(i * 45 * Math.PI / 180) * 60,
            }}
            transition={{ duration: 1, delay: 0.3 + i * 0.05 }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: ['#4B9CD3', '#10B981', '#F59E0B', '#EC4899', '#9333EA'][i % 5],
            }}
          />
        ))}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
        >
          <CheckCircleIcon sx={{ fontSize: 100, color: 'success.main', mb: 3 }} />
        </motion.div>
      </Box>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700, color: 'secondary.main', mb: 2 }}>
          분석 완료!
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
          AI가 의사와 환자의 대화를 성공적으로 분석했습니다.
        </Typography>
      </motion.div>

      <MotionPaper
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        elevation={0}
        sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'grey.200', maxWidth: 450, mx: 'auto', mb: 4 }}
      >
        <Grid container spacing={2}>
          <Grid size={{ xs: 6 }}>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>환자</Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{selectedPatient?.name}</Typography>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>녹음 시간</Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{formatTime(recordingTime)}</Typography>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Divider sx={{ my: 1 }} />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>주호소</Typography>
            <Typography variant="body2">{vitals.chiefComplaint}</Typography>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Divider sx={{ my: 1 }} />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>차트 형식</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
              {selectedTemplate ? (
                <>
                  <DescriptionIcon sx={{ fontSize: 16, color: 'primary.main' }} />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>{selectedTemplate.name}</Typography>
                </>
              ) : (
                <>
                  <AssignmentIcon sx={{ fontSize: 16, color: 'primary.main' }} />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>SOAP 노트 (표준)</Typography>
                </>
              )}
            </Box>
          </Grid>
        </Grid>
      </MotionPaper>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<DescriptionIcon />}
            onClick={() => router.push('/dashboard/record/result')}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #4B9CD3 0%, #3A7BA8 100%)',
            }}
          >
            결과 보기 및 SOAP 생성
          </Button>
        </motion.div>
      </Box>
    </MotionBox>
  );

  // Render step content
  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return renderPatientSelection();
      case 1:
        return renderVitalsEntry();
      case 2:
        return renderRecording();
      case 3:
        return renderProcessing();
      case 4:
        return renderCompletion();
      default:
        return null;
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1400, mx: 'auto' }}>
      {/* Header */}
      <MotionBox
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{ mb: 4 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: 'secondary.main', mb: 0.5 }}>
              새 진료 녹음
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              5단계 스마트 워크플로우로 진료를 기록하세요
            </Typography>
          </Box>
          <Button
            variant="text"
            startIcon={<ArrowBackIcon />}
            onClick={() => router.push('/dashboard')}
            sx={{ display: { xs: 'none', md: 'flex' } }}
          >
            대시보드로 돌아가기
          </Button>
        </Box>
      </MotionBox>

      {/* Custom Stepper */}
      {renderStepper()}

      {/* Error */}
      <Collapse in={!!error}>
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      </Collapse>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <Box key={activeStep}>
          {renderStepContent()}
        </Box>
      </AnimatePresence>

      {/* Navigation Buttons */}
      {activeStep < 3 && !isRecording && (
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}
        >
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            startIcon={<ArrowBackIcon />}
            sx={{ visibility: activeStep === 0 ? 'hidden' : 'visible' }}
          >
            이전
          </Button>
          {activeStep < 2 && (
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="contained"
                onClick={handleNext}
                endIcon={<ArrowForwardIcon />}
                disabled={
                  (activeStep === 0 && !canProceedStep1) ||
                  (activeStep === 1 && !canProceedStep2)
                }
                sx={{
                  px: 4,
                  background: 'linear-gradient(135deg, #4B9CD3 0%, #3A7BA8 100%)',
                }}
              >
                다음
              </Button>
            </motion.div>
          )}
        </MotionBox>
      )}

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </Box>
  );
}
