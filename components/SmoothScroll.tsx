'use client';

import { ReactLenis } from 'lenis/react';
import { useEffect, useState, ReactNode } from 'react';
import 'lenis/dist/lenis.css';

/**
 * サイト全体の滑らかなスクロールを管理するコンポーネント。
 *
 * 設計方針（業界標準・Darkroom Engineering の Lenis を採用）:
 *  - PC（ホイール）: lerp で軽やかに追従する上質なスクロール
 *  - スマホ（タッチ）: syncTouch=false にして OS 純正の慣性スクロールをそのまま使う
 *    → iOS の「scroll-snap がモメンタムを壊す」問題や、加速・減速のジャンクを根本回避
 *  - prefers-reduced-motion: reduce の利用者には自動でスムーズ化を無効化（ネイティブ動作）
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const [smooth, setSmooth] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setSmooth(!mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return (
    <ReactLenis
      root
      options={{
        // 追従の滑らかさ。小さいほど滑らか・大きいほどキビキビ（0.05〜0.2 が実用域）
        lerp: 0.1,
        // PC のホイールのみスムーズ化
        smoothWheel: smooth,
        // ★スマホは純正スクロールを使う（ここが加速/減速ジャンクの根本対策）
        syncTouch: false,
        wheelMultiplier: 1,
        // アンカーリンク（#kaiseki 等）への移動も Lenis 経由で滑らかに
        anchors: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
