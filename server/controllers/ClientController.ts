import knex from 'knex';
const connection = knex(require('../knexfile'));

export default class ClientController {
	async getComicCount() {
		return await connection('comics').count('id', { as: 'count' }).first();
	}

	async getComic(id: number) {
		return await connection('comics').where({ id }).first();
	}
}
