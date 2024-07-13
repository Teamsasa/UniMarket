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
      <div className="product-content">
        <div className="product-info">
          <h1>{product.name}</h1>
          <img className="product-image" src={product.image} alt={product.name} />
          <h3 className="product-price">¥{product.price.toLocaleString()}</h3>
          <p className="product-description">{product.description}</p>
        </div>
        <div className="purchase-section">
          <button className="purchase-button">購入</button>
        </div>
      </div>
      <Chat />
    </div>
  );
};

export default ProductDetail;