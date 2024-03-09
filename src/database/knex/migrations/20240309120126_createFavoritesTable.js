exports.up = knex => knex.schema.createTable("favorites", table => {
	table.text("id").primary();
    table.text("meal_name").notNullable();
    table.text("image_path").default(null);
    table.integer("meal_id").references("id").inTable("meals").onDelete("CASCADE");
    table.integer("user_id").references("id").inTable("users").onDelete("CASCADE");
});

exports.down = knex => knex.schema.dropTable("favorites");