import { Request, Response } from 'express';
import db from '../database/connection';

export default class ConnectionsController {
	// LIST CONNECTION
	async index(request: Request, response: Response) {
		const totalConnections = await db('connections').count('* as total');
		const { total } = totalConnections[0];

		return response.json({ total });
	}

	// CREATE CONNECTION
	async create(request: Request, response: Response) {
		const { user_id } = request.body;

		await db('connections').insert({
			user_id
		});

		// 201 -> status de quando qualquer coisa é criada no backend
		return response.status(201).send();
	}
}
