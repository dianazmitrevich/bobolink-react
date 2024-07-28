import React from "react";
import { useDrop } from "react-dnd";

const Basket = ({ scannedProducts, onProductDropped, scannerReady, currentProduct }) => {
    const [{ isOver }, drop] = useDrop({
        accept: "PRODUCT",
        drop: (item) => {
            if (scannerReady && item.emoji === currentProduct.emoji) {
                onProductDropped(item);
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });

    return (
        <div
            ref={drop}
            style={{
                border: "2px dashed #ccc",
                padding: "20px",
                textAlign: "center",
                minHeight: "150px",
                backgroundColor: isOver ? "#ffebcd" : "#fff",
                transition: "background-color 0.3s",
            }}>
            <h2>Basket</h2>
            <ul>
                {scannedProducts.map((product, index) => (
                    <li key={index}>
                        {product.emoji} - ${product.price}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Basket;
