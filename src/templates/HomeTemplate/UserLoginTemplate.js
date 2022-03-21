import React from 'react'
import { Route } from 'react-router-dom'
import { Button, Layout } from 'antd'
const { Header, Footer, Sider, Content } = Layout
export const UserLoginTemplate = (propsRoute) => {
    let { Component, ...restParam } = propsRoute
    return <Route path={restParam.path} render={(propsRoute) => {
        return <>
            <Layout>
                <Sider width={window.innerWidth / 2} style={{ height: window.innerHeight, background: 'url(https://picsum.photos/2000) no-repeat center 100%' }}>
                </Sider>
                <Content>

                    <Component {...propsRoute}></Component>
                </Content>
            </Layout>
        </>
    }} >

    </Route>
}