'use client';

import { useRef, useEffect, useState } from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { motion, useInView } from 'framer-motion';
import { useI18n } from '@/lib/i18n';

const MotionBox = motion.create(Box);

function AnimatedCounter({ value, suffix, duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    const target = parseInt(value, 10);
    const increment = target / (duration * 60);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return (
    <Box ref={ref} component="span">
      {count}
      {suffix}
    </Box>
  );
}

export default function Stats() {
  const { t } = useI18n();
  const stats = t('stats.items');

  return (
    <Box
      sx={{
        py: { xs: 6, sm: 8, md: 10 },
        background: 'linear-gradient(135deg, #0F2A44 0%, #1A3A5C 50%, #0F2A44 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background pattern */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.03,
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
      />

      <Container maxWidth="xl">
        <Grid container spacing={{ xs: 3, sm: 4 }} justifyContent="center">
          {stats.map((stat, index) => (
            <Grid size={{ xs: 6, sm: 6, md: 3 }} key={index}>
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                sx={{
                  textAlign: 'center',
                  p: { xs: 2, sm: 3 },
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                    fontWeight: 800,
                    mb: 0.5,
                    background: 'linear-gradient(135deg, #FFFFFF 0%, #4B9CD3 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: 1.1,
                  }}
                >
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </Typography>
                <Typography
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontWeight: 500,
                    fontSize: { xs: '0.8rem', sm: '0.875rem', md: '0.95rem' },
                  }}
                >
                  {stat.label}
                </Typography>
              </MotionBox>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
