import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Home from './Pages.js/Home';
import Show from './Pages.js/Show';
import Starred from './Pages.js/Starred';

const theme = {
  mainColors: {
    blue: '#2400ff',
    gray: '#c6c6c6',
    dark: '#353535',
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}

export default App;
