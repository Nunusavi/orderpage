import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';


const OrderDetails = ({ selectedProducts, quantities, onQuantityChange, onPriceChange, onDeleteProduct, placeOrder }) => {
    const [selectedAction, setSelectedAction] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);


    const handleQuantityChange = (productId, qty) => {
        onQuantityChange(productId, qty);
    };

    const handlePriceChange = (productId, price) => {
        onPriceChange(productId, price);
    };

    const handleButtonClick = (value) => {
        if (selectedAction === 'Qty' && selectedProduct) {
            const newQty = parseInt(value, 10);
            handleQuantityChange(selectedProduct.id, newQty);
        } else if (selectedAction === 'Price' && selectedProduct) {
            const newPrice = parseFloat(value);
            handlePriceChange(selectedProduct.id, newPrice);
        } else if (value === 'backspace' && selectedProduct) {
            onDeleteProduct(selectedProduct.id);
            setSelectedProduct(null);
        } else if (['Qty', 'Price', 'backspace'].includes(value)) {
            setSelectedAction(value);
        } else if (['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'].includes(value) && selectedProduct) {
            if (selectedAction === 'Qty') {
                const newQty = parseInt(value, 10);
                handleQuantityChange(selectedProduct.id, newQty);
            } else if (selectedAction === 'Price') {
                const newPrice = parseFloat(value);
                handlePriceChange(selectedProduct.id, newPrice);
            }
        }
    };

    const totalAmount = selectedProducts.reduce((total, product) => {
        return total + (product.price * (quantities[product.id] || 0));
    }, 0).toFixed(2);

    const totalTaxes = (totalAmount * 0.13).toFixed(2); // Assuming a 13% tax rate

    return (
        <div className="flex flex-col justify-evenly p-4 border-gray-300 ">
            <h2 className="text-xl font-bold mb-4">Order Details</h2>
            <div className="mb-4 max-h-72 min-h-72 overflow-auto ">
                {selectedProducts.length === 0 ? (
                    <p className="text-gray-500">Start adding products</p>
                ) : (
                    selectedProducts.map((product) => (
                        <div key={product.id} className={`grid grid-cols-2 rounded items-center mb-2 p-2 ${selectedProduct && selectedProduct.id === product.id ? 'bg-gray-200 border-black' : ''}`} onClick={() => setSelectedProduct(product)} style={{ borderWidth: "0.5px" }}>
                            <div className="flex flex-col">
                                <span className="font-bold text-black-700">{product.name}</span>
                                <span className="text-sm text-gray-700">{quantities[product.id]} Units x ${product.price} / Unit</span>
                            </div>
                            <span className=" text-right font-bold">${(product.price * quantities[product.id]).toFixed(2)}</span>
                        </div>
                    ))
                )}
            </div>
            <div className="border-t pt-4 mb-3">
                <div className="flex justify-between mb-2">
                    <span className="font-semibold">Total:</span>
                    <span>${totalAmount}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-semibold">Taxes:</span>
                    <span>${totalTaxes}</span>
                </div>
            </div>
            <div className="border-t pt-4 grid grid-cols-2 gap-4 mb-4">
                <button className="bg-gray-300 py-2 rounded text-center">Refund</button>
                <button className="bg-gray-300 py-2 rounded text-center">Customer</button>
            </div>
            <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Order</h3>
                <div className='flex flex-row'>
                    <button
                        className="w-1/3 bg-blue-600 text-white py-2 rounded text-center"
                        onClick={placeOrder}
                    >
                        Order
                    </button>
                    <div className="grid grid-cols-4 grid-rows-4 gap-2">
                        {['1', '2', '3', 'Qty', '4', '5', '6', 'Price', '7', '8', '9', 'backspace', '0', '.'].map((label, index) => (
                            <button
                                key={index}
                                className={`bg-gray-300 p-3 rounded text-center ${label === '0' ? 'col-span-3' : ''}`}
                                onClick={() => handleButtonClick(label)}
                            >
                                {label === 'backspace' ? <i className="fas fa-backspace"></i> : label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
