const notes = require('express').Router();
// import a function that generates a random number for the id
const { v4: uuidv4 } = require('uuid');

// import helper functions to read, append and write to files
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');

// GET route for retrieving all notes
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// GET route for a specific note
notes.get('/:note_id', (req, res) => {
    const noteID = req.params.note_id;
    readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
        const result = json.filter((note) => note.id === noteID);
        return result.length > 0
            ? res.json(result)
            : res.json('No note with that ID')
    })
});

// DELETE route for a specific note
notes.delete('/:note_id', (req, res) => {
    const noteID = req.params.note_id;
    readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
        const result = json.filter((note) => note.id !== noteID);
        writeToFile('./db/db.json', result);
        res.json(`Note ${noteID} has been deleted`);
    });
});

// POST route for a new note
notes.post('/', (req, res) => {
    console.log(req.body);

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };

        readAndAppend(newNote, './db/db.json');
        res.json(`Note added successfully`);
    } else {
        res.error('Error in adding note');
    }
});

module.exports = notes;