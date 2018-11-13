import React from 'react';
import { findDOMNode } from 'react-dom';
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
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash.flow';

import styles from './TodosListItem.styles';

const taskSource = {
  beginDrag(props) {
    return {
      id: props._id,
      index: props.index,
    };
  },
};

const taskTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    if (dragIndex === hoverIndex) {
      return;
    }

    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    const clientOffset = monitor.getClientOffset();

    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    props.moveCard(dragIndex, hoverIndex);

    monitor.getItem().index = hoverIndex;
  },
};

const TodosListItem = props => {
  const { isDragging, connectDragSource, connectDropTarget } = props;
  const opacity = isDragging ? 0 : 1;

  if (props.task) {
    const { task, editTask, deleteTask, changeTaskStatus, classes } = props;
    const { isDeleting, isEditing, isChangingStatus } = task.processes;
    const { _id: id, name, done } = task;

    return (
      connectDragSource &&
      connectDropTarget &&
      connectDragSource(
        connectDropTarget(
          <div style={{ opacity }}>
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
          </div>
        )
      )
    );
  }

  return null;
};

export default flow(
  DragSource('task', taskSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  })),
  DropTarget('task', taskTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
  }))
)(withStyles(styles)(TodosListItem));
