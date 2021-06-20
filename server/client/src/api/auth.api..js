
import { useEffect, useState } from 'react'
import axiosInstance from '../helpers/axios';

const UserApi = (token) => {
    let userReq = localStorage.getItem('UserReq');
    const [isAuth, setIsAuth] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [history, setHistory] = useState([]);
    const [trigger, setTrigger] = useState(false);
    const [shopProducts, setShopProducts] = useState([]);
    const [shopCallback, setShopCallback] = useState(false);
    const [user, setUser] = useState('');
    const [Shops, setShops] = useState([]);
    const [orderCount, setOrderCount] = useState(0);



    const addToCart = async (product, num = 1) => {
        // console.log(product);
        if (!isAuth)
            return alert("please login or Register to continue");
        let quan = 0;

        const check = cartItems.every((item) => {
            if (item._id === product._id) {
                quan = item.quantity;
            }
            return item._id !== product._id;
        })

        if (check) {
            // console.log("product", product)
            setCartItems(cartItems => [...cartItems, { ...product, quantity: num + 1 - 1 }]);
            await axiosInstance.patch('/addCart', { cart: [...cartItems, { ...product, quantity: num + 1 - 1 }] }, {
                headers: { Authorization: token }
            })
        }
        else {
            const remains = cartItems.filter((item) => item._id !== product._id);

            setCartItems(cartItems => [...remains, { ...product, quantity: num - 1 + quan + 1 }]);
            await axiosInstance.patch('/addCart', { cart: [...remains, { ...product, quantity: quan + num + 1 - 1 }] }, {
                headers: { Authorization: token }
            })
        }
    }

    useEffect(async () => {
        if (isAdmin) {
            const getShopProducts = async () => {
                const res = await axiosInstance.get('/shop/' + user?._id);
                // console.log(res.data.shop.products);
                const prod = res.data.shop.products;
                setShopProducts(shopProducts => [...prod]);
            }

            await getShopProducts();
            // console.log(shopProducts)


        }
    }, [isAdmin, user, shopCallback])

    useEffect(async () => {
        if (!isAdmin) {
            const getShops = async () => {
                const res = await axiosInstance.get('/getShops');
                // console.log(res);
                setShops(Shops => res.data.shops);
                // console.log(Shops)
            }

            await getShops();
        }
    }, [isAdmin])

    // useEffect(async () => {
    //     if (token) {

    //         const getHistory = async () => {
    //             let hist;
    //             if (isAdmin) {
    //                 hist = await axiosInstance.get('/payment', {
    //                     headers: { Authorization: token }
    //                 });
    //             }
    //             else {
    //                 hist = await axiosInstance.get('/history', {
    //                     headers: { Authorization: token }
    //                 });
    //             }

    //             setHistory(hist.data)
    //         }

    //         getHistory();

    //     }
    // }, [token, trigger, isAdmin])



    useEffect(async () => {
        if (token) {

            const getHistory = async () => {
                let hist;
                if (isAdmin) {
                    hist = await axiosInstance.get('/orders/admin', {
                        headers: { Authorization: token }
                    });
                }
                else {
                    hist = await axiosInstance.get('/orders/user', {
                        headers: { Authorization: token }
                    });
                }

                setHistory(hist.data)

                if (isAdmin) {
                    let c = 0;
                    const temp = hist.data.orders;
                    temp.forEach((order) => {
                        if (order.status === false)
                            c++;
                    })

                    setOrderCount(c);
                }
            }

            getHistory();

        }
    }, [token, trigger, isAdmin])




    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axiosInstance.get(`/${userReq}`, {
                    headers: { Authorization: token }
                });
                // console.log(res);
                setIsAuth(true);
                setUser(res.data);
                res.data.role === 'admin' ? setIsAdmin(true) : setIsAdmin(false);
                setCartItems(res.data.cart);
            }
            catch (e) {
                console.log(e);
            }

            // setProducts(res.data.products);
        }
        getUser();
    }, [token])

    return {
        Auth: [isAuth, setIsAuth],
        isAdmin: [isAdmin, setIsAdmin],
        cart: [cartItems, setCartItems],
        addToCart: addToCart,
        History: [history, setHistory],
        Trigger: [trigger, setTrigger],
        ShopProducts: [shopProducts, setShopProducts],
        ShopCallback: [shopCallback, setShopCallback],
        Shops: [Shops, setShops],
        OrderCount: [orderCount, setOrderCount],
    }
}

export default UserApi
