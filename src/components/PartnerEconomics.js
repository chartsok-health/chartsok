'use client';

import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Stack,
  Divider,
} from "@mui/material";
import { motion } from "framer-motion";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import HandshakeIcon from "@mui/icons-material/Handshake";

const MotionBox = motion.create(Box);
const MotionCard = motion.create(Card);

const pricingModels = [
  {
    title: "구독형",
    billing: "의사 단위 월 구독",
    price: "₩49,000~₩149,000",
    priceUnit: "/ 의사 / 월",
    detail: "진료과와 기능 범위에 따라 단가가 조정됩니다",
    revShare: "EMR 70% · Chartsok 30%",
    color: "#4B9CD3",
  },
  {
    title: "건별 과금",
    billing: "차트 생성 건당 과금",
    price: "₩200~₩1,000",
    priceUnit: "/ 차트 1건",
    detail: "월 최소 요금 없이 사용한 만큼만 과금됩니다",
    revShare: "EMR 70% · Chartsok 30%",
    color: "#10B981",
  },
  {
    title: "엔터프라이즈",
    billing: "대형 병원·체인 연간 계약",
    price: "₩3,000만~₩2억",
    priceUnit: "/ 년",
    detail: "전용 인프라, SLA 보장, 맞춤형 AI 모델 제공",
    revShare: "별도 협의",
    color: "#8B5CF6",
  },
];

const volumeTiers = [
  { label: "의사 50명 이하", description: "기본 단가", color: "#4B9CD3" },
  { label: "50~200명", description: "10% 할인", color: "#10B981" },
  { label: "200명 이상", description: "개별 협의 (최대 30% 할인)", color: "#8B5CF6" },
];

const highlights = [
  {
    icon: TrendingUpIcon,
    title: "추가 영업 비용 없음",
    description:
      "기존 EMR 영업팀이 번들로 제안하므로 별도 영업 인력이 필요하지 않습니다",
    color: "#4B9CD3",
  },
  {
    icon: SupportAgentIcon,
    title: "기술·운영 전담 지원",
    description:
      "AI 모델 업데이트, 서버 운영, 장애 대응까지 Chartsok이 전담합니다",
    color: "#10B981",
  },
];

