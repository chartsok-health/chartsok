'use client';

import { useState } from 'react';
import { Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { motion } from 'framer-motion';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useI18n } from '@/lib/i18n';

const MotionBox = motion.create(Box);

export default function FAQ() {
  const { t } = useI18n();
  const faqs = t('faq.items');
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box
      id="faq"
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
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', md: '2.75rem' },
              fontWeight: 700,
              color: 'secondary.main',
              mb: 2,
            }}
          >
            {t('faq.title')}
          </Typography>
        </MotionBox>

        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {faqs.map((faq, index) => (
            <Accordion
              key={index}
              expanded={expanded === index}
              onChange={handleChange(index)}
              elevation={0}
              sx={{
                mb: 3,
                bgcolor: 'white',
                border: '1px solid',
                borderColor: expanded === index ? 'primary.main' : 'grey.200',
                borderRadius: '12px !important',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                '&:before': { display: 'none' },
                '&.Mui-expanded': {
                  mb: 3,
                  mt: 0,
                },
                '&:hover': {
                  borderColor: 'primary.main',
                },
              }}
            >
              <AccordionSummary
                expandIcon={
                  expanded === index ? (
                    <RemoveIcon sx={{ color: 'primary.main' }} />
                  ) : (
                    <AddIcon sx={{ color: 'text.secondary' }} />
                  )
                }
                sx={{
                  px: 3,
                  py: 1,
                  '& .MuiAccordionSummary-content': {
                    my: 2,
                  },
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    color: expanded === index ? 'primary.main' : 'secondary.main',
                  }}
                >
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 3, pb: 4, pt: 0 }}>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.secondary',
                    lineHeight: 1.8,
                  }}
                >
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </MotionBox>
      </Container>
    </Box>
  );
}
