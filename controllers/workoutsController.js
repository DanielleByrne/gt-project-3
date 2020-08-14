const router = require("express").Router();
const db = require("../models/index");

//Get all workouts
router.get("/api/workout", function (req, res) {
  db.Workout.find({})
    .then((workout) => {
      res.json({
        error: false,
        data: workout,
        message: "Successfully found workout.",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: true,
        data: null,
        message: "Failed to find out.",
      });
    });
});

//Get workout calendar or list specific to that user.
router.get("/api/workout/:id", function (req, res) {
  db.User.find({})
    .populate("workouts")
    .then((workout) => {
      res.json({
        error: false,
        data: workout,
        message: "Successfully found workout.",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: true,
        data: null,
        message: "Failed to find out.",
      });
    });
});

//Create workout (using that cronjon?) for each specific user ID
//How can we connect body to the ID ? req.body is just date/complete so it's created on a users
router.post("/api/workout", function (req, res) {
  console.log("Create workout route hit", req.body.params.userID);
  const userID = req.body.params.userID;
  db.Workout.create({})
    //   .populate("workouts")
    .then((createdWorkout) => {
      console.log("CREATED WORKOUT", createdWorkout);
      res.json(createdWorkout);
      // GET USER ID HERE AND PASS INTO findOneAndUpdate
      db.User.findOneAndUpdate(
        { _id: userID },
        {
          $push: { workouts: { _id: createdWorkout._id } },
        },
        { new: true }
      )
        .then((response) => {
          console.log("User workout pushed", response);
        })
        .catch((err) => console.log("put route error"));
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: true,
        data: null,
        message: "Failed to create workout.",
      });
    });
});

//Update workout (false --> true) by workout ID
router.put("/api/workoutUpdate", function (req, res) {
  db.Workout.findOneAndUpdate(
    { _id: req.body.params.workoutID },
    { $set: { completed_workout: true } }
  )
    .then((updatedWorkout) => {
      res.json(updatedWorkout);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: true,
        data: null,
        message: "Failed to update workout.",
      });
    });
});

//Delete account by user ID
router.delete("/api/workout", function (req, res) {
  db.Workout.destroy({ _id: workoutId })
    .then((deletedWorkout) => {
      res.json({
        error: false,
        data: deletedWorkout,
        message: "Successfully deleted workout.",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: true,
        data: null,
        message: "Failed to delete workout.",
      });
    });
});

module.exports = router;

//create workout with name of each user (manually) so we can push easier and see in robo easier?
