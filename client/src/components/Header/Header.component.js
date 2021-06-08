import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import header1 from '../../assets/images/header1.jpg';
import { GlobalState } from '../../context/globalState';
import './header.styles.css';

const Header = () => {


    const state = useContext(GlobalState);
    const [isAdmin] = state.User.isAdmin;

    return (
        <div className="header">

            <div className="header-text">
                <h2>Order form Home From nearby Shopes</h2>
                <p>
                    super fast delivery<br />
               from shops you trusted shop</p>
                <button className="shopNow"><Link to='/products'>
                    {!isAdmin ? 'Shop Now' : "Add products"}
                </Link></button>
            </div>
            <div className="header-img">
                <img src={header1} style={{ width: "70%" }} alt="header" />
            </div>
        </div>
    )
}

export default Header
