export const metadata = {
  title: '개발자 문서 | ChartSok API',
  description: 'ChartSok REST API, Webhook, EMR 연동 가이드. OAuth 2.0 인증, SDK 및 코드 예제를 제공합니다. 자체 시스템과 ChartSok을 연동하세요.',
  keywords: ['ChartSok API', 'EMR 연동 API', '의료 차트 API', 'SOAP 차트 API', 'Webhook'],
  openGraph: {
    title: '개발자 문서 | ChartSok API',
    description: 'ChartSok API로 자체 시스템과 연동하세요. REST API, Webhook, EMR 연동 가이드 제공.',
    type: 'website',
  },
};

export default function DocsLayout({ children }) {
  return children;
}
