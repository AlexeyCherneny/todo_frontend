import axios from 'axios';

import settings from './settings/apiService';

export default () => {
  const composeUrl = url => `${settings.baseURL}${url}`;

  const checkFailureHttpStatus = res => {
    try {
      if (res.response) {
        const { data } = res.response;

        if (data) {
          return data;
        }
      } else {
        throw res.message;
      }
    } catch (err) {
      throw err;
    }
  };

  const checkSuccessfulHttpStatus = res => res.data;

  const defaultSettings = {
    headers: settings.headers,
  };

  return {
    post: ({ url, data, ...settings }) =>
      axios
        .post(composeUrl(url), data, { ...defaultSettings, ...settings })
        .then(checkSuccessfulHttpStatus)
        .catch(checkFailureHttpStatus),
    delete: ({ url, ...settings }) =>
      axios
        .delete(composeUrl(url), { ...defaultSettings, ...settings })
        .then(checkSuccessfulHttpStatus)
        .catch(checkFailureHttpStatus),
    get: ({ url, ...settings }) =>
      axios
        .get(composeUrl(url), { ...defaultSettings, ...settings })
        .then(checkSuccessfulHttpStatus)
        .catch(checkFailureHttpStatus),
    put: ({ url, data, ...settings }) =>
      axios
        .put(composeUrl(url), data, { ...defaultSettings, ...settings })
        .then(checkSuccessfulHttpStatus)
        .catch(checkFailureHttpStatus),
  };
};
