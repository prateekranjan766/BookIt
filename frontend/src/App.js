import bgImage from './landing-background.jpg';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import Footer from './components/Footer';

function App() {
  return (
    <div className='App'>
      <HomeScreen />
      <Footer />
      {/* <img src={bgImage} className='landing-background'></img> */}
    </div>
  );
}

export default App;
