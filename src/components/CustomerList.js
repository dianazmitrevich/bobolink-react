import React from "react";
import Product from "./Product";

const CustomerList = ({ customers, currentCustomerIndex }) => {
    return (
        <div className="customer-list">
            <h3>Customers</h3>
            {customers.map((customer, index) => (
                <div key={index} className={`customer ${index === currentCustomerIndex ? "active" : ""}`}>
                    <h4>{customer.name}</h4>
                    <div className="products">
                        {customer.products.map((product, idx) => (
                            <Product key={idx} product={product} isDraggable={index === currentCustomerIndex} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CustomerList;
