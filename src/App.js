import logo from './logo.svg';
import './App.css';
import {Navbar} from './components/Navbar';
import {Carousel} from "./components/Carousel";

function App() {
  return (
    <div className="App">
      <header className="App-header">
       <Navbar/>
       <Carousel/>
        </header>
    </div>
  );
}

export default App;
