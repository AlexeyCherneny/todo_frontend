import { createAction } from 'redux-act';

import apiServicesConstructor from '../services/apiService';
import {
  isObject,
  isError,
  buildUrlParams,
  encodeDataURI,
} from '../utils/utils';

export const fetchTasksStart = createAction('FETCH_TASK_START');
export const fetchTasksError = createAction('FETCH_TASK_ERROR');
export const fetchTasksSuccess = createAction('FETCH_TASK_SUCCESS');

export const fetchTasks = () => (dispatch, getState) => {
  const apiServices = apiServicesConstructor(dispatch, getState);

  dispatch(fetchTasksStart());

  const params = { url: '/todosApi_1.0/tasks' };

  apiServices
    .get(params)
    .then(tasks => {
      if (Array.isArray(tasks)) {
        setTimeout(() => dispatch(fetchTasksSuccess(tasks)), 1000);
      } else {
        throw new Error('Unhandled resul on get tasks request');
      }
    })
    .catch(err => {
      const errMessage = isError(err) && isObject(err) ? err.message : err;

      dispatch(fetchTasksError(errMessage));
    });
};

export const createTaskStart = createAction('CREATE_TASK_START');
export const createTaskError = createAction('CREATE_TASK_ERROR');
export const createTaskSuccess = createAction('CREATE_TASK_SUCCESS');

export const createTask = args => (dispatch, getState) => {
  const apiServices = apiServicesConstructor(dispatch, getState);
  const { title, done } = args;

  dispatch(createTaskStart());
  const data = { name: title, done };

  const params = {
    url: '/todosApi_1.0/tasks/task',
    data: buildUrlParams(encodeDataURI(data)),
  };

  apiServices
    .post(params)
    .then(task => {
      if (isObject(task)) {
        dispatch(createTaskSuccess(task));
        dispatch(closeTaskModal());
      } else {
        throw new Error('Unhandled resul on post tasks request');
      }
    })
    .catch(err => {
      const errMessage = isError(err) && isObject(err) ? err.message : err;

      dispatch(createTaskError(errMessage));
    });
};

export const openTaskModal = createAction('OPEN_TASK_MODAL');
export const closeTaskModal = createAction('CLOSE_TASK_MODAL');

export const deleteTaskStart = createAction('DELETE_TASK_START');
export const deleteTaskError = createAction('DELETE_TASK_ERROR');
export const deleteTaskSuccess = createAction('DELETE_TASK_SUCCESS');

export const deleteTask = id => (dispatch, getState) => {
  const apiServices = apiServicesConstructor(dispatch, getState);

  dispatch(deleteTaskStart(id));

  const params = {
    url: `/todosApi_1.0/tasks/task/${id}`,
  };
  apiServices
    .delete(params)
    .then(res => {
      if (isObject(res) && res.status === 'success') {
        setTimeout(() => dispatch(deleteTaskSuccess(id)), 500);
      } else {
        throw new Error('Unhandled resul on post tasks request');
      }
    })
    .catch(err => {
      const errMessage = isError(err) && isObject(err) ? err.message : err;

      dispatch(deleteTaskError({ err: errMessage, id }));
    });
};

export const setTaskStatusStart = createAction('SET_TASK_STATUS_START');
export const setTaskStatusError = createAction('SET_TASK_STATUS_ERROR');
export const setTaskStatusSuccess = createAction('SET_TASK_STATUS_SUCCESS');

export const setTaskStatus = ({ id, done }) => (dispatch, getState) => {
  const apiServices = apiServicesConstructor(dispatch, getState);
  const data = { done };

  dispatch(setTaskStatusStart(id));

  const params = {
    url: `/todosApi_1.0/tasks/task/${id}`,
    data: buildUrlParams(encodeDataURI(data)),
  };
  apiServices
    .put(params)
    .then(res => {
      if (isObject(res) && res.status === 'success') {
        setTimeout(() => dispatch(setTaskStatusSuccess({ id, done })), 700);
      } else {
        throw new Error('Unhandled resul on post tasks request');
      }
    })
    .catch(err => {
      const errMessage = isError(err) && isObject(err) ? err.message : err;

      dispatch(setTaskStatusError({ err: errMessage, id }));
    });
};

export const updateTaskStart = createAction('UPDATE_TASK_START');
export const updateTaskError = createAction('UPDATE_TASK_ERROR');
export const updateTaskSuccess = createAction('UPDATE_TASK_SUCCESS');

export const updateTask = ({ id, title, done }) => (dispatch, getState) => {
  const apiServices = apiServicesConstructor(dispatch, getState);
  const data = { done, title };
  dispatch(updateTaskStart(id));

  const params = {
    url: `/todosApi_1.0/tasks/task/${id}`,
    data: buildUrlParams(encodeDataURI(data)),
  };
  apiServices
    .put(params)
    .then(res => {
      if (isObject(res) && res.status === 'success') {
        dispatch(updateTaskSuccess({ id, name: title, done }));
        dispatch(closeTaskModal());
      } else {
        throw new Error('Unhandled resul on post tasks request');
      }
    })
    .catch(err => {
      const errMessage = isError(err) && isObject(err) ? err.message : err;

      dispatch(updateTaskError({ err: errMessage, id }));
    });
};
