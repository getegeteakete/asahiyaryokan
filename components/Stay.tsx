import { useTranslations } from 'next-intl';
import Image from 'next/image';

type PlanCardProps = {
  name: string;
  image: string;
};

function PlanCard({ name, image }: PlanCardProps) {
  const t = useTranslations('stay');
  const amenityKeys = [
    'wifi',
    'fridge',
    'shampoo',
    'conditioner',
    'towel',
    'toothbrush',
    'razor',
    'dryer',
  ] as const;

  return (
    <div className="group">
      <div className="relative w-full aspect-[4/3] mb-6 overflow-hidden shadow-lg rounded-sm">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="bg-gradient-to-br from-kinari-light to-washi p-8 md:p-10 border border-sumi/5 shadow-lg transition-all duration-400 hover:shadow-2xl hover:border-kin/30 hover:-translate-y-1.5">
        <div className="flex flex-wrap gap-2">
          {amenityKeys.map((key) => (
            <span
              key={key}
              className="text-[11px] text-sumi/70 bg-sumi/5 border border-sumi/8 px-3 py-1.5 tracking-[0.05em] rounded-sm font-light"
            >
              {t(`amenities.${key}` as const)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Stay() {
  const t = useTranslations('stay');

  return (
    <section
      id="stay"
      className="relative z-[2] bg-washi px-6 md:px-10 py-24 md:py-36"
    >
      <div className="max-w-[1200px] mx-auto">
        <p className="section-label text-shu">{t('label')}</p>
        <h2 className="section-title mb-12">
          {t('titleLine1')}
          <br />
          {t('titleLine2')}
          <span className="sub text-kin block text-[16px] font-light tracking-widest mt-4">{t('sub')}</span>
        </h2>

        <p className="text-[15px] leading-[2] text-sumi-soft mb-10 font-light max-w-[760px]">
          {t('inquiry')}
        </p>

        <div className="grid gap-8 md:gap-10 mt-8 max-w-[720px]">
          <PlanCard
            name={t('plan01Name')}
            image="/images/room-wa.png"
          />
        </div>

        <p className="text-[12px] text-clay mt-10 leading-[2] tracking-[0.05em] whitespace-pre-line font-light">
          {t('notes')}
        </p>
      </div>
    </section>
  );
}
