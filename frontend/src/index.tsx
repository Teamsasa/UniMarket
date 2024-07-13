import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "@components/Header";
import ProductList from "@components/ProductList";
import ProductDetail from "@components/ProductDetail";
import Login from "@components/Login";
import Register from "@components/Register";
import { Product } from "./types";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App: React.FC = () => {
  console.log("App component rendered");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ProductList onProductClick={setSelectedProduct} />} />
        <Route path="/product/:productId" element={<ProductDetail product={selectedProduct} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

const container = document.getElementById("root");
if (container) {
  console.log("Container found");
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Container not found");
}
