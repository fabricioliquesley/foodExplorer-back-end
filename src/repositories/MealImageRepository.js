const knex = require("../database/knex");

class MealImageRepository {
    async create({ meal_id, mealImgName }) {
        return await knex("meals")
            .update("image_path", mealImgName)
            .where("id", meal_id);
    }

    async fetchMeal(meal_id) {
        const meal = await knex("meals").where("id", meal_id).first();

        if (!meal) {
            throw new AppError("Prato não encontrado")
        }

        const ingredients = await knex("ingredients").where("meal_id", meal_id);

        return { ...meal, ingredients };
    }
}

module.exports = MealImageRepository;