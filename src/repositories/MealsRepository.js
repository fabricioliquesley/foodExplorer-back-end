const knex = require("../database/knex");

class MealsRepository {
    async create({meal_id, image_path, name, category, preco, description }) {
        await knex("meals").insert({
            id: meal_id,
            name,
            category,
            image_path,
            preco,
            description
        })
    }
}

module.exports = MealsRepository;