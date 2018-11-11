import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';

import Main from './Main/Main.js';

class App extends Component {
  render() {
    return (
      <Fragment>
        <CssBaseline />

        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Main} />
          </Switch>
        </BrowserRouter>
      </Fragment>
    );
  }
}

export default App;
