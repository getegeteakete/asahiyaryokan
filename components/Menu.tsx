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
      className="relative z-[2] bg-sumi text-kinari px-6 md:px-10 py-24 md:py-30"
    >
      <div className="max-w-[1100px] mx-auto">
        <p className="section-label !text-kin-light before:!bg-kin-light">{t('label')}</p>
        <h2 className="section-title [&_.sub]:!text-clay">
          {t('titleLine1')}
          <span className="sub">{t('sub')}</span>
        </h2>

        {/* タブ */}
        <div className="flex border-b border-kinari/[0.15] mb-12 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActive(tab.key)}
              className={`relative flex-shrink-0 bg-transparent border-0 py-4 px-5 whitespace-nowrap text-[13px] tracking-[0.3em] transition-colors ${
                active === tab.key
                  ? 'text-kinari after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-px after:bg-kin-light'
                  : 'text-kinari/50'
              }`}
              aria-pressed={active === tab.key}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 海鮮丼 */}
        {active === 'kaisendon' && (
          <div className="lg:grid lg:grid-cols-2 lg:gap-15 lg:items-start animate-fadeUp">
            <div className="relative w-full aspect-[3/2] mb-5 overflow-hidden">
              <Image
                src="/images/kaisen-don.jpg"
                alt={t('kaisendon.name')}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                style={{ filter: 'brightness(0.92) saturate(1.05)' }}
              />
            </div>
            <div>
              <div className="flex justify-between items-baseline gap-4 pb-4 border-b border-dashed border-kinari/20 mb-4">
                <div className="text-[22px] font-medium tracking-[0.1em]">
                  {t('kaisendon.name')}
                  <span
                    className={`block text-[12px] tracking-[0.2em] text-kin-light mt-1 font-light ${
                      isJa ? 'font-cormorant italic' : 'font-mincho not-italic text-[11px]'
                    }`}
                  >
                    {t('kaisendon.enName')}
                  </span>
                </div>
                <div className="text-[22px] text-kin-light">
                  <Price yen="¥2,890" excl="2,610" />
                </div>
              </div>
              <p className="text-[13px] leading-[2] text-kinari/75">{t('kaisendon.desc')}</p>
              <div className="mt-5">
                <div className="flex justify-between items-baseline py-4.5 border-b border-dotted border-kinari/15">
                  <span className="text-[15px] tracking-[0.08em]">{t('kaisendon.bowlOnly')}</span>
                  <span className="text-[15px] text-kin-light">
                    <Price yen="¥2,200" excl="2,000" />
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-kinari/55 mt-5 tracking-[0.1em] leading-[1.8]">
                {t('kaisendon.note')}
              </p>
            </div>
          </div>
        )}

        {/* 朝日膳 */}
        {active === 'asahizen' && (
          <div className="lg:grid lg:grid-cols-2 lg:gap-15 lg:items-start animate-fadeUp">
            <div className="relative w-full aspect-[3/2] mb-5 overflow-hidden">
              <Image
                src="/images/asahi-teishoku.jpg"
                alt={t('asahizen.name')}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                style={{ filter: 'brightness(0.92) saturate(1.05)' }}
              />
            </div>
            <div>
              <div className="flex justify-between items-baseline gap-4 pb-4 border-b border-dashed border-kinari/20 mb-4">
                <div className="text-[22px] font-medium tracking-[0.1em]">
                  {t('asahizen.name')}
                  <span
                    className={`block text-[12px] tracking-[0.2em] text-kin-light mt-1 font-light ${
                      isJa ? 'font-cormorant italic' : 'font-mincho not-italic text-[11px]'
                    }`}
                  >
                    {t('asahizen.enName')}
                  </span>
                </div>
                <div className="text-[22px] text-kin-light">
                  <Price yen="¥3,800" excl="3,450" />
                </div>
              </div>
              <p className="text-[13px] leading-[2] text-kinari/75">{t('asahizen.desc')}</p>
              <p className="text-[11px] text-kinari/55 mt-5 tracking-[0.1em]">
                {t('asahizen.note')}
              </p>
            </div>
          </div>
        )}

        {/* 釜めし膳 */}
        {active === 'kamameshi' && (
          <div className="lg:grid lg:grid-cols-2 lg:gap-15 lg:items-start animate-fadeUp">
            <div className="relative w-full aspect-[3/2] mb-5 overflow-hidden">
              <Image
                src="/images/kamameshi.jpg"
                alt={t('kamameshi.name')}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                style={{ filter: 'brightness(0.92) saturate(1.05)' }}
              />
            </div>
            <div>
              <div className="flex justify-between items-baseline gap-4 pb-4 border-b border-dashed border-kinari/20 mb-4">
                <div className="text-[22px] font-medium tracking-[0.1em]">
                  {t('kamameshi.name')}
                  <span
                    className={`block text-[12px] tracking-[0.2em] text-kin-light mt-1 font-light ${
                      isJa ? 'font-cormorant italic' : 'font-mincho not-italic text-[11px]'
                    }`}
                  >
                    {t('kamameshi.enName')}
                  </span>
                </div>
                <div className="text-[22px] text-kin-light">
                  <Price yen="¥3,700〜" excl="3,360〜" />
                </div>
              </div>
              <p className="text-[13px] leading-[2] text-kinari/75">{t('kamameshi.desc')}</p>

              <div className="mt-6 p-5 border border-kinari/15">
                <p
                  className={`text-[12px] tracking-[0.25em] text-kin-light mb-3.5 ${
                    isJa ? 'font-cormorant italic' : 'font-mincho not-italic'
                  }`}
                >
                  {t('kamameshi.ingredientsTitle')}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                  {['ing1', 'ing2', 'ing3', 'ing4'].map((k) => (
                    <div key={k} className="text-[14px] tracking-[0.1em] py-1.5">
                      <span className="text-kin-light mr-1">・</span>
                      {t(`kamameshi.${k}` as never)}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5">
                <div className="flex justify-between items-baseline py-4.5 border-b border-dotted border-kinari/15">
                  <span className="text-[15px] tracking-[0.08em]">{t('kamameshi.potOnly')}</span>
                  <span className="text-[15px] text-kin-light">
                    <Price yen="¥1,700" excl="1,550" />
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-kinari/55 mt-5 tracking-[0.1em] leading-[1.8] whitespace-pre-line">
                {t('kamameshi.note')}
              </p>
            </div>
          </div>
        )}

        {/* 定食 */}
        {active === 'teishoku' && (
          <div className="animate-fadeUp">
            <div className="grid">
              {teishoku.map((item) => (
                <div
                  key={item.key}
                  className="flex justify-between items-baseline gap-3 py-[18px] border-b border-dotted border-kinari/15 last:border-b-0"
                >
                  <span className="text-[15px] tracking-[0.08em]">
                    {t(`teishoku.${item.key}` as never)}
                  </span>
                  <span className="text-[15px] text-kin-light">
                    <Price yen={`¥${item.price}`} excl={item.excl} />
                  </span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-kinari/55 mt-5 tracking-[0.1em]">
              {t('teishoku.note')}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
