'use client';

import { Box, Container, Typography, Grid, Card, CardContent, Stack } from "@mui/material";
import { motion } from "framer-motion";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

const MotionBox = motion.create(Box);
const MotionCard = motion.create(Card);

const cards = [
  {
    icon: AccessTimeIcon,
    title: "차트 시간 70% 단축",
    description: "진료 녹음 → AI 요약으로 차트 작성 시간을 대폭 줄입니다",
    color: "#4B9CD3",
  },
  {
    icon: CheckCircleIcon,
    title: "표준화/누락 감소",
    description: "SOAP, 환자 안내문, 후속관리까지 빠짐없이 자동 생성합니다",
    color: "#10B981",
  },
  {
    icon: ChatBubbleOutlineIcon,
    title: "커뮤니케이션 감소",
    description: "환자 안내문 자동 생성으로 전달 누락이 줄어듭니다",
    color: "#8B5CF6",
  },
];

export default function ClinicValue() {
  return (
    <Box
      id="clinic-value"
      sx={{
        py: { xs: 10, md: 14 },
        bgcolor: "white",
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
            CLINIC VALUE
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: "2rem", md: "2.75rem" }, fontWeight: 700, color: "secondary.main", mb: 2 }}>
            병원이 얻는 가치
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", fontSize: { xs: "1rem", md: "1.125rem" }, maxWidth: 600, mx: "auto" }}>
            EMR 파트너를 통해 병원에 전달되는 가치
          </Typography>
        </MotionBox>

        <Grid container spacing={4} justifyContent="center">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
                <MotionCard
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
                  whileHover={{ y: -4 }}
                  elevation={0}
                  sx={{
                    height: "100%",
                    textAlign: "center",
                    border: "1px solid",
                    borderColor: "grey.200",
                    borderRadius: 3,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      borderColor: card.color,
                      boxShadow: `0 8px 24px ${card.color}15`,
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: 2,
                        bgcolor: `${card.color}12`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mx: "auto",
                        mb: 2.5,
                      }}
                    >
                      <Icon sx={{ fontSize: 28, color: card.color }} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: "secondary.main", mb: 1.5, fontSize: "1.1rem" }}>
                      {card.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.7 }}>
                      {card.description}
                    </Typography>
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
