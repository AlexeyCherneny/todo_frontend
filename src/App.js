import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import styles from './App.module.scss';
import 'typeface-roboto';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className={styles.Header}>
          <Button variant="contained" color="primary">
            Hello world
          </Button>
        </header>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
