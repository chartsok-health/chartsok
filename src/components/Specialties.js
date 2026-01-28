'use client';

import { useState } from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Chip, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import HearingIcon from '@mui/icons-material/Hearing';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import PsychologyIcon from '@mui/icons-material/Psychology';
import CheckIcon from '@mui/icons-material/Check';
import { useI18n } from '@/lib/i18n';

const MotionBox = motion.create(Box);
const MotionCard = motion.create(Card);

const specialtyIcons = {
  internal: LocalHospitalIcon,
  ent: HearingIcon,
  orthopedics: AccessibilityNewIcon,
  dermatology: FaceRetouchingNaturalIcon,
  pediatrics: ChildCareIcon,
  psychiatry: PsychologyIcon,
};

const specialtyColors = {
  internal: '#4B9CD3',
  ent: '#10B981',
  orthopedics: '#F59E0B',
  dermatology: '#EC4899',
  pediatrics: '#8B5CF6',
  psychiatry: '#6366F1',
};

export default function Specialties() {
  const { t } = useI18n();
  const [hoveredCard, setHoveredCard] = useState(null);
  const specialties = t('specialties.items');

  return (
    <Box
      id="specialties"
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
            SPECIALTY AI
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
            {t('specialties.title')}
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
            {t('specialties.subtitle')}
          </Typography>
        </MotionBox>

        {/* Specialty Cards */}
        <Grid container spacing={3}>
          {specialties.map((specialty, index) => {
            const IconComponent = specialtyIcons[specialty.id];
            const color = specialtyColors[specialty.id];
            const isHovered = hoveredCard === specialty.id;

            return (
              <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={specialty.id}>
                <MotionCard
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  onMouseEnter={() => setHoveredCard(specialty.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  elevation={0}
                  sx={{
                    height: '100%',
                    bgcolor: 'white',
                    border: '2px solid',
                    borderColor: isHovered ? color : 'grey.100',
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    overflow: 'visible',
                    position: 'relative',
                    opacity: specialty.available ? 1 : 0.7,
                    '&:hover': {
                      boxShadow: `0 16px 40px ${color}20`,
                    },
                  }}
                >
                  {/* Coming Soon Badge */}
                  {!specialty.available && (
                    <Chip
                      label={t('specialties.comingSoon')}
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        bgcolor: 'grey.200',
                        color: 'text.secondary',
                        fontWeight: 600,
                        fontSize: '0.7rem',
                      }}
                    />
                  )}

                  <CardContent sx={{ p: 3.5 }}>
                    {/* Icon */}
                    <MotionBox
                      animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      sx={{
                        width: 64,
                        height: 64,
                        borderRadius: 2.5,
                        bgcolor: `${color}15`,
                        color: color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 2.5,
                      }}
                    >
                      <IconComponent sx={{ fontSize: 32 }} />
                    </MotionBox>

                    {/* Title */}
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
                      <Typography
                        variant="h5"
                        sx={{
                          fontSize: '1.25rem',
                          fontWeight: 700,
                          color: 'secondary.main',
                        }}
                      >
                        {specialty.name}
                      </Typography>
                      {specialty.available && (
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            bgcolor: '#10B981',
                          }}
                        />
                      )}
                    </Stack>

                    <Typography
                      variant="caption"
                      sx={{
                        color: color,
                        fontWeight: 600,
                        display: 'block',
                        mb: 1.5,
                      }}
                    >
                      {specialty.nameEn}
                    </Typography>

                    {/* Description */}
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        lineHeight: 1.7,
                        mb: 2.5,
                        minHeight: 60,
                      }}
                    >
                      {specialty.description}
                    </Typography>

                    {/* Features */}
                    <Stack spacing={1}>
                      {specialty.features.map((feature, i) => (
                        <Stack
                          key={i}
                          direction="row"
                          alignItems="center"
                          spacing={1}
                        >
                          <CheckIcon
                            sx={{
                              fontSize: 16,
                              color: specialty.available ? color : 'grey.400',
                            }}
                          />
                          <Typography
                            variant="body2"
                            sx={{
                              color: specialty.available ? 'text.secondary' : 'text.disabled',
                              fontSize: '0.85rem',
                            }}
                          >
                            {feature}
                          </Typography>
                        </Stack>
                      ))}
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
