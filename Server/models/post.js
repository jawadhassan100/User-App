const mongoose = require("mongoose");
const postSchema = mongoose.Schema({
  FirstName: {
    type: String,
  },
  LastName: {
    type: String,
  },
  RollNumber: {
    type: String,
  },
  Email: {
    type: String,
  },
});
module.exports = mongoose.model("Post", postSchema);
