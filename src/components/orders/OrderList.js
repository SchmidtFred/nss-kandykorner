import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const OrderList = () => {
    const [customerPurchases, setCustomerPurchases] = useState([]);
    const [customer, setCustomer] = useState({}); 
    const { customerId } = useParams();


    //fetch list of all of this customers purchases
    const fetchPurchases = () => {
        fetch(`http://localhost:8088/purchases?customerId=${customerId}&_expand=product`)
            .then(res => res.json())
            .then(data => setCustomerPurchases(data));
    };

    useEffect(() => fetchPurchases(), []);

    //get the customer object
    useEffect(() => {
        fetch(`http://localhost:8088/customers/${customerId}`)
            .then(res => res.json())
            .then(data => setCustomer(data));
    },[]);

    return (
        <>
            <h2>{customer.name}</h2>
            {
                customerPurchases.map(purchase => {
                    return <div key={purchase.id}>{purchase.product.name} - {purchase.product.price}</div>
                })
            }
        </>
    )
    
}