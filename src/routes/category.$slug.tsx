import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "../components/SiteLayout";
import { PageHeader } from "../components/PageHeader";
import { ShopBrowser } from "../components/ShopBrowser";
import { Button, EmptyState } from "../components/ui";
import { useStore } from "../context/StoreContext";

export const Route = createFileRoute("/category/$slug")({
  head: ({ params }) => {
    const label = params.slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    return {
      meta: [
        { title: `${label} | Bombay Cloth Center, Gadhinglaj` },
        {
          name: "description",
          content: `Shop our ${label} range — premium fabrics, honest pricing and six decades of textile expertise in Gadhinglaj.`,
        },
        { property: "og:title", content: `${label} | Bombay Cloth Center` },
        {
          property: "og:description",
          content: `Explore the ${label} collection at Bombay Cloth Center, established 1965.`,
        },
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { slug } = Route.useParams();
  const { categories, products } = useStore();
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    return (
      <SiteLayout>
        <PageHeader
          title="Category not found"
          trail={[{ label: "Home", to: "/" }, { label: "Shop", to: "/shop" }, { label: "Not found" }]}
        />
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <EmptyState
            title="This department has moved"
            body="The category you're looking for is no longer listed. Browse the full showroom instead."
            action={
              <Link to="/shop">
                <Button>Shop All</Button>
              </Link>
            }
          />
        </div>
      </SiteLayout>
    );
  }

  const pool = products.filter(
    (p) => p.status === "Active" && (p.category === category.name || p.tags.includes(slug)),
  );

  return (
    <SiteLayout>
      <PageHeader
        eyebrow={category.group}
        title={category.name}
        intro={`Curated ${category.name.toLowerCase()} from Bombay Cloth Center — selected by our buyers for fit, finish and value.`}
        trail={[
          { label: "Home", to: "/" },
          { label: "Shop", to: "/shop" },
          { label: category.name },
        ]}
      />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        <img
          src={category.image}
          alt={`${category.name} collection at Bombay Cloth Center, Gadhinglaj`}
          className="mb-10 hidden h-64 w-full object-cover sm:block"
        />
        {pool.length ? (
          <ShopBrowser pool={pool} />
        ) : (
          <EmptyState
            title="Restocking this counter"
            body="We're refreshing this collection. Visit the showroom or explore the rest of our range meanwhile."
            action={
              <Link to="/shop">
                <Button>Browse Everything</Button>
              </Link>
            }
          />
        )}
      </div>
    </SiteLayout>
  );
}

void notFound;
