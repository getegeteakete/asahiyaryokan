import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const isJa = locale === 'ja';

  return (
    <section className="relative z-[2] min-h-svh flex flex-col justify-end px-6 md:px-10 pt-[100px] md:pt-[120px] pb-20 md:pb-24 overflow-hidden bg-sumi">
      {/* 背景画像 - はっきり見せる */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/images/030-海鮮丼000-1024x683.jpg"
          alt="朝日屋の海鮮丼"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{
            filter: 'saturate(1.08) contrast(1.03) brightness(0.92)',
          }}
        />
        {/* テキスト部分だけ暗くするグラデーション（下部のみ） */}
        <div className="absolute inset-0 bg-gradient-to-t from-sumi via-sumi/40 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-sumi/50 to-transparent" />
      </div>

      <div className="relative z-[2] w-full max-w-[1200px] mx-auto">
        <p
          className={`mb-5 text-[11px] md:text-[12px] tracking-[0.5em] uppercase text-kin-light animate-fadeUp [animation-delay:0.2s] [animation-fill-mode:backwards] font-light ${
            isJa ? 'font-cormorant italic' : 'font-mincho'
          }`}
          style={{ textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}
        >
          {t('eyebrow')}
        </p>

        <h1
          className={`font-medium text-kinari mb-6 animate-fadeUp [animation-delay:0.1s] leading-tight ${
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
          className="text-[14px] md:text-[16px] leading-[1.9] max-w-[600px] text-kinari/95 animate-fadeUp [animation-delay:0.4s] [animation-fill-mode:backwards] font-light tracking-[0.05em]"
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
        <div className="flex flex-wrap gap-4 mt-8 animate-fadeUp [animation-delay:0.6s] [animation-fill-mode:backwards]">
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
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 font-cormorant italic text-[9px] tracking-[0.5em] text-kin-light/60 animate-bounce">
        {t('scroll')}
      </div>
    </section>
  );
}
