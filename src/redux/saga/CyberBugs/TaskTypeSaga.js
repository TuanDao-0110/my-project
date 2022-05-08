import { message } from 'antd'
import { act } from 'react-dom/test-utils'
import { select, put, call, takeLatest, delay } from 'redux-saga/effects'
import { commentService } from '../../../services/CommentService'
import { taskService } from '../../../services/TaskService'
import { taskTypeService } from '../../../services/TaskTypeServivce'
import { HIDE, LOADING } from '../../../ultilities/constants/loadingContants'
import { DELETE_COMMENT_SAGA, GET_ALL_TASK_TYPE, GET_ALL_TASK_TYPE_SAGA, GET_PROJECT_DETAIL_SAGA, GET_TASK_COMMENT_REDUCER, GET_TASK_COMMENT_SAGA, GET_TASK_DETAIL_REDUCER, GET_TASK_DETAIL_SAGA, INSER_TASK_COMMENT_SAGA, UPDATAE_TASK_SAGA, UPDATE_COMMENT_SAGA, UPDATE_TASK_STATUS_SAGA } from '../Constants/CyberBugs/Cyberbugs'



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
            type: LOADING
        })
        yield put({
            type: GET_PROJECT_DETAIL_SAGA,
            projectId: action.newTask.projectId
        })

        yield delay(500)
        yield put({
            type: HIDE
        })

    } catch (error) {
        console.log(error)
    }
}



export function* theoDoiUpdateNewTaskSaga() {
    yield takeLatest(UPDATAE_TASK_SAGA, updateNewTaskSaga)
}



function* getTaskCommentSaga(action) {
    try {
        const { status, data } = yield call(() => commentService.getTaskCommentService(action.taskId))

        yield put({
            type: GET_TASK_COMMENT_REDUCER,
            content: data.content
        })

    } catch (err) {
        console.log(err.message)
    }
}


export function* theoDoiGetTaskCommentSaga() {

    yield takeLatest(GET_TASK_COMMENT_SAGA, getTaskCommentSaga)
    yield console.log('comment')
}


function* postInsertCommentSaga(action) {
    try {
        const { status, data } = yield call(() => commentService.postInsertComment(action.taskComment))
        yield console.log(status)
        yield put({
            type: GET_TASK_DETAIL_SAGA,
            taskId: action.taskId
        })

    } catch (error) {
        console.log(error)
    }
}


export function* theoDoiPostInsertCommentSaga() {
    yield takeLatest(INSER_TASK_COMMENT_SAGA, postInsertCommentSaga)
}


function* deleteCommentSaga(action) {
    try {
        const { status, data } = yield call(() => commentService.deleteCommentService(action.commentId))
        yield put({
            type: GET_TASK_DETAIL_SAGA,
            taskId: action.taskId
        })

    } catch (error) {
        console.log(error)
    }
}


export function* theoDoiDeleteCommentSaga() {
    yield takeLatest(DELETE_COMMENT_SAGA, deleteCommentSaga)
}


function* updateCommentSaga({ commentId, newComment, taskId }) {
    try {
        const { status, data } = yield call(() => commentService.updateCommentService(commentId, newComment))
        console.log(status)
        yield put({
            type: GET_TASK_DETAIL_SAGA,
            taskId
        })
    } catch (error) {

    }
}

export function* theDoiUpdateCommentSaga() {
    yield takeLatest(UPDATE_COMMENT_SAGA, updateCommentSaga)
}