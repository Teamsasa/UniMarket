import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "@components/Header";
import ProductList from "@components/ProductList";
import ProductDetail from "@components/ProductDetail";
import { Product } from "./types";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App: React.FC = () => {
  console.log("App component rendered");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <Router>
      <Header />
      <Routes>
       {selectedProduct ? (
          <Route path="/" element={<ProductDetail product={selectedProduct} />} />
        ) : (
          <Route path="/" element={<ProductList onProductClick={setSelectedProduct} />} />
        )}
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
