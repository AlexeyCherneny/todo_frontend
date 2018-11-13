import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

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

  moveCard = (dragIndex, hoverIndex) => {
    const { swapTasks } = this.props;

    swapTasks({ dragIndex, hoverIndex });
  };

  render() {
    const { tasks } = this.props;

    if (Array.isArray(tasks) && tasks.length) {
      return tasks.map((task, i) => {
        return (
          <TodosListItem
            key={task._id}
            moveCard={this.moveCard}
            task={task}
            index={i}
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

export default DragDropContext(HTML5Backend)(TodosList);
