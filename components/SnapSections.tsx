'use client';

import { useEffect } from 'react';
import { useLenis } from 'lenis/react';
import Snap from 'lenis/snap';

/**
 * Lenis 純正の Snap アドオンで、主要セクションの先頭にゆるやかな吸着を付ける。
 *
 * 重要な前提:
 *  - PC（マウス/トラックパッド）のみ有効。タッチ端末では吸着を一切付けない
 *    → スマホの OS 純正・慣性スクロールを壊さない（前回の加速/減速問題の再発防止）
 *  - type: 'proximity' …近づいて止まったときだけ吸着。縦長セクションの途中では作動しない
 *  - prefers-reduced-motion: reduce の利用者は対象外
 *
 * 吸着対象は DOM 上の .snap-section（Hero / About / 昼食 / 懐石 / 宿泊 / 店舗情報）。
 */
export default function SnapSections() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // スマホ・タッチ端末・視差軽減では吸着しない
    if (isTouch || reduce) return;

    const snap = new Snap(lenis, {
      type: 'proximity',
      // 吸着アニメの滑らかさ（Lenis 本体と揃える）
      lerp: 0.1,
      // 先頭から画面高の 20% 以内に止まったときだけ吸着（grabby になりすぎない）
      distanceThreshold: '20%',
      // 連続スナップ防止
      debounce: 500,
    });

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>('.snap-section')
    );
    elements.forEach((el) => snap.addElement(el, { align: 'start' }));

    return () => {
      snap.destroy();
    };
  }, [lenis]);

  return null;
}
