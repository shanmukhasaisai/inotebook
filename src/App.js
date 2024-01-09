import "./App.css";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
	return (
		<>
			<NoteState>
				<BrowserRouter>
					<Navbar />
					<Alert message="alert message"/>
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
