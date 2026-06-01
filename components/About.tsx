import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function About() {
  const t = useTranslations('about');

  return (
    <section className="relative z-[2] bg-kinari-light border-y border-sumi/10 px-6 md:px-10 py-24 md:py-36">
      <div className="max-w-[1200px] mx-auto">
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
            <div className="relative aspect-[4/3] overflow-hidden shadow-lg">
              <Image
                src="/images/asahi-teishoku.jpg"
                alt={t('titleLine1')}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
                style={{ filter: 'sepia(0.08) saturate(0.98) brightness(1.02)' }}
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-kin/5 -z-10 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
