
import React, { useEffect, useState } from 'react';
import { createContext } from "react";
import UserApi from '../api/auth.api.';
import CategoriesApi from '../api/category';
import Products from '../api/products.api';


export const GlobalState = createContext();

export const GlobalData = (props) => {

    const [token, setToken] = useState('');
    const [userReq, setuserReq] = useState('');

    // const refreshToken = async () => {
    //     const token = await axiosInstance.get('/refresh_token', {
    //         withCredentials: true
    //     })
    //     console.log(token);
    // }

    // useEffect(() => {
    //     refreshToken();
    // }, []);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        // console.log(accessToken);
        if (accessToken) {
            setToken(accessToken);
        }
    }, [])


    useEffect(() => {
        const userreq = localStorage.getItem('UserReq');
        if (userReq)
            setuserReq(userreq);
    }, [])

    const state = {
        Token: [token, setToken],
        // shopOrUser: [user, setuser],
        Products: Products(userReq),
        User: UserApi(token, userReq),
        Categories: CategoriesApi()
    }

    return (
        <GlobalState.Provider value={state}>
            {props.children}
        </GlobalState.Provider>
    )

}

