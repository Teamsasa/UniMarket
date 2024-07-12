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
      <div className="product-info">
        <h1>{product.name}</h1>
        <span className="product-content">
          <img className="product-image" src={product.image} alt={product.name} />
          <span className="purchase-section">
            <button className="purchase-button">購入</button>
            <Chat />
          </span>
        </span>
        <p>価格: ¥{product.price}</p>
        <p>{product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
