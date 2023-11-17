
const express = require('express')
const dotenv = require('dotenv')
const path = require('path');
const fs = require('fs');

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", function (request, response) {
    response.send("Node server is up & running for Node Day1 Task - NodeJS File System!!!");
});
    
//Creating date and time
const time_stamp = new Date().toString();
const date_time = new Date();
const date = ("0" + date_time.getDate()).slice(-2);
const month = ("0" + (date_time.getMonth() + 1)).slice(-2);
const year = date_time.getFullYear();
const hours = date_time.getHours();
const minutes = date_time.getMinutes();
const seconds = date_time.getSeconds();
const currentDateTime = date + "_" + month + "_" + year + "-" + hours + "_" + minutes + "_" + seconds;

// adding new text file to a folder with content current timestamp;
app.post("/file", function (request, response) {
    fs.writeFile(`./textFile/${currentDateTime}.txt`, time_stamp, (err) => {
        console.log("file created!!!");
        response.send("file created!!!");
    });
});

// retrieving the added text files list from folder


app.get("/file", function (request, response) {
    // Construct an absolute path to the textFile directory
    const textFilePath = path.resolve(__dirname, 'textFile');

    fs.readdir(textFilePath, (err, files) => {
        if (err) {
            console.error("Error reading files:", err);
            response.status(500).send("Error reading files: " + err);
        } else {
            console.log("Available files:", files);
            response.send(files);
        }
    });
});

app.listen(PORT, () => console.log(`The server started in: ${PORT} `));