import { eventService } from '../services/EventService'
import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'

export class EventController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getTowerEvents)
      .get('/:eventId', this.getTowerEventById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTowerEvent)
      .put('/:eventId', this.editTowerEvent)
      .delete('/:eventId', this.deleteTowerEvent)
  }

  async getTowerEvents(req, res, next) {
    try {
      const query = req.body
      const events = await eventService.getTowerEvents(query)
      return res.send(events)
    } catch (error) {
      next(error)
    }
  }

  async getTowerEventById(req, res, next) {
    try {
      const event = await eventService.getTowerEventById(req.params.eventId)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }

  async createTowerEvent(req, res, next) {
    try {
      req.body.creator = req.userInfo
      req.body.isCanceled = false
      req.body.creatorId = req.userInfo.id
      const newEvent = await eventService.createTowerEvent(req.body)
      return res.send(newEvent)
    } catch (error) {
      next(error)
    }
  }

  async editTowerEvent(req, res, next) {
    try {
      req.body.id = req.params.eventId
      delete req.body.isCanceled
      const newEvent = await eventService.editTowerEvent(req.body, req.userInfo.id)
      return res.send(newEvent)
    } catch (error) {
      next(error)
    }
  }

  async deleteTowerEvent(req, res, next) {
    try {
      const deleted = await eventService.deleteTowerEvent(req.params.eventId, req.userInfo.id)
      return res.send(deleted)
    } catch (error) {
      next(error)
    }
  }
}
