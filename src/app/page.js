import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Demo from '@/components/Demo';
import TemplateMapping from '@/components/TemplateMapping';
import PartnerValue from '@/components/PartnerValue';
import ProductStrategy from '@/components/ProductStrategy';
import PartnerEconomics from '@/components/PartnerEconomics';
import PoCPackage from '@/components/PoCPackage';
import IntegrationOptions from '@/components/IntegrationOptions';
import SecurityCompliance from '@/components/SecurityCompliance';
import PartnerOnboarding from '@/components/PartnerOnboarding';
import PartnerFAQ from '@/components/PartnerFAQ';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import PWAInstallBanner from '@/components/PWAInstallBanner';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Demo />
        <TemplateMapping />
        <PartnerValue />
        <ProductStrategy />
        <PartnerEconomics />
        <PoCPackage />
        <IntegrationOptions />
        <SecurityCompliance />
        <PartnerOnboarding />
        <PartnerFAQ />
        <CTA />
      </main>
      <Footer />
      <PWAInstallBanner />
    </>
  );
}
