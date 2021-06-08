import React, { useState } from 'react';
import axiosInstance from '../../helpers/axios';
import '../Signin/signin.styles.css';


const Signup = () => {


    const [shop, setShop] = useState({
        shopName: '',
        email: '',
        password: '',
        contactNumber: '',
        city: '',
        state: '',
        street: '',
        homeDelivery: 'true',
        Options: ['true', 'false'],
    })

    // const [images, setImages] = useState(false)
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setShop({ ...shop, [name]: value });
    }


    const FormSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const address = {
                city: shop.city,
                state: shop.state,
                street: shop.street
            }

            if (!file) return alert("File not exist.")

            if (file.size > 1024 * 1024) // 1mb
                return alert("Size too large!")

            if (file.type !== 'image/jpeg' && file.type !== 'image/png') // 1mb
                return alert("File format is incorrect.")


            let formData = new FormData()
            formData.append('file', file)

            setLoading(true)
            const res = await axiosInstance.post('/uploads', formData, {
                headers: { 'content-type': 'multipart/form-data' }
            })

            await axiosInstance.post('/admin/signup', { ...shop, address, shopPic: res.data });

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
                    <h2 className="animation a1">Sell With Us </h2>
                    <h4 className="animation a2">SignUp using email and password</h4>
                </div>

                <form className="form" onSubmit={FormSubmitHandler}>
                    <input type="text"
                        className="form-field animation a3"
                        placeholder="shop Name" value={shop.shopName}
                        onChange={onChangeHandler}
                        name="shopName" required />
                    <input
                        type="email"
                        className="form-field animation a3"
                        placeholder="Email Address"
                        value={shop.email}
                        onChange={onChangeHandler}
                        name="email" required />
                    <input
                        type="password"
                        className="form-field animation a4"
                        placeholder="Password"
                        value={shop.password}
                        onChange={onChangeHandler}
                        name="password" required />
                    <input
                        type="tel"
                        className="form-field animation a4"
                        placeholder="Mobile Number"
                        value={shop.contactNumber}
                        minLength="10"
                        maxLength="10"
                        onChange={onChangeHandler}
                        name="contactNumber" required />
                    <input
                        type="text"
                        className="form-field animation a4"
                        placeholder="city"
                        value={shop.city}
                        onChange={onChangeHandler}
                        name="city" required />
                    <input
                        type="text"
                        className="form-field animation a4"
                        placeholder="state"
                        value={shop.state}
                        onChange={onChangeHandler}
                        name="state" required />
                    <input
                        type="text"
                        className="form-field animation a4"
                        placeholder="street / address"
                        value={shop.street}
                        onChange={onChangeHandler}
                        name="street" required />
                    <label className="form-label animation a4" htmlFor="shopPic" >Upload a relatable image</label>
                    <input
                        type="file" id="shopPic"
                        name="file" placeholder="image"
                        className="form-field animation a4"
                        onChange={(e) => { console.log(e.target.files[0]); setFile(e.target.files[0]) }}
                        required />
                    <label className="form-label animation a4" htmlFor="homeDel" >Home Delievery ?</label>
                    <select
                        id="homeDel"
                        className="form-field animation a4"
                        name='homeDelivery'
                        onChange={onChangeHandler}>
                        {shop.Options.map(i => i == shop.homeDelivery ? (
                            <option key={i} value={i} selected>
                                {i == 'true' ? `Yes, we are open for home delievery` :
                                    `We don't do that here`}
                            </option>
                        ) : (<option key={i} value={i}>{i == 'true' ? `Yes, we are open for home delievery` :
                            `We don't do that here`}</option>))}
                    </select>



                    <p className="animation a5"><a href="#"></a></p>
                    <button className="animation a6"  >SignUp</button>
                </form>
            </div>
            <div className="right"></div>
        </div>


    )
}



export default Signup
