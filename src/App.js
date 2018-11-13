import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

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

export default App;
