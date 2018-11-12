// export const proxyUrl = 'http://localhost:3001';

// const baseURL =
//   process.env.NODE_ENV === 'production' ? window.location.origin : proxyUrl;
const baseURL = window.location.origin;

const defaultHeaders = {
  'Content-Type': 'application/x-www-form-urlencoded',
};

const settings = {
  headers: defaultHeaders,
  baseURL,
};

export default settings;
