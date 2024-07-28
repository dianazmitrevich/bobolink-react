import React from "react";
import { useDrag } from "react-dnd";

const Product = ({ product, isDraggable }) => {
    const [{ isDragging }, drag] = useDrag({
        type: "PRODUCT",
        item: { ...product },
        canDrag: isDraggable,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    return (
        <div
            ref={drag}
            className="product"
            style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: isDraggable ? "move" : "not-allowed",
                backgroundColor: isDragging ? "#e0e0e0" : "#fff",
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "5px",
                margin: "5px",
                display: "inline-block",
            }}>
            {product.emoji}
        </div>
    );
};

export default Product;
