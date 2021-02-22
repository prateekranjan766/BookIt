import { Switch, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
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
          <Route exact path='/' component={HomeScreen} />
        </Switch>
      </main>
      <Footer />
    </>
  );
}

export default App;
