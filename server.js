// Import dependencies_
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

// Import locals_
const addInitialFormData = require("./configs/generateInitialdata");
const CONNECT = require("./configs/mongoDB");
const formRoutes = require("./routes/form.route");

// Use Middlewares_
const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json());
app.use(cors());
app.use(formRoutes);
// Enable CORS for all routes
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

// Test routes_
app.get("/", async (req, res) => {
  res.send("Server is Working Fine!");
});

app.get("/reset", async (req, res) => {
  addInitialFormData();
  res.send("Server is Working Fine!");
});

// CONNECT Database & LISTEN_
const port = process.env.PORT || 5000;
CONNECT()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((error) => {
    // Handle the error or terminate the application gracefully
    console.error("Failed to connect to the database:", error);
  });
