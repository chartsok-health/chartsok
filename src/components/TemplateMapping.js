'use client';

import { useState } from 'react';
import { Box, Container, Typography, Grid, Card, Chip, Stack, Button } from '@mui/material';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { useI18n } from '@/lib/i18n';

const MotionBox = motion.create(Box);
const MotionCard = motion.create(Card);

const content = {
  ko: {
    sectionTitle: "기존 차트 양식 그대로,",
    sectionTitleHighlight: "3~7일",
    sectionTitleEnd: "안에 매핑",
    sectionSubtitle: "SOAP, 자유형식, 진료과별 양식 — 어떤 포맷이든 AI 출력을 EMR 필드에 정확히 매핑합니다",
    ctaButton: "우리 EMR 양식으로 매핑 가능 여부 확인",
    steps: [
      {
        number: 1,
        title: 'EMR 차트 필드/양식 수집',
        description: '파트너사의 기존 차트 템플릿 구조를 분석합니다. SOAP, 자유형식, 과별 양식 모두 지원.',
        duration: '1~2일',
        color: '#4B9CD3',
      },
      {
        number: 2,
        title: '템플릿 매핑 (SOAP → EMR 필드)',
        description: 'Chartsok AI 출력을 EMR 필드에 1:1 매핑합니다. 진료과별 커스터마이징 포함.',
        duration: '2~3일',
        color: '#10B981',
      },
      {
        number: 3,
        title: '병원 피드백 반영 → 확정',
        description: '실제 진료 데이터로 검증하고 현장 피드백을 반영하여 최종 확정합니다.',
        duration: '1~2일',
        color: '#F59E0B',
      },
    ],
    templateCards: [
      {
        name: '내과 SOAP 템플릿',
        status: '매핑 완료',
        statusColor: '#10B981',
        StatusIcon: CheckCircleIcon,
        mappings: [
          { from: 'CC', to: 'Chief Complaint', color: '#4B9CD3' },
          { from: 'HPI', to: 'History of Present Illness', color: '#10B981' },
          { from: 'Dx', to: 'Assessment / 진단코드', color: '#F59E0B' },
          { from: 'Plan', to: '처방 / 처치 계획', color: '#8B5CF6' },
        ],
      },
      {
        name: '정형외과 수술기록',
        status: '매핑 완료',
        statusColor: '#10B981',
        StatusIcon: CheckCircleIcon,
        mappings: [
          { from: 'CC', to: 'Chief Complaint', color: '#4B9CD3' },
          { from: 'OP', to: 'Operative Note', color: '#10B981' },
          { from: 'Dx', to: 'Post-Op Diagnosis', color: '#F59E0B' },
          { from: 'Plan', to: 'Post-Op Order', color: '#8B5CF6' },
        ],
      },
      {
        name: '피부과 상담 템플릿',
        status: '매핑 진행 중',
        statusColor: '#F59E0B',
        StatusIcon: ScheduleIcon,
        mappings: [
          { from: 'CC', to: 'Chief Complaint', color: '#4B9CD3' },
          { from: 'Skin', to: 'Skin Exam Findings', color: '#10B981' },
          { from: 'Dx', to: 'Assessment', color: '#F59E0B' },
          { from: 'Plan', to: '시술/처방 계획', color: '#8B5CF6' },
        ],
      },
    ],
  },
  en: {
    sectionTitle: "Your Templates, Mapped in",
    sectionTitleHighlight: "3–7 Days",
    sectionTitleEnd: "",
    sectionSubtitle: "SOAP, free-form, specialty formats — we map AI output to your exact EMR fields",
    ctaButton: "Check If Your EMR Is Compatible",
    steps: [
      {
        number: 1,
        title: 'Collect EMR Fields',
        description: 'We analyze your existing chart templates. SOAP, free-form, specialty — all supported.',
        duration: '1–2 days',
        color: '#4B9CD3',
      },
      {
        number: 2,
        title: 'Map Templates (SOAP → EMR)',
        description: '1:1 mapping from Chartsok AI output to your EMR fields. Custom by specialty.',
        duration: '2–3 days',
        color: '#10B981',
      },
      {
        number: 3,
        title: 'Validate & Finalize',
        description: 'Test with real data, incorporate feedback, lock it in.',
        duration: '1–2 days',
        color: '#F59E0B',
      },
    ],
    templateCards: [
      {
        name: 'Internal Medicine SOAP',
        status: 'Mapped',
        statusColor: '#10B981',
        StatusIcon: CheckCircleIcon,
        mappings: [
          { from: 'CC', to: 'Chief Complaint', color: '#4B9CD3' },
          { from: 'HPI', to: 'History of Present Illness', color: '#10B981' },
          { from: 'Dx', to: 'Assessment / Diagnosis', color: '#F59E0B' },
          { from: 'Plan', to: 'Treatment Plan', color: '#8B5CF6' },
        ],
      },
      {
        name: 'Orthopedic Op Note',
        status: 'Mapped',
        statusColor: '#10B981',
        StatusIcon: CheckCircleIcon,
        mappings: [
          { from: 'CC', to: 'Chief Complaint', color: '#4B9CD3' },
          { from: 'OP', to: 'Operative Note', color: '#10B981' },
          { from: 'Dx', to: 'Post-Op Diagnosis', color: '#F59E0B' },
          { from: 'Plan', to: 'Post-Op Order', color: '#8B5CF6' },
        ],
      },
      {
        name: 'Dermatology Consult',
        status: 'In Progress',
        statusColor: '#F59E0B',
        StatusIcon: ScheduleIcon,
        mappings: [
          { from: 'CC', to: 'Chief Complaint', color: '#4B9CD3' },
          { from: 'Skin', to: 'Skin Exam Findings', color: '#10B981' },
          { from: 'Dx', to: 'Assessment', color: '#F59E0B' },
          { from: 'Plan', to: 'Treatment Plan', color: '#8B5CF6' },
        ],
      },
    ],
  },
};

