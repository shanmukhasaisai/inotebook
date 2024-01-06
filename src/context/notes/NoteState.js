import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = props => {
	const host = "http://localhost:5000";
	const intialNotes = [];
	const [notes, setNotes] = useState(intialNotes);
	//function to fetch all the notes from the backend
	const getNotes = async () => {
		// to do api call to create a note in the backend
		const response = await fetch(`${host}/api/notes/fetchallnotes`, {
			method: "GET", // *GET, POST, PUT, DELETE, etc.

			headers: {
				"Content-Type": "application/json",
				"auth-token":
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU5NTk3MDY2MjY3MGE0ZDAwYTM5NjdiIn0sImlhdCI6MTcwNDMwMzY0N30.ITXlJgEkrIf-MxRW4htcl01Poqpn-NP9ou6JkxuXZcw",
			},
		});
		const json = await response.json();
		setNotes(json);
	};

	//function to add the note dyanmically
	const addNote = async (title, description, tag) => {
		// to do api call to create a note in the backend
		const response = await fetch(`${host}/api/notes/addnote`, {
			method: "POST", // *GET, POST, PUT, DELETE, etc.

			headers: {
				"Content-Type": "application/json",
				"auth-token":
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU5NTk3MDY2MjY3MGE0ZDAwYTM5NjdiIn0sImlhdCI6MTcwNDMwMzY0N30.ITXlJgEkrIf-MxRW4htcl01Poqpn-NP9ou6JkxuXZcw",
			},

			body: JSON.stringify({ title, description, tag }),
		});

		const json = await response.json();

		setNotes(notes.concat(json));
	};
	// function to delete the note dynamically
	const deleteNote = async id => {
		// to do api call for update in the backend
		const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
			method: "DELETE", // *GET, POST, PUT, DELETE, etc.

			headers: {
				"Content-Type": "application/json",
				"auth-token":
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU5NTk3MDY2MjY3MGE0ZDAwYTM5NjdiIn0sImlhdCI6MTcwNDMwMzY0N30.ITXlJgEkrIf-MxRW4htcl01Poqpn-NP9ou6JkxuXZcw",
			},
		});
		const json = await response.json();
		console.log(json);
		const newNotes = notes.filter(note => {
			return note._id !== id;
		});
		setNotes(newNotes);
	};
	// function to edit the exising note
	const editNote = async (id, title, description, tag) => {
		// to do api call for editing the existing note in the backend
		const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
			method: "PUT", // *GET, POST, PUT, DELETE, etc.

			headers: {
				"Content-Type": "application/json",
				"auth-token":
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU5NTk3MDY2MjY3MGE0ZDAwYTM5NjdiIn0sImlhdCI6MTcwNDMwMzY0N30.ITXlJgEkrIf-MxRW4htcl01Poqpn-NP9ou6JkxuXZcw",
			},

			body: JSON.stringify({ title, description, tag }),
		});
		const json = await response.json();
		console.log(json);
		let newNotes = JSON.parse(JSON.stringify(notes));
		for (let index = 0; index < newNotes.length; index++) {
			const element = newNotes[index];
			if (element._id === id) {
				newNotes[index].title = title;
				newNotes[index].description = description;
				newNotes[index].tag = tag;
				break;
			}
		}
		setNotes(newNotes);
	};

	return (
		<NoteContext.Provider
			value={{ notes, getNotes, addNote, deleteNote, editNote }}
		>
			{props.children}
		</NoteContext.Provider>
	);
};

export default NoteState;
