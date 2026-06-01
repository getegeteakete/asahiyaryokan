import { useTranslations } from 'next-intl';

type PlanCardProps = {
  tag: string;
  name: string;
  weekday: { incl: string; excl: string };
  weekend: { incl: string; excl: string };
};

function PlanCard({ tag, name, weekday, weekend }: PlanCardProps) {
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
    <div className="bg-gradient-to-br from-kinari-light to-washi p-8 md:p-10 border border-sumi/5 shadow-lg transition-all duration-400 hover:shadow-2xl hover:border-kin/30 hover:-translate-y-1.5">
      <div className="font-cormorant italic text-[10px] tracking-[0.35em] text-kin uppercase mb-4 opacity-75">
        {tag}
      </div>
      <h3 className="text-[26px] font-medium tracking-[0.08em] mb-6 pb-5 border-b border-sumi/10">
        {name}
      </h3>

      <div className="space-y-5">
        <div className="flex justify-between items-baseline gap-4">
          <span className="text-clay tracking-[0.1em] text-[14px]">{t('weekday')}</span>
          <div className="text-right">
            <span className="font-cormorant text-[20px] text-sumi block">¥{weekday.incl}</span>
            <span className="text-[10px] text-clay mt-0.5 tracking-[0.1em] block">
              {t('taxExcl')} ¥{weekday.excl}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-baseline gap-4 pt-3 border-t border-dotted border-sumi/10">
          <span className="text-shu-deep tracking-[0.1em] text-[14px]">{t('weekend')}</span>
          <div className="text-right">
            <span className="font-cormorant text-[20px] text-sumi block">¥{weekend.incl}</span>
            <span className="text-[10px] text-clay mt-0.5 tracking-[0.1em] block">
              {t('taxExcl')} ¥{weekend.excl}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-7 pt-6 border-t border-sumi/10 flex flex-wrap gap-2">
        {amenityKeys.map((key) => (
          <span
            key={key}
            className="text-[11px] text-sumi/70 bg-sumi/5 border border-sumi/8 px-3 py-1.5 tracking-[0.05em] rounded-sm"
          >
            {t(`amenities.${key}` as const)}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Stay() {
  const t = useTranslations('stay');

  return (
    <section
      id="stay"
      className="relative z-[2] bg-washi border-t border-sumi/10 px-6 md:px-10 py-24 md:py-36"
    >
      <div className="max-w-[1200px] mx-auto">
        <p className="section-label text-shu">{t('label')}</p>
        <h2 className="section-title mb-12">
          {t('titleLine1')}
          <br />
          {t('titleLine2')}
          <span className="sub text-kin block text-[16px] font-light tracking-widest mt-4">{t('sub')}</span>
        </h2>

        <div className="grid gap-8 md:grid-cols-2 md:gap-10 mt-8">
          <PlanCard
            tag={t('plan01Tag')}
            name={t('plan01Name')}
            weekday={{ incl: '11,750', excl: '10,500' }}
            weekend={{ incl: '12,850', excl: '11,500' }}
          />
          <PlanCard
            tag={t('plan02Tag')}
            name={t('plan02Name')}
            weekday={{ incl: '13,400', excl: '12,000' }}
            weekend={{ incl: '14,500', excl: '13,000' }}
          />
        </div>

        <p className="text-[12px] text-clay mt-10 leading-[2] tracking-[0.05em] whitespace-pre-line font-light">
          {t('notes')}
        </p>
      </div>
    </section>
  );
}
