import { Breadcrumbs } from "./ui";

export function PageHeader({
  eyebrow,
  title,
  intro,
  trail,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  trail: { label: string; to?: string }[];
}) {
  return (
    <header className="border-b border-border bg-cream/50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        <Breadcrumbs trail={trail} />
        {eyebrow ? <p className="eyebrow mt-5 text-gold">{eyebrow}</p> : null}
        <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl">{title}</h1>
        {intro ? (
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {intro}
          </p>
        ) : null}
      </div>
    </header>
  );
}
