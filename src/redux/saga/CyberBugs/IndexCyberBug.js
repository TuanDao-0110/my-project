import React, { useEffect, useState } from 'react'
import HeaderMain from '../../../components/CyberBugs/Main/HeaderMain'
import InfoMain from '../../../components/CyberBugs/Main/InfoMain'
import Content from '../../../components/CyberBugs/Main/Content'
import { useSelector, useDispatch } from 'react-redux'
import { GET_PROJECT_DETAIL_SAGA, GET_TASK_DETAIL_SAGA } from '../Constants/CyberBugs/Cyberbugs'


import { useSpring, animated } from 'react-spring'

export default function IndexCyberBug(props) {
    const { projectDetail } = useSelector(state => state.ProjectReducer)
    console.log('projectDetail:', projectDetail)
    useEffect(() => {
        const projectId = props.match.params.projectId
        dispatch({
            type: GET_PROJECT_DETAIL_SAGA,
            projectId
        })

    }, [])

    const propsSpring = useSpring({
        to: { bottom: '0px', opacity: 1 }, from: { bottom: '-35px', opacity: 0 }, config: { duration: 200 }, reset: true
    })

    const dispatch = useDispatch();
    const { members, projectName } = projectDetail
    return (
        <div>
            <div className='main'>
                <HeaderMain projectName={projectName}></HeaderMain>
                <h3> {projectName}</h3>
                <InfoMain projectDetail={projectDetail}></InfoMain>
                <Content projectDetail={projectDetail}></Content>
            </div>
        </div>
    )
}
