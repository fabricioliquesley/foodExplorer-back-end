const MealImageRepository = require("../repositories/MealImageRepository");
const MealImageService = require("../services/MealImageService");

class MealImageController {
    async create(request, response) {
        const meal_id = request.params.id;
        const mealImgName = request.file.filename;

        const mealImageRepository = new MealImageRepository();
        const mealImageService = new MealImageService(mealImageRepository);

        mealImageService.create({ meal_id, mealImgName })

        response.status(201).json();
    }
}

module.exports = MealImageController;