import React from "react";
import { useDrop } from "react-dnd";

const Basket = ({ scannedProducts, onMoveToBasket }) => {
    const [{ isOver }, drop] = useDrop({
        accept: "PRODUCT",
        drop: (item) => onMoveToBasket(item),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });

    const totalPrice = scannedProducts.reduce((total, product) => total + parseFloat(product.price), 0).toFixed(2);

    return (
        <div
            ref={drop}
            className="basket"
            style={{
                border: "2px dashed #ccc",
                padding: "20px",
                backgroundColor: isOver ? "#f0f0f0" : "#fff",
                transition: "background-color 0.3s",
            }}>
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
