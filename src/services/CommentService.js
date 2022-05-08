import { baseService } from "./baseService";


class CommentService extends baseService {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super()

    }

    getTaskCommentService = (taskId) => {
        return this.getAllComment(taskId)
    }
    postInsertComment = (taskComment) => {
        return this.postInsertCommentBaseService(taskComment)
    }

    deleteCommentService = (commentId) => {
        return this.deleteCommentBaseService(commentId)
    }
    updateCommentService = (commentId, newComment) => {
        return this.putUpdateCommentBaservice(commentId, newComment)
    }

}

export const commentService = new CommentService()