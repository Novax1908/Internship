//! check what the role the user has (admin or user)
const adminMiddleware = (req, res, next) => {
    try {
        // req.user comes from authMiddleware
        if (!req.user) {
            return res.status(401).json({
                status: false,
                message: "Unauthorized access",
            });
        }

        // Check role
        if (req.user.role !== "admin") {
            return res.status(403).json({
                status: false,
                message: "Access denied. Admin only",
            });
        }

        // User is admin → allow request
        next();
    } catch (err) {
        return res.status(500).json({
            status: false,
            message: err.message,
        });
    }
};

export default adminMiddleware;
