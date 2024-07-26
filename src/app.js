const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { sequelize } = require('./model');
const apiRouter = require('./apiRouter');
const app = express();
app.use(bodyParser.json());
app.use(helmet());
app.set('sequelize', sequelize);
app.set('models', sequelize.models);
// add helmet to securing the app via headers.

app.use('/api', apiRouter);

module.exports = app;
