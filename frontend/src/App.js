import { Switch, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import BookScreen from './screens/BookScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import BookDescriptionScreen from './screens/BookDescriptionScreen';
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
