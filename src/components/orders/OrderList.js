import { hasFormSubmit } from "@testing-library/user-event/dist/utils";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAllPurchases } from "../ApiManager";

export const OrderList = () => {
    const [customerPurchases, setCustomerPurchases] = useState([]);
    const [customer, setCustomer] = useState({}); 
    const { customerId } = useParams();


    //fetch list of all of this customers purchases
    const fetchPurchases = () => {
        getAllPurchases(`?customerId=${customerId}&_expand=product`)
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
            <table>
                <thead>
                    <tr>
                        <th>Candy</th>
                        <th>Quantity</th>
                        <th>Total Cost</th>
                    </tr>
                </thead>
                <tbody>
            {
                customerPurchases.reduce((purchaseArray, candy) => {
                    let tallyObject = (purchaseArray.find(x => candy.product.id === x.id) || {});
                    tallyObject = {
                        quantity: (tallyObject.quantity || 0) + 1,
                        name: candy.product.name,
                        price: candy.product.price,
                        id: candy.product.id
                    };
                    const selectedIndex = purchaseArray.findIndex(x => x.id === tallyObject.id);
                    if (selectedIndex >= 0) {
                        purchaseArray[selectedIndex] = tallyObject;
                    } else {
                        purchaseArray.push(tallyObject);
                    }
                    return purchaseArray;
                }, []).map(x => {
                    return <tr key={x.id}>
                        <td>{x.name}</td>
                        <td>{x.quantity}</td>
                        <td>{(x.price * x.quantity).toFixed(2)}</td>
                    </tr>
                })
            }
                </tbody>
            </table>
        </>
    )
    
}