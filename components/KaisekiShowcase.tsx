'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';

export default function KaisekiShowcase() {
  const t = useTranslations('kaiseki-showcase');
  const locale = useLocale();
  const isJa = locale === 'ja';

  return (
    <section className="relative z-[2] bg-kinari px-6 md:px-10 py-16 md:py-24 overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        {/* 2列グリッド: スマホは積み上げ、デスクトップは並列 */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* 左: 朝日膳 */}
          <div className="group">
            <div className="relative w-full aspect-[4/5] overflow-hidden shadow-xl mb-4">
              <Image
                src="/images/016-kaiseki-deluxe.jpg"
                alt={isJa ? '朝日膳' : 'Asahi Set'}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
            <h3 className={`text-[20px] md:text-[24px] mb-2 text-sumi font-medium tracking-[0.08em] ${
              isJa ? 'font-mincho' : 'font-cormorant italic'
            }`}>
              {isJa ? '朝日膳' : 'Asahi Set'}
            </h3>
            <p className={`text-[12px] md:text-[13px] text-sumi-soft tracking-[0.15em] mb-3 ${
              isJa ? 'font-cormorant italic' : 'font-mincho'
            }`}>
              {isJa ? 'あさひぜん' : 'Asahi-zen'}
            </p>
            <p className="text-[14px] text-sumi-soft leading-relaxed font-light">
              {t('kaiseki-desc')}
            </p>
          </div>

          {/* 右: 釜めし膳 */}
          <div className="group">
            <div className="relative w-full aspect-[4/5] overflow-hidden shadow-xl mb-4">
              <Image
                src="/images/017-kamameshi-deluxe.jpg"
                alt={isJa ? '朝日釜めし膳' : 'Kamameshi'}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
            <h3 className={`text-[20px] md:text-[24px] mb-2 text-sumi font-medium tracking-[0.08em] ${
              isJa ? 'font-mincho' : 'font-cormorant italic'
            }`}>
              {isJa ? '朝日釜めし膳' : 'Kamameshi'}
            </h3>
            <p className={`text-[12px] md:text-[13px] text-sumi-soft tracking-[0.15em] mb-3 ${
              isJa ? 'font-cormorant italic' : 'font-mincho'
            }`}>
              {isJa ? 'あさひかまめしぜん' : 'Asahi Kamameshi Set'}
            </p>
            <p className="text-[14px] text-sumi-soft leading-relaxed font-light">
              {t('kamameshi-desc')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
