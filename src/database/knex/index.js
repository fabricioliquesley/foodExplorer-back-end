const config = require("../../../knexfile");
const knex = require("knex");

// Estabelece a conexão com o database usando o knex.
const connection = knex(config.development);

module.exports = connection;