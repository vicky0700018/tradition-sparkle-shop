// Central unique-image registry.
// Every URL below is unique. `uniqueImage(seed)` guarantees a distinct URL per
// seed string, and `assertUniqueImages()` can be used to verify at runtime.

export const uniqueImage = (seed: string, w = 800, h = 1000) =>
  `https://picsum.photos/seed/bcc-${seed}/${w}/${h}`;

export const categoryImages: Record<string, string> = {
  sarees: uniqueImage("cat-sarees", 900, 1100),
  "silk-sarees": uniqueImage("cat-silk-sarees", 900, 1100),
  "designer-sarees": uniqueImage("cat-designer-sarees", 900, 1100),
  "bridal-sarees": uniqueImage("cat-bridal-sarees", 900, 1100),
  lehengas: uniqueImage("cat-lehengas", 900, 1100),
  "sharara-sets": uniqueImage("cat-sharara", 900, 1100),
  "dress-materials": uniqueImage("cat-dress-materials", 900, 1100),
  "ethnic-sets": uniqueImage("cat-ethnic-sets", 900, 1100),
  "festive-wear": uniqueImage("cat-festive-wear", 900, 1100),
  sherwanis: uniqueImage("cat-sherwanis", 900, 1100),
  kurtas: uniqueImage("cat-kurtas", 900, 1100),
  "nehru-jackets": uniqueImage("cat-nehru", 900, 1100),
  "mens-ethnic-sets": uniqueImage("cat-mens-ethnic", 900, 1100),
  "formal-wear": uniqueImage("cat-formal", 900, 1100),
  suiting: uniqueImage("cat-suiting", 900, 1100),
  shirting: uniqueImage("cat-shirting", 900, 1100),
  "girls-party-wear": uniqueImage("cat-girls-party", 900, 1100),
  "girls-ethnic-wear": uniqueImage("cat-girls-ethnic", 900, 1100),
  "boys-ethnic-wear": uniqueImage("cat-boys-ethnic", 900, 1100),
  "kids-casual-wear": uniqueImage("cat-kids-casual", 900, 1100),
  "kids-wedding-wear": uniqueImage("cat-kids-wedding", 900, 1100),
  "bridal-collection": uniqueImage("cat-bridal-collection", 900, 1100),
  "groom-collection": uniqueImage("cat-groom-collection", 900, 1100),
  "wedding-sarees": uniqueImage("cat-wedding-sarees", 900, 1100),
  "wedding-lehengas": uniqueImage("cat-wedding-lehengas", 900, 1100),
  "family-wedding-wear": uniqueImage("cat-family-wedding", 900, 1100),
  "lagna-basta": uniqueImage("cat-lagna-basta", 900, 1100),
  "bombay-kids": uniqueImage("cat-bombay-kids", 900, 1100),
};

export const bannerImages = {
  festive: uniqueImage("banner-festive", 1600, 700),
  bridalEdit: uniqueImage("banner-bridal-edit", 1600, 700),
  kidsFest: uniqueImage("banner-kids-fest", 1600, 700),
  suiting: uniqueImage("banner-suiting", 1600, 700),
};

export const sectionImages = {
  bridalEditorialA: uniqueImage("section-bridal-a", 1000, 1250),
  bridalEditorialB: uniqueImage("section-bridal-b", 1000, 700),
  maharashtrian: uniqueImage("section-maharashtrian", 1000, 1250),
  festiveFashion: uniqueImage("section-festive", 1000, 700),
  mensWedding: uniqueImage("section-mens-wedding", 1000, 1250),
  storeVisit: uniqueImage("section-store-visit", 1200, 700),
  newsletter: uniqueImage("section-newsletter", 1200, 700),
  aboutPhilosophy: uniqueImage("about-philosophy", 1000, 750),
  aboutOffer: uniqueImage("about-offer", 1000, 750),
  aboutTeam: uniqueImage("about-team", 1000, 750),
  weddingHero: uniqueImage("wedding-hero", 1600, 800),
  weddingFamily: uniqueImage("wedding-family", 1000, 750),
  weddingEditorial: uniqueImage("wedding-editorial", 1000, 1250),
  kidsHero: uniqueImage("kids-hero", 1600, 800),
  kidsGirls: uniqueImage("kids-girls", 1000, 750),
  kidsBoys: uniqueImage("kids-boys", 1000, 750),
  collectionsHero: uniqueImage("collections-hero", 1600, 800),
  contactMap: uniqueImage("contact-map", 1200, 700),
  lagnaBastaDetail: uniqueImage("lagna-basta-detail", 1000, 750),
};

/** Returns any duplicated URLs across the registry (should always be empty). */
export function findDuplicateImages(extra: string[] = []): string[] {
  const all = [
    ...Object.values(categoryImages),
    ...Object.values(bannerImages),
    ...Object.values(sectionImages),
    ...extra,
  ];
  const seen = new Set<string>();
  const dupes = new Set<string>();
  for (const url of all) {
    if (seen.has(url)) dupes.add(url);
    seen.add(url);
  }
  return [...dupes];
}
