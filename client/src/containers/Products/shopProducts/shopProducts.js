import React, { useContext, useState, useEffect } from 'react';
import Loader from '../../../components/Loader/loader.component';
import ProductCard from '../../../components/ProudctCard/productCard';
import { GlobalState } from '../../../context/globalState';
import axiosInstance from '../../../helpers/axios';
import LoadMore from '../Utills/LoadMore/loadmore';
import './shopProducts.css';


const ShopProducts = () => {

    const state = useContext(GlobalState);
    const [shopProducts, setShopProducts] = state.User.ShopProducts;
    const [shopCallback, setShopCallback] = state.User.ShopCallback;
    const [Products, setProducts] = useState([]);
    const [checkAll, setCheckAll] = useState(false);
    const [callback, setCallback] = state.Products.callback;
    const [token] = state.Token;
    const [loading, setLoading] = useState(false);


    // console.log(shopProducts)

    useEffect(() => {
        setProducts(shopProducts);
    }, [shopProducts])

    useEffect(() => {
        console.log(Products);
    }, [Products])


    const [categories] = state.Categories.categories
    const [category, setCategory] = useState('');
    const [sort, setSort] = useState('');
    const [search, setSearch] = useState('');


    useEffect(() => {
        if (search) {
            const tempProd = shopProducts.filter(pro => {

                // console.log(pro, search);
                return (pro.title.includes(search))
            });

            setProducts(tempProd);
        }
        else {
            setProducts(shopProducts);
        }
    }, [search])

    useEffect(() => {
        if (category) {
            const tempProd = shopProducts.filter(pro => {

                // console.log(pro.category, category);
                return (pro.category == category)
            });
            // console.log(category);
            // console.log(tempProd);
            setProducts(tempProd);
        }
        else
            setProducts(shopProducts);

    }, [category])




    const handleCategory = e => {
        setCategory(e.target.value)
        // console.log(e.target.value);
        setSearch('')
    }

    const deleteProduct = async (product) => {
        // console.log(product)
        try {
            setLoading(true);
            await axiosInstance.post('/uploads/delete',
                { public_id: product.images.public_id }, {
                headers: { Authorization: token }
            });
            await axiosInstance.delete(`/products/${product._id}`, {
                headers: { Authorization: token }
            });
            setShopCallback(!shopCallback);
            setLoading(false);
        }
        catch (e) {
            console.log(e.response.data.error);
        }
    }

    const OnSelectAllHandler = () => {
        setCheckAll(checkAll => !checkAll);
        const updatedProdcuts = [...shopProducts];
        updatedProdcuts.forEach((pro) => {
            pro.checked = !checkAll;
        })
        setShopProducts(shopProducts => [...updatedProdcuts]);
        // console.log(products);
    }

    const DeleteSelected = async () => {
        const updatedProdcuts = [...shopProducts];
        updatedProdcuts.forEach(async (pro) => {
            if (pro.checked)
                await deleteProduct(pro);
        })
        setCallback(!callback);
    }

    if (loading) {
        return (
            <div className="products-container">
                <Loader />
            </div>
        )
    }

    return (
        <>
            <div className="filter_menu">
                <div className="row">
                    <span className="filter_labels">Filters: </span>
                    <select className="filter_select" name="category" value={category} onChange={handleCategory} >
                        <option value=''>All Products</option>
                        {
                            categories.map(category => (
                                <option value={category._id} key={category._id}>
                                    {category.name}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <input type="text" value={search} className="fontAwesome filter_input" placeholder=" &#xf002;  Search products"
                    onChange={e => setSearch(e.target.value.toLowerCase())} />

                {/* <div className="row sort">
                    <span>Sort By: </span>
                    <select value={sort} onChange={e => setSort(e.target.value)} >
                        <option value=''>Newest</option>
                        <option value='sort=oldest'>Oldest</option>
                        <option value='sort=-sold'>Best sales</option>
                        <option value='sort=-price'>Price: Hight-Low</option>
                        <option value='sort=price'>Price: Low-Hight</option>
                    </select>
                </div> */}
            </div>

            <div className="selectAll">
                <span>select All </span>
                <input type="checkbox"
                    checked={checkAll}
                    onChange={OnSelectAllHandler}
                />
                <button className="delete-selected" onClick={DeleteSelected}>Delete</button>
            </div>

            {Products.length === 0 && (<><div><h1 style={{ textAlign: "center" }}>No Products Available</h1></div> <Loader /> </>)}

            <div className="products-container">
                {
                    Products.map((product) => {
                        return (<ProductCard key={product._id}
                            product={product}
                            deleteProduct={() => deleteProduct(product)}
                        />)
                    })
                }
            </div>
            <LoadMore />
        </>
    )
}

export default ShopProducts
