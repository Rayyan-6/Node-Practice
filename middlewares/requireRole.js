export const requireRole = (...roles) => {
    return (req, res, next) => {

        console.log("REQ.USER:", req.user);
        console.log("ALLOWED ROLES:", roles);
        if (!req.user) {
            return res.status(401).json({ message: "This is Unauthorized access" });
        }

        if (!roles.includes(req.user.role.toLowerCase())) {
            return res.status(403).json({ message: "Access denied. Role not allowed." });
        }

        next();
    };
};
