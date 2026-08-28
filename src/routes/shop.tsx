import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "../components/SiteLayout";
import { PageHeader } from "../components/PageHeader";
import { ShopBrowser } from "../components/ShopBrowser";
import { useStore } from "../context/StoreContext";

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): { q?: string } => {
    const q = search["q"];
    return typeof q === "string" && q ? { q } : {};
  },
  head: () => ({
    meta: [
      { title: "Shop All Collections | Bombay Cloth Center, Gadhinglaj" },
      {
        name: "description",
        content:
          "Browse sarees, lehengas, sherwanis, dress materials, suiting and Bombay Kids. Filter by category, size, colour, price and rating.",
      },
      { property: "og:title", content: "Shop All Collections | Bombay Cloth Center" },
      {
        property: "og:description",
        content:
          "Premium ethnic and family fashion from Gadhinglaj's trusted textile showroom since 1965.",
      },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const search = Route.useSearch();
  const { products } = useStore();
  const q = search.q ?? "";

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="The Showroom"
        title="Shop All Collections"
        intro="Every department of Bombay Cloth Center in one place — filter, sort and discover the piece your celebration deserves."
        trail={[{ label: "Home", to: "/" }, { label: "Shop" }]}
      />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        <ShopBrowser
          key={q}
          pool={products.filter((p) => p.status === "Active")}
          initialQuery={q}
        />
      </div>
    </SiteLayout>
  );
}
