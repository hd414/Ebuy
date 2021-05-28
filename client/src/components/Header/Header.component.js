import React from 'react';
import header1 from '../../assets/images/header1.jpg';
import './header.styles.css';

const Header = () => {
    return (
        <div className="header">

            <div className="header-text">
                <h2>Order form Home From nearby Shopes</h2>
                <p>
                    super fast delivery<br />
                Trust from known shop</p>
            </div>
            <div className="header-img">
                <img src={header1} style={{ width: "70%" }} />
            </div>
        </div>
    )
}

export default Header
