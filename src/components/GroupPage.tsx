import { SiteLayout } from "./SiteLayout";
import { PageHeader } from "./PageHeader";
import { ShopBrowser } from "./ShopBrowser";
import { CategoryTiles } from "./home/Sections";
import { useStore } from "../context/StoreContext";
import type { Product } from "../data/products";

export function GroupPage({
  group,
  eyebrow,
  title,
  intro,
  tileTitle,
}: {
  group: Product["group"];
  eyebrow: string;
  title: string;
  intro: string;
  tileTitle: string;
}) {
  const { products, categories } = useStore();
  const pool = products.filter((p) => p.group === group && p.status === "Active");
  const slugs = categories.filter((c) => c.group === group && c.enabled).map((c) => c.slug);

  return (
    <SiteLayout>
      <PageHeader
        eyebrow={eyebrow}
        title={title}
        intro={intro}
        trail={[{ label: "Home", to: "/" }, { label: title }]}
      />
      <CategoryTiles eyebrow="Departments" title={tileTitle} slugs={slugs.slice(0, 10)} />
      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <ShopBrowser pool={pool} lockGroup={group} />
      </div>
    </SiteLayout>
  );
}
