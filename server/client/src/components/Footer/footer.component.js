import React, { useContext } from 'react';
import './footer.styles.css';
import { Link } from 'react-router-dom'
import { GlobalState } from '../../context/globalState';

const Footer = () => {

    const state = useContext(GlobalState);
    const [isAuth] = state.User.Auth;

    return (
        <>
            <footer className="footer">
                <div className="footer__addr">
                    <h1 className="footer__logo">EBuy</h1>

                    <h2>Contact</h2>

                    <address>
                        {/* 5534 Somewhere In. The World 22193-10212<br /> */}

                        <a className="footer__btn" href="mailto:example@gmail.com">Email Us</a>
                    </address>
                </div>

                <ul className="footer__nav">
                    <li className="nav__item">
                        <h2 className="nav__title">Help</h2>


                        <ul className="nav__ul">
                            <li>
                                <a className="nav__title" href="#">About</a>
                            </li>
                            <li>
                                <a href="#">FAQ</a>
                            </li>

                            <li>
                                <a href="#">REVIEWS</a>
                            </li>

                            <li>
                                <a href="#">CONTACT US</a>
                            </li>
                        </ul>
                    </li>

                    {
                        !isAuth && (
                            <li className="nav__item nav__item--extra">
                                <h1 className="nav__title">Sell with us</h1>

                                <ul className="nav__ul nav__ul--extra">
                                    <li>
                                        <Link to='/admin/signin'>Admin login</Link>
                                        {/* <a href="#"></a> */}
                                    </li>

                                    <li>
                                        <Link to='/admin/signup'>Admin Signup</Link>
                                        {/* <a href="#">Admin register</a> */}
                                    </li>
                                </ul>
                            </li>
                        )
                    }


                    <li className="nav__item">
                        <h2 className="nav__title">Legal</h2>

                        <ul className="nav__ul">
                            <li>
                                <a href="#">Privacy Policy</a>
                            </li>

                            <li>
                                <a href="#">Terms of Use</a>
                            </li>

                            <li>
                                <a href="#">Sitemap</a>
                            </li>
                        </ul>
                    </li>
                </ul>

                <div className="legal">
                    <p>&copy; 2021  All rights reserved.</p>

                    <div className="legal__links">
                        {/* <span>Made with <span className="heart">♥</span> remotely from Anywhere</span> */}
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer
