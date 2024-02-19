const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class MealsRepository {
    async create({ meal_id, image_path, name, category, preco, description }) {
        await knex("meals").insert({
            id: meal_id,
            name,
            category,
            image_path,
            preco,
            description
        })
    }

    async createIngredient({ ingredient_id, ingredient, meal_id }) {
        await knex("ingredients").insert({
            id: ingredient_id,
            name: ingredient,
            meal_id
        })
    }

    async fetchMeals(search) {
        let meals;

        if (search) {
            meals = await knex("meals")
                .whereLike("name", `%${search}%`)
                .orderBy("name");

            if (meals.length == 0) {
                meals = await knex("ingredients")
                    .select([
                        "meals.id",
                        "meals.name",
                        "meals.category",
                        "meals.image_path",
                        "meals.preco",
                        "meals.description"
                    ])
                    .whereLike("ingredients.name", `%${search}%`)
                    .innerJoin("meals", "meals.id", "ingredients.meal_id")
                    .groupBy("meals.id")
                    .orderBy("meals.name");
            }

        } else {
            meals = await knex("meals").orderBy("name");
        }

        const ingredientsOfMeals = await knex("ingredients");


        const mealsWithIngredients = meals.map(meal => {
            const mealIngredients = ingredientsOfMeals
                .filter(ingredient => {
                    return ingredient.meal_id === meal.id
                })

            return {
                ...meal,
                ingredients: mealIngredients
            }
        })

        return mealsWithIngredients;
    }

    async fetchMeal(meal_id) {
        const meal = await knex("meals").where("id", meal_id).first();

        if (!meal) {
            throw new AppError("Prato não encontrado")
        }

        const ingredients = await knex("ingredients").where("meal_id", meal_id);

        return { ...meal, ingredients };
    }

    async updateMeal({
        meal_id,
        image_path,
        name,
        category,
        preco,
        description
    }) {
        return knex("meals").update({
            name,
            category,
            image_path,
            preco,
            description
        }).where("id", meal_id);
    }

    async updateIngredient(ingredients) {

    }

    async delete(meal_id) {
        return await knex("meals").delete().where("id", meal_id);
    }
}

module.exports = MealsRepository;