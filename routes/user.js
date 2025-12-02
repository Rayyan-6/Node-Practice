import express from 'express'
import  { signup, signin, validateSignup, validateSignin, getAllUsers }  from "../controllers/user.js";

const router = express.Router();

router.get("/all",getAllUsers);
router.post("/signup", validateSignup, signup);

router.post("/signin", validateSignin, signin);

export default router;
