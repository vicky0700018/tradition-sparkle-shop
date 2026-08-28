import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products as seedProducts, type Product } from "../data/products";
import { categories as seedCategories, type Category } from "../data/categories";
import {
  banners as seedBanners,
  business as seedBusiness,
  coupons as seedCoupons,
  customers as seedCustomers,
  homepageContent as seedHomepage,
  orders as seedOrders,
  reviews as seedReviews,
  type Banner,
  type Coupon,
  type Customer,
  type Order,
  type OrderStatus,
  type Review,
} from "../data/mock";

export type CartLine = {
  productId: string;
  size: string;
  color: string;
  qty: number;
};

export type PlacedOrder = Order & {
  email?: string;
  estimatedDelivery: string;
};

type Toast = { id: number; message: string; tone: "success" | "info" | "error" };

type StoreValue = {
  products: Product[];
  categories: Category[];
  orders: Order[];
  customers: Customer[];
  reviews: Review[];
  banners: Banner[];
  coupons: Coupon[];
  settings: typeof seedBusiness;
  homepage: typeof seedHomepage;
  cart: CartLine[];
  wishlist: string[];
  adminLoggedIn: boolean;
  lastOrder: PlacedOrder | null;
  toasts: Toast[];
  // cart
  addToCart: (productId: string, size?: string, color?: string, qty?: number) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  setQty: (productId: string, size: string, color: string, qty: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  // wishlist
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  moveToCart: (productId: string) => void;
  // orders
  placeOrder: (order: PlacedOrder) => void;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  // admin crud
  login: (email: string, password: string, remember: boolean) => boolean;
  logout: () => void;
  saveProduct: (product: Product) => { ok: boolean; error?: string };
  deleteProduct: (id: string) => void;
  saveCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
  moveCategory: (id: string, direction: -1 | 1) => void;
  updateStock: (id: string, stock: number) => void;
  saveCoupon: (coupon: Coupon) => void;
  deleteCoupon: (id: string) => void;
  saveBanner: (banner: Banner) => void;
  deleteBanner: (id: string) => void;
  setReviewStatus: (id: string, status: Review["status"]) => void;
  deleteReview: (id: string) => void;
  updateHomepage: (patch: Partial<typeof seedHomepage>) => void;
  updateSettings: (patch: Partial<typeof seedBusiness>) => void;
  notify: (message: string, tone?: Toast["tone"]) => void;
  getProduct: (id: string) => Product | undefined;
};

const StoreContext = createContext<StoreValue | null>(null);

const KEY = "bcc-store-v1";

type Persisted = {
  products?: Product[];
  categories?: Category[];
  orders?: Order[];
  reviews?: Review[];
  banners?: Banner[];
  coupons?: Coupon[];
  settings?: typeof seedBusiness;
  homepage?: typeof seedHomepage;
  cart?: CartLine[];
  wishlist?: string[];
  adminLoggedIn?: boolean;
  lastOrder?: PlacedOrder | null;
};

const readPersisted = (): Persisted => {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(KEY) ?? "{}") as Persisted;
  } catch {
    return {};
  }
};

