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
        {/* ファーストビュー（snapあり：Heroコンポーネント内で指定） */}
        <Hero />
        <WaveDivider top="sumi" bottom="kinari-light" />

        {/* ▼ 主要セクションのみ吸着（snap） */}
        <FadeInSection variant="up" snap>
          <About />
        </FadeInSection>
        <WaveDivider top="kinari-light" bottom="kinari" flip />

        {/* サブ：リビールのみ（吸着なし） */}
        <FadeInSection variant="scale">
          <PictureGallery />
        </FadeInSection>

        <FadeInSection variant="fade">
          <KaisekiShowcase />
        </FadeInSection>

        <FadeInSection variant="scale">
          <VideoSection />
        </FadeInSection>
        <WaveDivider top="kinari" bottom="sumi" />

        {/* ▼ 昼食：吸着 */}
        <FadeInSection variant="up" snap>
          <Menu />
        </FadeInSection>
        <WaveDivider top="sumi" bottom="kinari" flip />

        {/* ▼ 懐石料理：吸着 */}
        <FadeInSection variant="up" snap>
          <Kaiseki />
        </FadeInSection>
        <WaveDivider top="washi" bottom="kinari-light" />

        {/* サブ：リビールのみ */}
        <FadeInSection variant="up">
          <Banquet />
        </FadeInSection>
        <WaveDivider top="kinari-light" bottom="washi" flip />

        {/* ▼ ご宿泊：吸着 */}
        <FadeInSection variant="up" snap>
          <Stay />
        </FadeInSection>
        <WaveDivider top="washi" bottom="kinari" />

        {/* サブ：リビールのみ */}
        <FadeInSection variant="fade">
          <Press />
        </FadeInSection>
        <WaveDivider top="kinari" bottom="sumi" flip />

        {/* ▼ 店舗情報：吸着 */}
        <FadeInSection variant="up" snap>
          <Access />
        </FadeInSection>
      </main>
      <Footer />
    </>
  );
}
