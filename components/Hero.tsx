import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const isJa = locale === 'ja';

  return (
    <section className="relative z-[2] min-h-svh flex items-center px-6 md:px-10 pt-[100px] md:pt-[120px] pb-16 md:pb-20 overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/images/kaiseki-02.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ filter: 'sepia(0.15) saturate(0.9) contrast(0.95)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-kinari/[0.15] via-kinari/[0.45] to-kinari/95" />
      </div>

      <div className="relative z-[2] w-full max-w-[1200px] mx-auto">
        <p
          className={`mb-6 text-[13px] tracking-[0.4em] uppercase text-clay animate-fadeUp [animation-delay:0.3s] [animation-fill-mode:backwards] ${
            isJa ? 'font-cormorant italic' : 'font-mincho'
          }`}
        >
          {t('eyebrow')}
        </p>

        <h1
          className={`font-medium text-sumi mb-8 animate-fadeUp ${
            isJa
              ? 'font-mincho text-[clamp(42px,11vw,96px)] tracking-[0.15em] leading-[1.15]'
              : 'font-cormorant italic font-normal text-[clamp(40px,9vw,86px)] tracking-[0.02em] leading-[1.05]'
          }`}
          style={{
            writingMode: isJa ? 'vertical-rl' : 'horizontal-tb',
            maxHeight: isJa ? '50vh' : 'none',
          }}
        >
          {t('titleLine1')}
          {isJa && <br />}
          {t('titleLine2')}
          <span className="text-shu">{t('titleAccent')}</span>
          {t('titleLine3')}
        </h1>

        <p className="text-sm leading-[2.2] max-w-[440px] text-sumi-soft animate-fadeUp [animation-delay:0.5s] [animation-fill-mode:backwards]">
          {t('lead1')}
          <br />
          {t('lead2')}
          <br />
          {t('lead3')}
        </p>
      </div>

      <div
        className={`absolute bottom-10 text-[11px] tracking-[0.3em] text-clay ${
          isJa
            ? 'right-6 md:right-10 font-cormorant italic'
            : 'left-6 md:left-10 font-mincho'
        }`}
        style={{ writingMode: isJa ? 'vertical-rl' : 'horizontal-tb' }}
      >
        {t('meta')}
      </div>

      <div className="scroll-hint absolute bottom-[30px] left-1/2 font-cormorant italic text-[10px] tracking-[0.4em] text-clay">
        {t('scroll')}
      </div>
    </section>
  );
}
