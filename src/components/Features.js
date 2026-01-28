'use client';

import { Box, Container, Typography, Grid, Card, CardContent, Button, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { motion } from 'framer-motion';
import MicIcon from '@mui/icons-material/Mic';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import PersonIcon from '@mui/icons-material/Person';
import SecurityIcon from '@mui/icons-material/Security';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useI18n } from '@/lib/i18n';

const MotionBox = motion.create(Box);
const MotionCard = motion.create(Card);

const iconMap = {
  mic: MicIcon,
  ai: AutoAwesomeIcon,
  patient: PersonIcon,
  security: SecurityIcon,
  integration: IntegrationInstructionsIcon,
  analytics: AnalyticsIcon,
};

const colorMap = {
  mic: '#4B9CD3',
  ai: '#8B5CF6',
  patient: '#10B981',
  security: '#F59E0B',
  integration: '#EC4899',
  analytics: '#06B6D4',
};

export default function Features() {
  const { t } = useI18n();
  const features = t('features.items');

  return (
    <Box
      id="features"
      sx={{
        py: { xs: 10, md: 14 },
        bgcolor: 'white',
      }}
    >
      <Container maxWidth="lg">
        {/* Section Header */}
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

        {/* Feature Cards */}
        <Grid container spacing={3}>
          {features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon] || MicIcon;
            const color = colorMap[feature.icon] || '#4B9CD3';

            return (
              <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={index}>
                <MotionCard
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  elevation={0}
                  sx={{
                    height: '100%',
                    bgcolor: 'grey.50',
                    border: '1px solid',
                    borderColor: 'grey.100',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    '&:hover': {
                      borderColor: color,
                      boxShadow: `0 12px 32px ${color}20`,
                    },
                  }}
                >
                  <CardContent sx={{ p: 3.5 }}>
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: 2.5,
                        bgcolor: `${color}15`,
                        color: color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 2.5,
                      }}
                    >
                      <IconComponent sx={{ fontSize: 28 }} />
                    </Box>

                    <Typography
                      variant="h4"
                      sx={{
                        fontSize: '1.25rem',
                        fontWeight: 600,
                        color: 'secondary.main',
                        mb: 1.5,
                      }}
                    >
                      {feature.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        lineHeight: 1.7,
                        mb: 2.5,
                      }}
                    >
                      {feature.description}
                    </Typography>

                    {/* Feature list */}
                    <List dense disablePadding>
                      {feature.features?.slice(0, 4).map((item, i) => (
                        <ListItem key={i} disableGutters sx={{ py: 0.3 }}>
                          <ListItemIcon sx={{ minWidth: 24 }}>
                            <CheckCircleIcon sx={{ fontSize: 16, color: color }} />
                          </ListItemIcon>
                          <ListItemText
                            primary={item}
                            primaryTypographyProps={{
                              variant: 'body2',
                              sx: { color: 'text.secondary', fontSize: '0.8rem' },
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </MotionCard>
              </Grid>
            );
          })}
        </Grid>

        {/* CTA Button */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          sx={{ textAlign: 'center', mt: 6 }}
        >
          <Button
            variant="outlined"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{
              px: 4,
              py: 1.5,
              borderWidth: 2,
              '&:hover': {
                borderWidth: 2,
              },
            }}
          >
            {t('features.cta')}
          </Button>
        </MotionBox>
      </Container>
    </Box>
  );
}
