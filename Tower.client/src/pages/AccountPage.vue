<template>
  <div class="row m-0">
    <div class="col-md-1"></div>
    <div class="col-md-10">
      <div class="card m-3 text-dark">
        <div class="card-body">
          <div class="d-flex justify-content-between">
            <div class="d-flex align-items-center">
              <div>
                <img
                  class="profilePic"
                  :src="account.picture"
                  alt="Profile Picture"
                />
              </div>
              <div class="px-2">
                <h1>- {{ account.name }}</h1>
                <h3>{{ account.email }}</h3>
              </div>
            </div>
            <div>
              <h4 class="px-2">Events Created: {{ myEvents.length }}</h4>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-1"></div>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <div class="text-center">
        <h3>Your Events</h3>
      </div>
    </div>
  </div>
  <div class="row m-0">
    <div class="col-md-3" v-for="e in myEvents" :key="e.id">
      <EventCards :event="e" />
    </div>
  </div>

  <div class="row">
    <div class="col-12">
      <div class="text-center p-3">
        <h3>The Events you are Attending</h3>
      </div>
    </div>
  </div>
  <div class="row m-0">
    <div class="col-12" v-for="e in myAttendees" :key="e.id">
      <EventCards :event="e.event" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, watchEffect } from 'vue'
import { AppState } from '../AppState'
import { eventService } from "../services/EventService"
import { logger } from "../utils/Logger"
export default {
  name: 'Account',
  setup() {
    watchEffect(async () => {
      try {
        if (AppState.account.id) {
          await eventService.getMyAttendingEvents(AppState.account.id)
        }
      } catch (error) {
        logger.log(error)
      }
    })
    onMounted(async () => {
      await eventService.getAllEvents()
    })
    return {
      account: computed(() => AppState.account),
      myEvents: computed(() => AppState.events.filter(e => e.creatorId == AppState.account.id)),
      myAttendees: computed(() => AppState.myAttendingEvents)
    }
  }
}
</script>

<style scoped>
.profilePic {
  width: 80px;
}
</style>
