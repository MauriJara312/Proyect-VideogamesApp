import './App.css';
import{BrowserRouter, Route, Switch} from "react-router-dom"
import landing from "./components/Landing"
import home from './components/Home';
import create from "./components/CreateVideogame"
import videogameDetail from './components/VideogameDetail';
import NavBar from './components/NavBar';

function App() {
  return (
    <BrowserRouter>
    <div className="App">

    <NavBar/>

      <Switch>

<Route exact path="/" component = {landing} />
<Route exact path="/home" component = {home} />
<Route exact path="/videogame" component = {create} />
<Route exact path="/home/:id" component = {videogameDetail} />

      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
