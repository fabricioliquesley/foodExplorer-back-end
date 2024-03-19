const MealsRepository = require("../repositories/MealsRepository");
const MealsService = require("../services/MealsService");

class MealsController {
    async create(request, response) {
        const { name, category, ingredients, price, description } = request.body;

        const mealsRepository = new MealsRepository();
        const mealsService = new MealsService(mealsRepository);

        const meal_id = await mealsService.create({ name, category, ingredients, price, description });

        response.status(201).json(meal_id);
    }

    async index(request, response) {
        const { search } = request.query;

        const mealsRepository = new MealsRepository();
        const mealsService = new MealsService(mealsRepository);

        const meals = await mealsService.fetchMeals(search)

        response.status(200).json(meals);
    }

    async show(request, response) {
        const { meal_id } = request.params;

        const mealsRepository = new MealsRepository();
        const mealsService = new MealsService(mealsRepository);

        const meal = await mealsService.fetchMeal(meal_id);

        response.status(200).json(meal);
    }

    async update(request, response) {
        const { meal_id } = request.params;
        const { image_path, name, category, ingredients, preco, description } = request.body;

        const mealsRepository = new MealsRepository();
        const mealsService = new MealsService(mealsRepository);

        const status = await mealsService.update({
            meal_id,
            image_path,
            name,
            category,
            ingredients,
            preco,
            description
        });

        response.status(201).json(status);
    }

    async delete(request, response) {
        const { meal_id } = request.params;

        const mealsRepository = new MealsRepository();
        const mealsService = new MealsService(mealsRepository);

        const result = await mealsService.delete(meal_id)

        response.status(200).json(result);
    }
}

module.exports = MealsController;