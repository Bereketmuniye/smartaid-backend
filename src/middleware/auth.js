const { verifyToken } = require("../config");
const { User } = require("../models");

module.exports = async (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token)
        return res
            .status(401)
            .json({ message: "Access denied. No token provided." });

    try {
        const decoded = verifyToken(token);
        const user = await User.findById(decoded.id).populate("role ngo");
        if (!user) return res.status(401).json({ message: "Invalid token." });
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token." });
    }
};
