import React from "react";
import "./App.css";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Sign from "./components/Sign";
import Home from "./components/Home";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import Mainclasscomp from "./components/Mainclasscomp";

function App() {
  return (
    <BrowserRouter>
      <br />
      <Navbar title={"To-Do"} />
      <div className="main my-5">
        <div className="container my-5">
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/Sign" component={Sign}></Route>
            <Route exact path="/Login" component={Login}></Route>

            <Route exact path="/to-do" component={Mainclasscomp}></Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
