const knex = require("../database/knex");

class OrdersRepository {
    async create(order) {
        await knex("orders").insert(order);
    }

    async fetchUser(user_id) {
        return await knex("users").where("id", user_id).first();
    }

    async fetchOrders(user_id, isUserAdmin) {
        let orders;

        if (isUserAdmin) {
            orders = knex("orders").orderBy("created_at");
        } else {
            orders = knex("orders").where("user_id", user_id).orderBy("created_at");
        }

        return orders
    }

    async editOrder({ status, orderId }) {
        return knex("orders").update({ status }).where("id", orderId);
    }
}

module.exports = OrdersRepository;