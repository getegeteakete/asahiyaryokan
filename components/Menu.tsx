'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';

type TabKey = 'kaisendon' | 'asahizen' | 'kamameshi' | 'teishoku';

type PriceProps = {
  yen: string;
  excl?: string;
  dark?: boolean;
};

function Price({ yen, excl, dark = true }: PriceProps) {
  const t = useTranslations('menu');
  return (
    <span className="font-cormorant whitespace-nowrap text-right">
      {yen}
      {excl && (
        <span
          className={`block text-[10px] mt-0.5 tracking-[0.1em] ${
            dark ? 'text-kinari/50' : 'text-clay'
          }`}
        >
          {t('taxExcl')} ¥{excl}
        </span>
      )}
    </span>
  );
}

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

  const teishoku = [
    { key: 'arataki', price: '1,780', excl: '1,620' },
    { key: 'niyakana', price: '1,980', excl: '1,800' },
    { key: 'sashimi', price: '2,230', excl: '2,030' },
    { key: 'sashimiNi', price: '2,670', excl: '2,430' },
    { key: 'tempura', price: '1,980', excl: '1,800' },
    { key: 'sashimiTempura', price: '2,670', excl: '2,430' },
    { key: 'taicha', price: '2,230', excl: '2,030' },
  ] as const;

  return (
    <section
      id="menu"
      className="relative z-[2] bg-sumi text-kinari px-6 md:px-10 py-24 md:py-36"
    >
      <div className="max-w-[1200px] mx-auto">
        <p className="section-label !text-kin-light before:!bg-kin-light">{t('label')}</p>
        <h2 className="section-title [&_.sub]:!text-kin mb-12">
          {t('titleLine1')}
          <span className="sub">{t('sub')}</span>
        </h2>

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
                src="/images/kaisen-don.jpg"
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
                    <Price yen="¥2,890" excl="2,610" />
                  </div>
                </div>
              </div>
              <p className="text-[14px] leading-[2] text-kinari/70 mb-8 font-light">{t('kaisendon.desc')}</p>
              <div className="mt-8 p-6 bg-kinari/5 border border-kinari/10">
                <div className="flex justify-between items-baseline">
                  <span className="text-[15px] tracking-[0.08em] font-light">{t('kaisendon.bowlOnly')}</span>
                  <span className="text-[15px] text-kin-light">
                    <Price yen="¥2,200" excl="2,000" />
                  </span>
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
                src="/images/asahi-teishoku.jpg"
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
                    <Price yen="¥3,800" excl="3,450" />
                  </div>
                </div>
              </div>
              <p className="text-[14px] leading-[2] text-kinari/70 mb-8 font-light">{t('asahizen.desc')}</p>
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
                src="/images/kamameshi.jpg"
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
                    <Price yen="¥3,700〜" excl="3,360〜" />
                  </div>
                </div>
              </div>
              <p className="text-[14px] leading-[2] text-kinari/70 mb-8 font-light">{t('kamameshi.desc')}</p>

              <div className="mb-8 p-6 bg-kinari/5 border border-kinari/10">
                <p
                  className={`text-[12px] tracking-[0.2em] text-kin-light mb-4 font-light ${
                    isJa ? 'font-cormorant italic' : 'font-mincho not-italic'
                  }`}
                >
                  {t('kamameshi.ingredientsTitle')}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['ing1', 'ing2', 'ing3', 'ing4'].map((k) => (
                    <div key={k} className="text-[13px] tracking-[0.05em] font-light">
                      <span className="text-kin-light mr-2">・</span>
                      {t(`kamameshi.${k}` as never)}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6 p-5 bg-kinari/5 border border-kinari/10">
                <div className="flex justify-between items-baseline">
                  <span className="text-[15px] tracking-[0.08em] font-light">{t('kamameshi.potOnly')}</span>
                  <span className="text-[15px] text-kin-light">
                    <Price yen="¥1,700" excl="1,550" />
                  </span>
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
            <div className="grid divide-y divide-dotted divide-kinari/15">
              {teishoku.map((item) => (
                <div
                  key={item.key}
                  className="flex justify-between items-baseline gap-4 py-5 hover:bg-kinari/5 px-4 -mx-4 transition-colors"
                >
                  <span className="text-[15px] tracking-[0.08em] flex-1 font-light">
                    {t(`teishoku.${item.key}` as never)}
                  </span>
                  <span className="text-[15px] text-kin-light flex-shrink-0">
                    <Price yen={`¥${item.price}`} excl={item.excl} />
                  </span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-kinari/50 mt-8 tracking-[0.1em] leading-[1.9] font-light">
              {t('teishoku.note')}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
