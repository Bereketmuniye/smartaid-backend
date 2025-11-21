const { verifyToken } = require("../config");
const { User } = require("../models");

module.exports = async (req, res, next) => {
   let token;
   if(req.headers.authorization && req.headers.authorization.startsWith("Bearer ")){
    token = req.headers.authorization.split(" ")[1];
   }
   if(!token){
    return res.status(401).json({ message: "Access denied. No token provided." });
   }
    try {
        const decoded = verifyToken(token);
        const user = await User.findById(decoded.id).select("-password");
        if (!user) return res.status(401).json({ message: "Invalid token." });
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token." });
    }
};
