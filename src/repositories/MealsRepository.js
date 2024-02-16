const knex = require("../database/knex");

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
                .whereLike("name" , `%${search}%`)
                .orderBy("name");

            if (meals.length == 0){
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
}

module.exports = MealsRepository;