import { put, call, takeLatest } from 'redux-saga/effects'
import { cyberBugServices } from '../../../services/CyberbugServices'
import { STATUS_CODE } from '../../../ultilities/constants/settingSysterm'
import { GET_ALL_PROJECT_SAGA, GET_DATA_PROJECT_CATEGORY } from '../Constants/CyberBugs/Cyberbugs'
function* getAllProjectCategorySaga(action) {

    try {
        const { data, status } = yield call(() =>
            cyberBugServices.getAllProjectCategory())
        if (status === STATUS_CODE.SUCCESS) {
            yield put(
                {
                    type: GET_DATA_PROJECT_CATEGORY,
                    content: data.content
                }
            )
        }
    } catch (err) {
        console.log('error')
    }
}

export function* theoDoiGetAllProjectCateogry() {
    yield takeLatest(GET_ALL_PROJECT_SAGA, getAllProjectCategorySaga)
}