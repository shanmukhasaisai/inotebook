const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// Route 1: get all the notes using GET : "api/note/fetchallnotes"
router.get("/fetchallnotes", fetchuser, async (req, res) => { 
	try {
		const notes = await Notes.find({ user: req.user.id });
		res.json(notes);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Internal error occured");
	}
});
// Route 2: add the notes using post : "api/note/addnote"
router.post(
	"/addnote",
	fetchuser,
	[
		body("title", "Enter a Valid Name").isLength({ min: 3 }),
		body(
			"description",
			"description must contain atleast 5 characters "
		).isLength({
			min: 5,
		}),
	],
	async (req, res) => {
		try {
			const { title, description, tag } = req.body;
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}
			const note = new Notes({
				title,
				description,
				tag,
				user: req.user.id,
			});
			const savedNote = await note.save();

			res.json({Success: "Note has been added",savedNote});
		} catch (error) {
			console.error(error.message);
			res.status(500).send("Internal error occured");
		}
	}
);
// Route 3: update the notes using put : "api/note/updatenote"
router.put("/updatenote/:id", fetchuser, async (req, res) => {
	try {
		const { title, description, tag } = req.body;
		//create a new Note
		const newNote = {};
		if (title) {
			newNote.title = title;
		}
		if (description) {
			newNote.description = description;
		}
		if (tag) {
			newNote.tag = tag;
		}
		//find the note to be updated and update it
		let note = await Notes.findById(req.params.id);
		if (!note) {
			return res.status(400).send("not found");
		}
		if (note.user.toString() !== req.user.id) {
			return res.status(400).send("not allowred");
		}
		note = await Notes.findByIdAndUpdate(
			req.params.id,
			{ $set: newNote },
			{ new: true }
		);
		res.json({ Success: "Note has been updated",note });
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Internal error occured");
	}
});
// Route 4: delete the notes using delete : "api/note/deletenote"
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
	try {
		//find the note to be updated and delete it
		let note = await Notes.findById(req.params.id);
		//if the note which want to be deleted is not found then return error
		if (!note) {
			return res.status(400).send("not found");
		}
		//deletion of the notes happend when the note only belong to the user
		if (note.user.toString() !== req.user.id) {
			return res.status(400).send("not allowred");
		}
		note = await Notes.findByIdAndDelete(req.params.id);
		res.json({ Success: "Note has been deleted", note: note });
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Internal error occured");
	}
});

module.exports = router;
