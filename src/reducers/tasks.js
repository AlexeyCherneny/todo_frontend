import { createReducer } from 'redux-act';

import { addTask } from '../actions/tasks';

const defaultState = {
  tasks: [],

  isTasksLoaded: false,
};

const overlay = createReducer(
  {
    [addTask]: (state, task) => {
      return { tasks: [task, ...state.tasks] };
    },
  },
  defaultState
);

export default overlay;
