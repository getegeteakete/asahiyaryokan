import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Kaiseki() {
  const t = useTranslations('kaiseki');

  const features = ['feat1', 'feat2', 'feat3', 'feat4'] as const;

  return (
    <section className="relative z-[2] bg-kinari px-6 md:px-10 py-24 md:py-30">
      <div className="max-w-[1100px] mx-auto">
        <p className="section-label">{t('label')}</p>
        <h2 className="section-title">
          {t('titleLine1')}
          <br />
          {t('titleLine2')}
          <span className="sub">{t('sub')}</span>
        </h2>

        <div className="grid gap-8 md:grid-cols-2 md:gap-20 md:items-center mt-8">
          <div className="relative">
            {/* 金の内枠 */}
            <div className="pointer-events-none absolute inset-3 border border-kin z-[2]" />
            <div className="relative w-full aspect-[4/5] overflow-hidden">
              <Image
                src="/images/kaiseki-01.jpg"
                alt="朝日懐石"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          <div>
            <div className="font-cormorant text-[40px] tracking-[0.05em] text-shu mb-2">
              ¥4,000
              <span className="text-sm text-clay ml-1">{t('priceUnit')}</span>
            </div>
            <p className="text-[13px] text-clay italic mb-6">{t('priceNote')}</p>
            <p className="text-[14px] leading-[2.1] text-sumi-soft">{t('body')}</p>

            <div className="mt-7 pt-7 border-t border-sumi/15 grid gap-3">
              {features.map((key) => (
                <div
                  key={key}
                  className="flex gap-3 text-[13px] text-sumi-soft items-center"
                >
                  <span className="w-1 h-1 bg-shu rounded-full shrink-0" />
                  {t(key)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
