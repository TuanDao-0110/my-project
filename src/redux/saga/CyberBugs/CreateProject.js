import { } from 'redux-saga'
import { put, call, takeLatest, delay, select } from 'redux-saga/effects'
import { cyberBugServices } from '../../../services/CyberbugServices'
import { HIDE, LOADING } from '../../../ultilities/constants/loadingContants'
import { STATUS_CODE } from '../../../ultilities/constants/settingSysterm'
import { CREATE_PROJECT_SAGA, DELETE_PROJECT, GET_ALL_PROJECT, GET_ALL_PROJECT_SAGA, GET_DATA_PROJECT_CATEGORY, GET_LIST_PROJECT } from '../Constants/CyberBugs/Cyberbugs'

function* createProjectSaga(action) {


    const history = yield select(state => state.HistoryReducer.history)
    yield put({
        type: LOADING
    })
    yield delay(500)
    console.log(history)
    try {
        const { data, status } = yield call(() =>
            cyberBugServices.createProjectAuthorization(action.newProject))

    } catch (err) {
        console.log('error')
    }
    yield put({
        type: HIDE
    })
    yield history.push('./projectmanage')

}

export function* theoDoiCreateProjectSaga() {
    yield takeLatest(CREATE_PROJECT_SAGA, createProjectSaga)
}

// Saga dùng để get all project từ API 
//tuấn - Code ngày dd/mm/yyyy
function* getListProjectSaga(action) {
    try {
        const { data, status } = yield call(() => cyberBugServices.getListProject());
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_LIST_PROJECT,
                projectList: data.content
            })
        }
    } catch (err) {
        console.log(err)
    }
}

export function* theoDoiGetListProjectSaga() {
    yield takeLatest(GET_ALL_PROJECT, getListProjectSaga)
}


