import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Header from '@components/Header';
import ProductList from '@components/ProductList';
import ProductDetail from '@components/ProductDetail';
import { Product } from './types';

const App: React.FC = () => {
  console.log('App component rendered');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div className="App">
      <Header />
      {selectedProduct ? (
        <ProductDetail product={selectedProduct} />
      ) : (
        <ProductList onProductClick={setSelectedProduct} />
      )}
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  console.log('Container found');
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('Container not found');
}
