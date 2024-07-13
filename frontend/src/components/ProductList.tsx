import React from "react";
import ProductItem from "./ProductItem";
import { Product } from "../types";
import { useNavigate } from "react-router-dom";

const products: Product[] = [
  {
    id: 1,
    name: "物理学科 環境保全 過去レポート",
    image: require("./images/product1.jpeg").default,
    price: 500,
    description: "第12回授業においての過去レポートの書き方の授業資料です。実際の過去レポートもあります。",
  },
  {
    id: 2,
    name: "化学科 化学A 期末テスト",
    image: require("./images/product2.jpg").default,
    price: 700,
    description: "美齊津先生の前期期末テストの問題と解答です。\n字が書いてあり汚いので、少しであれば値下げの対応も可能です。",
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
  const navigate = useNavigate();

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
