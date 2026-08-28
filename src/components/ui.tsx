import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { MotifIcon, StarIcon } from "./Icons";
import { useStore } from "../context/StoreContext";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="group block leading-none" aria-label="Bombay Cloth Center home">
      <span
        className={`block font-[family-name:var(--font-display)] font-semibold tracking-[0.14em] text-primary ${
          compact ? "text-base" : "text-lg sm:text-2xl"
        }`}
      >
        BOMBAY CLOTH CENTER
      </span>
      <span className="mt-1 flex items-center gap-2 text-gold">
        <MotifIcon className="h-3 w-7" />
        <span className="eyebrow text-[0.58rem] text-muted-foreground">
          EST. 1965 • GADHINGLAJ
        </span>
        <MotifIcon className="h-3 w-7" />
      </span>
    </Link>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
}: {
  eyebrow?: string | undefined;
  title: string;
  intro?: string | undefined;
  align?: "center" | "left";
}) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`max-w-2xl ${alignment}`}>
      {eyebrow ? <p className="eyebrow text-gold">{eyebrow}</p> : null}
      <h2 className="mt-3 text-3xl leading-tight sm:text-4xl">{title}</h2>
      {align === "center" ? (
        <div className="gold-rule mx-auto mt-4 w-24" />
      ) : (
        <div className="mt-4 h-px w-20 bg-gold" />
      )}
      {intro ? (
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {intro}
        </p>
      ) : null}
    </div>
  );
}

export function Stars({
  rating,
  count,
  className = "",
}: {
  rating: number;
  count?: number;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-1 ${className}`}>
      <span className="flex text-gold" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((i) => (
          <StarIcon key={i} filled={i <= Math.round(rating)} className="h-3.5 w-3.5" />
        ))}
      </span>
      <span className="text-xs text-muted-foreground">
        {rating.toFixed(1)}
        {count !== undefined ? ` (${count})` : ""}
      </span>
      <span className="sr-only">{`Rated ${rating} out of 5`}</span>
    </span>
  );
}

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "gold" | "outline" | "ghost" | "dark";
  size?: "sm" | "md" | "lg";
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const variants: Record<string, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary/90 border border-transparent",
  gold: "bg-gold text-accent-foreground hover:bg-gold-soft border border-transparent",
  outline:
    "border border-primary/30 text-primary hover:border-primary hover:bg-primary/5",
  ghost: "text-primary hover:bg-primary/5 border border-transparent",
  dark: "bg-charcoal text-primary-foreground hover:bg-charcoal/90 border border-transparent",
};

const sizes: Record<string, string> = {
  sm: "px-3.5 py-2 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-sm",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 font-semibold uppercase tracking-[0.12em] transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export function Badge({
  children,
  tone = "gold",
}: {
  children: ReactNode;
  tone?: "gold" | "primary" | "muted" | "success" | "danger";
}) {
  const tones: Record<string, string> = {
    gold: "bg-gold/15 text-secondary-foreground border-gold/40",
    primary: "bg-primary text-primary-foreground border-primary",
    muted: "bg-muted text-muted-foreground border-border",
    success: "bg-success/12 text-success border-success/35",
    danger: "bg-destructive/10 text-destructive border-destructive/30",
  };
  return (
    <span
      className={`inline-flex items-center border px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export function Breadcrumbs({ trail }: { trail: { label: string; to?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-2">
        {trail.map((item, i) => (
          <li key={item.label} className="flex items-center gap-2">
            {item.to ? (
              <Link to={item.to} className="hover:text-primary">
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground">{item.label}</span>
            )}
            {i < trail.length - 1 ? <span className="text-gold">/</span> : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: ReactNode;
}) {
  return (
    <div className="border border-dashed border-border bg-card px-6 py-16 text-center">
      <div className="motif-divider" />
      <h3 className="mt-5 text-xl">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">{body}</p>
      {action ? <div className="mt-6 flex justify-center">{action}</div> : null}
    </div>
  );
}

export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse bg-muted ${className}`} />;
}

export function Toasts() {
  const { toasts } = useStore();
  if (!toasts.length) return null;
  return (
    <div
      className="pointer-events-none fixed bottom-24 left-1/2 z-100 flex w-[min(92vw,26rem)] -translate-x-1/2 flex-col gap-2"
      role="status"
      aria-live="polite"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`border px-4 py-3 text-sm shadow-lg transition-opacity ${
            t.tone === "error"
              ? "border-destructive/40 bg-destructive text-destructive-foreground"
              : t.tone === "info"
                ? "border-border bg-charcoal text-primary-foreground"
                : "border-gold/50 bg-primary text-primary-foreground"
          }`}
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </span>
      {children}
      {hint ? <span className="mt-1 block text-xs text-muted-foreground">{hint}</span> : null}
    </label>
  );
}

export const inputClass =
  "w-full border border-input bg-card px-3 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-gold";
