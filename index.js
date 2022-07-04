require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const isAuth = require("./middleware/auth");
const db = require("./config/database");

app.use(cors());
app.use(express.json());

const Port =
  process.env.NODE_ENV && process.env.NODE_ENV === "test"
    ? process.env.TEST_PORT || 4000
    : process.env.PORT || 3001;

//Configure mongoose
mongoose
  .connect(db.url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database Connection Established");
  })
  .catch((err) => {
    console.log(err);
    process.exit;
  });

// HealthCheck
app.get("/healthcheck", async (_req, res, _next) => {
  // optional: add further things to check (e.g. connecting to dababase)
  const healthcheck = {
    uptime: process.uptime(),
    message: "OK",
    timestamp: Date.now(),
  };
  try {
    res.send(healthcheck);
  } catch (e) {
    healthcheck.message = e;
    res.status(503).send();
  }
});

app.use("/api", require("./router"));
app.use("/api/server", (req, res) => {
  res.send("Server running");
});

//Server port listening

app.listen(Port, () => {
  console.log(`Server is up & running at port ${Port}`);
});
