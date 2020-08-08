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
  user_id: [
    {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
  ],
});

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;

// {timestamps: true} 