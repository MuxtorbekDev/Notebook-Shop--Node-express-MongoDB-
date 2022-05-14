const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        count: {
          type: Number,
          required: true,
          default: 1,
        },
        notebookId: {
          type: Schema.Types.ObjectId,
          ref: "Notebook",
          required: true,
        },
      },
    ],
  },
  // password: {
  //   type: String,
  //   required: true,
  // },
});

module.exports = model("User", userSchema);
