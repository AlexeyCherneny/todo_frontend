import React, { Component } from 'react';

import TodosListItem from '../TodosListItem/TodosListItem';

class TodosList extends Component {
  editTask = id => () => {
    const { openTaskModal } = this.props;

    openTaskModal(id);
  };

  changeTaskStatus = ({ id, done }) => () => {
    const { setTaskStatus } = this.props;

    setTaskStatus({ id, done: !done });
  };

  deleteTask = id => () => {
    const { deleteTask } = this.props;

    deleteTask(id);
  };

  render() {
    const { tasks } = this.props;

    if (Array.isArray(tasks) && tasks.length) {
      return tasks.map(task => {
        return (
          <TodosListItem
            task={task}
            editTask={this.editTask}
            changeTaskStatus={this.changeTaskStatus}
            deleteTask={this.deleteTask}
          />
        );
      });
    }
    return null;
  }
}

export default TodosList;
