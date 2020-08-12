const router = require("express").Router();
const db = require("../models/index");

//Get all users
router.get("/api/user", function (req, res) {
  db.User.find({})
    .then((usersFound) => {
      res.json({
        error: false,
        data: usersFound,
        message: "Successfully found users.",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: true,
        data: null,
        message: "Failed to get users.",
      });
    });
});


//Create user (using that cronjon?)
router.post("/api/signup", function (req, res) {
  db.User.create(req.body)
    .then((createdUser) => {
      res.json({
        error: false,
        data: createdUser,
        message: "Successfully created new user.",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: true,
        data: null,
        message: "Failed to create new user.",
      });
    });
});




//Get user (for dashboard purposes) and shows workouts completed 
router.get("/api/user/:id", function (req, res) {
  db.User.findOne({ _id: req.params.id })
    .populate("workouts")
    .then((userFound) => {
      res.json({
        error: false,
        data: userFound,
        message: "Successfully found user.",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: true,
        data: null,
        message: "Failed to get user.",
      });
    });
});





// PUT ROUTE for creating a workout for user (updating their workout array with a push)
// Find the user by ID
// push a workout into the user's workout array. 
router.put("/api/user/:id", function (req, res) {
    db.User.findOneAndUpdate(req.params)
      .then((addedWorkout) => {
        res.json({
          error: false,
          data: addedWorkout,
          message: "Successfully updated workout.",
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: true,
          data: null,
          message: "Failed to add workout to user's array.",
        });
      });
  });
//example from documentation 
//   db.students.update(
//     { _id: 1 },
//     { $push: { scores: 89 } }
//  )


//Delete account by user ID
router.delete("/api/user/:id", function (req, res) {
  db.User.destroy(req.params)
    .then((deletedAccount) => {
      res.json({
        error: false,
        data: deletedAccount,
        message: "Successfully deleted account.",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: true,
        data: null,
        message: "Failed to delete.",
      });
    });
});

module.exports = router;
