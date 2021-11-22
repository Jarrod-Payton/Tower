<template>
  <div class="card p-2 m-2">
    <img class="card-img" :src="event.coverImg" alt="Cover Image for Event" />
    <div class="card-title p-2">
      <div class="d-flex justify-content-between">
        <h4>
          <b>
            {{ event.name }}
          </b>
        </h4>
        <p v-if="event.isCanceled">Event has been cancelled sorry</p>
        <p v-if="!event.isCanceled">Event still active</p>
      </div>
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
}
</style>