exports.up = knex => knex.schema.createTable("meals", table => {
	table.text("id");
    table.text("name").notNullable();
    table.text("category").notNullable();
    table.text("image_path").default(null);
    table.integer("preco").notNullable();
    table.text("description").notNullable();
});

exports.down = knex => knex.schema.dropTable("meals");