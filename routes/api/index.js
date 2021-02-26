const router = require("express").Router();
const API = require("../../controllers/apiController");

//study me
router.get("/notes", API.getNotes);

router.post("/notes", API.postNotes);

router.delete("/notes/:id", API.deleteNotes);

module.exports = router;