import { create } from "zustand";
import axios from "axios";

const CART_KEY = "fake_store_cart_v1";

const loadCart = () => {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
};

const saveCart = (cart) => {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (e) {
    console.error("Error saving cart to localStorage:", e);
  }
};

const useProductStore = create((set, get) => ({
  products: [],
  loading: false,
  error: null,
  selectedProduct: null,
  cart: loadCart(),

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get("https://fakestoreapi.com/products");
      set({ products: res.data, loading: false });
    } catch (err) {
      console.error("Error fetching products:", err);
      set({ error: "Failed to load products", loading: false });
    }
  },

  selectProduct: async (id) => {
    set({ loading: true, error: null });
    try {
      const existing = get().products.find((p) => String(p.id) === String(id));
      if (existing) {
        set({ selectedProduct: existing, loading: false });
        return existing;
      }
      const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
      set({ selectedProduct: res.data, loading: false });
      return res.data;
    } catch (err) {
      console.error("Error fetching product:", err);
      set({ error: "Failed to load product", loading: false });
      return null;
    }
  },

  addToCart: (product) => {
    const cart = get().cart.slice();
    const idx = cart.findIndex(
      (i) => String(i.product.id) === String(product.id)
    );
    if (idx > -1) {
      cart[idx] = { ...cart[idx], quantity: cart[idx].quantity + 1 };
    } else {
      cart.push({ product, quantity: 1 });
    }
    set({ cart });
    saveCart(cart);
  },

  removeFromCart: (productId) => {
    let cart = get().cart.slice();
    cart = cart.filter((i) => String(i.product.id) !== String(productId));
    set({ cart });
    saveCart(cart);
  },

  updateQuantity: (productId, quantity) => {
    const cart = get().cart.slice();
    const idx = cart.findIndex(
      (i) => String(i.product.id) === String(productId)
    );
    if (idx > -1) {
      if (quantity <= 0) {
        cart.splice(idx, 1);
      } else {
        cart[idx] = { ...cart[idx], quantity };
      }
    }
    set({ cart });
    saveCart(cart);
  },
}));

export default useProductStore;
