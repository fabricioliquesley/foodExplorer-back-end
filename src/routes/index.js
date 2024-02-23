const { Router } = require("express");

const userRoutes = require("./user.routes");
const sessionsRoutes = require("./sessions.routes");
const mealsRoutes = require("./meals.routes");
const ordersRoutes = require("./orders.routes");

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/sessions", sessionsRoutes);
routes.use("/meals", mealsRoutes);
routes.use("/orders", ordersRoutes);

module.exports = routes;