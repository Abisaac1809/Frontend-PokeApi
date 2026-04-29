type StatBarProps = {
  label: string;
  value: number;
  max?: number;
};

export function StatBar({ label, value, max = 150 }: StatBarProps) {
  const percent = Math.min(100, Math.round((value / max) * 100));
  const isHigh = value > 100;
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-baseline justify-between font-heading text-xs">
        <span className="uppercase tracking-wider text-text-tertiary">{label}</span>
        <span className={isHigh ? "text-accent" : "text-text-primary"}>{value}</span>
      </div>
      <div className="h-1.5 rounded-full bg-border-subtle">
        <div
          className="h-1.5 rounded-full bg-accent"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
