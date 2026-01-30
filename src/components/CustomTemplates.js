'use client';

import { useState } from 'react';
import { Box, Container, Typography, Grid, Paper, Button, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import StarIcon from '@mui/icons-material/Star';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useI18n } from '@/lib/i18n';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';

const MotionBox = motion.create(Box);
const MotionPaper = motion.create(Paper);

const iconMap = {
  layout: ViewQuiltIcon,
  ai: AutoAwesomeIcon,
  star: StarIcon,
  copy: ContentCopyIcon,
};

export default function CustomTemplates() {
  const { t, locale } = useI18n();
  const { user } = useAuth();
  const router = useRouter();
  const content = t('customTemplates');
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const handleCtaClick = () => {
    if (user) {
      router.push('/dashboard/templates');
    } else {
      router.push('/?auth=signup');
    }
  };

  // Sample template preview
  const soapTemplate = locale === 'ko' ? [
    { label: 'S', title: 'Subjective', content: '주관적 증상' },
    { label: 'O', title: 'Objective', content: '객관적 소견' },
    { label: 'A', title: 'Assessment', content: '평가/진단' },
    { label: 'P', title: 'Plan', content: '치료 계획' },
  ] : [
    { label: 'S', title: 'Subjective', content: 'Patient symptoms' },
    { label: 'O', title: 'Objective', content: 'Clinical findings' },
    { label: 'A', title: 'Assessment', content: 'Diagnosis' },
    { label: 'P', title: 'Plan', content: 'Treatment plan' },
  ];

  const customTemplate = locale === 'ko' ? [
    { label: 'CC', title: '주호소', color: '#4B9CD3' },
    { label: 'HPI', title: '현병력', color: '#10B981' },
    { label: 'PMH', title: '과거력', color: '#F59E0B' },
    { label: 'PE', title: '신체검진', color: '#8B5CF6' },
    { label: 'Dx', title: '진단', color: '#EC4899' },
    { label: 'Tx', title: '치료계획', color: '#06B6D4' },
  ] : [
    { label: 'CC', title: 'Chief Complaint', color: '#4B9CD3' },
    { label: 'HPI', title: 'History of Present Illness', color: '#10B981' },
    { label: 'PMH', title: 'Past Medical History', color: '#F59E0B' },
    { label: 'PE', title: 'Physical Exam', color: '#8B5CF6' },
    { label: 'Dx', title: 'Diagnosis', color: '#EC4899' },
    { label: 'Tx', title: 'Treatment Plan', color: '#06B6D4' },
  ];

  return (
    <Box
      id="custom-templates"
      sx={{
        py: { xs: 10, md: 14 },
        bgcolor: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decoration */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          right: '-5%',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.05) 0%, rgba(124, 58, 237, 0.02) 100%)',
          filter: 'blur(60px)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          left: '-5%',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(75, 156, 211, 0.05) 0%, rgba(75, 156, 211, 0.02) 100%)',
          filter: 'blur(60px)',
        }}
      />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={{ xs: 4, md: 8 }} alignItems="center">
          {/* Left: Content */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <MotionBox
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Badge */}
              <Chip
                icon={<DashboardCustomizeIcon sx={{ fontSize: 16 }} />}
                label={content.badge}
                sx={{
                  mb: 3,
                  bgcolor: 'rgba(124, 58, 237, 0.1)',
                  color: '#7C3AED',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  '& .MuiChip-icon': { color: '#7C3AED' },
                }}
              />

              {/* Title */}
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '2rem', md: '2.75rem' },
                  fontWeight: 700,
                  color: 'secondary.main',
                  mb: 2,
                  lineHeight: 1.2,
                }}
              >
                {content.title}
              </Typography>

              {/* Subtitle */}
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  fontSize: { xs: '1rem', md: '1.125rem' },
                  mb: 4,
                  lineHeight: 1.8,
                }}
              >
                {content.description}
              </Typography>

              {/* Features Grid */}
              <Grid container spacing={2} sx={{ mb: 4 }}>
                {content.features?.map((feature, index) => {
                  const IconComponent = iconMap[feature.icon] || DashboardCustomizeIcon;
                  const isHovered = hoveredFeature === index;

                  return (
                    <Grid size={{ xs: 12, sm: 6 }} key={index}>
                      <MotionPaper
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        whileHover={{ y: -4, boxShadow: '0 12px 24px rgba(124, 58, 237, 0.12)' }}
                        onMouseEnter={() => setHoveredFeature(index)}
                        onMouseLeave={() => setHoveredFeature(null)}
                        elevation={0}
                        sx={{
                          p: 2.5,
                          borderRadius: 2.5,
                          border: '1px solid',
                          borderColor: isHovered ? '#7C3AED' : 'grey.100',
                          bgcolor: isHovered ? 'rgba(124, 58, 237, 0.02)' : 'white',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          height: '100%',
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                          <Box
                            sx={{
                              width: 40,
                              height: 40,
                              borderRadius: 2,
                              bgcolor: isHovered ? '#7C3AED' : 'rgba(124, 58, 237, 0.1)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              transition: 'all 0.3s ease',
                              flexShrink: 0,
                            }}
                          >
                            <IconComponent
                              sx={{
                                fontSize: 20,
                                color: isHovered ? 'white' : '#7C3AED',
                                transition: 'all 0.3s ease',
                              }}
                            />
                          </Box>
                          <Box>
                            <Typography
                              variant="subtitle2"
                              sx={{ fontWeight: 700, color: 'secondary.main', mb: 0.5 }}
                            >
                              {feature.title}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ color: 'text.secondary', fontSize: '0.8rem', lineHeight: 1.6 }}
                            >
                              {feature.description}
                            </Typography>
                          </Box>
                        </Box>
                      </MotionPaper>
                    </Grid>
                  );
                })}
              </Grid>

              {/* CTA Button */}
              <MotionBox
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  onClick={handleCtaClick}
                  sx={{
                    bgcolor: '#7C3AED',
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 600,
                    '&:hover': {
                      bgcolor: '#6D28D9',
                    },
                  }}
                >
                  {content.cta}
                </Button>
              </MotionBox>
            </MotionBox>
          </Grid>

          {/* Right: Template Preview */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <MotionBox
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              sx={{ position: 'relative' }}
            >
              {/* Template comparison */}
              <Box
                sx={{
                  display: 'flex',
                  gap: 3,
                  justifyContent: 'center',
                  flexDirection: { xs: 'column', sm: 'row' },
                }}
              >
                {/* SOAP Template */}
                <MotionPaper
                  whileHover={{ y: -8 }}
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    border: '2px solid',
                    borderColor: 'grey.200',
                    bgcolor: 'grey.50',
                    flex: 1,
                    maxWidth: { sm: 240 },
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'text.secondary',
                      fontWeight: 600,
                      display: 'block',
                      mb: 2,
                      textAlign: 'center',
                    }}
                  >
                    {content.example?.before}
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    {soapTemplate.map((item, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1.5,
                          p: 1.5,
                          bgcolor: 'white',
                          borderRadius: 1.5,
                          border: '1px solid',
                          borderColor: 'grey.200',
                        }}
                      >
                        <Box
                          sx={{
                            width: 28,
                            height: 28,
                            borderRadius: 1,
                            bgcolor: 'grey.200',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 700,
                            fontSize: '0.75rem',
                            color: 'grey.600',
                          }}
                        >
                          {item.label}
                        </Box>
                        <Box>
                          <Typography variant="caption" sx={{ fontWeight: 600, display: 'block' }}>
                            {item.title}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.65rem' }}>
                            {item.content}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </MotionPaper>

                {/* Arrow */}
                <Box
                  sx={{
                    display: { xs: 'none', sm: 'flex' },
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <MotionBox
                    animate={{ x: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowForwardIcon sx={{ color: '#7C3AED', fontSize: 32 }} />
                  </MotionBox>
                </Box>

                {/* Custom Template */}
                <MotionPaper
                  whileHover={{ y: -8 }}
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    border: '2px solid',
                    borderColor: '#7C3AED',
                    bgcolor: 'rgba(124, 58, 237, 0.02)',
                    flex: 1,
                    maxWidth: { sm: 240 },
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Highlight badge */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 12,
                      right: -30,
                      bgcolor: '#7C3AED',
                      color: 'white',
                      fontSize: '0.6rem',
                      fontWeight: 700,
                      px: 4,
                      py: 0.5,
                      transform: 'rotate(45deg)',
                    }}
                  >
                    NEW
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: '#7C3AED',
                      fontWeight: 600,
                      display: 'block',
                      mb: 2,
                      textAlign: 'center',
                    }}
                  >
                    {content.example?.after}
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {customTemplate.map((item, idx) => (
                      <MotionBox
                        key={idx}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: idx * 0.1 }}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1.5,
                          p: 1,
                          bgcolor: 'white',
                          borderRadius: 1.5,
                          border: '1px solid',
                          borderColor: item.color,
                          borderLeftWidth: 3,
                        }}
                      >
                        <Box
                          sx={{
                            width: 24,
                            height: 24,
                            borderRadius: 0.5,
                            bgcolor: item.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 700,
                            fontSize: '0.6rem',
                            color: 'white',
                          }}
                        >
                          {item.label}
                        </Box>
                        <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.7rem' }}>
                          {item.title}
                        </Typography>
                      </MotionBox>
                    ))}
                  </Box>
                </MotionPaper>
              </Box>
            </MotionBox>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
