import { message } from 'antd'
import { select, put, call, takeLatest, delay } from 'redux-saga/effects'
import { taskService } from '../../../services/TaskService'
import { taskTypeService } from '../../../services/TaskTypeServivce'
import { GET_ALL_TASK_TYPE, GET_ALL_TASK_TYPE_SAGA, GET_PROJECT_DETAIL_SAGA, GET_TASK_DETAIL_REDUCER, GET_TASK_DETAIL_SAGA, UPDATAE_TASK_SAGA, UPDATE_TASK_STATUS_SAGA } from '../Constants/CyberBugs/Cyberbugs'



function* getAllTaskTypeSaga() {
    try {
        const { data, status } = yield call(() => taskTypeService.getAllTaskType())
        yield put({
            type: GET_ALL_TASK_TYPE,
            arrTaskType: data.content
        })
    } catch (error) {
        console.log(error)
    }
}


export function* theoDoiGetAllTaskTypeSaga() {
    yield takeLatest(GET_ALL_TASK_TYPE_SAGA, getAllTaskTypeSaga)
}



function* getTaskDetailSaga(action) {
    try {
        const { data, status } = yield call(() => taskTypeService.getTaskDetailService(action.taskId))
        yield put({
            type: GET_TASK_DETAIL_REDUCER,
            taskDetails: data.content
        })
    } catch (error) {
        console.log(error)
    }
}


export function* theoDoiGetTaskDetailSaga() {
    yield takeLatest(GET_TASK_DETAIL_SAGA, getTaskDetailSaga)
}


function* updateTaskSaga(action) {
    try {
        const { data, status } = yield call(() => taskService.putUpdateStatusService(action.task))
        yield call(() => message.success({
            content: 'This is a prompt message with custom className and style',
            style: {
                marginTop: '1vh',
                zIndex: '1',
                position: 'absolute'
            },
        }));
        yield put({
            type: GET_PROJECT_DETAIL_SAGA,
            projectId: action.projectId
        })


    } catch (error) {
        console.log(error.response)
    }
}


export function* theoDoiUpdateTaskSaga() {
    yield takeLatest(UPDATE_TASK_STATUS_SAGA, updateTaskSaga)
}



function* updateNewTaskSaga(action) {
    // console.log(action)
    try {
        const { data, status } = yield call(() => taskService.postUpdateTaskService(action.newTask))
        console.log(status)
        yield put({
            type: GET_PROJECT_DETAIL_SAGA,
            projectId: action.newTask.projectId
        })
    } catch (error) {
        console.log(error)
    }
}



export function* theoDoiUpdateNewTaskSaga() {
    yield takeLatest(UPDATAE_TASK_SAGA, updateNewTaskSaga)
}