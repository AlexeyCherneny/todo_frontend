import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';

import Header from '../../components/Header/Header';
import Todos from '../../components/Todos/Todos';

import {
  fetchTasks,
  createTask,
  closeTaskModal,
  openTaskModal,
  deleteTask,
  setTaskStatus,
  updateTask,
} from '../../actions/tasks';

class Main extends Component {
  static propTypes = {
    createTask: PropTypes.func,
    fetchTasks: PropTypes.func,
    deleteTask: PropTypes.func,
    setTaskStatus: PropTypes.func,
    updateTask: PropTypes.func,
    isTasksInProcess: PropTypes.bool,
    isTasksLoaded: PropTypes.bool,
    isTaskModalOpen: PropTypes.bool,
    tasks: PropTypes.arrayOf(PropTypes.object),
  };

  componentDidMount() {
    const { fetchTasks } = this.props;

    fetchTasks();
  }

  render() {
    const {
      tasks,
      isTasksInProcess,
      isCreatingTaskInProcess,
      isTasksLoaded,
      createTask,
      isTaskModalOpen,
      openTaskModal,
      closeTaskModal,
      deleteTask,
      setTaskStatus,
      updateTask,
    } = this.props;
    return (
      <Grid>
        <Header />
        <Todos
          createTask={createTask}
          tasks={tasks}
          isTasksInProcess={isTasksInProcess}
          isCreatingTaskInProcess={isCreatingTaskInProcess}
          isTasksLoaded={isTasksLoaded}
          isTaskModalOpen={isTaskModalOpen}
          openTaskModal={openTaskModal}
          closeTaskModal={closeTaskModal}
          setTaskStatus={setTaskStatus}
          deleteTask={deleteTask}
          updateTask={updateTask}
        />
      </Grid>
    );
  }
}

const mapStateToProps = ({ tasks }) => ({
  tasks: tasks.tasks,
  isTasksInProcess: tasks.isTasksInProcess,
  isCreatingTaskInProcess: tasks.isCreatingTaskInProcess,
  isTasksLoaded: tasks.isTasksInProcess,
  isTaskModalOpen: tasks.isTaskModalOpen,
});

const mapDispatchToProps = dispatch => ({
  createTask: args => dispatch(createTask(args)),
  closeTaskModal: id => dispatch(closeTaskModal(id)),
  openTaskModal: id => dispatch(openTaskModal(id)),
  fetchTasks: () => dispatch(fetchTasks()),
  deleteTask: id => dispatch(deleteTask(id)),
  setTaskStatus: id => dispatch(setTaskStatus(id)),
  updateTask: args => dispatch(updateTask(args)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
