import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../types";
import Chat from "./Chat";

type ProductDetailProps = {
  product: Product | null;
};

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const [purchased, setPurchased] = useState(false);

  if (!product) {
    return <div>Product not found</div>;
  }

  const handlePurchase = () => {
    setPurchased(true);
  };

  return (
    <div className="product-detail">
      <div className="product-content">
        <div className="product-info" style={{ backgroundColor: purchased ? 'red' : 'initial' }}>
          <h1>{product.name}</h1>
          <img className="product-image" src={product.image} alt={product.name} />
          <h3 className="product-price">¥{product.price.toLocaleString()}</h3>
          <p className="product-description">{product.description}</p>
        </div>
        <div className="purchase-section">
          {purchased ? (
            <div className="purchased-overlay">購入済み</div>
          ) : (
            <button className="purchase-button" onClick={handlePurchase}>購入</button>
          )}
        </div>
      </div>
      <Chat />
    </div>
  );
};

export default ProductDetail;
