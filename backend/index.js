const connectToMongo = require("./db");
const express = require("express");
var cors = require("cors");
connectToMongo();
const app = express();
const port = 5000;
app.use(express.json());
app.use(cors());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));
app.get("/", (req, res) => {
	res.send("hello sai");
});

app.listen(port, () => {
	console.log(`iNotebood backend listening on http://localhost:${port}`);
});
