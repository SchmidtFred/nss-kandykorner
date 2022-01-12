import React, { useState, useEffect } from "react";

export const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8088/products?_expand=productType&_sort=productTypeId")
            .then(res => res.json())
            .then(products => setProducts(products));
    }, []);

    return (
        <>
        <h1>Products</h1>
        {
            products.map(product => <p key={`productList--${product.id}`}>{product.name} - {product.productType.type}: ${product.price} </p>)
        }
        </>
    )
}