import React, { useContext } from 'react';
import './productCard.css';
import { Link, useHistory } from 'react-router-dom';
import { GlobalState } from '../../context/globalState';


const ProductCard = ({ product, deleteProduct }) => {

    const state = useContext(GlobalState);
    const history = useHistory();

    const [isAdmin] = state.User.isAdmin;
    const [products, setProducts] = state.Products.products;
    const [shopProducts, setShopProducts] = state.User.ShopProducts;
    const addToCart = state.User.addToCart;




    const CheckBoxHandler = () => {
        const updatedProdcuts = [...shopProducts];
        updatedProdcuts.forEach((pro) => {
            if (pro._id === product._id) {
                pro.checked = !pro.checked;
            }
        })
        setShopProducts(shopProducts => [...updatedProdcuts]);
        // console.log(products);
    }



    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    const adminBtn = <>
        <div className="product-btn-grp">
            <Link to='#' onClick={deleteProduct}>
                <button className="buy-product">
                    <i className="fa fa-trash ficon" aria-hidden="true"></i>

                </button>
                {/* <input className="ip-add-cart" type="button" value="Delete" /> */}
            </Link>
            <Link to={`/edit_product/${product._id}`}>
                <button className="buy-product">
                    <i className="fa fa-edit ficon" aria-hidden="true"></i>

                </button>
                {/* <input className="ip-view" type="button" value="Edit" /> */}
            </Link>
        </div>
    </>

    const UserBtn = <>
        <div className="product-btn-grp">
            <Link to='#' onClick={() => addToCart(product)}>
                <button className="buy-product">
                    <i className="fa fa-shopping-cart ficon" aria-hidden="true"></i></button>
                {/* <input className="ip-add-cart" type="button" value="Add to cart" /> */}
            </Link>
            <Link to={`/products/${product._id}`}>
                <button className="buy-product"><i className="fa fa-eye ficon" aria-hidden="true"></i></button>
                {/* <input className="ip-view" type="button" value="View" /> */}
            </Link>
        </div>
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
            {/* 
            <div className="container">

                {
                    isAdmin && <input type="checkbox"
                        className="product_checkbox"
                        checked={product.checked}
                        onChange={CheckBoxHandler}

                    />
                }
                <img src={product.images.url} alt="product" className="img-fruit" />
                <h4 className="product-title">{product.title}</h4>

                <p>
                    {truncate(product.description, 20)}
                </p>


                <h4>Price : <span>{product.price}</span></h4>

                {isAdmin ? adminBtn : UserBtn}
            </div> */}

            <div className="content" >
                {
                    isAdmin && <input type="checkbox"
                        className="product_checkbox"
                        checked={product.checked}
                        onChange={CheckBoxHandler}

                    />
                }
                <img src={product.images.url} alt="product" className="img" />
                <h2 className="product-title">{product.title}</h2>
                {/* <p className="product-desc">{truncate(product.description, 20)}</p> */}
                <div className="product-price" style={{ fontSize: "1.2rem", fontWeight: "600" }}>
                    <span>{product.price}</span>
                    <span>{product.quantity}</span>
                </div>
                {/* <ul className="product-rating">
                    <li><i className="fa fa-star" aria-hidden="true"></i></li>
                    <li><i className="fa fa-star" aria-hidden="true"></i></li>
                    <li><i className="fa fa-star" aria-hidden="true"></i></li>
                    <li><i className="fa fa-star" aria-hidden="true"></i></li>
                    <li><i className="fa fa-star" aria-hidden="true"></i></li>
                </ul> */}
                {isAdmin ? adminBtn : UserBtn}

            </div>

        </>

    )
}

export default ProductCard
