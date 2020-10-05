import { Request, Response } from 'express';
import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';

// interface para definir o formato do item quando fazemos o schedule.map((item: scheduleItem), neste caso um objeto
interface scheduleItem {
	week_day: number;
	from: string;
	to: string;
}

export default class ClassesController {
	//
	// LIST CLASS
	async index(request: Request, response: Response) {
		const filters = request.query;
		const subject = filters.subject as string;
		const week_day = filters.week_day as string;
		const time = filters.time as string;

		if (!filters.week_day || !filters.subject || !filters.time) {
			return response.status(400).json({
				error: 'Missing filters to search classes'
			});
		}

		const timeInMinutes = convertHourToMinutes(time as string);

		// query classes table with search
		const classes = await db('classes')
			.whereExists(function() {
				this.select('class_schedule.*')
					.from('class_schedule')
					.whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
					.whereRaw('`class_schedule`.`week_day` = ??', [
						Number(week_day)
					])
					.whereRaw('`class_schedule`.`from` <= ??', [
						timeInMinutes
					])
					.whereRaw('`class_schedule`.`to` > ??', [
						timeInMinutes
					]);
			})
			.where('classes.subject', '=', subject)
			.join('users', 'classes.user_id', '=', 'users.id')
			.select([
				'classes.*',
				'users.*'
			]);

		response.json(classes);
	}

	//
	// CREATE CLASS
	async create(request: Request, response: Response) {
		const { name, avatar, whatsapp, bio, subject, cost, schedule } = request.body;

		// db.transaction() para fazer com que todas as operações em sequência e, caso ocorra um erro a meio do processo, desfazer o que já tinha sido inserido até aí. se correr tudo bem fazer o commit, isto é inserir na db
		const trx = await db.transaction();

		try {
			// insert into users
			const insertedUsersIds = await trx('users').insert({
				// await trx('users') em vez de await db('users')
				name,
				avatar,
				whatsapp,
				bio
			});

			const user_id = insertedUsersIds[0];

			// insert into classes
			const insertedClassesIds = await trx('classes').insert({
				subject,
				cost,
				user_id
			});

			const class_id = insertedClassesIds[0];

			const classSchedule = schedule.map((item: scheduleItem) => {
				return {
					class_id,
					week_day: item.week_day,
					from: convertHourToMinutes(item.from),
					to: convertHourToMinutes(item.to)
				};
			});
			// função convertHourToMinutes() em utils / convertHourToMinutes.ts

			// insert into class_schedule
			await trx('class_schedule').insert(classSchedule);

			// só neste momento é que ele insere todos os dados ao mesmo tempo
			await trx.commit();

			// criado com sucesso
			return response.status(201).send();
		} catch (err) {
			console.log(err);
			// desfaz o que já tinha sido transacionado com sucesso até ao erro
			await trx.rollback();

			return response.status(400).json({ error: 'unsuspected while creating new class' });
		}
	}
}
