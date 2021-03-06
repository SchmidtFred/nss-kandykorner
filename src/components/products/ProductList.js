import React, { useState, useEffect } from "react";
import { getAllProducts } from "../ApiManager";

export const ProductList = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = () => {
        getAllProducts("?_expand=productType&_sort=productTypeId")
            .then(products => setProducts(products));
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    const addPurchase = (event) => {
        const newPurchase = {
            productId: parseInt(event.target.value),
            customerId: parseInt(localStorage.getItem("kandy_customer"))
        }

        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPurchase)
        };

        fetch("http://localhost:8088/purchases", fetchOptions)
            .then(() => fetchProducts())
    }

    return (
        <>
        <h1>Products</h1>
        {
            products.map(product => <div key={`productList--${product.id}`}>{product.name} - {product.productType.type}: ${product.price} <button className="btn primary-btn" value={product.id} onClick={ addPurchase } >Purchase</button></div>)
        }
        </>
    )
}