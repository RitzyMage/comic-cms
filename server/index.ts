import express from 'express';
import ClientController from './controllers/ClientController';
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

const clientController = new ClientController();

app.get('/api/count', async (req, res) => res.send(await clientController.getComicCount()));
app.get('/api/:id', async (req, res) => {
	let id = parseInt(req.params.id);
	res.send(await clientController.getComic(id));
});

app.listen(PORT, () => {
	console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
