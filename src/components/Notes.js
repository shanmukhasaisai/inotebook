import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

const Notes = (props) => {
	const [note, setNote] = useState({
		id: "",
		etitle: "",
		edescription: "",
		etag: "",
	});
	const context = useContext(noteContext);
	const { notes, getNotes, editNote } = context;
	useEffect(() => {
		getNotes();
		//eslint-disable-next-line
	}, []);
	const ref = useRef(null);
	const refClose = useRef(null);
	const updateNote = currentNote => {
		ref.current.click();
		setNote({
			id: currentNote._id,
			etitle: currentNote.title,
			edescription: currentNote.description,
			etag: currentNote.tag,
		});

	};
	const onChange = e => {
		setNote({ ...note, [e.target.name]: e.target.value });
	};
	const handleClick = e => {
		editNote(note.id, note.etitle, note.edescription, note.etag);
		refClose.current.click();
		props.showAlert("Updated Note Successfully","success")

	};
	return (
		<>
			<AddNote showAlert={props.showAlert} />
			<button
				type="button"
				className="btn btn-primary d-none"
				data-bs-toggle="modal"
				data-bs-target="#exampleModal"
				ref={ref}
			>
				Launch demo modal
			</button>

			<div
				className="modal fade"
				id="exampleModal"
				tabIndex="-1"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="exampleModalLabel">
								Edit Note
							</h1>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<div className="modal-body">
							<form>
								<div className="mb-3">
									<label htmlFor="etitle" className="form-label">
										Title
									</label>
									<input
										type="text"
										className="form-control"
										id="etitle"
										name="etitle"
										aria-describedby="emailHelp"
										onChange={onChange}
										value={note.etitle}
										minLength={5}
										required
									/>
								</div>
								<div className="mb-3">
									<label htmlFor="edescription" className="form-label">
										Description
									</label>
									<input
										type="text"
										className="form-control"
										id="edescription"
										name="edescription"
										aria-describedby="emailHelp"
										onChange={onChange}
										value={note.edescription}
										minLength={5}
										required
									/>
								</div>
								<div className="mb-3">
									<label htmlFor="etag" className="form-label">
										Tag
									</label>
									<input
										type="text"
										className="form-control"
										id="etag"
										name="etag"
										aria-describedby="emailHelp"
										onChange={onChange}
										value={note.etag}
									/>
								</div>
							</form>
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-secondary"
								data-bs-dismiss="modal"
								ref={refClose}
							>
								Close
							</button>
							<button
								onClick={handleClick}
								type="button"
								className="btn btn-primary"
								disabled={
									note.etitle.length < 5 || note.edescription.length < 5
								}
							>
								Update Note
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="row">
				<h2>Your Notes</h2>
				<div className="container mx-2">
					{notes.length === 0 && "No Notes to display"}
				</div>
				{notes.map(note => {
					return (
						<NoteItem key={note._id} note={note} updateNote={updateNote} showAlert={props.showAlert}/>
					);
				})}
			</div>
		</>
	);
};

export default Notes;
