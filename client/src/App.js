import './App.css';
import{BrowserRouter, Route, Switch} from "react-router-dom"
import landing from "./components/Landing"
import home from './components/Home';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
<Route exact path="/" component = {landing} />
<Route exact path="/home" component = {home} />
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
