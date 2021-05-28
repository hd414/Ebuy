import React, { useContext } from 'react';
import Loader from '../../components/Loader/loader.component';
import ProductCard from '../../components/ProudctCard/productCard';
import { GlobalState } from '../../context/globalState';
import './products.css';


const Products = () => {

    const state = useContext(GlobalState);
    const [products] = state.Products.products;
    console.log(products);
    return (
        <>
            {products.length === 0 && <Loader />}
            <div className="products-container">
                {
                    products.map((product) => {
                        return (<ProductCard key={product._id} product={product} />)
                    })
                }
            </div>
        </>
    )
}

export default Products
