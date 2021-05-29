import React, { useContext } from 'react';
import './productCard.css';
import { Link } from 'react-router-dom';
import { GlobalState } from '../../context/globalState';

const ProductCard = ({ product }) => {

    const state = useContext(GlobalState);
    // console.log(state);
    // const [isAuth, setIsAuth] = state.User.Auth;
    const [isAdmin, setIsAdmin] = state.User.isAdmin;
    const addToCart = state.User.addToCart;




    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    const adminBtn = <>
        <Link to='#'>
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


    return (

        <div className="container">

            {
                isAdmin && <input type="checkbox" className="product_checkbox" checked={product.checked} />
            }
            <img src={product.images.url} alt="product" className="img-fruit" />
            <h3>{product.title}</h3>

            <p>
                {truncate(product.description, 20)}
            </p>


            <h4>Price : <span>{product.price}</span></h4>

            {isAdmin ? adminBtn : UserBtn}
        </div>

    )
}

export default ProductCard
