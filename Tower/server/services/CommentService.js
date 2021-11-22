import { dbContext } from '../db/DbContext'
import { Forbidden } from '../utils/Errors'

class CommentService {
  async createComment(body) {
    const newComment = dbContext.Comments.create(body)
    return newComment
  }

  async getEventComments(body) {
    const found = await dbContext.Comments.find(body)
    return found
  }

  async deleteComment(commentId, userId) {
    const found = await dbContext.Comments.findById(commentId)
    if (found.creatorId !== userId) {
      throw new Forbidden('you are not the owner')
    }
    await dbContext.Comments.findByIdAndDelete(commentId)
    return 'deleted'
  }
}

export const commentService = new CommentService()
