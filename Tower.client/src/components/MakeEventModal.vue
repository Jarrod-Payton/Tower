<template>
  <div class="modal" id="createEvent">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Create an Event of your Own</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
          ></button>
        </div>
        <form @submit.prevent="createEvent">
          <div class="modal-body">
            <h5>Event Name</h5>
            <input
              class="form-text"
              type="text"
              min="5"
              v-model="state.editable.name"
              placeholder="event name..."
            />
            <h5>Event Capacity</h5>
            <input
              class="form-number"
              type="number"
              min="1"
              v-model="state.editable.capacity"
              placeholder="event capacity..."
            />
            <h5>Event Description</h5>
            <input
              class="form-text"
              type="text"
              min="10"
              v-model="state.editable.description"
              placeholder="event description..."
            />
            <h5>Event Location</h5>
            <input
              class="form-text"
              type="location"
              v-model="state.editable.location"
              placeholder="event location..."
            />
            <h5>Event Cover Image</h5>
            <input
              class="form-text"
              type="text"
              v-model="state.editable.coverImg"
              placeholder="event cover image..."
            />
            <h5>Event Start Date</h5>
            <input
              class="form-date"
              type="date"
              min="Date.now"
              v-model="state.editable.startDate"
              placeholder="event start date..."
            />
            <h5>Type of Event</h5>
            <select name="pets" id="pet-select" v-model="state.editable.type">
              <option value="">--Please choose an option--</option>
              <option value="concert">Concert</option>
              <option value="convention">Convention</option>
              <option value="sport">Sport</option>
              <option value="digital">Digital</option>
            </select>

            <!-- <b-form-select
              v-model="state.editable.type"
              :options="options"
              size="sm"
              class="mt-3"
            ></b-form-select> -->
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-danger"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="submit" class="btn btn-outline-success">
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive } from "@vue/reactivity"
import { eventService } from "../services/EventService"
import { useRouter } from "vue-router"
import { logger } from "../utils/Logger"
import { Modal } from "bootstrap"
export default {
  setup() {
    const state = reactive({ editable: {} })
    const router = useRouter()
    return {
      state,
      async createEvent() {
        try {
          const newEvent = await eventService.createEvent(state.editable)
          Modal.getOrCreateInstance(document.getElementById("createEvent")).toggle()
          router.push({
            name: "EventPage",
            params: { eventId: newEvent.id }
          })
        } catch (error) {
          logger.log(error, error)
        }
      }

    }
  },
}
</script>
<style scoped>
</style>