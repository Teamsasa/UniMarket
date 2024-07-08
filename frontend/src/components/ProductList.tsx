import React from "react";
import ProductItem from "./ProductItem";
import { Product } from "../types";

const products: Product[] = [
  {
    id: 1,
    name: "Product 1",
    image:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcocreco.kodansha.co.jp%2Fcocreco%2Fgeneral%2Flife%2FgRUhC&psig=AOvVaw3oUgDWLm18BlBNIAK-j0Gn&ust=1720496863653000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJit4rrElocDFQAAAAAdAAAAABAE",
    price: 1000,
    description: "Description 1",
  },
  {
    id: 2,
    name: "Product 2",
    image: "url2",
    price: 2000,
    description: "Description 2",
  },
  // 追加の商品データ
];

type ProductListProps = {
  onProductClick: (product: Product) => void;
};

const ProductList: React.FC<ProductListProps> = ({ onProductClick }) => {
  console.log("ProductList render");
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
