import './globals.css';
import Script from 'next/script';
import ThemeRegistry from '@/components/ThemeRegistry';

export const metadata = {
  title: 'chartsok (차트쏙) — 진료 요약 + 후속관리 자동화 솔루션',
  description: '진료 내용을 자동으로 정리하고, 요약부터 환자 안내까지 빠르게 완성합니다. EMR을 대체하지 않고, EMR 옆에서 클리닉 운영을 돕는 업무툴입니다.',
  keywords: ['의료 차트', 'AI', 'SOAP', '진료 기록', '음성 인식', '의료 기록', 'EMR 연동', '차트 자동화', '진료 요약', '후속관리', '클리닉 업무툴'],
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
    title: 'chartsok (차트쏙) — 진료 요약 + 후속관리 자동화 솔루션',
    description: '진료 내용을 자동으로 정리하고, EMR 옆에서 클리닉 운영을 돕는 업무툴입니다.',
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
    title: 'chartsok (차트쏙) — 진료 요약 + 후속관리 자동화',
    description: '진료 내용을 자동으로 정리하고, EMR 옆에서 클리닉 운영을 돕는 업무툴입니다.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body suppressHydrationWarning>
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
