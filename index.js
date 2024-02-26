const express = require('express')
const dotenv  = require('dotenv').config()
const bodyParser = require('body-parser')
const clienteRouter = require('./routes/clienteRoutes');
const dbConnect = require('./config/dbConnect');
const { authMiddleware } = require('./middlewares/authMiddleware');  // import authMiddleware
const Query = require('./models/clienteModel');    // import Query model
const app = express();
const PORT = process.env.PORT
dbConnect() 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))


app.get('/api/query', (req, res) => {
  const userQuery = req.query.userQuery;
  res.json({ response: `Tu consulta fue: ${userQuery}` });
});

app.post('/api/query', authMiddleware, async (req, res) => {  // use authMiddleware here
  const userQuery = new Query({
    userId: req.cliente._id,   // use req.cliente here
    // other fields...
  });

  try {
    await userQuery.save();
    res.status(200).send(userQuery);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.use('/api/clientes', clienteRouter);

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});