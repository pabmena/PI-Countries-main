import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom"
import LandingPage from "./components/LandingPage/LandingPage"
import Home from "./components/Home/Home"//
import ActivityAdd from './components/ActivityAdd/ActivityAdd';
import DetailCountry from './components/DetailCountry/DetailCountry';

function App() {
  
  return (
    <div className="App">
    <BrowserRouter>    
     <Switch>
       <Route exact path= "/" component= {LandingPage}/>
       <Route path= "/countries" component= {Home}/>
       <Route path= "/details/:id" component= {DetailCountry}/>
       <Route path= "/activity" component= {ActivityAdd}/>
     </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;