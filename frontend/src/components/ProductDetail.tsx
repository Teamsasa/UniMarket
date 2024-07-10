import React from "react";
import { Product } from "../types";

type ProductDetailProps = {
  product: Product | null;
};

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  if (!product) {
    return <div>商品が見つかりません。</div>;
  }
  return (
    <div className="product-detail">
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} />
      <p>価格: ¥{product.price}</p>
      <p>{product.description}</p>
      {/* 出品者情報とトーク画面をここに追加 */}
    </div>
  );
};

export default ProductDetail;
