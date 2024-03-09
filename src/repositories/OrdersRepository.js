const knex = require("../database/knex");

class OrdersRepository {
    async create(order){
        await knex("orders").insert(order);
    }

    async fetchOrders(user_id){
        return knex("orders").where("user_id", user_id).orderBy("created_at");
    }

    async editOrder({ status, orderId }) {
        return knex("orders").update({status}).where("id", orderId);
    }
}

module.exports = OrdersRepository;