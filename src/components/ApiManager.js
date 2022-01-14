const API = "http://localhost:8088";

export const getAllCustomers = () => {
    return fetch(`${API}/customers`).then(res => res.json());
};

export const getAllEmployees = (extras) => {
    return fetch(`${API}/employees${extras}`).then(res => res.json());
};

export const getAllLocations = () => {
    return fetch(`${API}/locations`).then(res => res.json());
};

export const getAllPurchases = (extras) => {
    return fetch(`${API}/purchases${extras}`).then(res => res.json());
};

export const getAllProducts = (extras) => {
    return fetch(`${API}/products${extras}`)
            .then(res => res.json())
}

export const addEntity = (objToAdd, database, history) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(objToAdd)
    };

    return fetch(`http://localhost:8088/${database}`, fetchOptions)
        .then(() => history.push(`/${database}`))
}