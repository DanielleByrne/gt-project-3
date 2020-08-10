const router = require("express").Router(); 
const db = require("../models/index")


//Create user (using that cronjon?)
router.post("/api/signup", function(req,res){
    db.User.create(req.body).then((createdUser) => {
        res.json({
          error: false,
          data: createdUser,
          message: "Successfully created new user.",
        });
      }).catch((err) => {
        console.log(err);
        res.status(500).json({
          error: true,
          data: null,
          message: "Failed to create new user.",
        });
    })
})

//Get workout calendar or list specific to that user. 
router.get("/api/workout/:id", function(req, res) {
    db.Workout.find({}).then(workout =>{
        res.json(workout)
    })
})


//Get user (for dashboard purposes)
router.get("/api/user/:id", function(req, res) {
    db.User.findOne({}).then(userFound =>{
        res.json(userFound)
    })
})

//Create workout (using that cronjon?) for each specific user ID
//How can we connect body to the ID ? req.body is just date/complete so it's created on a users
router.post("/api/workout/:id", function(req,res){
    req.body.userId = req.params.id
    db.Workout.create(req.body).then(createdWorkout => {
        res.json(createdWorkout)
    })
})

//Update workout (false --> true) by workout ID
router.put("/api/workout/:id", function(req,res){
    db.Workout.findOneAndUpdate(req.params).then(updatedWorkout => {
        res.json(updatedWorkout)
    })
})

//Delete account by user ID
router.delete("/api/user/:id", function(req,res){
    db.User.destroy(req.params).then(deletedAccount => {
        res.json(deletedAccount)
    })
})

module.exports = router; 