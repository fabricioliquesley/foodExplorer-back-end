const knex = require("../database/knex");

class FavoritesRepository {
    async create(data) {
        return await knex("favorites").insert(data);
    }
}

module.exports = FavoritesRepository;