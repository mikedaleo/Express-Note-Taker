// import the Express Router module
const router = require('express').Router();

// import our modular route for /notes
const notesRouter = require('./notes');

// sets up the main router to use the notesRouter for any routes that start with /notes
router.use('/notes', notesRouter);

// exports the main router for use in other files
module.exports = router; 