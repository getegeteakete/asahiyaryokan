'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';

type Announcement = {
  id: string;
  text: string;
  imageUrl?: string;
  createdAt: string;
};

const MAX_ITEMS = 6;

/**
 * 管理ページ（/admin）から投稿したお知らせをページ下部に一覧表示する。
 * 投稿が0件のときはセクションごと非表示。
 */
export default function News() {
  const t = useTranslations('news');
  const locale = useLocale();
  const [items, setItems] = useState<Announcement[]>([]);

  useEffect(() => {
    fetch('/api/announcements', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : []))
      .then((d) => setItems(Array.isArray(d) ? d : []))
      .catch(() => setItems([]));
  }, []);

  if (items.length === 0) return null;

  return (
    <section
      id="news"
      className="relative z-[2] bg-kinari border-t border-sumi/10 px-6 md:px-10 py-20 md:py-24"
    >
      <div className="max-w-[900px] mx-auto">
        <p className="section-label text-shu">{t('label')}</p>
        <h2 className="section-title mb-10">
          {t('title')}
          <span className="sub">{t('sub')}</span>
        </h2>

        <div className="space-y-5 md:space-y-6">
          {items.slice(0, MAX_ITEMS).map((a) => (
            <article
              key={a.id}
              className="bg-washi border border-sumi/5 shadow-sm rounded-sm p-6 md:p-8"
            >
              <time
                dateTime={a.createdAt}
                className="block text-[11px] tracking-[0.15em] text-kin mb-3 font-light"
              >
                {new Date(a.createdAt).toLocaleDateString(locale === 'en' ? 'en-US' : 'ja-JP', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              {a.text && (
                <p className="text-[15px] leading-[2] text-sumi-soft font-light whitespace-pre-wrap break-words">
                  {a.text}
                </p>
              )}
              {a.imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={a.imageUrl}
                  alt=""
                  loading="lazy"
                  className={`w-full max-h-[420px] object-contain rounded-sm border border-sumi/5 ${
                    a.text ? 'mt-5' : ''
                  }`}
                />
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
