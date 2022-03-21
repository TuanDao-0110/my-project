import axios from "axios"
import { GET_TASK_API } from "../types/ToDoListContanst"
export const getTaskListAPI = () => {

    return dispatch => {
        axios({
            url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
            method: "GET"
        })
            .then((res) => {
                //set state  
                dispatch({
                    type: GET_TASK_API,
                    taskList: res.data
                })
            })
            .catch((err) => {
                console.log('fail')
            })
    }
}


export const addTaskAPI = (state) => {
    return dispatch => {
        axios({
            url: 'http://svcy.myclass.vn/api/ToDoList/AddTask',
            method: "POST",
            data: { 'taskName': state.value.taskName }
        }).then(res => {

            alert('up load back end success')
            dispatch(getTaskListAPI())
        })

            .catch(err => {
                alert('error')
            })
    }
}



export const deleteTask = (taskName) => {
    return dispatch => {
        axios({
            url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
            method: "PUT"
        }).then(res => {
            dispatch(getTaskListAPI())
            alert(res.data)
        }).catch(err => {
            alert(err.data.response)
        })
    }
}


export const adjustTask = (taskName) => {
    return dispatch => {
        axios({
            url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
            method: "PUT"

        }).then(res => {
            alert('done')
            dispatch(getTaskListAPI())

        }).catch(err => alert('switch task not completed'))
    }
}

export const delTaskAction = (taskName) => {


    return async dispatch => {
        try {
            await axios({
                url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
                method: "DELETE",
            });
            alert('delete succes')
            dispatch(getTaskListAPI())

        } catch (err) {
            alert('nothing')
        }
    }
}
