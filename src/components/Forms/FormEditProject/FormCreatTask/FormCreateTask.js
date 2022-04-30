import React, { useEffect, useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { connect, useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup'
import { Select, InputNumber, Row, Col, Slider } from 'antd';
import { CREATE_NEW_TASK_SAGA, GET_ALL_PROJECT_INFOR, GET_ALL_PROJECT_INFOR_SAGA, GET_ALL_STATUS_SAGA, GET_ALL_TASK_TYPE_SAGA, GET_PRIORITY_SAGA, GET_USER, GET_USER_BY_PROJECT_SAGA, SET_SUBMIT_PROJECT } from '../../../../redux/saga/Constants/CyberBugs/Cyberbugs';
import { withFormik } from 'formik';
import { filter } from 'domutils';
const { Option } = Select;


function FormCreateTask(props) {

    // lay tu redux 
    const { arrProject } = useSelector(state => state.ProjectCyberBugReducer)
    const { arrTaskType } = useSelector(state => state.TypeReducer)
    const { arrPriority } = useSelector(state => state.PriorityReducer)
    const { userSearch } = useSelector(state => state.UserLoginCyberBugsReducer)
    const { arrStastus } = useSelector(state => state.ProjectCyberBugReducer)
    const { arrUserProject } = useSelector(state => state.UserLoginCyberBugsReducer)
    // console.log('arrUserProject:', arrUserProject)
    const listUserProject = arrUserProject?.map((user, index) => {
        return user.userId
    })
    // let [listMember, setListMember] = useState({
    //     members: [{ userId: 1052, name: 'f', avatar: 'https://ui-avatars.com/api/?name=thanhdat' }, { userId: 1052, name: 'thanhdatne', avatar: 'https://ui-avatars.com/api/?name=thanhdat' }]
    // })
    const dispatch = useDispatch()
    const [timeTracking, setTimeTracking] = useState({
        timeTrackingSpent: 0,
        timeTrackingRemaining: 0
    })
    const input = useRef(null)

    // const defaultValue = arrProject[0]?.members.map((member, index) => {
    //     console.log('defaultValue')
    //     return { value: member.userId, label: member.name }
    // })

    const children = arrUserProject?.map((user, index) => {
        // return <Option value={user.userId} label={user.name}>{user.name}</Option>
        return { value: user.userId, label: user.name }
    })

    function handleChangeAndt(value) {
        console.log(`selected ${value}`);
        setFieldValue('listUserAsign', value)
    }
    useEffect(() => {
        dispatch({
            type: GET_ALL_PROJECT_INFOR_SAGA,
        })
        dispatch({
            type: GET_ALL_TASK_TYPE_SAGA
        })
        dispatch({
            type: GET_PRIORITY_SAGA
        })
        // dispatch({
        //     type: GET_USER,
        //     keyword: ''
        // })
        dispatch({
            type: SET_SUBMIT_PROJECT,
            submitFunction: handleSubmit
        })
        dispatch({
            type: GET_ALL_STATUS_SAGA
        })
    }, [])

    const editorRef = useRef(null);

    const log = () => {
        if (editorRef.current) {
            // console.log(editorRef.current.getContent());
            values.description = editorRef.current.getContent()
        }
    };
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue
    } = props;
    return (
        <form className='container' onChange={handleChange} onSubmit={handleSubmit}>
            <div className='form-group'>
                <p>
                    Project
                </p>
                <select name="projectId" className='form-control' onChange={(e) => {
                    values.projectId = e.target.value
                    // setListMember(arrProject.filter(arrProject => arrProject.id == e.target.value)[0])
                    dispatch({
                        type: GET_USER_BY_PROJECT_SAGA,
                        ProjectId: e.target.value
                    })
                }}>

                    {arrProject?.map((project, index) => {

                        return <option value={project.id}>
                            {project.projectName}
                        </option>
                    })}

                </select>

            </div>
            <div className='form-group'>
                <p>Status</p>
                <select className='form-control' value={arrStastus[3]?.statusId} onChange={
                    handleChange
                } name='statusId' >
                    {arrStastus?.map((status, index) => {
                        return <option value={status.statusId} label={status.statusName} >
                        </option>
                    })}
                </select>
            </div>
            <div className='form-group'>
                <p>
                    Task Name
                </p>
                <input name="taskName" value={values.taskName} className='form-control' >
                </input>

            </div>
            <div className='form-group'>
                <div className='row'>
                    <div className='col-6'>
                        <p> Priority</p>
                        <select className='form-control' name='priorityId' onChange={(e) => {
                            values.priorityId = e.target.value
                        }}>
                            {arrPriority?.map((priority, index) => {
                                return <option value={priority.priorityId} key={index}>

                                    {priority.priority}
                                </option>
                            })}
                        </select>
                    </div>
                    <div className='col-6'>
                        <p> Task Type </p>
                        <select className='form-control' name='taskType' defaultValue='1' onChange={(e) => {
                            values.typeId = e.target.value
                        }}>
                            {arrTaskType?.map((task, index) => {
                                return <option value={task.id} key={index}>

                                    {task.taskType}
                                </option>
                            })}
                        </select>
                    </div>
                </div>
            </div>
            <div className='form-group'>
                <div className='row'>
                    <div className='col-6'>
                        <p>
                            assignees
                        </p>
                        <Select
                            options={children}
                            optionFilterProp='label'
                            // defaultValue={userProject}

                            mode="tags" style={{ width: '100%' }} placeholder="Tags Mode"
                            onSearch={(value) => {
                                // value ở đây chính là giá trị được nhập từ bàn phím 
                                // // trong phần optinoFilterProps ==> sẽ thực hiện việc filter từ giá trị của value với giá trị của lable
                                // if (input.current) {
                                //     clearTimeout(input.current)
                                // }
                                // input.current = setTimeout(() => {
                                //     dispatch({
                                //         type: GET_USER,
                                //         keyword: ''
                                //     })
                                // }, 1000);
                            }

                            }
                            onChange={handleChangeAndt}>
                        </Select>
                    </div>
                    <div className='col-6'>
                        <p> original number</p>
                        <input type='number' defaultValue='0' min='0' className='form-control' name='originalEstimate' onChange={handleChange} />
                    </div>
                    <div className='col-12'>
                        <p> Time tracking</p>
                        <Slider defaultValue={0} value={timeTracking.timeTrackingSpent} max={Number(timeTracking.timeTrackingRemaining) + Number(timeTracking.timeTrackingSpent)} tooltipVisible />
                        <div className='row'>
                            <div className='col-6 text-success'>

                                time logged    {timeTracking.timeTrackingSpent}h

                            </div>
                            <div className='col-6 text-right text-danger'>

                                time remaining    {timeTracking.timeTrackingRemaining}h

                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-12'>
                                <p>originalEstimate</p>
                                <input type='number' defaultValue='0' min='0' className='form-control' name='originalEstimate' />
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-6'>
                                <p>time spent </p>
                                <input type='number' defaultValue='0' min='0' className='form-control' name='timeTrackingSpent' onChange={(e) => {
                                    handleChange()
                                    setTimeTracking({
                                        ...timeTracking,
                                        timeTrackingSpent: e.target.value
                                    })
                                }} />
                            </div>
                            <div className='col-6'>
                                <p>time remaining </p>
                                <input type='number' defaultValue='0' className='form-control' name='timeTrackingRemaining' onChange={(e) => {
                                    handleChange()
                                    setTimeTracking({
                                        ...timeTracking,
                                        timeTrackingRemaining: e.target.value
                                    })
                                }} />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className='form-group'>
                <p> Description
                </p>
                <Editor
                    onInit={(evt, editor) => editorRef.current = editor}

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

            </div>
        </form >
    )
}
const formCreateTask = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        const { arrPriority, arrProject, arrTaskType, arrStastus } = props

        return {
            taskName: '',
            description: '',
            statusId: arrStastus[0]?.statusId,
            originalEstimate: 0,
            timeTrackingSpent: 0,
            timeTrackingRemaining: 0,
            projectId: arrProject[0]?.id,
            typeId: arrTaskType[0]?.id,
            priorityId: arrPriority[0]?.priorityId,
            listUserAsign: []

        }
    },
    validationSchema: Yup.object().shape({
    }),

    handleSubmit: (values, { props, setSubmitting }) => {
        console.log(values)
        props.dispatch({
            type: CREATE_NEW_TASK_SAGA,
            newTask: values
        })
    },

    displayName: 'CreateTask',

})(FormCreateTask);

// const { arrProject } = useSelector(state => state.ProjectCyberBugReducer)
// const { arrTaskType } = useSelector(state => state.TypeReducer)
// const { arrPriority } = useSelector(state => state.PriorityReducer)
// const { userSearch } = useSelector(state => state.UserLoginCyberBugsReducer)
// const { arrStastus } = useSelector(state => state.ProjectCyberBugReducer)
const mapStateToProps = (state) => {
    return {
        arrProject: state.ProjectCyberBugReducer.arrProject,
        arrTaskType: state.TypeReducer.arrTaskType,
        arrPriority: state.PriorityReducer.arrPriority,
        userSearch: state.UserLoginCyberBugsReducer.userSearch,
        arrStastus: state.ProjectCyberBugReducer.arrStastus
    }
}
export default connect(mapStateToProps)(formCreateTask)