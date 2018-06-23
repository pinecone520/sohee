const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: false }));

const snackRouter = require('./router/snack_router');
app.use(snackRouter);

module.exports = app;
