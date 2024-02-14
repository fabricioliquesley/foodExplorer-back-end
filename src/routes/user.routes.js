const { Router } = require("express");

const userRoutes = Router();

userRoutes.get("/", (request, response) => {
    response.send("Route of user");
})

module.exports = userRoutes;