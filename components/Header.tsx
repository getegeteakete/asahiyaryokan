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
    { key: 'lunch', href: '#menu' },
    { key: 'kaiseki', href: '#kaiseki' },
    { key: 'banquet', href: '#banquet' },
    { key: 'stay', href: '#stay' },
    { key: 'info', href: '#info' },
  ] as const;

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
        {/* ロゴ */}
        <div className="flex items-center">
          <img 
            src="/images/logo-black.png" 
            alt="朝日屋 ASAHIYA" 
            className="h-8 md:h-10 w-auto"
          />
        </div>

        <div className="flex items-center gap-4 md:gap-8">
          {/* PC用 横並びナビゲーション */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => handleNavClick(item.href)}
                className="font-mincho text-[14px] tracking-[0.2em] text-sumi hover:text-shu transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-px after:bg-shu after:transition-all hover:after:w-full"
              >
                {t(item.key)}
              </button>
            ))}
          </nav>

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

          {/* ハンバーガーボタン（モバイルのみ表示） */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? t('close') : 'Menu'}
            aria-expanded={menuOpen}
            className="md:hidden relative w-7 h-6 flex flex-col justify-center items-center z-[110]"
          >
            <span
              className={`absolute left-0 w-full h-0.5 transition-all duration-300 ${
                menuOpen ? 'top-[11px] rotate-45 bg-kinari' : 'top-1 bg-sumi'
              }`}
            />
            <span
              className={`absolute left-0 w-full h-0.5 transition-all duration-300 ${
                menuOpen ? 'top-[11px] -rotate-45 bg-kinari' : 'top-[18px] bg-sumi'
              }`}
            />
          </button>
        </div>
      </header>

      {/* モバイル用フルスクリーンメニュー - 和風デザイン */}
      <div
        className={`md:hidden fixed inset-0 z-[105] bg-gradient-to-b from-sumi via-sumi to-sumi-soft transition-all duration-500 ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        {/* 和風パターン背景 */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
            backgroundSize: '100% 4px'
          }} />
        </div>

        {/* 閉じるボタン（明確に表示） */}
        <button
          type="button"
          onClick={() => setMenuOpen(false)}
          aria-label={t('close')}
          className="absolute top-5 right-5 z-[120] w-10 h-10 flex items-center justify-center text-kin-light border border-kin-light/40 rounded-full hover:bg-kin-light/10 transition-colors"
        >
          <span className="text-[22px] leading-none">×</span>
        </button>

        <div className="h-full flex flex-col items-center justify-center px-6">
          {/* ロゴ・タイトル */}
          <div className="mb-12 text-center">
            <h1 className="font-mincho text-kin-light text-[28px] tracking-[0.3em] mb-2">
              朝日屋
            </h1>
            <p className="font-cormorant italic text-kin-light/70 text-[12px] tracking-[0.3em]">
              ASAHIYA
            </p>
          </div>

          {/* ナビゲーションメニュー */}
          <nav className="flex flex-col items-center w-full max-w-[280px]">
            {navItems.map((item, index) => (
              <button
                key={item.key}
                type="button"
                onClick={() => handleNavClick(item.href)}
                className={`w-full py-4 px-6 text-kin-light font-mincho text-[20px] tracking-[0.15em] border-b border-kin-light/20 hover:bg-kin-light/5 hover:border-kin-light/40 transition-all duration-300 text-center ${
                  menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
                style={{
                  transitionDelay: menuOpen ? `${index * 80 + 150}ms` : '0ms',
                }}
              >
                {t(item.key)}
              </button>
            ))}
          </nav>

          {/* 電話番号 */}
          <a
            href="tel:+81923282634"
            onClick={() => setMenuOpen(false)}
            className={`mt-12 font-cormorant text-kin-light text-[18px] tracking-[0.2em] border border-kin-light/40 px-8 py-3 hover:bg-kin-light hover:text-sumi transition-all duration-300 ${
              menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: menuOpen ? '550ms' : '0ms' }}
          >
            092-328-2634
          </a>
        </div>
      </div>
    </>
  );
}
