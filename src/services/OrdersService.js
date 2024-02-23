const { randomUUID } = require("node:crypto")

class OrdersService {
    constructor(ordersRepository) {
        this.ordersRepository = ordersRepository;
    }

    generateOrderCode() {
        const numero = Math.floor(10000000 + Math.random() * 90000000);

        return numero;
    }

    objectToString(object) {
        let string = '';
        const keys = Object.keys(object);

        keys.forEach((key, index) => {
            string += `${object[key]}`;

            if (index !== keys.length - 1) {
                string += " x ";
            }
        });

        return string;
    }

    async executeCreate({ orderDetails, user_id }) {
        let detailsFormatted = "";

        const id = randomUUID();

        orderDetails.map((order, index) => {
            detailsFormatted += this.objectToString(order);

            if (index !== orderDetails.length - 1) {
                detailsFormatted += ", ";
            }
        })

        const order = {
            id,
            status: "pendente",
            code: String(this.generateOrderCode()),
            details: detailsFormatted,
            user_id
        }

        await this.ordersRepository.create(order);

        return order;
    }

    async executeFetchOrders(user_id) {
        const orders = await this.ordersRepository.fetchOrders(user_id);

        return orders;
    }
}

module.exports = OrdersService;