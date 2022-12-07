const express = require('express');
const ideasRouter = express.Router();

const {
  getAllFromDatabase,
  addToDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId
} = require('./db');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

// Database model type constant for ideas.
const IDEAS = 'ideas';

ideasRouter.param('ideaId', (req, res, next, id) => {
  req.ideaId = id;
  next();
});

// Get an array of all ideas.
ideasRouter.get('/', (req, res, next) => {
  const ideas = getAllFromDatabase(IDEAS);

  if (ideas !== null) {
    res.status(200).send(ideas);
  } else {
    res.status(500).send();
  }
});

// Create a new idea and save it to the database.
ideasRouter.post('/', (req, res, next) => {
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
ideasRouter.get('/:ideaId', (req, res, next) => {
  const ideaId = req.ideaId;
  const targetIdea = getFromDatabaseById(IDEAS, ideaId);

  if (targetIdea !== null) {
    res.status(200).send(targetIdea);
  } else {
    res.status(500).send();
  }
});

// Update a single idea by id.
ideasRouter.put('/:ideaId', (req, res, next) => {
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
ideasRouter.delete('/:ideaId', (req, res, next) => {
  const ideaId = req.ideaId;
  const ideaDeleted = deleteFromDatabasebyId(IDEAS, ideaId);

  if (ideaDeleted) {
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

module.exports = ideasRouter;