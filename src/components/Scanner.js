import React, { useState } from "react";
import { useDrop } from "react-dnd";

const Scanner = ({ setScannerReady, setCurrentProduct, scannedProduct, onProductScanned }) => {
    const [{ isOver }, drop] = useDrop({
        accept: "PRODUCT",
        hover: (item) => {
            setCurrentProduct(item);
            onProductScanned(item); // Call the function to notify the product is scanned
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
                height: "150px",
                backgroundColor: isOver ? "#90ee90" : "#f7f7f7",
                transition: "background-color 0.3s",
            }}>
            {scannedProduct ? (
                <div>
                    <p>Product scanned!</p>
                    <p>
                        {scannedProduct.emoji} - ${scannedProduct.price}
                    </p>
                </div>
            ) : (
                <p>Drop product here to scan</p>
            )}
        </div>
    );
};

export default Scanner;
