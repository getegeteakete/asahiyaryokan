import { useTranslations } from 'next-intl';

function InfoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[110px_1fr] md:grid-cols-[160px_1fr] gap-5 md:gap-10 py-[18px] border-b border-kinari/[0.12] items-baseline">
      <div className="font-cormorant italic text-[12px] tracking-[0.2em] text-kin-light uppercase">
        {label}
      </div>
      <div className="text-[14px] leading-[1.9] text-kinari/90">{children}</div>
    </div>
  );
}

export default function Access() {
  const t = useTranslations('access');

  return (
    <section
      id="info"
      className="relative z-[2] bg-sumi text-kinari px-6 md:px-10 pt-24 md:pt-30 pb-16"
    >
      <div className="max-w-[1100px] mx-auto">
        <p className="section-label !text-kin-light before:!bg-kin-light">{t('label')}</p>
        <h2 className="section-title [&_.sub]:!text-clay">
          {t('titleLine1')}
          <span className="sub">{t('sub')}</span>
        </h2>

        <div className="grid mt-10">
          <InfoRow label={t('address')}>{t('addressValue')}</InfoRow>
          <InfoRow label={t('contact')}>
            <a
              href="tel:+81923282634"
              className="text-kin-light border-b border-transparent hover:border-kin-light transition-colors"
            >
              092-328-2634
            </a>
            　・　
            <a
              href="tel:+818027547721"
              className="text-kin-light border-b border-transparent hover:border-kin-light transition-colors"
            >
              080-2754-7721
            </a>
          </InfoRow>
          <InfoRow label={t('hours')}>{t('hoursValue')}</InfoRow>
          <InfoRow label={t('payment')}>{t('paymentValue')}</InfoRow>
          <InfoRow label={t('seats')}>{t('seatsValue')}</InfoRow>
          <InfoRow label={t('parking')}>{t('parkingValue')}</InfoRow>
          <InfoRow label={t('other')}>{t('otherValue')}</InfoRow>
        </div>

        {/* Googleマップ */}
        <div className="mt-10 relative p-2 border border-kinari/20 bg-kinari/[0.04]">
          <iframe
            src="https://maps.google.com/maps?q=%E7%A6%8F%E5%B2%A1%E7%9C%8C%E7%B3%B8%E5%B3%B6%E5%B8%82%E5%BF%97%E6%91%A9%E8%8A%A5%E5%B1%8B874-3&t=m&z=15&output=embed&iwloc=near"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="朝日屋 - 所在地"
            className="block w-full aspect-[16/10] border-0"
            style={{ filter: 'grayscale(0.3) sepia(0.15) contrast(0.95)' }}
          />
        </div>

        {/* CTA */}
        <div className="grid gap-3 md:grid-cols-2 mt-10">
          <a
            href="tel:+81923282634"
            className="block text-center py-[18px] px-6 bg-shu border border-shu text-kinari-light text-[14px] tracking-[0.3em] transition-all hover:bg-shu-deep hover:border-shu-deep"
          >
            {t('ctaPhone')}
          </a>
          <a
            href="https://www.instagram.com/keyaasahiya"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center py-[18px] px-6 bg-transparent border border-kin-light text-kin-light text-[14px] tracking-[0.3em] transition-all hover:bg-kin-light hover:text-sumi"
          >
            {t('ctaInstagram')}
          </a>
        </div>
      </div>
    </section>
  );
}
