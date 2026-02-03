'use client';

import { useParams } from 'next/navigation';
import {
  Box,
  Container,
  Typography,
  Chip,
  Button,
  Avatar,
  Card,
  Grid,
  Snackbar,
} from '@mui/material';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ShareIcon from '@mui/icons-material/Share';
import { useI18n } from '@/lib/i18n';

const MotionBox = motion.create(Box);

const blogContent = {
  'why-we-built-chartsok': {
    ko: {
      title: '왜 차트쏙을 만들었나: 아버지의 40년에서 시작된 이야기',
      category: '창업 이야기',
      author: '박준호',
      authorRole: 'CEO & 공동창업자',
      date: '2026년 1월 30일',
      readTime: '6분',
      content: `
## 아버지의 한마디

"아들아, 나는 40년간 환자에게 정성을 다하고 싶었어. 그런데 차트 쓰는 시간이 너무 많았어."

이비인후과 전문의로 40년을 보낸 아버지의 말씀이었습니다. 대학병원 수련, 외래교수, 개원, 종합병원 과장, 공공의료원 — 다양한 환경에서 환자를 봐왔지만, 한 가지는 항상 같았습니다. 진료가 끝나면 차트를 써야 하고, 차트를 쓰는 동안 환자의 눈을 볼 수 없었다는 것.

## 진료 후 30분의 문제

의사들의 하루를 관찰하면, 진료 자체보다 진료 후 업무에 더 많은 에너지가 소모됩니다.

- **차트 작성**: 환자와의 대화를 떠올리며 SOAP 형식으로 정리
- **환자 안내문 작성**: 복약 지도, 생활 수칙, 다음 방문 안내
- **리콜 관리**: 재내원 대상 파악, 리마인더 정리
- **EMR 입력**: 생성한 기록을 EMR 시스템에 맞춰 입력

이 과정이 환자 한 명당 10~15분. 하루 30명을 보면 진료 후 업무만 5시간이 넘습니다.

## 기술로 풀 수 있다는 확신

저는 미국에서 컴퓨터공학을 전공하고, 테크 기업에서 풀스택 개발자로 일했습니다. AI/ML, 클라우드 인프라, 데이터 보안 — 이 기술들을 조합하면 아버지가 겪은 문제를 풀 수 있겠다는 확신이 있었습니다.

하지만 기술만으로는 안 됩니다. 의료 현장을 모르면 쓸모없는 제품이 나옵니다. 아버지의 40년 임상 경험이 제품 설계의 핵심이 된 이유입니다.

## chartsok이 풀려는 문제

차트쏙은 "AI 메디컬 스크라이브"에서 시작하지만, 거기서 멈추지 않습니다.

**1단계: 기록** — 진료 중 대화를 듣고, 자동으로 SOAP 차트를 생성합니다.
**2단계: 안내** — 환자에게 전달할 안내문을 자동으로 작성합니다.
**3단계: 액션** — 재내원 리마인더, 추가 검사 예약 등 후속 조치를 정리합니다.

요약에서 끝나는 서비스가 아니라, 진료 후 워크플로우 전체를 돕는 도구를 만들고 있습니다.

## 앞으로의 방향

차트쏙은 EMR을 대체하지 않습니다. 기존 EMR 옆에서 작동하며, 클리닉의 실제 워크플로우에 맞춰 적용됩니다. PoC와 파일럿을 통해 병원별 맞춤 세팅을 제공합니다.

아버지가 40년간 바랐던 것은 단순합니다. 환자의 눈을 보며 진료하는 것. 그 단순한 바람을 기술로 실현하는 것이 차트쏙의 미션입니다.
      `,
    },
    en: {
      title: 'Why We Built ChartSok: A Story Born From 40 Years of Practice',
      category: 'Founder Story',
      author: 'Junho Park',
      authorRole: 'CEO & Co-founder',
      date: 'January 30, 2026',
      readTime: '6 min',
      content: `
## My Father's Words

"Son, for 40 years I wanted to give my patients heartfelt care. But I spent so much time writing charts."

These were the words of my father, who spent 40 years as an ENT specialist. University hospital residency, adjunct professor, private clinic, hospital department head, public medical center — he practiced in every setting, but one thing never changed: after every consultation, he had to write charts, and while writing, he couldn't look his patients in the eye.

## The 30-Minute Problem After Every Visit

When you observe a doctor's day, more energy goes into post-visit work than the visits themselves.

- **Chart writing**: Recalling the conversation and organizing into SOAP format
- **Patient instructions**: Medication guidance, lifestyle advice, next visit info
- **Recall management**: Identifying return patients, organizing reminders
- **EMR entry**: Transferring records into the EMR system

This takes 10-15 minutes per patient. See 30 patients a day, and post-visit work alone exceeds 5 hours.

## Conviction That Technology Could Solve This

I studied computer science in the US and worked as a full-stack developer at a tech company. AI/ML, cloud infrastructure, data security — I was convinced that combining these technologies could solve the problem my father experienced.

But technology alone isn't enough. Without understanding the clinical environment, you build a useless product. That's why my father's 40 years of clinical experience is the foundation of our product design.

## The Problem ChartSok Is Solving

ChartSok starts with "AI medical scribe" but doesn't stop there.

**Step 1: Record** — Listens to the consultation and auto-generates SOAP charts.
**Step 2: Instruct** — Auto-creates patient instruction sheets.
**Step 3: Act** — Organizes follow-up actions like return reminders and test scheduling.

We're not building a service that stops at summaries. We're building a tool that supports the entire post-visit workflow.

## The Road Ahead

ChartSok doesn't replace your EMR. It works alongside it, adapting to your clinic's actual workflow. Through PoC and pilot programs, we provide custom setup for each hospital.

What my father wanted for 40 years was simple: to look his patients in the eye during consultations. Making that simple wish a reality through technology is ChartSok's mission.
      `,
    },
  },
  'soap-chart-with-ai': {
    ko: { title: 'SOAP 차트 작성, AI가 대신해준다면?', category: '제품 인사이트', author: '박준호', authorRole: 'CEO & 공동창업자', date: '2026년 1월 26일', readTime: '7분', content: `
## SOAP 차트란?

SOAP는 의료 기록의 표준 형식입니다. Subjective(주관적 소견), Objective(객관적 소견), Assessment(평가), Plan(계획)의 네 섹션으로 구성됩니다. 전 세계 의사들이 사용하는 검증된 형식이지만, 매번 수작업으로 작성하는 것은 상당한 시간과 노력이 필요합니다.

## 수작업 SOAP 작성의 문제점

**기억에 의존하는 기록**: 진료가 끝난 후 환자와의 대화를 떠올려 작성합니다. 환자가 많은 날에는 기억이 섞이기도 합니다.

**표준화의 어려움**: 같은 증상이라도 의사마다 기록 스타일이 다릅니다.

**시간 소모**: 환자 한 명당 평균 5~10분의 차트 작성 시간. 하루 20~30명 진료 시, 차트만 2~5시간이 소요됩니다.

## AI SOAP 자동 생성의 원리

차트쏙의 AI SOAP 생성은 다음 과정을 거칩니다.

**1. 음성 수집**: 진료 중 대화를 녹음합니다. 별도의 장비 없이, 태블릿이나 스마트폰으로 충분합니다.

**2. STT (Speech-to-Text)**: 음성을 텍스트로 변환합니다. 한국어 의학 용어에 특화된 모델을 사용합니다.

**3. 화자 분리**: AI가 의사와 환자의 발화를 자동으로 구분합니다.

**4. SOAP 구조화**: 변환된 텍스트를 S, O, A, P 각 섹션에 적절히 배치합니다.

**5. 의학 용어 정제**: 구어체 표현을 의학적 표기로 변환합니다. "머리가 아파요"가 "두통(headache)"으로, "목이 뻣뻣해요"가 "경부 근육 긴장"으로 정리됩니다.

## 현재의 한계와 차트쏙의 접근

AI가 완벽한 차트를 만들어주는 것은 아닙니다. 소음이 많은 환경에서 음성 인식률이 떨어질 수 있고, 희귀 질환의 경우 맥락 파악이 어려울 수 있습니다. Assessment 섹션은 의사의 판단이 반드시 필요합니다.

차트쏙은 "AI가 80%를 작성하고, 의사가 20%를 확인하고 수정하는" 모델을 지향합니다. 빈 캔버스에서 시작하는 것보다 이미 80%가 채워진 차트를 수정하는 것이 훨씬 빠릅니다.

## SOAP 이후: 안내문과 후속 조치

차트쏙이 다른 AI 스크라이브와 다른 점은, SOAP 생성 이후에도 작동한다는 것입니다. SOAP 차트에서 자동으로 환자 안내문을 생성하고, Plan 섹션을 기반으로 후속 조치를 정리합니다. 차트 작성이 끝이 아니라 시작인 이유입니다.
    ` },
    en: { title: 'What If AI Wrote Your SOAP Charts?', category: 'Product Insight', author: 'Junho Park', authorRole: 'CEO & Co-founder', date: 'January 26, 2026', readTime: '7 min', content: `
## What Is a SOAP Chart?

SOAP is the standard format for medical documentation: Subjective, Objective, Assessment, and Plan. A proven format used worldwide, but manual writing takes significant time.

## Problems With Manual SOAP Writing

**Memory-dependent records**: Charts written after the visit rely on recall. On busy days, details blur.

**Standardization difficulty**: Different doctors write the same symptoms differently.

**Time consumption**: 5-10 minutes per patient. With 20-30 patients, charting takes 2-5 hours daily.

## How AI SOAP Generation Works

**1. Audio capture**: Record the consultation — tablet or smartphone works.

**2. STT**: Convert audio to text using Korean medical terminology models.

**3. Speaker diarization**: AI separates doctor and patient speech.

**4. SOAP structuring**: Place text into appropriate S, O, A, P sections.

**5. Medical term refinement**: Convert colloquial to medical notation. "My head hurts" becomes "headache (cephalgia)."

## Current Limits and ChartSok's Approach

AI doesn't produce perfect charts. ChartSok aims for "AI writes 80%, doctor reviews 20%." Reviewing an 80%-complete chart is far faster than starting from blank.

## Beyond SOAP

ChartSok keeps working after the SOAP note — auto-generating patient instructions and organizing follow-up actions. Charting isn't the end, it's the beginning.
    ` },
  },
  'emr-without-switching': {
    ko: { title: 'EMR을 바꾸지 않고도 차트 시간을 줄이는 법', category: '제품 인사이트', author: '박준호', authorRole: 'CEO & 공동창업자', date: '2026년 1월 22일', readTime: '5분', content: `
## "EMR을 바꿔야 하나요?"

병원에 AI 차트 솔루션을 소개하면 가장 먼저 받는 질문입니다. 답은 간단합니다. 바꾸지 않아도 됩니다.

EMR 시스템 교체는 병원에게 엄청난 부담입니다. 차트쏙은 이 현실을 인정하고, 기존 EMR "옆에서" 작동하는 설계를 선택했습니다.

## 단계별 연동 방식

### 1단계: 클립보드 복사 (지금 바로 가능)

차트쏙이 생성한 SOAP 차트, 환자 안내문, 후속 조치 내역을 클립보드에 복사하고, EMR에 붙여넣기 합니다. EMR의 입력 필드 구조에 맞춰 출력을 구성하기 때문에, 복사 후 추가 편집이 최소화됩니다.

### 2단계: EMR 필드 매핑 (맞춤 설정)

병원마다 사용하는 EMR이 다르고, 입력 필드의 구성도 다릅니다. 차트쏙은 PoC/파일럿 과정에서 해당 병원의 EMR 필드 구조를 파악하고, 출력 형식을 맞춰줍니다.

### 3단계: API 직접 연동 (준비 중)

클립보드 복사 없이, 차트쏙에서 생성된 기록이 EMR에 직접 전송되는 방식입니다. 현재 주요 EMR 벤더들과 연동 가능성을 검토하고 있습니다.

## 실제 효과

EMR을 교체하지 않고 클립보드 방식만으로도 차트 작성 시간이 환자당 10분에서 2~3분으로 줄어듭니다. AI 기반 표준화로 의무기록 품질이 향상되고, 리콜 대상 자동 정리로 놓치는 환자가 감소합니다.

기존 시스템을 유지하면서 점진적으로 도입할 수 있다는 것이 차트쏙의 핵심 설계 원칙입니다.
    ` },
    en: { title: 'Cut Chart Time Without Switching Your EMR', category: 'Product Insight', author: 'Junho Park', authorRole: 'CEO & Co-founder', date: 'January 22, 2026', readTime: '5 min', content: `
## "Do I Have to Switch My EMR?"

The first question we get. Answer: no. Switching EMR is a massive burden. ChartSok works "alongside" your existing EMR.

## Step-by-Step Integration

### Step 1: Clipboard Copy (Available Now)

Copy SOAP charts, patient instructions, and follow-up actions to clipboard and paste into EMR. Output structured for your EMR fields.

### Step 2: EMR Field Mapping (Custom Setup)

During PoC/pilot, ChartSok maps to your specific EMR field layout.

### Step 3: Direct API Integration (In Progress)

Records sent directly to your EMR without clipboard. Exploring integration with major EMR vendors.

## Real Impact

Even clipboard-only: chart time drops from 10 min to 2-3 min per patient, record consistency improves, recall management automated. Gradual adoption while maintaining current systems is ChartSok's core principle.
    ` },
  },
  'voice-recognition-in-clinics': {
    ko: { title: '진료실 음성인식, 어디까지 왔나', category: '의료 AI', author: '박준호', authorRole: 'CEO & 공동창업자', date: '2026년 1월 18일', readTime: '8분', content: `
## 음성인식의 진화

5년 전만 해도 한국어 음성인식의 정확도는 일상 대화 기준 85% 수준이었습니다. 2026년 현재, 일반 한국어 음성인식은 95%를 넘었습니다. 하지만 의료 현장에서는 이야기가 다릅니다.

## 진료실이 어려운 이유

### 의학 용어의 벽

"비중격만곡증", "이관기능장애", "갑상선결절" — 일상에서 거의 사용하지 않는 단어들이 진료실에서는 핵심 키워드입니다. 범용 음성인식 모델은 이런 단어들을 오인식합니다.

### 화자 분리의 도전

진료 대화에서 의사와 환자의 발화를 구분하는 것은 SOAP 차트 생성의 전제 조건입니다. 화자 분리가 부정확하면 차트 전체가 틀어집니다.

### 소음과 환경

진료실은 조용하지 않습니다. 의료 기기 소리, 보호자의 말, 전화벨 — 다양한 소음 속에서 핵심 대화를 추출해야 합니다.

## 차트쏙의 접근법

**1. 전문과별 의학 용어 사전**: 각 전문과에서 자주 사용하는 용어를 별도로 학습한 모델을 적용합니다.

**2. 맥락 기반 후처리**: 진료 맥락을 고려하여 오인식된 단어를 교정합니다.

**3. 지속적 학습**: 의사가 AI 생성 차트를 수정할 때마다 수정 패턴을 학습합니다.

## 100% 정확도는 목표가 아닙니다

차트쏙의 목표는 "의사가 빈 캔버스에서 시작하지 않아도 되는 수준"입니다. AI가 80-90%를 잡아주고, 의사가 나머지를 확인하는 것. 10분 걸리던 차트 작성이 2-3분으로 줄어드는 것이 현재 기술로 제공할 수 있는 현실적인 가치입니다.
    ` },
    en: { title: 'Voice Recognition in Clinics: How Far Have We Come?', category: 'Medical AI', author: 'Junho Park', authorRole: 'CEO & Co-founder', date: 'January 18, 2026', readTime: '8 min', content: `
## The Evolution of Speech Recognition

Five years ago, Korean ASR was around 85% accurate. In 2026, general Korean ASR exceeds 95%. But clinical settings are different.

## Why Clinics Are Harder

### Medical Terminology

"Nasal septal deviation," "Eustachian tube dysfunction," "thyroid nodule" — essential clinical keywords that general ASR misrecognizes.

### Speaker Diarization

Separating doctor and patient speech is a prerequisite for SOAP generation. Inaccurate separation breaks the entire chart.

### Noise

Clinics aren't quiet. Medical equipment, family members, phones — core conversation must be extracted from noise.

## ChartSok's Approach

**1. Specialty dictionaries**: Models trained on each specialty's terminology.

**2. Context-based post-processing**: Clinical context corrects misrecognized words.

**3. Continuous learning**: Doctor edits teach correction patterns.

## 100% Accuracy Isn't the Goal

ChartSok's goal: doctors don't start from blank. AI handles 80-90%, doctor reviews the rest. Chart writing drops from 10 min to 2-3 min — realistic value from current technology.
    ` },
  },
  'doctor-burnout-after-clinic': {
    ko: { title: '의사 번아웃의 숨은 원인: 진료 후 30분', category: '클리닉 운영', author: '박준호', authorRole: 'CEO & 공동창업자', date: '2026년 1월 14일', readTime: '5분', content: `
## 진료는 끝났지만 업무는 끝나지 않았다

의사의 번아웃을 이야기할 때, 대부분은 과도한 환자 수와 감정 노동을 떠올립니다. 하지만 아버지와 대화하면서 깨달은 것이 있습니다. 가장 지치게 하는 것은 진료 그 자체가 아니라, 진료가 끝난 후의 업무라는 것.

## 진료 후 30분의 실체

환자 한 명의 진료가 끝나면 다음 업무가 기다립니다.

- **차트 작성 (5~10분)**: 대화 내용을 떠올리며 SOAP 형식으로 작성
- **환자 안내문 (3~5분)**: 복약 지도, 주의사항, 다음 방문 일정 정리
- **리콜/후속 관리 (2~3분)**: 재내원 대상 확인, 리마인더 설정
- **EMR 입력 (2~3분)**: 작성한 기록을 EMR에 입력

환자 한 명당 합산 10~20분. 하루 30명이면 진료 후 업무만 5~10시간입니다.

## 번아웃의 연쇄 반응

기록 품질이 하락하고, 리콜 대상을 놓치고, 퇴근이 늦어집니다. 이 순환이 반복되면 번아웃은 피할 수 없습니다.

## 기술이 30분을 5분으로 줄일 수 있다

차트쏙은 이 "진료 후 30분"을 타겟합니다. 차트 자동 생성, 안내문 자동 작성, 후속 조치 자동 정리, EMR 클립보드 복사. 기술이 행정 업무를 줄여주면, 의사는 원래 하고 싶었던 일에 집중할 수 있습니다.
    ` },
    en: { title: 'The Hidden Cause of Doctor Burnout: 30 Minutes After the Visit', category: 'Clinic Operations', author: 'Junho Park', authorRole: 'CEO & Co-founder', date: 'January 14, 2026', readTime: '5 min', content: `
## The Visit Is Over, but the Work Isn't

Most think of patient volume and emotional labor. But the most exhausting part isn't consultations — it's the work after.

## 30 Minutes Post-Visit

Per patient: chart (5-10 min), instructions (3-5 min), recall (2-3 min), EMR entry (2-3 min). That's 10-20 min each. 30 patients = 5-10 hours of post-visit work.

## The Chain Reaction

Record quality drops, return patients are missed, hours extend. This cycle leads to burnout.

## Technology Turns 30 Into 5

ChartSok targets these "30 minutes." Auto charts, auto instructions, auto follow-up, clipboard EMR entry. When technology handles admin, doctors focus on patient care.
    ` },
  },
  'why-specialty-ai-models': {
    ko: { title: '전문과별 AI 모델은 왜 필요한가', category: '의료 AI', author: '박준호', authorRole: 'CEO & 공동창업자', date: '2026년 1월 10일', readTime: '6분', content: `
## 내과 차트와 이비인후과 차트는 다르다

같은 SOAP 형식이라도 전문과에 따라 내용과 구조가 완전히 다릅니다. 범용 AI 모델에게 "SOAP 차트를 써라"고 하면, 어떤 전문과의 맥락에서 써야 하는지 알 수 없습니다.

## 전문과별 차이가 나타나는 지점

### 용어와 약어

- 내과: HTN, DM, HbA1c, LFT
- 이비인후과: PNS CT, AOM, FESS, DNS
- 정형외과: ROM, MRI, ACL, McMurray test
- 피부과: BSA, PASI, KOH, Wood's lamp

### 진료 패턴

내과 진료는 대화가 길고 여러 계통을 확인합니다. 이비인후과는 검사 결과 중심입니다. 소아과는 보호자 대화 비중이 높아 화자 구분이 복잡해집니다.

## 차트쏙의 전문과별 AI 모델

현재 6개 전문과 — 내과, 이비인후과, 정형외과, 피부과, 소아과, 정신건강의학과 — 에 대한 AI 모델을 개발하고 있습니다. 전문과별 모델의 차트 정확도가 범용 모델 대비 평균 25~30% 높은 것을 확인하고 있습니다.

## 맞춤화의 다음 단계

전문과를 넘어, 개별 의사의 진료 스타일에 맞춰 AI가 적응하는 것이 다음 목표입니다. 사용할수록 해당 의사의 패턴을 학습합니다.
    ` },
    en: { title: 'Why Specialty-Specific AI Models Matter', category: 'Medical AI', author: 'Junho Park', authorRole: 'CEO & Co-founder', date: 'January 10, 2026', readTime: '6 min', content: `
## An Internal Medicine Chart Is Not an ENT Chart

Even within SOAP, content differs completely by specialty. Generic AI doesn't know which specialty's context to use.

## Where Differences Emerge

### Terminology

- Internal Medicine: HTN, DM, HbA1c, LFT
- ENT: PNS CT, AOM, FESS, DNS
- Orthopedics: ROM, MRI, ACL, McMurray test
- Dermatology: BSA, PASI, KOH, Wood's lamp

### Clinical Patterns

Internal medicine has longer conversations. ENT centers on exam results. Pediatrics involves caregivers.

## ChartSok's Specialty Models

Developing models for 6 specialties. Specialty models achieve 25-30% higher accuracy versus general-purpose models.

## Next Level

Beyond specialty — AI adapts to individual physician clinical styles through continuous learning.
    ` },
  },
  'patient-instructions-automation': {
    ko: { title: '환자 안내문, 수작업에서 자동화로', category: '제품 인사이트', author: '박준호', authorRole: 'CEO & 공동창업자', date: '2026년 1월 6일', readTime: '5분', content: `
## 진료 후 환자에게 뭘 전달하고 계신가요?

진료가 끝나면 환자에게 안내해야 할 것들이 있습니다. 처방 약의 복용법, 생활 수칙, 주의사항, 다음 방문 일정. 이 정보를 구두로만 전달하면 환자는 대부분 잊어버립니다.

종이 안내문을 만들어 전달하는 병원도 있지만, 매번 환자 상황에 맞게 작성하는 것은 현실적으로 어렵습니다.

## 맞춤형 안내문의 가치

**치료 순응도 향상**: 자신의 상태와 치료 계획이 명확히 적힌 안내문을 받은 환자는 처방을 더 잘 따릅니다.

**재내원율 향상**: "1주일 후 재방문" 문구가 적힌 안내문은 재내원 확률을 높입니다.

**의료 분쟁 예방**: 서면 안내는 구두 설명보다 법적 보호 효과가 큽니다.

## 차트쏙의 자동 안내문 생성

차트쏙은 SOAP 차트 생성과 동시에 환자 안내문을 자동으로 만듭니다. 진료 내용에서 환자 상태를 파악하고, Plan 섹션에서 처방과 주의사항을 추출하여 환자가 이해할 수 있는 쉬운 언어로 변환합니다.

복사, 인쇄, 카카오톡 전송까지 한 번에 가능합니다. 의사는 생성된 안내문을 확인하고 필요하면 수정한 후 전달하면 됩니다.

## 안내문이 만드는 차이

잘 만들어진 환자 안내문은 환자 만족도를 높이고, 재내원율을 올리고, 의료 분쟁을 예방합니다. 차트 작성의 부산물이 아니라, 클리닉 운영의 핵심 도구입니다.
    ` },
    en: { title: 'From Manual to Automated: Patient Instructions', category: 'Product Insight', author: 'Junho Park', authorRole: 'CEO & Co-founder', date: 'January 6, 2026', readTime: '5 min', content: `
## What Do You Give Patients After a Visit?

After consultations, patients need medication instructions, lifestyle guidance, precautions, next visit schedule. Verbal-only delivery means most is forgotten.

## The Value of Personalized Instructions

**Better compliance**: Patients with clear personalized instructions follow prescriptions better.

**Higher return rates**: Written return instructions increase follow-up compliance.

**Dispute prevention**: Written instructions provide stronger legal protection.

## ChartSok's Auto-Generated Instructions

ChartSok creates instructions simultaneously with SOAP charts. It extracts patient condition and plan details, converting to patient-friendly language. Copy, print, or message — all in one click.

## The Difference Instructions Make

Well-crafted instructions improve satisfaction, increase returns, and prevent disputes. A core clinic operations tool, not a charting byproduct.
    ` },
  },
  'recall-management-revenue': {
    ko: { title: '리콜 관리가 매출에 미치는 영향', category: '클리닉 운영', author: '박준호', authorRole: 'CEO & 공동창업자', date: '2026년 1월 2일', readTime: '6분', content: `
## 놓치는 환자 = 잃어버리는 매출

"1주일 후에 오세요"라고 말했지만, 실제로 돌아오는 환자는 몇 명일까요? 수작업으로 리콜 대상을 관리하는 병원에서는 재내원율이 60~70% 수준에 머무릅니다. 나머지 30~40%는 까먹거나, 귀찮거나, 다른 병원으로 갑니다.

## 리콜 관리의 현실

대부분의 클리닉에서 리콜 관리는 의사가 구두로 전달하고, 접수 직원이 수기로 메모하거나 엑셀에 정리합니다. 바쁜 날에는 누락되고, 리마인더 전화/문자도 사람이 해야 합니다.

## 자동화가 가져오는 변화

차트쏙은 SOAP 차트의 Plan 섹션에서 재내원 정보를 자동으로 추출합니다. "1주 후 f/u" → 1주 후 재내원 대상 등록. "증상 지속 시 MRI" → 조건부 후속 검사 대상 등록. 접수 직원이 수기로 정리하지 않아도, 진료와 동시에 리콜 대상이 자동 정리됩니다.

## 매출에 미치는 실제 영향

재내원율이 10% 올라가면, 하루 30명 진료 중 재내원 대상 15명 기준으로 월 50명, 연 600명의 추가 내원이 발생합니다. 소규모 클리닉에서도 연간 수천만 원의 매출 차이가 가능합니다.

## 환자 건강에도 좋다

매출만의 문제가 아닙니다. 재내원해야 할 환자가 빠지면 경과 관찰이 되지 않습니다. 리콜 자동화는 환자의 치료 연속성을 보장하는 도구이기도 합니다.
    ` },
    en: { title: 'How Recall Management Impacts Revenue', category: 'Clinic Operations', author: 'Junho Park', authorRole: 'CEO & Co-founder', date: 'January 2, 2026', readTime: '6 min', content: `
## Missing Patients = Lost Revenue

"Come back in a week" — but how many return? Manual recall management sees 60-70% return rates. The rest forget, can't be bothered, or visit elsewhere.

## What Automation Changes

ChartSok auto-extracts return info from SOAP Plan. "1-week f/u" → auto-registered. No manual work needed — recall targets organized during consultation.

## Revenue Impact

10% return rate increase: 15 recall targets/day, 50 additional monthly visits, 600 annually. Significant revenue even for small clinics.

## Better for Patients

Beyond revenue — missed returns mean unmonitored conditions. Recall automation ensures care continuity.
    ` },
  },
  'medical-data-security-basics': {
    ko: { title: '의료 데이터 보안, 어디까지 챙겨야 하나', category: '보안/규정', author: '박준호', authorRole: 'CEO & 공동창업자', date: '2025년 12월 28일', readTime: '7분', content: `
## AI 도입 전에 확인해야 할 것

AI 차트 서비스를 도입할 때 가장 중요한 질문은 "정확도가 높은가?"가 아닙니다. "환자 데이터를 어떻게 다루는가?"입니다.

## 핵심 체크리스트

### 1. 음성 파일 처리

음성 파일이 서버에 저장되는가? 텍스트 변환 후 즉시 삭제되는가? 차트쏙은 음성 파일을 변환 직후 삭제합니다.

### 2. 텍스트 데이터 보관

변환된 텍스트의 보관 기간은 누가 결정하는가? 차트쏙은 병원이 직접 설정합니다 (즉시 삭제 / 7일 / 30일).

### 3. 암호화

데이터 전송 시 TLS, 저장 시 AES-256 암호화가 적용되는가? 차트쏙은 전송과 저장 모두 암호화합니다.

### 4. 접근 권한

역할 기반 접근 제어(RBAC)가 있는가? 차트쏙은 의사, 간호사, 접수 등 역할별 접근 권한을 분리합니다.

### 5. 법규 준수

개인정보보호법, 의료법 준수 여부. 차트쏙은 국내 규정을 준수하며 정기적으로 검토합니다.

## "최소 수집" 원칙

차트쏙의 데이터 처리 철학은 단순합니다. 필요한 최소한의 데이터만 수집하고, 가능한 빨리 삭제합니다. 더 오래 보관한다고 더 좋은 서비스가 되는 것이 아닙니다.
    ` },
    en: { title: 'Medical Data Security: What You Need to Check', category: 'Security', author: 'Junho Park', authorRole: 'CEO & Co-founder', date: 'December 28, 2025', readTime: '7 min', content: `
## What to Verify Before AI Adoption

The key question isn't "How accurate?" It's "How does it handle patient data?"

## Essential Checklist

### 1. Audio Files

Are they stored? Deleted after transcription? ChartSok deletes immediately.

### 2. Text Retention

Who decides retention period? ChartSok lets hospitals configure (immediate/7/30 days).

### 3. Encryption

TLS in transit, AES-256 at rest. ChartSok encrypts both.

### 4. Access Control

Role-based (doctor, nurse, front desk). ChartSok separates access by role.

### 5. Compliance

Korean PIPA and Medical Act compliance, regularly reviewed.

## Minimal Collection Principle

Collect minimum necessary, delete ASAP. Longer retention doesn't mean better service.
    ` },
  },
  'ai-scribe-comparison-2025': {
    ko: { title: '2025년 AI 메디컬 스크라이브 비교: 요약에서 끝나면 안 되는 이유', category: '의료 AI', author: '박준호', authorRole: 'CEO & 공동창업자', date: '2025년 12월 22일', readTime: '8분', content: `
## AI 메디컬 스크라이브 시장의 현재

국내외에서 다양한 AI 메디컬 스크라이브 서비스가 등장하고 있습니다. 대부분 공통 기능: 진료 녹음 → STT → AI 요약/차트 생성. 하지만 서비스마다 중요한 차이가 있습니다.

## 비교 기준 1: 요약에서 끝나는가?

대부분의 AI 스크라이브는 SOAP 생성에서 끝납니다. 차트 이후에도 해야 할 일 — 안내문, 리콜, 후속 검사, EMR 입력 — 이 남습니다. 차트쏙은 전체 워크플로우를 돕습니다.

## 비교 기준 2: EMR 연동 방식

일부는 텍스트만 제공, 일부는 특정 EMR 전용. 차트쏙은 EMR 필드 매핑 + 클립보드 + API 연동을 준비합니다.

## 비교 기준 3: 전문과 특화

범용 AI는 전문과 차이를 반영하지 못합니다. 차트쏙은 전문과별 모델로 정확도를 높입니다.

## 비교 기준 4: 데이터 보안

음성 보관 여부, 텍스트 보관 설정, 병원 삭제 권한. 차트쏙은 음성 즉시 삭제, 보관 기간 병원 설정, AES-256 기본 제공합니다.

## 선택할 때 물어야 할 질문

1. SOAP 요약 이후에 뭘 더 해주나?
2. 우리 EMR에 어떻게 연결되나?
3. 우리 전문과에 맞춰져 있나?
4. 환자 데이터는 어떻게 다루나?
5. PoC/파일럿 과정은 어떻게 되나?
    ` },
    en: { title: '2025 AI Medical Scribe Comparison: Why Summaries Aren\'t Enough', category: 'Medical AI', author: 'Junho Park', authorRole: 'CEO & Co-founder', date: 'December 22, 2025', readTime: '8 min', content: `
## The Market

Various AI medical scribes have emerged. Most share core features: recording → STT → chart generation. But differences matter.

## Criterion 1: Beyond Summaries?

Most stop at SOAP. Post-chart work remains. ChartSok covers the full workflow.

## Criterion 2: EMR Integration

Some: text only. Some: specific EMR only. ChartSok: field mapping + clipboard + API.

## Criterion 3: Specialty

Generic AI treats all specialties the same. ChartSok builds specialty-specific models.

## Criterion 4: Security

Audio retention, text configuration, deletion authority. ChartSok: immediate audio deletion, hospital-configured retention, AES-256.

## Questions to Ask

What happens after SOAP? How does it connect to our EMR? Is it tuned for our specialty? How is data handled? What's the PoC process?
    ` },
  },
  'clinic-workflow-optimization': {
    ko: { title: '소규모 클리닉 워크플로우 최적화 가이드', category: '클리닉 운영', author: '박준호', authorRole: 'CEO & 공동창업자', date: '2025년 12월 15일', readTime: '7분', content: `
## 의사 1~3명 클리닉의 현실

대형 병원과 달리, 소규모 클리닉은 IT 전담 인력도 없고 시스템 도입 예산도 한정적입니다. 그래서 오히려 효율이 더 중요합니다.

## 단계별 최적화 포인트

### 1단계: 접수

- 문제: 환자 정보 확인에 시간 소모
- 개선: 사전 문진 디지털화 (태블릿 or 카카오톡 링크)
- 효과: 접수 시간 50% 단축

### 2단계: 진료

- 문제: EMR 타이핑으로 환자 소통 저하
- 개선: AI 진료 녹음 + 자동 차트 생성
- 효과: 차트 작성 시간 70% 감소

### 3단계: 진료 후

- 문제: 차트 + 안내문 + 리콜에 환자당 10~15분
- 개선: AI 자동 생성
- 효과: 환자당 2~3분으로 단축

### 4단계: EMR 입력

- 문제: 이중 작업
- 개선: 클립보드 복사 or API 연동
- 효과: 10초 내 완료

### 5단계: 후속 관리

- 문제: 수기 관리로 누락 발생
- 개선: 자동 리콜 + 리마인더
- 효과: 재내원율 10~15% 향상

## 핵심 원칙

"큰 시스템 도입"이 아니라 "각 단계의 병목 제거"입니다. 가장 시간이 걸리는 단계부터 자동화하는 것이 현실적입니다.
    ` },
    en: { title: 'Small Clinic Workflow Optimization Guide', category: 'Clinic Operations', author: 'Junho Park', authorRole: 'CEO & Co-founder', date: 'December 15, 2025', readTime: '7 min', content: `
## 1-3 Doctor Clinic Reality

Small clinics have limited resources. That's why efficiency matters more.

## Step-by-Step Optimization

### Check-in: Digitize pre-visit questionnaires → 50% faster

### Consultation: AI recording + auto charts → 70% less charting

### Post-Visit: AI auto-generation → 2-3 min per patient (vs 10-15)

### EMR Entry: Clipboard/API → 10 seconds

### Follow-up: Auto recall → 10-15% higher return rate

## Core Principle

Not "big system adoption" but "removing bottlenecks." Automate the most time-consuming stages first.
    ` },
  },
  'future-of-clinic-ai': {
    ko: { title: '클리닉 AI의 미래: 기록을 넘어 운영까지', category: '의료 AI', author: '박준호', authorRole: 'CEO & 공동창업자', date: '2025년 12월 8일', readTime: '6분', content: `
## AI 스크라이브는 시작일 뿐

현재 AI 메디컬 스크라이브는 "진료 기록 자동화"에 초점을 맞추고 있습니다. 녹음 → 텍스트 → SOAP 차트. 이것만으로도 업무 부담을 크게 줄여주지만, 이건 시작입니다.

## 다음 단계들

### 진료 후 워크플로우 자동화

차트 이후의 업무 — 환자 안내문, 리콜 관리, 후속 조치 — 를 AI가 자동으로 처리합니다. 차트쏙이 현재 집중하고 있는 영역입니다.

### 진료 패턴 분석

축적된 차트 데이터(비식별화)에서 패턴을 분석합니다. 진료 결과, 처방 효과, 리콜 성공률 추이를 대시보드로 제공합니다.

### 예약 최적화

환자 이력과 리콜 스케줄 기반으로 최적 예약 시간을 제안합니다.

### 환자 커뮤니케이션

안내문 자동 전송, 리마인더, 증상 경과 체크까지 AI가 관리합니다.

## 변하지 않는 것

기술이 아무리 발전해도, 진료의 핵심은 의사와 환자의 관계입니다. AI는 그 관계를 방해하는 행정 업무를 줄여주는 도구일 뿐입니다. 차트쏙은 이 원칙을 지키면서, 기록에서 시작해 운영 전체로 확장해 나갈 것입니다.
    ` },
    en: { title: 'The Future of Clinic AI: Beyond Documentation to Operations', category: 'Medical AI', author: 'Junho Park', authorRole: 'CEO & Co-founder', date: 'December 8, 2025', readTime: '6 min', content: `
## AI Scribe Is Just the Beginning

Current focus: documentation automation. Recording → text → SOAP. Significant workload reduction, but just the start.

## What Comes Next

### Post-Visit Automation: Instructions, recall, follow-up — handled by AI. ChartSok's current focus.

### Pattern Analysis: De-identified chart data analyzed for treatment outcomes, prescription effectiveness, recall trends.

### Scheduling Optimization: AI suggests optimal appointments based on history and recall.

### Patient Communication: Auto instructions, reminders, symptom check-ins — managed by AI.

## What Doesn't Change

The core of medicine is the doctor-patient relationship. AI removes administrative barriers, not care itself. ChartSok expands from documentation to full operations while preserving this principle.
    ` },
  },
};

