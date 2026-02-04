'use client';

import { Box, Container, Typography, Grid, Stack, Button } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import HistoryIcon from "@mui/icons-material/History";
import LockIcon from "@mui/icons-material/Lock";
import FilterListIcon from "@mui/icons-material/FilterList";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import CloudIcon from "@mui/icons-material/Cloud";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const MotionBox = motion.create(Box);

const items = [
  { icon: AdminPanelSettingsIcon, label: "역할 기반 접근 제어 (RBAC)" },
  { icon: HistoryIcon, label: "감사 로그 자동 기록" },
  { icon: LockIcon, label: "전송 및 저장 데이터 암호화" },
  { icon: FilterListIcon, label: "최소한의 데이터만 수집" },
  { icon: DeleteSweepIcon, label: "데이터 삭제 및 보관 정책" },
  { icon: CloudIcon, label: "Cloud / Private / On-prem 배포 지원" },
];

export default function SecurityCompliance() {
  return (
    <Box
      id="security"
      sx={{
        py: { xs: 10, md: 14 },
        background: "linear-gradient(180deg, #0F172A 0%, #1E293B 100%)",
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
          <Typography variant="overline" sx={{ color: "#4B9CD3", mb: 1.5, display: "block", letterSpacing: 2, fontWeight: 600 }}>
            SECURITY
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: "2rem", md: "2.75rem" }, fontWeight: 700, color: "white", mb: 2 }}>
            보안 및 규정 준수
          </Typography>
          <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.7)", fontSize: { xs: "1rem", md: "1.125rem" }, maxWidth: 600, mx: "auto" }}>
            EMR에 요구되는 보안 수준을 기본으로 충족합니다
          </Typography>
        </MotionBox>

        <Grid container spacing={3} sx={{ mb: 6 }}>
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    p: 2.5,
                    borderRadius: 2,
                    bgcolor: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      bgcolor: "rgba(255,255,255,0.08)",
                      borderColor: "rgba(75,156,211,0.3)",
                    },
                  }}
                >
                  <CheckCircleOutlineIcon sx={{ color: "#4B9CD3", fontSize: 22 }} />
                  <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.9)", fontWeight: 500, fontSize: "0.95rem" }}>
                    {item.label}
                  </Typography>
                </MotionBox>
              </Grid>
            );
          })}
        </Grid>

        <MotionBox
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
          sx={{ textAlign: "center" }}
        >
          <Button
            component={Link}
            href="/contact?type=security_packet"
            variant="outlined"
            size="large"
            sx={{
              borderColor: "rgba(255,255,255,0.3)",
              color: "white",
              px: 4, py: 1.5,
              fontSize: "0.95rem",
              fontWeight: 600,
              textTransform: "none",
              borderRadius: 2,
              "&:hover": {
                borderColor: "white",
                bgcolor: "rgba(255,255,255,0.08)",
              },
            }}
          >
            보안 및 아키텍처 자료 요청하기
          </Button>
        </MotionBox>
      </Container>
    </Box>
  );
}
