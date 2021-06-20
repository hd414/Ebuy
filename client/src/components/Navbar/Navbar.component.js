import React, { useContext, useState } from 'react'
import menu from '../../assets/images/menu.png';
// import cart from '../../assets/images/cart.png';
import { ReactComponent as Cart } from '../../assets/svgs/cart.svg';
import close from '../../assets/images/cancel.png';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.styles.css';
import { GlobalState } from '../../context/globalState';
import axiosInstance from '../../helpers/axios';

const Navbar = () => {

    const state = useContext(GlobalState);
    // console.log(state);
    const [isAuth, setIsAuth] = state.User.Auth;
    const [isAdmin, setIsAdmin] = state.User.isAdmin;
    const [cartItems, setCartItems] = state.User.cart;
    const [showMenu, setShowMenu] = useState(false);
    const [orderCount, setOrderCount] = state.User.OrderCount;






    const logout = async () => {
        await axiosInstance.post('/signout');
        localStorage.clear();
        setIsAdmin(false);
        setIsAuth(false);
        setCartItems([]);
    }

    const AdminRoute = () => {
        return (
            <>
                <li><NavLink to="/shop_products">products</NavLink></li>
                <li><NavLink to="/create_product">Create Product</NavLink></li>
                <li><NavLink to="/category">Categories</NavLink></li>
            </>
        )
    }



    const LoggedInRoute = () => {
        return (
            <>
                <li><NavLink to="/history">
                    Orders
                    {isAdmin && (<span className="orderCount">{orderCount}</span>)}
                </NavLink></li>
                <li><Link to="/" onClick={logout}>Logout</Link></li>
            </>
        )
    }

    let menuStyle = { left: showMenu ? "-50%" : "-100%" }

    return (

        <nav className="navbar">
            <div className="menu" onClick={() => { setShowMenu(!showMenu) }}>
                <Link to='#'><img src={menu} width="30px" alt="menu" /></Link>
            </div>
            <div className="logo">
                {isAdmin ?
                    <h2><Link to='/shop_products'>Admin Ebuy</Link> </h2>
                    : <h2><Link to="/"> Ebuy</Link> </h2>
                }
            </div>
            <div className="pages">
                <ul style={menuStyle}>

                    {!isAdmin && (<>
                        {/* <li><a href="#shops">Shops</a></li> */}
                        <li><NavLink to="/products">products</NavLink></li>
                    </>)}
                    {isAdmin && AdminRoute()}
                    {
                        isAuth ? LoggedInRoute() : (
                            <>
                                <li><NavLink to="/signin">Login</NavLink></li>
                                <li><NavLink to="/signup">SignUp</NavLink></li>
                            </>
                        )
                    }
                    <li onClick={() => { setShowMenu(!showMenu) }}>
                        <img src={close} alt="close" width="30px" className="menu" />
                    </li>
                </ul>
            </div>

            {isAdmin ? '' : (
                <div className="cart">
                    <span className="quantity">{cartItems?.length}</span>

                    <Link to='/cart'><Cart /></Link>
                </div>
            )}

        </nav>

    )
}

export default Navbar
