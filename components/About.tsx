import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function About() {
  const t = useTranslations('about');

  return (
    <section className="relative z-[2] bg-kinari-light border-y border-sumi/[0.08] px-6 md:px-10 py-24 md:py-30">
      <div className="max-w-[1100px] mx-auto">
        <div className="grid gap-10 md:grid-cols-2 md:gap-20 md:items-center">
          <div>
            <p className="section-label">{t('label')}</p>
            <h2 className="section-title">
              {t('titleLine1')}
              <br />
              {t('titleLine2')}
              <span className="sub">{t('sub')}</span>
            </h2>
            <p className="text-[15px] leading-[2.2] text-sumi-soft mb-5">{t('body1')}</p>
            <p className="text-[15px] leading-[2.2] text-sumi-soft">{t('body2')}</p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src="/images/asahi-teishoku.jpg"
              alt=""
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
              style={{ filter: 'sepia(0.05) saturate(0.95)' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
