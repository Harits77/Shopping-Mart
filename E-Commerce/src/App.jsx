import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./Pages/Product";
import Dashboard from "./Pages/Dashboard";
import Cart from "./Pages/Cart";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
