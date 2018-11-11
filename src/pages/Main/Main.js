import React from 'react';
import { Grid } from '@material-ui/core';

import Header from '../../components/Header/Header';
import Todos from '../../components/Todos/Todos';

const Home = () => {
  return (
    <Grid>
      <Header />
      <Todos />
    </Grid>
  );
};

export default Home;
