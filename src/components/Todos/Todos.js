import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  LinearProgress,
  CircularProgress,
  Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { Edit, Delete, Done, Close } from '@material-ui/icons';

import TaskModal from '../TaskModal/TaskModal';

import styles from './Todos.styles';

class Todos extends Component {
  static propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
    createTask: PropTypes.func.isRequired,
    isTasksInProcess: PropTypes.bool.isRequired,
    isCreatingTaskInProcess: PropTypes.bool.isRequired,
    isTaskModalOpen: PropTypes.bool.isRequired,
    isTasksLoaded: PropTypes.bool.isRequired,
    openTaskModal: PropTypes.func.isRequired,
    closeTaskModal: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
    setTaskStatus: PropTypes.func.isRequired,
    updateTask: PropTypes.func.isRequired,
  };

  deleteTask = id => () => {
    const { deleteTask } = this.props;

    deleteTask(id);
  };

  changeTaskStatus = ({ id, done }) => () => {
    const { setTaskStatus } = this.props;

    setTaskStatus({ id, done: !done });
  };

  editTask = id => () => {
    const { openTaskModal } = this.props;

    openTaskModal(id);
  };

  renderTasks = () => {
    const { isTasksInProcess, isTasksLoaded, err } = this.props;

    if (err) {
      return this.renderError();
    }

    if (!isTasksLoaded && isTasksInProcess) {
      return <LinearProgress />;
    }

    if (isTasksInProcess) {
      return (
        <Fragment>
          <LinearProgress />
          {this.renderTasksList()}
        </Fragment>
      );
    }

    return this.renderTasksList();
  };

  renderError = () => {
    return <Typography component="div">Error</Typography>;
  };

  renderTasksList = () => {
    const { classes, tasks } = this.props;

    if (Array.isArray(tasks) && tasks.length) {
      return tasks.map(task => {
        const { isDeleting, isEditing, isChangingStatus } = task.processes;
        const { _id: id, name, done } = task;

        return (
          <ListItem className={classes.task} key={id}>
            <ListItemText>
              <Typography className={classes.taskTitle} component="div">
                {name}
              </Typography>
            </ListItemText>
            <ListItemIcon>
              <IconButton
                className={classes.taskIconButton}
                onClick={this.editTask(id)}
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
                onClick={this.deleteTask(id)}
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
                onClick={this.changeTaskStatus({ id, done })}
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
      });
    }
  };

  render() {
    const {
      classes,
      createTask,
      isCreatingTaskInProcess,
      isTaskModalOpen,
      openTaskModal,
      closeTaskModal,
      tasks,
      updateTask,
    } = this.props;

    const editingTask = tasks.find(
      task => task.processes && task.processes.isEditing
    );

    return (
      <main className={classes.content}>
        {isTaskModalOpen ? (
          <TaskModal
            isOpen={isTaskModalOpen}
            onSubmit={editingTask ? updateTask : createTask}
            onClose={closeTaskModal}
            editingTask={editingTask}
            isCreatingTaskInProcess={isCreatingTaskInProcess}
          />
        ) : null}
        <div className={classes.appBarSpacer} />
        <Paper className={classes.paper}>
          <Typography
            className={classes.todosTitle}
            component="h1"
            variant="h5"
          >
            Tasks
          </Typography>
          <List className={classes.tasks}>{this.renderTasks()}</List>
          <Button className={classes.addTaskBtn} onClick={openTaskModal}>
            ADD TASK
          </Button>
        </Paper>
      </main>
    );
  }
}

export default withStyles(styles)(Todos);
