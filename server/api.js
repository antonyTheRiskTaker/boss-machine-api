const express = require('express');
const app = require('../server');
const apiRouter = express.Router();

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
const MEETINGS = 'meetings';

// Require routers for specific collections of resources
const minionsRouter = require('./minionsRouter');
const ideasRouter = require('./ideasRouter');
apiRouter.use('/minions', minionsRouter);
apiRouter.use('/ideas', ideasRouter);

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