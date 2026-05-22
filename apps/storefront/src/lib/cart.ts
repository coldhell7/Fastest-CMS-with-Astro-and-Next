export type CartItem = {
  slug: string;
  name: string;
  image: string;
  priceToman: number;
  originalPriceToman?: number | null;
  quantity: number;
};

const STORAGE_KEY = "medalino_cart";

export function getCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as CartItem[];
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function addToCart(item: Omit<CartItem, "quantity">): void {
  const cart = getCart();
  const existing = cart.find((i) => i.slug === item.slug);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  saveCart(cart);
}

export function removeFromCart(slug: string): void {
  saveCart(getCart().filter((i) => i.slug !== slug));
}

export function updateQuantity(slug: string, quantity: number): void {
  if (quantity <= 0) return removeFromCart(slug);
  const cart = getCart();
  const item = cart.find((i) => i.slug === slug);
  if (item) item.quantity = quantity;
  saveCart(cart);
}

export function getCartCount(): number {
  return getCart().reduce((sum, i) => sum + i.quantity, 0);
}

export function getCartTotal(): number {
  return getCart().reduce((sum, i) => sum + i.priceToman * i.quantity, 0);
}

export function clearCart(): void {
  localStorage.removeItem(STORAGE_KEY);
}
