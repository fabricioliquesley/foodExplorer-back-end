const OrdersRepository = require("../repositories/OrdersRepository");
const OrdersService = require("../services/OrdersService");

class OrdersController {
    async create(request, response) {
        const user_id = request.user.id;
        const { orderDetails } = request.body;

        const ordersRepository = new OrdersRepository();
        const orderService = new OrdersService(ordersRepository);

        const order = await orderService.executeCreate({ orderDetails, user_id });

        response.status(201).json(order)
    }

    async fetchOrders(request, response) {
        const user_id = request.user.id;

        const ordersRepository = new OrdersRepository();
        const orderService = new OrdersService(ordersRepository);

        const orders = await orderService.executeFetchOrders(user_id);

        response.json(orders);
    }
}

module.exports = OrdersController;