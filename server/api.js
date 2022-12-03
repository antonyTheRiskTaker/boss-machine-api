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

  if (minions !== null) {
    res.status(200).send(minions);
  } else {
    res.status(500).send();
  }
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

// Update a single minion by id
apiRouter.put('/minions/:minionId', (req, res, next) => {
  const minionInfo = req.body;
  const minionId = req.minionId;

  if (minionInfo.id !== minionId) {
    res.status(404).send('Cannot find this minion');
  }
  
  const updatedMinion = db.updateInstanceInDatabase('minions', minionInfo);
  if (updatedMinion === null) {
    res.status(500).send('Problematic inputs passed the helper function for updating.');
  } else {
    res.status(200).send(updatedMinion);
  }
});

// Delete a single minion by id
apiRouter.delete('/minions/:minionId', (req, res, next) => {
  const minionId = req.minionId;
  const minionDeleted = db.deleteFromDatabasebyId('minions', minionId);

  if (minionDeleted) {
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

// Get an array of all ideas
apiRouter.get('/ideas', (req, res, next) => {
  const ideas = db.getAllFromDatabase('ideas');

  if (ideas !== null) {
    res.status(200).send(ideas);
  } else {
    res.status(500).send();
  }
});

apiRouter.post('/ideas', (req, res, next) => {
  // TODO: continue from here
});

module.exports = apiRouter;
