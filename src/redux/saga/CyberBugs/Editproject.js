import { select, put, call, takeLatest, delay } from 'redux-saga/effects'
import { cyberBugServices } from '../../../services/CyberbugServices'
import { projectService } from '../../../services/ProjectService'
import { HIDE, LOADING } from '../../../ultilities/constants/loadingContants'
import { GET_ALL_PROJECT, REMOVE_USER_FROM_PROJECT, SUBMIT_EDIT_PROJECT } from '../Constants/CyberBugs/Cyberbugs'
import { message } from 'antd'
function* updateProject(action) {


    try {
        const { data, status } = yield call(() => cyberBugServices.updateProject(action.projectUpdate))
        yield put({
            type: LOADING
        })
        yield put({
            type: GET_ALL_PROJECT
        })
        yield put({
            type: "CLOSE"
        })
        yield delay(500)
        yield put({
            type: HIDE
        })

    } catch (err) {
        console.log(err)
    }
}

export function* theoDoiUpdateProject() {
    yield takeLatest(SUBMIT_EDIT_PROJECT, updateProject)
}
function* removeUserFromProject(action) {
    try {
        const { status, data } = yield call(() => projectService.removeUserFromProject(action.userProject))
        yield put({
            type: GET_ALL_PROJECT
        })


        yield call(() => {
            message.error('User have been deleted from the project');

        })
    } catch (err) {
        console.log(err)
    }
}

export function* theoDoiRemoveUserFromProject() {
    yield takeLatest(REMOVE_USER_FROM_PROJECT, removeUserFromProject)
}