const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const FIXTURE = require('./fixture');

const USER = 'user@hellofresh.com';
const PASSWORD = '123';

const PORT = 3001;
const TOKEN = 'foo-bar';

app.use(morgan('tiny'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).send('HelloFresh Api');
});

app.post('/login', (req, res) => {
  if (req.body.user === USER && req.body.password === PASSWORD) {
    return res.status(200).send({
      status: 'ok',
      token: TOKEN,
    });
  }

  return res.status(401).send({
    status: 'error',
    message: 'Invalid user and/or password ',
  });
});

app.get('/recipes', (req, res) => {
  if (req.headers.token === TOKEN) {
    return res.status(200).send({
      status: 'ok',
      data: FIXTURE,
    });
  }

  return res.status(403).send({
    status: 'error',
    data: 'User not authenticated',
  });
});

app.listen(PORT, 'localhost', (err) => {
  if (err) {
    console.log(err);
  }

  console.info(`🌎  Listening on port ${PORT}`);
});
