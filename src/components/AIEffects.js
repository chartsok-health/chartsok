'use client';

import { Box } from '@mui/material';
import { motion } from 'framer-motion';

const MotionBox = motion.create(Box);

// Floating particles that represent AI processing
export function FloatingParticles({ count = 20, color = '#4B9CD3' }) {
  return (
    <Box sx={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {Array.from({ length: count }).map((_, i) => (
        <MotionBox
          key={i}
          initial={{
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            scale: Math.random() * 0.5 + 0.5,
            opacity: 0,
          }}
          animate={{
            y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
            x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'linear',
          }}
          sx={{
            position: 'absolute',
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            borderRadius: '50%',
            bgcolor: color,
            filter: 'blur(1px)',
          }}
        />
      ))}
    </Box>
  );
}

// Neural network style connecting lines
export function NeuralConnections({ nodes = 6 }) {
  const nodePositions = Array.from({ length: nodes }, (_, i) => ({
    x: 15 + (i % 3) * 35,
    y: 20 + Math.floor(i / 3) * 60,
  }));

  return (
    <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <svg width="100%" height="100%" style={{ position: 'absolute' }}>
        {nodePositions.map((start, i) =>
          nodePositions.slice(i + 1).map((end, j) => (
            <motion.line
              key={`${i}-${j}`}
              x1={`${start.x}%`}
              y1={`${start.y}%`}
              x2={`${end.x}%`}
              y2={`${end.y}%`}
              stroke="rgba(75, 156, 211, 0.15)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: i * 0.2 }}
            />
          ))
        )}
      </svg>
      {nodePositions.map((pos, i) => (
        <MotionBox
          key={i}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3,
          }}
          sx={{
            position: 'absolute',
            left: `${pos.x}%`,
            top: `${pos.y}%`,
            transform: 'translate(-50%, -50%)',
            width: 8,
            height: 8,
            borderRadius: '50%',
            bgcolor: 'primary.main',
            boxShadow: '0 0 10px rgba(75, 156, 211, 0.5)',
          }}
        />
      ))}
    </Box>
  );
}

// Pulsing glow effect
export function PulsingGlow({ color = '#4B9CD3', size = 200 }) {
  return (
    <MotionBox
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      sx={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`,
        filter: 'blur(20px)',
      }}
    />
  );
}

// AI Processing indicator with sparkles
export function AISparkles({ isActive = true }) {
  return (
    <Box sx={{ position: 'relative', width: 40, height: 40 }}>
      {[0, 1, 2, 3].map((i) => (
        <MotionBox
          key={i}
          animate={isActive ? {
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            rotate: [0, 180],
          } : {}}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.3,
            ease: 'easeOut',
          }}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 4,
            height: 4,
            bgcolor: '#8B5CF6',
            borderRadius: 1,
            boxShadow: '0 0 8px #8B5CF6',
          }}
        />
      ))}
    </Box>
  );
}

// Sound wave visualization
export function SoundWave({ isActive = true, bars = 12, color = '#4B9CD3' }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3, height: 32 }}>
      {Array.from({ length: bars }).map((_, i) => (
        <MotionBox
          key={i}
          animate={isActive ? {
            height: [6, Math.random() * 28 + 6, 6],
          } : { height: 6 }}
          transition={{
            duration: 0.5 + Math.random() * 0.3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          sx={{
            width: 3,
            bgcolor: color,
            borderRadius: 2,
            opacity: 0.8,
          }}
        />
      ))}
    </Box>
  );
}

// Typing indicator (AI is thinking)
export function TypingIndicator() {
  return (
    <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
      {[0, 1, 2].map((i) => (
        <MotionBox
          key={i}
          animate={{
            y: [0, -6, 0],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
          }}
          sx={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            bgcolor: 'primary.main',
          }}
        />
      ))}
    </Box>
  );
}

// SOAP generation animation
export function SOAPAnimation({ isActive = true }) {
  const items = [
    { letter: 'S', color: '#4B9CD3', delay: 0 },
    { letter: 'O', color: '#10B981', delay: 0.2 },
    { letter: 'A', color: '#F59E0B', delay: 0.4 },
    { letter: 'P', color: '#8B5CF6', delay: 0.6 },
  ];

  return (
    <Box sx={{ display: 'flex', gap: 0.5 }}>
      {items.map((item) => (
        <MotionBox
          key={item.letter}
          animate={isActive ? {
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          } : {}}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: item.delay,
          }}
          sx={{
            width: 24,
            height: 24,
            borderRadius: 1,
            bgcolor: item.color,
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: '0.7rem',
          }}
        >
          {item.letter}
        </MotionBox>
      ))}
    </Box>
  );
}

// Data flow animation between two points
export function DataFlow({ from, to }) {
  return (
    <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <MotionBox
        animate={{
          x: [from.x, to.x],
          y: [from.y, to.y],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
        }}
        sx={{
          position: 'absolute',
          width: 8,
          height: 8,
          borderRadius: '50%',
          bgcolor: 'primary.main',
          boxShadow: '0 0 12px rgba(75, 156, 211, 0.8)',
        }}
      />
    </Box>
  );
}

// Circular progress with AI effect
export function AIProgress({ progress = 0, size = 80 }) {
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <Box sx={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(75, 156, 211, 0.1)"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#gradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4B9CD3" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
      </svg>
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <MotionBox
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: size * 0.2,
              background: 'linear-gradient(135deg, #4B9CD3 0%, #8B5CF6 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {Math.round(progress)}%
          </Typography>
        </MotionBox>
      </Box>
    </Box>
  );
}

// Required import for Typography in AIProgress
import { Typography } from '@mui/material';
