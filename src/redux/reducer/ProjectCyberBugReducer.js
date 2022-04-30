import { GET_ALL_PROJECT_INFOR, GET_ALL_STATUS_REDUCER, GET_LIST_PROJECT } from "../saga/Constants/CyberBugs/Cyberbugs"

const stateDefault = {
    projectList: [{
        id: '1', projectName: 'abc', description: '<p>style</p>'
    }],
    arrProject: [],
    arrStastus: []
}


export const ProjectCyberBugReducer = (state = stateDefault, action) => {
    switch (action.type) {

        case GET_LIST_PROJECT: {
            state.projectList = action.projectList
            return { ...state }
        }

        case GET_ALL_PROJECT_INFOR: {
            return { ...state, arrProject: action.arrProject }
        }
        case GET_ALL_STATUS_REDUCER: return { ...state, arrStastus: action.arrStastus }

        default: return { ...state }
    }
}