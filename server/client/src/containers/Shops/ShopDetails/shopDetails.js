import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ProductCard from '../../../components/ProudctCard/productCard';
import axiosInstance from '../../../helpers/axios';
import './shopDetails.css';

const ShopDetails = () => {

    const parmas = useParams();


    const [products, setProducts] = useState([]);
    const [shop, setShop] = useState({});

    useEffect(async () => {
        const getProducts = async () => {
            const res = await axiosInstance.get(`/shop/${parmas.id}`)
            setProducts(res.data.shop.products);
            console.log(res.data);
            setShop(res.data.shop)
        }
        await getProducts()
    }, [])

    return (
        <div>
            <div class="Shop">
                {/* <div class="Shop__title">
                    <div class="icon">
                        <a href="#"><i class="fa fa-arrow-left"></i></a>
                    </div>
                    <h3>New products</h3>
                </div> */}
                <div class="Shop__body">
                    <div class="half">
                        <div class="featured_text">
                            <h1>{shop?.shopName}</h1>
                            <p class="sub">{shop?.email}</p>
                            <p class="price">{shop?.contactNumber}</p>
                        </div>
                        <div class="image">
                            <img src={shop?.shopPic?.url} alt="" />
                        </div>
                    </div>
                    <div class="half">
                        <div class="description">
                            <h3>Address:</h3><br />
                            <h5>{shop?.address?.street}</h5>
                            <h5>{shop?.address?.city}, {shop?.address?.state}</h5>
                        </div>

                        {shop?.homeDelivery ? <span class="stock"> Home Delivery Available &#128077; </span>
                            : <span class="stock" style={{ color: 'red' }}> Home Delivery Not Available &#128542; </span>
                        }


                        <br /><br />
                        <span class="stock">Total products In stock : {shop?.products?.length} </span>
                        {/* <div class="reviews">
                            <ul class="stars">
                                <li><i class="fa fa-star"></i></li>
                                <li><i class="fa fa-star"></i></li>
                                <li><i class="fa fa-star"></i></li>
                                <li><i class="fa fa-star"></i></li>
                                <li><i class="fa fa-star-o"></i></li>
                            </ul>
                            <span>(64 reviews)</span>
                        </div> */}
                    </div>
                </div>
                {/* <div class="Shop__footer">
                    <div class="recommend">
                        <p>Recommended by</p>
                        <h3>Andrew Palmer</h3>
                    </div>
                    <div class="action">
                        <button type="button">Add to cart</button>
                    </div>
                </div> */}
            </div>

            {products.length === 0 ? <h1 style={{ marginLeft: "3rem" }}>Currently service or products is not available </h1>
                : <h1 style={{ marginLeft: "3rem" }}>Available Products</h1>}

            {
                products.map((product) => {
                    return (<ProductCard key={product._id}
                        product={product}
                    />)
                })
            }

        </div>
    )
}

export default ShopDetails
