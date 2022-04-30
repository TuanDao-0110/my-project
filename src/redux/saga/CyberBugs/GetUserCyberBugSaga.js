import { put, call, takeLatest, delay, select } from 'redux-saga/effects'
import { userService } from '../../../services/UserServiceCyberBug'
import { GET_USER, GET_USER_LIST } from '../Constants/CyberBugs/Cyberbugs'


function* getUserSaga(action) {
    try {
        const { data, status } = yield call(() => userService.getUser(action.keyword))
        yield put({
            type: GET_USER_LIST,
            userList: data.content
        })
    } catch (err) {
        console.log(err)
    }
}


export function* theoDoiGetUser() {
    yield takeLatest(GET_USER, getUserSaga)
}