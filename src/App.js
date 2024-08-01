// OrderProducts.jsx
import React, { useState } from 'react';
import OrderDetails from './components/OrderDetails';
import ProductGrid from './components/ProductGrid';

const OrderProducts = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [quantities, setQuantities] = useState({});

  const handleProductSelect = (product) => {
    setSelectedProducts((prevProducts) => {
      const productExists = prevProducts.find(p => p.id === product.id);
      if (productExists) {
        return prevProducts;
      } else {
        return [...prevProducts, product];
      }
    });
    
    setQuantities((prevQuantities) => ({
      isQuantity: true,
      ...prevQuantities,
      [product.id]: (prevQuantities[product.id] || 0) + 1
    }));
  };

  const handleQuantityChange = (productId, quantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: quantity
    }));
  };

  const handlePriceChange = (productId, price) => {
      const updatedProducts = selectedProducts.map(product =>
          product.id === productId ? { ...product, price: parseFloat(price) } : product
      );
      setSelectedProducts(updatedProducts);
  };

  const handleDeleteProduct = (productId) => {
      const updatedProducts = selectedProducts.map(product => {
          if (product.id === productId) {
              const updatedQuantity = quantities[productId] - 1;
              if (updatedQuantity > 0) {
                  return { ...product, quantity: updatedQuantity };
              } else {
                  return null; // Mark for removal
              }
          }
          return product;
      }).filter(product => product !== null); // Remove products marked for removal
  
      setSelectedProducts(updatedProducts);
  
      // Update quantities state
      const updatedQuantities = { ...quantities };
      if (updatedQuantities[productId] > 1) {
          updatedQuantities[productId] -= 1;
      } else {
          delete updatedQuantities[productId]; 
      }
      setQuantities(updatedQuantities);
  };

  return (
    <div className="flex flex-col md:flex-row max-h-screen overflow-hidden">
      <div className="w-full md:w-2/3 bg-gray-100 p-4">
        <ProductGrid onProductSelect={handleProductSelect} />
      </div>
      <div className="w-full md:w-1/3 bg-gray-200 p-4">
        <OrderDetails
          selectedProducts={selectedProducts}
          quantities={quantities}
          onQuantityChange={handleQuantityChange}
          onPriceChange={handlePriceChange}
          onDeleteProduct={handleDeleteProduct}
          placeOrder={handleDeleteProduct}
        />
      </div>
    </div>
  );
};

export default OrderProducts;
