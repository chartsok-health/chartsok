'use client';

import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const MotionBox = motion.create(Box);

// Brand colors
const UNC_BLUE = '#4B9CD3';
const ACCENT_GREEN = '#10B981';

// Pre-defined circle values
const CIRCLE_OPACITIES = [0.08, 0.1, 0.12, 0.14, 0.16, 0.18, 0.2, 0.22];
const CIRCLE_SIZES = [80, 120, 160, 200, 240, 280, 320, 360];

export default function LoadingAnimation() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#F8FAFC',
        gap: 5,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background floating circles - UNC Blue */}
      {CIRCLE_SIZES.map((size, i) => (
        <MotionBox
          key={i}
          sx={{
            position: 'absolute',
            width: size,
            height: size,
            borderRadius: '50%',
            border: '2px solid',
            borderColor: `rgba(75, 156, 211, ${CIRCLE_OPACITIES[i]})`,
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
            rotate: i % 2 === 0 ? [0, 180, 360] : [360, 180, 0],
          }}
          transition={{
            duration: 5 + i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.2,
          }}
        />
      ))}

      {/* Animated Logo with bouncing letters - UNC Blue & Green theme */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
        {['차', '트', '쏙'].map((char, index) => (
          <motion.div
            key={index}
            animate={{
              y: [-10, 10, -10],
              rotateZ: index === 2 ? [-8, 8, -8] : 0,
            }}
            transition={{
              y: { duration: 1, repeat: Infinity, delay: index * 0.2, ease: 'easeInOut' },
              rotateZ: { duration: 1, repeat: Infinity, delay: index * 0.2, ease: 'easeInOut' },
            }}
          >
            <Box
              sx={{
                px: 2,
                py: 1.25,
                borderRadius: 2.5,
                bgcolor: index === 2 ? '#10B981' : '#4B9CD3',
                boxShadow: index === 2
                  ? '0 10px 30px rgba(16, 185, 129, 0.5)'
                  : '0 10px 30px rgba(75, 156, 211, 0.35)',
                transform: index === 2 ? 'rotate(-3deg)' : 'none',
              }}
            >
              <Typography
                sx={{
                  color: 'white',
                  fontWeight: 900,
                  fontSize: '2.5rem',
                  textShadow: '0 2px 8px rgba(0,0,0,0.15)',
                }}
              >
                {char}
              </Typography>
            </Box>
          </motion.div>
        ))}
      </Box>

      {/* Heartbeat/ECG Line Animation - UNC Blue & Green */}
      <Box sx={{ width: 300, height: 60, position: 'relative' }}>
        <svg width="300" height="60" viewBox="0 0 300 60" style={{ overflow: 'visible' }}>
          <motion.path
            d="M0,30 L70,30 L90,10 L110,50 L130,18 L150,42 L170,30 L300,30"
            fill="none"
            stroke="url(#uncBlueGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{ pathLength: [0, 1, 0] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <defs>
            <linearGradient id="uncBlueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4B9CD3" />
              <stop offset="50%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#4B9CD3" />
            </linearGradient>
          </defs>
        </svg>
        {/* Pulsing dot - Green accent */}
        <motion.div
          style={{
            position: 'absolute',
            width: 14,
            height: 14,
            borderRadius: '50%',
            backgroundColor: '#10B981',
            top: '50%',
            transform: 'translateY(-50%)',
            boxShadow: '0 0 25px #10B981',
          }}
          animate={{
            left: ['0%', '100%', '0%'],
            scale: [1, 1.8, 1],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </Box>

      {/* Loading Text with Animated Dots */}
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h5" sx={{ fontWeight: 800, color: '#4B9CD3', mb: 1.5, letterSpacing: 1 }}>
          chartsok
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
          <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 500 }}>
            진료실 소독 완료! 집도 준비중
          </Typography>
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={{
                opacity: [0.2, 1, 0.2],
                y: [0, -5, 0],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              style={{ color: '#4B9CD3', fontWeight: 800, fontSize: '1rem' }}
            >
              •
            </motion.span>
          ))}
        </Box>
      </Box>

      {/* Floating sparkles - Alternating colors */}
      {[0, 1, 2, 3, 4].map((i) => (
        <MotionBox
          key={`sparkle-${i}`}
          sx={{
            position: 'absolute',
            width: 8,
            height: 8,
            borderRadius: '50%',
            bgcolor: i % 2 === 0 ? UNC_BLUE : ACCENT_GREEN,
          }}
          initial={{
            x: (i - 2) * 100,
            y: 150,
            opacity: 0,
          }}
          animate={{
            y: [-150, -300],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.6,
            ease: 'easeOut',
          }}
        />
      ))}
    </Box>
  );
}
