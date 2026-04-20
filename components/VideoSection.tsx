import { useTranslations } from 'next-intl';

const VIDEO_ID = 'y0Y9ATpIGrc';

export default function VideoSection() {
  const t = useTranslations('video');

  return (
    <section className="relative z-[2] bg-kinari px-6 md:px-10 py-24 md:py-30 overflow-hidden">
      <div className="max-w-[1100px] mx-auto">
        <p className="section-label">{t('label')}</p>
        <h2 className="section-title !mb-4">
          {t('titleLine1')}
          <span className="sub">{t('sub')}</span>
        </h2>

        <div className="relative mt-8 mx-auto max-w-[1000px] p-[14px]">
          {/* 金色の細枠 */}
          <div className="pointer-events-none absolute inset-0 border border-kin z-[2]" />
          {/* 朱色の中央縦線あしらい */}
          <div
            className="pointer-events-none absolute top-[-1px] bottom-[-1px] left-1/2 w-px opacity-30"
            style={{
              background:
                'linear-gradient(180deg, transparent, #9a2f26, transparent)',
            }}
          />
          <div className="relative w-full aspect-video bg-sumi overflow-hidden">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?loop=1&playlist=${VIDEO_ID}&rel=0&modestbranding=1`}
              title="朝日屋 - 糸島・芥屋の割烹民宿"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
          </div>
        </div>

        <p className="text-center mt-6 text-xs tracking-[0.4em] text-clay font-cormorant italic">
          {t('caption')}
        </p>
      </div>
    </section>
  );
}
