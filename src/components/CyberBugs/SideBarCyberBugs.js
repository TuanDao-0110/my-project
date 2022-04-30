import React, { useState, createElement } from 'react'
import { Layout, Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    BarsOutlined,
    SearchOutlined,
    PlusOutlined
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import FormCreateTask from '../Forms/FormEditProject/FormCreatTask/FormCreateTask';

const { Header, Sider, Content } = Layout;
export default function SideBarCyberBugs() {
    const [state, setState] = useState({
        collapsed: false,
    });

    const dispatch = useDispatch()
    const toggle = () => {
        setState({
            collapsed: !state.collapsed
        });
    };

    return (
        <>

            <Sider trigger={null} collapsible collapsed={state.collapsed} style={{ height: '100%' }}>
                <div className='text-right pr-2' onClick={() => {
                    toggle()
                }} style={{ cursor: 'pointer', color: "white", fontSize: '20px' }}>

                    <BarsOutlined theme="light"></BarsOutlined>
                </div>
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" onClick={() => {
                        dispatch({
                            type: 'CREATE_TASK',
                            Component: <FormCreateTask></FormCreateTask>
                        
                        })
                    }} icon={<PlusOutlined ></PlusOutlined>} >
                        Create Bug
                    </Menu.Item>
                    <Menu.Item key="2" icon={<SearchOutlined />}>
                        Search
                    </Menu.Item>
                </Menu>
            </Sider>

        </>
    )

}
