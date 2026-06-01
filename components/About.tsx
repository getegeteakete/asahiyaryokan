import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Deco from './Deco';

export default function About() {
  const t = useTranslations('about');

  return (
    <section className="relative z-[2] bg-kinari-light px-6 md:px-10 py-24 md:py-36 overflow-hidden">
      <Deco type="squid" className="top-12 right-[-40px] md:right-8" size={280} opacity={0.06} rotate={-15} variant="dark" />
      <div className="max-w-[1200px] mx-auto relative z-[2]">
        <div className="grid gap-16 md:grid-cols-2 md:gap-24 md:items-start">
          <div className="md:pt-4">
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
          <div className="relative">
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
        </div>
      </div>
    </section>
  );
}
