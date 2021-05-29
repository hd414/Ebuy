import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import ProductCard from '../../../components/ProudctCard/productCard';
import { GlobalState } from '../../../context/globalState';
import './productDetails.css';

const ProductDetails = () => {


    const state = useContext(GlobalState);
    const [products] = state.Products.products;
    const addToCart = state.User.addToCart;
    const [productDetail, setProductDetail] = useState([]);
    const params = useParams();



    useEffect(() => {
        if (params.id)
            products.forEach((product) => {
                if (product._id === params.id)
                    setProductDetail(product);
            })
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
                        <h1 className="title">{productDetail.title}</h1>
                        {/* <span className="colorCat">mint green</span> */}
                        <div className="price">
                            <span className="before">&#x20B9;{productDetail.price + 10}</span>
                            <span className="current">&#x20B9;{productDetail.price}</span>
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
                        <h5>Description</h5>
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
                            <h5>Sold</h5>
                            <h4>{productDetail.sold}</h4>
                        </div>
                        {/* <div className="size">
                        <h5>size</h5>
                        <a href="#!" className="option">(UK 8)</a>
                    </div> */}
                        <div className="qty">
                            <h5>qty</h5>
                            <a href="#!" className="option">(1)</a>
                        </div>
                    </div>
                    <div className="footer">
                        <Link className="link" to='/cart' onClick={() => addToCart(productDetail)}>
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

                            return product.category == productDetail.category ?
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
