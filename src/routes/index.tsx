import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "../components/SiteLayout";
import { Hero } from "../components/home/Hero";
import {
  BannerRail,
  CategoryTiles,
  CollectionSection,
  HeritageSection,
  KidsPromo,
  LagnaBastaSection,
  ReviewsSection,
  StoreVisitCTA,
  TrustStrip,
} from "../components/home/Sections";
import { homeCategorySlugs } from "../data/categories";
import { useStore } from "../context/StoreContext";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "Bombay Cloth Center | Premium Ethnic Wear & Wedding Collection | Gadhinglaj",
      },
      {
        name: "description",
        content:
          "Six decades of trust. Shop premium sarees, bridal lehengas, sherwanis, Lagna Basta sets and Bombay Kids at Bombay Cloth Center, Gadhinglaj.",
      },
      {
        property: "og:title",
        content: "Bombay Cloth Center | Premium Ethnic Wear & Wedding Collection",
      },
      {
        property: "og:description",
        content:
          "Heritage textile showroom in Gadhinglaj since 1965 — bridal, festive, men's and kids collections under one roof.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { products } = useStore();
  const byCollection = (name: string) =>
    products.filter((p) => p.collections.includes(name) && p.status === "Active");

  return (
    <SiteLayout>
      <Hero />
      <TrustStrip />
      <CategoryTiles
        eyebrow="Shop By Category"
        title="Everything Your Family Needs, Under One Roof"
        intro="From bridal silks to school-day casuals — explore the departments our customers have trusted for six decades."
        slugs={homeCategorySlugs}
      />
      <CollectionSection
        eyebrow="The Bridal Edit"
        title="For The Bride Who Wants Heirlooms"
        intro="Hand-picked lehengas, Paithani silks and trousseau sets selected by our buyers."
        items={byCollection("Bridal Edit")}
        ctaLabel="View All Bridal"
        ctaTo="/wedding"
        tone="cream"
      />
      <LagnaBastaSection />
      <CollectionSection
        eyebrow="Maharashtrian Wedding"
        title="Paithani, Nauvari & Traditional Wedding Styles"
        intro="Rooted in Maharashtra's wedding traditions — woven, bordered and finished the way families here expect."
        items={byCollection("Maharashtrian Wedding")}
        ctaLabel="Explore Wedding"
        ctaTo="/wedding"
      />
      <BannerRail />
      <CollectionSection
        eyebrow="Festive Fashion"
        title="Ready For Every Celebration"
        intro="Sarees, kurtas, sharara sets and dress materials for the festive calendar."
        items={byCollection("Festive Fashion")}
        ctaLabel="Shop Festive"
        ctaTo="/shop"
        tone="cream"
      />
      <KidsPromo />
      <CollectionSection
        eyebrow="Bombay Kids"
        title="Little Styles. Big Smiles."
        items={byCollection("Bombay Kids")}
        ctaLabel="All Kidswear"
        ctaTo="/kids"
      />
      <CollectionSection
        eyebrow="Men's Wedding Edit"
        title="Sherwanis, Kurtas & Tailoring Fabrics"
        intro="For the groom and every man in the family — plus suiting and shirting ready for your tailor."
        items={byCollection("Men's Wedding Edit")}
        ctaLabel="Shop Men"
        ctaTo="/men"
        tone="cream"
      />
      <HeritageSection />
      <CollectionSection
        eyebrow="Best Sellers"
        title="What Gadhinglaj Is Buying"
        items={products.filter((p) => p.bestSeller)}
        ctaLabel="Shop All"
        ctaTo="/shop"
      />
      <CollectionSection
        eyebrow="New Arrivals"
        title="Just In This Season"
        items={products.filter((p) => p.newArrival)}
        ctaLabel="Shop New"
        ctaTo="/shop"
        tone="cream"
      />
      <ReviewsSection />
      <StoreVisitCTA />
    </SiteLayout>
  );
}
