import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { createContext } from "react";
import UserApi from '../api/auth.api.';
import Products from '../api/products.api';
import axiosInstance from '../helpers/axios';

export const GlobalState = createContext();

export const GlobalData = (props) => {

    const [token, setToken] = useState('');

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

    const state = {
        Token: [token, setToken],
        Products: Products(),
        User: UserApi(token)
    }

    return (
        <GlobalState.Provider value={state}>
            {props.children}
        </GlobalState.Provider>
    )

}

