const express = require("express");
const router = express.Router();
const projectCtrl = require("../controllers/projects/projectController");
const activityCtrl = require("../controllers/projects/activityController");
const budgetCtrl = require("../controllers/projects/budgetController");
const auth = require("../middleware/auth");
const { ProjectDonor } = require("../models");


// Project routes
router.post("/", auth, projectCtrl.createProject);
router.get("/", projectCtrl.getProjects);
router.get("/:id", projectCtrl.getProjectById);

// Sub-routes
const activityRouter = express.Router();
activityRouter.post("/", auth, activityCtrl.createActivity);
activityRouter.get("/", activityCtrl.getActivitiesByProject);
router.use("/:projectId/activities", activityRouter);

const budgetRouter = express.Router({ mergeParams: true });
budgetRouter.post("/", auth, budgetCtrl.createBudget);
budgetRouter.get("/", budgetCtrl.getBudgetsByProject);
router.use("/:projectId/budgets", budgetRouter);


// Donor linking (using junction)
router.post("/:projectId/donors", auth, async (req, res) => {
    try {
        const link = new ProjectDonor({
            ...req.body,
            project: req.params.projectId,
        });
        await link.save();
        res.status(201).json(link);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