export function StoreProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [products, setProducts] = useState<Product[]>(seedProducts);
  const [categories, setCategories] = useState<Category[]>(seedCategories);
  const [orders, setOrders] = useState<Order[]>(seedOrders);
  const [customers] = useState<Customer[]>(seedCustomers);
  const [reviews, setReviews] = useState<Review[]>(seedReviews);
  const [banners, setBanners] = useState<Banner[]>(seedBanners);
  const [coupons, setCoupons] = useState<Coupon[]>(seedCoupons);
  const [settings, setSettings] = useState(seedBusiness);
  const [homepage, setHomepage] = useState(seedHomepage);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [lastOrder, setLastOrder] = useState<PlacedOrder | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Hydrate from localStorage after mount (avoids SSR mismatch).
  useEffect(() => {
    const saved = readPersisted();
    if (saved.products?.length) setProducts(saved.products);
    if (saved.categories?.length) setCategories(saved.categories);
    if (saved.orders?.length) setOrders(saved.orders);
    if (saved.reviews?.length) setReviews(saved.reviews);
    if (saved.banners?.length) setBanners(saved.banners);
    if (saved.coupons?.length) setCoupons(saved.coupons);
    if (saved.settings) setSettings(saved.settings);
    if (saved.homepage) setHomepage(saved.homepage);
    if (saved.cart) setCart(saved.cart);
    if (saved.wishlist) setWishlist(saved.wishlist);
    if (saved.adminLoggedIn) setAdminLoggedIn(true);
    if (saved.lastOrder) setLastOrder(saved.lastOrder);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const payload: Persisted = {
      products,
      categories,
      orders,
      reviews,
      banners,
      coupons,
      settings,
      homepage,
      cart,
      wishlist,
      adminLoggedIn,
      lastOrder,
    };
    try {
      window.localStorage.setItem(KEY, JSON.stringify(payload));
    } catch {
      /* quota — ignore in demo */
    }
  }, [
    hydrated,
    products,
    categories,
    orders,
    reviews,
    banners,
    coupons,
    settings,
    homepage,
    cart,
    wishlist,
    adminLoggedIn,
    lastOrder,
  ]);

  const notify = useCallback((message: string, tone: Toast["tone"] = "success") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, tone }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2600);
  }, []);

  const getProduct = useCallback(
    (id: string) => products.find((p) => p.id === id || p.slug === id),
    [products],
  );

  const addToCart: StoreValue["addToCart"] = useCallback(
    (productId, size, color, qty = 1) => {
      const product = products.find((p) => p.id === productId);
      if (!product) return;
      const chosenSize = size ?? product.sizes[0] ?? "Free Size";
      const chosenColor = color ?? product.colors[0] ?? "As Shown";
      setCart((prev) => {
        const idx = prev.findIndex(
          (l) =>
            l.productId === productId &&
            l.size === chosenSize &&
            l.color === chosenColor,
        );
        if (idx >= 0) {
          const next = [...prev];
          const line = next[idx]!;
          next[idx] = { ...line, qty: line.qty + qty };
          return next;
        }
        return [...prev, { productId, size: chosenSize, color: chosenColor, qty }];
      });
      notify(`${product.name} added to cart`);
    },
    [products, notify],
  );

  const removeFromCart: StoreValue["removeFromCart"] = useCallback(
    (productId, size, color) => {
      setCart((prev) =>
        prev.filter(
          (l) => !(l.productId === productId && l.size === size && l.color === color),
        ),
      );
      notify("Removed from cart", "info");
    },
    [notify],
  );

  const setQty: StoreValue["setQty"] = useCallback((productId, size, color, qty) => {
    setCart((prev) =>
      prev
        .map((l) =>
          l.productId === productId && l.size === size && l.color === color
            ? { ...l, qty: Math.max(1, qty) }
            : l,
        )
        .filter((l) => l.qty > 0),
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist: StoreValue["toggleWishlist"] = useCallback(
    (productId) => {
      setWishlist((prev) => {
        if (prev.includes(productId)) {
          notify("Removed from wishlist", "info");
          return prev.filter((id) => id !== productId);
        }
        notify("Saved to wishlist");
        return [...prev, productId];
      });
    },
    [notify],
  );

  const isWishlisted = useCallback(
    (productId: string) => wishlist.includes(productId),
    [wishlist],
  );

  const moveToCart: StoreValue["moveToCart"] = useCallback(
    (productId) => {
      addToCart(productId);
      setWishlist((prev) => prev.filter((id) => id !== productId));
    },
    [addToCart],
  );

  const placeOrder: StoreValue["placeOrder"] = useCallback((order) => {
    setOrders((prev) => [order, ...prev]);
    setLastOrder(order);
    setCart([]);
  }, []);

  const updateOrderStatus: StoreValue["updateOrderStatus"] = useCallback(
    (id, status) => {
      setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
      notify(`Order ${id} marked ${status}`);
    },
    [notify],
  );

  const login: StoreValue["login"] = useCallback(
    (email, password, remember) => {
      const ok =
        email.trim().toLowerCase() === "admin@bombayclothcenter.com" &&
        password === "admin123";
      if (ok) {
        setAdminLoggedIn(true);
        if (!remember && typeof window !== "undefined") {
          window.sessionStorage.setItem("bcc-session-only", "1");
        }
        notify("Welcome back, admin");
      } else {
        notify("Invalid credentials", "error");
      }
      return ok;
    },
    [notify],
  );

  const logout = useCallback(() => {
    setAdminLoggedIn(false);
    notify("Signed out", "info");
  }, [notify]);

  const saveProduct: StoreValue["saveProduct"] = useCallback(
    (product) => {
      let error: string | undefined;
      setProducts((prev) => {
        const duplicate = prev.some(
          (p) =>
            p.id !== product.id &&
            (p.sku.toLowerCase() === product.sku.toLowerCase() ||
              p.name.trim().toLowerCase() === product.name.trim().toLowerCase()),
        );
        if (duplicate) {
          error = "A product with this name or SKU already exists.";
          return prev;
        }
        const exists = prev.some((p) => p.id === product.id);
        return exists
          ? prev.map((p) => (p.id === product.id ? product : p))
          : [product, ...prev];
      });
      if (error) {
        notify(error, "error");
        return { ok: false, error };
      }
      notify(`${product.name} saved`);
      return { ok: true };
    },
    [notify],
  );

  const deleteProduct: StoreValue["deleteProduct"] = useCallback(
    (id) => {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      notify("Product deleted", "info");
    },
    [notify],
  );

  const saveCategory: StoreValue["saveCategory"] = useCallback(
    (category) => {
      setCategories((prev) =>
        prev.some((c) => c.id === category.id)
          ? prev.map((c) => (c.id === category.id ? category : c))
          : [...prev, category],
      );
      notify(`Category "${category.name}" saved`);
    },
    [notify],
  );

  const deleteCategory: StoreValue["deleteCategory"] = useCallback(
    (id) => {
      setCategories((prev) => prev.filter((c) => c.id !== id));
      notify("Category deleted", "info");
    },
    [notify],
  );

  const moveCategory: StoreValue["moveCategory"] = useCallback((id, direction) => {
    setCategories((prev) => {
      const sorted = [...prev].sort((a, b) => a.order - b.order);
      const idx = sorted.findIndex((c) => c.id === id);
      const target = idx + direction;
      if (idx < 0 || target < 0 || target >= sorted.length) return prev;
      const swapped = [...sorted];
      [swapped[idx], swapped[target]] = [swapped[target]!, swapped[idx]!];
      return swapped.map((c, i) => ({ ...c, order: i + 1 }));
    });
  }, []);

  const updateStock: StoreValue["updateStock"] = useCallback(
    (id, stock) => {
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, stock: Math.max(0, stock) } : p)),
      );
      notify("Stock updated");
    },
    [notify],
  );

  const saveCoupon: StoreValue["saveCoupon"] = useCallback(
    (coupon) => {
      setCoupons((prev) =>
        prev.some((c) => c.id === coupon.id)
          ? prev.map((c) => (c.id === coupon.id ? coupon : c))
          : [...prev, coupon],
      );
      notify(`Coupon ${coupon.code} saved`);
    },
    [notify],
  );

  const deleteCoupon: StoreValue["deleteCoupon"] = useCallback(
    (id) => {
      setCoupons((prev) => prev.filter((c) => c.id !== id));
      notify("Coupon deleted", "info");
    },
    [notify],
  );

  const saveBanner: StoreValue["saveBanner"] = useCallback(
    (banner) => {
      setBanners((prev) =>
        prev.some((b) => b.id === banner.id)
          ? prev.map((b) => (b.id === banner.id ? banner : b))
          : [...prev, banner],
      );
      notify(`Banner "${banner.title}" saved`);
    },
    [notify],
  );

  const deleteBanner: StoreValue["deleteBanner"] = useCallback(
    (id) => {
      setBanners((prev) => prev.filter((b) => b.id !== id));
      notify("Banner deleted", "info");
    },
    [notify],
  );

  const setReviewStatus: StoreValue["setReviewStatus"] = useCallback(
    (id, status) => {
      setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
      notify(`Review ${status.toLowerCase()}`);
    },
    [notify],
  );

  const deleteReview: StoreValue["deleteReview"] = useCallback(
    (id) => {
      setReviews((prev) => prev.filter((r) => r.id !== id));
      notify("Review deleted", "info");
    },
    [notify],
  );

  const updateHomepage: StoreValue["updateHomepage"] = useCallback(
    (patch) => {
      setHomepage((prev) => ({ ...prev, ...patch }));
      notify("Homepage content updated");
    },
    [notify],
  );

  const updateSettings: StoreValue["updateSettings"] = useCallback(
    (patch) => {
      setSettings((prev) => ({ ...prev, ...patch }));
      notify("Settings saved");
    },
    [notify],
  );

  const cartCount = cart.reduce((sum, l) => sum + l.qty, 0);
  const cartSubtotal = cart.reduce((sum, l) => {
    const product = products.find((p) => p.id === l.productId);
    return sum + (product ? product.price * l.qty : 0);
  }, 0);

  const value = useMemo<StoreValue>(
    () => ({
      products,
      categories,
      orders,
      customers,
      reviews,
      banners,
      coupons,
      settings,
      homepage,
      cart,
      wishlist,
      adminLoggedIn,
      lastOrder,
      toasts,
      addToCart,
      removeFromCart,
      setQty,
      clearCart,
      cartCount,
      cartSubtotal,
      toggleWishlist,
      isWishlisted,
      moveToCart,
      placeOrder,
      updateOrderStatus,
      login,
      logout,
      saveProduct,
      deleteProduct,
      saveCategory,
      deleteCategory,
      moveCategory,
      updateStock,
      saveCoupon,
      deleteCoupon,
      saveBanner,
      deleteBanner,
      setReviewStatus,
      deleteReview,
      updateHomepage,
      updateSettings,
      notify,
      getProduct,
    }),
    [
      products,
      categories,
      orders,
      customers,
      reviews,
      banners,
      coupons,
      settings,
      homepage,
      cart,
      wishlist,
      adminLoggedIn,
      lastOrder,
      toasts,
      addToCart,
      removeFromCart,
      setQty,
      clearCart,
      cartCount,
      cartSubtotal,
      toggleWishlist,
      isWishlisted,
      moveToCart,
      placeOrder,
      updateOrderStatus,
      login,
      logout,
      saveProduct,
      deleteProduct,
      saveCategory,
      deleteCategory,
      moveCategory,
      updateStock,
      saveCoupon,
      deleteCoupon,
      saveBanner,
      deleteBanner,
      setReviewStatus,
      deleteReview,
      updateHomepage,
      updateSettings,
      notify,
      getProduct,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
