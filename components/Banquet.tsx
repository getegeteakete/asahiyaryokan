import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Banquet() {
  const t = useTranslations('banquet');
  const features = ['feat1', 'feat2', 'feat3', 'feat4'] as const;

  return (
    <section id="banquet" className="relative z-[2] bg-kinari-light px-6 md:px-10 py-24 md:py-36">
      <div className="max-w-[1200px] mx-auto">
        <p className="section-label text-shu">{t('label')}</p>
        <h2 className="section-title mb-12">
          {t('titleLine1')}
          <br />
          {t('titleLine2')}
          <span className="sub text-kin block text-[16px] font-light tracking-widest mt-4">{t('sub')}</span>
        </h2>

        {/* メイン画像 */}
        <div className="relative w-full aspect-[16/9] mb-8 overflow-hidden shadow-xl">
          <Image
            src="/images/120-宴会部屋004-1024x683.jpg"
            alt="大広間"
            fill
            sizes="100vw"
            className="object-cover"
            style={{ filter: 'sepia(0.05) saturate(1.02) brightness(1.02)' }}
          />
        </div>

        <div className="grid gap-12 md:grid-cols-2 md:gap-16 md:items-center">
          <div className="relative aspect-[3/2] overflow-hidden shadow-lg">
            <Image
              src="/images/120-宴会部屋002-1024x683.jpg"
              alt="宴会場"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
              style={{ filter: 'sepia(0.05) saturate(1.02)' }}
            />
          </div>

          <div>
            <p className="text-[15px] leading-[2] text-sumi-soft mb-5 font-light">{t('body1')}</p>
            <p className="text-[15px] leading-[2] text-sumi-soft mb-8 font-light border-l-2 border-kin pl-6">{t('body2')}</p>

            <div className="pt-6 grid gap-4">
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
