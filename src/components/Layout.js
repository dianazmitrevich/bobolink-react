import React, { useState } from "react";
import CustomerList from "./CustomerList";
import Scanner from "./Scanner";
import Basket from "./Basket";
import { generateCustomers } from "../utils/products";

const Layout = () => {
    const [customers, setCustomers] = useState(generateCustomers());
    const [scannedProducts, setScannedProducts] = useState([]);
    const [currentProduct, setCurrentProduct] = useState(null); // Product currently being scanned
    const [isReady, setIsReady] = useState(false); // Indicates if a product is ready to move to the basket

    const handleScan = (product) => {
        setCurrentProduct(product);
        setIsReady(true); // Mark product as ready for basket transfer
    };

    const handleMoveToBasket = (product) => {
        if (isReady && product === currentProduct) {
            setScannedProducts((prevProducts) => [...prevProducts, product]);
            setCustomers((prevCustomers) =>
                prevCustomers.map((customer) => ({
                    ...customer,
                    products: customer.products.filter((p) => p.emoji !== product.emoji),
                }))
            );
            setCurrentProduct(null);
            setIsReady(false);
        }
    };

    return (
        <div className="layout">
            <CustomerList customers={customers} />
            <Scanner onScan={handleScan} isReady={isReady} currentProduct={currentProduct} />
            <Basket scannedProducts={scannedProducts} onMoveToBasket={handleMoveToBasket} />
        </div>
    );
};

export default Layout;
