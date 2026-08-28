import { useMemo, useState } from "react";
import { useStore } from "../context/StoreContext";
import type { Product } from "../data/products";
import { ProductGrid } from "./ProductCard";
import { Button, EmptyState, inputClass, Skeleton } from "./ui";
import { CloseIcon, SearchIcon } from "./Icons";
import { Link } from "@tanstack/react-router";

type Sort =
  | "featured"
  | "newest"
  | "price-asc"
  | "price-desc"
  | "best-selling"
  | "top-rated";

const sortLabels: Record<Sort, string> = {
  featured: "Featured",
  newest: "Newest",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  "best-selling": "Best Selling",
  "top-rated": "Top Rated",
};

export function ShopBrowser({
  pool,
  initialQuery = "",
  lockGroup,
}: {
  pool: Product[];
  initialQuery?: string;
  lockGroup?: Product["group"];
}) {
  const { categories } = useStore();
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState("all");
  const [subcategory, setSubcategory] = useState("all");
  const [group, setGroup] = useState<string>(lockGroup ?? "all");
  const [size, setSize] = useState("all");
  const [color, setColor] = useState("all");
  const [maxPrice, setMaxPrice] = useState(50000);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState<Sort>("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const poolCategories = useMemo(
    () => [...new Set(pool.map((p) => p.category))].sort(),
    [pool],
  );
  const poolSubcategories = useMemo(
    () =>
      [
        ...new Set(
          pool
            .filter((p) => category === "all" || p.category === category)
            .map((p) => p.subcategory),
        ),
      ].sort(),
    [pool, category],
  );
  const poolSizes = useMemo(() => [...new Set(pool.flatMap((p) => p.sizes))], [pool]);
  const poolColors = useMemo(
    () => [...new Set(pool.flatMap((p) => p.colors))].sort(),
    [pool],
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = pool.filter((p) => p.status === "Active");
    if (q) {
      list = list.filter((p) =>
        [p.name, p.category, p.subcategory, p.group, ...p.tags]
          .join(" ")
          .toLowerCase()
          .includes(q),
      );
    }
    if (category !== "all") list = list.filter((p) => p.category === category);
    if (subcategory !== "all") list = list.filter((p) => p.subcategory === subcategory);
    if (group !== "all") list = list.filter((p) => p.group === group);
    if (size !== "all") list = list.filter((p) => p.sizes.includes(size));
    if (color !== "all") list = list.filter((p) => p.colors.includes(color));
    list = list.filter((p) => p.price <= maxPrice);
    if (inStockOnly) list = list.filter((p) => p.stock > 0);
    if (minRating > 0) list = list.filter((p) => p.rating >= minRating);

    const sorted = [...list];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        sorted.sort((a, b) => Number(b.newArrival) - Number(a.newArrival));
        break;
      case "best-selling":
        sorted.sort(
          (a, b) => Number(b.bestSeller) - Number(a.bestSeller) || b.reviewCount - a.reviewCount,
        );
        break;
      case "top-rated":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default:
        sorted.sort((a, b) => Number(b.featured) - Number(a.featured));
    }
    return sorted;
  }, [
    pool,
    query,
    category,
    subcategory,
    group,
    size,
    color,
    maxPrice,
    inStockOnly,
    minRating,
    sort,
  ]);

  const resetAll = () => {
    setQuery("");
    setCategory("all");
    setSubcategory("all");
    setGroup(lockGroup ?? "all");
    setSize("all");
    setColor("all");
    setMaxPrice(50000);
    setInStockOnly(false);
    setMinRating(0);
    setSort("featured");
  };

  const filterPanel = (
    <div className="space-y-6">
      <Filter label="Category">
        <select
          className={inputClass}
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setSubcategory("all");
          }}
        >
          <option value="all">All categories</option>
          {poolCategories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </Filter>
      <Filter label="Sub-category">
        <select
          className={inputClass}
          value={subcategory}
          onChange={(e) => setSubcategory(e.target.value)}
        >
          <option value="all">All sub-categories</option>
          {poolSubcategories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </Filter>
      {!lockGroup ? (
        <Filter label="Shop for">
          <select
            className={inputClass}
            value={group}
            onChange={(e) => setGroup(e.target.value)}
          >
            <option value="all">Everyone</option>
            <option value="Women">Women</option>
            <option value="Men">Men</option>
            <option value="Kids">Kids</option>
            <option value="Wedding">Wedding</option>
          </select>
        </Filter>
      ) : null}
      <Filter label="Size">
        <select className={inputClass} value={size} onChange={(e) => setSize(e.target.value)}>
          <option value="all">All sizes</option>
          {poolSizes.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </Filter>
      <Filter label="Colour">
        <select className={inputClass} value={color} onChange={(e) => setColor(e.target.value)}>
          <option value="all">All colours</option>
          {poolColors.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </Filter>
      <Filter label={`Max price: ₹${maxPrice.toLocaleString("en-IN")}`}>
        <input
          type="range"
          min={999}
          max={50000}
          step={500}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-[var(--color-primary)]"
          aria-label="Maximum price"
        />
      </Filter>
      <Filter label="Rating">
        <select
          className={inputClass}
          value={minRating}
          onChange={(e) => setMinRating(Number(e.target.value))}
        >
          <option value={0}>All ratings</option>
          <option value={4}>4★ & above</option>
          <option value={4.5}>4.5★ & above</option>
        </select>
      </Filter>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => setInStockOnly(e.target.checked)}
          className="h-4 w-4 accent-[var(--color-primary)]"
        />
        In stock only
      </label>
      <Button variant="ghost" size="sm" onClick={resetAll} className="w-full">
        Clear all filters
      </Button>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <label className="sr-only" htmlFor="shop-search">
            Search products
          </label>
          <input
            id="shop-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, category or tag…"
            className={`${inputClass} pl-9`}
          />
        </div>
        <div className="flex gap-2">
          <label className="sr-only" htmlFor="shop-sort">
            Sort products
          </label>
          <select
            id="shop-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className={`${inputClass} sm:w-52`}
          >
            {Object.entries(sortLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <Button
            variant="outline"
            className="lg:hidden"
            onClick={() => setFiltersOpen(true)}
          >
            Filters
          </Button>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[16rem_1fr]">
        <aside className="hidden lg:block">
          <h2 className="eyebrow text-gold">Refine</h2>
          <div className="mt-5 border border-border bg-card p-5">{filterPanel}</div>
        </aside>

        <div>
          <p className="mb-5 text-xs uppercase tracking-[0.12em] text-muted-foreground">
            {results.length} product{results.length === 1 ? "" : "s"}
          </p>
          {results.length ? (
            <ProductGrid items={results} />
          ) : (
            <EmptyState
              title="No products matched your filters"
              body="Try a different search term, widen the price range, or clear your filters to see the full collection."
              action={
                <div className="flex gap-2">
                  <Button onClick={resetAll}>Clear Filters</Button>
                  <Link to="/shop">
                    <Button variant="outline">Browse All</Button>
                  </Link>
                </div>
              }
            />
          )}
        </div>
      </div>

      {filtersOpen ? (
        <div className="fixed inset-0 z-90 lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
          <div className="absolute inset-0 bg-charcoal/60" onClick={() => setFiltersOpen(false)} />
          <div className="absolute inset-y-0 right-0 w-[88%] max-w-sm overflow-y-auto bg-background p-5">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg">Filters</h2>
              <button type="button" aria-label="Close filters" onClick={() => setFiltersOpen(false)}>
                <CloseIcon />
              </button>
            </div>
            {filterPanel}
            <Button className="mt-6 w-full" onClick={() => setFiltersOpen(false)}>
              Show {results.length} Results
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Filter({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </p>
      {children}
    </div>
  );
}

export function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="border border-border bg-card">
          <Skeleton className="aspect-4/5 w-full" />
          <div className="space-y-2 p-4">
            <Skeleton className="h-3 w-1/3" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        </div>
      ))}
    </div>
  );
}
