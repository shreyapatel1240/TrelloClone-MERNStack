const bodyParser = require('body-parser');
const express = require('express');

const path = require('path')

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/login', require('./routes/login').router);
app.use('/todo', require('./routes/todo').router);
app.use('/status', require('./routes/status').router);
app.use('/user', require('./routes/user').router);
app.use('/board', require('./routes/board').router);

app.use('/', express.static(path.join(__dirname, '../build')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'))
})

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    const errors = [
      { message: 'unauthorized' },
    ];

    res.status(401).json({ errors });
  }
  res.status(500).json(err)
});

module.exports = app;