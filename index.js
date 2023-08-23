const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const Redis = require("ioredis")
const bull = require("bull")
require("dotenv").config()
const config = require("./config/config")
const v1 = require("./routes")
const checkRideUpdatesTask = require("./workers/checkRideUpdates")
const app = express()

const port = 5000

let mongoURI =
  process.env.MONGO_DOCKER_URI || "mongodb://mongo/notifications_service"

if (process.env.NODE_ENV === "test")
  mongoURI = process.env.MONGO_LOCAL_URI_FOR_TEST =
    "mongodb://localhost:27017/pushme_db"

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use("/v1", v1)

mongoose.set("useNewUrlParser", true)
mongoose.set("useUnifiedTopology", true)
mongoose.set("useFindAndModify", false)

mongoose.connect(mongoURI).catch(err => {
  console.error(`Error while connecting to MongoDB, Mongo URI: ${mongoURI}, ${err}`)
})

const redis = new Redis({connectTimeout: 10000})

const db = mongoose.connection;
db.on(
  "error",
  console.error.bind(
    console,
    `Connection Error to mongo DB: Mongo URI: ${mongoURI}`
  )
)

app.listen(port, () => {
  console.log(`Node server running on port ${port}`)
})

checkRideUpdatesTask.start();

const notificationsQueue = new bull('notifications-queue', {
  limiter: {
    max: 10000, // Limit queue to max 10000 jobs per second.
    duration: 1000
  }, redis
})

notificationsQueue.process(async (job) => {
  console.log("-- process function --");
  return job.send();
})

// Define a local completed event
notificationsQueue.on('completed', (job, result) => {
  console.log(`Job ${job.data} completed with result ${result}`)
})


module.exports = app
