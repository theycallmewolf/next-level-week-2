import express from 'express';
import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';

const routes = express.Router();
const classesController = new ClassesController();
const connectionsController = new ConnectionsController();

// ROUTE - CRIAÇÃO DA AULA
// controllers / ClassesController.ts
routes.post('/classes', classesController.create);

// routes.post('/classes', async create(request: Request, response: Response) => {
// const { name, avatar, whatsapp, bio, subje...
//...classesControler.create

// ROUTE - LISTAR AULAS
routes.get('/classes', classesController.index);

// ROUTE - CRIAR CONEXÃO
routes.post('/connections', connectionsController.create);
routes.get('/connections', connectionsController.index);

export default routes;
