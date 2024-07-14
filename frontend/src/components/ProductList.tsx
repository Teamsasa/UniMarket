import React, { useState, useEffect } from "react";
import ProductItem from "./ProductItem";
import { Product } from "../types";
import { useNavigate } from "react-router-dom";

import { api_url } from "../index";

type ProductListProps = {
  onProductClick: (product: Product) => void;
};

const ProductList: React.FC<ProductListProps> = ({ onProductClick }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch( api_url + "/getProducts/", {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleProductClick = (product: Product) => {
    onProductClick(product);
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          onClick={() => handleProductClick(product)}
        />
      ))}
    </div>
  );
};

export default ProductList;
