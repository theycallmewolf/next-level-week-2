import express from 'express';
import cors from 'cors';
import routes from './routes';

console.log('matrix reloaded');

const app = express();

app.use(cors());
// adiciona um plugin para converter o json para um objeto JS
app.use(express.json());
app.use(routes);

// // ROUTE
// // http://localhost:3333/users
// // recurso : "/users"
// app.get('/users', (request, response) => {
// 	// return response.send('hello world'); //método send envia uma string

// 	const users = [
// 		{ name: 'Bruno', age: 41 },
// 		{ name: 'Raquel', age: 39 },
// 		{ name: 'Pita', age: 40 }
// 	];
// 	return response.json([
// 		users
// 	]);
// });

// // corpo (Request Body): dados para criação ou atualização de um registo
// // Route Params: identificar qual o recurso eu quero atualizar ou apagar - app.delete('users/:id')
// // Query Params: paginação, filtros, ordenar, etc - http://localhost:3333/users?page=2&sort=name

// app.post('/users', (request, response) => {
// 	console.log(request.body);

// 	const users = [
// 		{ name: 'Bruno', age: 41 },
// 		{ name: 'Raquel', age: 39 },
// 		{ name: 'Pita', age: 40 }
// 	];

// 	return response.json(users);
// });

// http://localhost:3333/users
app.listen(3333);
// faz a nossa app ouvir requisições HTTP - recebe um parâmetro que é a porta de acesso (quando não aparece a porta é a porta 80, ou seja, porta padrão)
