import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function ToDoListRFC(props) {
    let [state, setState] = useState({
        taskList: [],
        value: {

            taskName: '',

        },
        error: {
            taskName: ''
        }
    })

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
        let promise = axios({
            url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
            method: "GET"
        })
        promise.then((res) => {
            //set state  
         
            setState({
                ...state,
                taskList: res.data
            })
        })

        promise.catch((err) => {
            console.log('fail')
        })
    }

    useEffect(() => {
        getTaskList()
        return () => {

        }
    }, [])
    let checkTask = (taskName) => {
        axios({
            url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
            method: "PUT"

        }).then(res => {
            getTaskList()
            alert('done')
        }).catch(err => alert('notthingdone'))
    }
    let delTask = (taskName) => {
        axios({
            url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
            method: "DELETE",

        }).then(res => {
            alert('delete succes')
            getTaskList()
        }).catch(err => {
            console.log(err.response.data)
            alert('delete failt')
        })
    }
    let rejectTask = (taskName) => {
        axios({
            url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
            method: "PUT"
        }).then(res => {
            getTaskList();
            alert(res.data)
        }).catch(err => {
            alert(err.data.response)
        })
    }
    let addTask = (e) => {
        e.preventDefault()
        return axios({
            url: 'http://svcy.myclass.vn/api/ToDoList/AddTask',
            method: "POST",
            data: { 'taskName': state.value.taskName }
        }).then(res => {
            alert('up load back end success')
            getTaskList()
        }).catch(err => {
            alert('error')
        })
    }
    let renderTaskTodo = () => {
        
        return state.taskList.filter(item => !item.status).map((item, index) => {
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
        return state.taskList.filter(item => item.status).map((item, index) => {
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
                        <i class="fa fa-undo"></i>
                    </button>
                </div>
            </li>
        })
    }
    return (
        <div className="card" onSubmit={addTask}>
            <div className="card__header">
                <img src={require('./bg.png')} />
            </div>
            {/* <h2>hello!</h2> */}
            <form className="card__body">
                <div className="card__content">
                    <div className="card__title">
                        <h2>My Tasks RFC</h2>
                        <p>September 9,2020</p>
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
                        {/* Uncompleted tasks */}
                        <ul className="todo" id="todo">
                            {renderTaskTodo()}
                        </ul>
                        {/* Completed tasks */}
                        <ul className="todo" id="completed">
                            {renderTaskDone()}
                        </ul>
                    </div>
                </div>
            </form>
        </div>
    )
}
