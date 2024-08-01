// ProductGrid.jsx
import React,{useState} from 'react';

const products = [
    { id: 1, name: 'Product 1', price: 10.99 },
    { id: 2, name: 'Product 2', price: 19.99 },
    { id: 3, name: 'Product 3', price: 14.99 },
    { id: 4, name: 'Product 4', price: 12.99 },
    { id: 5, name: 'Product 5', price: 8.99 },
    { id: 6, name: 'Product 6', price: 7.99 },
    { id: 7, name: 'Product 7', price: 16.99 },
    { id: 8, name: 'Product 8', price: 9.99 },
    { id: 9, name: 'Product 9', price: 11.99 },
    { id: 10, name: 'Product 10', price: 13.99 },
    { id: 11, name: 'Product 11', price: 15.99 },
    { id: 12, name: 'Product 12', price: 18.99 },
    { id: 13, name: 'Product 13', price: 20.99 },
    { id: 14, name: 'Product 14', price: 22.99 },
    { id: 15, name: 'Product 15', price: 24.99 },
    { id: 16, name: 'Product 16', price: 26.99 },
    { id: 17, name: 'Product 17', price: 28.99 },
    { id: 18, name: 'Product 18', price: 30.99 },
    { id: 19, name: 'Product 19', price: 32.99 },
    { id: 20, name: 'Product 20', price: 34.99 },
    { id: 21, name: 'Product 21', price: 36.99 },
    { id: 22, name: 'Product 22', price: 38.99 },
    { id: 23, name: 'Product 23', price: 40.99 },
    { id: 24, name: 'Product 24', price: 42.99 },
    { id: 25, name: 'Product 25', price: 44.99 },
    { id: 26, name: 'Product 26', price: 46.99 },
    { id: 27, name: 'Product 27', price: 48.99 },
    { id: 28, name: 'Product 28', price: 50.99 },
    { id: 29, name: 'Product 29', price: 52.99 },
    { id: 30, name: 'Product 30', price: 54.99 },
    { id: 31, name: 'Product 31', price: 56.99 },
    { id: 32, name: 'Product 32', price: 58.99 },
    { id: 33, name: 'Product 33', price: 60.99 },
    { id: 34, name: 'Product 34', price: 62.99 },
    { id: 35, name: 'Product 35', price: 64.99 },
    { id: 36, name: 'Product 36', price: 66.99 },
    { id: 37, name: 'Product 37', price: 68.99 },
];

const ProductGrid = ({ onProductSelect }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold">Products</h2>
                <input
                    type="text"
                    placeholder="Search products..."
                    className="input px-3 mb-3 rounded-md"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="grid grid-cols-4 gap-4 overflow-auto" style={{ maxHeight: 'calc(100vh - 60px)' }}>
                {filteredProducts.map(product => (
                    <div
                        key={product.id}
                        className="p-4 bg-white shadow rounded flex flex-col items-start cursor-pointer"
                        onClick={() => onProductSelect(product)}
                    >
                        <span className="font-semibold">{product.name}</span>
                        <span className="text-gray-500">${product.price.toFixed(2)}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductGrid;