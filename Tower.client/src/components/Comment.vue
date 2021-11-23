<template>
  <div class="card m-2 mx-5 mt-2 elevation-1 text-dark">
    <div class="card-body p-3">
      <div class="d-flex">
        <div>
          <img
            class="profilePic"
            :src="comment.creator.picture"
            alt="Profile Pic"
          />
        </div>
        <div class="px-3 full">
          <div class="d-flex justify-content-between">
            <div class="d-flex align-content-center">
              <h6 class="px-2">
                {{ comment.creator.nickname }}
              </h6>
              <h6>-</h6>
              <h6 class="ps-2">{{ comment.creator.email }}</h6>
            </div>
            <div class="d-flex">
              <p class="px-2">
                <b> Created at - </b>
                {{ new Date(comment.createdAt).toLocaleString() }}
              </p>
              <button
                class="btn btn-outline-danger"
                title="delete comment"
                @click="deleteComment(comment.id)"
              >
                <i class="mdi mdi-delete" />
              </button>
            </div>
          </div>
          <div>
            {{ comment.body }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { eventService } from "../services/EventService"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
export default {
  props: { comment: { type: Object, required: true } },
  setup(props) {
    return {
      async deleteComment(commentId) {
        try {
          if (await Pop.confirm('are you sure?')) {
            eventService.deleteComment(commentId)
          } else {
            return
          }
        } catch (error) {
          logger.log(error)
        }
      }
    }
  },
}
</script>
<style scoped>
.profilePic {
  height: 120px;
  width: 120px;
}
.full {
  width: 100%;
}
</style>