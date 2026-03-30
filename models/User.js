import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String
  },
  githubId: {
    type: String
  },
  username: {
    type: String
  }
});

export default mongoose.model('User', userSchema);

