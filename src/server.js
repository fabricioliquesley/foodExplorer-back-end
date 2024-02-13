require("dotenv/config");
const express = require("express");

const app = express();
app.use(express.json());

app.post("/", (request, response) => {
    const {name} = request.body;

    response.status(201).json(name);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`API is listening on PORT: ${PORT}`));