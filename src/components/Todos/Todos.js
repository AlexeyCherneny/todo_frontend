import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
} from '@material-ui/core';
import { Edit, Delete, Done } from '@material-ui/icons';

import styles from './Todos.styles';

const tasks = [
  { title: 'Hello world' },
  { title: 'Bye world' },
  { title: 'Bye world' },
  { title: 'Bye world' },
  { title: 'Bye world' },
  { title: 'Bye world' },
  { title: 'Bye world' },
  { title: 'Bye world' },
  { title: 'Bye world' },
  { title: 'Bye world' },
];

class Todos extends Component {
  renderListItem = task => {
    const { classes } = this.props;
    return (
      <ListItem className={classes.task}>
        <ListItemText>
          <Typography className={classes.taskTitle} component="div">
            {task.title}
          </Typography>
        </ListItemText>
        <ListItemIcon>
          <IconButton>
            <Edit className={classes.taskAction} />
          </IconButton>
        </ListItemIcon>
        <ListItemIcon>
          <IconButton>
            <Delete className={classes.taskAction} />
          </IconButton>
        </ListItemIcon>
        <ListItemIcon>
          <IconButton>
            <Done className={classes.taskAction} />
          </IconButton>
        </ListItemIcon>
      </ListItem>
    );
  };

  render() {
    const { classes } = this.props;

    return (
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Paper className={classes.paper}>
          <Typography
            className={classes.todosTitle}
            component="h1"
            variant="h5"
          >
            Tasks
          </Typography>
          <List className={classes.tasks}>
            {Array.isArray(tasks) && tasks.length
              ? tasks.map(task => this.renderListItem(task))
              : null}
          </List>
        </Paper>
      </main>
    );
  }
}
export default withStyles(styles)(Todos);
