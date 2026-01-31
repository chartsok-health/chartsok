'use client';

import { useState } from 'react';
import { Box, Container, Typography, Grid, Paper, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import MicIcon from '@mui/icons-material/Mic';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useI18n } from '@/lib/i18n';

const MotionBox = motion.create(Box);
const MotionPaper = motion.create(Paper);

const stepIcons = {
  mic: MicIcon,
  edit: EditNoteIcon,
  clipboard: ContentPasteIcon,
};

const stepColors = ['#4B9CD3', '#10B981', '#F59E0B'];

export default function HowItWorks() {
  const { t } = useI18n();
  const steps = t('howItWorks.steps');
  const [hoveredStep, setHoveredStep] = useState(null);

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

        {/* Desktop: Horizontal Flow */}
        <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
          {/* Connection Line */}
          <Box sx={{ position: 'relative', mb: 4 }}>
            <Box
              sx={{
                position: 'absolute',
                top: 40,
                left: '15%',
                right: '15%',
                height: 3,
                bgcolor: 'grey.100',
                borderRadius: 2,
                zIndex: 0,
              }}
            >
              <MotionBox
                initial={{ width: '0%' }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.3 }}
                sx={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #4B9CD3, #10B981, #F59E0B)',
                  borderRadius: 2,
                }}
              />
            </Box>

            {/* Step Icons Row */}
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
              sx={{ position: 'relative', zIndex: 1 }}
            >
              {steps.map((step, index) => {
                const Icon = stepIcons[step.icon];
                const color = stepColors[index];
                const isHovered = hoveredStep === index;

                return (
                  <MotionBox
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onMouseEnter={() => setHoveredStep(index)}
                    onMouseLeave={() => setHoveredStep(null)}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      width: '30%',
                      cursor: 'pointer',
                    }}
                  >
                    {/* Icon Circle */}
                    <MotionBox
                      animate={isHovered ? { scale: 1.15, y: -4 } : { scale: 1, y: 0 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        bgcolor: isHovered ? color : 'white',
                        border: '3px solid',
                        borderColor: color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: isHovered ? `0 12px 30px ${color}40` : '0 4px 12px rgba(0,0,0,0.08)',
                        transition: 'all 0.3s ease',
                        mb: 2,
                      }}
                    >
                      <Icon
                        sx={{
                          fontSize: 36,
                          color: isHovered ? 'white' : color,
                          transition: 'color 0.3s ease',
                        }}
                      />
                    </MotionBox>

                    {/* Step Number */}
                    <Typography
                      variant="caption"
                      sx={{
                        color: color,
                        fontWeight: 700,
                        fontSize: '0.7rem',
                        mb: 0.5,
                      }}
                    >
                      STEP {step.step}
                    </Typography>

                    {/* Title */}
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: 'secondary.main',
                        textAlign: 'center',
                        mb: 1,
                        fontSize: '1rem',
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
                        fontSize: '0.8rem',
                        lineHeight: 1.6,
                        opacity: isHovered ? 1 : 0.8,
                        transition: 'opacity 0.3s ease',
                      }}
                    >
                      {step.description}
                    </Typography>
                  </MotionBox>
                );
              })}
            </Stack>
          </Box>
        </Box>

        {/* Tablet: 2+3 Grid Layout */}
        <Box sx={{ display: { xs: 'none', md: 'block', lg: 'none' } }}>
          <Grid container spacing={3}>
            {steps.map((step, index) => {
              const Icon = stepIcons[step.icon];
              const color = stepColors[index];
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
                        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>
                          {step.description}
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
              const color = stepColors[index];
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
                          sx={{ color: 'text.secondary', fontSize: '0.8rem', mt: 0.5 }}
                        >
                          {step.description}
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
