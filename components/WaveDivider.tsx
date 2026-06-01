const COLORS: Record<string, string> = {
  sumi: '#1a1512',
  'kinari-light': '#f4eedd',
  kinari: '#ede5d3',
  washi: '#e8dfc9',
};

type WaveDividerProps = {
  top: keyof typeof COLORS;
  bottom: keyof typeof COLORS;
  flip?: boolean;
};

export default function WaveDivider({ top, bottom, flip = false }: WaveDividerProps) {
  return (
    <div
      className="relative z-[3] -mt-px"
      style={{ backgroundColor: COLORS[top], lineHeight: 0 }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 70"
        preserveAspectRatio="none"
        className="block w-full h-[36px] md:h-[60px]"
        style={{ transform: flip ? 'scaleX(-1)' : 'none' }}
      >
        {/* 緩やかな波 */}
        <path
          d="M0,35 C240,5 480,5 720,30 C960,55 1200,55 1440,30 L1440,70 L0,70 Z"
          fill={COLORS[bottom]}
        />
      </svg>
    </div>
  );
}
