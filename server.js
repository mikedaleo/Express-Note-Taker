const express = require('express');
const path = require('path');

// importing a custom middleware that console.logs request type
const { clog } = require('./middleware/clog');

// creating api variable to set up /api/ routes from the router provided in the index
const api = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(clog);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

// Route for the home page
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// Route for the /notes page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/notes.html'))
);

// Wildcard Route that will take you to the homepage when the route is undefined
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);