'use client';

import { useState, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';

export default function SideNav() {
  const t = useTranslations('sideNav');
  const locale = useLocale();
  const isJa = locale === 'ja';
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // ヒーローを過ぎたら表示
      setIsVisible(window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener('scroll', toggleVisibility);
    toggleVisibility();
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const items = [
    { key: 'lunch', href: '#menu', color: 'bg-shu hover:bg-shu-deep' },
    { key: 'kaiseki', href: '#kaiseki', color: 'bg-sumi hover:bg-sumi-soft' },
    { key: 'stay', href: '#stay', color: 'bg-kin hover:bg-kin-light hover:!text-sumi' },
  ] as const;

  const handleClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`flex fixed right-0 top-[42%] -translate-y-1/2 z-[90] flex-col gap-1.5 md:gap-2 transition-all duration-500 ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
      aria-label="クイックメニュー"
    >
      {items.map((item) => (
        <button
          key={item.key}
          type="button"
          onClick={() => handleClick(item.href)}
          className={`group relative flex items-center justify-center w-9 md:w-12 lg:w-14 py-4 md:py-6 lg:py-7 text-kinari-light ${item.color} transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-x-1`}
          style={{ borderTopLeftRadius: '6px', borderBottomLeftRadius: '6px' }}
        >
          <span
            className={`text-[11px] md:text-[15px] lg:text-[16px] tracking-[0.2em] md:tracking-[0.25em] font-light ${
              isJa ? 'font-mincho' : 'font-cormorant italic'
            }`}
            style={{ writingMode: 'vertical-rl' }}
          >
            {t(item.key)}
          </span>
        </button>
      ))}
    </nav>
  );
}
