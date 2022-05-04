// Schema Model for User thoughts

const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

// const dateFormat = require('../utils/dateFormat');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
    },

    // Added timestamps with potential createdAt modification without creating complex function
    createdAt: {
      type: Date,
      default: () =>  {
        const D = new Date();
        D.getFullYear("MM/DD/YYYY");
      }
    },

    username: {
      type: String,
      required: true,
    },

    reaction: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true
    },
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reaction.length;
});

const Thoughts = model("thoughts", thoughtSchema);

module.exports = Thoughts;
