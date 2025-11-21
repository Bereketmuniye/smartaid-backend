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

// Sub-routes
const activityRouter = express.Router();
activityRouter.post("/", auth, activityCtrl.createActivity);
activityRouter.get("/", auth, activityCtrl.getActivitiesByProject);
router.use("/:projectId/activities", auth, activityRouter);

const budgetRouter = express.Router({ mergeParams: true });
budgetRouter.post("/", auth, budgetCtrl.createBudget);
budgetRouter.get("/", auth, budgetCtrl.getBudgetsByProject);
router.use("/:projectId/budgets", auth, budgetRouter);





module.exports = router;
