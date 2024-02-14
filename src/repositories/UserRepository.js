const knex = require("../database/knex");

class UserRepository {
    async checkEmail(email) {
        const user = await knex("users").where("email", email).first();

        return user;
    }

    async createUser(data) {
        return await knex("users").insert(data);
    }   
}

module.exports = UserRepository;