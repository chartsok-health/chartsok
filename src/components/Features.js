'use client';

import { useState } from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Stack, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import SecurityIcon from '@mui/icons-material/Security';
import ScheduleIcon from '@mui/icons-material/Schedule';
import SyncIcon from '@mui/icons-material/Sync';
import DescriptionIcon from '@mui/icons-material/Description';
import MicIcon from '@mui/icons-material/Mic';
import EditNoteIcon from '@mui/icons-material/EditNote';
import CheckIcon from '@mui/icons-material/Check';
import { useI18n } from '@/lib/i18n';

const MotionBox = motion.create(Box);
const MotionCard = motion.create(Card);

const iconMap = {
  security: SecurityIcon,
  time: ScheduleIcon,
  integration: SyncIcon,
  template: DescriptionIcon,
  mic: MicIcon,
  edit: EditNoteIcon,
};

const colorMap = {
  security: '#EF4444',
  time: '#F59E0B',
  integration: '#06B6D4',
  template: '#8B5CF6',
  mic: '#10B981',
  edit: '#EC4899',
};

export default function Features() {
  const { t } = useI18n();
  const features = t('features.items');
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <Box
      id="features"
      sx={{
        py: { xs: 10, md: 14 },
        bgcolor: 'grey.50',
      }}
    >
      <Container maxWidth="xl">
        {/* Section Header */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}
        >
          <Typography
            variant="overline"
            sx={{
              color: 'primary.main',
              mb: 1.5,
              display: 'block',
              letterSpacing: 2,
              fontWeight: 600,
            }}
          >
            FEATURES
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', md: '2.75rem' },
              fontWeight: 700,
              color: 'secondary.main',
              mb: 2,
            }}
          >
            {t('features.title')}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              fontSize: { xs: '1rem', md: '1.125rem' },
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            {t('features.subtitle')}
          </Typography>
        </MotionBox>

        {/* Feature Cards - 3x2 Grid */}
        <Grid container spacing={3}>
          {features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon] || MicIcon;
            const color = colorMap[feature.icon] || '#4B9CD3';
            const isHovered = hoveredCard === index;

            return (
              <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={index}>
                <MotionCard
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  whileHover={{ y: -6 }}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  elevation={0}
                  sx={{
                    height: '100%',
                    bgcolor: 'white',
                    border: '2px solid',
                    borderColor: isHovered ? color : 'grey.100',
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    '&:hover': {
                      boxShadow: `0 16px 40px ${color}15`,
                    },
                  }}
                >
                  <CardContent sx={{ p: 3.5, height: '100%' }}>
                    <Stack spacing={2.5} sx={{ height: '100%' }}>
                      {/* Header: Icon + Step Badge */}
                      <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <MotionBox
                          animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                          sx={{
                            width: 56,
                            height: 56,
                            borderRadius: 2.5,
                            bgcolor: isHovered ? color : `${color}15`,
                            color: isHovered ? 'white' : color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.3s ease',
                          }}
                        >
                          <IconComponent sx={{ fontSize: 28 }} />
                        </MotionBox>
                        <Chip
                          label={`STEP ${String(index + 1).padStart(2, '0')}`}
                          size="small"
                          sx={{
                            bgcolor: `${color}10`,
                            color: color,
                            fontWeight: 700,
                            fontSize: '0.65rem',
                            height: 24,
                          }}
                        />
                      </Stack>

                      {/* Title */}
                      <Typography
                        variant="h5"
                        sx={{
                          fontSize: '1.2rem',
                          fontWeight: 700,
                          color: 'secondary.main',
                        }}
                      >
                        {feature.title}
                      </Typography>

                      {/* Description */}
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          lineHeight: 1.7,
                          flex: 1,
                        }}
                      >
                        {feature.description}
                      </Typography>

                      {/* Feature list */}
                      <Stack spacing={1}>
                        {feature.features?.slice(0, 4).map((item, i) => (
                          <Stack
                            key={i}
                            direction="row"
                            alignItems="center"
                            spacing={1}
                          >
                            <Box
                              sx={{
                                width: 16,
                                height: 16,
                                borderRadius: '50%',
                                bgcolor: `${color}15`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                              }}
                            >
                              <CheckIcon sx={{ fontSize: 10, color: color }} />
                            </Box>
                            <Typography
                              variant="body2"
                              sx={{
                                color: 'text.secondary',
                                fontSize: '0.8rem',
                              }}
                            >
                              {item}
                            </Typography>
                          </Stack>
                        ))}
                      </Stack>
                    </Stack>
                  </CardContent>
                </MotionCard>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
