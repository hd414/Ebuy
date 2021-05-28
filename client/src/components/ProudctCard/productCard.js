import React from 'react';
import './productCard.css';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    return (

        <div className="container">

            <img src={product.images.url} alt="product" className="img-fruit" />
            <h3>{product.title}</h3>

            <p>
                {truncate(product.description, 20)}
            </p>


            <h4>Price : <span>{product.price}</span></h4>

            <Link to='#'>
                <input className="ip-add-cart" type="button" value="Add to cart" />
            </Link>
            <Link to={`/products/${product._id}`}>
                <input className="ip-view" type="button" value="View" />
            </Link>
        </div>

    )
}

export default ProductCard
