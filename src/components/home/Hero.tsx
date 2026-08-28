import { Link } from "@tanstack/react-router";
import heroImage from "../../assets/hero-bridal.jpg";
import { useStore } from "../../context/StoreContext";
import { MotifIcon } from "../Icons";

export function Hero() {
  const { homepage } = useStore();
  return (
    <section className="relative isolate overflow-hidden bg-charcoal">
      <img
        src={heroImage}
        alt="Bride in a deep maroon and gold bridal lehenga inside the Bombay Cloth Center showroom in Gadhinglaj"
        width={1920}
        height={1088}
        className="absolute inset-0 h-full w-full object-cover object-right"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/95 via-charcoal/75 to-charcoal/20" />
      <div className="relative mx-auto flex min-h-[78vh] max-w-7xl items-center px-4 py-20 sm:px-6">
        <div className="max-w-xl text-primary-foreground">
          <span className="inline-flex items-center gap-2 border border-gold/50 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-gold">
            <MotifIcon className="h-3 w-6" />
            {homepage.heroBadge}
          </span>
          <h1 className="mt-6 text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
            {homepage.heroHeading}
          </h1>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-primary-foreground/80 sm:text-base">
            {homepage.heroSubtitle}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/shop"
              className="bg-gold px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-accent-foreground transition-colors hover:bg-gold-soft"
            >
              Shop Collection
            </Link>
            <Link
              to="/wedding"
              className="border border-primary-foreground/40 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-colors hover:border-gold hover:text-gold"
            >
              Explore Wedding Wear
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
