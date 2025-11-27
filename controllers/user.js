import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { body, validationResult } from "express-validator";


export const validateSignup = [
    body("name")
        .notEmpty().withMessage("Name is required")
        .isLength({ max: 50 }).withMessage("Name cannot exceed 50 characters"),

    body("email")
        .isEmail().withMessage("Enter a valid email"),

    body("password")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),

    body("age")
        .optional()
        .isInt({ min: 13 }).withMessage("Minimum age is 13")
];


export const validateSignin = [
    body("email").isEmail().withMessage("Enter a valid email"),
    body("password").notEmpty().withMessage("Password is required")
];



export const signup = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array(),
        });
    }

    const { name, email, password, age } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists",
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new User({
            name,
            email,
            password: hashedPassword,
            age,
        });

        const savedUser = await user.save();

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email,
            },
        });

    } catch (error) {
        console.log("Signup Error:", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};


export const signin = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array(),
        });
    }

    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        // Compare passwords
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });

    } catch (error) {
        console.log("Signin Error:", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};
