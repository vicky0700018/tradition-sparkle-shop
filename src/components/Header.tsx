import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useStore } from "../context/StoreContext";
import { Logo } from "./ui";
import {
  BagIcon,
  CloseIcon,
  HeartIcon,
  MenuIcon,
  SearchIcon,
  UserIcon,
} from "./Icons";

const nav = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "Women", to: "/women" },
  { label: "Men", to: "/men" },
  { label: "Kids", to: "/kids" },
  { label: "Wedding", to: "/wedding" },
  { label: "Lagna Basta", to: "/lagna-basta" },
  { label: "Collections", to: "/collections" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;

export function Header() {
  const { cartCount, wishlist, homepage } = useStore();
  const [stuck, setStuck] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [term, setTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchOpen(false);
    setMenuOpen(false);
    navigate({ to: "/shop", search: term ? { q: term } : {} });
  };

  return (
    <>
      <div className="bg-primary px-4 py-2 text-center text-[0.7rem] tracking-[0.08em] text-primary-foreground sm:text-xs">
        {homepage.announcement}
      </div>
      <header
        className={`sticky top-0 z-70 border-b bg-background/95 backdrop-blur transition-shadow duration-300 ${
          stuck ? "border-gold/30 shadow-[0_10px_30px_-24px_rgba(0,0,0,0.5)]" : "border-border"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6">
          <button
            type="button"
            className="lg:hidden"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <MenuIcon />
          </button>
          <div className="flex-1 lg:flex-none">
            <Logo />
          </div>
          <div className="ml-auto flex items-center gap-1 sm:gap-3">
            <button
              type="button"
              aria-label="Search products"
              onClick={() => setSearchOpen((v) => !v)}
              className="grid h-9 w-9 place-items-center text-primary hover:text-gold"
            >
              <SearchIcon />
            </button>
            <Link
              to="/wishlist"
              aria-label={`Wishlist, ${wishlist.length} items`}
              className="relative grid h-9 w-9 place-items-center text-primary hover:text-gold"
            >
              <HeartIcon />
              {wishlist.length ? <Count value={wishlist.length} /> : null}
            </Link>
            <Link
              to="/cart"
              aria-label={`Cart, ${cartCount} items`}
              className="relative grid h-9 w-9 place-items-center text-primary hover:text-gold"
            >
              <BagIcon />
              {cartCount ? <Count value={cartCount} /> : null}
            </Link>
            <Link
              to="/contact"
              aria-label="Account and store support"
              className="hidden h-9 w-9 place-items-center text-primary hover:text-gold sm:grid"
            >
              <UserIcon />
            </Link>
          </div>
        </div>

        <nav aria-label="Main" className="hidden border-t border-border/70 lg:block">
          <ul className="mx-auto flex max-w-7xl items-center justify-center gap-7 px-6 py-3">
            {nav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/80 transition-colors hover:text-primary"
                  activeProps={{ className: "text-primary" }}
                  activeOptions={{ exact: item.to === "/" }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {searchOpen ? (
          <form
            onSubmit={submitSearch}
            className="border-t border-border bg-cream/60 px-4 py-4 sm:px-6"
            role="search"
          >
            <div className="mx-auto flex max-w-3xl items-center gap-2">
              <label className="sr-only" htmlFor="site-search">
                Search products
              </label>
              <input
                id="site-search"
                autoFocus
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Search sarees, sherwanis, Lagna Basta…"
                className="w-full border border-input bg-card px-4 py-2.5 text-sm outline-none focus:border-gold"
              />
              <button
                type="submit"
                className="bg-primary px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-primary-foreground"
              >
                Search
              </button>
            </div>
          </form>
        ) : null}
      </header>

      {menuOpen ? (
        <div className="fixed inset-0 z-90 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="absolute inset-0 bg-charcoal/60" onClick={() => setMenuOpen(false)} />
          <div className="absolute inset-y-0 left-0 flex w-[82%] max-w-xs flex-col bg-background">
            <div className="flex items-center justify-between border-b border-border px-4 py-4">
              <Logo compact />
              <button type="button" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
                <CloseIcon />
              </button>
            </div>
            <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-4 py-4">
              <ul className="space-y-1">
                {nav.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      onClick={() => setMenuOpen(false)}
                      className="block border-b border-border/60 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-foreground/85"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      ) : null}
    </>
  );
}

function Count({ value }: { value: number }) {
  return (
    <span className="absolute -right-0.5 -top-0.5 grid h-4.5 min-w-4.5 place-items-center rounded-full bg-gold px-1 text-[0.6rem] font-bold text-accent-foreground">
      {value}
    </span>
  );
}
