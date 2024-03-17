const { randomUUID } = require("node:crypto");
const AppError = require("../utils/AppError");

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

    async delete({ user_id, favorites_id }) {
        const favorites = await this.favoritesRepository.getFavorites(user_id, favorites_id);

        if (!favorites){
            throw new AppError("Esse favorito não existe");
        }

        if (favorites.user_id !== user_id) {
            throw new AppError("Esse favorito não pertence a esse usuário");
        }

        return await this.favoritesRepository.delete(favorites_id);
    }
}

module.exports = FavoritesService;