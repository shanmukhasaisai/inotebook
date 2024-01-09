import "./App.css";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";

import { useState } from "react";

function App() {
	const [alert, setAlert] = useState(null);
	const showAlert = (message, type) => {
		setAlert({
			message: message,
			type: type,
		});
		setTimeout(() => {
			setAlert(null);
		}, 2000);
	};
	return (
		<>
			<NoteState>
				<BrowserRouter>
					<Navbar />
					<Alert alert={alert} />
					<div className="container">
						<Routes>
							<Route path="/" element={<Home />}></Route>
							<Route path="/about" element={<About />} ></Route>
							<Route path="/login" element={<Login/>} ></Route>
							<Route path="/signup" element={<Signup/>} ></Route>
						
						</Routes>
					</div>
				</BrowserRouter>
			</NoteState>
		</>
	);
}

export default App;
