import React from "react";
import useProductStore from "../store/UseProductStore";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useProductStore();
  const navigate = useNavigate();

  const total = cart.reduce((s, i) => s + i.product.price * i.quantity, 0);

  if (!cart || cart.length === 0)
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
        <div className="text-center">
          <p className="mb-4">Your cart is empty.</p>
          <button
            onClick={() => navigate("/")}
            className="rounded-lg bg-emerald-500 px-4 py-2"
          >
            Back to shop
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-3 sm:p-6">
      <div className="max-w-4xl mx-auto bg-slate-900/60 rounded-2xl p-4 sm:p-6">
        <button
          onClick={() => navigate("/")}
          className="mb-4 text-sm text-emerald-400 hover:text-emerald-300"
        >
          ← Back to shop
        </button>
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Your Cart</h2>

        <ul className="space-y-3 sm:space-y-4 mb-6">
          {cart.map((item) => (
            <li
              key={item.product.id}
              className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 sm:justify-between p-3 sm:p-4 bg-slate-800/50 rounded-lg"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <img
                  src={item.product.image}
                  alt={item.product.title}
                  className="h-14 w-14 sm:h-16 sm:w-16 object-contain bg-slate-700 p-2 rounded shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium line-clamp-2">
                    {item.product.title}
                  </div>
                  <div className="text-xs text-slate-400">
                    Price: ₹{(item.product.price * 80).toFixed(0)}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity - 1)
                    }
                    className="rounded bg-slate-700 px-2 py-1 text-sm hover:bg-slate-600"
                  >
                    −
                  </button>
                  <div className="w-6 text-center text-sm font-medium">
                    {item.quantity}
                  </div>
                  <button
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity + 1)
                    }
                    className="rounded bg-slate-700 px-2 py-1 text-sm hover:bg-slate-600"
                  >
                    +
                  </button>
                </div>

                <div className="text-sm sm:text-base font-semibold w-20 sm:w-24 text-right">
                  ₹{(item.product.price * 80 * item.quantity).toFixed(0)}
                </div>

                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="text-xs sm:text-sm text-red-400 hover:text-red-300 whitespace-nowrap"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
          <div className="text-base sm:text-lg font-semibold">Total</div>
          <div className="text-lg sm:text-xl font-bold">
            ₹{(total * 80).toFixed(0)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
