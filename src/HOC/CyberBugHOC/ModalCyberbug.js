import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';

import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function ModalCyberbug(props) {
    const { visible, ComponentContentDrawer, callBackSubmit, title } = useSelector(state => state.drawerReducer)
    const dispatch = useDispatch()
    const showDrawer = () => {

        dispatch({
            type: "OPEN_DRAWER"
        })

    };
    const onClose = () => {
        dispatch({
            type: "CLOSE"
        });
    };
    return (
        <>
            {/* <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
                New account
            </Button> */}
            <Drawer
                title={title}
                width={720}
                onClose={onClose}
                visible={visible}
                bodyStyle={{ paddingBottom: 80 }}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button onClick={callBackSubmit} type="primary">
                            Submit
                        </Button>
                    </Space>
                }
                >
                {ComponentContentDrawer}
                {/* the component se duoc lay tu drawerReducer de render ra noi dung */}
            </Drawer>
        </>
    )
}
