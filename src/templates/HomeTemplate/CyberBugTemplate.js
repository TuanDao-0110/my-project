import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'
import InforModal from '../../components/CyberBugs/InforModal'
import Content from '../../components/CyberBugs/Main/Content'
import HeaderMain from '../../components/CyberBugs/Main/HeaderMain'
import InfoMain from '../../components/CyberBugs/Main/InfoMain'
import MenuCyberBugs from '../../components/CyberBugs/MenuCyberBugs'
import SearchModal from '../../components/CyberBugs/SearchModal'
import SideBarCyberBugs from '../../components/CyberBugs/SideBarCyberBugs'
import Header from '../../components/Home/Header/Header'
export const CyberBugsTemplate = (props) => {
    const { Component, ...restParam } = props
    return <Route path={restParam.path} render={(propsRoute) => {
        return <>
            <div className='jira'>

                {/* sider bar */}
                <SideBarCyberBugs></SideBarCyberBugs>

                {/* Menu */}
                <MenuCyberBugs></MenuCyberBugs>
                {/* Component Main */}
                <Component {...propsRoute}></Component>
                {/* Main */}

                <SearchModal></SearchModal>
                <InforModal projectId={props.computedMatch.params.projectId}></InforModal>
            </div>
        </>

    }}></Route>
}