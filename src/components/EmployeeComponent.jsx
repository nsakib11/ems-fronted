
import React, { useState, useEffect } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom';



const EmployeeComponent = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [dateOfBirth, setDateofBirth] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [city, setCity] = useState('')
    const [street1, setStreet1] = useState('')
    const [street2, setStreet2] = useState('')
    const [state, setState] = useState('')
    const [postal, setPostal] = useState('')
    

 

    const {id} = useParams();
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        dateOfBirth: '',
        mobile: '',
        city: '',
        street1: '',
        street2: '',
        state: '',
        postal: '',
    })

    const navigator = useNavigate();

    useEffect(() => {

        if(id){
            getEmployee(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
                setDateofBirth(response.data.dateOfBirth);
                setMobile(response.data.mobile);
                setCity(response.data.city);
                setStreet1(response.data.street1);
                setStreet2(response.data.street2);
                setState(response.data.state);
                setPostal(response.data.postal);
            }).catch(error => {
                console.error(error);
            })
        }

    }, [id])
   

    function saveOrUpdateEmployee(e){
        e.preventDefault();

        if(validateForm()){

            const employee = {firstName, lastName, email, dateOfBirth, mobile, city, street1, street2, state, postal}
            console.log(employee)

            if(id){
                updateEmployee(id, employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees');
                }).catch(error => {
                    console.error(error);
                })
            } else {
                createEmployee(employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees')
                }).catch(error => {
                    console.error(error);
                })
            }
        }
    }

    function validateForm(){
        let valid = true;

        const errorsCopy = {... errors}

        if(firstName.trim()){
            errorsCopy.firstName = '';
        } else {
            errorsCopy.firstName = 'First name is required';
            valid = false;
        }

        if(lastName.trim()){
            errorsCopy.lastName = '';
        } else {
            errorsCopy.lastName = 'Last name is required';
            valid = false;
        }

        if(email.trim()){
            errorsCopy.email = '';
        } else {
            errorsCopy.email = 'Email is required';
            valid = false;
        }
        if(dateOfBirth.trim()){
            errorsCopy.dateOfBirth = '';
        } else {
            errorsCopy.dateOfBirth = 'Date of Birth is required';
            valid = false;
        }
        if(mobile.trim()){
            errorsCopy.mobile = '';
        } else {
            errorsCopy.mobile = 'Mobile is required';
            valid = false;
        }
        if(city.trim()){
            errorsCopy.city = '';
        } else {
            errorsCopy.city = 'City is required';
            valid = false;
        }
        if(street1.trim()){
            errorsCopy.street1 = '';
        } else {
            errorsCopy.street1 = 'Street Address is required';
            valid = false;
        }
        if(street2.trim()){
            errorsCopy.street2 = '';
        } else {
            errorsCopy.street2 = 'Street Address Line 2 is required';
            valid = false;
        }
        if(state.trim()){
            errorsCopy.state = '';
        } else {
            errorsCopy.state = 'State is required';
            valid = false;
        }
        if(postal.trim()){
            errorsCopy.postal = '';
        } else {
            errorsCopy.postal = 'Postal is required';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }

    function pageTitle(){
        if(id){
            return <h2 className=''> Employee Form Edit</h2>
        }else{
            return <h2 className=''>Employee Form</h2>
        }
    }
    
  return (
    
    <div className="container mt-3">
        {pageTitle()} <br /> <hr />

        <form>
            <div className="row">
                <div className="form-group col-md">
                    <label className="form-label">Full Name</label>
                    <div className="row">
                        <div className="col">
                            <input type="text"  value={firstName}
                            className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                            onChange={(e) => setFirstName(e.target.value)}/>
                            {errors.firstName && <div className="invalid-feedback"> {errors.firstName} </div>}
                            <small id="firstNameHelp" className="form-text text-muted">First Name</small>
                        </div>
                        <div className="col">
                            <input type="text"  value={lastName}
                            className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                            onChange={(e) => setLastName(e.target.value)}/>
                            {errors.lastName && <div className="invalid-feedback"> {errors.lastName} </div>}
                            <small id="lastNameHelp" className="form-text text-muted">Last Name</small>
                        </div>
                    </div>
                </div>

                <div className="form-group col-md">
                    <label htmlFor="dob" className="form-label">Date of Birth</label>
                        <input type="date" value={dateOfBirth}
                            className={`form-control ${errors.dateOfBirth ? 'is-invalid' : ''}`}
                            onChange={(e) => setDateofBirth(e.target.value)}/>
                            {errors.dateOfBirth && <div className="invalid-feedback"> {errors.dateOfBirth} </div>}
                        <small id="dobHelp" className="form-text text-muted">Date</small>
                </div>
            </div> <br />
            
            <div className="row">
                <div className="form-group col-md">
                    <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" value={email}
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            onChange={(e) => setEmail(e.target.value)}/>
                            {errors.email && <div className="invalid-feedback"> {errors.email} </div>}
                        <small id="emailHelp" className="form-text text-muted">example@example.com</small>
                </div>

                <div className="form-group col-md">
                    <label htmlFor="phone" className="form-label">Phone Number</label>
                        <input type="number" placeholder="(000) 000-0000" value={mobile}
                            className={`form-control ${errors.mobile ? 'is-invalid' : ''}`}
                            onChange={(e) => setMobile(e.target.value)}/>
                            {errors.mobile && <div className="invalid-feedback"> {errors.mobile} </div>}
                        <small id="phoneHelp" className="form-text text-muted">Please enter a valid phone number.</small>
                </div>
            </div> <br />

            <div className="row">
                <div className="form-group">
                        <label htmlFor="address" className="form-label">Address</label>
                       <div>
                       <input type="text"  value={street1}
                                className={`form-control ${errors.street1 ? 'is-invalid' : ''}`}
                                onChange={(e) => setStreet1(e.target.value)}/>
                                {errors.street1 && <div className="invalid-feedback"> {errors.street1} </div>}
                        <small id="addressHelp" className="form-text text-muted">Street Address</small>
                       </div>
                    
                        <div className="street2">
                        <input type="text"  value={street2}
                                className={`form-control ${errors.street2 ? 'is-invalid' : ''}`}
                                onChange={(e) => setStreet2(e.target.value)}/>
                                {errors.street2 && <div className="invalid-feedback"> {errors.street2} </div>}
                        <small id="address2Help" className="form-text text-muted">Street Address Line 2</small>
                        </div>
                    
                    <div className="row mt-2">
                        <div className="col city">
                            <input type="text" value={city}
                                className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                                onChange={(e) => setCity(e.target.value)} />
                                {errors.city && <div className="invalid-feedback"> {errors.city} </div>}
                            <small id="cityHelp" className="form-text text-muted">City</small>
                        </div>
                        <div className="col">
                            <input type="text"  value={state}
                                className={`form-control ${errors.state ? 'is-invalid' : ''}`}
                                onChange={(e) => setState(e.target.value)}/>
                                {errors.state && <div className="invalid-feedback"> {errors.state} </div>}
                            <small id="stateHelp" className="form-text text-muted">State / Province</small>
                        </div>
                    </div>
                    <div className="col postal">
                            <input type="text"  value={postal}
                                className={`form-control ${errors.postal ? 'is-invalid' : ''}`}
                                onChange={(e) => setPostal(e.target.value)}/>
                                {errors.postal && <div className="invalid-feedback"> {errors.postal} </div>}
                            <small id="postalHelp" className="form-text text-muted">Postal / Zip Code</small>
                    </div>
                </div>      
            </div><br />

            <div className="text-center">
                <button type="button" className="submit" onClick={saveOrUpdateEmployee}>Submit</button>
            </div>

        </form>
    </div>
  )
}

export default EmployeeComponent