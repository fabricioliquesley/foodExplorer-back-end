const DiskStorage = require("../providers/DiskStorage");

class MealImageService {
    constructor(MealImageRepository) {
        this.mealImageRepository = MealImageRepository;
    }

    async create({ meal_id, mealImgName }) {
        const diskStorage = new DiskStorage();

        const fileName = await diskStorage.saveFile(mealImgName);

        return await this.mealImageRepository.create({ meal_id, mealImgName: fileName })
    }
}

module.exports = MealImageService;