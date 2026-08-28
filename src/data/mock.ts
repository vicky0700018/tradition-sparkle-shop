import { bannerImages, sectionImages } from "./images";
import { products } from "./products";

export const business = {
  name: "Bombay Cloth Center",
  owner: "S. Pawale",
  tagline: "Six Decades of Trust, Style & Tradition.",
  established: 1965,
  address:
    "Busveshwar Putala, Main Bazar Peth, Near Veer Shahu Bank, Gadhinglaj, Maharashtra — 416502",
  phone: "+91 88884 65656",
  phoneDigits: "918888465656",
  email: "suhaspawale08@gmail.com",
  altEmail: "shaggy1848@gmail.com",
  currency: "INR",
  shippingCharge: 99,
  freeShippingThreshold: 2999,
  storePickup: true,
  social: {
    instagram: "https://instagram.com/bombayclothcenter",
    facebook: "https://facebook.com/bombayclothcenter",
    youtube: "https://youtube.com/@bombayclothcenter",
  },
};

export type OrderStatus =
  | "Pending"
  | "Confirmed"
  | "Packed"
  | "Shipped"
  | "Delivered"
  | "Cancelled";

export type Order = {
  id: string;
  customer: string;
  phone: string;
  date: string;
  items: number;
  amount: number;
  payment: "COD" | "UPI" | "Card" | "Store Pickup";
  status: OrderStatus;
  address: string;
  lines: { name: string; qty: number; price: number }[];
};

export const orders: Order[] = [
  {
    id: "BCC10241",
    customer: "Anjali Patil",
    phone: "+91 98765 43210",
    date: "2026-08-24",
    items: 3,
    amount: 48997,
    payment: "UPI",
    status: "Delivered",
    address: "Shivaji Nagar, Gadhinglaj, Maharashtra 416502",
    lines: [
      { name: "Royal Paithani Silk Saree", qty: 1, price: 18999 },
      { name: "Bridal Lehenga Royale", qty: 1, price: 42999 },
    ],
  },
  {
    id: "BCC10242",
    customer: "Rohan Deshmukh",
    phone: "+91 98220 11223",
    date: "2026-08-25",
    items: 2,
    amount: 33998,
    payment: "Card",
    status: "Shipped",
    address: "Main Road, Ajara, Maharashtra 416505",
    lines: [
      { name: "Maharaja Wedding Sherwani", qty: 1, price: 28999 },
      { name: "Silk Nehru Jacket", qty: 1, price: 3999 },
    ],
  },
  {
    id: "BCC10243",
    customer: "Sneha Jadhav",
    phone: "+91 90280 55667",
    date: "2026-08-26",
    items: 4,
    amount: 12996,
    payment: "COD",
    status: "Packed",
    address: "Bazar Peth, Chandgad, Maharashtra 416509",
    lines: [
      { name: "Premium Unstitched Dress Material", qty: 2, price: 2499 },
      { name: "Festive Embroidered Dress Material", qty: 2, price: 3699 },
    ],
  },
  {
    id: "BCC10244",
    customer: "Pooja Kulkarni",
    phone: "+91 93710 88990",
    date: "2026-08-27",
    items: 1,
    amount: 34999,
    payment: "UPI",
    status: "Confirmed",
    address: "Station Road, Gadhinglaj, Maharashtra 416502",
    lines: [{ name: "Bridal Lagna Basta Set", qty: 1, price: 34999 }],
  },
  {
    id: "BCC10245",
    customer: "Amit Patil",
    phone: "+91 88790 33445",
    date: "2026-08-27",
    items: 2,
    amount: 8298,
    payment: "Store Pickup",
    status: "Pending",
    address: "Store Pickup — Main Bazar Peth, Gadhinglaj",
    lines: [
      { name: "Festive Kurta Pajama", qty: 1, price: 2999 },
      { name: "Little Prince Sherwani", qty: 1, price: 5499 },
    ],
  },
  {
    id: "BCC10246",
    customer: "Vaishali Shinde",
    phone: "+91 70301 22334",
    date: "2026-08-28",
    items: 3,
    amount: 15997,
    payment: "COD",
    status: "Pending",
    address: "Gijavane, Gadhinglaj Taluka, Maharashtra 416502",
    lines: [
      { name: "Wedding Gift Saree Collection", qty: 1, price: 12999 },
      { name: "Bombay Kids Cotton Play Set", qty: 2, price: 1199 },
    ],
  },
  {
    id: "BCC10247",
    customer: "Nikhil Chougule",
    phone: "+91 96570 77889",
    date: "2026-08-22",
    items: 1,
    amount: 24999,
    payment: "Card",
    status: "Cancelled",
    address: "Nesari, Gadhinglaj Taluka, Maharashtra 416503",
    lines: [{ name: "Ivory Groom Sherwani", qty: 1, price: 24999 }],
  },
  {
    id: "BCC10248",
    customer: "Shraddha Naik",
    phone: "+91 82370 44556",
    date: "2026-08-21",
    items: 2,
    amount: 21498,
    payment: "UPI",
    status: "Delivered",
    address: "Halkarni, Chandgad, Maharashtra 416509",
    lines: [
      { name: "Velvet Sharara Set", qty: 1, price: 12999 },
      { name: "Nauvari Festive Silk Saree", qty: 1, price: 9999 },
    ],
  },
];

