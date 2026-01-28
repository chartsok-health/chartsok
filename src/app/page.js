import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import HowItWorks from '@/components/HowItWorks';
import Features from '@/components/Features';
import Demo from '@/components/Demo';
import Specialties from '@/components/Specialties';
import Testimonials from '@/components/Testimonials';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <HowItWorks />
        <Features />
        <Demo />
        <Specialties />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
