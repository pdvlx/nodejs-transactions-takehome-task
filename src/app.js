const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');

const { sequelize } = require('./model');
const apiRouter = require('./apiRouter');
const app = express();
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());
app.set('sequelize', sequelize);
app.set('models', sequelize.models);

app.use('/api', apiRouter);

module.exports = app;
