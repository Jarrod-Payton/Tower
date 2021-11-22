import mongoose from 'mongoose'

const Schema = mongoose.Schema

export const AttendeeSchema = new Schema(
  {
    eventId: { type: Object, required: true },
    accountId: { type: Object, required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
AttendeeSchema.virtual('account', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
AttendeeSchema.virtual('event', {
  localField: 'eventId',
  foreignField: '_id',
  justOne: true,
  ref: 'TowerEvent'
})
