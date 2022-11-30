const express = require('express');
const app = require('../server');
const apiRouter = express.Router();
const db = require('./db');

// Middleware to extract the minionId parameter for further processing.
apiRouter.param('minionId', (req, res, next, id) => {
  req.minionId = id;
  next();
});

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
apiRouter.get('/minions/:minionId', (req, res, next) => {
  const minionId = req.minionId;
  const foundMinion = db.getFromDatabaseById('minions', minionId);
  if (foundMinion) {
    res.status(200).send(foundMinion);
  } else {
    res.status(404).send('Cannot find anyone with this ID.');
  }
});

module.exports = apiRouter;
