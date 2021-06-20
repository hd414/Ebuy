import React, { useState } from 'react';
import axiosInstance from '../../helpers/axios';
import '../Signin/signin.styles.css';


const Signup = () => {


    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        contactNumber: '',
        city: '',
        state: '',
        street: ''
    })


    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    const FormSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const address = {
                city: user.city,
                state: user.state,
                street: user.street
            }
            await axiosInstance.post('/signup', { ...user, address });

            // localStorage.setItem('firstSignup', true);

            window.location.href = "/";
        }
        catch (e) {
            console.log(e);
        }
    }

    return (

        <div className="Formcontainer">
            <div className="left">
                <div className="Formheader">
                    <h2 className="animation a1">Welcome </h2>
                    <h4 className="animation a2">SignUp using email and password</h4>
                </div>

                <form className="form" onSubmit={FormSubmitHandler}>
                    <input type="text"
                        className="form-field animation a3"
                        placeholder="Name" value={user.name}
                        onChange={onChangeHandler}
                        name="name" required />
                    <input
                        type="email"
                        className="form-field animation a3"
                        placeholder="Email Address"
                        value={user.email}
                        onChange={onChangeHandler}
                        name="email" required />
                    <input
                        type="password"
                        className="form-field animation a4"
                        placeholder="Password"
                        value={user.password}
                        onChange={onChangeHandler}
                        name="password" required />
                    <input
                        type="tel"
                        className="form-field animation a4"
                        placeholder="Mobile Number"
                        value={user.contactNumber}
                        minLength="10"
                        maxLength="10"
                        onChange={onChangeHandler}
                        name="contactNumber" required />
                    <input
                        type="text"
                        className="form-field animation a4"
                        placeholder="city"
                        value={user.city}
                        onChange={onChangeHandler}
                        name="city" required />
                    <input
                        type="text"
                        className="form-field animation a4"
                        placeholder="state"
                        value={user.state}
                        onChange={onChangeHandler}
                        name="state" required />
                    <input
                        type="text"
                        className="form-field animation a4"
                        placeholder="street / address"
                        value={user.street}
                        onChange={onChangeHandler}
                        name="street" required />


                    <p className="animation a5"><a href="#"></a></p>
                    <button className="animation a6"  >SignUp</button>
                </form>
            </div>
            <div className="right"></div>
        </div>


    )
}



export default Signup
