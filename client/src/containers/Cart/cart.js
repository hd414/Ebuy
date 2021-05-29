import React, { useContext, useEffect, useState } from 'react';
import { GlobalState } from '../../context/globalState';
import axiosInstance from '../../helpers/axios';
import './cart.styles.css';
import Payment from '../payment/PaypalButton'
import axios from 'axios';
const Cart = () => {

    const state = useContext(GlobalState);
    const [cartItems, setCartItems] = state.User.cart;
    const [total, setTotal] = useState(0);
    const [token] = state.Token;




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
        alert("You have successfully placed an order.")
    }

    const getTotal = () => {
        const grandTotal = cartItems.reduce((acc, item) => {
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


    if (cartItems.length === 0) {
        return (
            <h1 style={{ textAlign: "center", color: "Red", fontSize: "5rem" }}>Cart is Empty</h1>
        )
    }



    return (
        <>
            <div className="shopping-cart">

                <div className="title">
                    Shopping Bag
                </div>


                {
                    cartItems.map((item) => {
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
                                    <span>{item.category}</span>
                                    <span>{item.title}</span>
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

                <div>
                    Total :{total}
                </div>

                <Payment total={total} transferSuccess={transferSuccess} />

            </div>

        </>
    )
}

export default Cart
