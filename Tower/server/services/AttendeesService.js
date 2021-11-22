import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class AttendeesService {
  async getAttendeesByEvent(body) {
    const found = await dbContext.Attendees.find(body).populate('account event')
    return found
  }

  async getEventsByAccountId(body) {
    const found = await dbContext.Attendees.find(body).populate('account event')
    return found
  }

  async createAttendee(body) {
    const eventBeingPlanned = await dbContext.TowerEvents.findById(body.eventId)
    if (eventBeingPlanned.capacity >= 1) {
      const newAttendee = await dbContext.Attendees.create(body)
      eventBeingPlanned.capacity--
      await dbContext.TowerEvents.findByIdAndUpdate(eventBeingPlanned.id, eventBeingPlanned)
      return newAttendee
    } else {
      throw new BadRequest('capacity is already full')
    }
  }

  async deleteAttendeeById(attendeeId) {
    const Attendee = await dbContext.Attendees.findById(attendeeId)
    await dbContext.Attendees.findByIdAndDelete(attendeeId)
    const found = await dbContext.TowerEvents.findById(Attendee.eventId)
    found.capacity++
    await dbContext.TowerEvents.findByIdAndUpdate(found.id, found)
    return 'deleted'
  }
}

export const attendeesService = new AttendeesService()
