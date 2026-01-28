'use client';

import { Box, Container, Typography, Grid, Card, CardContent, Avatar, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { useI18n } from '@/lib/i18n';

const MotionBox = motion.create(Box);
const MotionCard = motion.create(Card);

export default function Testimonials() {
  const { t } = useI18n();
  const testimonials = t('testimonials.items');

  const avatarColors = ['#4B9CD3', '#10B981', '#8B5CF6'];

  return (
    <Box
      sx={{
        py: { xs: 10, md: 14 },
        bgcolor: 'grey.50',
      }}
    >
      <Container maxWidth="lg">
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}
        >
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
          {testimonials.map((testimonial, index) => (
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
                  border: '1px solid',
                  borderColor: 'grey.200',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 16px 40px rgba(0, 0, 0, 0.08)',
                  },
                }}
              >
                <CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', height: '100%' }}>
                  {/* Quote icon */}
                  <FormatQuoteIcon
                    sx={{
                      fontSize: 40,
                      color: 'primary.main',
                      opacity: 0.3,
                      mb: 2,
                      transform: 'rotate(180deg)',
                    }}
                  />

                  {/* Quote */}
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'text.primary',
                      lineHeight: 1.8,
                      mb: 3,
                      flex: 1,
                      fontSize: '0.95rem',
                    }}
                  >
                    "{testimonial.quote}"
                  </Typography>

                  {/* Stat chip */}
                  <Chip
                    label={testimonial.stat}
                    size="small"
                    sx={{
                      mb: 3,
                      bgcolor: `${avatarColors[index]}15`,
                      color: avatarColors[index],
                      fontWeight: 600,
                      alignSelf: 'flex-start',
                    }}
                  />

                  {/* Author info */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar
                      sx={{
                        width: 48,
                        height: 48,
                        bgcolor: avatarColors[index],
                        fontWeight: 600,
                      }}
                    >
                      {testimonial.author.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: 600, color: 'secondary.main' }}
                      >
                        {testimonial.author}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>
                        {testimonial.role} · {testimonial.hospital}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </MotionCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
