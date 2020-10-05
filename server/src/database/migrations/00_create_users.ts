import Knex from 'knex';

// @http://knexjs.org/#Migrations

// quais as alterações que pretendo fazer
export async function up(knex: Knex) {
	// criar uma nova tabela
	return knex.schema.createTable('users', (table) => {
		table.increments('id').primary();
		table.string('name').notNullable();
		table.string('avatar').notNullable();
		table.string('whatsapp').notNullable();
		table.string('bio').notNullable();
	});
}

// se der cocó o que tenho de fazer (tipo undo)
export async function down(knex: Knex) {
	return knex.schema.dropTable('users');
}

// nome do arquivo -> usar numero para ordenar, uma vez que o knex vai ler as tabelas por ordem, e se tiver tabelas dependentes antes da tabela principal vai dar cocó
