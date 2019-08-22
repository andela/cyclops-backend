import express from 'express';
import bodyParser from 'body-parser';
import route from './routes';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

route(app);

export default app;
