const express = require('express');
const apiRouter = express.Router();
const db = require('./db');

apiRouter.get('/minions', (req, res, next) => {
  const minions = db.getAllFromDatabase('minions');
  res.status(200).send(minions);
});

module.exports = apiRouter;
