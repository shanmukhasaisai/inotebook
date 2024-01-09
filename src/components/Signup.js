import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
	const [credentials, setCredentials] = useState({
		name: "",
		email: "",
		password: "",
		cpassword: "",
	});
	let navigate = useNavigate();
	const onChange = e => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	};

	const handleSubmit = async e => {
		e.preventDefault();
		const { name, email, password } = credentials;
		const response = await fetch("http://localhost:5000/api/auth/createuser", {
			method: "POST", // *GET, POST, PUT, DELETE, etc.

			headers: {
				"Content-Type": "application/json",
			},

			body: JSON.stringify({ name, email, password }),
		});

		const json = await response.json();
		console.log(json);
		if (json.success) {
			localStorage.setItem("token", json.authtoken);
      props.showAlert("Account Created Successfully","success")
			navigate("/");
		} else {
      props.showAlert("Invalid Credentials","danger")
		}
	};
	return (
		<div className="container">

			<form onSubmit={handleSubmit}>
				<div className="mb-3">
					<label htmlFor="name" className="form-label">
						User Name
					</label>
					<input
						type="text"
						className="form-control"
						id="name"
						name="name"
						aria-describedby="emailHelp"
						value={credentials.name}
						onChange={onChange}
						required
						minLength={3}

					/>
				</div>
				<div className="mb-3">
					<label htmlFor="email" className="form-label">
						Email address
					</label>
					<input
						type="email"
						className="form-control"
						id="email"
						name="email"
						aria-describedby="emailHelp"
						value={credentials.email}
						onChange={onChange}
						required

					/>
				</div>
				<div className="mb-3">
					<label htmlFor="password" className="form-label">
						Password
					</label>
					<input
						type="password"
						className="form-control"
						id="password"
						name="password"
						value={credentials.password}
						onChange={onChange}
						required
						minLength={5}
            autoComplete="on"

					/>
				</div>
				<div className="mb-3">
					<label htmlFor="cpassword" className="form-label">
						Confirm Password
					</label>
					<input
						type="password"
						className="form-control"
						id="cpassword"
						name="cpassword"
						value={credentials.cpassword}
						onChange={onChange}
						required
						minLength={5}

					/>
				</div>
				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		</div>
	);
};

export default Signup;
