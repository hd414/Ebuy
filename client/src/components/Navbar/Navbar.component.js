import React, { useContext } from 'react'
import menu from '../../assets/images/menu.png';
import cart from '../../assets/images/cart.png';
import close from '../../assets/images/cancel.png';
import { Link } from 'react-router-dom';
import './Navbar.styles.css';
import { GlobalState } from '../../context/globalState';
import axiosInstance from '../../helpers/axios';

const Navbar = () => {

    const state = useContext(GlobalState);
    // console.log(state);
    const [isAuth, setIsAuth] = state.User.Auth;
    const [isAdmin, setIsAdmin] = state.User.isAdmin;



    const logout = async () => {
        await axiosInstance.post('/signout');
        localStorage.clear();
        setIsAdmin(false);
        setIsAuth(false);
    }

    const AdminRoute = () => {
        return (
            <>
                <li><Link to="/create_product">Create Product</Link></li>
                <li><Link to="/category">Categories</Link></li>
            </>
        )
    }



    const LoggedInRoute = () => {
        return (
            <>
                <li><Link to="/history">History</Link></li>
                <li><Link to="/" onClick={logout}>Logout</Link></li>
            </>
        )
    }


    return (

        <nav className="navbar">
            <div className="menu">
                <Link to='/'><img src={menu} width="30px" alt="menu" /></Link>
            </div>
            <div className="logo">
                <h1><Link to="/">{isAdmin ? 'Admin LocalMart' : 'LocalMart'}</Link> </h1>
            </div>
            <div className="pages">
                <ul>
                    <li><Link to="/products">products</Link></li>
                    {isAdmin && AdminRoute()}
                    {
                        isAuth ? LoggedInRoute() : (
                            <>
                                <li><Link to="/signin">Login</Link></li>
                                <li><Link to="/signup">SignUp</Link></li>
                            </>
                        )
                    }
                    <li>
                        <img src={close} alt="close" width="30px" className="menu" />
                    </li>
                </ul>
            </div>

            { isAdmin ? '' : (
                <div className="cart">
                    <span className="quantity">0</span>
                    <Link to='/cart'><img src={cart} width="30px" alt="cart" /></Link>
                </div>
            )}

        </nav>

    )
}

export default Navbar
