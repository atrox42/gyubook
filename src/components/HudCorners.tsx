type HudCornersProps = {
  className?: string;
};

export function HudCorners({ className = "" }: HudCornersProps) {
  return (
    <div className={`hud-corners absolute inset-0 z-20 ${className}`} aria-hidden>
      <span className="tl" />
      <span className="tr" />
      <span className="bl" />
      <span className="br" />
    </div>
  );
}
