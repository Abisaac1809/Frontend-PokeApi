"use client";

type ErrorStateProps = {
  message?: string;
  error?: Error;
  reset?: () => void;
};

export function ErrorState({ message, error, reset }: ErrorStateProps) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 rounded-xl border border-border-default bg-bg-surface p-8 text-center">
      <h2 className="font-heading text-xl font-semibold text-text-primary">
        Algo salió mal
      </h2>
      <p className="font-body text-text-secondary">
        {message ?? error?.message ?? "No se pudo cargar este recurso."}
      </p>
      {reset ? (
        <button
          type="button"
          onClick={reset}
          className="rounded-md bg-accent px-4 py-2 font-heading text-sm font-semibold text-text-primary transition-colors hover:bg-accent-hover"
        >
          Intentar de nuevo
        </button>
      ) : null}
    </div>
  );
}
