import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom'
import { Button, Layout } from 'antd'
const { Header, Footer, Sider, Content } = Layout
export const UserLoginTemplate = (propsRoute) => {
    const [size, setSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    })
    useEffect(() => {
     
        window.onresize = () => {
           
            setSize({
                width: window.innerWidth,
                height: window.height
            })
        }
    }, [])

    let { Component, ...restParam } = propsRoute
    return <Route path={restParam.path} render={(propsRoute) => {
        return <>
            <Layout>
                <Sider width={size.width / 2} style={{ height: size.height, background: 'url(https://picsum.photos/2000) no-repeat center 100%' }}>
                </Sider>
                <Content>

                    <Component {...propsRoute}></Component>
                </Content>
            </Layout>
        </>
    }} >

    </Route>
}