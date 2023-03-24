const getError = (err) =>
  err.response && err.response.data && err.response.data.message
    ? err.data.message
    : err.message;
export {getError}