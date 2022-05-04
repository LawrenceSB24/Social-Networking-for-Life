// Schema Model for user reactions
const { Schema, Types } = require("mongoose");

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => Types.ObjectId,
    },

    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },

    username: {
      type: String,
      required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
        get: creastedAtVal => moment(creastedAtVal).format('MM DD, YYYY [a] hh:mm a')
      },
  
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

module.exports = reactionSchema;
