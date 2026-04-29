import type { CSSProperties, ReactNode } from "react";

type CardGridProps = {
  children: ReactNode;
  minColWidth?: string;
};

export function CardGrid({ children, minColWidth = "180px" }: CardGridProps) {
  const style: CSSProperties = {
    gridTemplateColumns: `repeat(auto-fill, minmax(${minColWidth}, 1fr))`,
  };
  return (
    <div className="grid gap-4" style={style}>
      {children}
    </div>
  );
}
