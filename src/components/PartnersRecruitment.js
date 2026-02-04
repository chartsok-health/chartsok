'use client';

import { Box, Container, Typography, Grid, Stack, Chip, Button } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";
import HandshakeIcon from "@mui/icons-material/Handshake";

const MotionBox = motion.create(Box);

const targetTypes = [
  { label: "의원용 EMR", desc: "1차 의원 시장" },
  { label: "중소병원 EMR", desc: "2차 의료기관" },
  { label: "검진/특수클리닉 EMR", desc: "건강검진, 특수 진료" },
];

const partnerTypes = [
  { label: "리셀 (Resell)", desc: "chartsok을 EMR에 번들" },
  { label: "코마케팅 (Co-marketing)", desc: "공동 영업/마케팅" },
  { label: "화이트레이블 (White-label)", desc: "OEM 제공" },
];

export default function PartnersRecruitment() {
  return (
    <Box
      id="partners"
      sx={{
        py: { xs: 10, md: 14 },
        bgcolor: "#F8FAFC",
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
            PARTNERS WANTED
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: "2rem", md: "2.75rem" }, fontWeight: 700, color: "secondary.main", mb: 2 }}>
            우리가 찾는 EMR 파트너
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", fontSize: { xs: "1rem", md: "1.125rem" }, maxWidth: 600, mx: "auto" }}>
            chartsok과 함께 성장할 EMR 파트너를 찾습니다
          </Typography>
        </MotionBox>

        {/* Row 1: Target EMR Types */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          sx={{ mb: 6 }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700, color: "secondary.main", mb: 3, textAlign: "center" }}>
            타겟 EMR 유형
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            {targetTypes.map((item, index) => (
              <Grid size={{ xs: 12, sm: 4 }} key={index}>
                <Box
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    border: "2px dashed",
                    borderColor: "primary.main",
                    bgcolor: "rgba(75,156,211,0.04)",
                    textAlign: "center",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      borderColor: "primary.dark",
                      bgcolor: "rgba(75,156,211,0.08)",
                    },
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "secondary.main", mb: 0.5 }}>
                    {item.label}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.85rem" }}>
                    {item.desc}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </MotionBox>

        {/* Row 2: Partner Types */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          sx={{ mb: 6 }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700, color: "secondary.main", mb: 3, textAlign: "center" }}>
            제휴 형태
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            {partnerTypes.map((item, index) => {
              const colors = ["#10B981", "#F59E0B", "#8B5CF6"];
              const color = colors[index];
              return (
                <Grid size={{ xs: 12, sm: 4 }} key={index}>
                  <Box
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      border: "2px dashed",
                      borderColor: color,
                      bgcolor: `${color}06`,
                      textAlign: "center",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        bgcolor: `${color}12`,
                      },
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "secondary.main", mb: 0.5 }}>
                      {item.label}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.85rem" }}>
                      {item.desc}
                    </Typography>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </MotionBox>

        {/* CTA */}
        <MotionBox
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          sx={{ textAlign: "center" }}
        >
          <Button
            component={Link}
            href="/contact?type=emr_partner"
            variant="contained"
            size="large"
            startIcon={<HandshakeIcon />}
            sx={{
              bgcolor: "primary.main",
              color: "white",
              px: 4,
              py: 1.5,
              fontSize: "1rem",
              fontWeight: 600,
              textTransform: "none",
              borderRadius: 2,
              "&:hover": {
                bgcolor: "primary.dark",
              },
            }}
          >
            파트너 프로그램 문의
          </Button>
        </MotionBox>
      </Container>
    </Box>
  );
}
