import { useContext } from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
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
import Signin from './containers/Signin/signin';
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
        <Route path="/products" exact component={Products} />
        <Route path="/cart" exact component={Cart} />
        <Route path="/products/:id" exact component={ProductDetails} />
        <Route path="/edit_product/:id" exact component={CreateProduct} />
        <Route path="/create_product" exact component={CreateProduct} />
        <Route path='/history' exact component={OrderHistory} />
        <Route path='/history/:id' component={OrderDetails} />
        <Route path="/category" exact component={Category} />

        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
