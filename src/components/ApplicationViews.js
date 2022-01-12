import React from "react";
import { Route } from "react-router-dom";
import { LocationList } from "./locations/LocationList";
import { ProductList } from "./products/ProductList";
import { EmployeeList } from "./employees/EmployeeList";
import { EmployeeForm } from "./employees/EmployeeForm";
import { CustomerList } from "./customers/CustomerList";

export const ApplicationViews = () => {
    return (
        <>
            <Route path="/locations">
                <LocationList />
            </Route>

            <Route path="/products">
                <ProductList />
            </Route>

            <Route exact path="/employees">
                <EmployeeList />
            </Route>

            <Route path="/employees/hire">
                <EmployeeForm />
            </Route>

            <Route path="/customers">
                <CustomerList />
            </Route>
        </>
    )
}