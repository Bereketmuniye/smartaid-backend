const { User } = require("../models");
const bcrypt = require("bcryptjs");

exports.createUser = async (userData) => {
    const { email } = userData;
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("User already exists");
    userData.status = "active";
    return await User.create(userData);
};

exports.findUserByEmail = async (email) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");
    return user;
};

exports.activateUser = async (userId) => {
    const user = await User.findById(userId);
    
    if (!user) throw new Error("User not found");
    user.status = "active";
    return await user.save();
};

exports.deactivateUser = async (userId) => {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");
    user.status = "inactive";
    return await user.save();
};

exports.hashPassword = async (password) => bcrypt.hash(password, 12);
