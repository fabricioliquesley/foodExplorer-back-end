const AppError = require("../utils/AppError");
const { randomUUID } = require("crypto")

class MealsService {
    constructor(mealsRepository) {
        this.mealsRepository = mealsRepository;
    }

    async create({ image_path, name, category, ingredients, preco, description }) {
        if (!image_path || !name || !category || !ingredients || !preco || !description) {
            throw new AppError("Preencha todos os campos para cadastrar um novo prato");
        }

        const meal_id = randomUUID();

        await this.mealsRepository.create({ meal_id, image_path, name, category, preco, description })

        ingredients.map(async (ingredient) => {
            const ingredient_id = randomUUID();

            await this.mealsRepository.createIngredient({ ingredient_id, ingredient, meal_id });
        })
    }

    async fetchMeals(search) {
        const meals = await this.mealsRepository.fetchMeals(search);

        return meals;
    }
}

module.exports = MealsService;