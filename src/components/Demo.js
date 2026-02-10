'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  Chip,
  Button,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import MicIcon from '@mui/icons-material/Mic';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import DescriptionIcon from '@mui/icons-material/Description';
import SecurityIcon from '@mui/icons-material/Security';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TimerIcon from '@mui/icons-material/Timer';
import { useI18n } from '@/lib/i18n';

const MotionBox = motion.create(Box);

/* ========== LOCALIZED CONTENT ========== */

const demoContent = {
  ko: {
    heroTitle: "90초, 진료에서 차트까지",
    heroSubtitle1: "녹음 시작부터 SOAP 차트 생성, EMR 반영, 감사 로그까지.",
    heroSubtitle2: "하나의 워크플로우로 완성됩니다.",
    timerSuffix: "초",
    workflowLabel: "워크플로우",
    pauseButton: "일시정지",
    autoPlayButton: "자동 재생",
    ctaButton: "우리 EMR에서 직접 체험하기",
    searchPlaceholder: "환자 이름 또는 ID로 검색...",
    realtimeTranscript: "실시간 텍스트 변환",
    rawRecording: "녹음 원본",
    soapChart: "SOAP 차트",
    aiProcessing: "AI 분석 중...",
    aiGenerated: "AI 생성",
    autoInsertComplete: "자동 입력 완료",
    auditLogTitle: "감사 추적 로그",
    elapsedTime: "소요 시간",
    recordedItems: "기록 항목",
    auditStatus: "감사 상태",
    auditNormal: "정상",
    seconds: "초",
    items: "건",
    soapData: [
      { key: 'S', label: 'Subjective', content: '3일 전부터 두통 호소, 오후에 악화, 진통제 복용 시 일시적 호전', color: '#4B9CD3' },
      { key: 'O', label: 'Objective', content: 'BP 130/85, HR 76, 경부 근육 긴장(+), 신경학적 검사 정상', color: '#10B981' },
      { key: 'A', label: 'Assessment', content: '긴장성 두통 (G44.2)', color: '#F59E0B' },
      { key: 'P', label: 'Plan', content: '아세트아미노펜 500mg tid, 경부 스트레칭 교육, 2주 후 f/u', color: '#8B5CF6' },
    ],
    patients: [
      { name: '김영희', age: 45, gender: 'F', dept: '내과', complaint: '두통, 오후 악화', id: '2025-00142', selected: true },
      { name: '박준서', age: 62, gender: 'M', dept: '정형외과', complaint: '좌측 무릎 통증', id: '2025-00187', selected: false },
      { name: '이수진', age: 33, gender: 'F', dept: '이비인후과', complaint: '인후통, 발열', id: '2025-00201', selected: false },
    ],
    transcriptLines: [
      { speaker: '의사', text: '어디가 불편하세요?', color: '#4B9CD3' },
      { speaker: '환자', text: '3일 전부터 두통이 있어요. 오후에 더 심해져요.', color: '#10B981' },
      { speaker: '의사', text: '진통제는 복용해보셨나요?', color: '#4B9CD3' },
      { speaker: '환자', text: '네, 먹으면 잠깐 나아졌다가 다시 아파요.', color: '#10B981' },
      { speaker: '의사', text: '혈압 측정하고 경부 검진 하겠습니다.', color: '#4B9CD3' },
    ],
    emrFieldMap: [
      { soap: 'S', field: '주소 (Chief Complaint)', value: '두통, 3일 전 발생, 오후 악화' },
      { soap: 'O', field: '이학적 소견 (Findings)', value: 'BP 130/85, HR 76, 경부 근육 긴장(+)' },
      { soap: 'A', field: '진단코드 (Dx)', value: '긴장성 두통 G44.2' },
      { soap: 'P', field: '처방 / 계획 (Plan)', value: '아세트아미노펜 500mg tid, 경부 스트레칭' },
    ],
    auditEntries: [
      { time: '14:23:05', action: '녹음 시작', user: '김의사', status: '완료', statusColor: '#10B981' },
      { time: '14:24:32', action: 'AI 차트 생성', user: 'Chartsok AI', status: '완료', statusColor: '#10B981' },
      { time: '14:24:35', action: 'EMR 반영 완료', user: '김의사', status: '완료', statusColor: '#10B981' },
      { time: '14:24:36', action: '감사 로그 저장', user: 'System', status: '기록됨', statusColor: '#4B9CD3' },
    ],
    steps: [
      { label: '환자 선택', subtitle: 'EMR에서 환자를 선택합니다', icon: <PersonSearchIcon />, accent: '#4B9CD3' },
      { label: '진료 녹음', subtitle: 'AI가 진료 대화를 실시간 기록합니다', icon: <MicIcon />, accent: '#EF4444' },
      { label: 'SOAP 자동 생성', subtitle: 'AI가 SOAP 차트를 자동 생성합니다', icon: <AutoAwesomeIcon />, accent: '#8B5CF6' },
      { label: 'EMR 반영', subtitle: 'SOAP이 EMR 필드에 자동 입력됩니다', icon: <DescriptionIcon />, accent: '#10B981' },
      { label: 'Audit Log', subtitle: '모든 기록이 감사 로그로 저장됩니다', icon: <SecurityIcon />, accent: '#F59E0B' },
    ],
  },
  en: {
    heroTitle: "90 Seconds: Visit to Chart",
    heroSubtitle1: "From recording to SOAP generation, EMR entry, and audit log.",
    heroSubtitle2: "One seamless workflow.",
    timerSuffix: "sec",
    workflowLabel: "Workflow",
    pauseButton: "Pause",
    autoPlayButton: "Auto Play",
    ctaButton: "Try It In Your EMR",
    searchPlaceholder: "Search by name or ID...",
    realtimeTranscript: "Real-time Transcript",
    rawRecording: "Raw Recording",
    soapChart: "SOAP Chart",
    aiProcessing: "AI Processing...",
    aiGenerated: "AI Generated",
    autoInsertComplete: "Auto-Insert Complete",
    auditLogTitle: "Audit Trail Log",
    elapsedTime: "Elapsed",
    recordedItems: "Records",
    auditStatus: "Audit Status",
    auditNormal: "Normal",
    seconds: "sec",
    items: "",
    soapData: [
      { key: 'S', label: 'Subjective', content: 'Headache for 3 days, worse in afternoon, temporary relief with painkillers', color: '#4B9CD3' },
      { key: 'O', label: 'Objective', content: 'BP 130/85, HR 76, neck muscle tension (+), neuro exam normal', color: '#10B981' },
      { key: 'A', label: 'Assessment', content: 'Tension headache (G44.2)', color: '#F59E0B' },
      { key: 'P', label: 'Plan', content: 'Acetaminophen 500mg tid, neck stretching education, f/u in 2 weeks', color: '#8B5CF6' },
    ],
    patients: [
      { name: 'Y. Kim', age: 45, gender: 'F', dept: 'Internal Med', complaint: 'Headache, worse PM', id: '2025-00142', selected: true },
      { name: 'J. Park', age: 62, gender: 'M', dept: 'Orthopedics', complaint: 'Left knee pain', id: '2025-00187', selected: false },
      { name: 'S. Lee', age: 33, gender: 'F', dept: 'ENT', complaint: 'Sore throat, fever', id: '2025-00201', selected: false },
    ],
    transcriptLines: [
      { speaker: 'Doctor', text: "What's bothering you today?", color: '#4B9CD3' },
      { speaker: 'Patient', text: "I've had headaches for 3 days. Worse in the afternoon.", color: '#10B981' },
      { speaker: 'Doctor', text: 'Have you tried any painkillers?', color: '#4B9CD3' },
      { speaker: 'Patient', text: 'Yes, they help briefly but then it comes back.', color: '#10B981' },
      { speaker: 'Doctor', text: "I'll check your BP and examine your neck.", color: '#4B9CD3' },
    ],
    emrFieldMap: [
      { soap: 'S', field: 'Chief Complaint', value: 'Headache, onset 3 days ago, worse PM' },
      { soap: 'O', field: 'Physical Exam', value: 'BP 130/85, HR 76, neck tension (+)' },
      { soap: 'A', field: 'Diagnosis', value: 'Tension headache G44.2' },
      { soap: 'P', field: 'Treatment Plan', value: 'Acetaminophen 500mg tid, neck stretching' },
    ],
    auditEntries: [
      { time: '14:23:05', action: 'Recording started', user: 'Dr. Kim', status: 'Done', statusColor: '#10B981' },
      { time: '14:24:32', action: 'AI chart generated', user: 'Chartsok AI', status: 'Done', statusColor: '#10B981' },
      { time: '14:24:35', action: 'EMR updated', user: 'Dr. Kim', status: 'Done', statusColor: '#10B981' },
      { time: '14:24:36', action: 'Audit log saved', user: 'System', status: 'Logged', statusColor: '#4B9CD3' },
    ],
    steps: [
      { label: 'Select Patient', subtitle: 'Pick a patient from the EMR', icon: <PersonSearchIcon />, accent: '#4B9CD3' },
      { label: 'Record Visit', subtitle: 'AI transcribes the conversation live', icon: <MicIcon />, accent: '#EF4444' },
      { label: 'Generate SOAP', subtitle: 'AI creates the SOAP chart automatically', icon: <AutoAwesomeIcon />, accent: '#8B5CF6' },
      { label: 'Push to EMR', subtitle: 'SOAP auto-populates EMR fields', icon: <DescriptionIcon />, accent: '#10B981' },
      { label: 'Audit Log', subtitle: 'Every action logged for compliance', icon: <SecurityIcon />, accent: '#F59E0B' },
    ],
  },
};

