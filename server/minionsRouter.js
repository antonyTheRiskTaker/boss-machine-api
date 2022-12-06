const express = require('express');
const minionsRouter = express.Router();

const {
  getAllFromDatabase,
  addToDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId
} = require('./db');

// Database model type constant for minions.
const MINIONS = 'minions';

// Middleware that extracts the minionId parameter for further processing.
minionsRouter.param('minionId', (req, res, next, id) => {
  req.minionId = id;
  next();
});

// Get an array of all minions.
minionsRouter.get('/', (req, res, next) => {
  const minions = getAllFromDatabase(MINIONS);

  if (minions !== null) {
    res.status(200).send(minions);
  } else {
    res.status(500).send();
  }
});

// Create a new minion and save it to the database.
minionsRouter.post('/', (req, res, next) => {
  const newMinion = req.body;
  const result = addToDatabase(MINIONS, newMinion);
  res.status(201).send(result);
});

// Get a single minion by id.
minionsRouter.get('/:minionId', (req, res, next) => {
  const minionId = req.minionId;
  const targetMinion = getFromDatabaseById(MINIONS, minionId);

  if (targetMinion) {
    res.status(200).send(targetMinion);
  } else {
    res.status(404).send('Cannot find anyone with this ID.');
  }
});

// Update a single minion by id.
minionsRouter.put('/:minionId', (req, res, next) => {
  const minionInfo = req.body;
  const updatedMinion = updateInstanceInDatabase(MINIONS, minionInfo);

  if (updatedMinion !== null) {
    res.status(200).send(updatedMinion);
  } else {
    res.status(500).send('Problematic inputs');
  }
});

// Delete a single minion by id.
minionsRouter.delete('/:minionId', (req, res, next) => {
  const minionId = req.minionId;
  const minionDeleted = deleteFromDatabasebyId(MINIONS, minionId);

  if (minionDeleted) {
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

module.exports = minionsRouter;