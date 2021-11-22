import mongoose from 'mongoose'

const Schema = mongoose.Schema

export const CommentSchema = new Schema(
  {
    eventId: { type: Object, required: true },
    creatorId: { type: Object, required: true },
    body: { type: String, required: true },
    creator: { type: Object, required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
