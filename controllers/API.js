const router = require("express").Router(); 
const db = require("../models/index")


//Create user (using that cronjon?)
router.post("/api/signup", function(req,res){
    db.Users.create(req.body).then(res => {
        res.json(res)
    })
})

//Get workout calendar or list?
router.get("/api/workout", function(req, res) {
    db.Workouts.find({}).then(res =>{
        res.json(res)
    })
})

//Create workout (using that cronjon?)
router.post("/api/user/:id", function(req,res){
    db.Workouts.create(req.body).then(res => {
        res.json(res)
    })
})

//Update workout (false --> true)
router.update("/api/workout/:id", function(req,res){
    db.Workouts.findOneAndUpdate(req.params).then(res => {
        res.json(res)
    })
})

//Delete account
router.delete("/api/user/:id", function(req,res){
    db.Books.destroy(req.params).then(res => {
        res.json(res)
    })
})

module.exports = router; 