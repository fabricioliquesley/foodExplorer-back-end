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

    async fetchMeal(meal_id) {
        const meal = await this.mealsRepository.fetchMeal(meal_id);

        return meal;
    }

    async update({
        meal_id,
        image_path,
        name,
        category,
        ingredients,
        preco,
        description
    }) {
        const meal = await this.mealsRepository.fetchMeal(meal_id);

        meal.image_path = image_path ?? meal.image_path; 
        meal.name = name ?? meal.name;
        meal.category = category ?? meal.category;
        meal.preco = preco ?? meal.preco;
        meal.description = description ?? meal.description;

        await this.mealsRepository.updateMeal({
            meal_id,
            image_path,
            name,
            category,
            preco,
            description
        });

        return meal;
    }

    async delete(meal_id) {
        const status = await this.mealsRepository.delete(meal_id);

        if (status) {
            return "Deletado com sucesso";
        } else {
            return "Não foi possível deletar";
        }
    }
}

module.exports = MealsService;