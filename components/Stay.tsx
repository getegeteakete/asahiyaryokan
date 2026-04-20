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
    <div className="bg-kinari-light p-6 md:p-8 border border-sumi/[0.08] transition-all duration-400 hover:border-kin hover:-translate-y-1">
      <div className="font-cormorant italic text-[11px] tracking-[0.3em] text-shu uppercase mb-2">
        {tag}
      </div>
      <h3 className="text-[24px] font-medium tracking-[0.1em] mb-5 pb-4 border-b border-sumi/15">
        {name}
      </h3>

      <div className="flex justify-between items-baseline py-3.5 border-b border-dotted border-sumi/15 text-[13px]">
        <span className="text-clay tracking-[0.1em]">{t('weekday')}</span>
        <span className="font-cormorant text-[18px] text-sumi text-right">
          ¥{weekday.incl}
          <span className="block text-[10px] text-clay mt-0.5 tracking-[0.1em]">
            {t('taxExcl')} ¥{weekday.excl}
          </span>
        </span>
      </div>

      <div className="flex justify-between items-baseline py-3.5 text-[13px] text-shu-deep">
        <span className="tracking-[0.1em]">{t('weekend')}</span>
        <span className="font-cormorant text-[18px] text-sumi text-right">
          ¥{weekend.incl}
          <span className="block text-[10px] text-clay mt-0.5 tracking-[0.1em]">
            {t('taxExcl')} ¥{weekend.excl}
          </span>
        </span>
      </div>

      <div className="mt-6 pt-5 border-t border-dashed border-sumi/15 flex flex-wrap gap-1.5">
        {amenityKeys.map((key) => (
          <span
            key={key}
            className="text-[10px] text-clay border border-sumi/15 px-2.5 py-1 tracking-[0.08em]"
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
      className="relative z-[2] bg-washi border-t border-sumi/[0.08] px-6 md:px-10 py-24 md:py-30"
    >
      <div className="max-w-[1100px] mx-auto">
        <p className="section-label">{t('label')}</p>
        <h2 className="section-title">
          {t('titleLine1')}
          <br />
          {t('titleLine2')}
          <span className="sub">{t('sub')}</span>
        </h2>

        <div className="grid gap-6 md:grid-cols-2 md:gap-8 mt-8">
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

        <p className="text-[12px] text-clay mt-8 leading-[1.9] tracking-[0.05em] whitespace-pre-line">
          {t('notes')}
        </p>
      </div>
    </section>
  );
}
