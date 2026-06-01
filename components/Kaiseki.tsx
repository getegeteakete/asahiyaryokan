import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Kaiseki() {
  const t = useTranslations('kaiseki');

  const features = ['feat1', 'feat2', 'feat3', 'feat4'] as const;

  return (
    <section className="relative z-[2] bg-gradient-to-br from-kinari to-washi px-6 md:px-10 py-24 md:py-36 border-y border-sumi/5">
      <div className="max-w-[1200px] mx-auto">
        <p className="section-label text-shu">{t('label')}</p>
        <h2 className="section-title mb-12">
          {t('titleLine1')}
          <br />
          {t('titleLine2')}
          <span className="sub text-kin block text-[16px] font-light tracking-widest mt-4">{t('sub')}</span>
        </h2>

        <div className="grid gap-12 md:grid-cols-2 md:gap-20 md:items-start">
          <div className="relative">
            {/* 金の内枠 */}
            <div className="absolute inset-4 border border-kin/50 z-[2] pointer-events-none" />
            <div className="relative w-full aspect-[4/5] overflow-hidden shadow-lg">
              <Image
                src="/images/kaiseki-01.jpg"
                alt={t('titleLine2')}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
                style={{ filter: 'sepia(0.08) saturate(1.02)' }}
              />
            </div>
          </div>

          <div className="md:pt-4">
            <div className="mb-6">
              <div className="font-cormorant text-[48px] tracking-[0.08em] text-shu mb-2 leading-tight">
                ¥4,000
                <span className="text-[14px] text-clay ml-2 align-super">{t('priceUnit')}</span>
              </div>
              <p className="text-[12px] text-clay italic tracking-[0.1em]">{t('priceNote')}</p>
            </div>
            
            <p className="text-[15px] leading-[2] text-sumi-soft mb-10 font-light">{t('body')}</p>

            <div className="pt-8 border-t border-sumi/10 grid gap-4">
              {features.map((key) => (
                <div
                  key={key}
                  className="flex gap-4 text-[14px] text-sumi-soft items-start"
                >
                  <span className="w-1.5 h-1.5 bg-kin rounded-full shrink-0 mt-2" />
                  <span className="font-light leading-relaxed">{t(key)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
