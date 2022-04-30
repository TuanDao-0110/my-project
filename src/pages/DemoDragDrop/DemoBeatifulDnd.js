import React, { useState } from 'react'
import _ from 'lodash'
import { DragDropContext } from 'react-beautiful-dnd'
import { Droppable } from 'react-beautiful-dnd'
import { Draggable } from 'react-beautiful-dnd'
export default function DemoBeatifulDnd(props) {
    const [state, setState] = useState({
        "toDo": {
            id: 'toDo',
            items: [
                {
                    id: '1',
                    taskName: 'task1'
                },
                {
                    id: '2',
                    taskName: 'task2'
                }, {
                    id: '3',
                    taskName: 'task3'
                }
            ]
        },
        "inProcess": {
            id: 'inProcess',
            items: [
                {
                    id: '4',
                    taskName: 'task4'
                },
                {
                    id: '5',
                    taskName: 'task5'
                },
                {
                    id: '6',
                    taskName: 'task6'
                }
            ]
        },
        "done": {
            id: 'done',
            items: [
                {
                    id: '7',
                    taskName: 'task7'
                },
                {
                    id: '8',
                    taskName: 'task8'
                },
                {
                    id: '9',
                    taskName: 'task9'
                }
            ]
        }
    })

    const handleDragEnd = (result) => {
        let { destination, source } = result
        let tempDragId = source.droppableId;
        let tempDropId = destination.droppableId
        if (!destination) {
            return
        }
        if (destination.index === source.index && destination.droppableId === source.droppableId) {
            return
        }
        setState((prevState) => {

            let tempDragItem = { ...prevState[tempDragId].items[source.index] }
            let tempDropItem = { ...prevState[tempDropId].items[destination.index] }
            let indexTemp = prevState[tempDragId].items.findIndex(item => item.id === tempDragItem.id)
            if (destination.droppableId === source.droppableId) {
                prevState[tempDropId].items[destination.index] = tempDragItem
                prevState[tempDragId].items[source.index] = tempDropItem
                // prevState[tempDragId].items.splice(indexTemp, 0)
                return { ...prevState }
            }

            if (destination.droppableId !== source.droppableId) {
                prevState[tempDragId].items.splice(indexTemp, 1)
                let indexTemp1 = prevState[tempDropId].items.findIndex(item => item.id === tempDropItem.id)
                prevState[tempDropId].items.splice(indexTemp1, 0, tempDragItem)
                return { ...prevState }
            }
        })
    }
    return (
        <div className='container'>
            {/* {console.log('state,', state)} */}
            <h2 className='text-center display-4'>    Demo Drag</h2>
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className='row'>

                    {_.map(state, (statusTask, index) => {
                        return <Droppable droppableId={statusTask.id}>
                            {(provided) => {
                                return <div className='col-4 text-center bg-dark p-5' key={index}
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {statusTask.items.map((item, index) => {
                                        return <Draggable key={item.id} draggableId={item.id} index={index}>
                                            {(provided) => {
                                                return <div className='text-center bg-white p-3 mt-2' key={index}
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    {item.taskName}
                                                </div>
                                            }}
                                        </Draggable>
                                    })}


                                    {provided.placeholder}
                                </div>
                            }}


                        </Droppable>
                    })}
                </div>
            </DragDropContext >
        </div>
    )
}
