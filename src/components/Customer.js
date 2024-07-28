import React from "react";
import Product from "./Product";

const Customer = ({ customer }) => {
    return (
        <div className="customer">
            <h3>{customer.name}</h3>
            <div className="products">
                {customer.products.map((product, index) => (
                    <Product key={index} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Customer;
