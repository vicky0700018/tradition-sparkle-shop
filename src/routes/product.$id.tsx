import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout } from "../components/SiteLayout";
import { ProductGrid } from "../components/ProductCard";
import {
  Badge,
  Breadcrumbs,
  Button,
  EmptyState,
  SectionHeading,
  Stars,
} from "../components/ui";
import { CheckIcon, HeartIcon, PinIcon } from "../components/Icons";
import { discountPercent, formatINR } from "../data/products";
import { useStore } from "../context/StoreContext";

export const Route = createFileRoute("/product/$id")({
  head: () => ({
    meta: [
      { title: "Product Details | Bombay Cloth Center" },
      {
        name: "description",
        content:
          "View fabric details, sizes, colours, care instructions and delivery information for this Bombay Cloth Center piece.",
      },
      { property: "og:title", content: "Product Details | Bombay Cloth Center" },
      {
        property: "og:description",
        content:
          "Premium ethnic wear from Gadhinglaj's heritage textile showroom, established 1965.",
      },
    ],
  }),
  component: ProductPage,
});

const tabs = ["Description", "Details", "Fabric & Care", "Shipping", "Reviews"] as const;

function ProductPage() {
  const { id } = Route.useParams();
  const { getProduct, products, reviews, addToCart, toggleWishlist, isWishlisted, settings } =
    useStore();
  const navigate = useNavigate();
  const product = getProduct(id);

  const [imageIndex, setImageIndex] = useState(0);
  const [size, setSize] = useState<string>(product?.sizes[0] ?? "Free Size");
  const [color, setColor] = useState<string>(product?.colors[0] ?? "As Shown");
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<(typeof tabs)[number]>("Description");

  const related = useMemo(
    () =>
      products
        .filter(
          (p) =>
            product &&
            p.id !== product.id &&
            p.status === "Active" &&
            (p.group === product.group || p.category === product.category),
        )
        .slice(0, 4),
    [products, product],
  );

  if (!product) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
          <EmptyState
            title="Product not available"
            body="This piece has been sold or removed from the catalogue. Explore our current collections instead."
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

  const off = discountPercent(product);
  const wishlisted = isWishlisted(product.id);
  const productReviews = reviews.filter(
    (r) => r.status === "Approved" && (!r.product || r.product === product.name),
  );

  const stockLabel =
    product.stock === 0 ? "Out of Stock" : product.stock <= 6 ? "Low Stock" : "In Stock";

  const tabBody: Record<(typeof tabs)[number], React.ReactNode> = {
    Description: <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>,
    Details: (
      <dl className="grid gap-3 text-sm sm:grid-cols-2">
        {[
          ["SKU", product.sku],
          ["Category", product.category],
          ["Sub-category", product.subcategory],
          ["Department", product.group],
          ["Available Sizes", product.sizes.join(", ")],
          ["Colours", product.colors.join(", ")],
        ].map(([k, v]) => (
          <div key={k} className="border-b border-border pb-2">
            <dt className="eyebrow text-[0.6rem] text-muted-foreground">{k}</dt>
            <dd className="mt-1 text-foreground">{v}</dd>
          </div>
        ))}
      </dl>
    ),
    "Fabric & Care": (
      <div className="space-y-3 text-sm text-muted-foreground">
        <p>
          <span className="font-semibold text-foreground">Fabric: </span>
          {product.fabric}
        </p>
        <p>
          <span className="font-semibold text-foreground">Care: </span>
          {product.care}
        </p>
      </div>
    ),
    Shipping: (
      <ul className="space-y-2 text-sm text-muted-foreground">
        <li>Dispatch within 2 working days from Gadhinglaj.</li>
        <li>
          Delivery in 4–7 working days across Maharashtra. Shipping {formatINR(settings.shippingCharge)},
          free above {formatINR(settings.freeShippingThreshold)}.
        </li>
        <li>Store pickup available at Main Bazar Peth, Gadhinglaj.</li>
        <li>Exchange accepted within 7 days with original tags and bill.</li>
      </ul>
    ),
    Reviews: productReviews.length ? (
      <ul className="space-y-5">
        {productReviews.slice(0, 5).map((r) => (
          <li key={r.id} className="border-b border-border pb-4">
            <div className="flex flex-wrap items-center gap-3">
              <p className="font-semibold text-foreground">{r.customer}</p>
              <Stars rating={r.rating} />
              <span className="text-xs text-muted-foreground">{r.date}</span>
            </div>
            <p className="mt-2 text-sm font-semibold text-foreground">{r.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{r.body}</p>
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-sm text-muted-foreground">No reviews yet for this piece.</p>
    ),
  };

  return (
    <SiteLayout>
      <div className="border-b border-border bg-cream/40">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
          <Breadcrumbs
            trail={[
              { label: "Home", to: "/" },
              { label: "Shop", to: "/shop" },
              { label: product.name },
            ]}
          />
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:py-14">
        <div>
          <img
            src={product.images[imageIndex] ?? product.images[0]}
            alt={`${product.name} — ${product.fabric}, view ${imageIndex + 1}`}
            className="aspect-4/5 w-full border border-border object-cover"
          />
          <div className="mt-3 grid grid-cols-4 gap-3">
            {product.images.map((img, i) => (
              <button
                key={img}
                type="button"
                onClick={() => setImageIndex(i)}
                aria-label={`View image ${i + 1} of ${product.name}`}
                className={`border transition-colors ${
                  i === imageIndex ? "border-gold" : "border-border hover:border-primary"
                }`}
              >
                <img
                  src={img}
                  alt={`${product.name} thumbnail ${i + 1}`}
                  loading="lazy"
                  className="aspect-4/5 w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="eyebrow text-gold">{product.category}</p>
          <h1 className="mt-3 text-3xl leading-tight sm:text-4xl">{product.name}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <Stars rating={product.rating} count={product.reviewCount} />
            <Badge tone={product.stock === 0 ? "danger" : product.stock <= 6 ? "gold" : "success"}>
              {stockLabel}
            </Badge>
          </div>

          <div className="mt-5 flex flex-wrap items-baseline gap-3">
            <span className="text-3xl font-semibold text-primary">{formatINR(product.price)}</span>
            <span className="text-sm text-muted-foreground line-through">
              {formatINR(product.mrp)}
            </span>
            {off > 0 ? <span className="text-sm font-semibold text-success">{off}% off</span> : null}
          </div>

          <fieldset className="mt-7">
            <legend className="eyebrow text-[0.6rem] text-muted-foreground">Select Size</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={`border px-4 py-2 text-xs transition-colors ${
                    size === s
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:border-primary"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-5">
            <legend className="eyebrow text-[0.6rem] text-muted-foreground">Select Colour</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`border px-4 py-2 text-xs transition-colors ${
                    color === c
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:border-primary"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="mt-6 flex items-center gap-4">
            <span className="eyebrow text-[0.6rem] text-muted-foreground">Quantity</span>
            <div className="inline-flex border border-border">
              <button
                type="button"
                aria-label="Decrease quantity"
                className="px-3 py-2 text-sm hover:bg-muted"
                onClick={() => setQty((n) => Math.max(1, n - 1))}
              >
                −
              </button>
              <span className="w-10 py-2 text-center text-sm">{qty}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                className="px-3 py-2 text-sm hover:bg-muted"
                onClick={() => setQty((n) => n + 1)}
              >
                +
              </button>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap gap-2">
            <Button
              size="lg"
              disabled={product.stock === 0}
              onClick={() => addToCart(product.id, size, color, qty)}
            >
              Add to Cart
            </Button>
            <Button
              size="lg"
              variant="gold"
              disabled={product.stock === 0}
              onClick={() => {
                addToCart(product.id, size, color, qty);
                navigate({ to: "/checkout" });
              }}
            >
              Buy Now
            </Button>
            <Button size="lg" variant="outline" onClick={() => toggleWishlist(product.id)}>
              <HeartIcon filled={wishlisted} className="h-4 w-4" />
              {wishlisted ? "Wishlisted" : "Wishlist"}
            </Button>
          </div>

          <ul className="mt-7 space-y-2 border-t border-border pt-6 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <CheckIcon className="mt-0.5 h-4 w-4 text-gold" />
              {product.fabric}
            </li>
            <li className="flex items-start gap-2">
              <CheckIcon className="mt-0.5 h-4 w-4 text-gold" />
              Delivery in 4–7 working days • Free above {formatINR(settings.freeShippingThreshold)}
            </li>
            <li className="flex items-start gap-2">
              <PinIcon className="mt-0.5 h-4 w-4 text-gold" />
              Store pickup available in Gadhinglaj
            </li>
          </ul>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6">
        <div className="flex flex-wrap gap-px border-b border-border">
          {tabs.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] transition-colors ${
                tab === t
                  ? "border-b-2 border-gold text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="py-7">{tabBody[tab]}</div>
      </section>

      {related.length ? (
        <section className="bg-cream/40 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SectionHeading
              eyebrow="You May Also Like"
              title="Pairs Beautifully With"
              align="left"
            />
            <div className="mt-8">
              <ProductGrid items={related} />
            </div>
          </div>
        </section>
      ) : null}
    </SiteLayout>
  );
}
