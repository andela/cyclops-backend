import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import route from './routes';

const app = express();

app.use(cors({ credentials: true, origin: true }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

route(app);

export default app;
