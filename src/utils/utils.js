export const isOfType = type => obj =>
  Object.prototype.toString
    .call(obj)
    .split(' ')[1]
    .replace(/\]$/, '') === type;

export const isObject = isOfType('Object');
export const isError = isOfType('Error');

const defineType = data => {
  return Array.isArray(data)
    ? 'array'
    : data === null && typeof data === 'object'
      ? 'null'
      : typeof data;
};

export const encodeDataURI = data => {
  switch (defineType(data)) {
  case 'array':
    return data.map(item => encodeDataURI(item));
  case 'object':
    return Object.keys(data).reduce((acc, arg) => {
      acc[arg] = encodeDataURI(data[arg]);
      return acc;
    }, {});
  default:
    return encodeURIComponent(data);
  }
};

export const buildUrlParams = params =>
  Object.keys(params)
    .reduce((acc, key) => {
      const param = params[key];
      return param == null ? acc : acc.concat(`${key}=${param}`);
    }, [])
    .join('&');
