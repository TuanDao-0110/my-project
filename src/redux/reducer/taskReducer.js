import { CHANGE_TASK_MODAL, GET_DETAIL_TASK, GET_TASK_DETAIL_REDUCER, UPDATE_TASK_DETAIL_REDUCER } from "../saga/Constants/CyberBugs/Cyberbugs"

const initialState = {
    taskDetails: {
        "priorityTask": {
            "priorityId": 2,
            "priority": "Medium"
        },
        "taskTypeDetail": {
            "id": 3,
            "taskType": "bug"
        },
        "assigness": [
            {
                "id": 1041,
                "avatar": "https://ui-avatars.com/api/?name=Han",
                "name": "Han",
                "alias": "han"
            },
            {
                "id": 1024,
                "avatar": "https://ui-avatars.com/api/?name=Lê Ngoại Ngữ",
                "name": "Lê Ngoại Ngữ",
                "alias": "le-ngoai-ngu"
            },
            {
                "id": 935,
                "avatar": "https://ui-avatars.com/api/?name=Hanavi",
                "name": "Hanavi",
                "alias": "hanavi"
            },
            {
                "id": 862,
                "avatar": "https://ui-avatars.com/api/?name=dgdfg",
                "name": "dgdfg",
                "alias": "crystal"
            },
            {
                "id": 984,
                "avatar": "https://ui-avatars.com/api/?name=Đạt Phan Hoàng",
                "name": "Đạt Phan Hoàng",
                "alias": "dat"
            }
        ],
        "lstComment": [],
        "taskId": 3767,
        "taskName": "c",
        "alias": "c",
        "description": "<p>cacac</p>",
        "statusId": "3",
        "originalEstimate": 13,
        "timeTrackingSpent": 15,
        "timeTrackingRemaining": 12,
        "typeId": 1,
        "priorityId": 2,
        "projectId": 4328
    }
}

export const TaskReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_TASK_DETAIL_REDUCER: return { ...state, taskDetails: action.taskDetails }
        case CHANGE_TASK_MODAL: {
            const { name, value } = action

        
            return { ...state, taskDetails: { ...state.taskDetails, [name]: value } }

        }
        default:
            return state
    }
}
