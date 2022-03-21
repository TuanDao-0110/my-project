import { applyMiddleware, combineReducers, createStore } from 'redux'
import reduxThunk from 'redux-thunk'
import ToDoListReducer from './reducer/ToDoListReducer'
import createMiddleWareSaga from 'redux-saga'
import { rootSaga } from './saga/rootSaga';
import LoadingReducer from './reducer/LoadingReducer';
import { ModalReducer } from './reducer/ModalReducer';
const middleWareSaga = createMiddleWareSaga();
const rootReducer = combineReducers({
    // reducer anounce
    ToDoListReducer,
    LoadingReducer,
    ModalReducer
})



const store = createStore(rootReducer, applyMiddleware(reduxThunk, middleWareSaga),)
middleWareSaga.run(rootSaga)


export default store