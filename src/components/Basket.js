import React from "react";
import { useDrop } from "react-dnd";

const Basket = ({ scannedProducts, onProductAdded }) => {
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: "PRODUCT",
        drop: (item) => {
            if (canDrop) {
                onProductAdded(item);
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    const isActive = isOver && canDrop;
    let backgroundColor = "#f7f7f7";
    if (isActive) {
        backgroundColor = "#d0f0c0";
    }

    const total = scannedProducts.reduce((sum, product) => sum + parseFloat(product.price), 0).toFixed(2);

    return (
        <div
            ref={drop}
            className="basket"
            style={{
                border: "2px dashed #ccc",
                padding: "20px",
                textAlign: "center",
                minHeight: "150px",
                backgroundColor,
                transition: "background-color 0.3s",
            }}>
            <h3>Basket</h3>
            <div>
                {scannedProducts.map((product, index) => (
                    <div key={index}>
                        {product.emoji} - ${product.price}
                    </div>
                ))}
            </div>
            <div className="total">
                <strong>Total: ${total}</strong>
            </div>
        </div>
    );
};

export default Basket;
