import React, { useState } from "react";

const ProductPriceModal = ({ isOpen, onClose, productList, onSave }) => {
    const [localProductList, setLocalProductList] = useState([...productList]);

    const handlePriceChange = (index, newPrice) => {
        const updatedList = localProductList.map((product, i) =>
            i === index ? { ...product, price: newPrice } : product
        );
        setLocalProductList(updatedList);
    };

    const handleSave = () => {
        onSave(localProductList);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Adjust Product Prices</h2>
                <ul>
                    {localProductList.map((product, index) => (
                        <li key={index}>
                            <span>{product.emoji}</span>
                            <input
                                type="number"
                                value={product.price}
                                onChange={(e) => handlePriceChange(index, parseFloat(e.target.value))}
                                step="0.01"
                                min="0"
                            />
                        </li>
                    ))}
                </ul>
                <button onClick={handleSave}>Save</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default ProductPriceModal;
