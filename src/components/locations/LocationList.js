import React, {useEffect, useState} from "react";

export const LocationList = () => {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8088/locations")
            .then(res => res.json())
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