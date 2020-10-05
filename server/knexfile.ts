import path from 'path'; //path do node

//'module.exports' -> sintaxe mais antiga. Não pode ser com a sintaxe mais nova porque o knex ainda não consegue interpretar
module.exports = {
	client: 'sqlite3',
	connection: {
		filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite')
	},
	migrations: {
		directory: path.resolve(__dirname, 'src', 'database', 'migrations')
	},
	useNullAsDefault: true
};

// o knex corre como JS, com este ficheiro
// o knex executa procurando arquivos de JS
