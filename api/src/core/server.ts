import 'reflect-metadata';
import 'dotenv/config';
import express, { Request, Response } from 'express';
import axios from 'axios';
import 'express-async-errors';
import cors from 'cors';
import { info } from 'console';

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
	console.log('HELLO');
	const videoUrl = req.body.videoUrl;
	if (!videoUrl) {
		return res.render('index', {
			success: false,
			message: 'Please, enter a video URL',
		});
	}
	const options = {
		method: 'GET',
		url: 'https://youtube-mp36.p.rapidapi.com/dl',
		params: { id: videoUrl },
		headers: {
			'X-RapidAPI-Key': process.env.RAPID_API_KEY,
			'X-RapidAPI-Host': process.env.RAPID_API_HOST,
		},
	};
	axios
		.request(options)
		.then(function (response) {
			if (response.data.status === 'ok') {
				console.log(response.data);
				return res.render('index', {
					success: true,
					song_title: response.data.title,
					song_link: response.data.link,
				});
			} else {
				return res.render('index', {
					success: false,
					message: response.data.msg,
				});
			}
		})
		.catch(function (error) {
			console.error(error);
			return res.render('index', {
				success: false,
				message: error.message,
			});
		});
});

app.listen(process.env.PORT, () => {
	console.log(`Rodando na porta ${process.env.PORT}`);
});
