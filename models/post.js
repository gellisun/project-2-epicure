const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userName: String,
    userAvatar: String,
  },
  {
    timestamps: true,
  }
);

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    link: String,
    photo: String,
    content: String,
    wishlist: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comments: [commentSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
