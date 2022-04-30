// redux có 2 loại: 
// loại 1 : action =>object 
// loại 2 : action => funcion (thường dùng để sử lý API/ gọi các function khác)

import { all } from 'redux-saga/effects'
import *as ToDoListSaga from './ToDoListSaGa'
import *as CyberBugSaga from './CyberBugs/UserCyberbugsSaga'
import * as  ProjectCategorySaga from './CyberBugs/ProjectCategorySaga'
import * as ProjectSaga from './CyberBugs/CreateProject'
import * as DeleteSaga from './CyberBugs/DeleteProject'
import * as UpdateSaga from './CyberBugs/Editproject'
import * as assignNewUser from './CyberBugs/AssignNewUser.js'
import * as getUserSaga from './CyberBugs/GetUserCyberBugSaga'
import * as ProjectDetails from './CyberBugs/ProjectDetail'
import * as TaskType from './CyberBugs/TaskTypeSaga'
export function* rootSaga() {

    yield all([
        // khai bao nghiep vu cap nhap API
        ToDoListSaga.theoDoiActionGetTaskApi(),
        // Khai bao nghiep vu 

        ToDoListSaga.theoDoiAddTaskAction(),
        ToDoListSaga.theoDoiDelTaskApiAction(),
        ToDoListSaga.theoDoiAdjustTaskApiAction(),
        ToDoListSaga.theoDoiRejectAction(),
        CyberBugSaga.theoDoiSignIn(),
        ProjectCategorySaga.theoDoiGetAllProjectCateogry(),
        ProjectSaga.theoDoiCreateProjectSaga(),
        ProjectSaga.theoDoiGetListProjectSaga(),
        DeleteSaga.theoDoiDeleteProject(),
        UpdateSaga.theoDoiUpdateProject(),
        UpdateSaga.theoDoiRemoveUserFromProject(),
        getUserSaga.theoDoiGetUser(),
        assignNewUser.theoDoiAssignNewUser(),
        ProjectDetails.theoDoiGetProjectDetail(),
        ProjectDetails.theoDoiGetAllProjectDetail(),
        TaskType.theoDoiGetAllTaskTypeSaga(),
        ProjectDetails.theoDoiGetPrioritySaga(),
        ProjectDetails.theoDoiGetAllStatusSaga(),
        ProjectDetails.theoDoiCreateNewTaskSaga(),
        ProjectDetails.theoDoiGetUserByProjectSaga(),
        TaskType.theoDoiGetTaskDetailSaga(),
        TaskType.theoDoiUpdateTaskSaga(),
        TaskType.theoDoiUpdateNewTaskSaga()
    ])


}
