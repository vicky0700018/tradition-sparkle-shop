import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useStore } from "../context/StoreContext";
import { MailIcon, MotifIcon, PhoneIcon, PinIcon } from "./Icons";

export function Footer() {
  const { settings, notify } = useStore();
  const [email, setEmail] = useState("");

  return (
    <footer className="mt-20 bg-charcoal text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p className="font-[family-name:var(--font-display)] text-xl tracking-[0.14em]">
              BOMBAY CLOTH CENTER
            </p>
            <p className="mt-2 flex items-center gap-2 text-gold">
              <MotifIcon className="h-3 w-7" />
              <span className="eyebrow text-[0.58rem] text-primary-foreground/60">
                EST. 1965 • GADHINGLAJ
              </span>
            </p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-primary-foreground/70">
              Six decades of trust, style and tradition. A family textile showroom serving
              Gadhinglaj, Ajara and Chandgad talukas since 1965.
            </p>
            <form
              className="mt-6 flex max-w-sm gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                setEmail("");
                notify("Thank you — we'll send you new collection updates.");
              }}
            >
              <label className="sr-only" htmlFor="newsletter">
                Email address
              </label>
              <input
                id="newsletter"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="w-full border border-primary-foreground/25 bg-transparent px-3 py-2.5 text-sm text-primary-foreground outline-none placeholder:text-primary-foreground/40 focus:border-gold"
              />
              <button className="bg-gold px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-accent-foreground">
                Join
              </button>
            </form>
          </div>

          <FooterCol
            title="Shop"
            links={[
              { label: "Women", to: "/women" },
              { label: "Men", to: "/men" },
              { label: "Kids", to: "/kids" },
              { label: "Wedding", to: "/wedding" },
              { label: "Lagna Basta", to: "/lagna-basta" },
            ]}
          />
          <FooterCol
            title="Company"
            links={[
              { label: "About Us", to: "/about" },
              { label: "Our Story", to: "/about" },
              { label: "Contact", to: "/contact" },
              { label: "Reviews", to: "/collections" },
            ]}
          />
          <div>
            <h2 className="eyebrow text-gold">Customer Care</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-primary-foreground/70">
              {["Shipping", "Returns", "FAQs", "Privacy Policy", "Terms"].map((label) => (
                <li key={label}>
                  <Link to="/contact" className="transition-colors hover:text-gold">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <h2 className="eyebrow mt-8 text-gold">Contact</h2>
            <ul className="mt-4 space-y-3 text-sm text-primary-foreground/70">
              <li className="flex gap-2">
                <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="hover:text-gold">
                  {settings.phone}
                </a>
              </li>
              <li className="flex gap-2">
                <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a href={`mailto:${settings.email}`} className="hover:text-gold">
                  {settings.email}
                </a>
              </li>
              <li className="flex gap-2">
                <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>{settings.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-primary-foreground/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <SocialLink href={settings.social.instagram} label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4" aria-hidden="true">
                <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
                <circle cx="12" cy="12" r="3.6" />
                <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
              </svg>
            </SocialLink>
            <SocialLink href={settings.social.facebook} label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.2c0-.9.3-1.5 1.6-1.5H16.4V5c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.2V11H7.6v3H10v7h3.5Z" />
              </svg>
            </SocialLink>
            <SocialLink href={settings.social.youtube} label="YouTube">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                <path d="M21.5 8.2a3 3 0 0 0-2.1-2.1C17.7 5.7 12 5.7 12 5.7s-5.7 0-7.4.4A3 3 0 0 0 2.5 8.2 22 22 0 0 0 2.1 12c0 1.3.1 2.6.4 3.8a3 3 0 0 0 2.1 2.1c1.7.4 7.4.4 7.4.4s5.7 0 7.4-.4a3 3 0 0 0 2.1-2.1c.3-1.2.4-2.5.4-3.8s-.1-2.6-.4-3.8ZM10.2 15V9l5.2 3-5.2 3Z" />
              </svg>
            </SocialLink>
          </div>
          <p className="text-xs text-primary-foreground/50">
            © {new Date().getFullYear()} Bombay Cloth Center, Gadhinglaj. Demo storefront.
          </p>
          <Link
            to="/admin/login"
            className="text-xs text-primary-foreground/45 underline decoration-primary-foreground/25 underline-offset-4 transition-colors hover:text-gold"
          >
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; to: string }[];
}) {
  return (
    <div>
      <h2 className="eyebrow text-gold">{title}</h2>
      <ul className="mt-4 space-y-2.5 text-sm text-primary-foreground/70">
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.to} className="transition-colors hover:text-gold">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="grid h-9 w-9 place-items-center border border-primary-foreground/25 text-primary-foreground/80 transition-colors hover:border-gold hover:text-gold"
    >
      {children}
    </a>
  );
}
