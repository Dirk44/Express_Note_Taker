const { v4: uuid } = require("uuid");
const fs = require("fs");
const path = require("path");
const db = require("../db/db.json");


module.exports = {
    postNotes: function (req, res) {
        const note = { ...req.body, id: uuid() };
        fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", function (err, data) {
            if (err) throw err;
            const allNotes = JSON.parse(data);
            allNotes.push(note);
            fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(allNotes), function (err, data) {
                if (err) throw err;
                res.json(allNotes)
            })
        })
    },
    getNotes: function (req, res) {
        fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", function (err, data) {
            if (err) throw err;
        res.json(JSON.parse(data));
        })
    },
    deleteNotes: function (req, res) {
        const id = req.params.id;
        console.log(id);
        fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", function (err, data) {
            if (err) throw err;
            const allNotes = JSON.parse(data);
            const updatedNotes = allNotes.filter((note) => note.id != id );
            fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(updatedNotes), function () {})
        })
        res.sendFile(path.join(__dirname, "../public/notes.html"))
    },
}