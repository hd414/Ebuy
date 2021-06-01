import React, { useContext, useState } from 'react';
import './productCard.css';
import { Link } from 'react-router-dom';
import { GlobalState } from '../../context/globalState';
import axiosInstance from '../../helpers/axios';
import Loader from '../Loader/loader.component';

const ProductCard = ({ product, deleteProduct, loading }) => {

    const state = useContext(GlobalState);

    const [isAdmin, setIsAdmin] = state.User.isAdmin;
    const [products, setProducts] = state.Products.products;
    const addToCart = state.User.addToCart;




    const CheckBoxHandler = () => {
        const updatedProdcuts = [...products];
        updatedProdcuts.forEach((pro) => {
            if (pro._id === product._id) {
                pro.checked = !pro.checked;
            }
        })
        setProducts(products => [...updatedProdcuts]);
        // console.log(products);
    }



    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    const adminBtn = <>
        <Link to='#' onClick={deleteProduct}>
            <input className="ip-add-cart" type="button" value="Delete" />
        </Link>
        <Link to={`/edit_product/${product._id}`}>
            <input className="ip-view" type="button" value="Edit" />
        </Link>
    </>

    const UserBtn = <>
        <Link to='#' onClick={() => addToCart(product)}>
            <input className="ip-add-cart" type="button" value="Add to cart" />
        </Link>
        <Link to={`/products/${product._id}`}>
            <input className="ip-view" type="button" value="View" />
        </Link>
    </>


    // if (loading) {
    //     return (
    //         <div className="container">
    //             <Loader />
    //         </div>
    //     )
    // }



    return (
        <>

            <div className="container">

                {
                    isAdmin && <input type="checkbox"
                        className="product_checkbox"
                        checked={product.checked}
                        onChange={CheckBoxHandler}

                    />
                }
                <img src={product.images.url} alt="product" className="img-fruit" />
                <h3>{product.title}</h3>

                <p>
                    {truncate(product.description, 20)}
                </p>


                <h4>Price : <span>{product.price}</span></h4>

                {isAdmin ? adminBtn : UserBtn}
            </div>

        </>

    )
}

export default ProductCard
