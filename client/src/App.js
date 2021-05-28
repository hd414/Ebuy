import { Route, Switch } from 'react-router';
import './App.css';
import Navbar from './components/Navbar/Navbar.component';
import NotFound from './components/NotFound/notFound.component';
import Cart from './containers/Cart/cart';
import Home from './containers/Home/home';
import ProductDetails from './containers/Products/productDetails/productDetails';
import Products from './containers/Products/products';
import Signin from './containers/Signin/signin';
import Signup from './containers/Signup/Signup';
import { GlobalData } from './context/globalState';

function App() {
  return (
    <div className="App">
      <GlobalData>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signin" exact component={Signin} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/products" exact component={Products} />
          <Route path="/cart" exact component={Cart} />
          <Route path="/products/:id" exact component={ProductDetails} />
          <Route path="*" component={NotFound} />
        </Switch>
      </GlobalData>
    </div>
  );
}

export default App;
