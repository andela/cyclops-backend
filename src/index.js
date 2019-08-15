import express from "express";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the Cyclops Barefoot Nomad backend API',
}));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})

export default app;


