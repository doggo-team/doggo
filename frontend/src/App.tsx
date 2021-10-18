import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, BrowserRouter, Link, Switch} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
          <Route path="/topics">
            <Topics />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
