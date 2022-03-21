import React, { Component } from 'react'
import axios from 'axios'
import style from './ToDoList.css'
export default class ToDoList extends Component {
    state = {
        taskList: [],
        value: {

            taskName: '',

        },
        error: {
            taskName: ''
        }
    }
    getTaskList = () => {
        let promise = axios({
            url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
            method: "GET"
        })
        promise.then((res) => {
            //set state  
            this.setState({
                taskList: res.data
            })
        })

        promise.catch((err) => {
            console.log('fail')
        })
    }

    // auto run after render ()
    componentDidMount = () => {
        this.getTaskList()
    }
    renderTaskTodo = () => {
        return this.state.taskList.filter(item => !item.status).map((item, index) => {
            return <li key={index}>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button className="remove" type='button' onClick={() => {
                        this.delTask(item.taskName)
                    }}>
                        <i className="fa fa-trash-alt" />
                    </button>
                    <button type='button' className="complete" onClick={() => {
                        this.checkTask(item.taskName)
                    }}>
                        <i className="far fa-check-circle" />
                        {/* <i className="fas fa-check-circle" /> */}
                    </button>
                </div>
            </li>
        })
    }


    checkTask = (taskName) => {
        axios({
            url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
            method: "PUT"

        }).then(res => {
            this.getTaskList()
            alert('done')
        }).catch(err => alert('notthingdone'))
    }
    delTask = (taskName) => {
        axios({
            url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
            method: "DELETE",

        }).then(res => {
            alert('delete succes')
            this.getTaskList()
        }).catch(err => {
            console.log(err.response.data)
            alert('delete failt')
        })
    }
    renderTaskDone = () => {
        return this.state.taskList.filter(item => item.status).map((item, index) => {
            return <li key={index}>
                <span >{item.taskName}</span>
                <div className="buttons" >
                    <button className="remove" type='button' onClick={() => {
                        this.delTask(item.taskName)
                    }}>
                        <i className="fa fa-trash-alt" />
                    </button>
                    <button className="complete" type='button' onClick={() => {
                        this.rejectTask(item.taskName)
                    }}>
                        <i class="fa fa-undo"></i>
                    </button>
                </div>
            </li>
        })
    }
    rejectTask = (taskName) => {
        axios({
            url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
            method: "PUT"
        }).then(res => {
            this.getTaskList();
            alert(res.data)
        }).catch(err => {
            alert(err.data.response)
        })
    }

    addTask = (e) => {
        e.preventDefault()
        return axios({
            url: 'http://svcy.myclass.vn/api/ToDoList/AddTask',
            method: "POST",
            data: { 'taskName': this.state.value.taskName }
        }).then(res => {
            alert('up load back end success')
            this.getTaskList()
        }).catch(err => {
            alert('error')
        })
    }
    handleChange = (e) => {

        let { value, name } = e.target;

        let newError = { ...this.state.error }
        let newValue = { ...this.state.value }
        let regexString = /^[a-z A-z]+$/
        if (!regexString.test(value) || value.trim() === "") {

            newError[name] = name + ' is valid'
        } else {
            newValue = { ...newValue, [name]: value }
            newError[name] = ''
        }
        this.setState({
            ...this.state,
            value: newValue,
            error: newError
        })
    }
    render() {
        return (
            <form className="card" onSubmit={this.addTask}>
                <div className="card__header">
                    <img src={require('./bg.png')} />

                </div>
                {/* <h2>hello!</h2> */}
                <div className="card__body">
                    <div className="card__content">
                        <div className="card__title">
                            <h2>My Tasks RCC</h2>
                            <p>September 9,2020</p>
                        </div>
                        <div className="card__add">
                            <input id="newTask" name='taskName' type="text" onChange={(e) => {
                                this.handleChange(e)
                            }} placeholder="Enter an activity..." />
                            <button id="addItem" onClick={(e) => {
                                this.addTask(e)
                            }}>
                                <i className="fa fa-plus" />
                            </button>
                        </div>
                        <p className='text-danger'> {this.state.error.taskName}</p>
                        <div className="card__todo">
                            {/* Uncompleted tasks */}
                            <ul className="todo" id="todo">
                                {this.renderTaskTodo()}

                            </ul>
                            {/* Completed tasks */}
                            <ul className="todo" id="completed">
                                {this.renderTaskDone()}

                            </ul>
                        </div>
                    </div>
                </div>
            </form>
        )
    }




}
