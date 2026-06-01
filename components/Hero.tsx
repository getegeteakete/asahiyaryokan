'use client';

import { useState, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';

const SLIDES = [
  { src: '/images/002-kaisen-don-new.jpg', labelJa: '海鮮丼', labelEn: 'Kaisen-don' },
  { src: '/images/001-kaiseki-01.jpg', labelJa: '朝日懐石', labelEn: 'Kaiseki' },
  { src: '/images/006-sashimi-platter.jpg', labelJa: '刺身盛り', labelEn: 'Sashimi Platter' },
  { src: '/images/003-ise-ebi-new.jpg', labelJa: '伊勢海老の活造り', labelEn: 'Live Ise Ebi' },
  { src: '/images/007-white-fish-sashimi.jpg', labelJa: 'お造り盛り合わせ', labelEn: 'Sashimi Assortment' },
];

export default function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const isJa = locale === 'ja';
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative z-[2] min-h-svh flex flex-col justify-end px-6 md:px-10 pt-[100px] md:pt-[120px] pb-20 md:pb-24 overflow-hidden bg-sumi">
      {/* スライダー背景 */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {SLIDES.map((slide, index) => (
          <div
            key={slide.src}
            className="absolute inset-0 transition-opacity duration-[1500ms] ease-in-out"
            style={{ opacity: index === current ? 1 : 0 }}
          >
            <Image
              src={slide.src}
              alt={isJa ? slide.labelJa : slide.labelEn}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
              style={{
                filter: 'saturate(1.12) contrast(1.02) brightness(1.05)',
                transform: index === current ? 'scale(1.05)' : 'scale(1)',
                transition: 'transform 6s ease-out',
              }}
            />
          </div>
        ))}
        {/* グラデーション - 写真を明るく見せつつ下部のテキストは読みやすく */}
        <div className="absolute inset-0 bg-gradient-to-t from-sumi via-sumi/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-sumi/90 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-sumi/40 to-transparent" />
      </div>

      {/* 現在の料理名ラベル（右上） */}
      <div className="absolute top-[110px] md:top-[130px] right-6 md:right-10 z-[3] text-right">
        <span
          className={`text-kin-light text-[13px] md:text-[15px] tracking-[0.2em] font-light transition-opacity duration-500 ${
            isJa ? 'font-mincho' : 'font-cormorant italic'
          }`}
          style={{ textShadow: '0 2px 12px rgba(0,0,0,0.7)' }}
        >
          {isJa ? SLIDES[current].labelJa : SLIDES[current].labelEn}
        </span>
      </div>

      <div className="relative z-[2] w-full max-w-[1200px] mx-auto">
        <p
          className={`mb-5 text-[11px] md:text-[12px] tracking-[0.5em] uppercase text-kin-light font-light ${
            isJa ? 'font-cormorant italic' : 'font-mincho'
          }`}
          style={{ textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}
        >
          {t('eyebrow')}
        </p>

        <h1
          className={`font-medium text-kinari mb-6 leading-tight ${
            isJa
              ? 'font-mincho text-[clamp(36px,8vw,72px)] tracking-[0.1em]'
              : 'font-cormorant italic font-normal text-[clamp(36px,7vw,64px)] tracking-[0.02em]'
          }`}
          style={{
            textShadow: '0 2px 16px rgba(0,0,0,0.7), 0 1px 3px rgba(0,0,0,0.9)',
          }}
        >
          {isJa ? (
            <>
              いけす直送、
              <br />
              <span className="text-kin-light">糸島の海の幸。</span>
            </>
          ) : (
            <>
              Fresh from the Tank,
              <br />
              <span className="text-kin-light">Itoshima&apos;s Bounty.</span>
            </>
          )}
        </h1>

        <p
          className="text-[14px] md:text-[16px] leading-[1.9] max-w-[600px] text-kinari/95 font-light tracking-[0.05em]"
          style={{ textShadow: '0 1px 8px rgba(0,0,0,0.8)' }}
        >
          {isJa ? (
            <>
              船だまりを望む割烹民宿・朝日屋。
              <br className="hidden md:inline" />
              毎朝獲れたての活魚を、海鮮丼や懐石でお届けします。
            </>
          ) : (
            <>
              Kappo Minshuku Asahiya, overlooking the boat harbour.
              <br className="hidden md:inline" />
              Fresh-caught fish served as seafood bowls and kaiseki.
            </>
          )}
        </p>

        {/* CTAボタン */}
        <div className="flex flex-wrap gap-4 mt-8">
          <a
            href="#menu"
            className="inline-block px-8 py-3.5 bg-shu text-kinari-light text-[13px] tracking-[0.25em] font-light hover:bg-shu-deep transition-all shadow-lg"
          >
            {isJa ? 'お品書きを見る' : 'VIEW MENU'}
          </a>
          <a
            href="tel:+81923282634"
            className="inline-block px-8 py-3.5 bg-kinari/10 backdrop-blur-sm border border-kinari/40 text-kinari text-[13px] tracking-[0.25em] font-light hover:bg-kinari/20 transition-all"
          >
            {isJa ? '電話で予約' : 'RESERVE'}
          </a>
        </div>

        {/* スライドインジケーター */}
        <div className="flex gap-3 mt-10">
          {SLIDES.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => setCurrent(index)}
              aria-label={`スライド ${index + 1}`}
              className="group py-2"
            >
              <span
                className={`block h-0.5 transition-all duration-500 ${
                  index === current ? 'w-10 bg-kin-light' : 'w-5 bg-kinari/40 group-hover:bg-kinari/70'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
