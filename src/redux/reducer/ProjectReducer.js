import { EDIT_PROJECT, LIST_TASK_FROM_API } from "../saga/Constants/CyberBugs/Cyberbugs"

const initialState = {
    projectEdit: {
        "id": 10,
        "projectName": "string",
        "creator": 2,
        "description": "string",
        "categoryId": 2
    },
    projectDetail: {
        name: 'nothing'
    }
}

export const ProjectReducer = (state = initialState, action) => {
    switch (action.type) {
        case EDIT_PROJECT: return { ...state, projectEdit: action.projectEditModel }
        case LIST_TASK_FROM_API: return { ...state, projectDetail: action.content }
        default:
            return state
    }
}
