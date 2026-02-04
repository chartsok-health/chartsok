'use client';

import { useState } from "react";
import { Box, Container, Typography, Grid, Card, CardContent, Stack } from "@mui/material";
import { motion } from "framer-motion";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import LockIcon from "@mui/icons-material/Lock";
import ShieldIcon from "@mui/icons-material/Shield";

const MotionBox = motion.create(Box);
const MotionCard = motion.create(Card);
const cards = [
  {
    icon: TrendingUpIcon,
    label: "객단가 상승",
    subtitle: "의사당 월 ₩49K~₩149K 추가 매출",
    description:
      "기존 EMR 라이선스에 AI 차트 자동화를 번들링하면, 별도 영업 없이 의사당 월 ₩49,000~₩149,000의 업셀 매출이 발생합니다.",
    metric: "EMR 파트너 70% · Chartsok 30%",
    color: "#4B9CD3",
  },
  {
    icon: LockIcon,
    label: "고객 이탈 방어",
    subtitle: "AI가 만드는 자연스러운 Lock-in",
    description:
      "의료진이 AI 차트 자동화에 익숙해지면, EMR을 교체할 때 가장 아쉬운 기능이 됩니다. 일상 워크플로에 녹아든 AI가 고객 이탈을 방어합니다.",
    color: "#10B981",
  },
  {
    icon: ShieldIcon,
    label: "도입 저항 최소화",
    subtitle: "기존 화면 안에서 바로 작동",
    description:
      "EMR 안에 임베드되므로 별도 교육이 필요 없습니다. 병원의 기존 차트 양식을 그대로 매핑하여 바로 사용할 수 있습니다.",
    metric: "템플릿 3~5개 매핑, 1주 내 적용 완료",
    color: "#8B5CF6",
  },
];

export default function PartnerValue() {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <Box
      id="partner-value"
      sx={{
        py: { xs: 10, md: 14 },
        bgcolor: "grey.50",
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
          <Typography
            variant="overline"
            sx={{
              color: "primary.main",
              mb: 1.5,
              display: "block",
              letterSpacing: 2,
              fontWeight: 700,
              fontSize: { xs: "0.65rem", md: "0.75rem" },
            }}
          >
            PARTNER VALUE
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "1.6rem", sm: "2rem", md: "2.5rem" },
              fontWeight: 800,
              color: "secondary.main",
              mb: 2,
              lineHeight: 1.2,
            }}
          >
            파트너가 얻는 3가지 가치
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              fontSize: { xs: "0.9rem", md: "1.05rem" },
              maxWidth: 600,
              mx: "auto",
              lineHeight: 1.7,
            }}
          >
            추가 영업 비용 없이, 기존 고객 기반에서 바로 매출을 만드세요
          </Typography>
        </MotionBox>

        <Grid container spacing={{ xs: 2.5, md: 4 }}>
          {cards.map((card, index) => {
            const Icon = card.icon;
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
                    border: "2px solid",
                    borderColor: isHovered ? card.color : "grey.100",
                    borderRadius: 3,
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    "&:hover": {
                      boxShadow: `0 16px 40px ${card.color}15`,
                    },
                  }}
                >
                  <CardContent sx={{ p: 4, height: "100%" }}>
                    <Stack spacing={2.5} sx={{ height: "100%" }}>
                      <MotionBox
                        animate={
                          isHovered
                            ? { scale: 1.1, rotate: 5 }
                            : { scale: 1, rotate: 0 }
                        }
                        transition={{ type: "spring", stiffness: 300 }}
                        sx={{
                          width: 64,
                          height: 64,
                          borderRadius: 2.5,
                          bgcolor: isHovered ? card.color : `${card.color}15`,
                          color: isHovered ? "white" : card.color,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "all 0.3s ease",
                        }}
                      >
                        <Icon sx={{ fontSize: 32 }} />
                      </MotionBox>

                      <Typography
                        variant="h5"
                        sx={{
                          fontSize: "1.3rem",
                          fontWeight: 700,
                          color: "secondary.main",
                        }}
                      >
                        {card.label}
                      </Typography>

                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: card.color,
                          fontWeight: 600,
                          fontSize: "0.95rem",
                        }}
                      >
                        {card.subtitle}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          lineHeight: 1.8,
                          flex: 1,
                        }}
                      >
                        {card.description}
                      </Typography>

                      {card.metric && (
                        <Box
                          sx={{
                            mt: 1,
                            p: 1.5,
                            borderRadius: 1.5,
                            bgcolor: `${card.color}08`,
                            border: "1px solid",
                            borderColor: `${card.color}20`,
                          }}
                        >
                          <Typography
                            variant="caption"
                            sx={{
                              color: card.color,
                              fontWeight: 600,
                              fontSize: "0.8rem",
                            }}
                          >
                            {card.metric}
                          </Typography>
                        </Box>
                      )}
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
