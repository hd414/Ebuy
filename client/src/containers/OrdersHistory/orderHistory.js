import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GlobalState } from '../../context/globalState';
import axiosInstance from '../../helpers/axios';
import './orderHistory.css';

const OrderHistory = () => {

    const state = useContext(GlobalState);
    const [history] = state.User.History;
    const [Shops, setShops] = state.User.Shops;
    const [isAdmin, setIsAdmin] = state.User.isAdmin;
    const [shopsMap, setShopsMap] = useState(new Map());

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

    const getUserData = async (id) => {
        const res = await axiosInstance.get("/user/" + id);
        console.log(res);
        return "hell0"
    }

    useEffect(() => {
        if (isAdmin) {
            history?.orders?.map((item) => {

            })
        }
    }, [history?.orders])

    console.log(history.orders);
    return (
        <>

            <div className="title" style={{ fontSize: "2rem", magin: "1rem auto" }}>
                Previous Orders
            </div>
            {
                history?.orders?.map((Item) => {

                    return (
                        <div className="shopping-cart" key={Item._id}>
                            {!isAdmin && <h1 className="cartShopName">{shopsMap[Item.shop_id]?.shopName.toUpperCase()}</h1>}
                            <span className="stock">Date - {(new Date(Item.createdAt)).toDateString()} <span style={{ marginLeft: "1rem" }}></span>  Time - {(new Date(Item.createdAt)).toLocaleTimeString()}</span>
                            {!isAdmin && (shopsMap[Item.shop_id]?.homeDelivery ? <span className="stock"> Home Delivery Available &#128077; </span>
                                : <span className="stock" style={{ color: 'red' }}> Home Delivery Not Available &#128542; </span>)
                            }
                            <div className="stock">{Item.status ? "order is Ready" : "order in process"}</div>
                            {
                                Item?.cart.map((item) => {
                                    return (
                                        <div key={item?._id} className="item">


                                            <div className="image">
                                                <img src={item?.images?.url} height="80%" alt="" />
                                            </div>

                                            <div className="description">
                                                {/* <span>{item.category}</span> */}
                                                <span style={{ fontWeight: "600" }}>{item?.title}</span>
                                                {/* <span>{item?.description}</span> */}
                                            </div>

                                            <div className="quantity">

                                                <input type="text" name="name" value={item?.quantity} onChange={() => { }} />

                                            </div>

                                            <div className="total-price">{item?.price * item?.quantity}</div>


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
