const express = require('express');

const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const FIXTURE = require('./fixture');

const EMAIL = 'user@hellofresh.com';
const PASSWORD = '123';

const PORT = 3001;
const TOKEN = 'foo-bar';

app.use(morgan('tiny'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, token');

  next();
});

app.get('/', (req, res) => {
  res.status(200).send('HelloFresh Api');
});

app.post('/login', (req, res) => {
  if (req.body.email === EMAIL && req.body.password === PASSWORD) {
    return res.status(200).send({
      status: 'ok',
      user: {
        name: 'User HelloFresh',
        email: EMAIL,
      },
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
      recipes: FIXTURE,
    });
  }

  return res.status(403).send({
    status: 'error',
    message: 'User not authenticated',
  });
});

app.listen(PORT, 'localhost', (err) => {
  if (err) {
    console.log(err);
  }

  console.info(`🌎  Listening on port ${PORT}`);
});
