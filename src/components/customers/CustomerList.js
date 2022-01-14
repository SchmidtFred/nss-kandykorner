import React, { useEffect, useState } from "react";
import { getAllCustomers, getAllPurchases } from "../ApiManager";
import "./CustomerList.css";

export const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const [purchases, setPurchases] = useState([]);

    useEffect(() => {
        getAllCustomers().then(customers => {
            setCustomers(customers);
        })
    }, []);

    useEffect(() => {
        getAllPurchases("?_expand=product").then(purchases => {
            setPurchases(purchases)
        });
    },[]);

    //this function will assign the number of purchases a customer has to the objects in the array and then sort them by that number.
    const purchaseFilter = (x) => {
        x.forEach(cust => cust.noOfPurchases = purchases.filter(x => x.customerId === cust.id).length)
        return x.sort((a,b) => b.noOfPurchases - a.noOfPurchases)
    }

    return (
        <>
            <h1>Customers</h1>
            <table>
                <thead>
                    <tr className="tr">
                        <th>Customer</th>
                        <th>Candies Bought</th>
                    </tr>
                </thead>
            {
                purchaseFilter(customers).map(cust => {             
                    return <tbody key={cust.id}>
                    <tr>
                        <td>{cust.name}</td>
                        <td>{cust.noOfPurchases}</td>
                    </tr>
                    </tbody>
                })
            }
            </table>
        </>
    )
}