const {Schema, model} = require('mongoose');


const FollowSchema = new Schema(
  {
    // EL USUARIO QUE  SIGUE A ESA PERSONA
    followed: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    // Y EL USUARIO AL QUE SIGUE
    follower: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);
module.exports = model("Follow", FollowSchema);
