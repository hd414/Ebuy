import React, { useContext, useState } from 'react';
import Loader from '../../components/Loader/loader.component';
import ProductCard from '../../components/ProudctCard/productCard';
import { GlobalState } from '../../context/globalState';
import axiosInstance from '../../helpers/axios';
import './products.css';


const Products = () => {

    const state = useContext(GlobalState);
    const [products, setProducts] = state.Products.products;
    const [isAdmin] = state.User.isAdmin;
    const [checkAll, setCheckAll] = useState(false);
    const [callback, setCallback] = state.Products.callback;
    const [token] = state.Token;
    const [loading, setLoading] = useState(false);

    // console.log(products);


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
            setCallback(!callback);
            setLoading(false);
        }
        catch (e) {
            console.log(e.response.data.error);
        }
    }

    const OnSelectAllHandler = () => {
        setCheckAll(checkAll => !checkAll);
        const updatedProdcuts = [...products];
        updatedProdcuts.forEach((pro) => {
            pro.checked = !checkAll;
        })
        setProducts(products => [...updatedProdcuts]);
        // console.log(products);
    }

    const DeleteSelected = async () => {
        const updatedProdcuts = [...products];
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
            {
                isAdmin &&
                <div className="selectAll">
                    <span>select All </span>
                    <input type="checkbox"
                        checked={checkAll}
                        onChange={OnSelectAllHandler}
                    />
                    <button className="delete-selected" onClick={DeleteSelected}>Delete</button>
                </div>
            }
            {products.length === 0 && <Loader />}
            <div className="products-container">
                {
                    products.map((product) => {
                        return (<ProductCard key={product._id}
                            product={product}
                            deleteProduct={() => deleteProduct(product)}
                        />)
                    })
                }
            </div>
        </>
    )
}

export default Products
