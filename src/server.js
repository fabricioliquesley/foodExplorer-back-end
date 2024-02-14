require("dotenv/config");
require("express-async-errors");

const AppError = require("./utils/AppError");
const express = require("express");

const app = express();
const routes = require("./routes/index");

app.use(express.json());

app.use(routes);

app.use((error, request, response, next) => {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        })
    }

    console.error(error);

    return response.status(500).json({
        status: "error",
        message: "Internal Server Error"
    })
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`API is listening on PORT: ${PORT}`));