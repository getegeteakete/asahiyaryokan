import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  return (
    <footer className="bg-sumi text-kinari/60 px-6 md:px-10 pt-10 pb-28 border-t border-kinari/[0.1] text-center text-[11px] tracking-[0.2em] font-cormorant italic">
      <div className="flex items-center justify-center gap-3.5 my-6 text-kin">
        <span className="w-1.5 h-1.5 border border-current rotate-45" />
      </div>
      {t('copy')}
    </footer>
  );
}
