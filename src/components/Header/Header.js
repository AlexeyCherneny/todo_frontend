import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

import styles from './Header.styles';

const Header = props => {
  const { classes } = props;

  return (
    <AppBar position="absolute" className={classes.appBar}>
      <Toolbar>
        <Typography
          className={classes.titleMain}
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
        >
          TODOS
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)(Header);
