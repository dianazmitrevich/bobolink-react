import React, { useEffect } from "react";
import { useDrop } from "react-dnd";
import Product from "./Product";

const Scanner = ({ onScan, isReady, currentProduct }) => {
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: "PRODUCT",
        drop: (item) => {
            onScan(item);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    const isActive = isOver && canDrop;
    let backgroundColor = "#f7f7f7";
    if (isActive) {
        backgroundColor = "#d0f0c0"; // Indicate that the product can be scanned
    } else if (isReady) {
        backgroundColor = "#90ee90"; // Scanner is ready, turn green
    }

    return (
        <div
            ref={drop}
            className="scanner"
            style={{
                border: "2px dashed #ccc",
                padding: "20px",
                textAlign: "center",
                height: "150px",
                backgroundColor,
                transition: "background-color 0.3s",
            }}>
            {currentProduct && isReady ? (
                <Product product={currentProduct} isScanned={isReady} />
            ) : (
                <p>Drop here to scan</p>
            )}
        </div>
    );
};

export default Scanner;
