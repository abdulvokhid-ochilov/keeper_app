const express = require("express");
const connectDB = require("./config/db");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

connectDB();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/notes", require("./routes/notes"));

const listener = app.listen(process.env.PORT || 5000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
