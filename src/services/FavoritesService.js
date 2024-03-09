const { randomUUID } = require("node:crypto");

class FavoritesService {
    constructor(favoritesRepository) {
        this.favoritesRepository = favoritesRepository;
    }

    async create({ meal_name, image_path, meal_id, user_id }) {
        const data = {
            id: randomUUID(),
            meal_name,
            image_path,
            meal_id,
            user_id
        }

        return await this.favoritesRepository.create(data);
    }

    async getFavorites(user_id) {
        return await this.favoritesRepository.getFavorites(user_id);
    }
}

module.exports = FavoritesService;