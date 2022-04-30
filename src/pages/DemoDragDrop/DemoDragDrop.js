import React, { useRef, useState, } from 'react'
import './DemoDragDrop.css'
import { useSpring, animated } from 'react-spring'
const taskList = [
    { id: 1, taskName: 'task 1' },
    { id: 2, taskName: 'task 2' },
    { id: 3, taskName: 'task 3' },
    { id: 4, taskName: 'task 4' }

]


export default function DemoDragDrop(props) {
    const propsSpring = useSpring({
        to: { bottom: '0px', opacity: 1 }, from: { bottom: '-35px', opacity: 0 }, config: { duration: 200 }, reset: true
    })
    console.log(propsSpring)
    const tagDragEnter = useRef({})
    const [taskListDefault, setTask] = useState(taskList)
    const tagDrop = useRef({})
    const handleDragStart = (e, task, index) => {
        console.log('on drag start', e.target)
        tagDrop.current = task;
        console.log('on drop enter use ref ', tagDrop)
    }


    const handleDragover = (e, taskEnter, index) => {


        tagDragEnter.current = { ...taskEnter }
        // console.log('on drop over', e.target)
        // e.stopPropagation();
        // e.preventDefault()
        // tạo 1 state tạm thời 
        let taskListUpdate = [...taskListDefault]
        //1.tìm kiếm vị trị của thẻ được nắm kéo trong state
        let indexDragStart = taskListUpdate.findIndex(task => task.id === tagDrop.current.id)
        //2. tìm vị trị của thẻ được kéo vào trong state
        let indexTagDragOver = taskListUpdate.findIndex(task => task.id === taskEnter.id)
        console.log('on drag over index drag vs indexTagDragOver', indexDragStart, indexTagDragOver)
        // 3. gán tạm giá trị của thẻ được nắm kéo vào 1 giá trị tạm 
        let temp = taskListUpdate[indexDragStart];
        //4. gán giá trị trong state cho nó ==> giá trị của thẻ được nắm kéo trong state  sẽ được gán === giá trị của thẻ được thả tới 
        taskListUpdate[indexDragStart] = taskListUpdate[indexTagDragOver]
        // 5. đối với thẻ thả tới ==> thì trong state của nó ==> sẽ được được thay thế bằng giá trị của thẻ kéo vào 
        taskListUpdate[indexTagDragOver] = temp
        // 6. như vậy listState tạm thời đã được update ==> thẻ được kéo vào sẽ được thay thế bằng thẻ được thả vào ==> ngược lại thẻ được thả vào sẽ thay thế bằng thẻ được kéo vào 
        // ==> như vậy thứ tự state  đã được thay đổi 
        // gán state tạm thời đó vào state cũ ==> thực hiện update state
        setTask(taskListUpdate)
    }

    const handleDragEnd = (e) => {
        console.log('on drag end', e.target)
        tagDrop.current = ''
        setTask([...taskList])
    }

    const handledrop = (e) => {

        console.log('on drop', e.target)
    }
    return (
        <div className='container' onDragOver={(e) => {
            e.stopPropagation();
            e.preventDefault();

        }}

            // onDrop={(e) => {
            //     tagDrop.current = '';
            //     setTask([...taskList])
            // }}
        >
            <div className='text-center' onDragOver={handleDragover}>
                taskList
            </div>
            <div className='row'>
                <div className='col-4'></div>
                <div className='bg-dark p-0 m-0 col-5'>
                    {taskListDefault.map((task, index) => {
                        let cssDragTag = task.id === tagDrop.current.id ? 'dragTag' : '';
                        if (task.id === tagDragEnter.current.id) {
                            return <animated.div
                                key={index}
                                onDragEnd={(e) => {
                                    handleDragEnd(e)
                                }}
                                style={{
                                    position: 'relative',
                                    // bottom: propsSpring.bottom.to(bottom => `${bottom}px`)
                                    ...propsSpring
                                }

                                }
                                draggable='true'
                                // onDragEnd={(e) => handleDragEnd(e)}
                                onDragEnter={(e) => { handleDragover(e, task, index) }}

                                onDragStart={(e) => {
                                    handleDragStart(e, task, index)
                                }}
                                className={`bg-success text-white  mt-1 p-5`}
                            >{task.taskName}</animated.div>
                        }
                        return <div key={index}
                            onDragEnd={(e) => {

                                handleDragEnd(e)
                            }}

                            draggable='true'
                            // onDragEnd={(e) => handleDragEnd(e)}
                            onDragEnter={(e) => { handleDragover(e, task, index) }}

                            onDragStart={(e) => {
                                handleDragStart(e, task, index)
                            }}
                            className={`bg-success text-white mt-1 p-5 ${cssDragTag}`}>
                            {task.taskName}
                        </div>

                    })}
                </div>
                <div className='col-4' onDragOver={(e) => {
                    handleDragover(e)
                }} onDrop={(e) => {
                    handledrop(e)
                }}>
                    ok
                </div>
            </div>
        </div>
    )
}
