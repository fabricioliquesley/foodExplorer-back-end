const { Router } = require("express");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");
const MealsController = require("../controllers/MealsController");

const mealsRoutes = Router();

const mealsController = new MealsController();

mealsRoutes.use(ensureAuthenticated);

mealsRoutes.post("/", mealsController.create);
mealsRoutes.get("/", mealsController.index);
mealsRoutes.get("/:meal_id", mealsController.show);
mealsRoutes.delete("/:meal_id", mealsController.delete);
mealsRoutes.put("/:meal_id", mealsController.update);

module.exports = mealsRoutes;