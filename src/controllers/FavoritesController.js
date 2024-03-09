const FavoritesRepository = require("../repositories/FavoritesRepository");
const FavoritesService = require("../services/FavoritesService");

class FavoritesController {
    async create(request, response) {
        const user_id = request.user.id;
        const { meal_name, image_path, meal_id } = request.body;

        const favoritesRepository = new FavoritesRepository;
        const favoritesService = new FavoritesService(favoritesRepository);

        await favoritesService.create({ meal_name, image_path, meal_id, user_id });

        response.status(201).json();
    }

    async getFavorites(request, response) {
        const user_id = request.user.id;

        const favoritesRepository = new FavoritesRepository;
        const favoritesService = new FavoritesService(favoritesRepository);

        const data = await favoritesService.getFavorites(user_id);

        response.status(200).json(data);
    }
}

module.exports = FavoritesController;