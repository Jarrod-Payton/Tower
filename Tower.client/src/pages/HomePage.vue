<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="card p-2 m-2 text-dark">
          <div class="card-title">
            <h2><b>Tower (Powered by Meta)</b></h2>
          </div>
          <div class="card-body">
            <p>
              Welcome to Tower, for all your event needs. Have you ever felt
              like your missing out, well you are (until now), here you can set
              an event for something as small as a hide and seek session in the
              park to something as big as a professional concert
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="row m-0">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="d-flex justify-content-between">
              <button
                class="btn btn-outline-primary px-3"
                title="filter by Concert"
                @click="filterEvents('')"
              >
                All
              </button>
              <button
                class="btn btn-outline-primary px-3"
                title="filter by Concert"
                @click="filterEvents('concert')"
              >
                Concert
              </button>
              <button
                class="btn btn-outline-primary px-3"
                title="filter by Convention"
                @click="filterEvents('convention')"
              >
                Convention
              </button>
              <button
                class="btn btn-outline-primary px-3"
                title="filter by Digital"
                @click="filterEvents('digital')"
              >
                Digital
              </button>
              <button
                class="btn btn-outline-primary px-3"
                title="filter by Sports"
                @click="filterEvents('sport')"
              >
                Sport
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-3" v-for="e in Events" :key="e.id">
        <EventCards :event="e" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "@vue/reactivity"
import { AppState } from "../AppState"
import { onMounted, watchEffect } from "@vue/runtime-core"
import { eventService } from "../services/EventService"
import Pop from "../utils/Pop"
import { logger } from "../utils/Logger"
export default {
  setup() {
    const Events = ref([])
    const filter = ref('')
    onMounted(async () => {
      await eventService.getAllEvents()
    })
    watchEffect(() => {
      let e = AppState.events
      if (filter.value != '') {
        e = AppState.events.filter(e => e.type == filter.value)
      }
      Events.value = e
    })
    return {
      Events,
      async filterEvents(type) {
        try {
          filter.value = type
        } catch (error) {
          logger.log(error, 'error')
        }
      }
    }
  },
}
</script>
<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card {
    width: 50vw;
    > img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
