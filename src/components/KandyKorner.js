import React, {useEffect, useState} from "react";
import { LocationList } from "./locations/LocationList";
import { ProductList } from "./products/ProductList";

export const KandyKorner = () => {

    return (
        <>
        <h1>KandyKorner</h1>
        <LocationList />
        <ProductList />
        </>
    )
}