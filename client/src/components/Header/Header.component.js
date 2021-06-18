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
                </div>
                {/* <div style={{ fontSize: "3px" }}>Icons made by <a href="https://www.flaticon.com/authors/pixel-perfect"
                title="Pixel perfect">Pixel perfect</a>
                from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

            <a href="http://www.freepik.com">Designed by vectorpocket / Freepik</a>
            <a href='https://www.freepik.com/vectors/house'>House vector created by stories - www.freepik.com</a>
            <a href='https://www.freepik.com/vectors/website'>Website vector created by stories - www.freepik.com</a>
            <a href='https://www.freepik.com/vectors/people'>People vector created by stories - www.freepik.com</a> */}
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
