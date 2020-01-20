const express = require("express");
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT || 3000;
let app = express();
let db = require("./db/db.json");
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const dbNotes = JSON.parse(
fs.readFileSync(path.join(__dirname, "/db/db.json"), (err, data) => {
    if (err) throw err;
})
);

const dbUpdate = dbNotes => {
fs.writeFileSync(
    path.join(__dirname, "/db/db.json"),
    JSON.stringify(dbNotes),
    err => {
    if (err) throw err;
    }
);
};
