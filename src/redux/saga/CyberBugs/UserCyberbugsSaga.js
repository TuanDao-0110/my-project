import axios from "axios";
import { call, delay, fork, take, takeEvery, takeLatest, put, select } from 'redux-saga/effects'
import { cyberBugServices } from "../../../services/CyberbugServices";
import { HIDE, LOADING } from "../../../ultilities/constants/loadingContants";
import { TOKEN, USER_LOGIN } from "../../../ultilities/constants/settingSysterm";
import { USER_SIGN_IN_API, USLOGIN } from "../Constants/CyberBugs/Cyberbugs";

function* signInSaga(action) {
    console.log(action)
    yield put({
        type: LOADING
    })
    yield delay(500)
    try {

        const { data, status } = yield call(() => { return cyberBugServices.signInCyberBugs(action.userLogin) })

        console.log(status)
        localStorage.setItem(TOKEN, data.content.accessToken)
        localStorage.setItem(USER_LOGIN, JSON.stringify(data.content))


        yield put({
            type: USLOGIN,
            userLogin: data.content
        })

        let HistoryReducer = yield select(state => state.HistoryReducer)
        yield HistoryReducer.history.push('/projectmanage')
    } catch (err) {
        console.log(err.response.data)
    }
    yield put({
        type: HIDE
    })
}


export function* theoDoiSignIn() {
    yield takeLatest(USER_SIGN_IN_API, signInSaga)
}