// redux có 2 loại: 
// loại 1 : action =>object 
// loại 2 : action => funcion (thường dùng để sử lý API/ gọi các function khác)

import {  all } from 'redux-saga/effects'
import *as ToDoListSaga from './ToDoListSaGa'


export function* rootSaga() {

    yield all([
        // khai bao nghiep vu cap nhap API
        ToDoListSaga.theoDoiActionGetTaskApi(),
        // Khai bao nghiep vu 

        ToDoListSaga.theoDoiAddTaskAction(),
        ToDoListSaga.theoDoiDelTaskApiAction(),
        ToDoListSaga.theoDoiAdjustTaskApiAction(),
        ToDoListSaga.theoDoiRejectAction()
    ])


}
