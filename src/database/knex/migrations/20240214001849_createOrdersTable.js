exports.up = knex => knex.schema.createTable("orders", table => {
	table.text("id");
    table.text("number").notNullable();
    table.integer("total").notNullable();
    table.integer("meal_id").references("id").inTable("meals").onDelete("CASCADE");
    table.integer("user_id").references("id").inTable("users").onDelete("CASCADE");
});

exports.down = knex => knex.schema.dropTable("orders");