export type Customer = {
  id: string;
  name: string;
  phone: string;
  email: string;
  orders: number;
  spent: number;
  lastOrder: string;
  status: "Active" | "Inactive";
  city: string;
};

export const customers: Customer[] = [
  {
    id: "CU-001",
    name: "Anjali Patil",
    phone: "+91 98765 43210",
    email: "anjali.patil@example.com",
    orders: 7,
    spent: 128400,
    lastOrder: "2026-08-24",
    status: "Active",
    city: "Gadhinglaj",
  },
  {
    id: "CU-002",
    name: "Rohan Deshmukh",
    phone: "+91 98220 11223",
    email: "rohan.deshmukh@example.com",
    orders: 4,
    spent: 76900,
    lastOrder: "2026-08-25",
    status: "Active",
    city: "Ajara",
  },
  {
    id: "CU-003",
    name: "Sneha Jadhav",
    phone: "+91 90280 55667",
    email: "sneha.jadhav@example.com",
    orders: 11,
    spent: 54300,
    lastOrder: "2026-08-26",
    status: "Active",
    city: "Chandgad",
  },
  {
    id: "CU-004",
    name: "Pooja Kulkarni",
    phone: "+91 93710 88990",
    email: "pooja.kulkarni@example.com",
    orders: 3,
    spent: 61200,
    lastOrder: "2026-08-27",
    status: "Active",
    city: "Gadhinglaj",
  },
  {
    id: "CU-005",
    name: "Amit Patil",
    phone: "+91 88790 33445",
    email: "amit.patil@example.com",
    orders: 6,
    spent: 38750,
    lastOrder: "2026-08-27",
    status: "Active",
    city: "Nesari",
  },
  {
    id: "CU-006",
    name: "Vaishali Shinde",
    phone: "+91 70301 22334",
    email: "vaishali.shinde@example.com",
    orders: 2,
    spent: 17900,
    lastOrder: "2026-08-28",
    status: "Active",
    city: "Gijavane",
  },
  {
    id: "CU-007",
    name: "Nikhil Chougule",
    phone: "+91 96570 77889",
    email: "nikhil.chougule@example.com",
    orders: 1,
    spent: 0,
    lastOrder: "2026-08-22",
    status: "Inactive",
    city: "Nesari",
  },
  {
    id: "CU-008",
    name: "Shraddha Naik",
    phone: "+91 82370 44556",
    email: "shraddha.naik@example.com",
    orders: 5,
    spent: 89100,
    lastOrder: "2026-08-21",
    status: "Active",
    city: "Halkarni",
  },
];

export type Review = {
  id: string;
  customer: string;
  city: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  status: "Approved" | "Pending" | "Hidden";
  product?: string;
};

