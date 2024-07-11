import React from "react";
import { useParams } from "react-router-dom";
import { Product } from "../types";

type ProductDetailProps = {
  product: Product | null;
};

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const { productId } = useParams<{ productId: string }>();

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-detail">
      <h1>{product.name}</h1>
      <img className="product-image" src={product.image} alt={product.name} />
      <p>価格: ¥{product.price}</p>
      <p>{product.description}</p>
      {/* 出品者情報とトーク画面をここに追加 */}
    </div>
  );
};

export default ProductDetail;
