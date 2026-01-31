'use client';

import { Box, Container, Typography, Grid, Card, CardContent, List, ListItem, ListItemIcon, ListItemText, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useI18n } from '@/lib/i18n';

const MotionBox = motion.create(Box);
const MotionCard = motion.create(Card);

const roleIcons = {
  doctor: LocalHospitalIcon,
  patient: PersonIcon,
  companion: GroupIcon,
};

const roleColors = {
  doctor: '#4B9CD3',
  patient: '#10B981',
  companion: '#8B5CF6',
};

export default function UserRoles() {
  const { t } = useI18n();
  const roles = ['doctor', 'patient', 'companion'];

  return (
    <Box
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
            {t('roles.title')}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              fontSize: { xs: '1rem', md: '1.125rem' },
            }}
          >
            {t('roles.subtitle')}
          </Typography>
        </MotionBox>

        {/* Role Cards */}
        <Grid container spacing={3}>
          {roles.map((role, index) => {
            const roleData = t(`roles.${role}`) || {};
            const IconComponent = roleIcons[role];
            const color = roleColors[role];
            const features = roleData.features || [];

            // Skip rendering if roleData is not properly loaded
            if (!roleData.title) return null;

            return (
              <Grid size={{ xs: 12, md: 4 }} key={role}>
                <MotionCard
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  whileHover={{ y: -8 }}
                  elevation={0}
                  sx={{
                    height: '100%',
                    border: '2px solid',
                    borderColor: 'grey.100',
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    overflow: 'visible',
                    position: 'relative',
                    '&:hover': {
                      borderColor: color,
                      boxShadow: `0 16px 40px ${color}20`,
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    {/* Icon */}
                    <MotionBox
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: 3,
                        bgcolor: `${color}15`,
                        color: color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 3,
                      }}
                    >
                      <IconComponent sx={{ fontSize: 40 }} />
                    </MotionBox>

                    {/* Title & Tagline */}
                    <Typography
                      variant="h4"
                      sx={{
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        color: 'secondary.main',
                        mb: 0.5,
                      }}
                    >
                      {roleData.title}
                    </Typography>
                    {roleData.tagline && (
                      <Chip
                        label={roleData.tagline}
                        size="small"
                        sx={{
                          bgcolor: `${color}15`,
                          color: color,
                          fontWeight: 500,
                          mb: 2,
                        }}
                      />
                    )}

                    {/* Description */}
                    <Typography
                      variant="body1"
                      sx={{
                        color: 'text.secondary',
                        lineHeight: 1.8,
                        mb: 3,
                      }}
                    >
                      {roleData.description}
                    </Typography>

                    {/* Features List */}
                    {features.length > 0 && (
                      <List disablePadding>
                        {features.map((feature, i) => (
                          <ListItem key={i} disableGutters sx={{ py: 0.5 }}>
                            <ListItemIcon sx={{ minWidth: 28 }}>
                              <CheckCircleIcon
                                sx={{
                                  fontSize: 18,
                                  color: color,
                                }}
                              />
                            </ListItemIcon>
                            <ListItemText
                              primary={feature}
                              primaryTypographyProps={{
                                variant: 'body2',
                                sx: { color: 'text.secondary' },
                              }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    )}
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
