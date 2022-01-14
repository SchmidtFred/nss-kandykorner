import React, {useEffect, useState} from "react";
import { getAllLocations } from "../ApiManager";

export const LocationList = () => {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        getAllLocations()
            .then((locations) => setLocations(locations))
    }, [])

    return (
        <>
        <h1>Locations</h1>
        {
            locations.map(loc => <p key={`locationList--${loc.id}`}>{loc.address}</p>)
        }
        </>
    )
}