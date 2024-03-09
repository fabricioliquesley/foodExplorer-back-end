const knex = require("../database/knex");

class FavoritesRepository {
    async create(data) {
        return await knex("favorites").insert(data);
    }

    async getFavorites(user_id) {
        return await knex("favorites").where("user_id", user_id);
    }
}

module.exports = FavoritesRepository;