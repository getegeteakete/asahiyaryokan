'use client';

import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Deco from './Deco';

type Item = { name: string; price: string; priceIncl?: string };

/**
 * 丼・膳・定食（海鮮丼／うに丼／朝日膳／定食）の「価格」の表示。
 * ※ 朝日釜めし膳の「¥3,600〜」だけはこの対象外で常に表示している。
 * 価格が変動しやすいため金額のみ非表示にし、導入文の「定食・膳 2,000〜」で案内している。
 * 品名・写真・説明文は常に表示。金額を戻す場合は true にするだけでよい。
 * ※ 姿造り・盛り合わせ／一品料理／焼き物の価格はこれまで通り表示している。
 */
const SHOW_SET_PRICES = false;

/** 一品料理・焼き物の価格表示。こちらも変動があるため非表示（品名のみ表示）。 */
const SHOW_ALA_CARTE_PRICES = false;

export default function Menu() {
  const t = useTranslations('menu');
  const locale = useLocale();
  const isJa = locale === 'ja';

  // 価格1行（時価などの非数値価格にも対応）
  const PriceRow = ({ name, price, priceIncl, hidePrice }: Item & { hidePrice?: boolean }) => {
    const isMarket = !/^[0-9]/.test(price);
    return (
      <div className="flex justify-between items-baseline gap-4 py-4 px-6 bg-kinari/5 border border-kinari/10 hover:border-kinari/30 transition-colors">
        <span className="text-[15px] tracking-[0.08em] font-light flex-1">{name}</span>
        <div className={`text-right flex-shrink-0 ${hidePrice ? 'hidden' : ''}`}>
          {isMarket ? (
            <div className="font-mincho text-[14px] text-kin-light">{price}</div>
          ) : (
            <div className="font-cormorant text-[16px] text-kin-light">¥{price}</div>
          )}
          {priceIncl ? (
            <span className="text-[10px] text-clay tracking-[0.1em] font-light">
              {t('taxIncl')} ¥{priceIncl}
            </span>
          ) : null}
        </div>
      </div>
    );
  };

  // 小見出し（一品料理・姿造り 等）
  const GroupTitle = ({ ja, en }: { ja: string; en: string }) => (
    <div className="flex items-baseline gap-4 mb-8">
      <h3 className="text-[26px] font-medium tracking-[0.08em]">{ja}</h3>
      <span
        className={`text-[12px] tracking-[0.2em] text-kin-light font-light ${
          isJa ? 'font-cormorant italic' : 'font-mincho not-italic'
        }`}
      >
        {en}
      </span>
    </div>
  );

  const teishoku = t.raw('teishoku') as { items: Item[] };
  const ippin = t.raw('ippin') as { items: Item[] };
  const sugata = t.raw('sugata') as { items: Item[] };
  const yakimono = t.raw('yakimono') as { items: Item[] };
  const variants = t.raw('kamameshi').variants as { name: string }[];

  return (
    <section
      id="menu"
      className="relative z-[2] bg-sumi text-kinari px-6 md:px-10 py-24 md:py-36 overflow-hidden"
    >
      {/* デザインパターン背景 */}
      <div className="absolute inset-0 opacity-[0.03] z-0">
        <img src="/images/asahiya-pattern.png" alt="" className="w-full h-full object-cover" />
      </div>

      <Deco type="shrimp" className="top-20 left-[-30px] md:left-4" size={220} opacity={0.07} rotate={20} variant="light" />
      <Deco type="crab" className="bottom-24 right-[-30px] md:right-6" size={240} opacity={0.06} rotate={-10} variant="light" />

      <div className="max-w-[1200px] mx-auto relative z-[2]">
        <p className="section-label !text-kin-light before:!bg-kin-light">{t('label')}</p>
        <h2 className="section-title [&_.sub]:!text-kin mb-6">
          {t('titleLine1')}
          <span className="sub">{t('sub')}</span>
        </h2>
        <div className="mb-16 md:mb-20 max-w-[640px] space-y-2">
          <p className="text-[14px] text-kinari/70 font-light">{t('intro')}</p>
          <p className="text-[14px] text-kinari/70 font-light">{t('introSets')}</p>
        </div>

        {/* 姿造り・盛り合わせ（お店の目玉のため、お品書きの最初に配置） */}
        <div className="mb-20 md:mb-28">
          <GroupTitle ja={t('sugata.title')} en="Whole-fish Sashimi" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sugata.items.map((it, i) => (
              <PriceRow key={i} {...it} />
            ))}
          </div>
          <p className="text-[11px] text-kinari/50 tracking-[0.1em] leading-[1.9] mt-5 font-light">{t('sugata.note')}</p>
        </div>

        {/* 海鮮丼 ＋ うに丼 */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 lg:items-center mb-20 md:mb-28">
          <div className="relative w-full aspect-[3/2] overflow-hidden shadow-2xl">
            <Image
              src="/images/030-海鮮丼000-1024x683.jpg"
              alt={t('kaisendon.name')}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              style={{ filter: 'brightness(0.92) saturate(1.1) contrast(1.05)' }}
            />
          </div>
          <div>
            {/* 海鮮丼 */}
            <div className="flex items-baseline gap-4 pb-6 border-b border-kinari/20 mb-6">
              <div className="flex-1">
                <h3 className="text-[26px] font-medium tracking-[0.08em] mb-2">{t('kaisendon.name')}</h3>
                <span className={`block text-[12px] tracking-[0.2em] text-kin-light font-light ${isJa ? 'font-cormorant italic' : 'font-mincho not-italic text-[11px]'}`}>
                  {t('kaisendon.enName')}
                </span>
              </div>
              {SHOW_SET_PRICES && (
                <div className="text-right flex-shrink-0">
                  <div className="font-cormorant text-[22px] text-kin-light">¥{t('kaisendon.price')}</div>
                  <span className="text-[10px] text-clay tracking-[0.1em] font-light">{t('taxIncl')} ¥{t('kaisendon.priceIncl')}</span>
                </div>
              )}
            </div>
            <p className="text-[14px] leading-[2] text-kinari/70 mb-10 font-light">{t('kaisendon.desc')}</p>

            {/* うに丼 */}
            <div className="flex items-baseline gap-4 pb-6 border-b border-kinari/20 mb-6">
              <div className="flex-1">
                <h3 className="text-[26px] font-medium tracking-[0.08em] mb-2">{t('unidon.name')}</h3>
                <span className={`block text-[12px] tracking-[0.2em] text-kin-light font-light ${isJa ? 'font-cormorant italic' : 'font-mincho not-italic text-[11px]'}`}>
                  {t('unidon.enName')}
                </span>
              </div>
              {SHOW_SET_PRICES && (
                <div className="text-right flex-shrink-0">
                  <div className="font-cormorant text-[22px] text-kin-light">¥{t('unidon.price')}</div>
                  <span className="text-[10px] text-clay tracking-[0.1em] font-light">{t('taxIncl')} ¥{t('unidon.priceIncl')}</span>
                </div>
              )}
            </div>
            <p className="text-[14px] leading-[2] text-kinari/70 font-light">{t('unidon.desc')}</p>
          </div>
        </div>

        {/* 朝日膳 - 画像右 */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 lg:items-center mb-20 md:mb-28">
          <div className="lg:order-2 relative w-full aspect-[3/2] overflow-hidden shadow-2xl">
            <Image
              src="/images/010-朝日定食005-1024x683.jpg"
              alt={t('asahizen.name')}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              style={{ filter: 'brightness(0.92) saturate(1.1) contrast(1.05)' }}
            />
          </div>
          <div className="lg:order-1">
            <div className="flex items-baseline gap-4 pb-6 border-b border-kinari/20 mb-6">
              <div className="flex-1">
                <h3 className="text-[26px] font-medium tracking-[0.08em] mb-2">{t('asahizen.name')}</h3>
                <span className={`block text-[12px] tracking-[0.2em] text-kin-light font-light ${isJa ? 'font-cormorant italic' : 'font-mincho not-italic text-[11px]'}`}>
                  {t('asahizen.enName')}
                </span>
              </div>
              {SHOW_SET_PRICES && (
                <div className="text-right flex-shrink-0">
                  <div className="font-cormorant text-[22px] text-kin-light">¥{t('asahizen.price')}</div>
                  <span className="text-[10px] text-clay tracking-[0.1em] font-light">{t('taxIncl')} ¥{t('asahizen.priceIncl')}</span>
                </div>
              )}
            </div>
            <p className="text-[14px] leading-[2] text-kinari/70 font-light">{t('asahizen.desc')}</p>
          </div>
        </div>

        {/* 朝日釜めし膳 - 画像左 */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 lg:items-center mb-20 md:mb-28">
          <div className="relative w-full aspect-[3/2] overflow-hidden shadow-2xl">
            <Image
              src="/images/017-kamameshi-deluxe.jpg"
              alt={t('kamameshi.name')}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              style={{ filter: 'brightness(0.92) saturate(1.1) contrast(1.05)' }}
            />
          </div>
          <div>
            <div className="flex items-baseline gap-4 pb-6 border-b border-kinari/20 mb-6">
              <div className="flex-1">
                <h3 className="text-[26px] font-medium tracking-[0.08em] mb-2">{t('kamameshi.name')}</h3>
                <span className={`block text-[12px] tracking-[0.2em] text-kin-light font-light ${isJa ? 'font-cormorant italic' : 'font-mincho not-italic text-[11px]'}`}>
                  {t('kamameshi.enName')}
                </span>
              </div>
              {/* 具材ごとの価格は変動するため、基準となる価格のみを「〜」付きで表示。
                  ここは他の丼・膳と違い、常に表示する（SHOW_SET_PRICES の対象外）。 */}
              <div className="text-right flex-shrink-0">
                <div className="font-cormorant text-[22px] text-kin-light">¥{t('kamameshi.price')}〜</div>
                <span className="text-[10px] text-clay tracking-[0.1em] font-light">{t('taxIncl')} ¥{t('kamameshi.priceIncl')}〜</span>
              </div>
            </div>
            <p className="text-[14px] leading-[2] text-kinari/70 mb-6 font-light">{t('kamameshi.desc')}</p>

            <div className="mb-5 p-5 bg-kinari/5 border border-kinari/10">
              <p className={`text-[12px] tracking-[0.2em] text-kin-light mb-4 font-light ${isJa ? 'font-cormorant italic' : 'font-mincho not-italic'}`}>
                {t('kamameshi.variantsTitle')}
              </p>
              <div className="flex flex-col gap-3">
                {variants.map((v, i) => (
                  <div key={i} className="border-b border-kinari/10 last:border-0 pb-3 last:pb-0">
                    <span className="text-[14px] tracking-[0.05em] font-light"><span className="text-kin-light mr-2">・</span>{v.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-[11px] text-kinari/50 tracking-[0.1em] leading-[1.9] whitespace-pre-line font-light">{t('kamameshi.note')}</p>
          </div>
        </div>

        {/* 定食 */}
        <div className="pt-8 border-t border-kinari/20">
          <GroupTitle ja={teishoku ? t('teishoku.title') : '定食'} en="Set Meals" />

          <div className="grid md:grid-cols-2 gap-4 mb-10">
            <div className="relative w-full aspect-[3/2] overflow-hidden shadow-2xl">
              <Image src="/images/021-taichaten-teishoku-new.jpg" alt="刺身定食" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" style={{ filter: 'brightness(0.92) saturate(1.1) contrast(1.05)' }} />
              <div className="absolute inset-0 bg-gradient-to-t from-sumi/40 to-transparent" />
            </div>
            <div className="relative w-full aspect-[3/2] overflow-hidden shadow-2xl">
              <Image src="/images/011-asahi-teishoku-new.jpg" alt="鯛茶づけ" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" style={{ filter: 'brightness(0.92) saturate(1.1) contrast(1.05)' }} />
              <div className="absolute inset-0 bg-gradient-to-t from-sumi/40 to-transparent" />
            </div>
          </div>

          <p className="text-[14px] text-kinari/70 mb-2 font-light">{t('teishoku.intro')}</p>
          {/* 個別の金額は非表示のため、目安の価格をここで案内する */}
          <p className="text-[14px] text-kin-light mb-8 font-light">{t('teishoku.priceFrom')}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teishoku.items.map((it, i) => (
              <PriceRow key={i} {...it} hidePrice={!SHOW_SET_PRICES} />
            ))}
          </div>
          {/* おかわり・大盛などの金額を含む注記のため、価格非表示中は一緒に隠す */}
          {SHOW_SET_PRICES && (
            <p className="text-[11px] text-kinari/50 tracking-[0.1em] leading-[1.9] mt-5 font-light">{t('teishoku.note')}</p>
          )}
        </div>

        {/* 一品料理 */}
        <div className="mt-16 pt-12 border-t border-kinari/20">
          <GroupTitle ja={t('ippin.title')} en="À la carte" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ippin.items.map((it, i) => (
              <PriceRow key={i} {...it} hidePrice={!SHOW_ALA_CARTE_PRICES} />
            ))}
          </div>
          <p className="text-[11px] text-kinari/50 tracking-[0.1em] leading-[1.9] mt-5 font-light">{t('ippin.note')}</p>
        </div>

        {/* 焼き物 */}
        <div className="mt-16 pt-12 border-t border-kinari/20">
          <GroupTitle ja={t('yakimono.title')} en="Grilled" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {yakimono.items.map((it, i) => (
              <PriceRow key={i} {...it} hidePrice={!SHOW_ALA_CARTE_PRICES} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
