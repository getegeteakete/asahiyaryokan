'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

const GALLERY_ITEMS = [
  { src: '/images/010-ise-ebi-detail.jpg', labelJa: '伊勢海老の活造り', labelEn: 'Ise Ebi' },
  { src: '/images/011-kaiseki-set.jpg', labelJa: '朝日懐石', labelEn: 'Kaiseki' },
  { src: '/images/012-kaisen-don.jpg', labelJa: '海鮮丼', labelEn: 'Kaisen-don' },
  { src: '/images/013-shellfish-sashimi.jpg', labelJa: '貝類の刺身盛り', labelEn: 'Shellfish Sashimi' },
  { src: '/images/014-white-fish.jpg', labelJa: 'お造り盛り合わせ', labelEn: 'Sashimi Assortment' },
  { src: '/images/015-dining-room.jpg', labelJa: '店内の風景', labelEn: 'Dining Room' },
  { src: '/images/040-釜めし膳007-1536x1024.jpg', labelJa: '釜めし膳', labelEn: 'Kamameshi' },
  { src: '/images/050-懐石007-1024x683.jpg', labelJa: '懐石料理', labelEn: 'Kaiseki Course' },
];

export default function PictureGallery() {
  const t = useTranslations('gallery');

  return (
    <section className="bg-kinari-light py-16 md:py-24 px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto">
        {/* グリッド: スマホ2列、タブレット3列、デスクトップ4列 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {GALLERY_ITEMS.map((item, index) => (
            <div
              key={item.src}
              className="group relative aspect-square overflow-hidden bg-sumi/5 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <Image
                src={item.src}
                alt={item.labelJa}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              
              {/* オーバーレイラベル */}
              <div className="absolute inset-0 bg-gradient-to-t from-sumi/60 via-sumi/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                <p className="text-kinari-light text-[11px] md:text-[12px] font-mincho tracking-[0.1em] leading-tight">
                  {item.labelJa}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
