import axios from 'axios'
import { fork, take, takeEvery, delay, takeLatest, call, put } from 'redux-saga/effects'
import { ADD_TASK_API, CHECK_TASK_API, DELETE_TASK_API, GET_TASKLIST_API, GET_TASK_API, REJECT_TASK_API } from '../types/ToDoListContanst'
import { toDoListService } from '../../services/ToDoListServices'
import { STATUS_CODE } from '../../ultilities/constants/settingSysterm'
import { LOADING, HIDE } from '../../ultilities/constants/loadingContants'
import { act } from 'react-dom/test-utils'

/**
 *  ACTION ADD TASK
 * 
 */
function* getTaskApiAction() {

    try {
        yield put({
            type: LOADING
        })
        let { data, status } = yield call(
            toDoListService.getTaskApi
        )
        yield delay(100)
        if (status === STATUS_CODE.SUCCESS) {

            yield put({
                type: GET_TASK_API,
                taskList: data
            })
            yield put({
                type: HIDE
            })
        } else {

            console.log('error')
        }
    } catch (err) {
        alert('RECEIVE Wrong API')
    }
}


export function* theoDoiActionGetTaskApi() {
    yield takeEvery(GET_TASKLIST_API, getTaskApiAction)
}


/**
 *  ACTION ADD TASK
 * 
 */

function* addTaskApiAction(action) {

    try {
        yield put({
            type: LOADING
        })
        let { data, status } = yield call(() => {
            return toDoListService.addTaskApi(action.data)
        })

        if (status === STATUS_CODE.SUCCESS) {
            // yield put({
            //     type: GET_TASKLIST_API
            // })
            yield call(() => { return getTaskApiAction() })
        }

    } catch (err) {
        console.log(err)
    }
}


export function* theoDoiAddTaskAction() {
    yield takeEvery(ADD_TASK_API, addTaskApiAction)
}
/**
 *  ACTION delete TASK
 * 
 */
function* delTaskApiAction(action) {
    try {
        yield put({
            type: LOADING
        })
        let { status } = yield call(() => { return toDoListService.delTaskApi(action.taskName) })

        status === STATUS_CODE.SUCCESS ? yield put({ type: GET_TASKLIST_API }) : alert('loading fail: ', status)
    } catch (err) {
        console.log(err)
    }

}

export function* theoDoiDelTaskApiAction() {
    yield takeEvery(DELETE_TASK_API, delTaskApiAction)
}
/**
 *  ACTION check TASK
 * 
 */

function* adjustTaskApiAction(action) {

    try {

        yield put({
            type: LOADING
        })
        let { data, status } = yield call(() => {
            return toDoListService.adjTaskApi(action.taskName)
        })
        status === STATUS_CODE.SUCCESS ? yield put({
            type: GET_TASKLIST_API
        }) : alert("fail:", status)
    } catch (err) {
        console.log(err)
    }
}


export function* theoDoiAdjustTaskApiAction() {
    yield takeEvery(CHECK_TASK_API, adjustTaskApiAction)
}
/**
 *  ACTION return TASK
 * 
 */

function* rejectTaskApiAction(action) {
    try {


        yield put({
            type: LOADING
        })
        let { status } = yield call(() => {
            return toDoListService.rejectTaskApi(action.taskName)
        })

        status === STATUS_CODE.SUCCESS ? yield put({
            type: GET_TASKLIST_API
        }) : alert("fail:", status)
    } catch (err) {

    }
}


export function* theoDoiRejectAction() {
    yield takeEvery(REJECT_TASK_API, rejectTaskApiAction)
}

