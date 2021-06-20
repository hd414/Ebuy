import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import ProductCard from '../../../components/ProudctCard/productCard';
import { GlobalState } from '../../../context/globalState';
import axiosInstance from '../../../helpers/axios';
import './productDetails.css';

const ProductDetails = () => {


    const state = useContext(GlobalState);
    const [products] = state.Products.products;
    const addToCart = state.User.addToCart;
    const [productDetail, setProductDetail] = useState([]);
    const params = useParams();
    const [quan, setQuan] = useState(0);

    console.log(productDetail);

    const addToCartHandler = () => {
        if (quan == 0)
            addToCart(productDetail);
        else {
            addToCart(productDetail, quan);
        }
    }

    useEffect(async () => {
        if (params.id) {
            const getProduct = async () => {
                const res = await axiosInstance.get('/products/' + params.id);
                console.log(res.data.product)
                setProductDetail(res.data.product)
            }

            getProduct();

        }


    }, [params.id, products])


    // console.log(productDetail);

    return (
        <>
            <div className="productContainer">
                <div className="product-image">
                    {/* <img src="http://co0kie.github.io/codepen/nike-product-page/nikeLogo.png" alt="" className="product-logo" /> */}
                    <img src={productDetail?.images?.url} alt="" className="product-pic" />
                    {/* <div className="dots">
                    <a href="#!" className="active"><i>1</i></a>
                    <a href="#!"><i>2</i></a>
                    <a href="#!"><i>3</i></a>
                    <a href="#!"><i>4</i></a>
                </div> */}
                </div>

                <div className="product-details">
                    <header>
                        <h1 className="ProductDetail_title">{productDetail?.title}</h1>
                        {/* <span className="colorCat">mint green</span> */}
                        <div className="price">
                            <span className="before">&#x20B9;{productDetail?.price + 10}</span>
                            <span className="current">&#x20B9;{productDetail?.price}</span>
                        </div>
                        <div className="rate">
                            <a href="#!" className="active">★</a>
                            <a href="#!" className="active">★</a>
                            <a href="#!" className="active">★</a>
                            <a href="#!">★</a>
                            <a href="#!">★</a>
                        </div>
                    </header>
                    <article>
                        <h2>Shop</h2>
                        <p style={{ fontSize: "2rem", color: "black" }}>{productDetail?.shop?.shopName}</p>
                        <h2>Description</h2>
                        <p>{productDetail?.description}</p>
                    </article>
                    <article>
                        <p>{productDetail?.content}</p>
                    </article>
                    <div className="controls">
                        <div className="color">
                            {/* <h5>color</h5>
                        <ul>
                            <li><a href="#!" className="colors color-bdot1 active"></a></li>
                            <li><a href="#!" className="colors color-bdot2"></a></li>
                            <li><a href="#!" className="colors color-bdot3"></a></li>
                            <li><a href="#!" className="colors color-bdot4"></a></li>
                            <li><a href="#!" className="colors color-bdot5"></a></li>
                        </ul> */}
                            {/* <h5>Sold</h5>
                            <h4>{productDetail.sold}</h4> */}
                        </div>
                        {/* <div className="size">
                            <h5>Shop</h5>
                            <a href="#!" className="option">{productDetail.shop.shopName}</a>
                        </div> */}
                        <div className="qty">
                            <h5>qty</h5>
                            <input type="number" className="qty-option" value={quan} min="0" onChange={(e) => { setQuan(quan => e.target.value) }} />
                        </div>
                    </div>
                    <div className="productDetails_footer">
                        <Link className="link" to='/cart' onClick={addToCartHandler}>
                            <button type="button" >
                                <img src="http://co0kie.github.io/codepen/nike-product-page/cart.png" alt="" />
                                <span>add to cart</span>
                            </button>
                        </Link>
                        <a href="#!"><img src="http://co0kie.github.io/codepen/nike-product-page/share.png" alt="" /></a>
                    </div>
                </div>

            </div>


            <div className="releatedProductsContainer">

                <h1>Related Products</h1>

                <div className="relatedProducts">
                    {
                        products.map((product) => {

                            return product.category === productDetail.category ?
                                <ProductCard key={product._id} product={product} />
                                : null
                        })
                    }
                </div>

            </div>
        </>


    )
}

export default ProductDetails
