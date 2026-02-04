'use client';

import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { motion } from 'framer-motion';

const MotionBox = motion.create(Box);

const faqs = [
  {
    question: '기존 차트 양식을 그대로 사용할 수 있나요?',
    answer:
      '네, 가능합니다. SOAP, 자유 형식, 진료과별 특화 양식 등 기존 EMR 차트 템플릿을 그대로 매핑할 수 있습니다. 필드 매핑과 출력 포맷 커스터마이징 방식으로 진행되며, 템플릿 3~5개 기준으로 3~7일 이내에 적용됩니다. 매핑된 템플릿은 버전 관리가 되며, 이후 업데이트도 지원합니다.',
  },
  {
    question: '연동 개발에는 얼마나 걸리나요?',
    answer:
      'API 연동 기준으로 평균 2~4주 정도 소요됩니다. iFrame 임베딩 방식을 선택하시면 1주 이내에도 가능합니다. 전담 기술 지원팀이 연동의 전 과정을 함께 진행합니다.',
  },
  {
    question: '수익 모델은 어떻게 구성되나요?',
    answer:
      '수익 배분, 도매 단가, 최소 약정 등 다양한 옵션 중에서 선택하실 수 있습니다. 사용량 기반 과금이므로 초기 투자 부담 없이 시작할 수 있으며, 볼륨에 따라 단가가 조정됩니다.',
  },
  {
    question: '환자 데이터는 어디에 저장되나요?',
    answer:
      '국내 리전에 암호화하여 저장됩니다. On-premise 배포도 지원하기 때문에, EMR사 내부 인프라에 직접 설치하는 것도 가능합니다. 저장 위치와 방식은 파트너사의 요구 사항에 맞춰 유연하게 조정할 수 있습니다.',
  },
  {
    question: '파일럿 프로그램은 어떻게 진행되나요?',
    answer:
      'NDA 체결 후 기술 검토, 대표 템플릿 3종 매핑, 샌드박스 파일럿, 병원 PoC(2~3곳), 본 계약 순서로 진행됩니다. 파일럿 기간 동안의 비용은 무료입니다.',
  },
  {
    question: '어떤 진료과를 지원하나요?',
    answer:
      '내과, 가정의학과, 소아청소년과, 정형외과, 피부과, 이비인후과, 안과 등 주요 진료과를 지원하고 있습니다. 진료과별 전문 용어 사전과 템플릿이 미리 탑재되어 있어 빠르게 적용할 수 있습니다.',
  },
  {
    question: '음성 인식에는 어떤 기술이 사용되나요?',
    answer:
      '의료 전문 용어, 약품명, 처치명에 특화된 모델을 적용하여 일반 STT 대비 높은 정확도를 제공합니다. 파일럿 과정에서 실제 진료 환경을 기준으로 정확도를 직접 검증하실 수 있습니다.',
  },
  {
    question: '보안 관련 인증은 어떤 것을 보유하고 있나요?',
    answer:
      'ISMS 인증을 준비 중이며, 개인정보보호법 및 의료법 규정을 준수합니다. AES-256 데이터 암호화, 접근 제어, 감사 로그 등 엔터프라이즈급 보안 체계를 갖추고 있습니다.',
  },
];

export default function PartnerFAQ() {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box
      id="faq"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: '#FAFBFC',
      }}
    >
      <Container maxWidth="md">
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          sx={{ textAlign: 'center', mb: 6 }}
        >
          <Chip
            icon={<HelpOutlineIcon sx={{ fontSize: 16 }} />}
            label="FAQ"
            sx={{
              mb: 2,
              bgcolor: '#EFF6FF',
              color: '#4B9CD3',
              fontWeight: 600,
              border: '1px solid #BFDBFE',
            }}
          />
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              color: '#1E293B',
              mb: 2,
              fontSize: { xs: '1.75rem', md: '2.25rem' },
            }}
          >
            파트너사가 자주 묻는 질문
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: '#64748B', maxWidth: 500, mx: 'auto' }}
          >
            파트너사에서 가장 많이 문의하시는 내용을 모았습니다
          </Typography>
        </MotionBox>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {faqs.map((faq, index) => (
            <MotionBox
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Accordion
                expanded={expanded === `panel${index}`}
                onChange={handleChange(`panel${index}`)}
                elevation={0}
                sx={{
                  border: '1px solid',
                  borderColor: expanded === `panel${index}` ? '#4B9CD3' : '#E2E8F0',
                  borderRadius: '12px !important',
                  '&:before': { display: 'none' },
                  transition: 'border-color 0.2s',
                  overflow: 'hidden',
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: '#4B9CD3' }} />}
                  sx={{
                    px: 3,
                    py: 1,
                    '& .MuiAccordionSummary-content': { my: 1.5 },
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 600,
                      color: expanded === `panel${index}` ? '#4B9CD3' : '#1E293B',
                      fontSize: '0.95rem',
                    }}
                  >
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 3, pb: 3, pt: 0 }}>
                  <Typography
                    sx={{
                      color: '#64748B',
                      lineHeight: 1.8,
                      fontSize: '0.9rem',
                    }}
                  >
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </MotionBox>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
