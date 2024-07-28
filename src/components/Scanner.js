import React, { useEffect, useState } from "react";
import { useDrop, useDrag } from "react-dnd";

const Scanner = ({ onScanComplete, scannedProduct, setScannedProduct }) => {
    const [isReady, setIsReady] = useState(false);

    const [{ isOver, canDrop }, drop] = useDrop({
        accept: "PRODUCT",
        drop: (item) => {
            if (canDrop && !isReady) {
                setScannedProduct(item);
                onScanComplete(item);
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    useEffect(() => {
        if (scannedProduct) {
            const timer = setTimeout(() => {
                setIsReady(true);
            }, 1000); // Simulate scanning time
            return () => clearTimeout(timer);
        }
    }, [scannedProduct]);

    const [{ isDragging }, drag] = useDrag({
        type: "PRODUCT",
        item: { ...scannedProduct },
        canDrag: isReady,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
        end: () => {
            if (isReady) {
                setScannedProduct(null);
                setIsReady(false);
            }
        },
    });

    let backgroundColor = "#f7f7f7";
    if (isOver && canDrop) {
        backgroundColor = "#d0f0c0";
    } else if (isReady) {
        backgroundColor = "#90ee90";
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
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}>
            {scannedProduct && isReady ? (
                <div ref={drag} style={{ cursor: "move" }}>
                    {scannedProduct.emoji}
                </div>
            ) : (
                <p>Drop product here to scan</p>
            )}
        </div>
    );
};

export default Scanner;
