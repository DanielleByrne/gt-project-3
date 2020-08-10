const router = require("express").Router(); 
const db = require("../models")


//Create user (using that cronjon?)
router.post("/api/signup", function(req,res){
    db.User.create(req.body).then(res => {
        res.json(res)
    })
})

//Get workout calendar or list?
router.get("/api/workout", function(req, res) {
    db.Workout.findAll({}).then(res =>{
        res.json(res)
    })
})


//Get user (for dashboard purposes)
router.get("/api/user/:id", function(req, res) {
    db.User.findOne({}).then(res =>{
        res.json(res)
    })
})

//Create workout (using that cronjon?)
router.post("/api/user/:id", function(req,res){
    db.Workout.create(req.body).then(res => {
        res.json(res)
    })
})

//Update workout (false --> true)
router.put("/api/workout/:id", function(req,res){
    db.Workout.findOneAndUpdate(req.params).then(res => {
        res.json(res)
    })
})

//Delete account
router.delete("/api/user/:id", function(req,res){
    db.User.destroy(req.params).then(res => {
        res.json(res)
    })
})

module.exports = router; 