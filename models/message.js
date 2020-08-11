const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  message: {
    type: String,
  },
  time_posted: {
    type : Date, 
    default: Date.now 
  },
  test: {
    type: String,
    default: "This is a test."
  },
  username: {
    type: String,
    required: "username required"
  }
});

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;

// {timestamps: true} 