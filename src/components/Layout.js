import React, { useState } from "react";
import CustomerList from "./CustomerList";
import Scanner from "./Scanner";
import Basket from "./Basket";
import { generateCustomers } from "../utils/products";

const Layout = () => {
    const [customers, setCustomers] = useState(generateCustomers());
    const [currentCustomerIndex, setCurrentCustomerIndex] = useState(0);
    const [scannedProducts, setScannedProducts] = useState([]);
    const [receipts, setReceipts] = useState([]);
    const [currentScannedProduct, setCurrentScannedProduct] = useState(null);

    const currentCustomer = customers[currentCustomerIndex];

    const handleScanComplete = (product) => {
        setCurrentScannedProduct(product);
    };

    const handleProductAdded = (product) => {
        if (currentScannedProduct && product.emoji === currentScannedProduct.emoji) {
            setScannedProducts((prevProducts) => [...prevProducts, product]);
            setCurrentScannedProduct(null); // Clear the scanned product from the scanner

            // Update customer products
            const updatedCustomers = customers.map((customer, index) => {
                if (index === currentCustomerIndex) {
                    return {
                        ...customer,
                        products: customer.products.filter((p) => p.emoji !== product.emoji),
                    };
                }
                return customer;
            });

            setCustomers(updatedCustomers);

            // Check if all products of the current customer are scanned
            if (updatedCustomers[currentCustomerIndex].products.length === 0) {
                generateReceipt([...scannedProducts, product]);
                setCurrentCustomerIndex((prevIndex) => prevIndex + 1);
                setScannedProducts([]);
            }
        }
    };

    const generateReceipt = (products) => {
        const total = products.reduce((sum, product) => sum + parseFloat(product.price), 0).toFixed(2);
        const receipt = {
            customer: currentCustomer.name,
            products,
            total,
        };
        setReceipts((prevReceipts) => [...prevReceipts, receipt]);
    };

    return (
        <div className="layout">
            <CustomerList customers={customers} currentCustomerIndex={currentCustomerIndex} />
            <Scanner
                onScanComplete={handleScanComplete}
                scannedProduct={currentScannedProduct}
                setScannedProduct={setCurrentScannedProduct}
            />
            <Basket scannedProducts={scannedProducts} onProductAdded={handleProductAdded} />
            <div className="receipts">
                <h3>Receipts</h3>
                {receipts.map((receipt, index) => (
                    <div key={index} className="receipt">
                        <h4>Customer: {receipt.customer}</h4>
                        <ul>
                            {receipt.products.map((product, idx) => (
                                <li key={idx}>
                                    {product.emoji} - ${product.price}
                                </li>
                            ))}
                        </ul>
                        <strong>Total: ${receipt.total}</strong>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Layout;
