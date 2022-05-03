const Client = require("../models/Client");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { createCustomError } = require("../errors/custom-error");

const loginClient = async (req, res, next) => {
  const { email, password } = req.body;

  // Check whether user is exist or not
  const user = await Client.findOne({ email });

  if (!user) return next(createCustomError("Email is not registered", 404));

  let valid = await bcrypt.compare(password, user.password);

  if (!valid) return next(createCustomError("Password is incorrect", 400));

  // Payload which bind with token
  const payload = {
    id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  };

  // Generate token with given information
  const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });

  res.send({ token });
};

module.exports = {
  loginClient,
};
