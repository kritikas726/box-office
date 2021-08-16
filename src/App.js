import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Pages.js/Home';
import Show from './Pages.js/Show';
import Starred from './Pages.js/Starred';

function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/starred" exact>
        <Starred />
      </Route>
      <Route path="/show/:id">
        <Show />
      </Route>
      <Route>This is 404 page.</Route>
    </Switch>
  );
}

export default App;
