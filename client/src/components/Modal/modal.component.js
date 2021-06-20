import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { GlobalState } from '../../context/globalState';
import axiosInstance from '../../helpers/axios';
import './modal.styles.css';

const Modal = ({ handleShow, handleClose, data }) => {

    const state = useContext(GlobalState);
    const [token] = state.Token;
    const [address, setAddress] = useState({
        city: "",
        street: "",
        state: ""
    })
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');

    useEffect(async () => {
        const res = await axiosInstance.get('/user/' + data, {
            headers: { Authorization: token }
        });

        console.log(res.data.user);
        setAddress(res.data.user.address);
        setName(res.data.user.name);
        setContact(res.data.user.contactNumber);

    }, [data])

    return (
        <>
            <div id="myModal" className="modal">
                <div className="modal-content">
                    <span className="close" onClick={handleClose}>&times;</span>
                    Name : <h3>{name}</h3>
                    Address: <h2>{address.street}</h2>
                    <h5>{address.city} , {address.state}</h5>
                    <br />
                    Phone : <h2>{contact}</h2>
                    <br />
                    <br />
                </div>
            </div>
        </>
    )
}

export default Modal
