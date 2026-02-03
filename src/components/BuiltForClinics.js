'use client';

import { Box, Container, Typography, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import GroupsIcon from '@mui/icons-material/Groups';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { useI18n } from '@/lib/i18n';

const MotionBox = motion.create(Box);

const icons = [AccessTimeIcon, TrackChangesIcon, SyncAltIcon, GroupsIcon, ThumbUpAltIcon];
const colors = ['#4B9CD3', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'];

export default function BuiltForClinics() {
  const { t } = useI18n();
  const items = t('builtForClinics.items') || [];

  return (
    <Box
      id="built-for-clinics"
      sx={{
        py: { xs: 10, md: 14 },
        bgcolor: 'white',
      }}
    >
      <Container maxWidth="lg">
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              color: '#0F172A',
              fontSize: { xs: '1.75rem', md: '2.25rem' },
            }}
          >
            {t('builtForClinics.title')}
          </Typography>
        </MotionBox>

        <Grid container spacing={3} justifyContent="center">
          {Array.isArray(items) && items.map((item, index) => {
            const Icon = icons[index] || AccessTimeIcon;
            const color = colors[index] || '#4B9CD3';

            return (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 3,
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'grey.200',
                    bgcolor: 'white',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      borderColor: color,
                      boxShadow: `0 4px 16px ${color}15`,
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: 2,
                      bgcolor: `${color}12`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon sx={{ color, fontSize: 22 }} />
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 600,
                      color: '#0F172A',
                      fontSize: '0.95rem',
                    }}
                  >
                    {item}
                  </Typography>
                </MotionBox>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