/* ========== DATA ========== */

const soapData = [
  { key: 'S', label: 'Subjective', content: '3일 전부터 두통 호소, 오후에 악화, 진통제 복용 시 일시적 호전', color: '#4B9CD3' },
  { key: 'O', label: 'Objective', content: 'BP 130/85, HR 76, 경부 근육 긴장(+), 신경학적 검사 정상', color: '#10B981' },
  { key: 'A', label: 'Assessment', content: '긴장성 두통 (G44.2)', color: '#F59E0B' },
  { key: 'P', label: 'Plan', content: '아세트아미노펜 500mg tid, 경부 스트레칭 교육, 2주 후 f/u', color: '#8B5CF6' },
];

const patients = [
  { name: '김영희', age: 45, gender: 'F', dept: '내과', complaint: '두통, 오후 악화', id: '2025-00142', selected: true },
  { name: '박준서', age: 62, gender: 'M', dept: '정형외과', complaint: '좌측 무릎 통증', id: '2025-00187', selected: false },
  { name: '이수진', age: 33, gender: 'F', dept: '이비인후과', complaint: '인후통, 발열', id: '2025-00201', selected: false },
];

const transcriptLines = [
  { speaker: '의사', text: '어디가 불편하세요?', color: '#4B9CD3' },
  { speaker: '환자', text: '3일 전부터 두통이 있어요. 오후에 더 심해져요.', color: '#10B981' },
  { speaker: '의사', text: '진통제는 복용해보셨나요?', color: '#4B9CD3' },
  { speaker: '환자', text: '네, 먹으면 잠깐 나아졌다가 다시 아파요.', color: '#10B981' },
  { speaker: '의사', text: '혈압 측정하고 경부 검진 하겠습니다.', color: '#4B9CD3' },
];

const emrFieldMap = [
  { soap: 'S', field: '주소 (Chief Complaint)', value: '두통, 3일 전 발생, 오후 악화' },
  { soap: 'O', field: '이학적 소견 (Findings)', value: 'BP 130/85, HR 76, 경부 근육 긴장(+)' },
  { soap: 'A', field: '진단코드 (Dx)', value: '긴장성 두통 G44.2' },
  { soap: 'P', field: '처방 / 계획 (Plan)', value: '아세트아미노펜 500mg tid, 경부 스트레칭' },
];

const auditEntries = [
  { time: '14:23:05', action: '녹음 시작', user: '김의사', status: '완료', statusColor: '#10B981' },
  { time: '14:24:32', action: 'AI 차트 생성', user: 'Chartsok AI', status: '완료', statusColor: '#10B981' },
  { time: '14:24:35', action: 'EMR 반영 완료', user: '김의사', status: '완료', statusColor: '#10B981' },
  { time: '14:24:36', action: '감사 로그 저장', user: 'System', status: '기록됨', statusColor: '#4B9CD3' },
];

/* ========== STEP DEFINITIONS ========== */

const steps = [
  { label: '환자 선택', subtitle: 'EMR에서 환자를 선택합니다', icon: <PersonSearchIcon />, accent: '#4B9CD3' },
  { label: '진료 녹음', subtitle: 'AI가 진료 대화를 실시간 기록합니다', icon: <MicIcon />, accent: '#EF4444' },
  { label: 'SOAP 자동 생성', subtitle: 'AI가 SOAP 차트를 자동 생성합니다', icon: <AutoAwesomeIcon />, accent: '#8B5CF6' },
  { label: 'EMR 반영', subtitle: 'SOAP이 EMR 필드에 자동 입력됩니다', icon: <DescriptionIcon />, accent: '#10B981' },
  { label: 'Audit Log', subtitle: '모든 기록이 감사 로그로 저장됩니다', icon: <SecurityIcon />, accent: '#F59E0B' },
];

const STEP_DURATION = 5000;
const TOTAL_STEPS = 5;

/* ========== UTILITY COMPONENTS ========== */

function AnimatedCounter({ end, duration = 1.5, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0);
  const frameRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    startTimeRef.current = null;
    const animate = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [end, duration]);

  return <span>{prefix}{count}{suffix}</span>;
}

function TypewriterText({ text, delay = 0, speed = 30, onComplete }) {
  const [displayed, setDisplayed] = useState('');
  const indexRef = useRef(0);
  const timerRef = useRef(null);

  useEffect(() => {
    setDisplayed('');
    indexRef.current = 0;
    const startTimeout = setTimeout(() => {
      timerRef.current = setInterval(() => {
        indexRef.current += 1;
        if (indexRef.current <= text.length) {
          setDisplayed(text.slice(0, indexRef.current));
        } else {
          clearInterval(timerRef.current);
          if (onComplete) onComplete();
        }
      }, speed);
    }, delay);
    return () => {
      clearTimeout(startTimeout);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [text, delay, speed, onComplete]);

  return (
    <span>
      {displayed}
      {displayed.length < text.length && (
        <MotionBox
          component="span"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.6, repeat: Infinity }}
          sx={{ display: 'inline-block', width: '2px', height: '1em', bgcolor: '#4B9CD3', ml: '1px', verticalAlign: 'text-bottom' }}
        />
      )}
    </span>
  );
}

