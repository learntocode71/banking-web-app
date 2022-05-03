class CustomAPIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

/**
 * create custom error with given message and status code
 * @param {String} message error message
 * @param {Number} statusCode http staus code for the response
 * @returns throw a new custom error
 */
const createCustomError = (message, statusCode) => {
  return new CustomAPIError(message, statusCode);
};

module.exports = {
  CustomAPIError,
  createCustomError,
};
