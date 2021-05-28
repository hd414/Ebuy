
import React, { useEffect, useState } from 'react'
import axiosInstance from '../helpers/axios';

const Products = () => {

    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        const res = await axiosInstance.get('/products');
        setProducts(res.data.products);
    }

    useEffect(() => {
        getProducts();
    }, [])

    return {
        products: [products, setProducts]
    }
}

export default Products