const categoryColors = {
  '창업 이야기': '#F59E0B',
  'Founder Story': '#F59E0B',
  '제품 인사이트': '#4B9CD3',
  'Product Insight': '#4B9CD3',
  '의료 AI': '#8B5CF6',
  'Medical AI': '#8B5CF6',
  '클리닉 운영': '#10B981',
  'Clinic Operations': '#10B981',
  '보안/규정': '#EF4444',
  'Security': '#EF4444',
};

export default function BlogPostPage() {
  const params = useParams();
  const { id } = params;
  const { locale } = useI18n();
  const [snackOpen, setSnackOpen] = useState(false);

  const postData = blogContent[id]?.[locale] || blogContent[id]?.ko;

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    if (navigator.share) {
      try {
        await navigator.share({ title: postData?.title || 'chartsok blog', url });
      } catch {
        // user cancelled
      }
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      setSnackOpen(true);
    }
  };

  if (!postData) {
    return (
      <>
        <Header />
        <Box sx={{ bgcolor: '#FAFBFC', minHeight: '100vh', pt: { xs: 8, md: 12 }, pb: 8 }}>
          <Container maxWidth="xl" sx={{ textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: 'secondary.main', mb: 2 }}>
              {locale === 'ko' ? '글을 찾을 수 없습니다' : 'Post not found'}
            </Typography>
            <Button component={Link} href="/blog" startIcon={<ArrowBackIcon />} variant="outlined" sx={{ borderRadius: 2 }}>
              {locale === 'ko' ? '블로그로 돌아가기' : 'Back to Blog'}
            </Button>
          </Container>
        </Box>
        <Footer />
      </>
    );
  }

  const post = postData;
  const t = {
    back: locale === 'ko' ? '블로그로 돌아가기' : 'Back to Blog',
    share: locale === 'ko' ? '공유하기' : 'Share',
    copied: locale === 'ko' ? '링크가 복사되었습니다' : 'Link copied to clipboard',
  };

  return (
    <>
      <Header />
      <Box sx={{ bgcolor: '#FAFBFC', minHeight: '100vh' }}>
        <Box
          sx={{
            background: 'linear-gradient(180deg, #EBF5FF 0%, #FAFBFC 100%)',
            pt: { xs: 6, md: 10 },
            pb: { xs: 4, md: 6 },
          }}
        >
          <Container maxWidth="xl">
            <MotionBox initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Button component={Link} href="/blog" startIcon={<ArrowBackIcon />} sx={{ mb: 3, color: 'text.secondary' }}>
                {t.back}
              </Button>
              <Chip
                label={post.category}
                sx={{
                  mb: 2,
                  bgcolor: `${categoryColors[post.category] || '#4B9CD3'}15`,
                  color: categoryColors[post.category] || '#4B9CD3',
                  fontWeight: 600,
                }}
              />
              <Typography
                variant="h3"
                sx={{ fontWeight: 800, color: 'secondary.main', mb: 3, fontSize: { xs: '1.75rem', md: '2.5rem' }, lineHeight: 1.3 }}
              >
                {post.title}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Avatar sx={{ width: 40, height: 40, bgcolor: 'primary.main' }}>
                    {post.author?.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{post.author}</Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>{post.authorRole}</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <CalendarTodayIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>{post.date}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <AccessTimeIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>{post.readTime}</Typography>
                  </Box>
                </Box>
              </Box>
            </MotionBox>
          </Container>
        </Box>

        <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 } }}>
          <Card elevation={0} sx={{ p: { xs: 3, md: 5 }, border: '1px solid', borderColor: 'grey.200', borderRadius: 3 }}>
            <Box
              sx={{
                '& h2': { fontSize: '1.5rem', fontWeight: 700, mt: 4, mb: 2, color: 'secondary.main' },
                '& h3': { fontSize: '1.25rem', fontWeight: 600, mt: 3, mb: 1.5, color: 'secondary.main' },
                '& p': { lineHeight: 1.9, mb: 2, color: 'text.secondary' },
                '& ul, & ol': { pl: 3, mb: 2, color: 'text.secondary' },
                '& li': { mb: 1, lineHeight: 1.8 },
                '& strong': { color: 'text.primary', fontWeight: 600 },
              }}
              dangerouslySetInnerHTML={{
                __html: post.content
                  .replace(/### (.*)/g, '<h3>$1</h3>')
                  .replace(/## (.*)/g, '<h2>$1</h2>')
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/- (.*)/g, '<li>$1</li>')
                  .replace(/\n\n/g, '</p><p>')
                  .replace(/^/, '<p>')
                  .replace(/$/, '</p>'),
              }}
            />
          </Card>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button variant="outlined" startIcon={<ShareIcon />} onClick={handleShare} sx={{ borderRadius: 2, px: 4 }}>
              {t.share}
            </Button>
          </Box>
        </Container>
      </Box>
      <Footer />
      <Snackbar
        open={snackOpen}
        autoHideDuration={2000}
        onClose={() => setSnackOpen(false)}
        message={t.copied}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </>
  );
}
