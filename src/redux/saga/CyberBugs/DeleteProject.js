import { type } from '@testing-library/user-event/dist/type'
import { put, call, takeLatest, delay, select } from 'redux-saga/effects'
import { cyberBugServices } from '../../../services/CyberbugServices'
import { projectService } from '../../../services/ProjectService'
import { HIDE, LOADING } from '../../../ultilities/constants/loadingContants'
import { openNotificationWithIcon } from '../../../ultilities/Notification/NotificationCyberBugs'
import { DELETE_PROJECT, GET_ALL_PROJECT } from '../Constants/CyberBugs/Cyberbugs'



function* deleteProject(action) {
    const history = select(state => state.HistoryReducer.history)
    yield put({
        type: LOADING
    })
    try {
        const { status, data } = yield call(() => projectService.deleteProject(action.projectID))
        // open notification ==> project have been deleted
        yield call(() => {
            openNotificationWithIcon('success', 'deleted project done', '')
        })
        // call new project list againt
        yield put({ type: GET_ALL_PROJECT })
    } catch (err) {
        console.log(err)
        yield call(() => {
            openNotificationWithIcon('error', 'deleted project fail', '')
        })
    }
    yield delay(500)
    yield put({
        type: HIDE
    })


}
export function* theoDoiDeleteProject() {
    yield takeLatest(DELETE_PROJECT, deleteProject)
}