import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const isJa = locale === 'ja';

  return (
    <section className="relative z-[2] min-h-svh flex items-center px-6 md:px-10 pt-[100px] md:pt-[120px] pb-16 md:pb-20 overflow-hidden bg-sumi">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/images/kaiseki-02.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ 
            filter: 'sepia(0.2) saturate(0.85) contrast(1.05) brightness(0.75)',
            opacity: 0.6
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-sumi/30 via-sumi/60 to-sumi/95" />
      </div>

      <div className="relative z-[2] w-full max-w-[1200px] mx-auto">
        <p
          className={`mb-8 text-[12px] tracking-[0.5em] uppercase text-kin-light animate-fadeUp [animation-delay:0.2s] [animation-fill-mode:backwards] opacity-90 font-light ${
            isJa ? 'font-cormorant italic' : 'font-mincho'
          }`}
        >
          {t('eyebrow')}
        </p>

        <h1
          className={`font-medium text-kinari mb-10 animate-fadeUp [animation-delay:0.1s] leading-tight ${
            isJa
              ? 'font-mincho text-[clamp(42px,9vw,80px)] tracking-[0.12em]'
              : 'font-cormorant italic font-normal text-[clamp(40px,8vw,72px)] tracking-[0.02em]'
          }`}
          style={{
            textShadow: '0 2px 8px rgba(0,0,0,0.3)',
            writingMode: 'horizontal-tb'
          }}
        >
          {isJa ? (
            <>
              新鮮な海の恵みを、
              <br />
              <span className="text-kin">{t('titleAccent')}</span>
            </>
          ) : (
            <>
              Fresh Seafood
              <br />
              <span className="text-kin">Experience</span>
            </>
          )}
        </h1>

        <p className="text-[13px] md:text-[14px] leading-[2] md:leading-[2.1] max-w-[560px] text-kinari/85 animate-fadeUp [animation-delay:0.4s] [animation-fill-mode:backwards] font-light tracking-[0.05em]">
          {t('lead1')}
          <br className="hidden md:inline" />
          {t('lead2')}
          <br className="hidden md:inline" />
          {t('lead3')}
        </p>
      </div>

      <div
        className={`absolute bottom-12 text-[10px] tracking-[0.35em] text-kin-light/70 font-light ${
          isJa
            ? 'right-6 md:right-10 font-cormorant italic'
            : 'right-6 md:right-10 font-mincho'
        }`}
      >
        {t('meta')}
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 font-cormorant italic text-[9px] tracking-[0.5em] text-kin-light/50 animate-bounce">
        {t('scroll')}
      </div>
    </section>
  );
}
