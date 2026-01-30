import './globals.css';
import Script from 'next/script';
import ThemeRegistry from '@/components/ThemeRegistry';

export const metadata = {
  title: 'chartsok (차트쏙) - AI 의료 차트 자동화 솔루션',
  description: '진료에만 집중하세요. AI가 진료 내용을 실시간으로 듣고 SOAP 형식의 차트를 자동 생성합니다. 내과, 이비인후과, 정형외과, 피부과, 소아과, 정신건강의학과 전문 AI 지원.',
  keywords: ['의료 차트', 'AI', 'SOAP', '진료 기록', '음성 인식', '의료 기록', 'EMR 연동', '차트 자동화', '진료 기록 자동화'],
  authors: [{ name: 'chartsok Team' }],
  metadataBase: new URL('https://chartsok.com'),
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: '차트쏙',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icon-192.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: 'chartsok (차트쏙) - AI 의료 차트 자동화 솔루션',
    description: '진료에 집중하세요, 기록은 AI가 합니다. 진료 시간 73% 절감.',
    type: 'website',
    locale: 'ko_KR',
    siteName: 'chartsok',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'chartsok - AI 의료 차트 자동화',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'chartsok (차트쏙) - AI 의료 차트 자동화',
    description: '진료에 집중하세요, 기록은 AI가 합니다',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        {/* Microsoft Clarity */}
        <Script
          id="clarity-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "v9kp03d10u");
            `,
          }}
        />
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
