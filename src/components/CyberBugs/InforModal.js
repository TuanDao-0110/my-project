import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import parse from 'html-react-parser';
import { CHANGE_TASK_MODAL, DELETE_COMMENT_SAGA, GET_ALL_STATUS_SAGA, GET_ALL_TASK_TYPE_SAGA, GET_PRIORITY_SAGA, GET_TASK_COMMENT_SAGA, GET_TASK_DETAIL_SAGA, INSER_TASK_COMMENT_SAGA, UPDATAE_TASK_SAGA, UPDATE_COMMENT_SAGA, UPDATE_TASK_STATUS_SAGA } from '../../redux/saga/Constants/CyberBugs/Cyberbugs';
import { type } from '@testing-library/user-event/dist/type';
import { Editor } from '@tinymce/tinymce-react';
import { Button, Select, } from 'antd';
const { Option } = Select;

let newListUserAsign = []

export default function InforModal({ projectId }) {

    const editorRef = useRef(null);
    const commentRef = useRef()
    const commentIdRef = useRef()
    const dispatch = useDispatch()
    const [comment, setComment] = useState('')
    const { projectDetail } = useSelector(state => state.ProjectReducer)
    const { taskDetails } = useSelector(state => state.TaskReducer)
    const { arrStastus } = useSelector(state => state.ProjectCyberBugReducer)
    const { arrPriority } = useSelector(state => state.PriorityReducer)
    const { arrTaskType } = useSelector(state => state.TypeReducer)
    // const { commentContent } = useSelector(state => state.CommentReducer)
    const [visibleEditor, setVisibleEditor] = useState(true)
    const [visbleComment, setVisibleComment] = useState(true)
    useEffect(() => {
        console.log('useeffect')
        dispatch({
            type: GET_ALL_STATUS_SAGA
        })
        dispatch({
            type: GET_PRIORITY_SAGA
        })
        dispatch({
            type: GET_ALL_TASK_TYPE_SAGA
        })
        dispatch({
            type: GET_TASK_COMMENT_SAGA,
            taskId: taskDetails.taskId
        })
    }, [taskDetails])
    console.log('taskDetails:', taskDetails)
    const [content, setContent] = useState()
    const log = () => {
        if (editorRef.current) {

            setContent(editorRef.current.getContent())
        }
    };
    const handleSubmitComment = () => {


        dispatch({
            type: INSER_TASK_COMMENT_SAGA,
            taskComment: {
                taskId: taskDetails.taskId,
                contentComment: comment
            },
            taskId: taskDetails.taskId
        })
        setComment('')
    }
    // const obj = { oldKey: 'value' };

    // obj['newKey'] = obj['oldKey'];
    // delete obj['oldKey'];

    // console.log('new key', obj); // 👉️ {newKey: 'value'}

    const newTaskDetails = taskDetails
    newTaskDetails['listUserAsign'] = newTaskDetails['assigness'];

    // delete newTaskDetails.assigness;
    function handleChangeAndt(value) {
        // console.log(`selected ${value}`);
        const newUser = []
        projectDetail.members?.map((user, index) => {
            return value.map((userValue) => {
                return user.userId == userValue ? newUser.push(user) : ''
            })
        })
        newListUserAsign = value
        // console.log(newListUserAsign)
        dispatch({
            type: CHANGE_TASK_MODAL,
            name: "assigness",
            // value: listAssignss.concat(value)
            value: newUser
        })
    }
    const defaultValueAntd = () => {
        // console.log('default value')
        taskDetails.assigness?.map((assigner, index) => {
            return { value: assigner.id, label: assigner.name }
        })
        // return [{ value: "not" }, { value: 'ok' }]
    }
    const children = projectDetail.members?.map((user, index) => {
        // return <Option value={user.userId} label={user.name}>{user.name}</Option>
        return { value: user.userId, label: user.name }
    })

    let descripttionDetail = parse(taskDetails.description)
    const editor = <Editor
        onInit={(evt, editor) => editorRef.current = editor}
        // eslint-disable-next-line no-use-before-define
        initialValue={taskDetails.description}
        init={{
            height: 500,
            menubar: false,
            plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
            ],
            toolbar: 'undo redo | formatselect | ' +
                'bold italic backcolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
        onEditorChange={log}
    />
    const renderDescription = () => {

        return visibleEditor ? <div>

            {descripttionDetail}
        </div>
            :
            <div >

                {editor}
                <Button className='mt-3' type="primary" onClick={() => {
                    setVisibleEditor(!visibleEditor)
                    dispatch({
                        type: CHANGE_TASK_MODAL,
                        name: "description",
                        value: content
                    })
                }}>Save Description</Button>
                <Button className='mt-3 ml-3' onClick={() => {
                    setVisibleEditor(!visibleEditor)

                }} type="primary">Close</Button>

            </div>


    }
    const handleDeleteComment = (commentId) => {
        dispatch({
            type: DELETE_COMMENT_SAGA,
            commentId,
            taskId: taskDetails.taskId
        })
    }
    const renderComment = (comment, commentId) => {
        if (commentId == commentIdRef.current) {
            return visbleComment ? <p style={{ marginBottom: 5 }} >{comment} </p> :
                <div className='input-comment'>

                    <input type="text" defaultValue={comment} onChange={(e) => {
                        commentRef.current = e.target.value
                    }} />
                    <span>

                        <button className='btn btn-success' onClick={() => {
                            dispatch({
                                type: UPDATE_COMMENT_SAGA,
                                taskId: taskDetails.taskId,
                                newComment: commentRef.current,
                                commentId
                            })
                            setVisibleComment(!visbleComment)
                        }}>edited</button>
                    </span>
                </div>
        }
        else {
            return <p style={{ marginBottom: 5 }} >{comment} </p>
        }
    }
    const handleChange = (e) => {
        const { name, value } = e.target
        dispatch({
            type: CHANGE_TASK_MODAL,
            name,
            value
        })
    }
    const submitUpdateTask = () => {
        delete newTaskDetails.assigness
        newTaskDetails.listUserAsign = newListUserAsign
        // console.log(newTaskDetails)
        dispatch({
            type: UPDATAE_TASK_SAGA,
            newTask: newTaskDetails
        })
    }
    const renderTimetracking = () => {


        const max = Number(taskDetails.timeTrackingSpent) + Number(taskDetails.timeTrackingRemaining)
        return <div style={{ display: 'flex', flexDirection: "column" }}>
            <i className="fa fa-clock" />
            <div style={{ width: '100%' }}>

                <div className="progress">
                    <div className="progress-bar" role="progressbar" style={{ width: `${(taskDetails.timeTrackingSpent / max) * 100}%` }} aria-valuenow={taskDetails.timeTrackingSpent} aria-valuemin={0} aria-valuemax={max} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p className="logged">{taskDetails.timeTrackingSpent}h logged</p>
                    <p className="estimate-time">{taskDetails.timeTrackingRemaining}h estimated</p>
                </div>
            </div>
            <br></br>

            <div style={{ width: '100%' }}>

                <div className="estimate">
                    <p>Time Tracking Spent</p>
                    <input className='estimate-hours' name='timeTrackingSpent' type='number' value={taskDetails.timeTrackingSpent} onChange={handleChange}></input>
                </div>

            </div>
            <div style={{ width: '100%' }}>

                <div className="estimate">
                    <p>Time Tracking Remaining</p>
                    <input className='estimate-hours' name='timeTrackingRemaining' type='number' value={taskDetails.timeTrackingRemaining} onChange={handleChange}></input>
                </div>

            </div>
        </div>
    }
    return (
        <div className="modal fade" id="infoModal" tabIndex={-1} role="dialog" aria-labelledby="infoModal" aria-hidden="true">
            <div className="modal-dialog modal-info">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="task-title">
                            {/* <i className="fa fa-bookmark" /> */}
                            {/* <span>{taskDetails.taskName}</span> */}
                            <select name='typeId' onChange={handleChange}>
                                {arrTaskType?.map((taskType, index) => {
                                    return <option value={taskType.id} key={index} selected={taskDetails.typeId == taskType.id ? true : false} >{taskType.taskType}</option>
                                })}
                            </select>
                            {taskDetails.typeId == 1 ? <i class="fa fa-bug"></i> : <i className="fa fa-bookmark" />}
                        </div>
                        <div style={{ display: 'flex' }} className="task-click">
                            <div>
                                <i className="fab fa-telegram-plane" />
                                <span style={{ paddingRight: 20 }}>Give feedback</span>
                            </div>
                            <div>
                                <i className="fa fa-link" />
                                <span style={{ paddingRight: 20 }}>Copy link</span>
                            </div>
                            <i className="fa fa-trash-alt" style={{ cursor: 'pointer' }} />
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                    </div>
                    <div className="modal-body">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-8">
                                    <p className="issue">This is an issue of type: Task.</p>
                                    <div className="description">
                                        <h3 onClick={() => {
                                            setVisibleEditor(!visibleEditor)

                                        }}>Description</h3>
                                        {renderDescription()}
                                    </div>
                                    <div style={{ fontWeight: 500, marginBottom: 10 }}>
                                        Jira Software (software projects) issue types:
                                    </div>
                                    <div className="title">
                                        <div className="title-item">
                                            <h3>{taskDetails.taskTypeDetail.taskType} <i className="fa fa-bug" /></h3>
                                            <p>
                                                A bug is a problem which impairs or prevents the
                                                function of a product.
                                            </p>
                                        </div>
                                        <div className="title-item">
                                            <h3>STORY <i className="fa fa-book-reader" /></h3>
                                            <p>
                                                A user story is the smallest unit of work that needs to
                                                be done.
                                            </p>
                                        </div>
                                        <div className="title-item">
                                            <h3>{taskDetails.taskName} <i className="fa fa-tasks" /></h3>
                                            <p>A task represents work that needs to be done</p>
                                        </div>
                                    </div>
                                    <div className="comment">
                                        <h6>Comment</h6>
                                        <div className="block-comment" style={{ display: 'flex' }}>
                                            <div className="avatar">

                                            </div>
                                            <div className="input-comment">
                                                <input type="text" placeholder="Add a comment ..." value={comment} onChange={(e) => {
                                                    setComment(e.target.value)

                                                }} />
                                                <button className='btn btn-success mt-2' onClick={handleSubmitComment}>Comment</button>
                                                {/* <p>
                                                    <span style={{ fontWeight: 500, color: 'gray' }}>Protip:</span>
                                                    <span>press
                                                        <span style={{ fontWeight: 'bold', background: '#ecedf0', color: '#b4bac6' }}>M</span>
                                                        to comment</span>
                                                </p> */}
                                            </div>
                                        </div>
                                        <div className="lastest-comment">
                                            <div className="comment-item">
                                                {taskDetails.lstComment?.map((comment, index) => {
                                                    return <div key={index} className="display-comment" style={{ display: 'flex' }}>
                                                        <div className="avatar">
                                                            <img src={comment.avatar} alt={comment.avatar} />

                                                        </div>
                                                        <div>
                                                            <p style={{ marginBottom: 5 }}>
                                                                Lord Gaben <span>a month ago</span>
                                                            </p>
                                                            {renderComment(comment.commentContent, comment.id)}
                                                            <div>
                                                                <span style={{ color: '#929398', cursor: 'pointer' }} onClick={() => {
                                                                    commentIdRef.current = comment.id
                                                                    setVisibleComment(!visbleComment)
                                                                }} >Edit</span>
                                                                •
                                                                <span style={{ color: '#929398', cursor: 'pointer' }} onClick={() => { handleDeleteComment(comment.id) }}>Delete</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                })}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="status">
                                        <h6>STATUS</h6>
                                        <select name='statusId' className="custom-select" onChange={(e) => {
                                            handleChange(e)
                                        }} >
                                            {arrStastus?.map((status, index) => {
                                                return <option key={index} value={status.statusId} selected={status.statusId === taskDetails.statusId ? true : false} label={status.statusName} />
                                            })}
                                        </select>
                                    </div>
                                    <div className="assignees">
                                        <h6>ASSIGNEES</h6>
                                        {taskDetails.assigness?.map((assigner, index) => {
                                            return <div style={{ display: 'flex' }}>
                                                <div style={{ display: 'flex' }} className="item">
                                                    <div className="avatar">
                                                        <img src={assigner.avatar} alt='123' />
                                                    </div>
                                                    <p className="name">
                                                        {assigner.name}
                                                        <i className="fa fa-times" onClick={() => {
                                                        }} style={{ marginLeft: 5 }} />
                                                    </p>
                                                </div>
                                            </div>
                                        })}
                                        <button className='btn btn-success mt-4 mb-4' style={{ display: 'flex', alignItems: 'center' }} onClick={() => {
                                        }}>
                                            <i className="fa fa-plus" style={{ marginRight: 5 }} /><span>Add more</span>
                                        </button>
                                        <div style={{ visibility: '' }}>
                                            <Select
                                                defaultValue={defaultValueAntd}
                                                options={children}

                                                mode="tags" style={{ width: '100%' }} placeholder="Tags Mode"


                                                onSearch={(value) => {

                                                }
                                                }
                                                onChange={handleChangeAndt}


                                            >
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="priority" style={{ marginBottom: 20 }}>
                                        <h6>PRIORITY</h6>
                                        <select name='priorityId' onChange={handleChange}>
                                            {arrPriority?.map((priority, index) => {
                                                return <option value={priority.priorityId} key={index} selected={priority.priorityId == taskDetails.priorityId ? true : false} label={priority.priority}></option>
                                            })}
                                        </select>
                                    </div>
                                    <div className="estimate">
                                        <h6>ORIGINAL ESTIMATE (H)</h6>
                                        <input type="number" className="estimate-hours" name='originalEstimate' value={taskDetails.originalEstimate} onChange={handleChange} />
                                    </div>
                                    <div className="time-tracking">
                                        <h6>TIME TRACKING</h6>
                                        {renderTimetracking()}

                                    </div>
                                    <div style={{ color: '#929398' }}>Create at a month ago</div>
                                    <div style={{ color: '#929398' }}>Update at a few seconds ago</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
