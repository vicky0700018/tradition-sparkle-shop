import { Link } from "@tanstack/react-router";
import heritageImage from "../../assets/heritage-store.jpg";
import lagnaBastaImage from "../../assets/lagna-basta.jpg";
import kidsImage from "../../assets/bombay-kids.jpg";
import { sectionImages } from "../../data/images";
import { trustBadges } from "../../data/mock";
import { useStore } from "../../context/StoreContext";
import { Button, SectionHeading, Stars } from "../ui";
import { ProductGrid } from "../ProductCard";
import { MotifIcon } from "../Icons";
import type { Product } from "../../data/products";

export function TrustStrip() {
  return (
    <section className="border-y border-border bg-cream/50">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:grid-cols-3 sm:px-6 lg:grid-cols-5">
        {trustBadges.map((badge) => (
          <div key={badge.title} className="text-center sm:text-left">
            <p className="text-sm font-semibold text-primary">{badge.title}</p>
            <p className="mt-1 text-xs text-muted-foreground">{badge.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function CategoryTiles({ slugs, title, eyebrow, intro }: {
  slugs: string[];
  title: string;
  eyebrow?: string;
  intro?: string;
}) {
  const { categories } = useStore();
  const tiles = slugs
    .map((slug) => categories.find((c) => c.slug === slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c) && c!.enabled);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeading eyebrow={eyebrow} title={title} intro={intro} />
      <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-5">
        {tiles.map((category) => (
          <Link
            key={category.id}
            to="/category/$slug"
            params={{ slug: category.slug }}
            className="card-lift group relative block overflow-hidden border border-border bg-card"
          >
            <img
              src={category.image}
              alt={`${category.name} collection at Bombay Cloth Center`}
              loading="lazy"
              className="aspect-3/4 w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/90 to-transparent px-3 pb-4 pt-10 text-primary-foreground">
              <p className="text-sm font-semibold">{category.name}</p>
              <p className="mt-0.5 text-[0.65rem] uppercase tracking-[0.14em] text-gold">
                {category.group}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function CollectionSection({
  eyebrow,
  title,
  intro,
  items,
  ctaLabel,
  ctaTo,
  tone = "default",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  items: Product[];
  ctaLabel?: string;
  ctaTo?: string;
  tone?: "default" | "cream";
}) {
  if (!items.length) return null;
  return (
    <section className={tone === "cream" ? "bg-cream/40 py-16 sm:py-20" : "py-16 sm:py-20"}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading eyebrow={eyebrow} title={title} intro={intro} align="left" />
          {ctaLabel && ctaTo ? (
            <Link
              to={ctaTo}
              className="shrink-0 border border-primary/30 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-primary transition-colors hover:border-primary hover:bg-primary/5"
            >
              {ctaLabel}
            </Link>
          ) : null}
        </div>
        <div className="mt-10">
          <ProductGrid items={items.slice(0, 8)} />
        </div>
      </div>
    </section>
  );
}

export function LagnaBastaSection() {
  const { homepage } = useStore();
  const highlights = [
    "Traditional wedding gifting sets",
    "Bride family sets",
    "Groom family sets",
    "Saree combinations",
    "Gift-ready textile sets",
    "Festive gifting options",
  ];
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
        <div>
          <p className="eyebrow flex items-center gap-2 text-gold">
            <MotifIcon className="h-3 w-7" /> Signature Since 1965
          </p>
          <h2 className="mt-4 text-3xl leading-tight sm:text-4xl">
            {homepage.lagnaBastaHeading}
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-primary-foreground/80">
            {homepage.lagnaBastaBody}
          </p>
          <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
            {highlights.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-primary-foreground/85">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-gold" />
                {item}
              </li>
            ))}
          </ul>
          <Link
            to="/lagna-basta"
            className="mt-9 inline-block bg-gold px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-accent-foreground transition-colors hover:bg-gold-soft"
          >
            Explore Lagna Basta
          </Link>
        </div>
        <div className="relative">
          <img
            src={lagnaBastaImage}
            alt="Traditional Maharashtrian Lagna Basta gifting sets of folded Paithani sarees on brass trays"
            loading="lazy"
            width={1280}
            height={800}
            className="w-full border border-gold/30 object-cover"
          />
          <div className="pointer-events-none absolute -bottom-4 -right-4 hidden h-24 w-24 border-b-2 border-r-2 border-gold sm:block" />
        </div>
      </div>
    </section>
  );
}

export function HeritageSection() {
  const { homepage } = useStore();
  const points = [
    "Established in 1965 in Main Bazar Peth",
    "Multi-generational family business",
    "Serving Gadhinglaj, Ajara & Chandgad talukas",
    "Trusted for weddings and festivals",
    "Customer-first shopping experience",
    "Wide apparel selection under one roof",
    "Trend-centric seasonal collections",
    "Affordable premium fashion",
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div className="relative">
          <img
            src={heritageImage}
            alt="Interior of the Bombay Cloth Center showroom with wooden shelves stacked with folded silk sarees"
            loading="lazy"
            width={1280}
            height={960}
            className="w-full object-cover"
          />
          <div className="absolute -left-3 -top-3 hidden h-20 w-20 border-l-2 border-t-2 border-gold lg:block" />
        </div>
        <div>
          <p className="eyebrow text-gold">Our Heritage</p>
          <h2 className="mt-4 text-3xl leading-tight sm:text-4xl">{homepage.heritageHeading}</h2>
          <div className="mt-4 h-px w-20 bg-gold" />
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {homepage.heritageBody}
          </p>
          <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-2 text-sm text-foreground/80">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-gold" />
                {p}
              </li>
            ))}
          </ul>
          <Link
            to="/about"
            className="mt-9 inline-block border border-primary px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Our Story
          </Link>
        </div>
      </div>
    </section>
  );
}

export function KidsPromo() {
  const { homepage } = useStore();
  return (
    <section className="bg-cream/60 py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2">
        <img
          src={kidsImage}
          alt="Children in premium festive ethnic wear from the Bombay Kids collection"
          loading="lazy"
          width={1280}
          height={800}
          className="w-full object-cover"
        />
        <div>
          <p className="eyebrow text-gold">In-House Brand</p>
          <h2 className="mt-4 text-3xl sm:text-4xl">{homepage.kidsHeading}</h2>
          <p className="mt-2 font-[family-name:var(--font-display)] text-xl text-primary">
            {homepage.kidsBody}
          </p>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Party wear, ethnic sets, wedding looks and everyday casuals for boys and girls —
            styled with the same care we give our bridal floor.
          </p>
          <Link
            to="/kids"
            className="mt-8 inline-block bg-primary px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Shop Bombay Kids
          </Link>
        </div>
      </div>
    </section>
  );
}

export function ReviewsSection() {
  const { reviews } = useStore();
  const approved = reviews.filter((r) => r.status === "Approved");
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeading
        eyebrow="Customer Voices"
        title="Loved by Families Across Three Talukas"
        intro="Real feedback from customers who shop with us for weddings, festivals and everyday family fashion."
      />
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {approved.slice(0, 6).map((review) => (
          <figure key={review.id} className="flex h-full flex-col border border-border bg-card p-6">
            <Stars rating={review.rating} />
            <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/85">
              <p className="font-[family-name:var(--font-display)] text-lg text-primary">
                {review.title}
              </p>
              <p className="mt-2 text-muted-foreground">{review.body}</p>
            </blockquote>
            <figcaption className="mt-5 border-t border-border pt-4 text-xs uppercase tracking-[0.12em] text-muted-foreground">
              {review.customer} · {review.city}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export function StoreVisitCTA() {
  const { settings } = useStore();
  return (
    <section className="relative isolate overflow-hidden">
      <img
        src={sectionImages.storeVisit}
        alt="Bombay Cloth Center storefront on Main Bazar Peth, Gadhinglaj"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-charcoal/85" />
      <div className="relative mx-auto max-w-3xl px-4 py-20 text-center text-primary-foreground sm:px-6">
        <p className="eyebrow text-gold">Visit The Showroom</p>
        <h2 className="mt-4 text-3xl sm:text-4xl">Come See The Fabrics In Person</h2>
        <p className="mt-4 text-sm leading-relaxed text-primary-foreground/80">
          {settings.address}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href={`https://wa.me/${settings.phoneDigits}`}
            target="_blank"
            rel="noreferrer"
            className="bg-gold px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-accent-foreground transition-colors hover:bg-gold-soft"
          >
            Chat on WhatsApp
          </a>
          <a
            href={`tel:${settings.phone.replace(/\s/g, "")}`}
            className="border border-primary-foreground/40 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] transition-colors hover:border-gold hover:text-gold"
          >
            Call {settings.phone}
          </a>
        </div>
      </div>
    </section>
  );
}

export function BannerRail() {
  const { banners } = useStore();
  const active = banners.filter((b) => b.status === "Active");
  if (!active.length) return null;
  return (
    <section className="mx-auto max-w-7xl px-4 pb-4 pt-16 sm:px-6">
      <div className="grid gap-5 lg:grid-cols-3">
        {active.slice(0, 3).map((banner) => (
          <Link
            key={banner.id}
            to={banner.buttonLink}
            className="card-lift group relative isolate block overflow-hidden border border-border"
          >
            <img
              src={banner.image}
              alt={`${banner.title} promotional banner`}
              loading="lazy"
              className="aspect-16/10 w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/35 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-primary-foreground">
              <h3 className="text-xl">{banner.title}</h3>
              <p className="mt-1 text-xs text-primary-foreground/75">{banner.subtitle}</p>
              <span className="mt-3 inline-block border-b border-gold pb-0.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-gold">
                {banner.buttonText}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function EditorialSplit({
  image,
  alt,
  eyebrow,
  title,
  body,
  ctaLabel,
  ctaTo,
  reverse = false,
}: {
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  body: string;
  ctaLabel: string;
  ctaTo: string;
  reverse?: boolean;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <img
          src={image}
          alt={alt}
          loading="lazy"
          className={`aspect-4/3 w-full object-cover ${reverse ? "lg:order-2" : ""}`}
        />
        <div>
          <p className="eyebrow text-gold">{eyebrow}</p>
          <h2 className="mt-3 text-3xl sm:text-4xl">{title}</h2>
          <div className="mt-4 h-px w-20 bg-gold" />
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">{body}</p>
          <Link to={ctaTo} className="mt-8 inline-block">
            <Button variant="outline">{ctaLabel}</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
