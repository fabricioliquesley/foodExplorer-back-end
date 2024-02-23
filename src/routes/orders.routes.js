const { Router } = require("express");
const ensureAuthenticated = require("../middleware/ensureAuthenticated")
const OrdersController = require("../controllers/OrdersController");

const ordersRoutes = Router();

ordersRoutes.use(ensureAuthenticated);

const ordersController = new OrdersController();

ordersRoutes.post("/", ordersController.create);
ordersRoutes.get("/", ordersController.fetchOrders);

module.exports = ordersRoutes;