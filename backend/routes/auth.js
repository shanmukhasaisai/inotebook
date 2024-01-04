const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "aSecretKey";
//Route 1: Create a User using: POST "/api/auth/createuser". Doesn't require Auth
router.post(
	"/createuser",
	[
		//validation of the parameters
		body("name", "Enter a Valid Name").isLength({ min: 3 }),
		body("email", "Enter a Valid Email").isEmail(),
		body("password", "Password must contain atleast 5 characters ").isLength({
			min: 5,
		}),
	],
	async (req, res) => {
		//if there are errors return bad request and the errors
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		// check whether the email exits with the user
		try {
			let user = await User.findOne({ email: req.body.email });
			if (user) {
				return res.status(400).json({ error: "please enter a unique email" });
			}
			//crypting the password by adding the salt and the password is changed to secured password
			var salt = bcrypt.genSaltSync(10);
			var secPass = bcrypt.hashSync(req.body.password, salt);
			user = await User.create({
				name: req.body.name,
				password: secPass,
				email: req.body.email,
			});
			//finding the user data by id
			const data = {
				user: {
					id: user.id,
				},
			};
			//to generate the auth token of the data
			const authToken = jwt.sign(data, JWT_SECRET);
			res.json({ authToken });
		} catch (error) {
			console.error(error.message);
			res.status(500).send("Some error occured");
		}
	}
);
//Create a User using: POST "/api/auth/login". Doesn't require Auth
router.post(
	"/login",
	[
		//validation of the parameters
		body("email", "Enter a Valid Email").isEmail(),
		body("password", "password cannot be blank").exists(),
	],
	async (req, res) => {
		//if there are errors return bad request and the errors
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { email, password } = req.body;
		try {
			let user = await User.findOne({ email });
			if (!user) {
				return res.status(400).json({ error: "invalid login details" });
			}
			//comparing the user password with the encrypted password
			const passwordCompare = await bcrypt.compare(password, user.password);
			if (!passwordCompare) {
				return res.status(400).json({ error: "invalid login details" });
			}
			const data = {
				user: {
					id: user.id,
				},
			};
			const authToken = jwt.sign(data, JWT_SECRET);
			res.send({ authToken });
		} catch (error) {
			console.error(error.message);
			res.status(500).send("Some error occured");
		}
	}
);
//Getting the details of logged in users using:POST"api/auth/getuser" login required
router.post("/getuser", fetchuser, async (req, res) => {
	try {
		//getting the details of the logged user except for password
		const userId = req.user.id;
		const user = await User.findById(userId).select("-password");
		res.send(user);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Some error occured");
	}
});

module.exports = router;
