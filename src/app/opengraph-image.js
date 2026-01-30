import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'chartsok (차트쏙) - AI 의료 차트 자동화';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

// Brand colors
const UNC_BLUE = '#4B9CD3';
const ACCENT_GREEN = '#10B981';
const DARK_NAVY = '#0F172A';

export default async function Image() {
  // Load Korean font
  const notoSansKR = await fetch(
    new URL('https://fonts.gstatic.com/s/notosanskr/v36/PbyxFmXiEBPT4ITbgNA5Cgms3VYcOA-vvnIzzuozeLTq8H4hfeE.woff', import.meta.url)
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: `linear-gradient(135deg, ${DARK_NAVY} 0%, #1E293B 50%, ${DARK_NAVY} 100%)`,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background circles */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '700px',
            height: '700px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${UNC_BLUE}15 0%, transparent 70%)`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-200px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${ACCENT_GREEN}12 0%, transparent 70%)`,
          }}
        />

        {/* Decorative rings */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '560px',
            height: '560px',
            borderRadius: '50%',
            border: `1px solid ${UNC_BLUE}15`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '440px',
            height: '440px',
            borderRadius: '50%',
            border: `1px solid ${ACCENT_GREEN}10`,
          }}
        />

        {/* Main content - all centered */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
          }}
        >
          {/* Logo boxes - 차트쏙 */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              marginBottom: '20px',
            }}
          >
            {/* 차 */}
            <div
              style={{
                padding: '16px 26px',
                borderRadius: '14px',
                background: UNC_BLUE,
                boxShadow: `0 8px 30px ${UNC_BLUE}50`,
              }}
            >
              <span style={{ fontSize: '52px', fontWeight: 700, color: 'white', fontFamily: 'Noto Sans KR' }}>차</span>
            </div>
            {/* 트 */}
            <div
              style={{
                padding: '16px 26px',
                borderRadius: '14px',
                background: UNC_BLUE,
                boxShadow: `0 8px 30px ${UNC_BLUE}50`,
              }}
            >
              <span style={{ fontSize: '52px', fontWeight: 700, color: 'white', fontFamily: 'Noto Sans KR' }}>트</span>
            </div>
            {/* 쏙 (tilted) */}
            <div
              style={{
                padding: '16px 26px',
                borderRadius: '14px',
                background: ACCENT_GREEN,
                boxShadow: `0 8px 30px ${ACCENT_GREEN}50`,
                transform: 'rotate(-4deg)',
              }}
            >
              <span style={{ fontSize: '52px', fontWeight: 700, color: 'white', fontFamily: 'Noto Sans KR' }}>쏙</span>
            </div>
          </div>

          {/* English name */}
          <div
            style={{
              fontSize: '36px',
              fontWeight: 800,
              color: UNC_BLUE,
              letterSpacing: '3px',
              marginBottom: '24px',
            }}
          >
            chartsok
          </div>

          {/* ECG Line */}
          <svg
            width="500"
            height="50"
            viewBox="0 0 500 50"
            style={{ marginBottom: '24px' }}
          >
            <defs>
              <linearGradient id="ecgGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={UNC_BLUE} />
                <stop offset="50%" stopColor={ACCENT_GREEN} />
                <stop offset="100%" stopColor={UNC_BLUE} />
              </linearGradient>
            </defs>
            <path
              d="M0,25 L140,25 L175,8 L210,42 L245,15 L280,35 L315,25 L500,25"
              fill="none"
              stroke="url(#ecgGradient)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Tagline */}
          <div
            style={{
              fontSize: '26px',
              fontWeight: 700,
              color: 'white',
              marginBottom: '14px',
              textAlign: 'center',
              fontFamily: 'Noto Sans KR',
            }}
          >
            AI 의료 차트 자동화 솔루션
          </div>

          {/* Subtitle pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px 28px',
              background: `linear-gradient(90deg, ${UNC_BLUE}15, ${ACCENT_GREEN}15)`,
              borderRadius: '100px',
              border: `1px solid ${UNC_BLUE}35`,
              marginBottom: '32px',
            }}
          >
            <span style={{ fontSize: '18px', color: 'rgba(255,255,255,0.85)', fontFamily: 'Noto Sans KR' }}>
              진료에 집중하세요, 기록은 AI가 합니다
            </span>
          </div>

          {/* Stats row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '32px',
            }}
          >
            {/* 73% */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: '24px', fontWeight: 800, color: ACCENT_GREEN }}>73%</span>
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', fontFamily: 'Noto Sans KR' }}>진료 시간 절감</span>
            </div>

            {/* Divider */}
            <div style={{ width: '1px', height: '35px', background: 'rgba(255,255,255,0.15)' }} />

            {/* SOAP */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: '24px', fontWeight: 800, color: UNC_BLUE }}>SOAP</span>
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', fontFamily: 'Noto Sans KR' }}>차트 자동 생성</span>
            </div>

            {/* Divider */}
            <div style={{ width: '1px', height: '35px', background: 'rgba(255,255,255,0.15)' }} />

            {/* EMR */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: '24px', fontWeight: 800, color: ACCENT_GREEN }}>EMR</span>
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', fontFamily: 'Noto Sans KR' }}>연동 지원</span>
            </div>
          </div>
        </div>

        {/* URL - bottom center */}
        <div
          style={{
            position: 'absolute',
            bottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <div
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: ACCENT_GREEN,
            }}
          />
          <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)' }}>chartsok.com</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Noto Sans KR',
          data: notoSansKR,
          style: 'normal',
          weight: 700,
        },
      ],
    }
  );
}
