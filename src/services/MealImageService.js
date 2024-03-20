const DiskStorage = require("../providers/DiskStorage");

class MealImageService {
    constructor(MealImageRepository) {
        this.mealImageRepository = MealImageRepository;
    }

    async create({ meal_id, mealImgName }) {
        const diskStorage = new DiskStorage();

        const meal = await this.mealImageRepository.fetchMeal(meal_id);

        if (meal.image_path){
            await diskStorage.deleteFile(meal.image_path);
        }

        const fileName = await diskStorage.saveFile(mealImgName);

        return await this.mealImageRepository.create({ meal_id, mealImgName: fileName })
    }
}

module.exports = MealImageService;