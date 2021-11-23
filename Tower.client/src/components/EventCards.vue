<template>
  <router-link :to="{ name: 'EventPage', params: { eventId: event.id } }">
    <div class="card p-2 m-2 selectable elevation-3" title="Event Details">
      <img
        class="card-img height-100"
        :src="event.coverImg"
        alt="Cover Image for Event"
      />
      <div class="card-title p-2">
        <div class="row" v-if="event.isCanceled">
          <div class="col-12">
            <div class="card bg-danger">
              <div class="card-body">
                <h5>EVENT CANCELED</h5>
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-between">
          <h4 v-if="event.isCanceled" class="Striked">
            <b>
              {{ event.name }}
            </b>
          </h4>
          <h4 v-else>
            <b>
              {{ event.name }}
            </b>
          </h4>
        </div>
        <p>{{ event.location }}</p>
      </div>
      <div class="card-body">
        <div class="container-fluid">
          <div class="d-flex align-items-stretch">
            <h6>
              {{ event.description }}
            </h6>
          </div>
          <div class="d-flex align-content-end">
            <p class="mt-3">
              <b> Slots Left: {{ event.capacity }} </b>
            </p>
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>
<script>
export default {
  props: { event: { type: Object, required: true } },
  setup(props) {
    return {

    }
  },
}
</script>
<style scoped>
.height-100 {
  height: 90%;
  max-height: 400px;
}
</style>