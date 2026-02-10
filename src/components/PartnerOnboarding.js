'use client';

import { Box, Container, Typography, Stack, Chip } from "@mui/material";
import { motion } from "framer-motion";
import { useI18n } from '@/lib/i18n';

const MotionBox = motion.create(Box);

const content = {
  ko: {
    title: "파트너 도입 절차",
    subtitle: "NDA 체결부터 정식 런칭까지, 단계별로 함께 진행합니다",
    steps: [
      { title: "NDA 체결 및 대표 템플릿 선정", badge: "1주", description: "보안 요구사항과 기술 스펙을 정리하고, 매핑할 대표 차트 템플릿 3종을 선정합니다", color: "#4B9CD3" },
      { title: "샌드박스 검증 및 템플릿 매핑", badge: "2주", description: "테스트 환경에서 연동을 검증하고, 선정된 템플릿의 필드 매핑을 완료합니다", color: "#10B981" },
      { title: "병원 현장 PoC 진행", badge: "4~8주", description: "실제 병원 2~3곳에서 파일럿을 진행하고, 현장 피드백을 반영합니다", color: "#F59E0B" },
      { title: "정식 런칭 및 공동 마케팅", badge: "런칭", description: "과금 모델을 확정하고, 공동 마케팅과 함께 정식으로 출시합니다", color: "#8B5CF6" },
    ],
  },
  en: {
    title: "How We Onboard Partners",
    subtitle: "From NDA to launch — we walk you through it",
    steps: [
      { title: "NDA & Templates", badge: "Week 1", description: "Lock in specs, pick 3 chart templates to map", color: "#4B9CD3" },
      { title: "Sandbox Testing", badge: "Week 2", description: "Verify integration, complete field mapping", color: "#10B981" },
      { title: "Hospital Pilot", badge: "Weeks 4–8", description: "Live testing at 2–3 hospitals, iterate fast", color: "#F59E0B" },
      { title: "Go Live", badge: "Launch", description: "Finalize billing, launch with co-marketing", color: "#8B5CF6" },
    ],
  },
};

export default function PartnerOnboarding() {
  const { locale } = useI18n();
  const t = content[locale] || content.ko;
  return (
    <Box
      id="onboarding-process"
      sx={{
        py: { xs: 10, md: 14 },
        bgcolor: "grey.50",
      }}
    >
      <Container maxWidth="lg">
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}
        >
          <Typography variant="overline" sx={{ color: "primary.main", mb: 1.5, display: "block", letterSpacing: 2, fontWeight: 600 }}>
            ONBOARDING
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: "2rem", md: "2.75rem" }, fontWeight: 700, color: "secondary.main", mb: 2 }}>
            {t.title}
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", fontSize: { xs: "1rem", md: "1.125rem" }, maxWidth: 600, mx: "auto" }}>
            {t.subtitle}
          </Typography>
        </MotionBox>

        {/* Desktop: Horizontal Timeline */}
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <Box sx={{ position: "relative", pb: 4 }}>
            {/* Connection Line */}
            <Box
              sx={{
                position: "absolute",
                top: 24,
                left: "10%",
                right: "10%",
                height: 3,
                bgcolor: "grey.200",
                borderRadius: 2,
                zIndex: 0,
              }}
            >
              <MotionBox
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
                sx={{
                  height: "100%",
                  background: "linear-gradient(90deg, #4B9CD3, #10B981, #F59E0B, #8B5CF6)",
                  borderRadius: 2,
                }}
              />
            </Box>

            <Stack direction="row" justifyContent="space-between" sx={{ position: "relative", zIndex: 1 }}>
              {t.steps.map((step, index) => (
                <MotionBox
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "22%",
                  }}
                >
                  {/* Dot */}
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      bgcolor: step.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 2,
                      border: "4px solid white",
                      boxShadow: 2,
                    }}
                  >
                    <Typography variant="caption" sx={{ color: "white", fontWeight: 800, fontSize: "0.8rem" }}>
                      {index + 1}
                    </Typography>
                  </Box>

                  {/* Badge */}
                  <Chip
                    label={step.badge}
                    size="small"
                    sx={{
                      bgcolor: `${step.color}15`,
                      color: step.color,
                      fontWeight: 700,
                      fontSize: "0.75rem",
                      mb: 1.5,
                    }}
                  />

                  <Typography variant="h6" sx={{ fontWeight: 700, color: "secondary.main", textAlign: "center", mb: 1, fontSize: "1rem" }}>
                    {step.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary", textAlign: "center", fontSize: "0.85rem", lineHeight: 1.6 }}>
                    {step.description}
                  </Typography>
                </MotionBox>
              ))}
            </Stack>
          </Box>
        </Box>

        {/* Mobile: Vertical */}
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <Stack spacing={3}>
            {t.steps.map((step, index) => (
              <MotionBox
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 2,
                  p: 2.5,
                  borderRadius: 2,
                  bgcolor: "white",
                  border: "1px solid",
                  borderColor: "grey.200",
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    bgcolor: step.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Typography variant="caption" sx={{ color: "white", fontWeight: 800 }}>
                    {index + 1}
                  </Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "secondary.main", fontSize: "0.95rem" }}>
                      {step.title}
                    </Typography>
                    <Chip label={step.badge} size="small" sx={{ bgcolor: `${step.color}15`, color: step.color, fontWeight: 600, fontSize: "0.65rem", height: 22 }} />
                  </Stack>
                  <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.85rem" }}>
                    {step.description}
                  </Typography>
                </Box>
              </MotionBox>
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
