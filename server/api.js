const e = require('express');
const express = require('express');
const app = require('../server');
const apiRouter = express.Router();
const checkMillionDollarIdea = require('./checkMillionDollarIdea');
const {
  getAllFromDatabase,
  addToDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  deleteAllFromDatabase,
  createMeeting
} = require('./db');

// Database model type constants.
const MINIONS = 'minions';
const IDEAS = 'ideas';
const MEETINGS = 'meetings';

// Middleware to extract the minionId parameter for further processing.
apiRouter.param('minionId', (req, res, next, id) => {
  req.minionId = id;
  next();
});

apiRouter.param('ideaId', (req, res, next, id) => {
  req.ideaId = id;
  next();
});

// Get an array of all minions.
apiRouter.get('/minions', (req, res, next) => {
  const minions = getAllFromDatabase(MINIONS);

  if (minions !== null) {
    res.status(200).send(minions);
  } else {
    res.status(500).send();
  }
});

// Create a new minion and save it to the database.
apiRouter.post('/minions', (req, res, next) => {
  const newMinion = req.body;
  const result = addToDatabase(MINIONS, newMinion);
  res.status(201).send(result);
});

// Get a single minion by id.
apiRouter.get('/minions/:minionId', (req, res, next) => {
  const minionId = req.minionId;
  const targetMinion = getFromDatabaseById(MINIONS, minionId);

  if (targetMinion) {
    res.status(200).send(targetMinion);
  } else {
    res.status(404).send('Cannot find anyone with this ID.');
  }
});

// Update a single minion by id.
apiRouter.put('/minions/:minionId', (req, res, next) => {
  const minionInfo = req.body;
  const updatedMinion = updateInstanceInDatabase(MINIONS, minionInfo);

  if (updatedMinion !== null) {
    res.status(200).send(updatedMinion);
  } else {
    res.status(500).send('Problematic inputs');
  }
});

// Delete a single minion by id.
apiRouter.delete('/minions/:minionId', (req, res, next) => {
  const minionId = req.minionId;
  const minionDeleted = deleteFromDatabasebyId(MINIONS, minionId);

  if (minionDeleted) {
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

// Get an array of all ideas.
apiRouter.get('/ideas', (req, res, next) => {
  const ideas = getAllFromDatabase(IDEAS);

  if (ideas !== null) {
    res.status(200).send(ideas);
  } else {
    res.status(500).send();
  }
});

// Create a new idea and save it to the database.
apiRouter.post('/ideas', (req, res, next) => {
  const newIdea = req.body;
  const { numWeeks, weeklyRevenue } = newIdea;
  const isWorthyIdea = checkMillionDollarIdea(numWeeks, weeklyRevenue);
  if (isWorthyIdea) {
    const result = addToDatabase(IDEAS, newIdea);
    res.status(201).send(result);
  } else {
    const errorMessage = 'Make sure your idea is at least worth $1 million!';
    res.status(400).send(errorMessage);
  }
});

// Get a single idea by id.
apiRouter.get('/ideas/:ideaId', (req, res, next) => {
  const ideaId = req.ideaId;
  const targetIdea = getFromDatabaseById(IDEAS, ideaId);

  if (targetIdea !== null) {
    res.status(200).send(targetIdea);
  } else {
    res.status(500).send();
  }
});

// Update a single idea by id.
apiRouter.put('/ideas/:ideaId', (req, res, next) => {
  const ideaInfo = req.body;
  // TODO: continue from here (add checkMillionDollarIdea function)
  const updatedIdea = updateInstanceInDatabase(IDEAS, ideaInfo);

  if (updatedIdea !== null) {
    res.status(200).send(updatedIdea);
  } else {
    res.status(500).send('Problematic inputs');
  }
});

// Delete a single idea by id.
apiRouter.delete('/ideas/:ideaId', (req, res, next) => {
  const ideaId = req.ideaId;
  const ideaDeleted = deleteFromDatabasebyId(IDEAS, ideaId);

  if (ideaDeleted) {
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

// Get an array of all meetings.
apiRouter.get('/meetings', (req, res, next) => {
  const meetings = getAllFromDatabase(MEETINGS);

  if (meetings !== null) {
    res.status(200).send(meetings);
  } else {
    res.status(500).send();
  }
});

// Create a new meeting and save it to the database.
apiRouter.post('/meetings', (req, res, next) => {
  const newMeeting = createMeeting();
  const result = addToDatabase(MEETINGS, newMeeting);
  res.status(200).send(result);
});

// Delete all meetings from the database.
apiRouter.delete('/meetings', (req, res, next) => {
  const result = deleteAllFromDatabase(MEETINGS);
  
  if (result !== null) {
    res.status(204).send(result);
  } else {
    res.status(500).send();
  }
});

module.exports = apiRouter;
