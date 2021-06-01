
import React, { useEffect, useState } from 'react'
import axiosInstance from '../helpers/axios';

const UserApi = (token) => {

    const [isAuth, setIsAuth] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [history, setHistory] = useState([]);
    const [trigger, setTrigger] = useState(false);

    const getUser = async () => {
        try {
            const res = await axiosInstance.get('/getUser', {
                headers: { Authorization: token }
            });
            // console.log(res);
            setIsAuth(true);
            res.data.role === 'admin' ? setIsAdmin(true) : setIsAdmin(false);
            setCartItems(res.data.cart);
        }
        catch (e) {
            console.log(e);
        }

        // setProducts(res.data.products);
    }

    const addToCart = async (product) => {
        // console.log(product);
        if (!isAuth)
            return alert("please login or Register to continue");
        let quan = 0;

        const check = cartItems.every((item) => {
            if (item._id === product._id) {
                quan = item.quantity;
            }
            return item._id !== product._id;
        })

        if (check) {
            // console.log("product", product)
            setCartItems(cartItems => [...cartItems, { ...product, quantity: 1 }]);
            await axiosInstance.patch('/addCart', { cart: [...cartItems, { ...product, quantity: 1 }] }, {
                headers: { Authorization: token }
            })
        }
        else {
            const remains = cartItems.filter((item) => item._id !== product._id);

            setCartItems(cartItems => [...remains, { ...product, quantity: quan + 1 }]);
            await axiosInstance.patch('/addCart', { cart: [...remains, { ...product, quantity: quan + 1 }] }, {
                headers: { Authorization: token }
            })
        }
        // console.log("cartItems", cartItems);
    }

    const getHistory = async () => {
        let hist;
        if (isAdmin) {
            hist = await axiosInstance.get('/payment', {
                headers: { Authorization: token }
            });
        }
        else {
            hist = await axiosInstance.get('/history', {
                headers: { Authorization: token }
            });
        }

        setHistory(hist.data)
    }

    useEffect(async () => {
        if (token) {

            await getHistory();

        }
    }, [token, trigger, isAdmin])

    useEffect(() => {
        getUser();
    }, [token])

    return {
        Auth: [isAuth, setIsAuth],
        isAdmin: [isAdmin, setIsAdmin],
        cart: [cartItems, setCartItems],
        addToCart: addToCart,
        History: [history, setHistory],
        Trigger: [trigger, setTrigger]

    }
}

export default UserApi
