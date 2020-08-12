const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  message: {
    type: String,
  },
  time_posted: {
    type: Date,
    default: Date.now,
  },
  email: {
    type: String,
    required: "email required",
  },
});

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;

// {timestamps: true}
