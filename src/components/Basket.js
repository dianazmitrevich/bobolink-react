import React from "react";

const Basket = ({ scannedProducts }) => {
    const totalPrice = scannedProducts.reduce((total, product) => total + parseFloat(product.price), 0).toFixed(2);

    return (
        <div className="basket">
            <h3>Basket</h3>
            {scannedProducts.map((product, index) => (
                <div key={index} className="product">
                    {product.emoji} - ${product.price}
                </div>
            ))}
            <div className="total">
                <strong>Total: ${totalPrice}</strong>
            </div>
        </div>
    );
};

export default Basket;
