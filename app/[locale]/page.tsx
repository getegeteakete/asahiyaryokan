import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import PictureGallery from '@/components/PictureGallery';
import KaisekiShowcase from '@/components/KaisekiShowcase';
import VideoSection from '@/components/VideoSection';
import Menu from '@/components/Menu';
import Kaiseki from '@/components/Kaiseki';
import Banquet from '@/components/Banquet';
import Stay from '@/components/Stay';
import Press from '@/components/Press';
import Access from '@/components/Access';
import Footer from '@/components/Footer';
import WaveDivider from '@/components/WaveDivider';
import FadeInSection from '@/components/FadeInSection';

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
        {/* ファーストビューはそのまま表示 */}
        <Hero />
        <WaveDivider top="sumi" bottom="kinari-light" />

        <FadeInSection variant="up" snap>
          <About />
        </FadeInSection>
        <WaveDivider top="kinari-light" bottom="kinari" flip />

        <FadeInSection variant="scale" snap>
          <PictureGallery />
        </FadeInSection>

        <FadeInSection variant="fade" snap>
          <KaisekiShowcase />
        </FadeInSection>

        <FadeInSection variant="scale" snap>
          <VideoSection />
        </FadeInSection>
        <WaveDivider top="kinari" bottom="sumi" />

        <FadeInSection variant="up" snap>
          <Menu />
        </FadeInSection>
        <WaveDivider top="sumi" bottom="kinari" flip />

        <FadeInSection variant="up" snap>
          <Kaiseki />
        </FadeInSection>
        <WaveDivider top="washi" bottom="kinari-light" />

        <FadeInSection variant="up" snap>
          <Banquet />
        </FadeInSection>
        <WaveDivider top="kinari-light" bottom="washi" flip />

        <FadeInSection variant="up" snap>
          <Stay />
        </FadeInSection>
        <WaveDivider top="washi" bottom="kinari" />

        <FadeInSection variant="fade" snap>
          <Press />
        </FadeInSection>
        <WaveDivider top="kinari" bottom="sumi" flip />

        <FadeInSection variant="up" snap>
          <Access />
        </FadeInSection>
      </main>
      <Footer />
    </>
  );
}
