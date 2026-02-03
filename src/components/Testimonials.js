'use client';

import { Box, Container, Typography, Grid, Card, CardContent, Chip, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useI18n } from '@/lib/i18n';

const MotionBox = motion.create(Box);
const MotionCard = motion.create(Card);

const cardColors = ['#4B9CD3', '#10B981', '#8B5CF6'];
const cardIcons = [AccessTimeIcon, EventRepeatIcon, ChatBubbleOutlineIcon];

export default function Testimonials() {
  const { t } = useI18n();
  const testimonials = t('testimonials.items');

  return (
    <Box
      sx={{
        py: { xs: 10, md: 14 },
        bgcolor: 'grey.50',
      }}
    >
      <Container maxWidth="xl">
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
            USE CASES
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
            {t('testimonials.title')}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              fontSize: { xs: '1rem', md: '1.125rem' },
            }}
          >
            {t('testimonials.subtitle')}
          </Typography>
        </MotionBox>

        <Grid container spacing={3}>
          {testimonials.map((testimonial, index) => {
            const color = cardColors[index % cardColors.length];
            const IconComponent = cardIcons[index % cardIcons.length];
            return (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
                <MotionCard
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  whileHover={{ y: -8 }}
                  elevation={0}
                  sx={{
                    height: '100%',
                    bgcolor: 'white',
                    border: '2px solid',
                    borderColor: 'grey.100',
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: color,
                      boxShadow: `0 16px 40px ${color}15`,
                    },
                  }}
                >
                  <CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', height: '100%' }}>
                    {/* Use case icon + title */}
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2.5,
                        bgcolor: `${color}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 2.5,
                      }}
                    >
                      <IconComponent sx={{ fontSize: 24, color: color }} />
                    </Box>

                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: 'secondary.main',
                        mb: 1.5,
                        fontSize: '1.1rem',
                      }}
                    >
                      {testimonial.author}
                    </Typography>

                    {/* Description */}
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        lineHeight: 1.8,
                        mb: 3,
                        flex: 1,
                        fontSize: '0.9rem',
                      }}
                    >
                      {testimonial.quote}
                    </Typography>

                    {/* Stat chip */}
                    {testimonial.stat && (
                      <Chip
                        label={testimonial.stat}
                        size="small"
                        sx={{
                          mb: 2,
                          bgcolor: `${color}15`,
                          color: color,
                          fontWeight: 700,
                          alignSelf: 'flex-start',
                        }}
                      />
                    )}

                    {/* Specialties */}
                    <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.8rem' }}>
                      {testimonial.role}
                    </Typography>
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
