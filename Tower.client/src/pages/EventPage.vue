<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card p-2 mt-2 elevation-2 text-dark">
          <div class="card-title">
            <div class="d-flex justify-content-between">
              <div class="px-3 py-1">
                <h1 v-if="!Event.isCanceled">
                  <b>
                    {{ Event.name }}
                  </b>
                </h1>
                <h1 v-if="Event.isCanceled" class="Striked">
                  <b>
                    {{ Event.name }}
                  </b>
                </h1>
                <h3 v-if="Event.isCanceled" class="Striked">
                  Location: {{ Event.location }}
                </h3>
                <h3 v-else>Location: {{ Event.location }}</h3>
                <h6 v-if="Event.isCanceled" class="Striked">
                  Event Type: {{ Event.type }}
                </h6>
                <h6 v-else>Event Type: {{ Event.type }}</h6>
              </div>
              <div>
                <div class="d-flex align-items-center" v-if="Event.creator">
                  <img
                    class="rounded profile"
                    :src="Event.creator.picture"
                    alt="Creator Picture"
                  />
                  <div class="p-3">
                    <h4>
                      {{ Event.creator.nickname }}
                    </h4>
                    <h5>
                      {{ Event.creator.email }}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-4">
                <img
                  class="coverImg"
                  :src="Event.coverImg"
                  alt="Event Cover Image"
                />
              </div>
              <div class="col-md-8">
                <p>
                  {{ Event.description }}
                </p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4">
                <h5 class="pt-2 px-1 Striked" v-if="Event.isCanceled">
                  Start Date: {{ new Date(Event.startDate).toLocaleString() }}
                </h5>
                <h5 class="pt-2 px-1" v-else>
                  Start Date: {{ new Date(Event.startDate).toLocaleString() }}
                </h5>
              </div>
              <div class="col-md-8">
                <div class="d-flex justify-content-end pt-1">
                  <h5 v-if="Event.isCanceled">Spots Remaining: 0</h5>
                  <h5 v-else>Spots Remaining: {{ Event.capacity }}</h5>
                </div>
              </div>
            </div>
            <div class="row m-0" v-if="Event.isCanceled">
              <div class="col-12">
                <div class="card bg-danger p-2 m-4">
                  <div class="card-body text-center">
                    <h1>Event Has Been Canceled</h1>
                  </div>
                </div>
              </div>
            </div>
            <div class="row m-0" v-if="Event.capacity <= 0">
              <div class="col-12">
                <div class="card bg-danger p-2 m-4">
                  <div class="card-body text-center">
                    <h1>Event Has Been Sold Out</h1>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <div v-if="!Event.isCanceled">
                  <div class="d-grid gap-2" v-if="!Event.capacity <= 0">
                    <button
                      type="button"
                      class="btn btn-success"
                      v-if="Event.creatorId !== Account.id"
                      @click="attendEvent"
                    >
                      Attend
                    </button>
                  </div>
                </div>
                <div
                  v-if="Event.creatorId === Account.id"
                  class="width-100 d-grid"
                >
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-target="#editEvent"
                    data-bs-toggle="modal"
                    v-if="!Event.isCanceled"
                  >
                    Edit
                  </button>
                </div>
                <button
                  type="button"
                  class="btn btn-outline-danger"
                  @click="cancelEvent"
                  v-if="Event.creatorId === Account.id"
                >
                  Cancel Event
                </button>
              </div>
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-12">
              <div class="card">
                <div class="card-body">
                  <div>
                    <div class="d-flex justify-content-center">
                      <img
                        v-for="a in Attendees"
                        :key="a.id"
                        class="attendee mx-1"
                        :src="a.account.picture"
                        alt="Attendee Picture"
                        :title="a.account.name"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row m-0">
    <div class="col-12">
      <div class="card my-3 p-2">
        <div class="card-body">
          <form @submit.prevent="createComment">
            <input
              type="text"
              class="makeComment"
              v-model="state.editable.body"
              placeholder="Write a Comment ... "
            />
            <div class="row">
              <div class="col-12">
                <div class="d-grid">
                  <button class="btn btn-primary mt-2" type="submit">
                    Post Comment
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <div class="row m-0">
    <div class="col-12">
      <div class="row">
        <div class="col-12" v-for="c in Comments" :key="c.id">
          <Comment :comment="c" />
        </div>
      </div>
    </div>
  </div>
  <EditEventModal />
</template>

<script>
import { computed, onMounted, reactive, watchEffect } from "@vue/runtime-core"
import { eventService } from "../services/EventService"
import { useRoute } from "vue-router"
import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
export default {
  setup() {
    const route = useRoute()
    onMounted(async () => {
      await eventService.setActiveEvent(route.params.eventId)
      await eventService.getCommentsforEvent(route.params.eventId)
      await eventService.getAttendees(route.params.eventId)
    })
    const state = reactive({ editable: {} })
    return {
      async attendEvent() {
        try {
          await eventService.attendEvent(AppState.activeEvent.id)
        } catch (error) {
          logger.log(error)
        }
      },
      state,
      async createComment() {
        try {
          await eventService.createComment(state.editable)
          state.editable = {}
        } catch (error) {
          logger.log(error)
        }
      },
      async cancelEvent() {
        try {
          await eventService.cancelEvent(AppState.activeEvent.id)
        } catch (error) {
          logger.log(error)
        }
      },
      Event: computed(() => AppState.activeEvent),
      Comments: computed(() => AppState.comments),
      Account: computed(() => AppState.account),
      Attendees: computed(() => AppState.attendees),
      MyAttendance: computed(() => AppState.attendees.filter(a => a.accountId === AppState.account.id))
    }
  },
}
</script>
<style scoped>
.profile {
  height: 60px;
  width: 60px;
}
.coverImg {
  height: 40vh;
  width: 40vh;
}
.attendee {
  height: 50px;
  width: 50px;
}
.width-100 {
  width: 100%;
}
.makeComment {
  width: 100%;
  height: 100px;
}
</style>
