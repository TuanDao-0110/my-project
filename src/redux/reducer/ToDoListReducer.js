import { GET_TASK_API } from "../types/ToDoListContanst"

const initialState = { taskList: [] }

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    switch (action.type) {
        case GET_TASK_API: {
            console.log('dispatch to reducer success GetTaskAPI')
            state.taskList = action.taskList
            return { ...state }
        }
        default: return { ...state }
    }
}
