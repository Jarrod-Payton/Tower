import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class EventService {
  async getAllEvents() {
    const res = await api.get('api/events')
    logger.log('Events no filter', res.data)
    AppState.events = res.data
  }
}

export const eventService = new EventService()