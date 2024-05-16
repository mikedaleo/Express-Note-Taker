const fs = require('fs');
const util = require('util');

// promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

// function to write data to the JSON file given a destination and some content
const writeToFile = (destination, content) => 
    fs.writeFile(destination, JSON.stringify(content, null, 4),
(err) => 
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
);

// function to read data from a given a file and append some content
const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        }
    });
};

// export functions for use in other files
module.exports = { readFromFile, writeToFile, readAndAppend };