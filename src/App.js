import "./App.css";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";

function App() {
	return (
		<>
			<NoteState>
				<BrowserRouter>
					<Navbar />
					<div className="container">
						<Routes>
							<Route path="/" element={<Home />}></Route>
							<Route path="/about" element={<About />} />
						</Routes>
					</div>
				</BrowserRouter>
			</NoteState>
		</>
	);
}

export default App;
