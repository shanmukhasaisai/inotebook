import React,{useEffect} from "react";
import { useLocation } from 'react-router-dom';


const Navbar = () => {
	let location = useLocation();
	useEffect(() => {
    
  }, [location]);

	return (
		<div>
			<nav
				className="navbar navbar-expand-lg bg-body-tertiary"
				data-bs-theme="dark"
			>
				<div className="container-fluid">
					<a className="navbar-brand" href="/">
						iNotebook
					</a>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<a className={`nav-link ${location.pathname==="/"?"active":""} `} aria-current="page" href="/">
									Home
								</a>
							</li>
							<li className="nav-item">
								<a className={`nav-link ${location.pathname==="/about"?"active":""} `} href="/about">
									About
								</a>
							</li>
						</ul>
						<form className="d-flex" role="search">
							<a className="btn btn-primary mx-2" href="/login">Login</a>
							<a className="btn btn-primary mx-2" href="/signup">Sign Up</a>
						</form>

					</div>
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
