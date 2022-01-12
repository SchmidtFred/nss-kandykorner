import React, { useEffect, useState } from "react";

export const CustomerList = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8088/customers")
            .then(res => res.json())
            .then(customers => setCustomers(customers))
    }, []);

    return (
        <>
            <h1>Customers</h1>
            {
                customers.map(cust => {
                    return <p key={cust.id}>{cust.name}</p>
                })
            }
        </>
    )
}