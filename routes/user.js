const express = require("express");
const { signup, signin, validateSignup, validateSignin, getAllUsers } = require("../controllers/user.js");

const router = express.Router();

router.get("/all",getAllUsers);
router.post("/signup", validateSignup, signup);

router.post("/signin", validateSignin, signin);

module.exports = router;