export const reviews: Review[] = [
  {
    id: "RV-01",
    customer: "Anjali Patil",
    city: "Gadhinglaj",
    rating: 5,
    title: "Our entire wedding shopping in one visit",
    body: "We finished the whole wedding shopping here — bridal lehenga, sarees for both families and my brother's sherwani. The staff sat with us patiently for three hours. Six decades of experience really shows.",
    date: "2026-08-24",
    status: "Approved",
    product: "Bridal Lehenga Royale",
  },
  {
    id: "RV-02",
    customer: "Rohan Deshmukh",
    city: "Ajara",
    rating: 5,
    title: "Best sherwani range in the taluka",
    body: "Tried sherwanis in Kolhapur too, but the fit and finish here was better and the pricing was honest. Alteration was done in two days.",
    date: "2026-08-25",
    status: "Approved",
    product: "Maharaja Wedding Sherwani",
  },
  {
    id: "RV-03",
    customer: "Sneha Jadhav",
    city: "Chandgad",
    rating: 5,
    title: "Saree collection is unmatched",
    body: "Paithani, Banarasi, soft silk — the variety is huge and every piece is neatly presented. I have been buying here since my college days.",
    date: "2026-08-20",
    status: "Approved",
    product: "Royal Paithani Silk Saree",
  },
  {
    id: "RV-04",
    customer: "Pooja Kulkarni",
    city: "Gadhinglaj",
    rating: 5,
    title: "Lagna Basta done perfectly",
    body: "They understood exactly how many sets we needed for both families and packed everything gift-ready. Zero stress for us.",
    date: "2026-08-27",
    status: "Approved",
    product: "Bridal Lagna Basta Set",
  },
  {
    id: "RV-05",
    customer: "Amit Patil",
    city: "Nesari",
    rating: 4,
    title: "Kids collection is lovely",
    body: "Bombay Kids has genuinely good festive clothes for children, not the usual flashy stuff. My son's sherwani got compliments all evening.",
    date: "2026-08-27",
    status: "Approved",
    product: "Little Prince Sherwani",
  },
  {
    id: "RV-06",
    customer: "Vaishali Shinde",
    city: "Gijavane",
    rating: 5,
    title: "Family shopping destination",
    body: "Dress materials, shirting for my husband, school-time casuals for the kids — everything under one roof and the pricing suits a middle-class family.",
    date: "2026-08-28",
    status: "Pending",
  },
  {
    id: "RV-07",
    customer: "Shraddha Naik",
    city: "Halkarni",
    rating: 4,
    title: "Helpful staff, fair pricing",
    body: "Never any pressure to buy. They showed me options in three budgets and let me decide calmly.",
    date: "2026-08-21",
    status: "Approved",
  },
];

export type Banner = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  status: "Active" | "Inactive";
};

export const banners: Banner[] = [
  {
    id: "BN-01",
    title: "The Festive Edit 2026",
    subtitle: "Sarees, kurtas and dress materials for the season of celebration",
    image: bannerImages.festive,
    buttonText: "Shop Festive",
    buttonLink: "/shop",
    status: "Active",
  },
  {
    id: "BN-02",
    title: "Bridal Edit",
    subtitle: "Hand-picked lehengas and silk sarees for the bride",
    image: bannerImages.bridalEdit,
    buttonText: "View Bridal",
    buttonLink: "/wedding",
    status: "Active",
  },
  {
    id: "BN-03",
    title: "Bombay Kids Festival Days",
    subtitle: "Little styles, big smiles — up to 30% off kidswear",
    image: bannerImages.kidsFest,
    buttonText: "Shop Kids",
    buttonLink: "/kids",
    status: "Active",
  },
  {
    id: "BN-04",
    title: "Suiting & Shirting Gallery",
    subtitle: "Tailoring-ready fabrics for the groom and his family",
    image: bannerImages.suiting,
    buttonText: "Explore Fabrics",
    buttonLink: "/men",
    status: "Inactive",
  },
];

export type Coupon = {
  id: string;
  code: string;
  type: "Percent" | "Flat";
  value: number;
  minOrder: number;
  expiry: string;
  status: "Active" | "Expired";
};

