import jwt from "jsonwebtoken";

export const requireSignin = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized. Token missing." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  // contains { id, role }
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
