import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { discountPercent, formatINR, type Product } from "../data/products";
import { useStore } from "../context/StoreContext";
import { Badge, Button, Stars } from "./ui";
import { CloseIcon, EyeIcon, HeartIcon } from "./Icons";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const [quickView, setQuickView] = useState(false);
  const off = discountPercent(product);
  const wishlisted = isWishlisted(product.id);

  return (
    <>
      <article className="card-lift group relative flex flex-col border border-border bg-card">
        <div className="relative overflow-hidden bg-muted">
          <Link to="/product/$id" params={{ id: product.id }} className="block">
            <img
              src={product.images[0]}
              alt={`${product.name} — ${product.category} at Bombay Cloth Center`}
              loading="lazy"
              width={800}
              height={1000}
              className="aspect-4/5 w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </Link>
          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {off > 0 ? <Badge tone="primary">{off}% Off</Badge> : null}
            {product.newArrival ? <Badge>New</Badge> : null}
            {product.bestSeller ? <Badge tone="gold">Best Seller</Badge> : null}
          </div>
          <button
            type="button"
            onClick={() => toggleWishlist(product.id)}
            aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
            aria-pressed={wishlisted}
            className={`absolute right-3 top-3 grid h-9 w-9 place-items-center border transition-colors ${
              wishlisted
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card/90 text-primary hover:border-primary"
            }`}
          >
            <HeartIcon filled={wishlisted} className="h-4 w-4" />
          </button>
          <div className="absolute inset-x-0 bottom-0 flex translate-y-full gap-px opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <Button
              variant="dark"
              size="sm"
              className="flex-1"
              onClick={() => setQuickView(true)}
            >
              <EyeIcon className="h-4 w-4" /> Quick View
            </Button>
            <Button
              variant="primary"
              size="sm"
              className="flex-1"
              onClick={() => addToCart(product.id)}
            >
              Add to Cart
            </Button>
          </div>
        </div>
        <div className="flex flex-1 flex-col p-4">
          <p className="eyebrow text-[0.6rem] text-muted-foreground">{product.category}</p>
          <h3 className="mt-1.5 text-base leading-snug">
            <Link to="/product/$id" params={{ id: product.id }} className="hover:text-primary">
              {product.name}
            </Link>
          </h3>
          <div className="mt-2">
            <Stars rating={product.rating} count={product.reviewCount} />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-lg font-semibold text-primary">{formatINR(product.price)}</span>
            <span className="text-xs text-muted-foreground line-through">
              {formatINR(product.mrp)}
            </span>
          </div>
          <div className="mt-3 sm:hidden">
            <Button size="sm" className="w-full" onClick={() => addToCart(product.id)}>
              Add to Cart
            </Button>
          </div>
        </div>
      </article>
      {quickView ? <QuickView product={product} onClose={() => setQuickView(false)} /> : null}
    </>
  );
}

export function QuickView({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]);

  return (
    <div
      className="fixed inset-0 z-90 flex items-center justify-center bg-charcoal/70 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Quick view: ${product.name}`}
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto bg-card"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close quick view"
          className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center border border-border bg-card text-primary hover:border-primary"
        >
          <CloseIcon className="h-4 w-4" />
        </button>
        <div className="grid gap-6 sm:grid-cols-2">
          <img
            src={product.images[1]}
            alt={`${product.name} detail view`}
            loading="lazy"
            className="aspect-4/5 w-full object-cover"
          />
          <div className="p-6 sm:py-8 sm:pr-8">
            <p className="eyebrow text-gold">{product.category}</p>
            <h2 className="mt-2 text-2xl">{product.name}</h2>
            <div className="mt-2">
              <Stars rating={product.rating} count={product.reviewCount} />
            </div>
            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-2xl font-semibold text-primary">{formatINR(product.price)}</span>
              <span className="text-sm text-muted-foreground line-through">{formatINR(product.mrp)}</span>
              <span className="text-sm font-semibold text-success">
                {discountPercent(product)}% off
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{product.fabric}</p>
            <fieldset className="mt-5">
              <legend className="eyebrow text-[0.6rem] text-muted-foreground">Size</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className={`border px-3 py-1.5 text-xs transition-colors ${
                      size === s ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </fieldset>
            <fieldset className="mt-4">
              <legend className="eyebrow text-[0.6rem] text-muted-foreground">Colour</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    className={`border px-3 py-1.5 text-xs transition-colors ${
                      color === c ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </fieldset>
            <div className="mt-6 flex flex-wrap gap-2">
              <Button
                onClick={() => {
                  addToCart(product.id, size, color);
                  onClose();
                }}
              >
                Add to Cart
              </Button>
              <Button variant="outline" onClick={() => toggleWishlist(product.id)}>
                <HeartIcon filled={isWishlisted(product.id)} className="h-4 w-4" />
                Wishlist
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductGrid({ items }: { items: Product[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
      {items.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
