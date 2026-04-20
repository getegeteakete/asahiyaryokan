import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';

const items = [
  { image: 'press-jalan.jpg', titleJa: 'じゃらん九州', titleEn: 'Jalan Kyushu', date: '2024 · 02' },
  {
    image: 'press-guruuri-22.jpg',
    titleJa: 'ぐる〜り糸島 2022-2023',
    titleEn: "Guruuri Itoshima '22–'23",
    date: '2022 · 03',
  },
  {
    image: 'press-kyushu-oukoku.jpg',
    titleJa: '月刊九州王国',
    titleEn: 'Kyushu Oukoku',
    date: '2021 · 06',
  },
  {
    image: 'press-itoshima-model.jpg',
    titleJa: '糸島モデルコース25',
    titleEn: 'Itoshima Model Course 25',
    date: '2021 · 04',
  },
  {
    image: 'press-itoshima-guide.jpg',
    titleJa: 'まったく新しい糸島案内',
    titleEn: 'New Itoshima Guide',
    date: '2013 · 07',
  },
  { image: 'press-soignier.jpg', titleJa: 'ソワニエ', titleEn: 'Soignier', date: '2015 · 03' },
  {
    image: 'press-guruuri-14.jpg',
    titleJa: 'ぐる〜り糸島',
    titleEn: 'Guruuri Itoshima',
    date: '2014 · 04',
  },
];

export default function Press() {
  const t = useTranslations('press');
  const locale = useLocale();

  return (
    <section className="relative z-[2] bg-kinari px-6 md:px-10 py-20">
      <div className="max-w-[1100px] mx-auto">
        <p className="section-label">{t('label')}</p>
        <h2 className="section-title !mb-0">{t('title')}</h2>

        <div className="flex gap-5 overflow-x-auto no-scrollbar py-2 pb-6 mt-8 -mx-6 md:-mx-10 px-6 md:px-10">
          {items.map((item) => (
            <article key={item.image} className="flex-shrink-0 w-[160px] md:w-[180px]">
              <div className="relative w-full aspect-[3/4] mb-3 overflow-hidden transition-transform duration-400 hover:-translate-y-1">
                <Image
                  src={`/images/${item.image}`}
                  alt=""
                  fill
                  sizes="180px"
                  className="object-cover"
                />
              </div>
              <p className="text-[12px] leading-[1.6] mb-1">
                {locale === 'en' ? item.titleEn : item.titleJa}
              </p>
              <p className="font-cormorant text-[10px] tracking-[0.15em] text-clay">
                {item.date}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
