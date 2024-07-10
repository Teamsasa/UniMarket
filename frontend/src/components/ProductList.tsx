import React from "react";
import ProductItem from "./ProductItem";
import { Product } from "../types";

const products: Product[] = [
  {
    id: 1,
    name: "Product 1",
    image: require("./images/product1.jpeg").default,
    price: 1000,
    description: "Description 1",
  },
  {
    id: 2,
    name: "Product 2",
    image: require("./images/product2.jpg").default,
    price: 2000,
    description: "Description 2",
  },
  {
    id: 3,
    name: "Product 3",
    image: require("./images/product3.jpg").default,
    price: 3000,
    description: "Description 3",
  },
  {
    id: 4,
    name: "Product 4",
    image: require("./images/product4.jpg").default,
    price: 4000,
    description: "Description 4",
  },
  {
    id: 5,
    name: "Product 5",
    image: require("./images/product5.jpg").default,
    price: 5000,
    description: "Description 5",
  },
];

type ProductListProps = {
  onProductClick: (product: Product) => void;
};

const ProductList: React.FC<ProductListProps> = ({ onProductClick }) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          onClick={() => onProductClick(product)}
        />
      ))}
    </div>
  );
};

export default ProductList;
