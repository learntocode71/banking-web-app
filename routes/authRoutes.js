const express = require("express");
const router = express.Router();
const { loginClient } = require("../controllers/AuthController");

router.route("/login").post(loginClient);

module.exports = router;
