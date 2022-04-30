import { Alert, message, notification } from 'antd'
import { select, put, call, takeLatest, delay } from 'redux-saga/effects'
import { projectService } from '../../../services/ProjectService'
import { taskService } from '../../../services/TaskService'
import { CREATE_NEW_TASK_REDUCER, CREATE_NEW_TASK_SAGA, GET_ALL_PROJECT_INFOR, GET_ALL_PROJECT_INFOR_SAGA, GET_ALL_STATUS_REDUCER, GET_ALL_STATUS_SAGA, GET_ALL_TASK_TYPE_SAGA, GET_PRIORITY_REDUCER, GET_PRIORITY_SAGA, GET_PROJECT_DETAIL_SAGA, GET_USER_BY_PROJECT, GET_USER_BY_PROJECT_SAGA, LIST_TASK_FROM_API } from '../Constants/CyberBugs/Cyberbugs'

function* getProjectDetailInfo(action) {
    try {
        const { data } = yield call(() => projectService.getProjectDetailsFromAPi(action.projectId))
        yield put({
            type: LIST_TASK_FROM_API,
            content: data.content
        })
    } catch (err) {
        console.log(err)
    }
}


export function* theoDoiGetProjectDetail() {
    yield takeLatest(GET_PROJECT_DETAIL_SAGA, getProjectDetailInfo)
}

function* getAllProjectInfor() {
    try {
        const { data, status } = yield call(() => projectService.getAllProjectInfor())
        yield put({
            type: GET_ALL_PROJECT_INFOR,
            arrProject: data.content
        })
    } catch (err) {
        console.log(err)
    }
}

export function* theoDoiGetAllProjectDetail() {
    yield takeLatest(GET_ALL_PROJECT_INFOR_SAGA, getAllProjectInfor)
}


function* getPrioritySaga() {
    try {
        const { data, status } = yield call(() => projectService.getPriority())
        yield put({
            type: GET_PRIORITY_REDUCER,
            priorityData: data.content
        })
    } catch (err) {
        console.log(err)
    }
}

export function* theoDoiGetPrioritySaga() {
    yield takeLatest(GET_PRIORITY_SAGA, getPrioritySaga)
}



function* getAllStatusSaga() {
    try {
        const { data, status } = yield call(() => projectService.getAllStatusBaseService())
        yield put({
            type: GET_ALL_STATUS_REDUCER,
            arrStastus: data.content
        })
    } catch (err) {
        console.log(err)
    }
}

export function* theoDoiGetAllStatusSaga() {
    yield takeLatest(GET_ALL_STATUS_SAGA, getAllStatusSaga)
}
function* createNewTaskSaga(action) {
    const history = yield select(state => state.HistoryReducer.history)
    console.log(action)
    try {
        const { data, status } = yield call(() => taskService.postCreatNewTaskService(action.newTask))
        yield message.success('This is a success message');
        yield put({
            type: "CLOSE_CREATE_TASK"
        })
        yield history.push(`/projectdetail/${action.newTask.projectId}`)
    } catch (err) {
        console.log(err.response)
    }
}

export function* theoDoiCreateNewTaskSaga() {
    yield takeLatest(CREATE_NEW_TASK_SAGA, createNewTaskSaga)
}


function* getUserByProjectSaga(action) {
    console.log(action)
    try {
        const { data, status } = yield call(() => projectService.getUserByProjectForMainService(action.ProjectId))
        yield yield message.success('This is a success message')
        console.log(data)
        yield put({
            type: GET_USER_BY_PROJECT,
            arrUserProject: data.content
        })
    } catch (error) {
        yield message.warning('Project dont have any active member')
        yield put({
            type: GET_USER_BY_PROJECT,
            arrUserProject: []
        })
    }
}

export function* theoDoiGetUserByProjectSaga() {
    yield takeLatest(GET_USER_BY_PROJECT_SAGA, getUserByProjectSaga)
}