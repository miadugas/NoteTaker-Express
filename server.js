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

// these first app.get requests are for the html pages
app.get("/assets/css/styles.css", function(req, res) {
res.sendFile(path.join(__dirname, "/public/assets/css/styles.css"));
});

app.get("/assets/js/index.js", function(req, res) {
res.sendFile(path.join(__dirname, "/public/assets/js/index.js"));
});

app.get("/", function(req, res) {
res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function(req, res) {
res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", function(req, res) {
return res.json(dbNotes);
});
// these requests are for posting and deleting the notes
app.post("/api/notes", function(req, res) {
let newNote = req.body;
let id = dbNotes.length;
newNote.id = id + 1;
dbNotes.push(newNote);
dbUpdate(dbNotes);
return res.json(dbNotes);
});

app.delete("/api/notes/:id", (req, res) => {
let id = req.params.id;
let x = 1;
delete dbNotes[id - 1];
dbUpdate(dbNotes);
res.send(dbNotes);
});
// listener!
app.listen(PORT, function() {
console.log("http://localhost:" + PORT);
});