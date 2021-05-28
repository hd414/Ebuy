import React, { useState } from 'react';
import axiosInstance from '../../helpers/axios';
import './signup.styles.css';


const Signup = () => {


    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    })


    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    const FormSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('/signup', { ...user });

            localStorage.setItem('firstSignup', true);

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
                    <input type="text" className="form-field animation a3" placeholder="Name" value={user.name} onChange={onChangeHandler} name="name" required />
                    <input type="email" className="form-field animation a3" placeholder="Email Address" value={user.email} onChange={onChangeHandler} name="email" required />
                    <input type="password" className="form-field animation a4" placeholder="Password" value={user.password} onChange={onChangeHandler} name="password" required />
                    <p className="animation a5"><a href="#">Forgot Password</a></p>
                    <button className="animation a6"  >SignUp</button>
                </form>
            </div>
            <div className="right"></div>
        </div>


    )
}



export default Signup
