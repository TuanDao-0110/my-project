import { applyMiddleware, combineReducers, createStore } from 'redux'
import reduxThunk from 'redux-thunk'
import ToDoListReducer from './reducer/ToDoListReducer'
import createMiddleWareSaga from 'redux-saga'
import { rootSaga } from './saga/rootSaga';
import LoadingReducer from './reducer/LoadingReducer';
import { HistoryReducer } from './reducer/historyReducer';
import { ModalReducer } from './reducer/ModalReducer';
import { UserLoginCyberBugsReducer } from './reducer/UserCyberBugsReducer';
import { ProjectCategoryReducer } from './reducer/ProjectCategoryReducer'

import { ProjectCyberBugReducer } from './reducer/ProjectCyberBugReducer';
import { drawerReducer } from './reducer/DrawerCyberBugReducer'
import { ProjectReducer } from './reducer/ProjectReducer'
import { TypeReducer } from './reducer/TaskTypeReducer'
import { PriorityReducer } from './reducer/PriorityReducer'
import { TaskReducer } from './reducer/taskReducer'
const middleWareSaga = createMiddleWareSaga();
const rootReducer = combineReducers({
    // reducer anounce
    ToDoListReducer,
    LoadingReducer,
    ModalReducer,
    HistoryReducer,
    UserLoginCyberBugsReducer,
    ProjectCategoryReducer,
    ProjectCyberBugReducer,
    drawerReducer,
    ProjectReducer,
    TypeReducer,
    PriorityReducer,
    TaskReducer
})



const store = createStore(rootReducer, applyMiddleware(reduxThunk, middleWareSaga),)
middleWareSaga.run(rootSaga)


export default store