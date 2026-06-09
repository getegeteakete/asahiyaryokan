import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Deco from './Deco';

function InfoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[130px_1fr] md:grid-cols-[180px_1fr] gap-6 md:gap-12 py-5 border-b border-kinari/15 items-baseline">
      <div className="font-cormorant italic text-[11px] tracking-[0.25em] text-kin-light uppercase font-light">
        {label}
      </div>
      <div className="text-[14px] leading-[1.95] text-kinari/85 font-light">{children}</div>
    </div>
  );
}

export default function Access() {
  const t = useTranslations('access');

  return (
    <section
      id="info"
      className="relative z-[2] bg-sumi text-kinari px-6 md:px-10 py-24 md:py-36 overflow-hidden"
    >
      {/* デザインパターン背景 */}
      <div className="absolute inset-0 opacity-[0.03] z-0">
        <img
          src="/images/asahiya-pattern.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      
      <Deco type="squid" className="bottom-16 left-[-50px] md:left-4" size={260} opacity={0.06} rotate={12} variant="light" />
      <div className="max-w-[1200px] mx-auto relative z-[2]">
        <p className="section-label !text-kin-light before:!bg-kin-light">{t('label')}</p>
        <h2 className="section-title [&_.sub]:!text-kin mb-14">
          {t('titleLine1')}
          <span className="sub">{t('sub')}</span>
        </h2>

        {/* お店の写真ギャラリー */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          <div className="relative aspect-[4/3] overflow-hidden shadow-xl md:col-span-2 md:row-span-2 md:aspect-auto group">
            <Image
              src="/images/exterior.png"
              alt="朝日屋 外観"
              fill
              sizes="(min-width: 768px) 66vw, 100vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-sumi/30 to-transparent" />
            <span className="absolute bottom-5 left-5 text-[13px] tracking-[0.2em] text-kinari font-light drop-shadow-lg">外観</span>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden shadow-xl group">
            <Image
              src="/images/interior.png"
              alt="朝日屋 店内"
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-sumi/30 to-transparent" />
            <span className="absolute bottom-4 left-4 text-[12px] tracking-[0.2em] text-kinari font-light drop-shadow-lg">店内</span>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden shadow-xl group">
            {/* いけス風背景 - 藍色の木目調パターン */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1e4d7b] via-[#2a5f8f] to-[#1a3d5f]" />
            <div 
              className="absolute inset-0 opacity-15" 
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px), repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(0,0,0,0.1) 3px, rgba(0,0,0,0.1) 6px)',
                backgroundSize: '4px 4px'
              }}
            />
            {/* 水紋エフェクト */}
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.05) 0%, transparent 50%)',
            }} />
            
            {/* 活魚の画像 */}
            <Image
              src="/images/110-ikesus-fresh.jpg"
              alt="朝日屋 いけす"
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700 mix-blend-screen"
            />
            
            {/* グラデーションオーバーレイ（暗く見せて、テキストを見えやすく） */}
            <div className="absolute inset-0 bg-gradient-to-t from-sumi/40 via-transparent to-transparent" />
            
            {/* 「生け簀」ラベル - デザイン性を持たせた */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <p className="text-[24px] md:text-[32px] font-mincho text-kin-light/80 tracking-[0.3em] drop-shadow-lg mb-2">
                  生け簀
                </p>
                <p className="text-[10px] font-cormorant italic text-kin-light/60 tracking-[0.2em] drop-shadow-md">
                  IKESUS · FRESH FISH TANKS
                </p>
              </div>
            </div>
            
            {/* 左下のラベル（従来のスタイル） */}
            <span className="absolute bottom-4 left-4 text-[12px] tracking-[0.2em] text-kinari font-light drop-shadow-lg z-10">いけす</span>
          </div>
        </div>

        <div className="grid mb-12">
          <InfoRow label={t('address')}>{t('addressValue')}</InfoRow>
          <InfoRow label={t('contact')}>
            <a
              href="tel:+81923282634"
              className="text-kin-light border-b border-transparent hover:border-kin-light transition-colors"
            >
              092-328-2634
            </a>
            　・　
            <a
              href="tel:+818027547721"
              className="text-kin-light border-b border-transparent hover:border-kin-light transition-colors"
            >
              080-2754-7721
            </a>
          </InfoRow>
          <InfoRow label={t('hours')}>{t('hoursValue')}</InfoRow>
          <InfoRow label={t('closed')}>{t('closedValue')}</InfoRow>
          <InfoRow label={t('lodging')}>{t('lodgingValue')}</InfoRow>
          <InfoRow label={t('payment')}>{t('paymentValue')}</InfoRow>
          <InfoRow label={t('seats')}>{t('seatsValue')}</InfoRow>
          <InfoRow label={t('parking')}>{t('parkingValue')}</InfoRow>
          <InfoRow label={t('other')}>{t('otherValue')}</InfoRow>
        </div>

        <p className="text-[12px] leading-[1.95] text-kinari/55 font-light mb-12">{t('noteValue')}</p>

        {/* Googleマップ */}
        <div className="mb-12 relative shadow-xl overflow-hidden">
          <iframe
            src="https://maps.google.com/maps?q=%E7%A6%8F%E5%B2%A1%E7%9C%8C%E7%B3%B8%E5%B3%B6%E5%B8%82%E5%BF%97%E6%91%A9%E8%8A%A5%E5%B1%8B874-3&t=m&z=15&output=embed&iwloc=near"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="朝日屋 - 所在地"
            className="block w-full aspect-[16/10] border-0"
            style={{ filter: 'grayscale(0.25) sepia(0.12) contrast(1.05)' }}
          />
        </div>

        {/* CTA */}
        <div className="grid gap-4 md:grid-cols-2">
          <a
            href="tel:+81923282634"
            className="block text-center py-4 px-6 bg-shu border border-shu text-kinari-light text-[13px] tracking-[0.3em] font-light transition-all hover:bg-shu-deep hover:border-shu-deep hover:shadow-lg"
          >
            {t('ctaPhone')}
          </a>
          <a
            href="https://www.instagram.com/keyaasahiya"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center py-4 px-6 bg-transparent border border-kin-light text-kin-light text-[13px] tracking-[0.3em] font-light transition-all hover:bg-kin-light hover:text-sumi hover:shadow-lg"
          >
            {t('ctaInstagram')}
          </a>
        </div>
      </div>
    </section>
  );
}
