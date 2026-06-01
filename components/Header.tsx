'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const switchLang = (next: 'ja' | 'en') => {
    router.replace(pathname, { locale: next });
  };

  // メニューが開いている時はスクロールを無効化
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const navItems = [
    { key: 'menu', href: '#menu' },
    { key: 'banquet', href: '#banquet' },
    { key: 'stay', href: '#stay' },
    { key: 'info', href: '#info' },
  ];

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-5 md:px-10 py-4 md:py-[22px] bg-kinari/85 backdrop-blur-xl border-b border-sumi/[0.08]">
        <div className="font-mincho text-[16px] md:text-[18px] font-semibold tracking-[0.3em] text-sumi">
          {t('brand')}
          <span className="block font-cormorant italic text-[8px] md:text-[9px] tracking-[0.5em] text-clay mt-0.5 font-light">
            {t('brandSub')}
          </span>
        </div>
        <div className="flex items-center gap-3 md:gap-4">
          {/* 言語切替 */}
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
          {/* ハンバーガーボタン */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? t('close') : 'Menu'}
            aria-expanded={menuOpen}
            className="relative w-7 h-6 flex flex-col justify-center items-center z-[110]"
          >
            <span
              className={`absolute left-0 w-full h-px bg-sumi transition-all duration-300 ${
                menuOpen ? 'top-[11px] rotate-45' : 'top-1'
              }`}
            />
            <span
              className={`absolute left-0 w-full h-px bg-sumi transition-all duration-300 ${
                menuOpen ? 'top-[11px] -rotate-45' : 'top-[18px]'
              }`}
            />
          </button>
        </div>
      </header>

      {/* フルスクリーンメニューオーバーレイ */}
      <div
        className={`fixed inset-0 z-[105] bg-sumi transition-all duration-500 ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="h-full flex flex-col items-center justify-center px-6">
          <nav className="flex flex-col items-center gap-8 md:gap-10">
            {navItems.map((item, index) => (
              <button
                key={item.key}
                type="button"
                onClick={() => handleNavClick(item.href)}
                className={`text-kinari font-mincho text-[28px] md:text-[36px] tracking-[0.2em] hover:text-kin-light transition-all duration-300 ${
                  menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
                style={{
                  transitionDelay: menuOpen ? `${index * 100 + 200}ms` : '0ms',
                }}
              >
                {t(item.key as 'menu' | 'banquet' | 'stay' | 'info')}
              </button>
            ))}
          </nav>

          {/* 電話番号CTA */}
          <a
            href="tel:+81923282634"
            onClick={() => setMenuOpen(false)}
            className={`mt-16 font-cormorant text-kin-light text-[20px] tracking-[0.2em] border border-kin-light/40 px-8 py-3 hover:bg-kin-light hover:text-sumi transition-all duration-300 ${
              menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: menuOpen ? '600ms' : '0ms' }}
          >
            092-328-2634
          </a>
        </div>
      </div>
    </>
  );
}
