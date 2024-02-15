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

        await this.mealsRepository.create({meal_id, image_path, name, category, preco, description })

        return {id: meal_id, image_path, name, category, ingredients, preco, description}
    }
}

module.exports = MealsService;