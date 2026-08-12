import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Deco from './Deco';

type Item = { name: string; price: string; priceIncl?: string };

export default function About() {
  const t = useTranslations('about');
  const tm = useTranslations('menu');
  // お造り（姿造り・盛り合わせ）はお店の目玉のため、店紹介の並びにも掲げる
  const sugata = tm.raw('sugata') as { title: string; note: string; items: Item[] };

  return (
    <section className="relative z-[2] bg-kinari-light px-6 md:px-10 py-24 md:py-36 overflow-hidden">
      <Deco type="squid" className="top-12 right-[-40px] md:right-8" size={280} opacity={0.06} rotate={-15} variant="dark" />
      <div className="max-w-[1200px] mx-auto relative z-[2]">
        {/* スマホでは 本文 → 写真（いけす） → お造りのお品書き の順に並ぶ。
            PC では左列の下段にお品書きを置き、右列の写真と横並びにする。 */}
        <div className="grid gap-16 md:grid-cols-2 md:gap-x-24 md:gap-y-12 md:items-start">
          <div className="md:pt-4 md:col-start-1 md:row-start-1">
            <p className="section-label text-shu">{t('label')}</p>
            <h2 className="section-title mb-10">
              {t('titleLine1')}
              <br />
              {t('titleLine2')}
              <span className="sub text-kin block text-[16px] font-light tracking-widest mt-4">{t('sub')}</span>
            </h2>
            <div className="space-y-6">
              <p className="text-[15px] leading-[1.95] text-sumi-soft font-light">{t('body1')}</p>
              <p className="text-[15px] leading-[1.95] text-sumi-soft font-light border-l-2 border-kin pl-6">{t('body2')}</p>
            </div>

          </div>

          <div className="relative md:col-start-2 md:row-start-1 md:row-span-2">
            <div className="relative aspect-[4/3] overflow-hidden shadow-lg mb-4">
              <Image
                src="/images/011-asahi-teishoku-new.jpg"
                alt={t('titleLine1')}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
                style={{ filter: 'sepia(0.08) saturate(0.98) brightness(1.02)' }}
              />
            </div>
            <div className="relative aspect-[3/2] overflow-hidden shadow-lg">
              {/* いけス風背景 */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1e4d7b] via-[#2a5f8f] to-[#1a3d5f]" />
              <div 
                className="absolute inset-0 opacity-20" 
                style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px), repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(0,0,0,0.1) 3px, rgba(0,0,0,0.1) 6px)',
                  backgroundSize: '4px 4px'
                }}
              />
              {/* 水紋エフェクト */}
              <div className="absolute inset-0 opacity-25" style={{
                backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.05) 0%, transparent 50%)',
              }} />
              
              {/* 活魚の画像 */}
              <Image
                src="/images/110-ikesus-fresh.jpg"
                alt="生け簀の活魚"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover mix-blend-screen"
                style={{ filter: 'saturate(1.05) brightness(1.02)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sumi/20 to-transparent" />
              <div className="absolute bottom-3 left-3 text-[11px] tracking-[0.2em] text-white/90 font-light drop-shadow-lg z-10">
                いけすの活魚
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-kin/5 -z-10 rounded-full blur-3xl" />
          </div>

          {/* お造りのお品書き（いけすの写真を見たあとに価格が目に入る並び） */}
          <div className="md:col-start-1 md:row-start-2 bg-washi/80 border border-sumi/10 shadow-sm rounded-sm p-6 md:p-8">
              <div className="flex items-baseline gap-3 pb-4 mb-5 border-b border-sumi/10">
                <h3 className="text-[19px] md:text-[21px] font-medium tracking-[0.08em]">{sugata.title}</h3>
                <span className="text-[11px] tracking-[0.2em] text-kin font-cormorant italic font-light">
                  sashimi
                </span>
              </div>
              {/* 金額はお品書きの姿造り一覧にのみ掲載し、ここは品名のみ */}
              <ul className="space-y-3">
                {sugata.items.map((it, i) => (
                  <li
                    key={i}
                    className="border-b border-sumi/5 last:border-0 pb-3 last:pb-0"
                  >
                    <span className="text-[14px] leading-[1.7] text-sumi-soft font-light">
                      {it.name}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="text-[11px] text-clay leading-[1.9] mt-5 font-light">{sugata.note}</p>
            </div>
        </div>
      </div>
    </section>
  );
}
