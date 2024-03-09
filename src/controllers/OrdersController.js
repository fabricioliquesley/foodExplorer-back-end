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

    async editOrder(request, response) {
        const { status } = request.body;
        const { id: orderId } = request.params;

        const ordersRepository = new OrdersRepository();
        const orderService = new OrdersService(ordersRepository);

        await orderService.editOrder({ status, orderId });

        response.status(200).send();
    }
}

module.exports = OrdersController;