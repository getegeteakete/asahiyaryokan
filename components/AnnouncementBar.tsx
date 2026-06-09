'use client';

import { useEffect, useState } from 'react';

type Announcement = {
  id: string;
  text: string;
  imageUrl?: string;
  createdAt: string;
};

export default function AnnouncementBar() {
  const [items, setItems] = useState<Announcement[]>([]);
  const [open, setOpen] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    fetch('/api/announcements')
      .then((r) => (r.ok ? r.json() : []))
      .then((d) => setItems(Array.isArray(d) ? d : []))
      .catch(() => setItems([]));
  }, []);

  if (!open || items.length === 0) return null;
  const latest = items[0];

  return (
    <div className="fixed left-0 right-0 top-[80px] md:top-[104px] z-[80] px-3 md:px-6 pointer-events-none">
      <div className="max-w-[1080px] mx-auto bg-sumi/92 backdrop-blur-md text-kinari border border-kin/30 shadow-2xl rounded-sm pointer-events-auto">
        <div className="flex items-center gap-3 px-4 md:px-6 py-3">
          <span className="text-[10px] tracking-[0.25em] text-kin-light font-mincho shrink-0 border-r border-kinari/20 pr-3">
            お知らせ
          </span>
          <button
            onClick={() => setExpanded((e) => !e)}
            className="flex-1 text-left text-[13px] md:text-[14px] font-light truncate hover:text-kin-light transition-colors"
          >
            {latest.text || '新しい写真を投稿しました'}
          </button>
          {items.length > 1 || latest.imageUrl ? (
            <button
              onClick={() => setExpanded((e) => !e)}
              className="shrink-0 text-[10px] text-kin-light/80 tracking-[0.1em] hover:text-kin-light transition-colors"
            >
              {expanded ? '閉じる' : 'もっと見る'}
            </button>
          ) : null}
          <button
            onClick={() => setOpen(false)}
            aria-label="お知らせを閉じる"
            className="shrink-0 text-kinari/50 hover:text-kinari text-[20px] leading-none -mt-0.5"
          >
            ×
          </button>
        </div>

        {expanded && (
          <div
            className="px-4 md:px-6 pb-4 pt-3 border-t border-kinari/10 max-h-[60vh] overflow-auto"
            data-lenis-prevent
          >
            {items.map((a) => (
              <div key={a.id} className="py-3 border-b border-kinari/10 last:border-0">
                <div className="text-[10px] text-kin-light/70 tracking-[0.1em] mb-1.5">
                  {new Date(a.createdAt).toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
                {a.text && (
                  <p className="text-[13px] md:text-[14px] font-light leading-[1.9] whitespace-pre-wrap">
                    {a.text}
                  </p>
                )}
                {a.imageUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={a.imageUrl}
                    alt=""
                    className="mt-2.5 max-h-60 w-auto rounded-sm border border-kinari/10"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
