import { createReducer } from 'redux-act';

import {
  createTaskStart,
  createTaskError,
  createTaskSuccess,
  fetchTasksStart,
  fetchTasksError,
  fetchTasksSuccess,
  openTaskModal,
  closeTaskModal,
  deleteTaskStart,
  deleteTaskError,
  deleteTaskSuccess,
  setTaskStatusStart,
  setTaskStatusError,
  setTaskStatusSuccess,
  updateTaskStart,
  updateTaskError,
  updateTaskSuccess,
} from '../actions/tasks';

const defaultState = {
  tasks: [],

  isCreatingTaskInProcess: false,
  isTasksInProcess: false,
  isTaskModalOpen: false,

  isTasksLoaded: false,
  err: '',
};

const overlay = createReducer(
  {
    [fetchTasksStart]: state => ({
      ...state,

      isTasksInProcess: true,
    }),
    [fetchTasksError]: (state, err) => ({
      ...state,

      isTasksInProcess: false,

      isTasksLoaded: true,
      err,
    }),
    [fetchTasksSuccess]: (state, tasks) => {
      const formattedTasks = tasks.map(task => ({
        ...task,

        processes: {
          isDeleting: false,
          isEditing: false,
          isChangingStatus: false,
        },
      }));

      return {
        ...state,

        tasks: formattedTasks,
        isTasksInProcess: false,
        isTasksLoaded: true,
      };
    },

    [createTaskStart]: state => ({
      ...state,

      isCreatingTaskInProcess: true,
    }),
    [createTaskError]: (state, err) => ({
      ...state,

      isCreatingTaskInProcess: false,
      err,
    }),
    [createTaskSuccess]: (state, task) => {
      const formattedTask = {
        ...task,

        processes: {
          isDeleting: false,
          isEditing: false,
          isChangingStatus: false,
        },
      };
      return {
        ...state,

        tasks: [...state.tasks, formattedTask],
        isCreatingTaskInProcess: false,
      };
    },

    [openTaskModal]: (state, id) => {
      const tasks = state.tasks.map(task => {
        if (task._id === id) {
          return {
            ...task,

            processes: {
              ...task.processes,

              isEditing: true,
            },
          };
        }
        return task;
      });

      return {
        ...state,

        tasks,
        isTaskModalOpen: true,
      };
    },
    [closeTaskModal]: state => ({
      ...state,

      isTaskModalOpen: false,
    }),

    [deleteTaskStart]: (state, id) => {
      const tasks = state.tasks.map(task => {
        if (task._id === id) {
          return {
            ...task,

            processes: {
              ...task.processes,

              isDeleting: true,
            },
          };
        }
        return task;
      });

      return {
        ...state,

        tasks,
      };
    },
    [deleteTaskError]: (state, { err, id }) => {
      const tasks = state.tasks.map(task => {
        if (task._id === id) {
          return {
            ...task,

            processes: {
              ...task.processes,

              isDeleting: false,
            },
          };
        }
        return task;
      });

      return {
        ...state,

        tasks,
        err,
      };
    },
    [deleteTaskSuccess]: (state, id) => {
      const tasks = state.tasks.filter(task => task._id !== id);

      return {
        ...state,

        tasks,
      };
    },

    [setTaskStatusStart]: (state, id) => {
      const tasks = state.tasks.map(task => {
        if (task._id === id) {
          return {
            ...task,

            processes: {
              ...task.processes,

              isChangingStatus: true,
            },
          };
        }
        return task;
      });

      return {
        ...state,

        tasks,
      };
    },
    [setTaskStatusError]: (state, { err, id }) => {
      const tasks = state.tasks.map(task => {
        if (task._id === id) {
          return {
            ...task,

            processes: {
              ...task.processes,

              isChangingStatus: false,
            },
          };
        }
        return task;
      });

      return {
        ...state,

        tasks,
        err,
      };
    },
    [setTaskStatusSuccess]: (state, { id, done }) => {
      const tasks = state.tasks.map(task => {
        if (task._id === id) {
          return {
            ...task,
            done,

            processes: {
              ...task.processes,

              isChangingStatus: false,
            },
          };
        }
        return task;
      });

      return {
        ...state,

        tasks,
      };
    },

    [updateTaskStart]: (state, id) => {
      const tasks = state.tasks.map(task => {
        if (task._id === id) {
          return {
            ...task,

            processes: {
              ...task.processes,

              isEditing: true,
            },
          };
        }
        return task;
      });

      return {
        ...state,

        tasks,
      };
    },
    [updateTaskError]: (state, { err, id, name, done }) => {
      const tasks = state.tasks.map(task => {
        if (task._id === id) {
          return {
            ...task,
            name,
            done,

            processes: {
              ...task.processes,

              isEditing: false,
            },
          };
        }
        return task;
      });

      return {
        ...state,

        tasks,
        err,
      };
    },
    [updateTaskSuccess]: (state, { id, name, done }) => {
      const tasks = state.tasks.map(task => {
        if (task._id === id) {
          return {
            ...task,
            name,
            done,

            processes: {
              ...task.processes,

              isEditing: false,
            },
          };
        }
        return task;
      });

      return {
        ...state,

        tasks,
      };
    },
  },
  defaultState
);

export default overlay;
