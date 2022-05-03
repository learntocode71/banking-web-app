const { CustomAPIError } = require("../errors/custom-error");

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  if (err.name === "ValidationError") {
    let errors = {};
    Object.values(err.errors).forEach((el) => {
      errors[el.path] = el.message;
    });

    return res.status(400).json(errors);
  }

  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  return res
    .status(500)
    .json({ message: "Something went wrong, please try again" });
};

module.exports = errorHandlerMiddleware;
