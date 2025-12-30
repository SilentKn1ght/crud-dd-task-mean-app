const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());
app.use(compression());

// parse requests of content-type - application/json
app.use(express.json({ limit: '10mb' }));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

const db = require("./app/models");
console.log("DB URL:", db.url);
db.mongoose
  .connect(db.url)
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Test application." });
});

require("./app/routes/tutorial.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
