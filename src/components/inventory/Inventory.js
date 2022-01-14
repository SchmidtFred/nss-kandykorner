import React, { useEffect, useState } from "react";
import { InventoryList } from "./InventoryList";
import { InventorySearch } from "./InventorySearch";

export const Inventory = () => {
    const [searchTerms, setSearchTerms] = useState("");

    return (
        <>
            <InventorySearch searchSet={setSearchTerms}/>
            <InventoryList searchText={searchTerms}/>
        </>
    )

}