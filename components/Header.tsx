'use client';

import { usePathname, useRouter } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLang = (next: 'ja' | 'en') => {
    router.replace(pathname, { locale: next });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-10 py-[18px] md:py-[22px] bg-kinari/85 backdrop-blur-xl border-b border-sumi/[0.08]">
      <div className="font-mincho text-[18px] font-semibold tracking-[0.3em] text-sumi">
        {t('brand')}
        <span className="block font-cormorant italic text-[9px] tracking-[0.5em] text-clay mt-0.5 font-light">
          {t('brandSub')}
        </span>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center font-cormorant text-xs tracking-[0.15em] border border-sumi/[0.15] rounded-sm overflow-hidden">
          <button
            type="button"
            onClick={() => switchLang('ja')}
            className={`px-2.5 py-1.5 transition-all ${
              locale === 'ja' ? 'bg-sumi text-kinari-light' : 'text-clay'
            }`}
            aria-pressed={locale === 'ja'}
          >
            JA
          </button>
          <button
            type="button"
            onClick={() => switchLang('en')}
            className={`px-2.5 py-1.5 transition-all ${
              locale === 'en' ? 'bg-sumi text-kinari-light' : 'text-clay'
            }`}
            aria-pressed={locale === 'en'}
          >
            EN
          </button>
        </div>
        <button
          type="button"
          aria-label="Menu"
          className="relative w-7 h-5"
        >
          <span className="absolute left-0 top-1 w-full h-px bg-sumi" />
          <span className="absolute left-0 top-[14px] w-[70%] h-px bg-sumi" />
        </button>
      </div>
    </header>
  );
}
