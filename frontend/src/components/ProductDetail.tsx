import React from "react";
import { useParams } from "react-router-dom";
import { Product } from "../types";
import Chat from "./Chat";

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
      {/* チャットコンポーネントを追加 */}
      <Chat />
    </div>
  );
};


export default ProductDetail;