export const coupons: Coupon[] = [
  { id: "CP-1", code: "BCC10", type: "Percent", value: 10, minOrder: 2999, expiry: "2026-12-31", status: "Active" },
  { id: "CP-2", code: "WEDDING15", type: "Percent", value: 15, minOrder: 19999, expiry: "2026-12-31", status: "Active" },
  { id: "CP-3", code: "FESTIVE20", type: "Percent", value: 20, minOrder: 9999, expiry: "2026-11-15", status: "Active" },
  { id: "CP-4", code: "KIDS10", type: "Flat", value: 500, minOrder: 2499, expiry: "2026-10-31", status: "Active" },
];

export const homepageContent = {
  announcement:
    "Celebrating 60+ Years of Trust | Premium Wedding & Ethnic Wear | Serving Gadhinglaj, Ajara & Chandgad",
  heroHeading: "Six Decades of Trust. A Lifetime of Style.",
  heroSubtitle:
    "Discover premium sarees, bridal wear, ethnic fashion and family collections crafted for every celebration.",
  heroBadge: "Trusted Since 1965",
  heritageHeading: "A Legacy Woven Since 1965",
  heritageBody:
    "Bombay Cloth Center began in 1965 as a small fabric counter in Bazar Peth, Gadhinglaj. Three generations later, we remain a family-run showroom trusted across Gadhinglaj, Ajara and Chandgad talukas for weddings, festivals and everyday family fashion.",
  weddingHeading: "Weddings, Handled With Care",
  weddingBody:
    "From the bride's trousseau to the groom's sherwani and every relative in between — plan your entire wedding shopping with our team.",
  kidsHeading: "Bombay Kids",
  kidsBody: "Little Styles. Big Smiles.",
  lagnaBastaHeading: "The Signature Lagna Basta Collection",
  lagnaBastaBody:
    "Celebrate Maharashtra's wedding traditions with carefully curated Lagna Basta collections for your family and loved ones.",
  featuredCategories: [
    "sarees",
    "lehengas",
    "sherwanis",
    "lagna-basta",
  ],
  promoImage: sectionImages.storeVisit,
};

export const trustBadges = [
  { title: "Since 1965", detail: "Six decades in Bazar Peth" },
  { title: "Premium Collections", detail: "Hand-picked every season" },
  { title: "Family Shopping Destination", detail: "Women, men & kids" },
  { title: "Wedding Specialists", detail: "Lagna Basta experts" },
  { title: "Affordable Pricing", detail: "Honest, transparent rates" },
];

export const dashboardStats = () => {
  const totalSales = orders
    .filter((o) => o.status !== "Cancelled")
    .reduce((sum, o) => sum + o.amount, 0);
  return {
    totalSales,
    totalOrders: orders.length,
    totalProducts: products.length,
    totalCustomers: customers.length,
    pendingOrders: orders.filter((o) => o.status === "Pending").length,
    deliveredOrders: orders.filter((o) => o.status === "Delivered").length,
    lowStock: products.filter((p) => p.stock <= 6).length,
    wishlistCount: 214,
  };
};

export const salesByMonth = [
  { month: "Mar", value: 420000 },
  { month: "Apr", value: 515000 },
  { month: "May", value: 690000 },
  { month: "Jun", value: 480000 },
  { month: "Jul", value: 610000 },
  { month: "Aug", value: 845000 },
];

export const timeline = [
  { year: "1965", title: "Foundation", body: "A single fabric counter opens in Main Bazar Peth, Gadhinglaj." },
  { year: "1975", title: "Community Trust", body: "Word of mouth makes us the taluka's go-to store for wedding textiles." },
  { year: "1990", title: "Expanded Collections", body: "Sarees, suiting, shirting and dress materials come under one roof." },
  { year: "2000", title: "Multi-Generation Growth", body: "The second generation joins and the showroom doubles in size." },
  { year: "2010", title: "Modern Retail Experience", body: "Organised departments, trial rooms and seasonal buying calendars." },
  { year: "Today", title: "Heritage Meets Contemporary Fashion", body: "Bridal, Lagna Basta and Bombay Kids serve three generations of families." },
];
