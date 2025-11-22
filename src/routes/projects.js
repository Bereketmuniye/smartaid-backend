const express = require("express");
const router = express.Router();
const projectCtrl = require("../controllers/projects/projectController");
const activityCtrl = require("../controllers/projects/activityController");
const budgetCtrl = require("../controllers/projects/budgetController");
const auth = require("../middleware/auth");
const { ProjectDonor } = require("../models");


// Project routes
router.post("/", auth, projectCtrl.createProject);
router.get("/",auth, projectCtrl.getProjects);
router.get("/:id", auth, projectCtrl.getProjectById);
router.get("/donor/:donorId", auth, projectCtrl.getProjectsByDonor);
router.get("/user/:userId", auth, projectCtrl.getProjectsByUser);

router.post("/activities/:projectId", auth, activityCtrl.createActivity);
router.get("/activities/:projectId", auth, activityCtrl.getActivitiesByProject);

router.post("/budgets/:projectId", auth, budgetCtrl.createBudget);
router.get("/budgets/:projectId", auth, budgetCtrl.getBudgetsByProject);




module.exports = router;
