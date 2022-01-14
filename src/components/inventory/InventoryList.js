import React, { useEffect, useState } from "react";
import { getAllProducts } from "../ApiManager";

export const InventoryList = (props) => {
    const [products, setProducts] = useState([]);

    const fetchProducts = () => {
        getAllProducts("?_expand=productType&_sort=productTypeId")
            .then(products => setProducts(products));
    }

    useEffect(() => {
        fetchProducts();
    }, [props.searchText]);

    //will filter the producst array with our search terms and return the new filtered array
    const searchProducts = (array) => {
        const searchTerms = props.searchText.toLowerCase();
        return array.filter(product => product.name.toLowerCase().startsWith(searchTerms));
    }

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
            <h1>Search Results</h1>
            {
                searchProducts(products).map(product => {
                    return <div key={`productList--${product.id}`}>
                        {product.name} - {product.productType.type}: ${product.price}
                        <button className="btn primary-btn" value={product.id} onClick={ addPurchase } >Purchase</button></div>
                })
            }
        </>
    )
}