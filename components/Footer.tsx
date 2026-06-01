'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');

  // フッター用の料理写真8枚
  const dishImages = [
    { src: '/images/001-kaiseki-01.jpg', label: '懐石' },
    { src: '/images/002-kaisen-don-new.jpg', label: '海鮮丼' },
    { src: '/images/006-sashimi-platter.jpg', label: '刺身盛り' },
    { src: '/images/007-white-fish-sashimi.jpg', label: 'お造り' },
    { src: '/images/011-kaiseki-set.jpg', label: '懐石膳' },
    { src: '/images/012-kaisen-don.jpg', label: 'カイセン丼' },
    { src: '/images/013-shellfish-sashimi.jpg', label: '貝類' },
    { src: '/images/016-kaiseki-deluxe.jpg', label: '朝日懐石' },
  ];

  // フッターメニュー
  const footerMenuItems = [
    { key: 'menu', href: '#menu' },
    { key: 'kaiseki', href: '#kaiseki' },
    { key: 'banquet', href: '#banquet' },
    { key: 'stay', href: '#stay' },
  ];

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-sumi text-kinari/60">
      {/* 料理写真ギャラリー */}
      <div className="bg-sumi px-6 md:px-10 py-12 md:py-16 border-t border-kinari/[0.1]">
        <div className="max-w-[1200px] mx-auto">
          {/* ギャラリータイトル */}
          <h3 className="font-mincho text-kin-light text-center text-[18px] md:text-[20px] tracking-[0.2em] mb-8 md:mb-12">
            朝日屋の料理
          </h3>

          {/* 料理写真グリッド：モバイル2列、PC4列 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {dishImages.map((dish, index) => (
              <div
                key={index}
                className="relative aspect-square overflow-hidden shadow-lg group hover:shadow-2xl transition-shadow duration-300"
              >
                <Image
                  src={dish.src}
                  alt={dish.label}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* ラベルオーバーレイ */}
                <div className="absolute inset-0 bg-gradient-to-t from-sumi/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <span className="text-kin-light text-[12px] tracking-[0.15em] font-light">
                    {dish.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* フッターメニュー */}
      <div className="bg-sumi/80 backdrop-blur px-6 md:px-10 py-8 md:py-10 border-t border-kinari/[0.1]">
        <div className="max-w-[1200px] mx-auto">
          <nav className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mb-8">
            {footerMenuItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.href)}
                className="font-mincho text-[13px] md:text-[14px] text-kin-light tracking-[0.15em] hover:text-kin transition-colors duration-300 border-b-2 border-transparent hover:border-kin-light pb-1"
              >
                {tNav(item.key)}
              </button>
            ))}
          </nav>

          {/* コピーライト */}
          <div className="flex items-center justify-center gap-3.5 text-kin text-[10px] md:text-[11px] tracking-[0.2em] font-cormorant italic">
            <span className="w-1.5 h-1.5 border border-current rotate-45" />
            <span>{t('copy')}</span>
            <span className="w-1.5 h-1.5 border border-current rotate-45" />
          </div>
        </div>
      </div>
    </footer>
  );
}
