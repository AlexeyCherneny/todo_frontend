import React from 'react';
import {
  Typography,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  CircularProgress,
} from '@material-ui/core';
import { Edit, Delete, Done, Close } from '@material-ui/icons';
import cn from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import styles from './TodosListItem.styles';

const TodosListItem = props => {
  if (props.task) {
    const { task, editTask, deleteTask, changeTaskStatus, classes } = props;
    const { isDeleting, isEditing, isChangingStatus } = task.processes;
    const { _id: id, name, done } = task;

    return (
      <ListItem
        className={cn(classes.task, { [classes.doneTask]: done })}
        key={id}
      >
        <ListItemText>
          <Typography className={classes.taskTitle} component="div">
            {name}
          </Typography>
        </ListItemText>
        <ListItemIcon>
          <IconButton
            className={classes.taskIconButton}
            onClick={editTask(id)}
            disabled={isEditing}
          >
            <Edit className={classes.taskAction} />
            {isEditing ? (
              <CircularProgress className={classes.fabProgress} />
            ) : null}
          </IconButton>
        </ListItemIcon>
        <ListItemIcon>
          <IconButton
            className={classes.taskIconButton}
            onClick={deleteTask(id)}
            disabled={isDeleting}
          >
            <Delete className={classes.taskAction} />
            {isDeleting ? (
              <CircularProgress className={classes.fabProgress} />
            ) : null}
          </IconButton>
        </ListItemIcon>
        <ListItemIcon className={classes.taskIcon}>
          <IconButton
            onClick={changeTaskStatus({ id, done })}
            className={classes.taskIconButton}
            disabled={isChangingStatus}
          >
            {done ? (
              <Done className={classes.taskAction} />
            ) : (
              <Close className={classes.taskAction} />
            )}
            {isChangingStatus ? (
              <CircularProgress className={classes.fabProgress} />
            ) : null}
          </IconButton>
        </ListItemIcon>
      </ListItem>
    );
  }

  return null;
};

export default withStyles(styles)(TodosListItem);
