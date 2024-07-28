import React, { useState } from "react";
import { useDrop } from "react-dnd";

const Scanner = ({ setScannerReady, setCurrentProduct }) => {
    const [scannedProduct, setScannedProduct] = useState(null);

    const [{ isOver }, drop] = useDrop({
        accept: "PRODUCT",
        hover: (item) => {
            setScannedProduct(item);
            setScannerReady(true);
            setCurrentProduct(item);
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
            <p>{scannedProduct ? "Product scanned! Move to basket." : "Drop product here to scan"}</p>
        </div>
    );
};

export default Scanner;
