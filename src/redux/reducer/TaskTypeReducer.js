import { GET_ALL_PROJECT, GET_ALL_TASK_TYPE } from "../saga/Constants/CyberBugs/Cyberbugs"

const initialState = {
    arrTaskType: []
}

export const TypeReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_ALL_TASK_TYPE:
            return { ...state, arrTaskType: action.arrTaskType }

        default:
            return state
    }
}


