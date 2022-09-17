import 'reflect-metadata';
import 'dotenv/config';
import express, { Request, Response } from 'express';
import fetch from 'node-fetch';
import 'express-async-errors';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());
app.set('view engine', 'ejs');
app.use(express.static('../../../web/public'));
app.use(express.urlencoded({ extended: true }));

app.post('/', (req: Request, res: Response) => {});

app.listen(process.env.PORT, () => {
	console.log(`Rodando na porta ${process.env.PORT}`);
});
