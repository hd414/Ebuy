
import React, { useEffect, useState } from 'react'
import axiosInstance from '../helpers/axios';

const UserApi = (token) => {

    const [isAuth, setIsAuth] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const getUser = async () => {
        try {
            const res = await axiosInstance.get('/getUser', {
                headers: { Authorization: token }
            });
            console.log(res);
            setIsAuth(true);
            res.data.role === 'admin' ? setIsAdmin(true) : setIsAdmin(false);
        }
        catch (e) {
            console.log(e);
        }

        // setProducts(res.data.products);
    }

    useEffect(() => {
        getUser();
    }, [token])

    return {
        Auth: [isAuth, setIsAuth],
        isAdmin: [isAdmin, setIsAdmin]
    }
}

export default UserApi
