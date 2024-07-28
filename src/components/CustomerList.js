import React from "react";
import Customer from "./Customer";

const CustomerList = ({ customers }) => {
    return (
        <div className="customer-list">
            {customers.map((customer, index) => (
                <Customer key={index} customer={customer} />
            ))}
        </div>
    );
};

export default CustomerList;
