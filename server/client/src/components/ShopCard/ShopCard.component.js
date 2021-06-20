import React from 'react';
import { useHistory } from 'react-router';
import './ShopCard.styles.css';

const ShopCard = ({ shop }) => {

    console.log(shop)

    const history = useHistory();

    const styles = {
        height: "80%",
        width: "100%",
        background: `
        url(${shop?.shopPic ? shop.shopPic.url : 'https://s-media-cache-ak0.pinimg.com/736x/49/80/6f/49806f3f1c7483093855ebca1b8ae2c4.jpg'})
        no-repeat center center`,
        backgroundSize: "100%",
    }

    return (
        <>
            <div class="wrapper" onClick={() => { history.push(`/shop/${shop._id}`) }}>
                <div class="container">
                    <div class="top"
                        style={styles}
                    ></div>
                    <div class="bottom">
                        <div class="right">
                            <div class="details">
                                <h1>{shop.shopName}</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="inside">
                    <div class="icon"><i class="fa fa-info-circle" aria-hidden="true"></i></div>
                    <div class="contents">
                        <h2>Address:</h2>
                        <h3>{shop.address.city}, {shop.address.state}</h3>
                        <h4>{shop.address.street}</h4>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShopCard
