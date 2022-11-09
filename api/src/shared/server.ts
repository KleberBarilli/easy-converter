import 'reflect-metadata';
import 'dotenv/config';
import express, { Request, Response } from 'express';
import fetch from 'node-fetch';
import path from 'path';
import 'express-async-errors';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
	res.render('index');
});
app.post('/convert-mp3', async (req: Request, res: Response) => {
	const videoUrl = req.body.videoUrl;
	if (!videoUrl) {
		return res.render('index', {
			success: false,
			message: 'Please, enter a video URL',
		});
	}
	const api = await fetch(
		`https://youtube-mp36.p.rapidapi.com/dl?id=${videoUrl}`,
		{
			method: 'GET',
			headers: {
				'x-rapidapi-key': process.env.RAPID_API_KEY || '',
				'x-rapidapi-host': process.env.RAPID_API_HOST || '',
			},
		},
	);
	const response = await api.json();
	if (response == 'ok') {
		return res.render('index', {
			success: true,
			song_title: response.title,
			song_link: response.link,
		});
	}
});

app.listen(process.env.PORT, () => {
	console.log(`Rodando na porta ${process.env.PORT}`);
});
