exports.up = knex => knex.schema.createTable("orders", table => {
	table.text("id").primary();
    table.text("status").notNullable();
    table.integer("codigo").notNullable();
    table.text("details").notNullable();
    table.integer("meal_id").references("id").inTable("meals").onDelete("CASCADE");
    table.integer("user_id").references("id").inTable("users").onDelete("CASCADE");
    
    table.timestamp("created_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("orders");