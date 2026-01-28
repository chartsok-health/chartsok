'use client';

import { useState } from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import MicIcon from '@mui/icons-material/Mic';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useI18n } from '@/lib/i18n';

const MotionBox = motion.create(Box);
const MotionPaper = motion.create(Paper);

const stepData = [
  {
    icon: MicIcon,
    color: '#4B9CD3',
    lightColor: '#E0F2FE',
  },
  {
    icon: AutoAwesomeIcon,
    color: '#8B5CF6',
    lightColor: '#EDE9FE',
  },
  {
    icon: TaskAltIcon,
    color: '#10B981',
    lightColor: '#D1FAE5',
  },
];

export default function HowItWorks() {
  const { t } = useI18n();
  const steps = t('howItWorks.steps');
  const [hoveredStep, setHoveredStep] = useState(null);

  return (
    <Box
      id="how-it-works"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: 'white',
      }}
    >
      <Container maxWidth="lg">
        {/* Section Header */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}
        >
          <Typography
            variant="overline"
            sx={{ color: 'primary.main', mb: 1.5, display: 'block', letterSpacing: 2 }}
          >
            HOW IT WORKS
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              color: 'secondary.main',
              mb: 2,
              fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
            }}
          >
            {t('howItWorks.title')}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              maxWidth: 500,
              mx: 'auto',
            }}
          >
            {t('howItWorks.subtitle')}
          </Typography>
        </MotionBox>

        {/* Steps */}
        <Box sx={{ position: 'relative' }}>
          {/* Connection Line - Desktop */}
          <Box
            sx={{
              display: { xs: 'none', md: 'block' },
              position: 'absolute',
              top: 70,
              left: '25%',
              right: '25%',
              height: 2,
              bgcolor: 'grey.200',
              zIndex: 0,
            }}
          >
            {/* Animated progress */}
            <MotionBox
              initial={{ width: '0%' }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3 }}
              sx={{
                height: '100%',
                background: 'linear-gradient(90deg, #4B9CD3, #8B5CF6, #10B981)',
                borderRadius: 1,
              }}
            />
          </Box>

          <Grid container spacing={{ xs: 3, md: 4 }}>
            {steps.map((step, index) => {
              const { icon: Icon, color, lightColor } = stepData[index];
              const isHovered = hoveredStep === index;

              return (
                <Grid size={{ xs: 12, md: 4 }} key={index}>
                  <MotionBox
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    onMouseEnter={() => setHoveredStep(index)}
                    onMouseLeave={() => setHoveredStep(null)}
                    sx={{ height: '100%' }}
                  >
                    <MotionPaper
                      whileHover={{ y: -6 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      elevation={0}
                      sx={{
                        p: { xs: 3, md: 4 },
                        height: '100%',
                        bgcolor: isHovered ? lightColor : 'grey.50',
                        border: '1px solid',
                        borderColor: isHovered ? color : 'transparent',
                        borderRadius: 3,
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      {/* Step Number Badge */}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 16,
                          right: 16,
                          width: 28,
                          height: 28,
                          borderRadius: '50%',
                          bgcolor: 'white',
                          border: '2px solid',
                          borderColor: color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '0.75rem',
                          color: color,
                        }}
                      >
                        {step.step}
                      </Box>

                      {/* Icon */}
                      <MotionBox
                        animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        sx={{
                          width: 72,
                          height: 72,
                          borderRadius: '50%',
                          bgcolor: color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mx: 'auto',
                          mb: 3,
                          boxShadow: isHovered ? `0 8px 24px ${color}40` : 'none',
                          transition: 'box-shadow 0.3s ease',
                        }}
                      >
                        <Icon sx={{ fontSize: 32, color: 'white' }} />
                      </MotionBox>

                      {/* Content */}
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 700,
                          color: 'secondary.main',
                          mb: 1.5,
                        }}
                      >
                        {step.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          mb: 2,
                          lineHeight: 1.7,
                        }}
                      >
                        {step.description}
                      </Typography>

                      <Typography
                        variant="caption"
                        sx={{
                          color: 'text.secondary',
                          opacity: 0.8,
                          fontStyle: 'italic',
                          display: 'block',
                        }}
                      >
                        {step.detail}
                      </Typography>

                      {/* Arrow for mobile */}
                      {index < steps.length - 1 && (
                        <Box
                          sx={{
                            display: { xs: 'flex', md: 'none' },
                            justifyContent: 'center',
                            mt: 2,
                          }}
                        >
                          <ArrowForwardIcon
                            sx={{
                              color: 'grey.400',
                              transform: 'rotate(90deg)',
                            }}
                          />
                        </Box>
                      )}
                    </MotionPaper>
                  </MotionBox>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
