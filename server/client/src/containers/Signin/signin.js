import React, { useState } from 'react';
import { useHistory } from 'react-router';
import axiosInstance from '../../helpers/axios';
import './signin.styles.css';
const Signin = () => {


    const [User, setUser] = useState({
        email: '',
        password: ''
    })

    // const history = useHistory();


    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...User, [name]: value });
    }

    const FormSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            // console.log(User)
            const res = await axiosInstance.post('/signin', { ...User });
            const user = res.data.user;
            const accessToken = res.data.accessToken;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('UserReq', "getUser");
            // localStorage.setItem('user', JSON.stringify(user));
            // console.log(user, token)
            // localStorage.setItem('firstLogin', true);

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
                    <h2 className="animation a1">Welcome Back </h2>
                    <h4 className="animation a2">SignIn using email and password</h4>
                </div>

                <form className="form" onSubmit={FormSubmitHandler}>
                    <input type="email" className="form-field animation a3" placeholder="Email Address" value={User.email} onChange={onChangeHandler} name="email" required />
                    <input type="password" className="form-field animation a4" placeholder="Password" value={User.password} onChange={onChangeHandler} name="password" required />
                    <p className="animation a5"><a href="#">Forgot Password</a></p>
                    <button className="animation a6"  >LOGIN</button>
                </form>
            </div>
        </div>

    )
}


export default Signin