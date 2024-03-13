const { Router } = require("express");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");
const multer = require("multer");
const uploadConfig = require("../config/upload");
const MealImageController = require("../controllers/MealImageController");

const upload = multer(uploadConfig.MULTER);

const orderImageRoutes = Router();

const mealImageController = new MealImageController();

orderImageRoutes.patch("/:id", ensureAuthenticated, upload.single("mealImage"), mealImageController.create);

module.exports = orderImageRoutes;