const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/users/userController");
const { validate } = require("../middleware/validation");
const auth = require("../middleware/auth");

router.post("/register", validate("user"), userCtrl.registerUser);
router.post("/login", userCtrl.loginUser);
router.get("/", auth, userCtrl.getUsers);
router.put("/activate/:userId", auth, userCtrl.activateUser);
router.put("/deactivate/:userId", auth, userCtrl.deactivateUser);
router.get("/me", auth, userCtrl.getCurrentUser);

module.exports = router;
