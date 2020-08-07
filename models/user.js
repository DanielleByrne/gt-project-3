const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: "Username is required.",
  },
  email: {
    type: String,
    required: "Full name is required.",
    validate: [ isEmail, 'invalid email' ]
  },
  password: {
    type: String,
    trim: true,
    required: "Password is required.",
    validate: [({ length }) => length >= 6, "Password should be longer."]
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;