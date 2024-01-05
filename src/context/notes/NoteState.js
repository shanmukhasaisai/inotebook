import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = props => {
	const intialNotes = [
		{
			_id: "65964065364eec14b277801d7",
			user: "6595970662670a4d00a3967b",
			title: "hello  title",
			description: "hello description",
			tag: "nothing personal",
			date: "2024-01-04T05:21:41.204Z",
			__v: 0,
		},
		{
			_id: "65967e3f66c4b1a9599df7cb3",
			user: "6595970662670a4d00a3967b",
			title: "this is title1",
			description: "this is description1",
			tag: "personal1",
			date: "2024-01-04T09:45:35.821Z",
			__v: 0,
		},
	];
	const [notes, setNotes] = useState(intialNotes);

	const addNote = (title,description,tag) => {
    const note={
			_id: "65967e3f66c4b1a9599df7cb3",
			user: "6595970662670a4d00a3967b",
			title: "this is newest  title1",
			description: "this is new description1",
			tag: "personal1",
			date: "2024-01-04T09:45:35.821Z",
			__v: 0,
		}
    setNotes(notes.push(note))
  };

	const deleteNote = () => {

  };

	const editNote = () => {

  };

	return (
		<NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
			{props.children}
		</NoteContext.Provider>
	);
};

export default NoteState;
