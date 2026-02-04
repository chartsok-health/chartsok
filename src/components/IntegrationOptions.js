'use client';

import { useState } from "react";
import { Box, Container, Typography, Grid, Card, CardContent, Stack, Chip } from "@mui/material";
import { motion } from "framer-motion";
import CodeIcon from "@mui/icons-material/Code";
import CloudIcon from "@mui/icons-material/Cloud";
import StorageIcon from "@mui/icons-material/Storage";
import CheckIcon from "@mui/icons-material/Check";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const MotionBox = motion.create(Box);
const MotionCard = motion.create(Card);

const options = [
  {
    icon: CodeIcon,
    title: "iFrame / SDK 임베딩",
    description: "EMR 화면 안에 직접 탑재합니다",
    color: "#4B9CD3",
    needs: ["SSO 연동", "사용자 및 권한 정보", "환자 식별키"],
    provides: ["UI 모듈 (React SDK)", "감사 기록 API", "권한 확인 미들웨어"],
  },
  {
    icon: CloudIcon,
    title: "API 연동",
    description: "RESTful API 기반으로 연동합니다",
    color: "#10B981",
    needs: ["환자/오더/노트 API 엔드포인트", "OAuth 토큰 교환"],
    provides: ["RESTful API", "Webhook 알림", "데이터 매핑 가이드"],
  },
  {
    icon: StorageIcon,
    title: "On-premise / Private 배포",
    description: "병원 내부망에 직접 설치합니다",
    color: "#8B5CF6",
    needs: ["서버 인프라 (VM / K8s)", "네트워크 정책"],
    provides: ["Docker 이미지", "Helm 차트", "운영 가이드"],
  },
];

export default function IntegrationOptions() {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <Box
      id="integration"
      sx={{
        py: { xs: 10, md: 14 },
        bgcolor: "white",
      }}
    >
      <Container maxWidth="xl">
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}
        >
          <Typography variant="overline" sx={{ color: "primary.main", mb: 1.5, display: "block", letterSpacing: 2, fontWeight: 700, fontSize: { xs: "0.65rem", md: "0.75rem" } }}>
            INTEGRATION
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: "1.6rem", sm: "2rem", md: "2.5rem" }, fontWeight: 800, color: "secondary.main", mb: 2, lineHeight: 1.2 }}>
            연동 방식을 선택하세요
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", fontSize: { xs: "0.9rem", md: "1.05rem" }, maxWidth: 600, mx: "auto", lineHeight: 1.7 }}>
            EMR 아키텍처에 맞는 방식을 선택할 수 있습니다
          </Typography>
        </MotionBox>

        <Grid container spacing={{ xs: 2.5, md: 4 }}>
          {options.map((opt, index) => {
            const Icon = opt.icon;
            const isHovered = hoveredCard === index;
            return (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                <MotionCard
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
                  whileHover={{ y: -6 }}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  elevation={0}
                  sx={{
                    height: "100%",
                    bgcolor: "white",
                    border: "1px solid",
                    borderColor: isHovered ? opt.color : "grey.200",
                    borderLeft: "4px solid",
                    borderLeftColor: opt.color,
                    borderRadius: 3,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: `0 8px 24px ${opt.color}15`,
                    },
                  }}
                >
                  <CardContent sx={{ p: 3.5 }}>
                    <Stack spacing={2.5}>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Box
                          sx={{
                            width: 48, height: 48, borderRadius: 2,
                            bgcolor: `${opt.color}15`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}
                        >
                          <Icon sx={{ fontSize: 24, color: opt.color }} />
                        </Box>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 700, color: "secondary.main", fontSize: "1.1rem" }}>
                            {opt.title}
                          </Typography>
                          <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.85rem" }}>
                            {opt.description}
                          </Typography>
                        </Box>
                      </Stack>

                      <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700, mb: 1, display: "block" }}>
                            파트너사에서 준비할 것
                          </Typography>
                          {opt.needs.map((item, i) => (
                            <Stack key={i} direction="row" alignItems="center" spacing={0.5} sx={{ mb: 0.5 }}>
                              <ArrowRightIcon sx={{ fontSize: 14, color: "text.disabled" }} />
                              <Typography variant="body2" sx={{ fontSize: "0.8rem", color: "text.secondary" }}>{item}</Typography>
                            </Stack>
                          ))}
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <Typography variant="caption" sx={{ color: opt.color, fontWeight: 700, mb: 1, display: "block" }}>
                            저희가 제공하는 것
                          </Typography>
                          {opt.provides.map((item, i) => (
                            <Stack key={i} direction="row" alignItems="center" spacing={0.5} sx={{ mb: 0.5 }}>
                              <CheckIcon sx={{ fontSize: 14, color: opt.color }} />
                              <Typography variant="body2" sx={{ fontSize: "0.8rem", color: "text.secondary" }}>{item}</Typography>
                            </Stack>
                          ))}
                        </Grid>
                      </Grid>
                    </Stack>
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
