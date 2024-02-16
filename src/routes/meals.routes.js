const { Router } = require("express");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");
const MealsController = require("../controllers/MealsController");

const mealsRoutes = Router();

const mealsController = new MealsController();

mealsRoutes.use(ensureAuthenticated);

mealsRoutes.post("/", mealsController.create);
mealsRoutes.get("/", mealsController.index);

module.exports = mealsRoutes;