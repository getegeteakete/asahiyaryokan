import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import PictureGallery from '@/components/PictureGallery';
import VideoSection from '@/components/VideoSection';
import Menu from '@/components/Menu';
import Kaiseki from '@/components/Kaiseki';
import Banquet from '@/components/Banquet';
import Stay from '@/components/Stay';
import Press from '@/components/Press';
import Access from '@/components/Access';
import Footer from '@/components/Footer';
import WaveDivider from '@/components/WaveDivider';

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
        <WaveDivider top="sumi" bottom="kinari-light" />
        <About />
        <WaveDivider top="kinari-light" bottom="kinari" flip />
        <PictureGallery />
        <VideoSection />
        <WaveDivider top="kinari" bottom="sumi" />
        <Menu />
        <WaveDivider top="sumi" bottom="kinari" flip />
        <Kaiseki />
        <WaveDivider top="washi" bottom="kinari-light" />
        <Banquet />
        <WaveDivider top="kinari-light" bottom="washi" flip />
        <Stay />
        <WaveDivider top="washi" bottom="kinari" />
        <Press />
        <WaveDivider top="kinari" bottom="sumi" flip />
        <Access />
      </main>
      <Footer />
    </>
  );
}
