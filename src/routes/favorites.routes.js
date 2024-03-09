const { Router } = require("express");

const ensureAuthenticated = require("../middleware/ensureAuthenticated");
const FavoritesController = require("../controllers/FavoritesController");

const favoritesRoutes = Router();
const favoritesController = new FavoritesController();

favoritesRoutes.use(ensureAuthenticated);
favoritesRoutes.post("/", favoritesController.create);

module.exports = favoritesRoutes;
