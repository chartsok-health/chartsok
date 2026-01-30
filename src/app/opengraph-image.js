import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'ChartSok - AI 의료 차트 자동화';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: 'linear-gradient(135deg, #0F2A44 0%, #1E4A6F 50%, #0F2A44 100%)',
          position: 'relative',
        }}
      >
        {/* Background dots pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.08) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Content container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: '60px 80px',
            width: '100%',
          }}
        >
          {/* Icon */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginRight: '60px',
            }}
          >
            <div
              style={{
                width: '180px',
                height: '230px',
                background: 'rgba(255,255,255,0.95)',
                borderRadius: '20px',
                display: 'flex',
                flexDirection: 'column',
                padding: '30px',
                position: 'relative',
              }}
            >
              {/* Chart lines */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                <div style={{ width: '120px', height: '12px', background: '#4B9CD3', borderRadius: '6px' }} />
                <div style={{ width: '100px', height: '12px', background: '#0F2A44', borderRadius: '6px' }} />
                <div style={{ width: '120px', height: '12px', background: '#4B9CD3', borderRadius: '6px' }} />
                <div style={{ width: '80px', height: '12px', background: '#0F2A44', borderRadius: '6px' }} />
              </div>
              {/* AI sparkle */}
              <div
                style={{
                  position: 'absolute',
                  top: '-20px',
                  right: '-20px',
                  width: '60px',
                  height: '60px',
                  background: '#4B9CD3',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '32px',
                  fontWeight: 'bold',
                }}
              >
                +
              </div>
            </div>
          </div>

          {/* Text content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
            }}
          >
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '20px' }}>
              <span style={{ fontSize: '72px', fontWeight: 'bold', color: 'white' }}>ChartSok</span>
              <span style={{ fontSize: '48px', fontWeight: '500', color: '#4B9CD3', marginLeft: '16px' }}>차트쏙</span>
            </div>

            {/* Subtitle */}
            <span style={{ fontSize: '32px', color: 'rgba(255,255,255,0.8)', marginBottom: '30px' }}>
              AI 의료 차트 자동화 솔루션
            </span>

            {/* Tagline box */}
            <div
              style={{
                display: 'flex',
                background: 'rgba(75,156,211,0.15)',
                border: '2px solid #4B9CD3',
                borderRadius: '12px',
                padding: '20px 30px',
                marginBottom: '30px',
              }}
            >
              <span style={{ fontSize: '26px', color: 'white' }}>
                진료에 집중하세요, 기록은 AI가 합니다
              </span>
            </div>

            {/* Stats */}
            <span style={{ fontSize: '20px', color: 'rgba(255,255,255,0.6)' }}>
              진료 시간 73% 절감 | SOAP 차트 자동 생성 | EMR 연동
            </span>
          </div>
        </div>

        {/* URL */}
        <span
          style={{
            position: 'absolute',
            bottom: '30px',
            right: '40px',
            fontSize: '20px',
            color: 'rgba(255,255,255,0.5)',
          }}
        >
          chartsok.com
        </span>
      </div>
    ),
    {
      ...size,
    }
  );
}
