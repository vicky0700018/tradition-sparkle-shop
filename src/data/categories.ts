import { categoryImages } from "./images";

export type Category = {
  id: string;
  name: string;
  slug: string;
  group: "Women" | "Men" | "Kids" | "Wedding";
  image: string;
  enabled: boolean;
  order: number;
};

const defs: Array<[string, Category["group"]]> = [
  ["Sarees", "Women"],
  ["Silk Sarees", "Women"],
  ["Designer Sarees", "Women"],
  ["Bridal Sarees", "Women"],
  ["Lehengas", "Women"],
  ["Sharara Sets", "Women"],
  ["Dress Materials", "Women"],
  ["Ethnic Sets", "Women"],
  ["Festive Wear", "Women"],
  ["Sherwanis", "Men"],
  ["Kurtas", "Men"],
  ["Nehru Jackets", "Men"],
  ["Mens Ethnic Sets", "Men"],
  ["Formal Wear", "Men"],
  ["Suiting", "Men"],
  ["Shirting", "Men"],
  ["Girls Party Wear", "Kids"],
  ["Girls Ethnic Wear", "Kids"],
  ["Boys Ethnic Wear", "Kids"],
  ["Kids Casual Wear", "Kids"],
  ["Kids Wedding Wear", "Kids"],
  ["Bridal Collection", "Wedding"],
  ["Groom Collection", "Wedding"],
  ["Wedding Sarees", "Wedding"],
  ["Wedding Lehengas", "Wedding"],
  ["Family Wedding Wear", "Wedding"],
  ["Lagna Basta", "Wedding"],
];

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const categories: Category[] = defs.map(([name, group], index) => {
  const slug = slugify(name);
  return {
    id: `CAT-${String(index + 1).padStart(2, "0")}`,
    name,
    slug,
    group,
    image: categoryImages[slug] ?? categoryImages["sarees"]!,
    enabled: true,
    order: index + 1,
  };
});

/** Homepage "Shop by Category" tiles. */
export const homeCategorySlugs = [
  "sarees",
  "lehengas",
  "sharara-sets",
  "dress-materials",
  "festive-wear",
  "sherwanis",
  "kurtas",
  "suiting",
  "kids-wedding-wear",
  "lagna-basta",
];
