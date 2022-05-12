// Schema Model for User thoughts

const { Schema, model } = require("mongoose");
const moment = require('moment');
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
      default: Date.now,
      get: creartedAtVal => moment(creartedAtVal).format('MM DD, YYYY [a] hh:mm a')
    },

    username: {
      type: String,
      required: true,
    },

    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reaction.length;
});

const Thoughts = model("thoughts", thoughtSchema);

module.exports = Thoughts;
