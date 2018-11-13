import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Typography,
  Paper,
  List,
  LinearProgress,
  Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';

import TodosList from '../TodosList/TodosList';
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

  renderTasks = () => {
    const { isTasksInProcess, isTasksLoaded, err, classes } = this.props;

    if (err) {
      return this.renderError();
    }

    if (!isTasksLoaded && isTasksInProcess) {
      return (
        <LinearProgress
          classes={{
            colorPrimary: classes.linearColorPrimary,
            barColorPrimary: classes.linearBarColorPrimary,
          }}
        />
      );
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

  onModalClose = () => {
    const { closeTaskModal, tasks } = this.props;

    const editingTask = tasks.find(
      task => task.processes && task.processes.isEditing
    );

    if (editingTask) {
      return closeTaskModal(editingTask._id);
    }
    return closeTaskModal();
  };

  render() {
    const {
      classes,
      createTask,
      isCreatingTaskInProcess,
      isTaskModalOpen,
      openTaskModal,
      setTaskStatus,
      deleteTask,
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
            onClose={this.onModalClose}
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
          <List className={classes.tasks}>
            {
              <TodosList
                tasks={tasks}
                openTaskModal={openTaskModal}
                deleteTask={deleteTask}
                setTaskStatus={setTaskStatus}
              />
            }
          </List>
          <Button className={classes.addTaskBtn} onClick={openTaskModal}>
            ADD TASK
          </Button>
        </Paper>
      </main>
    );
  }
}

export default withStyles(styles)(Todos);
