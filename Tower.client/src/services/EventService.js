import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"

class EventService {
  async getAllEvents() {
    const res = await api.get('api/events')
    AppState.events = res.data
  }
  async getEventsByType(type) {
    await this.getAllEvents
    logger.log(type)
    const res = AppState.events.filter(e => e.type == type)
    logger.log('hello', res)
    AppState.events = res
  }
  async setActiveEvent(eventId) {
    const res = await api.get(`api/events/${eventId}`)
    AppState.activeEvent = res.data
  }
  async createEvent(body) {
    const res = await api.post('api/events', body)
    AppState.events.unshift(res.data)
    return res.data
  }
  async editEvent(body, event) {
    logger.log('Edited Event', body)
    const res = await api.put(`api/events/${event.id}`, body)
    logger.log('editedEvent', res.data)
    AppState.activeEvent = res.data
  }
  async getCommentsforEvent(eventId) {
    const res = await api.get(`api/events/${eventId}/comments`)
    AppState.comments = res.data
  }
  async getAttendees(eventId) {
    const res = await api.get(`api/events/${eventId}/attendees`)
    AppState.attendees = res.data
  }
  async getMyAttendingEvents(userId) {
    const res = await api.get('account/attendees')
    AppState.myAttendingEvents = res.data
  }
  async cancelEvent() {
    await api.delete(`api/events/${AppState.activeEvent.id}`)
    const towerEvent = AppState.activeEvent
    towerEvent.isCanceled = true
    AppState.activeEvent = towerEvent
  }
  async createComment(body) {
    body.eventId = AppState.activeEvent.id
    const res = await api.post('api/comments', body)
    logger.log('New Comment', res.data)
    AppState.comments.unshift(res.data)
  }
  async deleteComment(commentId) {
    await api.delete(`api/comments/${commentId}`)
    const better = AppState.comments.filter(c => c.id !== commentId)
    AppState.comments = better
  }
  async attendEvent(id) {
    const body = {}
    body.eventId = id
    const newAttendee = await api.post('api/attendees', body)
    if (!newAttendee.data.account) {
      Pop.toast('You are already attending, silly gooper')
    } else {
      AppState.attendees.unshift(newAttendee.data)
      const EventTing = AppState.activeEvent
      EventTing.capacity--
      AppState.activeEvent = EventTing
    } return
  }
}

export const eventService = new EventService()