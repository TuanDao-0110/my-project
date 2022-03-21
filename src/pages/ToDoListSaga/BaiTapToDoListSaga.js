import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_TASK_API, CHECK_TASK_API, DELETE_TASK_API, GET_TASKLIST_API, REJECT_TASK_API } from '../../redux/types/ToDoListContanst'

export default function BaiTapToDoListSaGa(props) {
    let [state, setState] = useState({

        value: {

            taskName: '',

        },
        error: {
            taskName: ''
        }
    })

    const { taskList } = useSelector(state => state.ToDoListReducer)

    let handleChange = (e) => {
        console.log(state)
        let { value, name } = e.target;

        let newError = { ...state.error }
        let newValue = { ...state.value }
        let regexString = /^[a-z A-z]+$/
        if (!regexString.test(value) || value.trim() === "") {

            newError[name] = name + ' is valid'
        } else {
            newValue[name] = value
            newError[name] = ''
        }
        setState({
            ...state,
            value: newValue,
            error: newError
        })
    }
    let handleSubmit = (e) => {
        e.preventDefault()
    }
    let getTaskList = () => {
        return dispatch({ type: GET_TASKLIST_API, })
    }
    const dispatch = useDispatch();
    useEffect(() => {
        getTaskList()
        return () => {

        }

    }, [])
    let checkTask = (taskName) => {
        dispatch({
            type: CHECK_TASK_API,
            taskName
        })

    }
    let delTask = (taskName) => {

        dispatch({
            type: DELETE_TASK_API,
            taskName
        })
    }
    let rejectTask = (taskName) => {
        dispatch({
            type: REJECT_TASK_API,
            taskName
        })
    }
    let addTask = (e) => {
        e.preventDefault()
        console.log(state.value.taskName)
        dispatch({
            type: ADD_TASK_API,
            data: state.value.taskName
        })
    }
    let renderTaskTodo = () => {

        return taskList.filter(item => !item.status).map((item, index) => {
            return <li key={index}>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button className="remove" type='button' onClick={() => {
                        delTask(item.taskName)
                    }}>
                        <i className="fa fa-trash-alt" />
                    </button>
                    <button type='button' className="complete" onClick={() => {
                        checkTask(item.taskName)
                    }}>
                        <i className="far fa-check-circle" />
                        {/* <i className="fas fa-check-circle" /> */}
                    </button>
                </div>
            </li>
        })
    }
    let renderTaskDone = () => {
        return taskList.filter(item => item.status).map((item, index) => {
            return <li key={index}>
                <span >{item.taskName}</span>
                <div className="buttons" >
                    <button className="remove" type='button' onClick={() => {
                        delTask(item.taskName)
                    }}>
                        <i className="fa fa-trash-alt" />
                    </button>
                    <button className="complete" type='button' onClick={() => {
                        rejectTask(item.taskName)
                    }}>
                        <i className="fa fa-undo"></i>
                    </button>
                </div>
            </li>
        })
    }
    return (
        <div className="card" onSubmit={addTask}>
            <div className="card__header">
                <img src={require('./bg.JPG')} alt='fsaf' />
            </div>
            {/* <h2>hello!</h2> */}
            <form className="card__body">
                <div className="card__content">
                    <div className="card__title">
                        <h2>My Tasks RFC</h2>
                        <p>December 9th ,2021</p>
                    </div>
                    <div className="card__add">
                        <input id="newTask" type="text" name='taskName' placeholder="Enter an activity..." onChange={(e) => {
                            handleChange(e)
                        }} />
                        <button id="addItem" type='submit' onClick={(e) => {
                            addTask(e)
                        }}>
                            <i className="fa fa-plus" />
                        </button>
                    </div>
                    <p className='text-danger'> {state.error.taskName}</p>

                    <div className="card__todo">
                        <h2>Task To Do</h2>
                        {/* Uncompleted tasks */}
                        <ul className="todo" id="todo">
                            {renderTaskTodo()}
                        </ul>
                        {/* Completed tasks */}
                        <ul className="todo" id="completed">
                            <h2>Task To Done</h2>

                            {renderTaskDone()}
                        </ul>
                    </div>
                </div>
            </form>
        </div >
    )
}
