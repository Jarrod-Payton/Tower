import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class EventService {
  async getTowerEvents(query = {}) {
    const res = await dbContext.TowerEvents.find(query)
    return res
  }

  async getTowerEventById(id) {
    const found = await dbContext.TowerEvents.findById(id).populate('creator', 'name')
    if (!found) {
      throw new BadRequest('invalid ID')
    }
    return found
  }

  async createTowerEvent(body) {
    const res = await dbContext.TowerEvents.create(body)
    return res
  }

  async editTowerEvent(body, userId) {
    const found = await dbContext.TowerEvents.findById(body.id)
    if (found.isCanceled === true) {
      throw new Forbidden('You can\'t edit an event that is already completed')
    }
    if (found.creatorId !== userId) {
      throw new Forbidden('you are not the owner')
    }
    if (body.startDate < Date.now) {
      throw new Forbidden('This concert already happened')
    }
    const updated = await dbContext.TowerEvents.findByIdAndUpdate(body.id, body)
    return updated
  }

  async deleteTowerEvent(id, userId) {
    const found = await dbContext.TowerEvents.findById(id)
    if (found.creatorId !== userId) {
      throw new Forbidden('you aren\'t the creator')
    }
    if (found.startDate < Date.now) {
      throw new Forbidden('This event already happened')
    }
    found.isCanceled = true
    const updated = await dbContext.TowerEvents.findByIdAndUpdate(id, found)
    return updated
  }
}

export const eventService = new EventService()
