const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
  date: {
    type: Date,
    default: Date.now,
  },
  content: String,
  likes:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
  }]
});

module.exports = mongoose.model("PostModel", postSchema);
