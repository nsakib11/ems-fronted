import React, { useEffect, useState } from 'react';
import { deleteEmployee, listEmployees } from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';


const ListEmployeeComponent = () => {
    const [employees, setEmployees] = useState([])
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const navigator = useNavigate();
    const [search, setSearch] = useState('');

    useEffect(() => {
        getAllEmployees();
    }, []); 

    function getAllEmployees() {
        listEmployees().then((response) => { 
            setEmployees(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function addNewEmployee() {
        navigator('/add-employee')
    }

    function updateEmployee(id) {
        navigator(`/edit-employee/${id}`)
    }
    function getEmployeeById(id) {
        navigator(`/employees/${id}`)
    }
    function getDashboard() {
        navigator(`/employees/dashboard`)
    }
    function getInstock() {
        navigator(`/employees/inStock`)
    }
    function getProducts() {
        navigator(`/employees/products`)
    }
    function getOrders() {
        navigator(`/employees/orders`)
    }
    function getSales() {
        navigator(`/employees/sales`)
    }
    function getUsers() {
        navigator(`/employees/users`)
    }

    // Function to handle select all checkbox
    const handleSelectAll = (event) => {
        const isChecked = event.target.checked;
        const selected = isChecked ? employees.map(employee => employee.id) : [];
        setSelectedEmployees(selected);
    }

    // Function to handle individual checkbox change
    const handleCheckboxChange = (employeeId, isChecked) => {
        const selected = isChecked ? [...selectedEmployees, employeeId] : selectedEmployees.filter(id => id !== employeeId);
        setSelectedEmployees(selected);
    }
    // Function to remove checked rows
    const removeCheckedRows = () => {
    const selectedEmployeesIds = selectedEmployees.length > 0 ? selectedEmployees : employees.filter(employee => employee.checked).map(employee => employee.id);
    selectedEmployeesIds.forEach(id => {
        deleteEmployee(id).then(() => {
            getAllEmployees();
        }).catch(error => {
            console.error(error);
        })
    });
    setSelectedEmployees([]); // Clear selected employees after deletion
    };

    // Existing function to remove checked rows and the corresponding row
    const removeCheckedAndRow = (employeeId) => {
    // Remove corresponding row
    deleteEmployee(employeeId).then(() => {
        getAllEmployees();
    }).catch(error => {
        console.error(error);
    });
    };

    
    

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-1">
                    <div className="nav flex-column">
                        <div className="nav-item text-center">
                            <i className="far fa-calendar-alt"></i>
                            <a className="nav-link" onClick={getDashboard}>Dashboard</a>
                        </div>
                        <div className="nav-item text-center">
                            <i className="far fa-calendar-alt"></i>
                            <a className="nav-link" onClick={getInstock}>In Stock</a>
                        </div>
                        <div className="nav-item text-center">
                            <i className="far fa-calendar-alt"></i>
                            <a className="nav-link" onClick={getProducts}>Products</a>
                        </div>
                        <div className="nav-item text-center">
                            <i className="far fa-calendar-alt"></i>
                            <a className="nav-link" onClick={getSales}>Sales</a>
                        </div>
                        <div className="nav-item text-center">
                            <i className="far fa-calendar-alt"></i>
                            <a className="nav-link" onClick={getOrders}>Orders</a>
                        </div>
                        <div className="nav-item text-center">
                            <i className="far fa-calendar-alt"></i>
                            <a className="nav-link" onClick={getUsers}>Users</a>
                        </div>
                    </div>
                </div>

                <div className="col-10 bg-light">
                    <nav className="navbar navbar-expand-lg">
                        <div className="container">
                            <span className="h2">Employee List</span>
                            <div>
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <button className=" excel" type="button">Export to Excel</button>
                                    </li>
                                    <li className="nav-item">
                                    <button className="  new-employee-btn" type="button" onClick={addNewEmployee} > + New Employee</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>  <hr />  <br />

                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form">
                                    <i className="fa fa-search search-icon"></i>
                                    <input
                                        type="text"
                                        className="form-control form-input"
                                        placeholder="Search Employee"
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div> <hr />
                    
                    <table className="table custom-table">
                        <thead className="text-center align-middle">
                            <tr>
                                <th>
                                    <input type="checkbox" onChange={handleSelectAll} />
                                </th>
                                <th>Name</th>
                                <th>Mobile</th>
                                <th>Birth Date</th>
                                <th>Email</th>
                                <th>City</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='text-center align-middle'>
                            {employees
                                .filter((employee) => {
                                    return search.toLowerCase() === ''||
                                    (employee.firstName.toLowerCase().includes(search.toLowerCase()) ||
                                    employee.lastName.toLowerCase().includes(search.toLowerCase()));
                                })
                                .map((employee) =>
                            
                                <tr key={employee.id}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            onChange={(e) => handleCheckboxChange(employee.id, e.target.checked)}
                                            checked={selectedEmployees.includes(employee.id)}
                                        />
                                    </td>
                                    <td>{employee.firstName} {employee.lastName}</td>
                                    <td>{employee.mobile}</td>
                                    <td>{employee.dateOfBirth}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.city}</td>
                                    <td>
                                        <button className='view'  onClick={() => getEmployeeById(employee.id)}>View</button>
                                        <button className='edit'  onClick={() => updateEmployee(employee.id)} >Edit</button>
                                        <button className='delete'  onClick={selectedEmployees.length > 0 ? removeCheckedRows : () => removeCheckedAndRow(employee.id)}>Delete</button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    
                </div>
            </div>
        </div>


    )
}

export default ListEmployeeComponent;
