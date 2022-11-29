const express = require('express');
const apiRouter = express.Router();
const db = require('./db');

// Get an array of all minions.
apiRouter.get('/minions', (req, res, next) => {
  const minions = db.getAllFromDatabase('minions');
  res.status(200).send(minions);
});

// Create a new minion and save it to the database.
apiRouter.post('/minions', (req, res, next) => {
  const newMinion = req.body;
  const result = db.addToDatabase('minions', newMinion);
  res.status(201).send(result);
});

// Get a single minion by id.
// TODO: continue from here

module.exports = apiRouter;
