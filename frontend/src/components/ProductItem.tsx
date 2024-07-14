import React from "react";
import { Product } from "../types";

type ProductItemProps = {
  product: Product;
  onClick: () => void;
};

const ProductItem: React.FC<ProductItemProps> = ({ product, onClick }) => {
    return (
      <div className="product-item" onClick={onClick}>
        <img src={`http://localhost:8080/getImages/${product.id}`} alt={product.name} />
        <div className="product-info">
          <div className="product-name">{product.name}</div>
          <div className="product-price">¥{product.price.toLocaleString()}</div>
        </div>
      </div>
    );
  };

export default ProductItem;