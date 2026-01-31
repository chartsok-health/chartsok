'use client';

import { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Paper, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import MicIcon from '@mui/icons-material/Mic';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PersonIcon from '@mui/icons-material/Person';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SyncIcon from '@mui/icons-material/Sync';
import { useI18n } from '@/lib/i18n';

const MotionBox = motion.create(Box);
const MotionPaper = motion.create(Paper);

const stepIcons = {
  patient: PersonIcon,
  vitals: MonitorHeartIcon,
  mic: MicIcon,
  chart: AutoAwesomeIcon,
  clipboard: SyncIcon,
};

const stepColors = ['#4B9CD3', '#10B981', '#EF4444', '#9333EA', '#06B6D4'];

export default function HowItWorks() {
  const { t } = useI18n();
  const steps = t('howItWorks.steps');
  const [hoveredStep, setHoveredStep] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Box
      id="how-it-works"
      sx={{
        py: { xs: 10, md: 14 },
        bgcolor: 'white',
      }}
    >
      <Container maxWidth="xl">
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
            sx={{ color: 'primary.main', mb: 1.5, display: 'block', letterSpacing: 2, fontWeight: 600 }}
          >
            WORKFLOW
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
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            {t('howItWorks.subtitle')}
          </Typography>
        </MotionBox>

        {/* Desktop: Horizontal Timeline Layout */}
        <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
          {/* Timeline Container */}
          <Box sx={{ position: 'relative', pb: 4 }}>
            {/* Animated Connection Line */}
            <Box
              sx={{
                position: 'absolute',
                top: 44,
                left: '10%',
                right: '10%',
                height: 4,
                bgcolor: 'grey.100',
                borderRadius: 2,
                zIndex: 0,
              }}
            >
              <MotionBox
                initial={{ width: '0%' }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
                sx={{
                  height: '100%',
                  background: `linear-gradient(90deg, ${stepColors.join(', ')})`,
                  borderRadius: 2,
                }}
              />
            </Box>

            {/* Step Items */}
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
              sx={{ position: 'relative', zIndex: 1 }}
            >
              {steps.map((step, index) => {
                const Icon = stepIcons[step.icon];
                const color = stepColors[index % stepColors.length];
                const isHovered = hoveredStep === index;

                return (
                  <MotionBox
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    onMouseEnter={() => setHoveredStep(index)}
                    onMouseLeave={() => setHoveredStep(null)}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      width: '18%',
                      cursor: 'pointer',
                    }}
                  >
                    {/* Icon Circle with Pulse Animation */}
                    <MotionBox
                      animate={isHovered ? {
                        scale: 1.15,
                        y: -8,
                        boxShadow: `0 20px 40px ${color}50`
                      } : {
                        scale: 1,
                        y: 0,
                        boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
                      }}
                      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                      sx={{
                        width: 88,
                        height: 88,
                        borderRadius: '50%',
                        bgcolor: isHovered ? color : 'white',
                        border: '4px solid',
                        borderColor: color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'background-color 0.3s ease',
                        mb: 2.5,
                        position: 'relative',
                      }}
                    >
                      {/* Animated ring on hover - only render after mount */}
                      {isMounted && isHovered && (
                        <MotionBox
                          initial={{ scale: 1, opacity: 0.5 }}
                          animate={{ scale: 1.3, opacity: 0 }}
                          transition={{ duration: 1, repeat: Infinity }}
                          sx={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            border: '3px solid',
                            borderColor: color,
                          }}
                        />
                      )}
                      <Icon
                        sx={{
                          fontSize: 40,
                          color: isHovered ? 'white' : color,
                          transition: 'color 0.3s ease',
                        }}
                      />
                    </MotionBox>

                    {/* Step Badge */}
                    <MotionBox
                      animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
                      sx={{
                        bgcolor: color,
                        color: 'white',
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 2,
                        mb: 1.5,
                      }}
                    >
                      <Typography variant="caption" sx={{ fontWeight: 700, fontSize: '0.7rem' }}>
                        STEP {step.step}
                      </Typography>
                    </MotionBox>

                    {/* Title */}
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: isHovered ? color : 'secondary.main',
                        textAlign: 'center',
                        mb: 1,
                        fontSize: '1.05rem',
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {step.title}
                    </Typography>

                    {/* Description */}
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        textAlign: 'center',
                        fontSize: '0.85rem',
                        lineHeight: 1.6,
                        mb: 1.5,
                        minHeight: 48,
                      }}
                    >
                      {step.description}
                    </Typography>

                    {/* Detail - Animated reveal on hover */}
                    <MotionBox
                      initial={{ opacity: 0.7, y: 0 }}
                      animate={{
                        opacity: isHovered ? 1 : 0.7,
                        y: isHovered ? -4 : 0,
                        scale: isHovered ? 1.02 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                      sx={{
                        bgcolor: isHovered ? `${color}15` : 'grey.50',
                        border: '1px solid',
                        borderColor: isHovered ? `${color}30` : 'grey.200',
                        p: 1.5,
                        borderRadius: 2,
                        transition: 'all 0.3s ease',
                        width: '100%',
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          color: isHovered ? color : 'text.secondary',
                          textAlign: 'center',
                          fontSize: '0.75rem',
                          lineHeight: 1.5,
                          display: 'block',
                          fontWeight: isHovered ? 600 : 400,
                          transition: 'all 0.3s ease',
                        }}
                      >
                        {step.detail}
                      </Typography>
                    </MotionBox>
                  </MotionBox>
                );
              })}
            </Stack>
          </Box>
        </Box>

        {/* Tablet: 3x2 Grid Layout */}
        <Box sx={{ display: { xs: 'none', md: 'block', lg: 'none' } }}>
          <Grid container spacing={3}>
            {steps.map((step, index) => {
              const Icon = stepIcons[step.icon];
              const color = stepColors[index % stepColors.length];
              const isHovered = hoveredStep === index;

              return (
                <Grid size={{ md: 4 }} key={index}>
                  <MotionPaper
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -6 }}
                    onMouseEnter={() => setHoveredStep(index)}
                    onMouseLeave={() => setHoveredStep(null)}
                    elevation={0}
                    sx={{
                      p: 3,
                      height: '100%',
                      bgcolor: isHovered ? `${color}08` : 'grey.50',
                      border: '2px solid',
                      borderColor: isHovered ? color : 'transparent',
                      borderRadius: 3,
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <Stack direction="row" spacing={2} alignItems="flex-start">
                      <Box
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: '50%',
                          bgcolor: color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <Icon sx={{ fontSize: 28, color: 'white' }} />
                      </Box>
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{ color: color, fontWeight: 700, fontSize: '0.7rem' }}
                        >
                          STEP {step.step}
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: 700, color: 'secondary.main', mb: 0.5, fontSize: '1rem' }}
                        >
                          {step.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.85rem', mb: 1 }}>
                          {step.description}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: 'text.secondary',
                            fontSize: '0.75rem',
                            lineHeight: 1.5,
                            display: 'block',
                            bgcolor: `${color}10`,
                            p: 1,
                            borderRadius: 1,
                          }}
                        >
                          {step.detail}
                        </Typography>
                      </Box>
                    </Stack>
                  </MotionPaper>
                </Grid>
              );
            })}
          </Grid>
        </Box>

        {/* Mobile: Vertical Cards */}
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <Stack spacing={2}>
            {steps.map((step, index) => {
              const Icon = stepIcons[step.icon];
              const color = stepColors[index % stepColors.length];
              const isLast = index === steps.length - 1;

              return (
                <MotionBox
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2.5,
                      bgcolor: 'grey.50',
                      borderRadius: 2.5,
                      border: '1px solid',
                      borderColor: 'grey.100',
                    }}
                  >
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: '50%',
                          bgcolor: color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <Icon sx={{ fontSize: 24, color: 'white' }} />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Typography
                            variant="caption"
                            sx={{
                              color: color,
                              fontWeight: 700,
                              fontSize: '0.65rem',
                              bgcolor: `${color}15`,
                              px: 1,
                              py: 0.25,
                              borderRadius: 1,
                            }}
                          >
                            {step.step}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: 700, color: 'secondary.main', fontSize: '0.95rem' }}
                          >
                            {step.title}
                          </Typography>
                        </Stack>
                        <Typography
                          variant="body2"
                          sx={{ color: 'text.secondary', fontSize: '0.8rem', mt: 0.5, mb: 1 }}
                        >
                          {step.description}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: 'text.secondary',
                            fontSize: '0.7rem',
                            lineHeight: 1.5,
                            display: 'block',
                            bgcolor: `${color}10`,
                            p: 1,
                            borderRadius: 1,
                          }}
                        >
                          {step.detail}
                        </Typography>
                      </Box>
                    </Stack>
                  </Paper>

                  {/* Arrow between steps */}
                  {!isLast && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 1 }}>
                      <ArrowForwardIcon
                        sx={{
                          color: 'grey.300',
                          transform: 'rotate(90deg)',
                          fontSize: 20,
                        }}
                      />
                    </Box>
                  )}
                </MotionBox>
              );
            })}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
