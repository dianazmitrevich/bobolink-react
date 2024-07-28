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

    const handleMoveToBasket = () => {
        if (isReady && currentProduct) {
            setScannedProducts((prevProducts) => [...prevProducts, currentProduct]);
            setCustomers((prevCustomers) =>
                prevCustomers.map((customer) => ({
                    ...customer,
                    products: customer.products.filter((product) => product.emoji !== currentProduct.emoji),
                }))
            );
            setCurrentProduct(null);
            setIsReady(false);
        }
    };

    return (
        <div className="layout">
            <CustomerList customers={customers} />
            <Scanner
                onScan={handleScan}
                isReady={isReady}
                currentProduct={currentProduct}
                onMoveToBasket={handleMoveToBasket}
            />
            <Basket scannedProducts={scannedProducts} />
        </div>
    );
};

export default Layout;
