const knex = require("../database/knex");

class FavoritesRepository {
    async create(data) {
        return await knex("favorites").insert(data);
    }

    async getFavorites(user_id, favorites_id) {
        if (favorites_id) {
            return await knex("favorites").where("id", favorites_id).first();
        }

        return await knex("favorites").where("user_id", user_id);
    }

    async delete(favorites_id) {
        await knex("favorites").delete().where("id", favorites_id);
    }
}

module.exports = FavoritesRepository;