import type { ReactNode } from "react";

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  trailing?: ReactNode;
};

export function SectionHeader({ title, subtitle, trailing }: SectionHeaderProps) {
  return (
    <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-heading text-3xl font-bold tracking-tight text-text-primary">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-1 font-body text-base italic text-text-tertiary">
            {subtitle}
          </p>
        ) : null}
      </div>
      {trailing ? <div className="flex items-center gap-2">{trailing}</div> : null}
    </header>
  );
}
