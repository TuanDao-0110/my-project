import { put, takeLatest, call, } from 'redux-saga/effects'
import { userService } from '../../../services/UserServiceCyberBug'
import { ADD_NEW_USER, GET_ALL_PROJECT, GET_LIST_PROJECT } from '../Constants/CyberBugs/Cyberbugs'


function* addNewUser(action) {
    try {
        const { data, status } = yield userService.addNewUser(action.newUser)
        yield put({
            type: GET_ALL_PROJECT
        })
    } catch (err) {
        alert(err)
    }
}

export function* theoDoiAssignNewUser() {
    yield takeLatest(ADD_NEW_USER, addNewUser)
}