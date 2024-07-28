import React, { useState } from "react";
import CustomerList from "./CustomerList";
import Scanner from "./Scanner";
import Basket from "./Basket";
import { generateCustomers, productList } from "../utils/products";
import ProductPriceModal from "./ProductPriceModal";

const Layout = () => {
    const [customers, setCustomers] = useState(generateCustomers());
    const [currentCustomerIndex, setCurrentCustomerIndex] = useState(0);
    const [scannedProducts, setScannedProducts] = useState([]);
    const [receipts, setReceipts] = useState([]);
    const [scannerReady, setScannerReady] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [scannedProduct, setScannedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [products, setProducts] = useState(productList);

    const currentCustomer = customers[currentCustomerIndex];

    const handleProductDropped = (product) => {
        setScannedProducts((prevProducts) => [...prevProducts, product]);

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

        if (updatedCustomers[currentCustomerIndex].products.length === 0) {
            generateReceipt([...scannedProducts, product]);
            setCurrentCustomerIndex((prevIndex) => prevIndex + 1);
            setScannedProducts([]);
        }

        setScannerReady(false);
        setCurrentProduct(null);
        setScannedProduct(null);
    };

    const handleProductScanned = (product) => {
        setScannedProduct(product);
        setScannerReady(true);
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

    const handleSavePrices = (updatedProducts) => {
        setProducts(updatedProducts);

        // Update the prices in the customers' product lists
        const updatedCustomers = customers.map((customer) => ({
            ...customer,
            products: customer.products.map((product) => {
                const updatedProduct = updatedProducts.find((p) => p.emoji === product.emoji);
                return updatedProduct ? { ...product, price: updatedProduct.price } : product;
            }),
        }));

        setCustomers(updatedCustomers);
    };

    return (
        <div className="layout">
            <CustomerList customers={customers} currentCustomerIndex={currentCustomerIndex} />
            <Scanner
                setScannerReady={setScannerReady}
                setCurrentProduct={setCurrentProduct}
                scannedProduct={scannedProduct}
                onProductScanned={handleProductScanned}
            />
            <Basket
                scannedProducts={scannedProducts}
                onProductDropped={handleProductDropped}
                scannerReady={scannerReady}
                currentProduct={currentProduct}
            />
            <button onClick={() => setIsModalOpen(true)}>Adjust Prices</button>
            <ProductPriceModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                productList={products}
                onSave={handleSavePrices}
            />
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
