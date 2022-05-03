const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Name is required field."],
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    required: [true, "Email is required field."],
  },
  password: {
    type: String,
    trim: true,
    required: [true, "Password is required field."],
  },
  address: {
    type: String,
    trim: true,
  },
  balance: {
    type: Number,
    default: 5000,
  },
  profileURL: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425_960_720.png",
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Client", ClientSchema);
