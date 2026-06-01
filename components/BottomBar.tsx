'use client';

import { useLocale, useTranslations } from 'next-intl';

export default function BottomBar() {
  const t = useTranslations('bottomBar');
  const locale = useLocale();
  const isJa = locale === 'ja';

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[95] bg-sumi/95 backdrop-blur-xl border-t border-kin/20 shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
      <div className="max-w-[1200px] mx-auto flex items-stretch">
        {/* 営業時間 */}
        <div className="flex-1 flex items-center gap-3 md:gap-5 px-4 md:px-6 py-3">
          <span
            className={`hidden sm:block text-kin-light text-[10px] md:text-[11px] tracking-[0.2em] whitespace-nowrap ${
              isJa ? 'font-mincho' : 'font-cormorant italic'
            }`}
          >
            {t('hoursLabel')}
          </span>
          <div className="flex flex-col md:flex-row md:items-center md:gap-4 leading-tight">
            <span className="text-kinari text-[12px] md:text-[14px] tracking-[0.05em] font-light whitespace-nowrap">
              {t('hoursLunch')}
            </span>
            <span className="text-kinari/70 text-[11px] md:text-[13px] tracking-[0.05em] font-light whitespace-nowrap">
              {t('hoursDinner')}
            </span>
          </div>
        </div>

        {/* 電話発信ボタン */}
        <a
          href="tel:+81923282634"
          className="flex items-center justify-center gap-2 md:gap-3 px-5 md:px-10 bg-shu hover:bg-shu-deep text-kinari-light transition-all duration-300 group"
        >
          {/* 電話アイコン */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform"
          >
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
          </svg>
          <div className="flex flex-col items-start leading-tight">
            <span className="text-[12px] md:text-[14px] tracking-[0.1em] md:tracking-[0.2em] font-light whitespace-nowrap">
              {t('cta')}
            </span>
            <span className="font-cormorant text-[13px] md:text-[16px] tracking-[0.1em] hidden sm:block">
              {t('phone')}
            </span>
          </div>
        </a>
      </div>
    </div>
  );
}
