import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GlobalState } from '../../context/globalState';
import axiosInstance from '../../helpers/axios';
import './orderHistory.css';
import CustomModal from '../../components/Modal/modal.component'
import Modal from '../../components/Modal/modal.component';

const OrderHistory = () => {

    const state = useContext(GlobalState);
    const [token] = state.Token;
    const [history] = state.User.History;
    const [Shops, setShops] = state.User.Shops;
    const [isAdmin, setIsAdmin] = state.User.isAdmin;
    const [shopsMap, setShopsMap] = useState(new Map());
    const [trigger, setTrigger] = state.User.Trigger;



    const [show, setShow] = useState(false);
    const [data, setData] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = (user) => {
        setData(data => user);
        setShow(true);
    }


    useEffect(() => {
        if (!isAdmin) {
            let a = new Map();
            Shops.forEach((shop) => {
                a[shop._id] = shop;
            })
            setShopsMap(a);
            console.log(shopsMap)
        }

    }, [Shops])

    useEffect(() => {
        if (isAdmin) {
            history?.orders?.map((item) => {

            })
        }
    }, [history?.orders])

    const changeStatus = async (id) => {
        try {
            let Token = token;
            await axiosInstance.put('/orders/' + id, {}, {
                headers: { Authorization: Token }
            });
            setTrigger(trigger => !trigger);
        }
        catch (e) {
            alert("something wrong with server");
        }

    }


    console.log(history.orders);
    return (
        <>
            {show && <Modal data={data} setShow={setShow} handleClose={handleClose} />}
            <div className=" order-title" style={{ fontSize: "2rem", magin: "1rem auto" }}>
                Previous Orders
            </div>

            {
                history?.orders?.map((Item) => {

                    return (
                        <div className=" order-shopping-cart" key={Item._id}>
                            {!isAdmin && <h1 className=" order-cartShopName">{shopsMap[Item.shop_id]?.shopName.toUpperCase()}</h1>}

                            <span className=" order-stock">Date - {(new Date(Item.createdAt)).toDateString()}
                                <span style={{ marginLeft: "1rem" }}></span>  Time - {(new Date(Item.createdAt)).toLocaleTimeString()}
                            </span>
                            <br />
                            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
                                {!isAdmin && (shopsMap[Item.shop_id]?.homeDelivery ? <span className=" order-stock"> Home Delivery Available &#128077; </span>
                                    : <span className=" order-stock" style={{ color: 'red' }}> Home Delivery Not Available &#128542; </span>)
                                }
                                {!isAdmin && (<div className=" order-stock">
                                    {Item.status ?
                                        (<>order is Ready <i class="fa fa-check"></i></>) :
                                        <>order in Process <i class="fa fa-spinner fa-spin" aria-hidden="true"></i></>}
                                </div>)}
                            </div>
                            {

                                isAdmin && (
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <button
                                            className="order-order-button"
                                            onClick={() => handleShow(Item.user_id)}>
                                            view Details
                                        </button>
                                        <button
                                            className="order-order-button"
                                            disabled={Item.status}
                                            onClick={() => changeStatus(Item._id)}
                                            style={!Item.status ? { background: "green" } : { opacity: "0.5" }}>
                                            {Item.status ? "completed" : "Order prepared"}
                                        </button>
                                    </div>
                                )}
                            {
                                Item?.cart.map((item) => {
                                    return (
                                        <div key={item?._id} className=" order-item">


                                            <div className=" order-image">
                                                <img src={item?.images?.url} height="50%" alt="" />
                                            </div>

                                            <div className=" order-description">
                                                {/* <span>{item.category}</span> */}
                                                <span style={{ fontWeight: "600" }}>{item?.title}</span>
                                                {/* <span>{item?.description}</span> */}
                                            </div>

                                            <div className=" order-quantity">

                                                <input type="text" name="name" value={item?.quantity} onChange={() => { }} />

                                            </div>

                                            <div className=" order-total-price">{item?.price * item?.quantity}</div>


                                        </div>
                                    )
                                })
                            }


                        </div>
                    )
                })
            }





        </>
    )
}

export default OrderHistory
