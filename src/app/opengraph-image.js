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
        }}
      >
        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
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
                display: 'flex',
                padding: '16px 26px',
                borderRadius: '14px',
                background: UNC_BLUE,
                boxShadow: `0 8px 30px ${UNC_BLUE}50`,
              }}
            >
              <span style={{ fontSize: '52px', fontWeight: 700, color: 'white' }}>차</span>
            </div>
            {/* 트 */}
            <div
              style={{
                display: 'flex',
                padding: '16px 26px',
                borderRadius: '14px',
                background: UNC_BLUE,
                boxShadow: `0 8px 30px ${UNC_BLUE}50`,
              }}
            >
              <span style={{ fontSize: '52px', fontWeight: 700, color: 'white' }}>트</span>
            </div>
            {/* 쏙 */}
            <div
              style={{
                display: 'flex',
                padding: '16px 26px',
                borderRadius: '14px',
                background: ACCENT_GREEN,
                boxShadow: `0 8px 30px ${ACCENT_GREEN}50`,
              }}
            >
              <span style={{ fontSize: '52px', fontWeight: 700, color: 'white' }}>쏙</span>
            </div>
          </div>

          {/* English name */}
          <div
            style={{
              display: 'flex',
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
              display: 'flex',
              fontSize: '26px',
              fontWeight: 700,
              color: 'white',
              marginBottom: '14px',
            }}
          >
            AI Medical Chart Automation
          </div>

          {/* Subtitle */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px 28px',
              background: `linear-gradient(90deg, ${UNC_BLUE}25, ${ACCENT_GREEN}25)`,
              borderRadius: '100px',
              border: `1px solid ${UNC_BLUE}50`,
              marginBottom: '32px',
            }}
          >
            <span style={{ fontSize: '18px', color: 'rgba(255,255,255,0.85)' }}>
              Focus on care, AI handles the documentation
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
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>Time Saved</span>
            </div>

            {/* Divider */}
            <div style={{ display: 'flex', width: '1px', height: '35px', background: 'rgba(255,255,255,0.15)' }} />

            {/* SOAP */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: '24px', fontWeight: 800, color: UNC_BLUE }}>SOAP</span>
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>Auto Charts</span>
            </div>

            {/* Divider */}
            <div style={{ display: 'flex', width: '1px', height: '35px', background: 'rgba(255,255,255,0.15)' }} />

            {/* EMR */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: '24px', fontWeight: 800, color: ACCENT_GREEN }}>EMR</span>
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>Integration</span>
            </div>
          </div>
        </div>

        {/* URL - bottom center */}
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            bottom: '24px',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <div
            style={{
              display: 'flex',
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
    }
  );
}
