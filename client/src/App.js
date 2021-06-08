import { useContext } from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import Footer from './components/Footer/footer.component';
import Navbar from './components/Navbar/Navbar.component';
import NotFound from './components/NotFound/notFound.component';
import Cart from './containers/Cart/cart';
import Category from './containers/Category/category';
import Home from './containers/Home/home';
import OrderDetails from './containers/OrdersHistory/OrderDetails';
import OrderHistory from './containers/OrdersHistory/orderHistory';
import CreateProduct from './containers/Products/createProducts/createProduct';
import ProductDetails from './containers/Products/productDetails/productDetails';
import Products from './containers/Products/products';
import ShopProducts from './containers/Products/shopProducts/shopProducts';
import ShopDetails from './containers/Shops/ShopDetails/shopDetails';
import AdminSignin from './containers/Signin/AdminSignin';
import Signin from './containers/Signin/signin';
import AdminSignup from './containers/Signup/AdminSignup';
import Signup from './containers/Signup/Signup';
import { GlobalState } from './context/globalState';

function App() {

  const state = useContext(GlobalState);
  const [isAuth] = state.User.Auth;

  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={isAuth ? NotFound : Signin} />
        <Route path="/signup" exact component={isAuth ? NotFound : Signup} />
        <Route path="/admin/signin" exact component={isAuth ? NotFound : AdminSignin} />
        <Route path="/admin/signup" exact component={isAuth ? NotFound : AdminSignup} />
        <Route path="/products" exact component={Products} />
        <Route path="/shop_products" exact component={ShopProducts} />
        <Route path="/cart" exact component={Cart} />
        <Route path="/products/:id" exact component={ProductDetails} />
        <Route path="/edit_product/:id" exact component={CreateProduct} />
        <Route path="/create_product" exact component={CreateProduct} />
        <Route path='/history' exact component={OrderHistory} />
        <Route path='/history/:id' component={OrderDetails} />
        <Route path="/category" exact component={Category} />
        <Route path="/shop/:id" exact component={ShopDetails} />
        <Route path="*" component={NotFound} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