export default function TemplateMapping() {
  const { locale } = useI18n();
  const t = content[locale] || content.ko;
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <Box
      id="template-mapping"
      sx={{
        py: { xs: 8, sm: 10, md: 12 },
        bgcolor: 'white',
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          sx={{ textAlign: 'center', mb: { xs: 5, md: 8 } }}
        >
          <Typography
            variant="overline"
            sx={{
              color: '#4B9CD3',
              mb: 1.5,
              display: 'block',
              letterSpacing: 2,
              fontWeight: 700,
              fontSize: { xs: '0.65rem', md: '0.75rem' },
            }}
          >
            TEMPLATE MAPPING
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '1.6rem', sm: '2rem', md: '2.5rem' },
              fontWeight: 800,
              color: 'secondary.main',
              mb: 2,
              lineHeight: 1.2,
            }}
          >
            {t.sectionTitle}{' '}
            <Box component="span" sx={{ color: '#4B9CD3' }}>
              {t.sectionTitleHighlight}
            </Box>
            {t.sectionTitleEnd && ` ${t.sectionTitleEnd}`}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              fontSize: { xs: '0.9rem', md: '1.05rem' },
              maxWidth: 560,
              mx: 'auto',
              lineHeight: 1.7,
            }}
          >
            {t.sectionSubtitle}
          </Typography>
        </MotionBox>

        {/* Two-column layout */}
        <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
          {/* Left column: 3-step vertical flow */}
          <Grid size={{ xs: 12, md: 5 }}>
            <MotionBox
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              sx={{ position: 'relative', pl: { xs: 6, md: 7 } }}
            >
              {/* Connecting vertical line */}
              <Box
                sx={{
                  position: 'absolute',
                  left: { xs: 23, md: 27 },
                  top: 24,
                  bottom: 24,
                  width: 3,
                  bgcolor: 'grey.200',
                  borderRadius: 2,
                  zIndex: 0,
                }}
              >
                <MotionBox
                  initial={{ height: '0%' }}
                  whileInView={{ height: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
                  sx={{
                    width: '100%',
                    background: 'linear-gradient(180deg, #4B9CD3, #10B981, #F59E0B)',
                    borderRadius: 2,
                  }}
                />
              </Box>

              <Stack spacing={{ xs: 4, md: 5 }}>
                {t.steps.map((step, index) => (
                  <MotionBox
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    sx={{ position: 'relative' }}
                  >
                    {/* Numbered circle */}
                    <Box
                      sx={{
                        position: 'absolute',
                        left: { xs: -42, md: -48 },
                        top: 0,
                        width: { xs: 36, md: 40 },
                        height: { xs: 36, md: 40 },
                        borderRadius: '50%',
                        bgcolor: step.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '4px solid white',
                        boxShadow: `0 2px 8px ${step.color}40`,
                        zIndex: 1,
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          color: 'white',
                          fontWeight: 800,
                          fontSize: { xs: '0.8rem', md: '0.85rem' },
                        }}
                      >
                        {step.number}
                      </Typography>
                    </Box>

                    {/* Step content */}
                    <Box>
                      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            color: 'secondary.main',
                            fontSize: { xs: '0.95rem', md: '1.05rem' },
                          }}
                        >
                          {step.title}
                        </Typography>
                      </Stack>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          fontSize: { xs: '0.82rem', md: '0.88rem' },
                          lineHeight: 1.6,
                          mb: 0.75,
                        }}
                      >
                        {step.description}
                      </Typography>
                      <Chip
                        label={step.duration}
                        size="small"
                        sx={{
                          bgcolor: `${step.color}12`,
                          color: step.color,
                          fontWeight: 700,
                          fontSize: '0.68rem',
                          height: 22,
                        }}
                      />
                    </Box>
                  </MotionBox>
                ))}
              </Stack>
            </MotionBox>
          </Grid>

          {/* Right column: template cards */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Stack spacing={2}>
              {t.templateCards.map((template, index) => {
                const isHovered = hoveredCard === index;
                return (
                  <MotionCard
                    key={index}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.12 }}
                    whileHover={{ y: -3, scale: 1.01 }}
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                    elevation={0}
                    sx={{
                      p: { xs: 2, md: 2.5 },
                      borderRadius: 2.5,
                      border: '1.5px solid',
                      borderColor: isHovered ? '#4B9CD3' : 'grey.200',
                      bgcolor: isHovered ? '#F8FBFF' : 'grey.50',
                      transition: 'all 0.25s ease',
                      cursor: 'pointer',
                      '&:hover': {
                        boxShadow: '0 8px 24px rgba(75, 156, 211, 0.1)',
                      },
                    }}
                  >
                    {/* Card header */}
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{ mb: 1.5 }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 700,
                          color: 'secondary.main',
                          fontSize: { xs: '0.88rem', md: '0.95rem' },
                        }}
                      >
                        {template.name}
                      </Typography>
                      <Chip
                        icon={<template.StatusIcon sx={{ fontSize: 14 }} />}
                        label={template.status}
                        size="small"
                        sx={{
                          bgcolor: `${template.statusColor}12`,
                          color: template.statusColor,
                          fontWeight: 700,
                          fontSize: '0.68rem',
                          height: 24,
                          '& .MuiChip-icon': { color: template.statusColor },
                        }}
                      />
                    </Stack>

                    {/* Field mappings - horizontal flow on desktop */}
                    <Stack
                      direction={{ xs: 'column', sm: 'row' }}
                      spacing={{ xs: 0.75, sm: 1 }}
                      flexWrap="wrap"
                      useFlexGap
                    >
                      {template.mappings.map((mapping, mIdx) => (
                        <Stack
                          key={mIdx}
                          direction="row"
                          alignItems="center"
                          spacing={0.75}
                          sx={{
                            px: 1.5,
                            py: 0.75,
                            borderRadius: 1.5,
                            bgcolor: isHovered ? `${mapping.color}08` : 'white',
                            border: '1px solid',
                            borderColor: isHovered ? `${mapping.color}25` : 'grey.200',
                            transition: 'all 0.25s ease',
                            flex: { sm: '1 1 auto' },
                            minWidth: { sm: 'calc(50% - 8px)' },
                          }}
                        >
                          <Chip
                            label={mapping.from}
                            size="small"
                            sx={{
                              bgcolor: mapping.color,
                              color: 'white',
                              fontWeight: 700,
                              fontSize: '0.62rem',
                              height: 20,
                              minWidth: 36,
                              '& .MuiChip-label': { px: 1 },
                            }}
                          />
                          <ArrowForwardIcon sx={{ fontSize: 12, color: 'text.disabled' }} />
                          <Typography
                            variant="caption"
                            sx={{
                              color: 'text.secondary',
                              fontSize: '0.72rem',
                              fontWeight: 500,
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {mapping.to}
                          </Typography>
                        </Stack>
                      ))}
                    </Stack>
                  </MotionCard>
                );
              })}
            </Stack>
          </Grid>
        </Grid>

        {/* Bottom CTA */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          sx={{ textAlign: 'center', mt: { xs: 5, md: 7 } }}
        >
          <Button
            component={Link}
            href="/contact?type=template_mapping_check"
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{
              bgcolor: '#4B9CD3',
              px: { xs: 3, sm: 4, md: 5 },
              py: { xs: 1.25, md: 1.5 },
              borderRadius: 2.5,
              fontWeight: 700,
              fontSize: { xs: '0.85rem', md: '0.95rem' },
              width: { xs: '100%', sm: 'auto' },
              boxShadow: '0 4px 16px rgba(75, 156, 211, 0.25)',
              '&:hover': {
                bgcolor: '#3A8BC2',
                boxShadow: '0 6px 24px rgba(75, 156, 211, 0.35)',
              },
            }}
          >
            {t.ctaButton}
          </Button>
        </MotionBox>
      </Container>
    </Box>
  );
}
