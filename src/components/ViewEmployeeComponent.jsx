import React, { useState, useEffect } from 'react';
import { getEmployee } from '../services/EmployeeService';
import { useParams } from 'react-router-dom';

const ViewEmployeeComponent = () => {
    const [employee, setEmployee] = useState({});
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getEmployee(id)
                .then((response) => {
                    setEmployee(response.data);
                })
                .catch((error) => {
                    console.error(error);
                    // Handle error, e.g., show an error message or redirect
                });
        }
    }, [id]);

    return (
        <div className="container mt-3">
            <h2>Employee Details</h2> <br />
            <hr />
            <div>
                <p><strong>First Name:</strong> {employee.firstName}</p>
                <p><strong>Last Name:</strong> {employee.lastName}</p>
                <p><strong>Date of Birth:</strong> {employee.dateOfBirth}</p>
                <p><strong>Email:</strong> {employee.email}</p>
                <p><strong>Mobile:</strong> {employee.mobile}</p>
                <p><strong>Address:</strong></p>
                <p>{employee.street1}</p>
                <p>{employee.street2}</p>
                <p>{employee.city}, {employee.state} - {employee.postal}</p>
            </div>
        </div>
    );
};

export default ViewEmployeeComponent;
