const MealsRepository = require("../repositories/MealsRepository");
const MealsService = require("../services/MealsService");

class MealsController {
    async create(request, response) {
        const { image_path, name, category, ingredients, preco, description } = request.body;

        const mealsRepository = new MealsRepository();
        const mealsService = new MealsService(mealsRepository);

        const data = await mealsService.create({ image_path, name, category, ingredients, preco, description });

        response.status(201).json(data);
    }
}

module.exports = MealsController;