import React, { useEffect, useRef, useState } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { Draggable } from 'react-beautiful-dnd'
import { DragDropContext } from 'react-beautiful-dnd'
import { useDispatch } from 'react-redux'
import { GET_TASK_DETAIL_SAGA, UPDATE_TASK_STATUS_SAGA } from '../../../redux/saga/Constants/CyberBugs/Cyberbugs'
import { HIDE, LOADING } from '../../../ultilities/constants/loadingContants'
const textPriority = (priority) => {
    if (priority == 'Low')
        return 'text-success'
    if (priority == 'High')
        return 'text-danger'
    if (priority == 'Medium')
        return 'text-warning'
    return ''
}
export default function Content(props) {
    const dispatch = useDispatch()
    const { lstTask } = props.projectDetail
    // const tagDrop = useRef({})
    // const tagDropIndexRef = useRef()
    // const tagDropStatusRef = useRef()
    // const leaveOrgininalRef = useRef();
    // const leaveRefNewCol = useRef()
    // const leaveRefOldCol = useRef()

    const [listTaskState, setListTaskState] = useState([])


    useEffect(() => {
        lstTask ? setListTaskState([...lstTask]) : setListTaskState([])
        dispatch({
            type: HIDE
        })
    }, [props.projectDetail])

    console.log('list taskState', listTaskState)
    const handleEnd = (result) => {
        dispatch({
            type: LOADING
        })
        console.log(result)
        const tempList = listTaskState
        const { destination, source } = result
        if (!destination) {
            return
        }
        if (destination.index === source.index && destination.droppableId === source.droppableId) {
            return
        }

        let tempDropItem = { ...tempList[destination.droppableId - 1].lstTaskDeTail[destination.index] }
        let tempDragItem = { ...tempList[source.droppableId - 1].lstTaskDeTail[source.index] }

        tempDragItem.statusId = tempList[destination.droppableId - 1].statusId
        console.log('project id', tempDragItem.projectId)
        dispatch({
            type: UPDATE_TASK_STATUS_SAGA,
            task: {
                taskId: tempDragItem.taskId,
                statusId: tempDragItem.statusId
            },
            projectId: tempDragItem.projectId
        })
        if (destination.droppableId === source.droppableId) {

            // console.log('drag item,', tempDragItem,)
            // console.log('drop item', tempDropItem)

            // tempList[destination.droppableId - 1].lstTaskDeTail[destination.index] = tempDragItem

            // tempList[source.droppableId - 1].lstTaskDeTail[source.index] = tempDropItem
            // setListTaskState(tempList)



        }


        if (destination.droppableId !== source.droppableId) {
            // tempList[source.droppableId - 1].lstTaskDeTail.splice(source.index, 1)
            // tempList[destination.droppableId - 1].lstTaskDeTail.splice(destination.index, 0, tempDragItem)
            // setListTaskState(tempList)
        }

    }
    // const handleDragStart = (e, taskStart, indexListTask) => {
    //     // console.log(e.target)
    //     // console.log('task Drag start', taskStart)
    //     leaveOrgininalRef.current = indexListTask
    //     tagDrop.current = taskStart
    //     tagDropIndexRef.current = listTaskState[indexListTask].lstTaskDeTail.findIndex(task => task.taskId === tagDrop.current.taskId)
    //     tagDropStatusRef.current = taskStart.statusId
    //     // console.log('task drop', tagDrop.current)
    //     // let newTaskList = [...listTaskState];
    //     // console.log('start index', tagDropIndexRef.current)
    //     // newTaskList[indexListTask].lstTaskDeTail.splice(tagDropIndexRef.current, 1)
    //     // setListTaskState([...newTaskList])
    // }

    // const handleDragover = (e, taskOver, indexListTask, statusId) => {
    //     if (statusId === tagDrop.current.statusId) {
    //         let indexDragStart = listTaskState[indexListTask].lstTaskDeTail?.findIndex(task => task.taskId === tagDrop.current.taskId)
    //         let indexDragOver = listTaskState[indexListTask].lstTaskDeTail?.findIndex(task => task.taskId === taskOver.taskId)
    //         let taskListUpdate = [...listTaskState]
    //         let temp = tagDrop.current
    //         // console.log('drag over', indexDragOver, 'drag start', indexDragStart)
    //         taskListUpdate[indexListTask].lstTaskDeTail[indexDragStart] = taskOver
    //         taskListUpdate[indexListTask].lstTaskDeTail[indexDragOver] = temp;
    //         setListTaskState([...taskListUpdate])
    //     }
    // }
    // const handleDragoverCol = (e, statusIdCol) => {
    //     console.log('ondrag over colunm', tagDropIndexRef.current)
    //     if (statusIdCol !== tagDrop.current.statusId) {

    //         tagDrop.current.statusId = statusIdCol
    //         console.log('temp', tagDrop.current)
    //         let newListTask = listTaskState
    //         newListTask.map((taskList) => {
    //             if (taskList.statusId == statusIdCol) {
    //                 let indexTaskId = taskList.lstTaskDeTail?.findIndex(task => task.taskId === tagDrop.current.taskId)
    //                 if (indexTaskId == -1) {

    //                     taskList.lstTaskDeTail.push(tagDrop.current)
    //                     console.log('list taskState push', listTaskState)
    //                 }

    //                 setListTaskState([...newListTask])
    //             }
    //             if (taskList.statusId == tagDropStatusRef.current) {
    //                 // const tempTaskList = [...taskList.lstTaskDeTail]
    //                 // tempTaskList.splice(tagDropStatusRef.current, 1)
    //                 // taskList.lstTaskDeTail = tempTaskList

    //                 console.log('tagDrop', taskList)
    //                 let indexTaskId = taskList.lstTaskDeTail?.findIndex(task => task.taskId === tagDrop.current.taskId)
    //                 console.log('tagDrop', indexTaskId)
    //                 taskList.lstTaskDeTail.splice(indexTaskId, 1)
    //                 setListTaskState([...newListTask])
    //             }
    //         })

    //     }
    // }

    // const handleDragLeaveCol = (e, indexListTask) => {
    //     // console.log('leave ref old col, ', leaveRefOldCol)
    //     if (leaveRefNewCol.current !== indexListTask) {
    //         leaveRefOldCol.current = leaveRefNewCol.current
    //         leaveRefNewCol.current = indexListTask
    //         console.log('leave old col', leaveRefOldCol.current)
    //         let tempNewTask = [...listTaskState]
    //         // let indexTask;
    //         // console.log('leave drag', tagDrop.current.taskId)
    //         // console.log('leave', tempNewTask[1])

    //         //trong trường hợp kéo lại col cũ : có 2 trường hợp xảy ra  : 

    //         // a. là <thẻ > được kéo trở về 
    //         // 1. khi đó phải thỏa mãn điều kiện giá trị col cũ !== giá trị col gốc 
    //         //2. sau đó thực hiện việc xóa đi <thẻ> đã rendertrong  handleOverCol () từ col cũ 
    //         // b . <thẻ> được kéo tới 
    //         // 1. <thẻ> được kéo tới ==> col tiếp theo ==> phải bỏ đi giá <thẻ> ở col cũ. 
    //         if (leaveRefOldCol.current !== leaveOrgininalRef.current) {
    //             console.log('xoa the cu')
    //             let index = tempNewTask[leaveRefOldCol.current]?.lstTaskDeTail.findIndex(task => task.taskId === tagDrop.current.taskId)
    //             if (index !== -1) {
    //                 tempNewTask[leaveRefOldCol.current]?.lstTaskDeTail.splice(index, 1)
    //                 console.log('index old leave', index)
    //                 setListTaskState([...tempNewTask])
    //             }
    //         }
    //         // console.log('leave new col', leaveRefNewCol)
    //     }
    // }
    // const handleDragOverCol = (e, indexListTask, colStatusId) => {
    //     let newTempTaskList = [...listTaskState]
    //     // check thử xem nó còn tồn tại trước chưa ==> vì có thể người dùng sẽ kéo ngược về lại 
    //     //render to new col new task: 
    //     let tempTask = tagDrop.current
    //     let indexTask = newTempTaskList[indexListTask].lstTaskDeTail.findIndex(task => task.taskId === tempTask.taskId)
    //     if (indexTask === -1) {
    //         tempTask.statusId = colStatusId
    //         newTempTaskList[indexListTask].lstTaskDeTail.push(tempTask)
    //         setListTaskState([...newTempTaskList])
    //     }
    // }
    // const handleDragEnd = (e, oldTask, indexListTask) => {
    //     // console.log('hangleEnd', indexListTask)

    //     // sau khi bỏ chuột ra : 
    //     // 1. col cũ sẽ được check : ==> xem thẻ đó đã bỏ vào col mới hay chưa 
    //     // 2. vì nếu <thẻ> đó bỏ vào col mới ==> giá trị leaveRefNewCol sẽ khác với indexListTask
    //     if (leaveRefNewCol.current !== leaveOrgininalRef.current) {
    //         console.log('end')

    //         let newTempTaskList = [...listTaskState]
    //         // console.log('end', newTempTaskList[indexListTask].lstTaskDeTail)
    //         let indexTask = newTempTaskList[indexListTask].lstTaskDeTail.findIndex(task => task.taskId === oldTask.taskId)
    //         newTempTaskList[indexListTask].lstTaskDeTail.splice(indexTask, 1)
    //         // console.log('end index', indexTask)
    //         setListTaskState([...newTempTaskList])
    //     }
    // }

    const renderCardTaskList = () => {

        return listTaskState?.map((taskDetail, indexListTask) => {

            return <Droppable droppableId={taskDetail.statusId}>
                {(provided) => {
                    return <div
                        key={indexListTask}
                        className="card"
                        style={{ width: '17rem', height: 'auto' }}

                    >
                        <div className="card-header">
                            {taskDetail.statusName}
                        </div>
                        <ul className="list-group list-group-flush" style={{ height: '100%' }}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        // statusId={taskDetail.statusId}
                        >
                            {taskDetail.lstTaskDeTail.map((task, index) => {
                                return <Draggable
                                    key={task.taskId.toString()} index={index} draggableId={task.taskId.toString()}
                                >
                                    {(provided) => {
                                        return <li key={index} className="list-group-item"
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}

                                            onClick={() => {
                                                dispatch({
                                                    type: GET_TASK_DETAIL_SAGA,
                                                    taskId: task.taskId
                                                })
                                            }} data-toggle="modal" data-target="#infoModal">
                                            <p className='font-weight-bold'>
                                                {task.taskName}
                                            </p>
                                            <div className="block" style={{ display: 'flex' }}>
                                                <div className={`block-left ${textPriority(task.priorityTask.priority)} `} >
                                                    {task.priorityTask.priority}
                                                </div>
                                                <div className="block-right">
                                                    <div className="avatar-group" style={{ display: 'flex' }}>
                                                        {task.assigness?.map((assigner, index) => {
                                                            return <div className="avatar" key={index}>
                                                                <img src={assigner.avatar} alt={`assigner${index}`} />
                                                            </div>
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    }}

                                </Draggable>


                            })}
                        </ul>
                        {provided.placeholder}
                    </div>
                }}
            </Droppable>

        })


    }
    return (
        <div className="content" style={{ display: 'flex' }}>

            <DragDropContext onDragEnd={handleEnd}>

                {renderCardTaskList()}
            </DragDropContext>
        </div>
    )
}
//    <div className="card" style={{ width: '17rem', height: '25rem' }}>
//                 <div className="card-header">
//                     BACKLOG 3
//                 </div>
//                 <ul className="list-group list-group-flush">
//                     <li className="list-group-item" data-toggle="modal" data-target="#infoModal" style={{ cursor: 'pointer' }}>
//                         <p>
//                             Each issue has a single reporter but can have multiple
//                             assignees
//                         </p>
//                         <div className="block" style={{ display: 'flex' }}>
//                             <div className="block-left">
//                                 <i className="fa fa-bookmark" />
//                                 <i className="fa fa-arrow-up" />
//                             </div>
//                             <div className="block-right">
//                                 <div className="avatar-group" style={{ display: 'flex' }}>
//                                     <div className="avatar">
//                                         <img src={require('../../../assets/imgLoading/img/download (1).jfif')} alt />
//                                     </div>
//                                     <div className="avatar">
//                                         <img src={require('../../../assets/imgLoading/img/download (2).jfif')} alt />

//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </li>
//                     <li className="list-group-item">
//                         <p>
//                             Each issue has a single reporter but can have multiple
//                             assignees
//                         </p>
//                         <div className="block" style={{ display: 'flex' }}>
//                             <div className="block-left">
//                                 <i className="fa fa-check-square" />
//                                 <i className="fa fa-arrow-up" />
//                             </div>
//                             <div className="block-right">
//                                 <div className="avatar-group" style={{ display: 'flex' }}>
//                                     <div className="avatar">
//                                         <img src={require('../../../assets/imgLoading/img/download (1).jfif')} alt />

//                                     </div>

//                                     <div className="avatar">
//                                         <img src={require('../../../assets/imgLoading/img/download (2).jfif')} alt />

//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </li>
//                     <li className="list-group-item">Vestibulum at eros</li>
//                 </ul>
//             </div>
//             <div className="card" style={{ width: '17rem', height: '25rem' }}>
//                 <div className="card-header">
//                     SELECTED FOR DEVELOPMENT 2
//                 </div>
//                 <ul className="list-group list-group-flush">
//                     <li className="list-group-item">Cras justo odio</li>
//                     <li className="list-group-item">Dapibus ac facilisis in</li>
//                 </ul>
//             </div>
//             <div className="card" style={{ width: '17rem', height: '25rem' }}>
//                 <div className="card-header">
//                     IN PROGRESS 2
//                 </div>
//                 <ul className="list-group list-group-flush">
//                     <li className="list-group-item">Cras justo odio</li>
//                     <li className="list-group-item">Dapibus ac facilisis in</li>
//                 </ul>
//             </div>
//             <div className="card" style={{ width: '17rem', height: '25rem' }}>
//                 <div className="card-header">
//                     DONE 3
//                 </div>
//                 <ul className="list-group list-group-flush">
//                     <li className="list-group-item">Cras justo odio</li>
//                     <li className="list-group-item">Dapibus ac facilisis in</li>
//                     <li className="list-group-item">Vestibulum at eros</li>
//                 </ul>
//             </div>