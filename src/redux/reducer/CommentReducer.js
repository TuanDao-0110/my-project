import { GET_TASK_COMMENT_REDUCER, GET_TASK_REDUCER } from "../saga/Constants/CyberBugs/Cyberbugs"

const initialState = {
    commentContent: [
        {
            "user": {
                "userId": 1674,
                "name": "string",
                "avatar": "https://ui-avatars.com/api/?name=string"
            },
            "id": 3679,
            "userId": 1674,
            "taskId": 3924,
            "contentComment": "not thing",
            "deleted": false,
            "alias": "not-thing"
        },
        {
            "user": {
                "userId": 1674,
                "name": "string",
                "avatar": "https://ui-avatars.com/api/?name=string"
            },
            "id": 3681,
            "userId": 1674,
            "taskId": 3924,
            "contentComment": "more",
            "deleted": false,
            "alias": "more"
        }
    ]
}

export const CommentReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TASK_COMMENT_REDUCER:
            return { ...state, commentContent: action.content }

        default:
            return state
    }
}