/* Animated timer display that counts up like 00:00 -> 01:23 */
function CountUpTimer() {
  const [seconds, setSeconds] = useState(0);
  const targetSeconds = 90;

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev >= targetSeconds) return targetSeconds;
        return prev + 1;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');

  return (
    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
      <Typography
        component="span"
        sx={{
          fontFamily: '"SF Mono", "Fira Code", "Consolas", monospace',
          fontSize: { xs: '2.5rem', md: '3.5rem' },
          fontWeight: 800,
          background: 'linear-gradient(135deg, #4B9CD3 0%, #8B5CF6 50%, #10B981 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          lineHeight: 1,
        }}
      >
        {mins}:{secs}
      </Typography>
      <Typography
        component="span"
        sx={{
          fontSize: { xs: '0.9rem', md: '1.1rem' },
          color: 'rgba(255,255,255,0.5)',
          fontWeight: 500,
        }}
      >
        초
      </Typography>
    </Box>
  );
}

/* Circular progress indicator around timeline node */
function CircularProgress({ progress, size = 48, strokeWidth = 3, color = '#4B9CD3' }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg
      width={size}
      height={size}
      style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: 'stroke-dashoffset 0.1s linear' }}
      />
    </svg>
  );
}

/* Waveform for recording step */
function WaveformDisplay() {
  const barCount = 64;
  const bars = useMemo(() => {
    return Array.from({ length: barCount }).map((_, i) => {
      const f1 = Math.sin(i * 0.25) * 20;
      const f2 = Math.sin(i * 0.6 + 1.2) * 14;
      const f3 = Math.cos(i * 0.15) * 10;
      const f4 = Math.sin(i * 1.1) * 6;
      const h = 6 + Math.abs(f1 + f2 + f3 + f4);
      return { h, delay: i * 0.02 };
    });
  }, []);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2px', height: 80, px: 2 }}>
      {bars.map((bar, i) => (
        <MotionBox
          key={i}
          animate={{
            height: [bar.h * 0.15, bar.h, bar.h * 0.3, bar.h * 0.85, bar.h * 0.2],
            opacity: [0.4, 0.95, 0.5, 0.9, 0.4],
          }}
          transition={{
            duration: 1.5 + Math.sin(i * 0.3) * 0.4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: bar.delay,
          }}
          sx={{
            width: 3,
            borderRadius: 4,
            background: `linear-gradient(180deg, #EF4444 0%, #F87171 50%, rgba(239,68,68,0.3) 100%)`,
            flexShrink: 0,
          }}
        />
      ))}
    </Box>
  );
}

/* Shimmer reveal effect */
function ShimmerReveal() {
  return (
    <MotionBox
      initial={{ x: '-100%' }}
      animate={{ x: '200%' }}
      transition={{ duration: 1.4, ease: 'easeInOut' }}
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '40%',
        height: '100%',
        background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
        pointerEvents: 'none',
        zIndex: 2,
      }}
    />
  );
}

/* Scan line animation */
function ScanLine() {
  return (
    <MotionBox
      initial={{ top: 0 }}
      animate={{ top: '100%' }}
      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      sx={{
        position: 'absolute',
        left: 0,
        right: 0,
        height: '2px',
        background: 'linear-gradient(90deg, transparent, rgba(75,156,211,0.6), transparent)',
        pointerEvents: 'none',
        zIndex: 3,
        boxShadow: '0 0 12px rgba(75,156,211,0.4)',
      }}
    />
  );
}

