import Image from 'next/image';

type DecoType = 'squid' | 'tokkuri' | 'shrimp' | 'crab';

type DecoProps = {
  type: DecoType;
  className?: string;
  size?: number;
  opacity?: number;
  rotate?: number;
  /** 明るい背景なら 'dark'（黒イラストを薄く）、暗い背景なら 'light'（白く反転） */
  variant?: 'dark' | 'light';
};

const SIZES: Record<DecoType, { w: number; h: number }> = {
  squid: { w: 300, h: 271 },
  tokkuri: { w: 153, h: 300 },
  shrimp: { w: 264, h: 300 },
  crab: { w: 300, h: 258 },
};

export default function Deco({
  type,
  className = '',
  size = 200,
  opacity = 0.05,
  rotate = 0,
  variant = 'dark',
}: DecoProps) {
  const ratio = SIZES[type].h / SIZES[type].w;

  return (
    <div
      className={`pointer-events-none absolute z-[1] select-none ${className}`}
      style={{
        width: size,
        height: size * ratio,
        opacity,
        transform: `rotate(${rotate}deg)`,
        // 暗い背景では白く反転して見せる
        filter: variant === 'light' ? 'invert(1) brightness(1.5)' : 'none',
      }}
      aria-hidden="true"
    >
      <Image
        src={`/images/deco/${type}.png`}
        alt=""
        fill
        sizes="300px"
        className="object-contain"
      />
    </div>
  );
}
