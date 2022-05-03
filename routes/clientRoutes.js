const express = require("express");
const passport = require("passport");
const router = express.Router();
const {
  getClient,
  getAllClient,
  createClient,
  updateClient,
  deleteClient,
  transferMoney,
} = require("../controllers/ClientController");

router
  .route("/")
  .get(passport.authenticate("jwt", { session: false }), getAllClient)
  .post(passport.authenticate("jwt", { session: false }), createClient);

router
  .route("/transfer-money")
  .patch(passport.authenticate("jwt", { session: false }), transferMoney);

router
  .route("/:clientId")
  .get(passport.authenticate("jwt", { session: false }), getClient)
  .patch(passport.authenticate("jwt", { session: false }), updateClient)
  .delete(passport.authenticate("jwt", { session: false }), deleteClient);

module.exports = router;