/* AI Processing animation (spinning pulsing particles) */
function AIProcessingAnimation() {
  return (
    <Box sx={{ position: 'relative', width: 80, height: 80, mx: 'auto' }}>
      {/* Outer ring */}
      <MotionBox
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        sx={{
          position: 'absolute',
          inset: 0,
          border: '2px solid transparent',
          borderTopColor: '#8B5CF6',
          borderRightColor: 'rgba(139,92,246,0.3)',
          borderRadius: '50%',
        }}
      />
      {/* Inner ring */}
      <MotionBox
        animate={{ rotate: -360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        sx={{
          position: 'absolute',
          inset: 10,
          border: '2px solid transparent',
          borderTopColor: '#4B9CD3',
          borderLeftColor: 'rgba(75,156,211,0.3)',
          borderRadius: '50%',
        }}
      />
      {/* Center icon */}
      <MotionBox
        animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <AutoAwesomeIcon sx={{ color: '#8B5CF6', fontSize: 28 }} />
      </MotionBox>
      {/* Particles */}
      {[0, 60, 120, 180, 240, 300].map((deg, i) => (
        <MotionBox
          key={deg}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3,
          }}
          sx={{
            position: 'absolute',
            width: 4,
            height: 4,
            borderRadius: '50%',
            bgcolor: i % 2 === 0 ? '#8B5CF6' : '#4B9CD3',
            top: `${50 + 45 * Math.sin((deg * Math.PI) / 180)}%`,
            left: `${50 + 45 * Math.cos((deg * Math.PI) / 180)}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </Box>
  );
}

/* Connection line between SOAP and EMR fields */
function ConnectionLine({ color, delay = 0 }) {
  return (
    <MotionBox
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      transition={{ duration: 0.6, delay }}
      sx={{
        height: 2,
        flex: 1,
        background: `linear-gradient(90deg, ${color}, rgba(255,255,255,0.1))`,
        transformOrigin: 'left',
        borderRadius: 1,
        position: 'relative',
        overflow: 'hidden',
        minWidth: 20,
      }}
    >
      <MotionBox
        animate={{ x: ['-100%', '200%'] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: delay + 0.6 }}
        sx={{
          position: 'absolute',
          top: -1,
          width: '30%',
          height: 4,
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          borderRadius: 2,
          boxShadow: `0 0 8px ${color}`,
        }}
      />
    </MotionBox>
  );
}

/* Laptop frame for content display */
function LaptopFrame({ children, dark = false }) {
  return (
    <Box
      sx={{
        borderRadius: 2.5,
        overflow: 'hidden',
        border: '1px solid',
        borderColor: dark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.15)',
        bgcolor: dark ? '#0D1117' : '#FFFFFF',
        boxShadow: dark
          ? '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)'
          : '0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)',
      }}
    >
      {/* Browser chrome */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          px: 2,
          py: 1,
          bgcolor: dark ? '#161B22' : '#F6F8FA',
          borderBottom: '1px solid',
          borderColor: dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
        }}
      >
        <Box sx={{ display: 'flex', gap: 0.75 }}>
          <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#FF5F57' }} />
          <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#FFBD2E' }} />
          <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#28CA41' }} />
        </Box>
        <Box
          sx={{
            flex: 1,
            mx: 2,
            px: 2,
            py: 0.4,
            borderRadius: 1,
            bgcolor: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            sx={{
              fontSize: '0.65rem',
              color: dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)',
              fontFamily: 'monospace',
            }}
          >
            emr.hospital.kr/chart
          </Typography>
        </Box>
      </Box>
      {/* Content */}
      <Box sx={{ p: { xs: 2, md: 3 } }}>
        {children}
      </Box>
    </Box>
  );
}


/* ========== STEP CONTENT COMPONENTS ========== */

/* Step 1: Patient Select */
function StepPatientSelect() {
  return (
    <LaptopFrame>
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        <ScanLine />
        {/* Search bar */}
        <MotionBox
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            px: 2,
            py: 1.2,
            mb: 2,
            bgcolor: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: 2,
          }}
        >
          <Box sx={{ width: 16, height: 16, borderRadius: '50%', bgcolor: '#CBD5E1' }} />
          <Typography sx={{ color: '#94A3B8', fontSize: '0.8rem' }}>
            환자 이름 또는 ID로 검색...
          </Typography>
        </MotionBox>

        {/* Patient rows */}
        <Stack spacing={1}>
          {patients.map((pt, idx) => (
            <MotionBox
              key={pt.id}
              initial={{ opacity: 0, x: -30, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 + idx * 0.15, type: 'spring', stiffness: 100 }}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                px: 2,
                py: 1.5,
                borderRadius: 2,
                cursor: 'pointer',
                position: 'relative',
                bgcolor: pt.selected ? 'rgba(75,156,211,0.06)' : 'transparent',
                border: '2px solid',
                borderColor: pt.selected ? '#4B9CD3' : 'transparent',
                boxShadow: pt.selected ? '0 0 20px rgba(75,156,211,0.15), inset 0 0 20px rgba(75,156,211,0.03)' : 'none',
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: 'rgba(75,156,211,0.04)',
                  borderColor: pt.selected ? '#4B9CD3' : '#E2E8F0',
                },
              }}
            >
              {/* Avatar */}
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  bgcolor: pt.selected ? '#4B9CD3' : '#E2E8F0',
                  color: pt.selected ? 'white' : '#64748B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  flexShrink: 0,
                }}
              >
                {pt.name.charAt(0)}
              </Box>
              {/* Info */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography sx={{ fontWeight: 700, fontSize: '0.88rem', color: '#1E293B' }}>
                    {pt.name}
                  </Typography>
                  <Typography sx={{ fontSize: '0.75rem', color: '#64748B' }}>
                    {pt.age}세 / {pt.gender}
                  </Typography>
                  <Chip
                    label={pt.dept}
                    size="small"
                    sx={{
                      fontSize: '0.62rem',
                      height: 20,
                      fontWeight: 600,
                      bgcolor: pt.selected ? 'rgba(75,156,211,0.12)' : '#F1F5F9',
                      color: pt.selected ? '#4B9CD3' : '#64748B',
                    }}
                  />
                </Stack>
                <Typography sx={{ fontSize: '0.75rem', color: '#94A3B8', mt: 0.25 }}>
                  {pt.complaint} | ID: {pt.id}
                </Typography>
              </Box>
              {/* Check */}
              {pt.selected && (
                <MotionBox
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, delay: 0.6 }}
                >
                  <CheckCircleIcon sx={{ color: '#4B9CD3', fontSize: 22 }} />
                </MotionBox>
              )}
            </MotionBox>
          ))}
        </Stack>
      </Box>
    </LaptopFrame>
  );
}

/* Step 2: Recording */
function StepRecording() {
  const [revealedLines, setRevealedLines] = useState(0);
  const [timerValue, setTimerValue] = useState(0);

  const handleLineComplete = useCallback(() => {
    setRevealedLines((prev) => prev + 1);
  }, []);

  useEffect(() => {
    setRevealedLines(0);
    setTimerValue(0);
    const t = setTimeout(() => setRevealedLines(1), 400);
    const timerInterval = setInterval(() => {
      setTimerValue((prev) => (prev < 83 ? prev + 1 : 83));
    }, 50);
    return () => {
      clearTimeout(t);
      clearInterval(timerInterval);
    };
  }, []);

  const mins = Math.floor(timerValue / 60).toString().padStart(2, '0');
  const secs = (timerValue % 60).toString().padStart(2, '0');

  return (
    <LaptopFrame dark>
      {/* Patient + Recording indicator */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Box
            sx={{
              width: 32, height: 32, borderRadius: '50%', bgcolor: 'rgba(75,156,211,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <Typography sx={{ color: '#4B9CD3', fontWeight: 700, fontSize: '0.8rem' }}>김</Typography>
          </Box>
          <Box>
            <Typography sx={{ color: '#E2E8F0', fontWeight: 600, fontSize: '0.82rem' }}>
              김영희 (F/45)
            </Typography>
            <Typography sx={{ color: '#64748B', fontSize: '0.68rem' }}>내과</Typography>
          </Box>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          <MotionBox
            animate={{ opacity: [1, 0.2, 1], scale: [1, 1.4, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <FiberManualRecordIcon sx={{ color: '#EF4444', fontSize: 12 }} />
          </MotionBox>
          <Typography sx={{ color: '#EF4444', fontWeight: 700, fontSize: '0.75rem', fontFamily: 'monospace' }}>
            REC
          </Typography>
        </Stack>
      </Stack>

      {/* Big Timer */}
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Typography
          sx={{
            fontFamily: '"SF Mono", "Fira Code", "Consolas", monospace',
            fontSize: { xs: '2rem', md: '2.8rem' },
            fontWeight: 800,
            color: '#E2E8F0',
            letterSpacing: '0.1em',
          }}
        >
          {mins}:{secs}
        </Typography>
      </Box>

      {/* Waveform */}
      <Box
        sx={{
          bgcolor: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 2,
          py: 1.5,
          mb: 3,
        }}
      >
        <WaveformDisplay />
      </Box>

      {/* Real-time transcript */}
      <Box>
        <Typography sx={{ color: '#64748B', fontWeight: 600, fontSize: '0.7rem', mb: 1, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          실시간 텍스트 변환
        </Typography>
        <Box
          sx={{
            bgcolor: 'rgba(0,0,0,0.3)',
            borderRadius: 2,
            p: 2,
            minHeight: { xs: 120, md: 140 },
            border: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          <Stack spacing={1}>
            {transcriptLines.map((line, i) => {
              if (i >= revealedLines) return null;
              const isCurrentLine = i === revealedLines - 1;
              return (
                <MotionBox
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Typography sx={{ fontSize: { xs: '0.72rem', md: '0.78rem' }, lineHeight: 1.7 }}>
                    {isCurrentLine ? (
                      <>
                        <Box component="span" sx={{ color: line.color, fontWeight: 700 }}>[{line.speaker}]</Box>{' '}
                        <Box component="span" sx={{ color: '#CBD5E1' }}>
                          <TypewriterText
                            text={line.text}
                            speed={35}
                            delay={0}
                            onComplete={i < transcriptLines.length - 1 ? handleLineComplete : undefined}
                          />
                        </Box>
                      </>
                    ) : (
                      <>
                        <Box component="span" sx={{ color: line.color, fontWeight: 700 }}>[{line.speaker}]</Box>{' '}
                        <Box component="span" sx={{ color: '#94A3B8' }}>{line.text}</Box>
                      </>
                    )}
                  </Typography>
                </MotionBox>
              );
            })}
          </Stack>
        </Box>
      </Box>
    </LaptopFrame>
  );
}

/* Step 3: SOAP Generation - the money shot */
function StepSoapGeneration() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [phase, setPhase] = useState('transcript'); // transcript -> processing -> result

  useEffect(() => {
    setPhase('transcript');
    const t1 = setTimeout(() => setPhase('processing'), 1200);
    const t2 = setTimeout(() => setPhase('result'), 2800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <Box>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={{ xs: 3, md: 2 }}
        alignItems="stretch"
      >
        {/* Left: Raw transcript */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
            <MicIcon sx={{ color: '#94A3B8', fontSize: 16 }} />
            <Typography sx={{ color: '#94A3B8', fontWeight: 600, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              녹음 원본
            </Typography>
          </Stack>
          <Box
            sx={{
              bgcolor: '#0D1117',
              borderRadius: 2,
              p: 2,
              minHeight: { xs: 140, md: 200 },
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <Stack spacing={0.75}>
              {transcriptLines.map((line, i) => (
                <MotionBox
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: phase === 'transcript' ? 1 : 0.4, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                >
                  <Typography sx={{ fontSize: { xs: '0.68rem', md: '0.74rem' }, lineHeight: 1.7 }}>
                    <Box component="span" sx={{ color: line.color, fontWeight: 700 }}>[{line.speaker}]</Box>{' '}
                    <Box component="span" sx={{ color: '#CBD5E1' }}>{line.text}</Box>
                  </Typography>
                </MotionBox>
              ))}
            </Stack>
          </Box>
        </Box>

        {/* Center: AI Processing */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            py: { xs: 1, md: 0 },
            minWidth: { md: 100 },
          }}
        >
          <AnimatePresence mode="wait">
            {phase === 'processing' ? (
              <MotionBox
                key="processing"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.4 }}
              >
                <AIProcessingAnimation />
                <Typography sx={{ color: '#8B5CF6', fontSize: '0.65rem', fontWeight: 600, mt: 1, textAlign: 'center' }}>
                  AI 분석 중...
                </Typography>
              </MotionBox>
            ) : (
              <MotionBox
                key="arrow"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}
              >
                <MotionBox
                  animate={isMobile ? { y: [0, 6, 0] } : { x: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowForwardIcon
                    sx={{
                      color: phase === 'result' ? '#8B5CF6' : '#334155',
                      fontSize: 28,
                      transform: isMobile ? 'rotate(90deg)' : 'none',
                    }}
                  />
                </MotionBox>
                {phase === 'result' && (
                  <MotionBox
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', delay: 0.2 }}
                  >
                    <Chip
                      icon={<AutoAwesomeIcon sx={{ fontSize: 12 }} />}
                      label="AI 생성"
                      size="small"
                      sx={{
                        bgcolor: 'rgba(139,92,246,0.15)',
                        color: '#8B5CF6',
                        fontWeight: 600,
                        fontSize: '0.6rem',
                        height: 20,
                        '& .MuiChip-icon': { color: '#8B5CF6' },
                      }}
                    />
                  </MotionBox>
                )}
              </MotionBox>
            )}
          </AnimatePresence>
        </Box>

        {/* Right: SOAP cards */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
            <AutoAwesomeIcon sx={{ color: '#8B5CF6', fontSize: 16 }} />
            <Typography sx={{ color: '#8B5CF6', fontWeight: 600, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              SOAP 차트
            </Typography>
          </Stack>
          <Stack spacing={1.25}>
            {soapData.map((item, index) => (
              <MotionBox
                key={item.key}
                initial={{ opacity: 0, x: 40, scale: 0.9 }}
                animate={{
                  opacity: phase === 'result' ? 1 : 0.1,
                  x: phase === 'result' ? 0 : 40,
                  scale: phase === 'result' ? 1 : 0.9,
                }}
                transition={{
                  duration: 0.6,
                  delay: phase === 'result' ? index * 0.2 : 0,
                  type: 'spring',
                  stiffness: 80,
                }}
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                  p: { xs: 1.25, md: 1.75 },
                  bgcolor: '#FFFFFF',
                  borderRadius: 2,
                  borderLeft: '4px solid',
                  borderLeftColor: item.color,
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                }}
              >
                {phase === 'result' && <ShimmerReveal />}
                <Stack direction="row" spacing={1.5} alignItems="flex-start">
                  <Box
                    sx={{
                      width: 28,
                      height: 28,
                      borderRadius: 1.5,
                      bgcolor: item.color,
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '0.7rem',
                      flexShrink: 0,
                    }}
                  >
                    {item.key}
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography sx={{ color: item.color, fontWeight: 700, fontSize: '0.68rem', mb: 0.25 }}>
                      {item.label}
                    </Typography>
                    <Typography sx={{ color: '#334155', fontSize: { xs: '0.72rem', md: '0.78rem' }, lineHeight: 1.6 }}>
                      {item.content}
                    </Typography>
                  </Box>
                </Stack>
              </MotionBox>
            ))}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

/* Step 4: EMR Insert with connection lines */
function StepEmrInsert() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box>
      {/* Mapping rows */}
      <Stack spacing={isMobile ? 2 : 1.5}>
        {emrFieldMap.map((mapping, index) => {
          const soapItem = soapData.find((s) => s.key === mapping.soap);
          const color = soapItem?.color || '#4B9CD3';
          return (
            <MotionBox
              key={mapping.soap}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Stack
                direction={{ xs: 'column', md: 'row' }}
                spacing={{ xs: 1, md: 2 }}
                alignItems={{ md: 'center' }}
              >
                {/* SOAP source */}
                <Box
                  sx={{
                    flex: 1,
                    p: 1.5,
                    bgcolor: '#FFFFFF',
                    borderRadius: 2,
                    borderLeft: '4px solid',
                    borderLeftColor: color,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  }}
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Box
                      sx={{
                        width: 24, height: 24, borderRadius: 1,
                        bgcolor: color, color: 'white',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 800, fontSize: '0.6rem', flexShrink: 0,
                      }}
                    >
                      {mapping.soap}
                    </Box>
                    <Typography sx={{ fontSize: '0.75rem', color: '#475569', fontWeight: 500 }}>
                      {soapItem?.content}
                    </Typography>
                  </Stack>
                </Box>

                {/* Connection line */}
                {!isMobile && <ConnectionLine color={color} delay={0.5 + index * 0.2} />}
                {isMobile && (
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <MotionBox
                      animate={{ y: [0, 4, 0] }}
                      transition={{ duration: 1, repeat: Infinity, delay: index * 0.15 }}
                      sx={{ color, fontSize: 18 }}
                    >
                      <ArrowForwardIcon sx={{ transform: 'rotate(90deg)', fontSize: 18 }} />
                    </MotionBox>
                  </Box>
                )}

                {/* EMR target */}
                <MotionBox
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.2 }}
                  sx={{
                    flex: 1,
                    p: 1.5,
                    bgcolor: 'rgba(16,185,129,0.04)',
                    borderRadius: 2,
                    border: '1px solid rgba(16,185,129,0.15)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <ShimmerReveal />
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography sx={{ fontWeight: 700, fontSize: '0.72rem', color: '#065F46' }}>
                        {mapping.field}
                      </Typography>
                      <Typography sx={{ fontSize: '0.7rem', color: '#64748B', mt: 0.25 }}>
                        {mapping.value}
                      </Typography>
                    </Box>
                    <MotionBox
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 200, delay: 1.2 + index * 0.2 }}
                    >
                      <CheckCircleIcon sx={{ fontSize: 18, color: '#10B981' }} />
                    </MotionBox>
                  </Stack>
                </MotionBox>
              </Stack>
            </MotionBox>
          );
        })}
      </Stack>

      {/* Success badge */}
      <MotionBox
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 2, type: 'spring' }}
        sx={{
          mt: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1.5,
          p: 2,
          borderRadius: 2,
          background: 'linear-gradient(135deg, rgba(16,185,129,0.08) 0%, rgba(16,185,129,0.04) 100%)',
          border: '1px solid rgba(16,185,129,0.2)',
        }}
      >
        <MotionBox
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <CheckCircleIcon sx={{ color: '#10B981', fontSize: 26 }} />
        </MotionBox>
        <Typography sx={{ fontWeight: 700, color: '#065F46', fontSize: { xs: '0.88rem', md: '0.95rem' } }}>
          자동 입력 완료
        </Typography>
      </MotionBox>
    </Box>
  );
}

/* Step 5: Audit Log - terminal style */
function StepAuditLog() {
  return (
    <LaptopFrame dark>
      {/* Header */}
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
        <SecurityIcon sx={{ color: '#F59E0B', fontSize: 18 }} />
        <Typography sx={{ color: '#E2E8F0', fontWeight: 700, fontSize: '0.82rem' }}>
          감사 추적 로그
        </Typography>
        <Chip
          label="HIPAA"
          size="small"
          sx={{
            bgcolor: 'rgba(245,158,11,0.15)',
            color: '#F59E0B',
            fontWeight: 600,
            fontSize: '0.58rem',
            height: 18,
          }}
        />
      </Stack>

      {/* Terminal log entries */}
      <Box
        sx={{
          bgcolor: 'rgba(0,0,0,0.4)',
          borderRadius: 1.5,
          p: 2,
          fontFamily: '"SF Mono", "Fira Code", "Consolas", monospace',
          border: '1px solid rgba(255,255,255,0.05)',
          mb: 3,
        }}
      >
        {/* Terminal prompt */}
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          sx={{ mb: 1.5 }}
        >
          <Typography sx={{ color: '#64748B', fontSize: '0.65rem' }}>
            $ chartsok audit --session 2025-00142
          </Typography>
        </MotionBox>

        <Stack spacing={0.75}>
          {auditEntries.map((entry, idx) => (
            <MotionBox
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + idx * 0.25 }}
            >
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ flexWrap: 'wrap' }}>
                <Typography sx={{ color: '#64748B', fontSize: { xs: '0.62rem', md: '0.7rem' }, fontFamily: 'inherit', flexShrink: 0 }}>
                  [{entry.time}]
                </Typography>
                <Typography sx={{ color: '#E2E8F0', fontSize: { xs: '0.62rem', md: '0.7rem' }, fontWeight: 600, fontFamily: 'inherit', flex: 1, minWidth: 0 }}>
                  {entry.action}
                </Typography>
                <Typography sx={{ color: '#94A3B8', fontSize: { xs: '0.62rem', md: '0.7rem' }, fontFamily: 'inherit', flexShrink: 0 }}>
                  {entry.user}
                </Typography>
                <Box
                  sx={{
                    px: 1,
                    py: 0.15,
                    borderRadius: 0.5,
                    bgcolor: `${entry.statusColor}20`,
                    border: `1px solid ${entry.statusColor}40`,
                    flexShrink: 0,
                  }}
                >
                  <Typography sx={{ color: entry.statusColor, fontSize: '0.58rem', fontWeight: 600, fontFamily: 'inherit' }}>
                    {entry.status}
                  </Typography>
                </Box>
              </Stack>
            </MotionBox>
          ))}
        </Stack>
      </Box>

      {/* Animated stats */}
      <MotionBox
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.5 }}
      >
        <Stack
          direction="row"
          spacing={{ xs: 2, md: 4 }}
          justifyContent="center"
          sx={{
            py: 2,
            px: 2,
            bgcolor: 'rgba(255,255,255,0.03)',
            borderRadius: 2,
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {[
            { label: '소요 시간', value: 91, suffix: '초', color: '#4B9CD3' },
            { label: '기록 항목', value: 4, suffix: '건', color: '#10B981' },
            { label: '감사 상태', text: '정상', color: '#F59E0B' },
          ].map((stat) => (
            <Box key={stat.label} sx={{ textAlign: 'center' }}>
              <Typography
                sx={{
                  fontWeight: 800,
                  color: stat.color,
                  fontSize: { xs: '1.1rem', md: '1.3rem' },
                  fontFamily: '"SF Mono", "Fira Code", monospace',
                }}
              >
                {stat.value != null ? (
                  <AnimatedCounter end={stat.value} duration={1.5} suffix={stat.suffix} />
                ) : (
                  stat.text
                )}
              </Typography>
              <Typography sx={{ color: '#64748B', fontSize: '0.62rem', mt: 0.25 }}>
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Stack>
      </MotionBox>
    </LaptopFrame>
  );
}

/* ========== TIMELINE NODE ========== */

function TimelineNode({ step, index, isActive, isCompleted, onClick, progress, isAutoPlaying }) {
  return (
    <MotionBox
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        cursor: 'pointer',
        py: 1.5,
        px: 1.5,
        borderRadius: 2,
        bgcolor: isActive ? 'rgba(255,255,255,0.06)' : 'transparent',
        transition: 'background-color 0.3s ease',
        '&:hover': {
          bgcolor: 'rgba(255,255,255,0.04)',
        },
      }}
    >
      {/* Node circle */}
      <Box sx={{ position: 'relative', width: 44, height: 44, flexShrink: 0 }}>
        {/* Glow effect for active */}
        {isActive && (
          <MotionBox
            animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            sx={{
              position: 'absolute',
              inset: -4,
              borderRadius: '50%',
              bgcolor: `${step.accent}30`,
              filter: 'blur(8px)',
            }}
          />
        )}

        {/* Circular progress */}
        {isActive && isAutoPlaying && (
          <CircularProgress progress={progress} size={44} strokeWidth={2.5} color={step.accent} />
        )}

        {/* Circle */}
        <Box
          sx={{
            position: 'absolute',
            inset: isActive ? 6 : 8,
            borderRadius: '50%',
            bgcolor: isActive ? step.accent : isCompleted ? `${step.accent}80` : 'rgba(255,255,255,0.1)',
            border: '2px solid',
            borderColor: isActive ? step.accent : isCompleted ? step.accent : 'rgba(255,255,255,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            zIndex: 2,
            color: isActive || isCompleted ? 'white' : 'rgba(255,255,255,0.4)',
            '& svg': { fontSize: isActive ? 16 : 14 },
          }}
        >
          {isCompleted && !isActive ? (
            <CheckCircleIcon sx={{ fontSize: '14px !important' }} />
          ) : (
            step.icon
          )}
        </Box>
      </Box>

      {/* Label */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          sx={{
            color: isActive ? '#FFFFFF' : isCompleted ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.4)',
            fontWeight: isActive ? 700 : 500,
            fontSize: '0.82rem',
            transition: 'color 0.3s ease',
            lineHeight: 1.3,
          }}
        >
          {step.label}
        </Typography>
        {isActive && (
          <MotionBox
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.68rem', mt: 0.25 }}>
              {step.subtitle}
            </Typography>
          </MotionBox>
        )}
      </Box>
    </MotionBox>
  );
}


/* ========== MOBILE PROGRESS BAR ========== */

function MobileProgressBar({ activeStep, totalSteps, steps: stepDefs, onStepClick, stepProgress, isAutoPlaying }) {
  return (
    <Box sx={{ mb: 3 }}>
      {/* Step dots */}
      <Stack direction="row" spacing={1} justifyContent="center" alignItems="center" sx={{ mb: 1.5 }}>
        {stepDefs.map((step, i) => (
          <Box
            key={i}
            onClick={() => onStepClick(i)}
            sx={{
              position: 'relative',
              width: i === activeStep ? 32 : 10,
              height: 10,
              borderRadius: 5,
              bgcolor: i <= activeStep ? step.accent : 'rgba(255,255,255,0.15)',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              overflow: 'hidden',
            }}
          >
            {i === activeStep && isAutoPlaying && (
              <MotionBox
                key={`progress-${activeStep}`}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: STEP_DURATION / 1000, ease: 'linear' }}
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  height: '100%',
                  bgcolor: 'rgba(255,255,255,0.4)',
                  borderRadius: 5,
                }}
              />
            )}
          </Box>
        ))}
      </Stack>

      {/* Active step label */}
      <Typography
        sx={{
          color: 'rgba(255,255,255,0.7)',
          fontSize: '0.72rem',
          textAlign: 'center',
          fontWeight: 600,
        }}
      >
        <Box component="span" sx={{ color: stepDefs[activeStep].accent, mr: 0.5 }}>
          {activeStep + 1}/{totalSteps}
        </Box>
        {stepDefs[activeStep].label}
      </Typography>
    </Box>
  );
}

/* ========== MAIN DEMO COMPONENT ========== */

export default function Demo() {
  const { locale } = useI18n();
  const t = demoContent[locale] || demoContent.ko;

  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [stepProgress, setStepProgress] = useState(0);
  const containerRef = useRef(null);
  const autoPlayTimerRef = useRef(null);
  const progressTimerRef = useRef(null);
  const hasBeenInViewRef = useRef(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Start auto-play when scrolling into view
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasBeenInViewRef.current) {
          hasBeenInViewRef.current = true;
          setTimeout(() => setIsAutoPlaying(true), 800);
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Auto-advance logic
  useEffect(() => {
    if (!isAutoPlaying) {
      if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      return;
    }

    setStepProgress(0);
    const progressInterval = 50;
    let elapsed = 0;

    progressTimerRef.current = setInterval(() => {
      elapsed += progressInterval;
      setStepProgress((elapsed / STEP_DURATION) * 100);
    }, progressInterval);

    autoPlayTimerRef.current = setTimeout(() => {
      setActiveStep((prev) => {
        const next = prev + 1;
        if (next >= TOTAL_STEPS) {
          setIsAutoPlaying(false);
          return 0;
        }
        return next;
      });
    }, STEP_DURATION);

    return () => {
      if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, [isAutoPlaying, activeStep]);

  const handleStepClick = useCallback((index) => {
    setActiveStep(index);
    setIsAutoPlaying(false);
    setStepProgress(0);
  }, []);

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlaying((prev) => !prev);
    if (!isAutoPlaying) {
      setStepProgress(0);
    }
  }, [isAutoPlaying]);

  // Swipe handling
  const touchStartRef = useRef(null);
  const handleTouchStart = useCallback((e) => {
    touchStartRef.current = e.touches[0].clientX;
  }, []);
  const handleTouchEnd = useCallback((e) => {
    if (touchStartRef.current === null) return;
    const diff = touchStartRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && activeStep < TOTAL_STEPS - 1) {
        setActiveStep((prev) => prev + 1);
        setIsAutoPlaying(false);
        setStepProgress(0);
      } else if (diff < 0 && activeStep > 0) {
        setActiveStep((prev) => prev - 1);
        setIsAutoPlaying(false);
        setStepProgress(0);
      }
    }
    touchStartRef.current = null;
  }, [activeStep]);

  const stepContent = useMemo(() => {
    switch (activeStep) {
      case 0: return <StepPatientSelect />;
      case 1: return <StepRecording />;
      case 2: return <StepSoapGeneration />;
      case 3: return <StepEmrInsert />;
      case 4: return <StepAuditLog />;
      default: return null;
    }
  }, [activeStep]);

  return (
    <Box
      id="demo"
      ref={containerRef}
      sx={{
        background: 'linear-gradient(180deg, #0F172A 0%, #1E293B 40%, #0F172A 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle background gradient orbs */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '-10%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(75,156,211,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          right: '-10%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        {/* ====== HERO HEADER ====== */}
        <MotionBox
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: 'spring' }}
          sx={{
            textAlign: 'center',
            pt: { xs: 8, md: 12 },
            pb: { xs: 5, md: 8 },
          }}
        >
          {/* Overline */}
          <MotionBox
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Chip
              icon={<TimerIcon sx={{ fontSize: 14 }} />}
              label="LIVE PRODUCT TOUR"
              size="small"
              sx={{
                bgcolor: 'rgba(75,156,211,0.12)',
                color: '#4B9CD3',
                fontWeight: 700,
                fontSize: '0.68rem',
                height: 28,
                mb: 3,
                border: '1px solid rgba(75,156,211,0.2)',
                letterSpacing: '0.08em',
                '& .MuiChip-icon': { color: '#4B9CD3' },
              }}
            />
          </MotionBox>

          {/* Main title */}
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '1.8rem', sm: '2.4rem', md: '3.2rem' },
              fontWeight: 800,
              color: '#FFFFFF',
              mb: 2,
              lineHeight: 1.15,
            }}
          >
            {t.heroTitle}
          </Typography>

          {/* Subtitle */}
          <Typography
            sx={{
              color: 'rgba(255,255,255,0.55)',
              fontSize: { xs: '0.92rem', md: '1.1rem' },
              maxWidth: 520,
              mx: 'auto',
              mb: 4,
              lineHeight: 1.7,
            }}
          >
            {t.heroSubtitle1}
            <br />
            {t.heroSubtitle2}
          </Typography>

          {/* Timer counter */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <CountUpTimer />
          </MotionBox>
        </MotionBox>

        {/* ====== MAIN CONTENT AREA ====== */}
        <MotionBox
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          sx={{ pb: { xs: 6, md: 10 } }}
        >
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={0}
            sx={{
              borderRadius: 4,
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.08)',
              bgcolor: 'rgba(255,255,255,0.02)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 40px 100px rgba(0,0,0,0.4)',
            }}
          >
            {/* ===== LEFT: VERTICAL TIMELINE (desktop) / TOP: PROGRESS (mobile) ===== */}
            <Box
              sx={{
                width: { xs: '100%', md: 260 },
                flexShrink: 0,
                bgcolor: 'rgba(0,0,0,0.3)',
                borderRight: { md: '1px solid rgba(255,255,255,0.06)' },
                borderBottom: { xs: '1px solid rgba(255,255,255,0.06)', md: 'none' },
                p: { xs: 2.5, md: 3 },
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Mobile: horizontal progress */}
              {isMobile && (
                <MobileProgressBar
                  activeStep={activeStep}
                  totalSteps={TOTAL_STEPS}
                  steps={t.steps}
                  onStepClick={handleStepClick}
                  stepProgress={stepProgress}
                  isAutoPlaying={isAutoPlaying}
                />
              )}

              {/* Desktop: vertical timeline */}
              {!isMobile && (
                <>
                  {/* Section label */}
                  <Typography
                    sx={{
                      color: 'rgba(255,255,255,0.35)',
                      fontSize: '0.62rem',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      mb: 2,
                      px: 1.5,
                    }}
                  >
                    {t.workflowLabel}
                  </Typography>

                  {/* Timeline nodes */}
                  <Stack spacing={0.5} sx={{ flex: 1 }}>
                    {t.steps.map((step, index) => (
                      <Box key={index}>
                        <TimelineNode
                          step={step}
                          index={index}
                          isActive={activeStep === index}
                          isCompleted={index < activeStep}
                          onClick={() => handleStepClick(index)}
                          progress={activeStep === index ? stepProgress : 0}
                          isAutoPlaying={isAutoPlaying}
                        />
                        {/* Connecting line */}
                        {index < t.steps.length - 1 && (
                          <Box
                            sx={{
                              width: 2,
                              height: 16,
                              ml: '22px',
                              bgcolor: index < activeStep ? `${t.steps[index].accent}60` : 'rgba(255,255,255,0.06)',
                              borderRadius: 1,
                              transition: 'background-color 0.3s ease',
                            }}
                          />
                        )}
                      </Box>
                    ))}
                  </Stack>
                </>
              )}

              {/* Play/Pause button */}
              <Box sx={{ mt: isMobile ? 0 : 2, display: 'flex', justifyContent: 'center' }}>
                <MotionBox
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleAutoPlay}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    px: 2.5,
                    py: 1,
                    borderRadius: 2,
                    bgcolor: isAutoPlaying ? 'rgba(75,156,211,0.15)' : 'rgba(255,255,255,0.06)',
                    border: '1px solid',
                    borderColor: isAutoPlaying ? 'rgba(75,156,211,0.3)' : 'rgba(255,255,255,0.1)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: isAutoPlaying ? 'rgba(75,156,211,0.2)' : 'rgba(255,255,255,0.08)',
                    },
                  }}
                >
                  {isAutoPlaying ? (
                    <PauseIcon sx={{ fontSize: 16, color: '#4B9CD3' }} />
                  ) : (
                    <PlayArrowIcon sx={{ fontSize: 16, color: 'rgba(255,255,255,0.6)' }} />
                  )}
                  <Typography
                    sx={{
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      color: isAutoPlaying ? '#4B9CD3' : 'rgba(255,255,255,0.5)',
                    }}
                  >
                    {isAutoPlaying ? t.pauseButton : t.autoPlayButton}
                  </Typography>
                </MotionBox>
              </Box>
            </Box>

            {/* ===== RIGHT: SHOWCASE AREA ===== */}
            <Box
              sx={{
                flex: 1,
                minWidth: 0,
                p: { xs: 2.5, sm: 3, md: 4 },
                overflow: 'hidden',
                position: 'relative',
                bgcolor: 'rgba(15,23,42,0.5)',
              }}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {/* Step header */}
              <AnimatePresence mode="wait">
                <MotionBox
                  key={`header-${activeStep}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  sx={{ mb: 3 }}
                >
                  <Stack direction="row" alignItems="center" spacing={1.5}>
                    {/* Step number */}
                    <Box sx={{ position: 'relative' }}>
                      <MotionBox
                        animate={{ opacity: [0.4, 0.7, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        sx={{
                          position: 'absolute',
                          inset: -4,
                          borderRadius: '50%',
                          bgcolor: `${t.steps[activeStep].accent}20`,
                          filter: 'blur(8px)',
                        }}
                      />
                      <Box
                        sx={{
                          width: 36,
                          height: 36,
                          borderRadius: '50%',
                          bgcolor: `${t.steps[activeStep].accent}20`,
                          border: '2px solid',
                          borderColor: t.steps[activeStep].accent,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          position: 'relative',
                          zIndex: 1,
                        }}
                      >
                        <Typography
                          sx={{
                            color: t.steps[activeStep].accent,
                            fontWeight: 800,
                            fontSize: '0.85rem',
                          }}
                        >
                          {activeStep + 1}
                        </Typography>
                      </Box>
                    </Box>

                    <Box>
                      <Typography
                        sx={{
                          color: '#FFFFFF',
                          fontWeight: 800,
                          fontSize: { xs: '1.1rem', md: '1.35rem' },
                          lineHeight: 1.2,
                        }}
                      >
                        {t.steps[activeStep].label}
                      </Typography>
                      <Typography
                        sx={{
                          color: 'rgba(255,255,255,0.45)',
                          fontSize: { xs: '0.72rem', md: '0.8rem' },
                          mt: 0.25,
                        }}
                      >
                        {t.steps[activeStep].subtitle}
                      </Typography>
                    </Box>
                  </Stack>
                </MotionBox>
              </AnimatePresence>

              {/* Step content with animation */}
              <AnimatePresence mode="wait">
                <MotionBox
                  key={activeStep}
                  initial={{ opacity: 0, y: 30, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.98 }}
                  transition={{
                    duration: 0.5,
                    type: 'spring',
                    stiffness: 100,
                    damping: 20,
                  }}
                >
                  {stepContent}
                </MotionBox>
              </AnimatePresence>
            </Box>
          </Stack>
        </MotionBox>

        {/* ====== BOTTOM CTA ====== */}
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, type: 'spring' }}
          sx={{
            textAlign: 'center',
            pb: { xs: 8, md: 12 },
          }}
        >
          <MotionBox
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            sx={{ display: 'inline-block' }}
          >
            <Button
              variant="contained"
              size="large"
              href="/contact?type=emr_partner"
              sx={{
                background: 'linear-gradient(135deg, #4B9CD3 0%, #8B5CF6 100%)',
                color: 'white',
                textTransform: 'none',
                fontWeight: 700,
                fontSize: { xs: '0.92rem', md: '1.05rem' },
                px: { xs: 4, md: 6 },
                py: 2,
                borderRadius: 3,
                boxShadow: '0 8px 32px rgba(75,156,211,0.3), 0 0 0 1px rgba(255,255,255,0.1) inset',
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  background: 'linear-gradient(135deg, #3A8BC2 0%, #7C3AED 100%)',
                  boxShadow: '0 12px 48px rgba(75,156,211,0.4), 0 0 0 1px rgba(255,255,255,0.15) inset',
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
                  transition: 'left 0.5s ease',
                },
                '&:hover::before': {
                  left: '100%',
                },
              }}
            >
              {t.ctaButton}
              <ArrowForwardIcon sx={{ ml: 1, fontSize: 20 }} />
            </Button>
          </MotionBox>
        </MotionBox>
      </Container>
    </Box>
  );
}
