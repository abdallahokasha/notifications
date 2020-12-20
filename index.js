const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const config = require("./config/config");
const v1 = require("./routes");
const checkRideUpdatesTask = require("./workers/checkRideUpdates");
const app = express();

const port = 5000;
// const mongoURI =
//   `mongodb://${config[process.env.NODE_ENV].host}:${
//     config[process.env.NODE_ENV].port
//   }/${config[process.env.NODE_ENV].database}` ||
//   "mongodb://localhost:27017/pushme_db";

let mongoURI =
  process.env.MONGO_DOCKER_URI || "mongodb://mongo/docker-node-mongo";

if (process.env.NODE_ENV === "test")
  mongoURI = process.env.MONGO_LOCAL_URI_FOR_TEST =
    "mongodb://localhost:27017/pushme_db";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/v1", v1);

mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.set("useFindAndModify", false);

mongoose.connect(mongoURI).catch(err => {
  console.error(`Error while connecting to MongoDB, Mongo URI: ${mongoURI}`);
});

const db = mongoose.connection;
db.on(
  "error",
  console.error.bind(
    console,
    `Connection Error to mongo DB: Mongo URI: ${mongoURI}`
  )
);

app.listen(port, () => {
  console.log(`Node server running on port ${port}`);
});

checkRideUpdatesTask.start();

// db.once("open", () => {
//   app.listen(port, () => {
//     console.log(`Node server running on port ${port}`);
//   });

//   const rideCollection = db.collection("rides");
//   const changeStream = rideCollection.watch();

//   changeStream.on("change", change => {
//     console.log(change);

//     if (change.operationType === "insert") {
//       console.log("MongoDB Listener: Hey an insertion recently occur ;) on Rides collection")
//       // notify for insertion
//     } else if (change.operationType === "delete") {
//     }
//   });
// });
module.exports = app;
