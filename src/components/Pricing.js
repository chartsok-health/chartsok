'use client';

import { useState } from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Button, List, ListItem, ListItemIcon, ListItemText, Switch, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import CheckIcon from '@mui/icons-material/Check';
import StarIcon from '@mui/icons-material/Star';
import { useI18n } from '@/lib/i18n';

const MotionBox = motion.create(Box);
const MotionCard = motion.create(Card);

export default function Pricing() {
  const { t, locale } = useI18n();
  const [isYearly, setIsYearly] = useState(false);
  const plans = t('pricing.plans');

  return (
    <Box
      id="pricing"
      sx={{
        py: { xs: 10, md: 14 },
        bgcolor: 'white',
      }}
    >
      <Container maxWidth="xl">
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}
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
            {t('pricing.title')}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              fontSize: { xs: '1rem', md: '1.125rem' },
              mb: 4,
            }}
          >
            {t('pricing.subtitle')}
          </Typography>

          {/* Billing toggle */}
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 2,
              bgcolor: 'grey.100',
              borderRadius: 3,
              p: 1,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontWeight: isYearly ? 400 : 600,
                color: isYearly ? 'text.secondary' : 'primary.main',
                px: 2,
              }}
            >
              {t('pricing.monthly')}
            </Typography>
            <Switch
              checked={isYearly}
              onChange={(e) => setIsYearly(e.target.checked)}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: 'primary.main',
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  bgcolor: 'primary.main',
                },
              }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: isYearly ? 600 : 400,
                  color: isYearly ? 'primary.main' : 'text.secondary',
                  px: 2,
                }}
              >
                {t('pricing.yearly')}
              </Typography>
              {isYearly && (
                <Chip
                  label={t('pricing.yearlyDiscount')}
                  size="small"
                  sx={{
                    bgcolor: '#D1FAE5',
                    color: '#059669',
                    fontWeight: 600,
                    fontSize: '0.7rem',
                  }}
                />
              )}
            </Box>
          </Box>
        </MotionBox>

        <Grid container spacing={3} alignItems="stretch">
          {plans.map((plan, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <MotionCard
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, scale: 1.02 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                elevation={0}
                sx={{
                  height: '100%',
                  position: 'relative',
                  bgcolor: plan.popular ? 'primary.main' : 'white',
                  border: '2px solid',
                  borderColor: plan.popular ? 'primary.main' : 'grey.200',
                  transition: 'all 0.3s ease',
                  overflow: 'visible',
                  cursor: 'pointer',
                  '&:hover': {
                    borderColor: 'primary.main',
                    boxShadow: plan.popular
                      ? '0 24px 60px rgba(75, 156, 211, 0.5)'
                      : '0 20px 50px rgba(0, 0, 0, 0.12)',
                  },
                }}
              >
                {plan.popular && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -12,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      bgcolor: '#F59E0B',
                      color: 'white',
                      px: 2,
                      py: 0.5,
                      borderRadius: 2,
                      fontWeight: 600,
                      fontSize: '0.75rem',
                    }}
                  >
                    <StarIcon sx={{ fontSize: 14 }} />
                    RECOMMENDED
                  </Box>
                )}

                <CardContent sx={{ p: 4 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      color: plan.popular ? 'white' : 'secondary.main',
                      mb: 0.5,
                    }}
                  >
                    {plan.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: plan.popular ? 'rgba(255,255,255,0.8)' : 'text.secondary',
                      mb: 3,
                    }}
                  >
                    {plan.description}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 3 }}>
                    {plan.price !== '문의' && plan.price !== 'Contact' && (
                      <Typography
                        variant="body1"
                        sx={{
                          color: plan.popular ? 'rgba(255,255,255,0.8)' : 'text.secondary',
                          mr: 0.5,
                        }}
                      >
                        {locale === 'ko' ? '₩' : '$'}
                      </Typography>
                    )}
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 800,
                        color: plan.popular ? 'white' : 'secondary.main',
                        fontSize: { xs: '2rem', md: '2.5rem' },
                      }}
                    >
                      {isYearly && plan.price !== '문의' && plan.price !== 'Contact'
                        ? Math.round(parseInt(plan.price.replace(',', '')) * 10 / 12).toLocaleString()
                        : plan.price}
                    </Typography>
                    {plan.period && (
                      <Typography
                        variant="body1"
                        sx={{
                          color: plan.popular ? 'rgba(255,255,255,0.8)' : 'text.secondary',
                          ml: 0.5,
                        }}
                      >
                        {plan.period}
                      </Typography>
                    )}
                  </Box>

                  {plan.popular ? (
                    <Button
                      variant="outlined"
                      fullWidth
                      size="large"
                      sx={{
                        mb: 3,
                        py: 1.5,
                        fontWeight: 700,
                        borderRadius: 2,
                        borderColor: '#FFFFFF',
                        borderWidth: 2,
                        color: '#FFFFFF',
                        fontSize: '1rem',
                        '&:hover': {
                          borderColor: '#FFFFFF',
                          borderWidth: 2,
                          bgcolor: 'rgba(255, 255, 255, 0.15)',
                        },
                      }}
                    >
                      {plan.cta}
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      fullWidth
                      size="large"
                      sx={{
                        mb: 3,
                        py: 1.5,
                        fontWeight: 600,
                        borderRadius: 2,
                        borderColor: 'primary.main',
                        borderWidth: 2,
                        color: 'primary.main',
                        '&:hover': {
                          bgcolor: 'rgba(75, 156, 211, 0.08)',
                          borderColor: 'primary.main',
                          borderWidth: 2,
                        },
                      }}
                    >
                      {plan.cta}
                    </Button>
                  )}

                  <List disablePadding>
                    {plan.features.map((feature, i) => (
                      <ListItem key={i} disableGutters sx={{ py: 0.75 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <CheckIcon
                            sx={{
                              fontSize: 18,
                              color: plan.popular ? 'white' : 'primary.main',
                            }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={feature}
                          primaryTypographyProps={{
                            variant: 'body2',
                            sx: {
                              color: plan.popular ? 'rgba(255,255,255,0.9)' : 'text.secondary',
                            },
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </MotionCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
