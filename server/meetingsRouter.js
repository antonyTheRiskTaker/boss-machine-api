const express = require('express');
const meetingsRouter = express.Router();

const {
  getAllFromDatabase,
  addToDatabase,
  deleteAllFromDatabase,
  createMeeting
} = require('./db');

// Database model type constant for meetings.
const MEETINGS = 'meetings';

// Get an array of all meetings.
meetingsRouter.get('/', (req, res, next) => {
  const meetings = getAllFromDatabase(MEETINGS);

  if (meetings !== null) {
    res.status(200).send(meetings);
  } else {
    res.status(500).send();
  }
});

// Create a new meeting and save it to the database.
meetingsRouter.post('/', (req, res, next) => {
  const newMeeting = createMeeting();
  const result = addToDatabase(MEETINGS, newMeeting);
  res.status(201).send(result);
});

// Delete all meetings from the database.
meetingsRouter.delete('/', (req, res, next) => {
  const result = deleteAllFromDatabase(MEETINGS);
  
  if (result !== null) {
    res.status(204).send(result);
  } else {
    res.status(500).send();
  }
});

module.exports = meetingsRouter;