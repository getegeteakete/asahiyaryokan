'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';

type TabKey = 'kaisendon' | 'asahizen' | 'kamameshi' | 'teishoku';

export default function Menu() {
  const t = useTranslations('menu');
  const locale = useLocale();
  const isJa = locale === 'ja';
  const [active, setActive] = useState<TabKey>('kaisendon');

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'kaisendon', label: t('tabs.kaisendon') },
    { key: 'asahizen', label: t('tabs.asahizen') },
    { key: 'kamameshi', label: t('tabs.kamameshi') },
    { key: 'teishoku', label: t('tabs.teishoku') },
  ];

  return (
    <section
      id="menu"
      className="relative z-[2] bg-sumi text-kinari px-6 md:px-10 py-24 md:py-36"
    >
      <div className="max-w-[1200px] mx-auto">
        <p className="section-label !text-kin-light before:!bg-kin-light">{t('label')}</p>
        <h2 className="section-title [&_.sub]:!text-kin mb-6">
          {t('titleLine1')}
          <span className="sub">{t('sub')}</span>
        </h2>
        <p className="text-[14px] text-kinari/70 mb-12 font-light max-w-[600px]">{t('intro')}</p>

        {/* タブ */}
        <div className="flex border-b border-kinari/20 mb-16 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActive(tab.key)}
              className={`relative flex-shrink-0 bg-transparent border-0 py-4 px-6 whitespace-nowrap text-[14px] tracking-[0.25em] transition-all duration-300 ${
                active === tab.key
                  ? 'text-kinari after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-0.5 after:bg-kin-light'
                  : 'text-kinari/40 hover:text-kinari/60'
              }`}
              aria-pressed={active === tab.key}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 海鮮丼 */}
        {active === 'kaisendon' && (
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-start animate-fadeUp">
            <div className="relative w-full aspect-[3/2] mb-8 overflow-hidden shadow-2xl">
              <Image
                src="/images/030-海鮮丼000-1024x683.jpg"
                alt={t('kaisendon.name')}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                style={{ filter: 'brightness(0.88) saturate(1.1) contrast(1.05)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sumi/40 to-transparent" />
            </div>
            <div>
              <div className="mb-8">
                <div className="flex items-baseline gap-4 pb-6 border-b border-kinari/20">
                  <div className="flex-1">
                    <h3 className="text-[26px] font-medium tracking-[0.08em] mb-2">
                      {t('kaisendon.name')}
                    </h3>
                    <span
                      className={`block text-[12px] tracking-[0.2em] text-kin-light font-light ${
                        isJa ? 'font-cormorant italic' : 'font-mincho not-italic text-[11px]'
                      }`}
                    >
                      {t('kaisendon.enName')}
                    </span>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="font-cormorant text-[20px] text-kin-light block">
                      ¥{t('kaisendon.price')}
                    </div>
                    <span className="text-[10px] text-clay mt-0.5 tracking-[0.1em] block font-light">
                      {t('taxIncl')} ¥{t('kaisendon.priceIncl')}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-[14px] leading-[2] text-kinari/70 mb-8 font-light">
                {t('kaisendon.desc')}
              </p>
              <div className="mt-8 p-6 bg-kinari/5 border border-kinari/10">
                <div className="flex justify-between items-baseline">
                  <span className="text-[15px] tracking-[0.08em] font-light">{t('kaisendon.bowlOnly')}</span>
                  <div>
                    <div className="font-cormorant text-[18px] text-kin-light block text-right">
                      ¥{t('kaisendon.bowlOnlyPrice')}
                    </div>
                    <span className="text-[10px] text-clay tracking-[0.1em] block font-light text-right">
                      {t('taxIncl')} ¥{t('kaisendon.bowlOnlyPriceIncl')}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-kinari/50 mt-8 tracking-[0.1em] leading-[1.9] font-light">
                {t('kaisendon.note')}
              </p>
            </div>
          </div>
        )}

        {/* 朝日膳 */}
        {active === 'asahizen' && (
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-start animate-fadeUp">
            <div className="relative w-full aspect-[3/2] mb-8 overflow-hidden shadow-2xl">
              <Image
                src="/images/050-懐石003-1536x1024.jpg"
                alt={t('asahizen.name')}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                style={{ filter: 'brightness(0.88) saturate(1.1) contrast(1.05)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sumi/40 to-transparent" />
            </div>
            <div>
              <div className="mb-8">
                <div className="flex items-baseline gap-4 pb-6 border-b border-kinari/20">
                  <div className="flex-1">
                    <h3 className="text-[26px] font-medium tracking-[0.08em] mb-2">
                      {t('asahizen.name')}
                    </h3>
                    <span
                      className={`block text-[12px] tracking-[0.2em] text-kin-light font-light ${
                        isJa ? 'font-cormorant italic' : 'font-mincho not-italic text-[11px]'
                      }`}
                    >
                      {t('asahizen.enName')}
                    </span>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="font-cormorant text-[20px] text-kin-light block">
                      ¥{t('asahizen.price')}
                    </div>
                    <span className="text-[10px] text-clay mt-0.5 tracking-[0.1em] block font-light">
                      {t('taxIncl')} ¥{t('asahizen.priceIncl')}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-[14px] leading-[2] text-kinari/70 mb-8 font-light">
                {t('asahizen.desc')}
              </p>
              <p className="text-[11px] text-kinari/50 tracking-[0.1em] leading-[1.9] font-light">
                {t('asahizen.note')}
              </p>
            </div>
          </div>
        )}

        {/* 釜めし膳 */}
        {active === 'kamameshi' && (
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-start animate-fadeUp">
            <div className="relative w-full aspect-[3/2] mb-8 overflow-hidden shadow-2xl">
              <Image
                src="/images/110-生け簀002-1536x1024.jpg"
                alt={t('kamameshi.name')}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                style={{ filter: 'brightness(0.88) saturate(1.1) contrast(1.05)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sumi/40 to-transparent" />
            </div>
            <div>
              <div className="mb-8">
                <div className="flex items-baseline gap-4 pb-6 border-b border-kinari/20">
                  <div className="flex-1">
                    <h3 className="text-[26px] font-medium tracking-[0.08em] mb-2">
                      {t('kamameshi.name')}
                    </h3>
                    <span
                      className={`block text-[12px] tracking-[0.2em] text-kin-light font-light ${
                        isJa ? 'font-cormorant italic' : 'font-mincho not-italic text-[11px]'
                      }`}
                    >
                      {t('kamameshi.enName')}
                    </span>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="font-cormorant text-[20px] text-kin-light block">
                      ¥{t('kamameshi.price')}～
                    </div>
                    <span className="text-[10px] text-clay mt-0.5 tracking-[0.1em] block font-light">
                      {t('taxIncl')} ¥{t('kamameshi.priceIncl')}～
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-[14px] leading-[2] text-kinari/70 mb-8 font-light">
                {t('kamameshi.desc')}
              </p>

              <div className="mb-8 p-6 bg-kinari/5 border border-kinari/10">
                <p className={`text-[12px] tracking-[0.2em] text-kin-light mb-4 font-light ${
                  isJa ? 'font-cormorant italic' : 'font-mincho not-italic'
                }`}>
                  {t('kamameshi.ingredientsTitle')}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-[13px] tracking-[0.05em] font-light">
                    <span className="text-kin-light mr-2">・</span>{t('kamameshi.ing1')}
                  </div>
                  <div className="text-[13px] tracking-[0.05em] font-light">
                    <span className="text-kin-light mr-2">・</span>{t('kamameshi.ing2')}
                  </div>
                  <div className="text-[13px] tracking-[0.05em] font-light">
                    <span className="text-kin-light mr-2">・</span>{t('kamameshi.ing3')}
                  </div>
                  <div className="text-[13px] tracking-[0.05em] font-light">
                    <span className="text-kin-light mr-2">・</span>{t('kamameshi.ing4')}
                  </div>
                </div>
              </div>

              <div className="mb-6 p-5 bg-kinari/5 border border-kinari/10">
                <div className="flex justify-between items-baseline">
                  <span className="text-[15px] tracking-[0.08em] font-light">{t('kamameshi.potOnly')}</span>
                  <div>
                    <div className="font-cormorant text-[16px] text-kin-light block text-right">
                      ¥{t('kamameshi.potOnlyPrice')}
                    </div>
                    <span className="text-[10px] text-clay tracking-[0.1em] block font-light text-right">
                      {t('taxIncl')} ¥{t('kamameshi.potOnlyPriceIncl')}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-kinari/50 tracking-[0.1em] leading-[1.9] whitespace-pre-line font-light">
                {t('kamameshi.note')}
              </p>
            </div>
          </div>
        )}

        {/* 定食 */}
        {active === 'teishoku' && (
          <div className="animate-fadeUp">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
              <div className="relative w-full aspect-[3/2] overflow-hidden shadow-2xl">
                <Image
                  src="/images/010-朝日定食005-1024x683.jpg"
                  alt="朝日定食"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                  style={{ filter: 'brightness(0.88) saturate(1.1) contrast(1.05)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sumi/40 to-transparent" />
                <span className="absolute bottom-4 left-4 text-[12px] tracking-[0.2em] text-kinari/90 font-light">朝日定食</span>
              </div>
              <div className="relative w-full aspect-[3/2] overflow-hidden shadow-2xl">
                <Image
                  src="/images/020-鯛茶漬け000-scaled-e1703142049719-1024x580.jpg"
                  alt="鯛茶定食"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                  style={{ filter: 'brightness(0.88) saturate(1.1) contrast(1.05)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sumi/40 to-transparent" />
                <span className="absolute bottom-4 left-4 text-[12px] tracking-[0.2em] text-kinari/90 font-light">鯛茶定食</span>
              </div>
            </div>
            <p className="text-[14px] text-kinari/70 mb-8 font-light pb-8 border-b border-kinari/20">
              {t('teishoku.intro')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(t.raw('teishoku')).map(([key, value]: any) => {
                if (key === 'intro' || typeof value !== 'object') return null;
                return (
                  <div key={key} className="flex justify-between items-baseline gap-4 py-4 px-6 bg-kinari/5 border border-kinari/10 hover:border-kinari/30 transition-colors">
                    <span className="text-[15px] tracking-[0.08em] font-light flex-1">
                      {value.name}
                    </span>
                    <div className="text-right flex-shrink-0">
                      <div className="font-cormorant text-[16px] text-kin-light block">
                        ¥{value.price}
                      </div>
                      <span className="text-[10px] text-clay tracking-[0.1em] block font-light">
                        {t('taxIncl')} ¥{value.priceIncl}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
