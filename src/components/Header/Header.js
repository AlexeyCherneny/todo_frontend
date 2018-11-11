import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import cn from 'classnames';

import styles from './Header.styles';

const Header = () => {
  return (
    <AppBar
      position="absolute"
      className={cn(styles.appBar, styles.appBarShift)}
    >
      <Toolbar>
        <Typography component="h1" variant="h6" color="inherit" noWrap>
          Todos
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
