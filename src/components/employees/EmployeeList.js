import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const history = useHistory();

    const fetchEmployees = () => {
        fetch("http://localhost:8088/employees?_expand=location")
            .then(res => res.json())
            .then(employees => setEmployees(employees));
    }

    useEffect(() => {
        fetchEmployees();
    },[]);

    const deleteEmployee = (e) => {
        fetch(`http://localhost:8088/employees/${e.target.value}`, {method: "DELETE"})
            .then(() => fetchEmployees());
    };

    return (
        <>
            <div><button onClick={() => history.push("/employees/hire")}>Hire Employee</button></div>
            {employees.map(emp => {
                return <div key={`employeeList--${emp.id}`}>
                            <p>{emp.name} - {emp.manager ? "Manager" : ""} {emp.fullTime ? "Full Time" : "Part Time"} Hourly Rate: {emp.hourlyRate}</p>
                            <p>{emp.location.address}</p>
                            <button onClick={ deleteEmployee } value={emp.id}>Fire Employee</button>
                        </div>
            })}
        </>
    )
}