const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const FIXTURE = require('./fixture');

const USER = 'user@hellofresh.com';
const PASSWORD = '123';

const PORT = 3001;

app.use(morgan('tiny'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('HelloFresh Api')
});

app.post('/login', (req, res) => {
  if (req.body.user === USER && req.body.password === PASSWORD) {
    return res.send({
      status: 'ok',
      token: 'foo-bar',
    });
  }

  return res.send({
    status: 'error',
    message: 'Invalid user and/or password ',
  });
});

app.get('/recipes', (req, res) => {
  return res.send({
    status: 'ok',
    data: FIXTURE,
  });
});

app.listen(PORT, 'localhost', err => {
  if (err) {
    console.log(err);
  }

  console.info(`🌎  Listening on port ${PORT}`);
});
