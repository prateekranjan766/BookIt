import { Switch, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import BookScreen from './screens/BookScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import BookDescriptionScreen from './screens/BookDescriptionScreen';
import OrderDetailsScreen from './screens/OrderDetailsScreen';
import ProfileScreen from './screens/ProfileScreen';
import MyOrdersScreen from './screens/MyOrdersScreen';
import ChangePasswordScreen from './screens/ChangePasswordScreen';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  return (
    <>
      <Switch>
        <Route path='/' component={Header} />
      </Switch>
      <main>
        <Switch>
          <Route
            exact
            path='/profile/changePassword'
            component={ChangePasswordScreen}
          />
          <Route exact path='/myorders' component={MyOrdersScreen} />
          <Route exact path='/profile' component={ProfileScreen} />
          <Route exact path='/orders/:id' component={OrderDetailsScreen} />
          <Route exact path='/placeOrder' component={PlaceOrderScreen} />
          <Route exact path='/paymentMethod' component={PaymentMethodScreen} />
          <Route exact path='/shipping' component={ShippingScreen} />
          <Route exact path='/register' component={RegisterScreen} />
          <Route exact path='/login' component={LoginScreen} />
          <Route exact path='/cart' component={CartScreen} />
          <Route exact path='/books/:id' component={BookDescriptionScreen} />
          <Route exact path='/books' component={BookScreen} />
          <Route exact path='/' component={HomeScreen} />
        </Switch>
      </main>
      <Footer />
    </>
  );
}

export default App;
