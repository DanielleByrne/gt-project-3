const router = require("express").Router(); 
const db = require("../models")

router.get("/api/messages",function(req,res){
    db.Message.find({}).sort({time_posted: -1}).limit(30).then((message)=>{
        res.json({
            error:false,
            data:message,
            message:"Successfully retrieved messages"
        })
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
          error: true,
          data: null,
          message: "Failed to get message data",
        });
    })
})

router.post("/api/messages",function(req,res){
    db.Message.create(req.body)
})