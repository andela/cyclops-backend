import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.status(200).json({
  status: 'success',
  data: 'Welcome to the Cyclops Barefoot Nomad backend API'
}));

app.get('/*', (req, res) => res.status(404).json({
  status: 'error',
  error: 'This route is unavailable on this server'
}));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
