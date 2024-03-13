const knex = require("../database/knex");

class MealImageRepository {
    async create({ meal_id, mealImgName }) {
        return await knex("meals")
            .update("image_path", mealImgName)
            .where("id", meal_id);
    }
}

module.exports = MealImageRepository;