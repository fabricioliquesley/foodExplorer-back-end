exports.up = knex => knex.schema.createTable("users", table => {
	table.text("id").primary();
    table.text("name").notNullable();
    table.text("email").notNullable();
    table.text("password").notNullable();
    table.text("accountType").default("common");

    table.timestamp("created_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("users");