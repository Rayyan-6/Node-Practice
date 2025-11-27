const express = require("express");
const { signup, signin, validateSignup, validateSignin } = require("../controllers/user.js");

const router = express.Router();

router.post("/signup", validateSignup, signup);

router.post("/signin", validateSignin, signin);

module.exports = router;
