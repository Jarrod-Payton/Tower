import { commentService } from '../services/CommentService'
import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'

export class CommentsController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createComment)
      .delete('/:commentId', this.deleteComment)
  }

  async createComment(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.creator = req.userInfo
      const newComment = await commentService.createComment(req.body)
      return res.send(newComment)
    } catch (error) {
      next(error)
    }
  }

  async deleteComment(req, res, next) {
    try {
      const deleted = await commentService.deleteComment(req.params.commentId, req.userInfo.id)
      return res.send(deleted)
    } catch (error) {
      next(error)
    }
  }
}
