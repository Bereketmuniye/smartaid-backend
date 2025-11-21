const mongoose = require("mongoose");
const { User, Role, Ngo } = require("../../models");
const {
    createUser: originalCreateUser,
    findUserByEmail,activateUser,deactivateUser
} = require("../../services/authService");
const { signToken } = require("../../config");

exports.registerUser = async (req, res) => {
    try {
        let {
            name,
            email,
            password,
            role: roleInput,
            ngo: ngoInput,
        } = req.body;

        let roleId;
        if (roleInput) {
            if (
                typeof roleInput === "string" &&
                !mongoose.Types.ObjectId.isValid(roleInput)
            ) {
                const roleDoc = await Role.findOne({ name: roleInput.trim() });
                if (!roleDoc) {
                    return res.status(400).json({
                        message: `Role "${roleInput}" not found. Available: admin, user, manager`,
                    });
                }
                roleId = roleDoc._id;
            } else if (mongoose.Types.ObjectId.isValid(roleInput)) {
                roleId = roleInput;
            } else {
                return res
                    .status(400)
                    .json({
                        message:
                            "Invalid role: provide name (admin/user/manager) or valid ObjectId",
                    });
            }
        } else {
            return res.status(400).json({ message: "Role is required" });
        }

        let ngoId;
        if (ngoInput) {
            if (
                typeof ngoInput === "string" &&
                !mongoose.Types.ObjectId.isValid(ngoInput)
            ) {
                const ngoDoc = await Ngo.findOne({ name: ngoInput.trim() });
                if (!ngoDoc) {
                    return res
                        .status(400)
                        .json({ message: `NGO "${ngoInput}" not found` });
                }
                ngoId = ngoDoc._id;
            } else if (mongoose.Types.ObjectId.isValid(ngoInput)) {
                ngoId = ngoInput;
            } else {
                return res
                    .status(400)
                    .json({
                        message: "Invalid ngo: provide name or valid ObjectId",
                    });
            }
        }

        const userData = { name, email, password, role: roleId, ngo: ngoId };

        const user = await originalCreateUser(userData);

        const token = signToken({ id: user._id });

        res.status(201).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: roleInput,
            },
        });
    } catch (error) {
        console.error("Registration error:", error);
        if (error.name === "ValidationError") {
            res.status(400).json({
                message: `Validation failed: ${error.message}`,
            });
        } else if (error.code === 11000) {
            res.status(400).json({
                message: "Email already exists. Please use a different email.",
            });
        } else {
            res.status(500).json({
                message: "Internal server error during registration",
            });
        }
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Email and password are required" });
        }

        const user = await findUserByEmail(email);

        if (!user || !(await user.comparePassword(password))) {
            return res
                .status(401)
                .json({ message: "Invalid email or password" });
        }

        const token = signToken({ id: user._id,
            role: user.role,
         },process.env.JWT_SECRET,process.env.JWT_EXPIRES_IN);

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error during login" });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const { User } = require("../../models");

        const users = await User.find().populate("role ngo");

        res.json(users);
    } catch (error) {
        console.error("Get users error:", error);
        res.status(500).json({ message: "Failed to fetch users" });
    }
};


exports.activateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await activateUser(userId);
        res.json(user);
    } catch (error) {
        console.error("Activate user error:", error);
        res.status(500).json({ message: "Failed to activate user" });
    }
};

exports.deactivateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await deactivateUser(userId);
        res.json(user);
    } catch (error) {
        console.error("Deactivate user error:", error);
        res.status(500).json({ message: "Failed to deactivate user" });
    }
};

exports.getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user);
    } catch (error) {
        console.error("Get current user error:", error);
        res.status(500).json({ message: "Failed to fetch current user" });
    }
};
