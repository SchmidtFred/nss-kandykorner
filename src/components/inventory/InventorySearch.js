import React from "react";

export const InventorySearch = (props) => {

    return (
        <>
            <label htmlFor="searchBar">Search Products</label>
            <input type="text" autoFocus id="searchBar" onChange={e => {
                    props.searchSet(e.target.value);
                }
            }/>
        </>
    )
}