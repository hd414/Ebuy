import React, { useContext } from 'react';
import ShopCard from '../../components/ShopCard/ShopCard.component';
import { GlobalState } from '../../context/globalState';
import './Shops.css';

const Shops = () => {

    const state = useContext(GlobalState);
    const [Shops, setShops] = state.User.Shops;


    return (
        <div className="shops_container">

            {
                Shops.map((shop) => {
                    console.log(shop)
                    return (<ShopCard key={shop._id} shop={shop} />)
                })
            }

        </div>
    )
}

export default Shops
