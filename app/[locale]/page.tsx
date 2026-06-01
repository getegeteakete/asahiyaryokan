import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import VideoSection from '@/components/VideoSection';
import Menu from '@/components/Menu';
import Kaiseki from '@/components/Kaiseki';
import Banquet from '@/components/Banquet';
import Stay from '@/components/Stay';
import Press from '@/components/Press';
import Access from '@/components/Access';
import Footer from '@/components/Footer';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <VideoSection />
        <Menu />
        <Kaiseki />
        <Banquet />
        <Stay />
        <Press />
        <Access />
      </main>
      <Footer />
    </>
  );
}
