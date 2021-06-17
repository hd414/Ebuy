import React, { useContext, useEffect, useState } from 'react';
import { GlobalState } from '../../context/globalState';
import axiosInstance from '../../helpers/axios';
import './cart.styles.css';
import Payment from '../payment/PaypalButton';

const Cart = () => {

    const state = useContext(GlobalState);
    const [cartItems, setCartItems] = state.User.cart;
    const [setTrigger] = state.User.Trigger;
    const [total, setTotal] = useState(0);
    const [token] = state.Token;
    const [Shops, setShops] = state.User.Shops;
    const [cartitems, setcartitems] = useState({});
    const [shopsMap, setShopsMap] = useState(new Map());
    const [cartShopMap, setcartShopMap] = useState(new Map());


    useEffect(() => {
        let a = new Map();
        Shops.forEach((shop) => {
            a[shop._id] = shop;
        })
        setShopsMap(a);
        console.log(shopsMap)
    }, [Shops])




    useEffect(() => {
        const a = {};
        console.log(cartItems);
        // const b = cartShopMap;
        cartItems.forEach((item) => {
            if (a[item?.shop] === undefined)
                a[item?.shop] = new Set()

            // b[item?.shop] = shopsMap[item?.shop];
            a[item?.shop].add(item);
        });
        setcartitems(a);
        // setcartShopMap(b);
        console.log(cartitems)

    }, [cartItems])



    const changeInCart = async (cartItems) => {
        await axiosInstance.patch('/addCart', { cart: cartItems }, {
            headers: { Authorization: token }
        })
    }

    const transferSuccess = async (payment) => {
        const { paymentID, address } = payment;

        await axiosInstance.post('/payment', { cartItems, paymentID, address }, {
            headers: { Authorization: token }
        })

        setCartItems([])
        changeInCart([])
        setTrigger(trigger => !trigger);
        alert("You have successfully placed an order.")
    }

    const getTotal = () => {
        const grandTotal = cartItems?.reduce((acc, item) => {
            return acc + (item.price * item.quantity)
        }, 0)

        setTotal(grandTotal)
    }



    const RemoveItem = (item) => {
        if (window.confirm("Do you want to delete this item from the cart")) {
            const newCartItems = cartItems.filter((cart) => {
                return cart._id !== item._id
            })

            setCartItems(newCartItems)
        }
    }

    const increment = (item) => {
        const newCartItems = cartItems.map((cart) => {
            if (cart._id === item._id) {
                return { ...cart, quantity: cart.quantity + 1 }
            }
            else {
                return cart;
            }
        });
        setCartItems(newCartItems)
    }


    const decrement = (item) => {
        const newCartItems = cartItems.map((cart) => {
            if (cart._id === item._id) {
                if (cart.quantity > 1)
                    return { ...cart, quantity: cart.quantity - 1 }
                else {
                    return cart
                }
            }
            else {
                return cart;
            }
        });
        setCartItems(newCartItems)
    }

    useEffect(() => {
        getTotal();
        changeInCart(cartItems);
    }, [cartItems])


    if (cartItems?.length === 0) {
        return (
            <h1 style={{ textAlign: "center", color: "Red", fontSize: "5rem" }}>Cart is Empty</h1>
        )
    }

    const getAmount = (value) => {
        let amount = 0;
        [...value].forEach((item) => {
            amount += item.price * item.quantity;
        })

        return amount;
    }


    return (
        <>
            <div >

                <div className="title" style={{ fontSize: "2rem", magin: "1rem auto" }}>
                    Shopping Bag
                </div>
                {
                    Object.entries(cartitems).map(([key, value]) => {

                        return (
                            <div className="shopping-cart" key={key}>
                                <h1 className="cartShopName">{shopsMap[key]?.shopName.toUpperCase()}</h1>
                                {shopsMap[key]?.homeDelivery ? <span class="stock"> Home Delivery Available &#128077; </span>
                                    : <span class="stock" style={{ color: 'red' }}> Home Delivery Not Available &#128542; </span>
                                }

                                {
                                    [...value].map((item) => {
                                        return (
                                            <div key={item._id} className="item">
                                                <div className="buttons">
                                                    <span className="delete-btn" onClick={() => RemoveItem(item)}>X</span>
                                                    <span className="like-btn"></span>
                                                </div>

                                                <div className="image">
                                                    <img src={item.images.url} height="100%" alt="" />
                                                </div>

                                                <div className="description">
                                                    {/* <span>{item.category}</span> */}
                                                    <span style={{ fontWeight: "600" }}>{item.title}</span>
                                                    <span>{item.description}</span>
                                                </div>

                                                <div className="quantity">
                                                    <button className="plus-btn" type="button" name="button" onClick={() => increment(item)}>
                                                        +
                                                    </button>
                                                    <input type="text" name="name" value={item.quantity} onChange={() => { }} />
                                                    <button className="minus-btn" type="button" name="button" onClick={() => decrement(item)}>
                                                        {/* <img src="minus.svg" alt="" /> */}
                                                        -
                                                    </button>
                                                </div>

                                                <div className="total-price">{item.price * item.quantity}</div>
                                            </div>
                                        )
                                    })
                                }

                                <h3 style={{ padding: "0.5rem" }}>Total : {getAmount(value)}</h3>
                            </div>
                        )
                    })
                }

                {

                    // cartItems?.map((item) => {
                    //     return (
                    //         <div key={item._id} className="item">
                    //             <div className="buttons">
                    //                 <span className="delete-btn" onClick={() => RemoveItem(item)}>X</span>
                    //                 <span className="like-btn"></span>
                    //             </div>

                    //             <div className="image">
                    //                 <img src={item.images.url} height="100%" alt="" />
                    //             </div>

                    //             <div className="description">

                    //                 <span style={{ fontWeight: "600" }}>{item.title}</span>
                    //                 <span>{item.description}</span>
                    //             </div>

                    //             <div className="quantity">
                    //                 <button className="plus-btn" type="button" name="button" onClick={() => increment(item)}>
                    //                     +
                    //                 </button>
                    //                 <input type="text" name="name" value={item.quantity} onChange={() => { }} />
                    //                 <button className="minus-btn" type="button" name="button" onClick={() => decrement(item)}>
                    //                     {/* <img src="minus.svg" alt="" /> */}
                    //                     -
                    //                 </button>
                    //             </div>

                    //             <div className="total-price">{item.price * item.quantity}</div>
                    //         </div>
                    //     )
                    // })
                }

                <div style={{ textAlign: "center" }}>
                    <h2>
                        Grand Total :{total}
                    </h2>
                </div>
                {/* <Payment total={total} transferSuccess={transferSuccess} /> */}

            </div>

        </>
    )
}

export default Cart
