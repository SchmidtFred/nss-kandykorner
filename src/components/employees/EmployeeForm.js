import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export const EmployeeForm = () => {
    const [employee, setEmployee] = useState({
        name: "",
        locationId: 0,
        manager: false,
        fullTime: false,
        hourlyRate: 0
    });
    const [locations, setLocations] = useState([]);
    const history = useHistory();

    useEffect(() => {
        fetch("http://localhost:8088/locations")
            .then(res => res.json())
            .then(locations => setLocations(locations));
    }, []);

    const saveEmployee = (event) => {
        event.preventDefault();

        const newEmployee = {
            name: employee.name,
            locationId: employee.locationId,
            manager: employee.manager,
            fullTime: employee.fullTime,
            hourlyRate: employee.hourlyRate
        };

        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newEmployee)
        };

        fetch("http://localhost:8088/employees", fetchOptions)
            .then(() => history.push("/employees"))
    };

    return (
        <form>
            <h2 className="employeeForm__title">New Employee</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input required autoFocus id="name" type="text" className="form-control" placeholder="Full Name" onChange={(e) => {
                        const copy = {...employee};
                        copy.name = e.target.value;
                        setEmployee(copy);
                    }} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="manager">Manager:</label>
                    <input type="checkbox" id="manager" onChange={(e) => {
                        const copy = {...employee};
                        copy.manager = e.target.checked;
                        setEmployee(copy);
                    }} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="fullTime">Full Time:</label>
                    <input type="checkbox" id="fullTime" onChange={(e) => {
                        const copy = {...employee};
                        copy.fullTime = e.target.checked;
                        setEmployee(copy);
                    }} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="hourlyRate">Hourly Rate:</label>
                    <input type="number" id="hourlyRate" required onChange={(e) => {
                        const copy = {...employee};
                        copy.hourlyRate = parseInt(e.target.value);
                        setEmployee(copy);
                    }} min="11" />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Store Location:</label>
                    <select id="location" name="location" required onChange={(e) => {
                        const copy = {...employee};
                        copy.locationId = parseInt(e.target.value);
                        setEmployee(copy);
                    }}>
                        <option key="locationSelectList--0" value="0">Select Location</option>
                        {locations.map(loc => {
                            return <option key={`locationSelectList--${loc.id}`} value={loc.id}>{loc.address}</option> 
                        })}
                    </select>
                </div>
            </fieldset>
            <button className="btn btn-primary" onClick={e => saveEmployee(e)}>
                Hire Employee
            </button>
        </form>
    )
}