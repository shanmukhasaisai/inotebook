const connectToMongo = require("./db");
const express = require("express");
connectToMongo();
const app = express();
const port = 5000;
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));
app.get("/", (req, res) => {
	res.send("hello sai");
});

app.listen(port, () => {
	console.log(`iNotebood backend listening on http://localhost:${port}`);
});
