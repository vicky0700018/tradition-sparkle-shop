import { useEffect, useState, type ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Toasts } from "./ui";
import { ArrowUpIcon, WhatsAppIcon } from "./Icons";
import { useStore } from "../context/StoreContext";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
      <BackToTop />
      <Toasts />
    </div>
  );
}

export function WhatsAppButton() {
  const { settings } = useStore();
  return (
    <a
      href={`https://wa.me/${settings.phoneDigits}?text=${encodeURIComponent(
        "Hello Bombay Cloth Center, I would like to know more about your collections.",
      )}`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-4 z-80 inline-flex items-center gap-2 bg-success px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-primary-foreground shadow-lg transition-transform duration-300 hover:-translate-y-0.5"
    >
      <WhatsAppIcon className="h-5 w-5" />
      <span className="hidden sm:inline">Chat on WhatsApp</span>
    </a>
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-5 left-4 z-80 grid h-11 w-11 place-items-center border border-gold/50 bg-card text-primary shadow-md transition-colors hover:bg-cream"
    >
      <ArrowUpIcon className="h-4 w-4" />
    </button>
  );
}
