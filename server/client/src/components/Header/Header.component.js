import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import header1 from '../../assets/images/header1.jpg';
import { GlobalState } from '../../context/globalState';
import './header.styles.css';

const Header = () => {


    const state = useContext(GlobalState);
    const [isAdmin] = state.User.isAdmin;

    return (
        <>
            <div className="header">
                <div className="header-text">
                    <h2>Order stuffs form your nearby Shops</h2>
                    <p>
                        super fast delivery<br />
                        from shops you trust</p>
                    <button className="shopNow"><Link to='/products'>
                        {!isAdmin ? 'Shop Now' : "Add products"}
                    </Link></button>
                </div>
                <div className="header-img">
                    <img src={header1} style={{ width: "70%" }} alt="header" />
                    <a
                        style={{ color: 'black', fontSize: "0.6rem", textDecoration: "underline", position: "relative", left: "70px", top: "-40px" }}
                        href="http://www.freepik.com">Designed by stories / Freepik</a>
                </div>

            </div>
            <a href="#shops">
                <div className="down-arrow">
                    <span>↓</span>
                    <br />
                    <br />
                </div>
            </a>
        </>
    )
}

export default Header
