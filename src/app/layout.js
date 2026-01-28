import './globals.css';
import ThemeRegistry from '@/components/ThemeRegistry';

export const metadata = {
  title: 'ChartSok (차트쏙) - AI 진료 기록 솔루션',
  description: '의사의 음성을 자동으로 SOAP 형식의 진료 기록으로 변환합니다. 환자와 보호자도 진료 내용을 쉽게 확인할 수 있습니다.',
  keywords: ['의료 차트', 'AI', 'SOAP', '진료 기록', '음성 인식', '의료 기록'],
  authors: [{ name: 'ChartSok Team' }],
  openGraph: {
    title: 'ChartSok (차트쏙) - AI 진료 기록 솔루션',
    description: '진료에 집중하세요, 기록은 AI가 합니다',
    type: 'website',
    locale: 'ko_KR',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
