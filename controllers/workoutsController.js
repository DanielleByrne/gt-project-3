const router = require("express").Router();
const db = require("../models/index");

//Get workout calendar or list specific to that user.
router.get("/api/workout/:id", function (req, res) {
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

//Create workout (using that cronjon?) for each specific user ID
//How can we connect body to the ID ? req.body is just date/complete so it's created on a users
router.post("/api/workout/:id", function (req, res) {
  req.body.userId = req.params.id;
  db.Workout.create(req.body)
    .then((createdWorkout) => {
      res.json({
        error: false,
        data: userFound,
        message: "Successfully created workout.",
      });
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
router.put("/api/workout/:id", function (req, res) {
  db.Workout.findOneAndUpdate(req.params)
    .then((updatedWorkout) => {
      res.json({
        error: false,
        data: updatedWorkout,
        message: "Successfully updated workout.",
      });
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

module.exports = router;
