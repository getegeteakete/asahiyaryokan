'use client';

import { useRef, useEffect, useState, ReactNode } from 'react';

interface FadeInSectionProps {
  children: ReactNode;
  /** アニメーションの種類 */
  variant?: 'up' | 'fade' | 'scale';
  /** 表示開始の遅延（ミリ秒） */
  delay?: number;
  /** スナップ吸着を有効にするか */
  snap?: boolean;
  className?: string;
  id?: string;
}

export default function FadeInSection({
  children,
  variant = 'up',
  delay = 0,
  snap = false,
  className = '',
  id,
}: FadeInSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // モーション軽減設定を尊重
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReduced) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        // しきい値は0（少しでも入ったら発火）。
        // 比率しきい値だと、画面より大幅に高いセクションは条件を満たせず
        // 永久に非表示になるため、rootMarginでタイミングを調整する。
        threshold: 0,
        rootMargin: '0px 0px -8% 0px',
      }
    );

    const current = domRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  return (
    <div
      ref={domRef}
      id={id}
      className={`reveal reveal-${variant} ${isVisible ? 'is-visible' : ''} ${
        snap ? 'snap-section' : ''
      } ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
