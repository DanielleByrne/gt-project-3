const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const db = require("./models");

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("client/build"));

app.get("/api/config", (req, res) => {
  res.json({
    success: true,
  });
});

//Test post route for message
app.post("/api/message", (req, res) => {
  db.Message.create(req.body).then((newMessage) => {
    console.log(newMessage);
    res.json(newMessage);
  });
});

//Test post route for workout
app.post("/api/workout", (req, res) => {
  db.Workout.create(req.body).then((newWorkout) => {
    console.log(newWorkout);
    res.json(newWorkout);
  });
});

//Test post route for user
app.post("/api/user", (req, res) => {
  db.User.create(req.body).then((newUser) => {
    console.log(newUser);
    res.json(newUser);
  });
});

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

mongoose
  .connect(
    process.env.MONGODB_URI || "mongodb://localhost/healthycompetition",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Successfully connected to database.");
  })
  .catch((err) => {
    console.log("Unable to connect to database.");
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});


//cronjob everyday at 3am it runs a function that loops through users,for each, creates a workout and pushes to array
// so when user wakes up, workout is default false in array https://www.npmjs.com/package/cron
//user.Workout return an array and loop through 
//https://github.com/kelektiv/node-cron/tree/master/examples
  
// const CronJob = require('../lib/cron.js').CronJob;

// console.log('Before job instantiation');
// const job = new CronJob('00 00 00 * * *', function() {
// 	const d = new Date();
//^^^^not required either just to show date in console log
// 	console.log('Midnight:', d);
//^^^^where we would put our function
// });
// console.log('After job instantiation');
// job.start();