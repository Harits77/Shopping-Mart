import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useProductStore from "../store/UseProductStore";

const Dashboard = () => {
  const {
    products,
    loading,
    error,
    fetchProducts,
    addToCart,
    selectProduct,
    cart,
  } = useProductStore();
  const navigate = useNavigate();
  const [category, setCategory] = useState("all");

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <p className="text-slate-200 text-lg animate-pulse">
          Loading products...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <p className="text-red-400 text-lg">Error: {error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-800 sticky top-0 z-10 bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
          <h1 className="text-lg sm:text-2xl font-bold tracking-tight">
            Shopping <span className="text-emerald-400">Mart</span>
          </h1>
          <button
            onClick={() => navigate("/cart")}
            className="relative rounded-full bg-slate-800 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium hover:bg-slate-700 transition"
          >
            Cart
            <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-xs text-slate-950">
              {cart.reduce((s, i) => s + i.quantity, 0)}
            </span>
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold tracking-tight">
              Products
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Browse all items here
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 sm:py-1.5 text-sm text-slate-100 hover:bg-slate-800 transition"
            >
              <option value="all">All categories</option>
              {Array.from(new Set(products.map((p) => p.category))).map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <button
              onClick={fetchProducts}
              className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 sm:py-1.5 text-sm text-slate-100 hover:bg-slate-800 transition"
            >
              Refresh
            </button>
          </div>
        </div>

        {/* Product grid */}
        <div className="grid gap-4 sm:gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {products
            .filter((p) =>
              category === "all" ? true : p.category === category
            )
            .map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  selectProduct(product.id);
                  navigate(`/product/${product.id}`);
                }}
                className="group cursor-pointer flex flex-col rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-sm hover:-translate-y-1 hover:shadow-lg hover:border-emerald-500/60 transition"
              >
                <div className="flex items-center justify-center mb-4 h-40 overflow-hidden rounded-xl bg-slate-900">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="max-h-36 object-contain group-hover:scale-105 transition"
                  />
                </div>

                <h4 className="text-sm font-medium line-clamp-2 mb-2">
                  {product.title}
                </h4>

                <p className="text-xs text-emerald-400 mb-2">
                  {product.category}
                </p>

                <p className="text-base font-semibold mb-4">
                  ₹{(product.price * 80).toFixed(0)}
                </p>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                  className="mt-auto w-full rounded-xl bg-emerald-500 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition"
                >
                  Add to Cart
                </button>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
