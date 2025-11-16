const { User } = require("../models");
const bcrypt = require("bcryptjs");

exports.createUser = async (userData) => {
    const { email } = userData;
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("User already exists");
    return await User.create(userData);
};

exports.findUserByEmail = async (email) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");
    return user;
};

exports.hashPassword = async (password) => bcrypt.hash(password, 12);
