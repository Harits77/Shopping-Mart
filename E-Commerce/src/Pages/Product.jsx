import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useProductStore from "../store/UseProductStore";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedProduct, selectProduct, loading, addToCart } =
    useProductStore();

  useEffect(() => {
    if (!selectedProduct || String(selectedProduct.id) !== String(id)) {
      selectProduct(id);
    }
  }, [id]);

  if (loading || !selectedProduct)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <p className="text-slate-200 text-lg animate-pulse">
          Loading product...
        </p>
      </div>
    );

  const p = selectedProduct;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-3 sm:p-6">
      <div className="max-w-4xl mx-auto bg-slate-900/60 rounded-2xl p-4 sm:p-6">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-sm text-emerald-400 hover:text-emerald-300"
        >
          ← Back
        </button>

        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-center bg-slate-900 p-4 rounded-lg h-64 sm:h-80">
            <img
              src={p.image}
              alt={p.title}
              className="max-h-full max-w-full object-contain"
            />
          </div>

          <div>
            <h1 className="text-xl sm:text-2xl font-bold mb-2">{p.title}</h1>
            <p className="text-xs sm:text-sm text-emerald-400 mb-4">
              {p.category}
            </p>
            <p className="text-sm sm:text-base text-slate-300 mb-4 leading-relaxed">
              {p.description}
            </p>
            <p className="text-lg sm:text-xl font-semibold mb-6">
              ₹{(p.price * 80).toFixed(0)}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
              <button
                onClick={() => addToCart(p)}
                className="rounded-xl bg-emerald-500 py-3 sm:py-2 px-4 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition"
              >
                Add to Cart
              </button>

              <button
                onClick={() => navigate("/cart")}
                className="rounded-xl border border-slate-700 py-3 sm:py-2 px-4 text-sm hover:bg-slate-800 transition"
              >
                Go to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
