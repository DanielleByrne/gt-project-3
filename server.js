const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const message = require("./models/message");

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

app.post("/api/message", (req,res)=>{
message.create(req.body).then(newMessage=>{
  console.log(newMessage)
  res.json(newMessage)})
});
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/healthycompetition", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
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