export default function PartnerEconomics() {
  return (
    <Box
      id="economics"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: "white",
      }}
    >
      <Container maxWidth="xl">
        {/* Section Header */}
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
            REVENUE MODEL
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
            파트너 수익 모델
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              fontSize: { xs: "0.9rem", md: "1.05rem" },
              maxWidth: 700,
              mx: "auto",
              lineHeight: 1.7,
            }}
          >
            EMR 파트너는 기존 영업 채널을 그대로 활용하여 추가 수익을 창출합니다
          </Typography>
        </MotionBox>

        {/* Pricing Model Cards - 3 side by side */}
        <Grid container spacing={{ xs: 2.5, md: 4 }} sx={{ mb: { xs: 5, md: 6 } }}>
          {pricingModels.map((model, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <MotionCard
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                whileHover={{ y: -6 }}
                elevation={0}
                sx={{
                  height: "100%",
                  border: "1px solid",
                  borderColor: "grey.200",
                  borderTop: "4px solid",
                  borderTopColor: model.color,
                  borderRadius: 3,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: model.color,
                    boxShadow: `0 12px 32px ${model.color}20`,
                  },
                }}
              >
                <CardContent sx={{ p: 3.5 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: model.color,
                      fontSize: "1.15rem",
                      mb: 2,
                    }}
                  >
                    {model.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      mb: 1.5,
                      lineHeight: 1.7,
                    }}
                  >
                    {model.billing}
                  </Typography>

                  <Box sx={{ mb: 1.5 }}>
                    <Typography
                      variant="h5"
                      component="span"
                      sx={{
                        fontWeight: 800,
                        color: "secondary.main",
                        fontSize: { xs: "1.1rem", md: "1.25rem" },
                      }}
                    >
                      {model.price}
                    </Typography>
                    {model.priceUnit && (
                      <Typography
                        component="span"
                        sx={{
                          color: "text.secondary",
                          fontSize: "0.82rem",
                          fontWeight: 500,
                          ml: 0.5,
                        }}
                      >
                        {model.priceUnit}
                      </Typography>
                    )}
                  </Box>

                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      mb: 2.5,
                      lineHeight: 1.7,
                    }}
                  >
                    {model.detail}
                  </Typography>

                  <Divider sx={{ mb: 2 }} />

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <HandshakeIcon
                      sx={{ fontSize: 18, color: model.color }}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        color: model.color,
                        fontSize: "0.85rem",
                      }}
                    >
                      RevShare: {model.revShare}
                    </Typography>
                  </Box>
                </CardContent>
              </MotionCard>
            </Grid>
          ))}
        </Grid>

        {/* RevShare Highlight Box */}
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          sx={{
            mb: { xs: 5, md: 6 },
            p: { xs: 3, md: 4 },
            borderRadius: 4,
            background: "linear-gradient(135deg, #4B9CD3 0%, #2563EB 100%)",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
            },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              color: "white",
              fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2rem" },
              mb: 1,
              position: "relative",
              lineHeight: 1.3,
            }}
          >
            EMR 파트너 70% : Chartsok 30%
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "rgba(255,255,255,0.95)",
              fontSize: { xs: "1rem", md: "1.15rem" },
              mb: 1.5,
              position: "relative",
            }}
          >
            업계 최고 수준의 파트너 배분율
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "rgba(255,255,255,0.8)",
              fontSize: { xs: "0.85rem", md: "0.95rem" },
              maxWidth: 560,
              mx: "auto",
              lineHeight: 1.7,
              position: "relative",
            }}
          >
            EMR사가 고객 관계를 유지하고, Chartsok은 기술/인프라를 전담합니다
          </Typography>
        </MotionBox>

        {/* Volume Incentive Section */}
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          sx={{ mb: { xs: 5, md: 6 } }}
        >
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              fontWeight: 700,
              color: "secondary.main",
              mb: 3,
              fontSize: { xs: "1.1rem", md: "1.25rem" },
            }}
          >
            볼륨 인센티브
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            {volumeTiers.map((tier, index) => (
              <Chip
                key={index}
                label={
                  <Box sx={{ textAlign: "center", py: 0.5 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 700,
                        color: tier.color,
                        fontSize: "0.85rem",
                      }}
                    >
                      {tier.label}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "text.secondary",
                        fontSize: "0.75rem",
                      }}
                    >
                      {tier.description}
                    </Typography>
                  </Box>
                }
                variant="outlined"
                sx={{
                  height: "auto",
                  py: 1.5,
                  px: 2,
                  borderRadius: 2,
                  borderColor: tier.color,
                  borderWidth: 1.5,
                  "& .MuiChip-label": {
                    px: 1,
                  },
                }}
              />
            ))}
          </Stack>
        </MotionBox>

        {/* Bottom Highlight Cards */}
        <Grid container spacing={{ xs: 2.5, md: 4 }} sx={{ mb: { xs: 4, md: 5 } }}>
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <Grid size={{ xs: 12, sm: 6 }} key={index}>
                <MotionCard
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
                  whileHover={{ y: -4 }}
                  elevation={0}
                  sx={{
                    height: "100%",
                    border: "1px solid",
                    borderColor: "grey.200",
                    borderLeft: "4px solid",
                    borderLeftColor: item.color,
                    borderRadius: 3,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      borderColor: item.color,
                      boxShadow: `0 8px 24px ${item.color}15`,
                    },
                  }}
                >
                  <CardContent sx={{ p: 3.5 }}>
                    <Stack
                      direction="row"
                      alignItems="flex-start"
                      spacing={2}
                    >
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 2,
                          bgcolor: `${item.color}15`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Icon sx={{ fontSize: 24, color: item.color }} />
                      </Box>
                      <Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            color: "secondary.main",
                            fontSize: "1.05rem",
                            mb: 0.75,
                          }}
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.secondary",
                            lineHeight: 1.7,
                          }}
                        >
                          {item.description}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </MotionCard>
              </Grid>
            );
          })}
        </Grid>

        {/* Disclaimer */}
        <MotionBox
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          sx={{ textAlign: "center" }}
        >
          <Typography
            variant="caption"
            sx={{
              color: "text.disabled",
              fontSize: "0.8rem",
            }}
          >
            위 가격은 표준 기준이며, 파트너 규모와 계약 조건에 따라 조정됩니다.
            정확한 견적은 파트너 미팅에서 안내드립니다.
          </Typography>
        </MotionBox>
      </Container>
    </Box>
  );
}
